---
sidebar_position: 1
title: Sharing & Collaboration
---

# Sharing & Cross-Org Collaboration

epilot enables organizations to share entities and collaborate across organizational boundaries. This is central to the energy sector, where utility companies work with networks of installers, grid operators, and service partners to fulfill customer orders.

## Overview

Sharing allows a **vendor organization** to grant a **partner organization** controlled access to specific entities and their related data. Partners can then view, edit, or act on shared entities depending on the permissions granted to them.

Common partner collaboration scenarios include:

- A utility company shares an opportunity with an installation partner to schedule an on-site visit
- A grid operator shares meter data with a service provider for maintenance
- A vendor shares order details (including related products, files, and workflows) with a fulfillment partner

:::info
Sharing is always initiated by the vendor organization. The principle is **private by default** — entities are only visible to partner organizations after being explicitly shared.
:::

## How Sharing Works

### Partner Roles

Each partner organization is assigned a single **Partner Role** by the vendor organization. This role defines the maximum set of permissions the partner has when accessing shared entities.

A partner role contains **grants** — permission rules that specify which actions (view, edit, delete) are allowed on which entity types:

```json title="Partner role with grants"
{
  "name": "Installation Partner",
  "type": "partner_role",
  "organization_id": "vendor-org-id",
  "grants": [
    { "action": "entity:view", "resource": "opportunity*" },
    { "action": "entity:edit", "resource": "opportunity*" },
    { "action": "entity:view", "resource": "file*" },
    { "action": "workflow:execution:*", "resource": "*" }
  ]
}
```

The partner role is configured during partner onboarding and applies to **all users** in the partner organization.

### Entity ACLs

When an entity is shared with a partner, an `_acl` (Access Control List) field is written to the entity. The ACL specifies which organizations can perform which operations:

```json title="Entity ACL"
{
  "_id": "opp-123",
  "_schema": "opportunity",
  "_acl": {
    "view": ["org:partner-1", "org:partner-2"],
    "edit": ["org:partner-2"],
    "delete": []
  }
}
```

Permission checks combine the partner role grants with entity-level ACLs using [Attribute-Based Access Control (ABAC)](/docs/auth/authorization). A partner user can only access an entity if:

1. Their **partner role** includes a grant for the action and entity type
2. The entity's **`_acl`** includes their organization for that action

This two-layer approach means vendors maintain full control — even if a partner role grants broad edit access, only entities with matching ACL entries are accessible.

### The `x-epilot-org-id` Header

To access shared entities via API, partner users include the `x-epilot-org-id` header to specify the vendor organization they want to interact with:

```http title="Accessing a shared entity"
GET /v1/entity/opportunity/opp-123
Host: entity.sls.epilot.cloud
Authorization: Bearer <token>
x-epilot-org-id: <vendor-org-id>
```

Without this header, API calls default to the caller's own organization. With the header, the caller accesses resources in the target organization, subject to their partner role permissions and entity ACLs.

### Entity Ownership

When a partner creates an entity in the vendor's organization (e.g., adding a comment to a shared opportunity), the entity receives an `_owner` field set to the partner's organization ID. This gives the partner immediate access to entities they create, without waiting for ACL propagation.

## What Can Be Shared

Sharing applies to entities and their related data. When sharing a top-level entity like an opportunity, vendors can choose to also share:

| Resource | Description |
|----------|-------------|
| **Entities** | The primary entity (opportunity, order, contract) and related entities |
| **Files** | Documents and attachments related to the shared entity |
| **Workflows** | Workflow executions linked to the shared entity |
| **Notes** | Comments and discussion threads on the entity |
| **Emails** | Message threads and their attachments |

Related entities are shared through contextual rules. For example, sharing an order automatically includes its related products and prices, since they are required for the order to be meaningful.

:::tip
Sharing emails automatically includes related message threads and attachments. Sharing notes includes the full comment thread.
:::

## Partner Onboarding

Setting up a new partner involves these steps:

1. **Create the Partner entity** — Add a partner record with name, email, address, and other details
2. **Configure a Partner Role** — Define the permission grants that control what the partner can access
3. **Invite the partner** — Send an invitation for the partner organization to join and link accounts
4. **Share entities** — Begin sharing specific entities through the sharing dialog or automation

Once established, the vendor can share entities from the entity table (single or bulk), the entity detail view, or through automated flows.

## Automating Sharing with Flows

For organizations with recurring sharing patterns, sharing can be automated using [Flows](/docs/automation/automation-flows). Two automated tasks are available:

- **Share Entity** — Automatically share entities with a partner when conditions are met
- **Offer Entity** — Offer entities to partners based on availability rules

Conditions can include entity attributes, labels, purposes, and geographic criteria such as ZIP code-based partner availability. This enables scenarios like automatically sharing all new solar installation opportunities with the nearest qualified installer.

## Partner-Controlled Permissions

While the vendor defines the maximum permissions through the partner role, partner organizations can further **restrict** access for their own users. A partner admin can create internal roles that limit what individual users can do with shared entities.

This follows the **principle of least privilege**: partner internal roles can only narrow permissions, never expand beyond what the vendor granted. For example, if the vendor grants view and edit access to opportunities, a partner admin can create a role that only allows view access for certain team members.

## API Access

The [Partner API](/api/partner) provides endpoints for managing partner relationships programmatically:

- List and search partner organizations in the partner directory
- Manage partner invitations and onboarding
- Query partner details and relationship metadata

For entity-level sharing operations, use the [Entity API](/api/entity) with the `x-epilot-org-id` header to interact with shared entities across organizations.

For managing permission grants and partner roles, use the [Permissions API](/api/permissions).

## Related Topics

- [Flexible Entities](/docs/entities/flexible-entities) — Entity data model and schema system
- [Authorization](/docs/auth/authorization) — ABAC permission model and role system
- [Permissions](/docs/auth/permissions) — Managing roles and grants
