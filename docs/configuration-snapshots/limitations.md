---
title: What is not supported
sidebar_position: 3
description: "Limitations of Configuration Snapshots: what is never captured, what restores only partially and what a restore or revert does not do."
---

# What is not supported

Configuration Snapshots are a safety net for configuration changes. They are **not** a full backup of your organization. Review this page before you rely on them.

## Never captured

| Not captured | Why | What to do |
|---|---|---|
| **Environment variables** and **access tokens** | They hold secrets. Secret values are never written to a snapshot and are never restored. | Keep your own record of secret values. Re-create them after a loss. |
| **Customer entity data** (contacts, accounts, orders, opportunities and other business records) | Snapshots capture configuration only. Entity **schemas** are captured, entity **records** are not. | Use your regular data export or backup process. |
| **Workflow executions, users, permission grants, email domains** | No snapshot coverage for these. | Not applicable. |

## Captured only in some cases

- **Datasources and standalone files** are captured only as dependencies of other resources (for example the datasource of a journey, or a file attached to an email template). They are not included in a daily snapshot on their own.
- **File content** is archived only for organizations that use the new file handling. Otherwise files and document templates are skipped, so they cannot be restored.
- **Document templates** need an identifiable file content to be captured. Templates whose content cannot be identified are skipped. Templates created before July 2026 may be affected. At most **1,000 document templates** per organization are considered.
- **Dashboards, kanban boards and insights** that the snapshot user cannot access are skipped. The snapshot is still reported as successful, so check the skipped resources if you rely on them.
- **Resources that belong to another organization** are skipped.

A snapshot can have the status partial when some resources were skipped. Partial does not mean the snapshot is unusable.

## Restores partially

- **Webhooks:** authentication secrets are restored as a placeholder (`EPILOT_PLACEHOLDER`). Re-enter URL credentials and secrets after the restore.
- **Portals:** a restore merges the captured configuration into the current one. Pages are matched by slug and are **never removed**, so pages created after the snapshot remain.
- **Taxonomies:** a restore does not merge labels and clears label fields that are absent from the snapshot.
- **Roles:** system roles that match by slug are skipped.

## What a restore does not do

- A restore **never deletes** resources that were created after the snapshot was taken. Delete them manually if you need the exact earlier state.
- A deleted resource is **recreated with a new ID**. External systems that stored the old ID need to be updated.

A [Blueprint revert](./restoring-and-reverting.md#reverting-a-blueprint-install) differs: it also deletes the resources the install created, except secrets, files and document templates.

## Schedule and retention

- Daily snapshots run inside a window between **00:00 and 05:00 Europe/Berlin**. You cannot choose the time.
- If a daily snapshot fails, it is retried once on the same day.
- Default retention is **90 days**, maximum **744 days**. After that the snapshot is deleted.
- Daily snapshots are available for organizations enrolled in the schedule.

## Pre-install snapshots

- A pre-install snapshot is only taken if the install **updates** existing resources. Installs that only create resources have nothing to revert.
- Files, document templates, environment variables and access tokens that the install updates cannot be reverted.
- Reverting an install requires the `blueprint:install` grant. See [required permissions](./intro.md#required-permissions).
