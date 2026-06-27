---
sidebar_position: 4
title: Blueprints API (V2 & V3)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blueprints API

A developer's guide to installing and synchronizing Blueprints programmatically. The full
endpoint reference lives in the [Blueprint Manifest API docs](/api/blueprint-manifest); this
page is the narrative on top of it — when to use each engine, how the calls fit together,
and copy‑pasteable examples.

:::info
Blueprints are currently in closed **BETA**, available to selected customers.
:::

## Two engines: V2 and V3

epilot is migrating Blueprint installs from the original Terraform-based engine (**V2**) to a
new direct-API engine (**V3**). Both are live; they use **different endpoints**.

| | **V2 (Terraform)** | **V3 (direct API)** |
| --- | --- | --- |
| Install path | `POST /v2/blueprint-manifest/blueprints/{id}:install` | `POST /v3/blueprint-manifest/blueprint:install` |
| How it applies | Generates Terraform, runs `plan`/`apply` | Calls resource APIs directly in dependency order |
| Resource matching | Name-based (`processExistingResources`) | Lineage registry (stable cross-org identity) |
| Many orgs at once | Patches (mass rollout) | **Bulk install** (`POST .../bulk-installs`) |
| Resume on failure | Limited | Checkpoint-based resume |
| Status | Stable, default in the portal today | Rolling out |

**Which should I use?**

- Building a **new programmatic integration** (e.g. installing one Blueprint into many
  customer orgs from CI)? Use **V3**, and prefer **bulk install**.
- Working with the **existing portal flows / Patches**? That's **V2**.

:::tip Jobs are shared
Both engines produce a **job**. Jobs — V2 *and* V3 — are polled, resumed, and cancelled
through the same `/v2/blueprint-manifest/jobs/*` endpoints. Tell them apart with the job's
`sync_engine` field (`"terraform"` | `"v3"`). There is no separate `/v3/.../jobs` surface —
that cross-version step is intentional.
:::

## V3 endpoint map

| Purpose | Method & path |
| --- | --- |
| Install into one org | `POST /v3/blueprint-manifest/blueprint:install` |
| Install into many orgs | `POST /v3/blueprint-manifest/bulk-installs` |
| Get a bulk install | `GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}` |
| List bulk targets | `GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets` |
| Retry one target | `POST /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets/{destination_org_id}:retry` |
| Inspect lineage | `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/lineage` |
| Restore a deployment | `POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore` |
| **Poll any job** | `GET /v2/blueprint-manifest/jobs/{job_id}` *(shared)* |
| **Resume a paused install** | `POST /v2/blueprint-manifest/jobs/{job_id}:continue` *(shared)* |
| **Cancel a job** | `POST /v2/blueprint-manifest/jobs/{job_id}:cancel` *(shared)* |

## Authentication

All calls take a bearer token in the `authorization` header. For **cross-org** installs the
two tokens have distinct roles:

- The **caller token** (source org) authorizes reads of the source Blueprint.
- The **destination token** (`destination_auth_token`) authorizes writes into the target org.

`destination_auth_token` is **write-only** — passed in the request, used only for that org's
writes, and never stored or returned.

## Single install (V3)

Install one Blueprint into one destination org.

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl -X POST https://blueprint-manifest.sls.epilot.io/v3/blueprint-manifest/blueprint:install \
  -H "authorization: Bearer $SOURCE_TOKEN" \
  -H "content-type: application/json" \
  -d '{
        "source_org_id": "source-org-id",
        "source_blueprint_id": "11111111-1111-1111-1111-111111111111",
        "destination_org_id": "dest-org-id",
        "destination_auth_token": "DEST_TOKEN",
        "auto_apply": true
      }'
# => 202 { "job_id": "...", "destination_blueprint_id": "..." }
```

  </TabItem>
  <TabItem value="cli" label="epilot CLI">

```bash
epilot blueprint-manifest installBlueprintV3 -d '{
  "source_org_id": "source-org-id",
  "source_blueprint_id": "11111111-1111-1111-1111-111111111111",
  "destination_org_id": "dest-org-id",
  "destination_auth_token": "DEST_TOKEN",
  "auto_apply": true
}'
```

  </TabItem>
  <TabItem value="sdk" label="SDK (TypeScript)">

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => SOURCE_TOKEN)

const { data } = await epilot.blueprintManifest.installBlueprintV3(null, {
  source_org_id: 'source-org-id',
  source_blueprint_id: '11111111-1111-1111-1111-111111111111',
  destination_org_id: 'dest-org-id',
  destination_auth_token: 'DEST_TOKEN',
  auto_apply: true,
})
```

  </TabItem>
</Tabs>

### `auto_apply`: apply automatically vs review the plan first

- **`auto_apply: true`** — plans, snapshots, then applies in one shot. No manual step.
- **`auto_apply: false`** (default) — the job stops at `status: "WAITING_USER_ACTION"` after
  planning so you can review what would change, then you resume it:

```bash
curl -X POST https://blueprint-manifest.sls.epilot.io/v2/blueprint-manifest/jobs/$JOB_ID:continue \
  -H "authorization: Bearer $DEST_TOKEN"
```

### Poll the job

```bash
curl https://blueprint-manifest.sls.epilot.io/v2/blueprint-manifest/jobs/$JOB_ID \
  -H "authorization: Bearer $DEST_TOKEN"
# => {
#   "sync_engine": "v3",
#   "status": "IN_PROGRESS" | "WAITING_USER_ACTION" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED",
#   "resource_progress": [ { "type": "...", "status": "..." } ]
# }
```

