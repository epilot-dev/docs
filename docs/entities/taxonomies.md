---
title: Taxonomies
sidebar_label: Taxonomies
---

# Taxonomies

[[API Docs](/api/entity#tag/Taxonomy)]

Taxonomies provide a labeling and classification system for organizing entities, relations, and files across the epilot platform. They are managed through the **Label Builder** in the epilot UI.

![Label Builder](../../static/img/label-builder.png)

## Taxonomy Types

The system supports three taxonomy types, distinguished by slug prefix:

| Type | Prefix | Purpose |
|------|--------|---------|
| **Entity Labels** | `_schema_` | Classify entities by business purpose or status |
| **Relation Labels** | `_relation_` | Classify the nature of entity relationships |
| **File Collections** | `_system_` | Organize documents and files into groups |

## Entity Labels

Entity labels categorize entities within a schema. Use them to organize by customer type, status, workflow stage, or any business-relevant classification.

### System Labels

These built-in labels are locked and cannot be modified. The platform assigns them automatically during certain operations:

| Label | Assigned When |
|-------|---------------|
| `__hidden` | Entity is hidden from standard views |
| `copy` | Entity was duplicated |
| `merged` | Entity resulted from a merge operation |
| `composite` | Entity is a composite (e.g. composite price) |
| `automation` | Entity was created by an automation |
| `bulk-generated` | Entity was created through a bulk operation |

## Purposes

Purposes are a standalone taxonomy family (slug: `purpose`) that define the business intent of an entity. Beyond classification, purposes also control visibility of attributes and attribute groups within the entity detail view.

## Relation Labels

Relation labels add context to the links between entities, enabling filtering and business logic based on relationship type.

### Predefined Relation Labels

<details>
<summary>Address relations</summary>

- `_relation_address:billing` — Billing address
- `_relation_address:delivery` — Delivery address

</details>

<details>
<summary>Account relations</summary>

- `_relation_account:customer` — Customer account
- `_relation_account:installer` — Installer account
- `_relation_account:planner` — Planner account
- `_relation_account:onsite_contact` — On-site contact
- `_relation_account:architect` — Architect account
- `_relation_account:supplier` — Supplier account

</details>

<details>
<summary>Contact relations</summary>

- `_relation_contact:customer` — Customer contact
- `_relation_contact:installer` — Installer contact
- `_relation_contact:planner` — Planner contact
- `_relation_contact:onsite_contact` — On-site contact
- `_relation_contact:architect` — Architect contact
- `_relation_contact:supplier` — Supplier contact

</details>

## File Collections

File collections organize documents within epilot. Two collection scopes exist:

- **Global collections** — shared across all users and entities (e.g. company policies, standard contracts)
- **User collections** — personal to a specific user within a schema context (e.g. working documents)

## Working with Taxonomies

![Label Builder Details](../../static/img/label-builder-details.png)

### Label Structure

Every taxonomy label has three fields:

```json
{
  "id": "uuid",
  "slug": "_schema_contact:residential",
  "name": "Residential"
}
```

### Permissions

Taxonomy operations require specific permissions:

| Permission | Allows |
|------------|--------|
| `label_builder:create` | Create taxonomies and classifications |
| `label_builder:edit` | Update existing labels |
| `label_builder:delete` | Delete labels |

### Error Handling

| Error | Status | Cause |
|-------|--------|-------|
| `TaxonomyNotFoundError` | 404 | Taxonomy slug does not exist |
| `TaxonomyAlreadyExistsError` | 409 | Taxonomy with this slug already exists |
| `TaxonomyValidationError` | 400 | Invalid request payload |
| `TaxonomyInUseError` | 400 | Cannot delete a taxonomy still in use |

### Bulk Operations

Create, update, and delete classifications in a single request:

```json title="POST /v1/entity/taxonomies/{taxonomySlug}/classifications"
{
  "create": [
    { "id": "uuid", "name": "New Label", "slug": "new-label" }
  ],
  "update": [
    { "id": "existing-id", "name": "Updated Name" }
  ],
  "delete": [
    { "id": "id-to-delete" }
  ]
}
```

### SDK Example

```typescript
import { getEntityClient } from '@epilot/entity-client';

const client = getEntityClient();

// Create a taxonomy
const taxonomy = await client.createTaxonomy({}, {
  slug: 'project-status',
  name: 'Project Status',
  type: 'entity',
  enabled: true
});

// Add classifications
await client.updateClassifications({
  taxonomySlug: 'project-status'
}, {
  create: [
    { id: 'uuid-1', name: 'Planning', slug: 'planning' },
    { id: 'uuid-2', name: 'In Progress', slug: 'in-progress' },
    { id: 'uuid-3', name: 'Completed', slug: 'completed' }
  ]
});

// Search classifications
const results = await client.searchClassifications({
  taxonomySlug: 'project-status',
  query: 'progress',
  include_archived: 'false'
});
```
