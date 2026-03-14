---
sidebar_position: 5
---

# Grant Actions Reference

Complete reference of all permission grant actions supported by the epilot permissions system. See [Permissions](/docs/auth/permissions) for concepts and evaluation rules.

Actions follow a `{domain}:{operation}` pattern. Use `{domain}:*` to grant all operations in a domain.

## Entity

Entity permissions are scoped per schema using the `resource` field (e.g. `contact:*`, `opportunity:*`).

| Action | Description |
|---|---|
| `entity:*` | All entity operations |
| `entity:view` | View entities |
| `entity:create` | Create entities (also "Upload Files" for file entities) |
| `entity:edit` | Edit entities |
| `entity:bulk_edit` | Bulk edit entities |
| `entity:delete` | Delete entities |
| `entity:export` | Export entities |
| `entity:import` | Import entities |
| `entity:download` | Download files |
| `entity:generate_document` | Generate documents |
| `entity:save_document_template` | Save new document templates |
| `entity:deduplicate` | Deduplicate entities (contact, account only) |
| `entity:invite_partner` | Invite partners |

### Entity Attributes

Attribute-level permissions control visibility of individual fields. Resources follow the pattern `{schema}:{group}:{attribute}`.

| Action | Description |
|---|---|
| `entity:attribute:view` | View specific entity attributes |
| `entity:attribute:edit` | Edit specific entity attributes |
| `entity:attribute:*` | All attribute operations |

**Resource pattern examples:**

| Pattern | Matches |
|---|---|
| `contact:*:*` | All attributes on contacts |
| `contact:Personal Details:email` | The email field in the Personal Details group on contacts |
| `*:*:_tags` | The `_tags` field across all schemas and groups |
| `*` | All attributes on all schemas |

:::note
System metadata fields (`_id`, `_title`, `_org`, `_schema`, `_created_at`, `_updated_at`, `_tags`, `_purpose`, `_owners`, `_acl`, `_manifest`) are always returned regardless of attribute permissions.
:::

### Entity Capabilities

| Action | Description |
|---|---|
| `entity:capability:*` | All capability operations |
| `entity:capability:view` | View capabilities (e.g. product items on orders) |
| `entity:capability:create` | Create capability items |
| `entity:capability:edit` | Edit capability items |
| `entity:capability:delete` | Delete capability items |

## Messaging

| Action | Description |
|---|---|
| `message:*` | All messaging operations |
| `message:view` | View messages |
| `message:send` | Send messages |
| `message:bulk_send` | Send bulk messages |
| `message:delete` | Delete messages |

:::info
`message:view` and `message:send` implicitly depend on `entity:view` / `entity:*` for `message` and `thread` entity schemas.
:::

## Workflows

### Workflow Definitions

| Action | Description |
|---|---|
| `workflow:definition:*` | All workflow definition operations |
| `workflow:definition:view` | View workflow definitions |
| `workflow:definition:create` | Create workflow definitions |
| `workflow:definition:edit` | Edit workflow definitions |
| `workflow:definition:delete` | Delete workflow definitions |

### Workflow Execution

| Action | Description |
|---|---|
| `workflow:execution:*` | All workflow execution operations |
| `workflow:execution:view` | View all tasks from workflows |
| `workflow:execution:trigger` | Trigger workflows |
| `workflow:execution:cancel` | Cancel or reopen workflows |
| `workflow:execution:delete` | Delete workflows |
| `workflow:execution:update_details` | Update workflow assignee and due dates |
| `workflow:execution:task:view_assigned` | View only assigned tasks |
| `workflow:execution:task:update` | Update task status |
| `workflow:execution:task:update_assigned` | Update assigned task status only |
| `workflow:execution:task:assign` | Assign workflow tasks |
| `workflow:execution:task:update_date` | Set or change task due date |
| `workflow:execution:task:add` | Add new tasks |
| `workflow:execution:task:notes` | View, create, edit and delete notes in tasks |

## Automation

| Action | Description |
|---|---|
| `automation:*` | All automation operations |
| `automation:view` | View automation flows |
| `automation:create` | Create automation flows |
| `automation:edit` | Edit automation flows |
| `automation:delete` | Delete automation flows |
| `automation:trigger` | Trigger automations |

## Users & Roles

### Users

| Action | Description |
|---|---|
| `user:*` | All user operations |
| `user:view` | View users |
| `user:invite` | Invite users |
| `user:delete` | Delete users |

### Roles

| Action | Description |
|---|---|
| `role:*` | All role operations |
| `role:view` | View roles |
| `role:assign` | Assign roles to users |
| `role:create` | Create roles |
| `role:delete` | Delete roles |

### Groups

| Action | Description |
|---|---|
| `group:*` | All group operations |
| `group:view` | View groups |
| `group:create` | Create groups |
| `group:edit` | Edit groups |
| `group:delete` | Delete groups |

### Access Tokens

| Action | Description |
|---|---|
| `token:*` | All token operations |
| `token:create` | Create access tokens |

### Partner Users

| Action | Description |
|---|---|
| `partner:user:*` | All partner user operations |
| `partner:user:view` | View partner users |
| `partner:user:create` | Create partner users |
| `partner:user:update_roles` | Update partner user roles |
| `partner:user:delete` | Delete partner users |
| `partner:user_limit:set` | Set partner user limit |

## Organization

| Action | Description |
|---|---|
| `organization:*` | All organization operations |
| `organization:edit` | Update organization |
| `organization:settings` | Update organization settings |
| `organization:sso` | Configure SSO |

