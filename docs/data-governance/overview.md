---
title: Overview
sidebar_position: 1
---

# Data Governance

The Data Governance module provides automated and manual contact deletion based on configurable policies. Define which contacts qualify for deletion using saved views and advanced filters, schedule recurring cleanup jobs, or trigger one-off deletions on demand.

[[API Reference](/api/data-governance)] | [[SDK Client](/docs/sdk/clients/data-governance)] | [[User Guide](https://help.epilot.cloud/kundenbetreuung/automatische-kontaktloschung/version/7?kb_language=de_DE)]

## Key Concepts

### Data Lifecycle Configs

A **config** defines a data lifecycle policy for a given entity schema (currently `contact`). Each config consists of:

- **Base view** – a saved entity view that identifies candidate contacts (e.g. "Contacts older than 2 years")
- **Advanced filters** – additional criteria not available in standard entity tables (e.g. only contacts where all related opportunities have a workflow status of CLOSED, or contacts with no email communication in the last 90 days)
- **Schedule** – an optional interval (e.g. every 90 days) for automated execution
- **Related entity handling** – which linked entities (emails, files, contracts, etc.) should be deleted along with the contact

### Auditable Jobs

Every deletion – whether manual or automatic – produces an **auditable job** with full traceability. Each job records its status, timing, trigger type, and generates a downloadable CSV report detailing exactly which contacts were affected.

This means you can audit every deletion that has ever occurred, who triggered it, and when – giving your team confidence and compliance visibility over data lifecycle operations.

### Data Recovery

Deleted contacts are moved to the **trash** where they remain recoverable for **30 days**. After this retention period, deletion becomes permanent and irreversible.

## Setting Up a Data Lifecycle Config

### 1. Create a Saved View

Before configuring a data lifecycle config, create a saved contact view that identifies deletion candidates:

1. Navigate to the contacts table
2. Apply filter criteria (e.g. contacts created more than 2 years ago, contacts with a specific label like "Inactive")
3. Save the view with a descriptive name

### 2. Configure the Data Lifecycle

In the epilot portal, navigate to **Settings > Data Governance**:

1. Open the configuration panel
2. Select your saved contact view as the base view
3. Apply advanced filters as needed:
   - **Workflow status** – e.g. only include contacts where all related opportunities have a workflow status of CLOSED
   - **No related entities** – contacts with no linked entities of a given type
   - **Communication history** – filter by sent/received message activity within a lookback period
4. Configure which related entities should be deleted alongside the contact (emails, files, accounts, opportunities, orders, contracts, submissions, meters, tickets)
5. Save the configuration

### 3. Choose a Deletion Method

**Automated deletion:**
- Set the desired interval (e.g. every 30, 60, or 90 days)
- Enable the automatic toggle
- The system displays when the next scheduled run will occur

**Manual deletion:**
- Click "Delete Now" to execute immediately
- Confirm in the security prompt

### 4. Review Deletion History

Access the deletion history to review past job runs, including:

- Job status and trigger type (manual or scheduled)
- Start and completion timestamps
- Number of affected contacts
- Downloadable CSV reports

## Permissions

Data Governance requires the following permission grants:

| Permission | Description |
|---|---|
| `data_governance:view` | View data lifecycle configurations and job history |
| `data_governance:edit` | Create, modify, and execute data lifecycle configs and jobs |

## API Reference

The Data Governance API exposes endpoints for managing configs and jobs programmatically.

**Base URL:** `https://data-governance.sls.epilot.io`

See the full [API Reference](/api/data-governance) for endpoint details.

## SDK

Install the TypeScript client:

```bash
npm install @epilot/data-governance-client
```

Usage:

```ts
import { getClient } from '@epilot/data-governance-client'

const client = getClient()

// List data lifecycle configs
const { data } = await client.listConfigs({
  entity_schema: 'contact',
  type: 'deletion',
})

// Trigger a manual deletion job
const { data: job } = await client.createJobForConfig({
  config_id: 'config-id',
})

// Poll job status
const { data: jobStatus } = await client.getJob({
  job_id: job.id,
})
```

Or use the unified SDK:

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.dataGovernance.listConfigs({
  entity_schema: 'contact',
  type: 'deletion',
})
```

See the [SDK client reference](/docs/sdk/clients/data-governance) for all available operations and types.