## Bulk install (V3) — one Blueprint into many orgs

Instead of scripting N single installs, hand the server a list of targets. It caps active
installs, isolates per-target failures, and tracks aggregate status. Every child install
runs with `auto_apply: true`.

**v1 limits:** 1–100 targets · `max_concurrency` 1–5 (default 2).

### 1. Create

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl -X POST https://blueprint-manifest.sls.epilot.io/v3/blueprint-manifest/bulk-installs \
  -H "authorization: Bearer $SOURCE_TOKEN" \
  -H "content-type: application/json" \
  -d '{
        "source_blueprint_id": "11111111-1111-1111-1111-111111111111",
        "max_concurrency": 2,
        "options": { "resources_to_ignore": [] },
        "targets": [
          { "destination_org_id": "org-a", "destination_auth_token": "TOKEN_A" },
          { "destination_org_id": "org-b", "destination_auth_token": "TOKEN_B" }
        ]
      }'
# source_org_id is optional and defaults to the caller org; if set it must equal it.
# => 202 {
#   "bulk_job_id": "...", "status": "QUEUED",
#   "target_count": 2, "max_concurrency": 2,
#   "counts": { "queued": 2, "in_progress": 0, "success": 0, "partial_success": 0, "failed": 0 }
# }
```

  </TabItem>
  <TabItem value="cli" label="epilot CLI">

```bash
epilot blueprint-manifest createBulkInstallV3 -d '{
  "source_blueprint_id": "11111111-1111-1111-1111-111111111111",
  "max_concurrency": 2,
  "targets": [
    { "destination_org_id": "org-a", "destination_auth_token": "TOKEN_A" },
    { "destination_org_id": "org-b", "destination_auth_token": "TOKEN_B" }
  ]
}'
```

> Available once the V3 spec is synced to the CLI — see [CLI exposure](#cli-exposure) below.

  </TabItem>
</Tabs>

### 2. Poll the parent

```bash
curl https://blueprint-manifest.sls.epilot.io/v3/blueprint-manifest/bulk-installs/$BULK_JOB_ID \
  -H "authorization: Bearer $SOURCE_TOKEN"
# => { "status": "IN_PROGRESS", "counts": { "queued": 0, "in_progress": 2, "success": 0, ... } }
```

### 3. List targets (with per-target progress)

Each target row hydrates its latest child job, including `events[]` and `resource_progress[]`.

```bash
curl "https://blueprint-manifest.sls.epilot.io/v3/blueprint-manifest/bulk-installs/$BULK_JOB_ID/targets?limit=10" \
  -H "authorization: Bearer $SOURCE_TOKEN"
# => {
#   "results": [
#     {
#       "destination_org_id": "org-b",
#       "destination_blueprint_id": "...",
#       "status": "FAILED",
#       "job_ids": ["job-1"],
#       "job": { "id": "job-1", "status": "FAILED", "events": [...], "resource_progress": [...] }
#     }
#   ],
#   "next_cursor": "..."
# }
```

Paginate by passing the returned `next_cursor` back as `?cursor=...` (max `limit` 25).

### 4. Retry a failed target

Allowed only for `FAILED` or `PARTIAL_SUCCESS` targets. Supply a fresh destination token;
the source/destination identifiers are immutable. A new child job is appended to `job_ids`.

```bash
curl -X POST "https://blueprint-manifest.sls.epilot.io/v3/blueprint-manifest/bulk-installs/$BULK_JOB_ID/targets/org-b:retry" \
  -H "authorization: Bearer $SOURCE_TOKEN" \
  -H "content-type: application/json" \
  -d '{ "destination_auth_token": "FRESH_TOKEN_B" }'
```

### Status model

| Target status | Meaning |
| --- | --- |
| `QUEUED` | persisted, not started |
| `IN_PROGRESS` | child install running |
| `SUCCESS` / `PARTIAL_SUCCESS` / `FAILED` | mirrors the child job's terminal status |

The **parent** aggregates its targets:

| Parent status | Condition |
| --- | --- |
| `QUEUED` | no target started |
| `IN_PROGRESS` | at least one target queued/running, not all terminal |
| `SUCCESS` | every target succeeded |
| `PARTIAL_SUCCESS` | all terminal, mix incl. ≥1 success/partial |
| `FAILED` | all terminal, none succeeded or partially succeeded |

## Lineage & restore (V3)

- **Lineage** — `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/lineage` returns the
  source→target id mapping for a Blueprint's resources in the current org. This is how V3
  re-identifies resources across syncs instead of matching by name.
- **Restore** — `POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore`
  rolls a deployment back to its pre-install snapshot. Preview the effect first with
  `GET .../deployments/{job_id}/restore-preview`.

## CLI exposure {#cli-exposure}

The epilot CLI is **spec-driven**: `epilot blueprint-manifest <operationId>` dispatches
against a bundled OpenAPI definition. Exposing a new endpoint is a spec sync, not a CLI code
change — making the CLI a good fit for dockerized CI jobs (no raw `curl`).

- **Callable today:** `installBlueprintV3`, `getBlueprintLineageV3`.
- **Available after the next V3 spec sync to `sdk-js`:** `createBulkInstallV3`,
  `getBulkInstallV3`, `listBulkInstallTargetsV3`, `retryBulkInstallTargetV3`,
  `restoreBlueprintDeploymentV3`, `getRestorePreview`.

See the [CLI overview](/docs/cli/overview) and the
[generated command reference](/docs/cli/commands/blueprint-manifest).