## Schema & Entity Builder

| Action | Description |
|---|---|
| `schema:*` | All schema operations |
| `schema:view` | View entity schemas |
| `entity_manager:*` | All entity manager operations |
| `entity_manager:view` | View entity manager |

## Email

### Email Settings

| Action | Description |
|---|---|
| `email_setting:*` | All email settings operations |
| `email_setting:view` | View email settings |
| `email_setting:create` | Create email settings |
| `email_setting:edit` | Edit email settings |
| `email_setting:delete` | Delete email settings |

### epilot Email Addresses

| Action | Description |
|---|---|
| `epilot_email_address:*` | All epilot email address operations |
| `epilot_email_address:view` | View epilot email addresses |
| `epilot_email_address:edit` | Edit epilot email addresses |

## Portals

### Customer Portal

| Action | Description |
|---|---|
| `customer_portal:*` | All customer portal operations |
| `customer_portal:view` | View customer portals |
| `customer_portal:create` | Create customer portals |
| `customer_portal:edit` | Edit customer portals |
| `customer_portal:activate` | Activate customer portals |
| `customer_portal:delete` | Delete customer portals |

### Installer Portal

| Action | Description |
|---|---|
| `installer_portal:*` | All installer portal operations |
| `installer_portal:view` | View installer portals |
| `installer_portal:create` | Create installer portals |
| `installer_portal:edit` | Edit installer portals |
| `installer_portal:activate` | Activate installer portals |
| `installer_portal:delete` | Delete installer portals |

## Webhooks

| Action | Description |
|---|---|
| `webhook:*` | All webhook operations |
| `webhook:view` | View webhooks |
| `webhook:create` | Create webhooks |
| `webhook:edit` | Edit webhooks |
| `webhook:delete` | Delete webhooks |

## Integrations

| Action | Description |
|---|---|
| `integration:*` | All integration operations |
| `integration:view` | View integrations |
| `integration:manage` | Manage integrations |

## Dashboard

| Action | Description |
|---|---|
| `dashboard:*` | All dashboard operations |
| `dashboard:create` | Create dashboards |
| `dashboard:edit` | Edit dashboards |
| `dashboard:delete` | Delete dashboards |

## Design Builder

| Action | Description |
|---|---|
| `design:*` | All design operations |
| `design:view` | View designs |
| `design:create` | Create designs |
| `design:edit` | Edit designs |
| `design:delete` | Delete designs |

## Label Builder

| Action | Description |
|---|---|
| `label_builder:*` | All label builder operations |
| `label_builder:view` | View label builder |
| `label_builder:create` | Create families, labels, and file collections |
| `label_builder:edit` | Edit families, labels, and file collections |
| `label_builder:delete` | Delete families, labels, and file collections |
| `label_builder:create_standalone_labels` | Create standalone labels |

## Variables

| Action | Description |
|---|---|
| `variable:*` | All variable operations |
| `variable:view` | View variables |
| `variable:create` | Create variables |
| `variable:edit` | Edit variables |
| `variable:delete` | Delete variables |

## Kanban

| Action | Description |
|---|---|
| `kanban:*` | All kanban operations |
| `kanban:view` | View kanban boards |
| `kanban:all_assignee_filters` | Filter by all assignees |
| `kanban:set_org_default_board` | Set default board for organization |

## Apps

| Action | Description |
|---|---|
| `app:*` | All app operations |
| `app:view` | View app installations |
| `app:install` | Install apps |
| `app:uninstall` | Uninstall apps |

## Blueprints

| Action | Description |
|---|---|
| `blueprint:*` | All blueprint operations |
| `blueprint:view` | View blueprints |
| `blueprint:install` | Install blueprints |

## Event Catalog

| Action | Description |
|---|---|
| `event_catalog:*` | All event catalog operations |
| `event_catalog:view` | View event catalog |
| `event_catalog:manage` | Manage event catalog |

## Data Management

| Action | Description |
|---|---|
| `data_management:*` | All data management operations |
| `data_management:view` | View data management configuration |
| `data_management:edit` | Edit data management configuration |

## Datalake

| Action | Description |
|---|---|
| `datalake:*` | All datalake operations |
| `datalake:view` | View datalake settings |

## Environments & Secrets

| Action | Description |
|---|---|
| `environments:*` | All environment operations |
| `environments:edit` | Manage environments and secrets |
| `environments:delete` | Delete environments and secrets |

## File Collections

| Action | Description |
|---|---|
| `file_collection:*` | All file collection operations |
| `file_collection:view` | View personal file collections |
| `file_collection_builder:*` | All file collection builder operations |
| `file_collection_builder:view` | View file collection builder |

## Meter Reading

| Action | Description |
|---|---|
| `meter_reading:*` | All meter reading operations |
| `meter_reading:view` | View meter readings |
| `meter_reading:create` | Create meter readings |
| `meter_reading:edit` | Edit meter readings |
| `meter_reading:activate` | Activate meter readings |
| `meter_reading:delete` | Delete meter readings |

## Audit Logs

| Action | Description |
|---|---|
| `audit_log:view` | View audit logs |

## Notes

| Action | Description |
|---|---|
| `note:*` | All note operations |

## See Also

- [Permissions](/docs/auth/permissions) -- core concepts, evaluation rules, role types
- [Authorization](/docs/auth/authorization) -- how epilot authorizes API requests
- [Permissions API](/api/permissions) -- API reference
