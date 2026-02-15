---
sidebar_position: 0
---

# Flexible Entities

[[API Docs](/api/entity)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Everything in epilot is an **entity** — contacts, orders, products, contracts, meters, files, and more. Entities are flexible JSON objects backed by user-definable schemas, so the data model adapts to each tenant's business processes rather than the other way around.

The platform ships with a standard set of [core entities](/docs/entities/core-entities) covering common energy industry objects, but organizations can extend schemas with custom attributes or define entirely new entity types via the [Entity API](/docs/entities/entity-api).

All entities share built-in fields prefixed with `_` (e.g. `_id`, `_schema`, `_org`, `_created_at`) that are managed by the platform.

## Schemas

Schemas define the structure of entities and control how they appear in the UI. Each schema specifies the entity's attributes, capabilities, and display configuration.

See [Core Entities](/docs/entities/core-entities) for the full list of built-in schemas.

## Attributes

Schemas define a list of **attributes** — the fields an entity can have. Attributes are rendered as columns in table views and as editable fields in entity detail views.

Examples: `first_name`, `last_name`, `vat_id`, `product_name`, `order_number`.

See [Attributes](/docs/entities/attributes) for the full reference.

:::info
Only attributes defined in the schema are searchable via the Entity API.
:::

## Capabilities

Capabilities extend entity views with additional functionality. They are defined on the schema and hook into the UI as tabs, groups, or actions.

Examples: file attachments, email messages, order item tables, workflow overviews, automation actions.

See [Capabilities](/docs/entities/capabilities) for details.

## Relations

Entities support native relations — any entity can be linked to any other entity. Relations are stored as attributes containing a `$relation` array with references to related entities.

See [Relations](/docs/entities/relations) for details.

## Activity

Every mutation on an entity is recorded in an append-only **Activity** feed. Each activity item includes a timestamp, the caller identity, a description, and the list of operations performed.
