---
title: Configuration Snapshots
sidebar_position: 1
description: "Configuration Snapshots are point-in-time backups of your epilot configuration. Learn how daily, manual and pre-install snapshots work and what they cover."
---

# Configuration Snapshots

[[API Docs](/api/snapshot)]

A **Configuration Snapshot** is a point-in-time backup of your organization's configuration: journeys, automations, schemas, templates, products and more. You can restore a snapshot to put captured resources back to the state they had when the snapshot was taken.

:::warning
Snapshots back up **configuration only**. They do not contain customer data, secrets or (in some cases) file content. Read [What is not supported](./limitations.md) before relying on snapshots for disaster recovery.
:::

## Types of snapshots

| Type | When it is created | Who triggers it |
|---|---|---|
| **Daily snapshot** | Automatically, once per day, for organizations enrolled in the daily schedule | epilot |
| **Manual snapshot** | When you capture the organization (or a selection of resources) on demand | You |
| **Pre-install snapshot** | Automatically, right before a Blueprint install overwrites existing resources | The Blueprint install |

### Daily snapshots

Each enrolled organization is captured once per day, at a fixed time inside a window between **00:00 and 05:00 Europe/Berlin**. The exact minute is derived from your organization ID, so it stays the same every day. Daily snapshots are kept for **90 days** by default.

You can read the schedule of your organization with `GET /v1/org-snapshot-schedule`. It returns the status of the last run.

### Manual snapshots

Use a manual snapshot before a risky change, for example a large refactoring of automations. You can capture the whole organization (`POST /v1/snapshots:capture-org`) or a specific set of resources (`POST /v1/snapshots`).

### Pre-install snapshots

When you install or update a [Blueprint](../blueprints/intro.md), epilot first works out which existing resources the install would **update**. If there are any, a snapshot of exactly those resources is taken before anything is written. If the install only creates new resources, no snapshot is taken, because nothing is overwritten.

This snapshot is what makes it possible to [revert a Blueprint install](./restoring-and-reverting.md#reverting-a-blueprint-install).

## What a snapshot covers

The table shows what is captured and restored per resource type. Types not listed here are not covered.

| Resource | Captured | Restorable | Notes |
|---|---|---|---|
| Journeys | Yes | Yes | Designs are separate resources and are captured on their own. |
| Datasources | Only as a dependency | Yes | Captured only when another captured resource (for example a journey) depends on it. |
| Automations (flows) | Yes | Yes | |
| Flow templates, workflow definitions, closing reasons | Yes | Yes | A deleted resource is recreated with a new ID. |
| Entity schemas, attributes, groups, headlines, capabilities | Yes | Yes | Configuration only, never entity data. |
| Taxonomies and classifications (purposes, labels) | Yes | Yes | Restore does not merge labels and clears label fields that are absent from the snapshot. |
| Portal configurations | Yes | Partial | Restore merges. Pages are never removed. |
| Webhooks | Yes | Partial | Authentication secrets are restored as a placeholder. |
| Environment variables | No | No | Secrets are never captured. |
| Access tokens | No | No | Secrets are never captured. |
| Files | Only as a dependency | Depends on content | Content is archived only when your organization uses the new file handling. |
| Document templates | Yes (metadata) | Only with archived content | Templates whose file content cannot be identified are skipped. At most 1,000 templates per organization. |
| Email templates, email signatures, shared inboxes, custom variables | Yes | Yes | Attachments are files, see above. |
| Products, prices, taxes, coupons, product recommendations, notification templates | Yes | Yes | |
| Entity mappings, validation rules, targets, apps, integrations | Yes | Yes | |
| Saved views, designs | Yes | Yes | |
| Roles, user groups | Yes | Yes | System roles that match by slug are skipped on restore. |
| Dashboards, kanban boards, insights | Yes | Yes | Resources the snapshot user cannot access are skipped. |
| Customer entity data (contacts, orders, opportunities, ...) | No | No | Out of scope by design. |
| Workflow executions, users, permission grants, email domains | No | No | No coverage. |

## Required permissions

| Action | Required grant |
|---|---|
| Create a manual snapshot, change the daily schedule | `configuration_hub:snapshot:create` |
| Restore a snapshot | `configuration_hub:snapshot:restore` |
| Delete a snapshot | `configuration_hub:snapshot:delete` |
| Browse snapshots and their resources | `configuration_hub:view` |
| Create, read and restore the pre-install snapshot of a Blueprint install | `blueprint:install` (see below) |

The `blueprint:install` grant covers the pre-install snapshot of that install: creating and reading it, and restoring it to revert that one Blueprint. A restore under this grant must name the Blueprint instance the snapshot belongs to. It does not allow restoring other snapshots.
