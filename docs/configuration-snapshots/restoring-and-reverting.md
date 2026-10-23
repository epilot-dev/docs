---
title: Restoring and reverting
sidebar_position: 2
description: "Restore a configuration snapshot to bring back captured resources, or revert a Blueprint install to its pre-install state."
---

# Restoring and reverting

## Restoring a snapshot

Restoring a snapshot re-applies the captured resources to your organization (`POST /v1/snapshots/{id}:restore`). You can restore the whole snapshot or select individual resources. Progress is available from `GET /v1/snapshots/{id}/restores/{index}`.

A restore **only writes**:

- Resources that still exist are overwritten with the captured version.
- Resources that were deleted since the snapshot are recreated, **with a new ID**.
- Resources that were **created after** the snapshot are left untouched. A restore never deletes anything.

If another restore is already running for your organization, the request is rejected with a conflict and you can retry later.

:::info
Check the [limitations](./limitations.md) before restoring. Secrets, customer data and some file content are not part of a snapshot, and some resource types restore only partially.
:::

## Reverting a Blueprint install

After a Blueprint install, the install overview offers a revert when the install changed something that can be reverted. A revert does two things:

1. **Restores the pre-install snapshot.** Resources the install updated go back to their previous state.
2. **Deletes the resources the install created.** These are found through the install record, so resources you created yourself are not affected.

A revert preview shows what would be restored, deleted or skipped before you confirm.

### What a revert does not touch

These resource types are never deleted by a revert, even if the install created them, because their previous state is not in the snapshot:

- Environment variables and access tokens (secrets are never captured)
- Files and document templates

They are reported as skipped in the preview. An install that only touches these types has nothing to revert.

## Retention

Snapshots expire automatically. The default retention is 90 days. Retention can be set up to 744 days (24 months) on the daily schedule and on manual org captures. Expired snapshots are deleted, including their stored content.
