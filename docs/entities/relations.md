---
sidebar_position: 6
description: "Relations link entities to each other across epilot, regardless of schema. Covers the relation data structure, references, hydration and relation attributes."
---

# Relations

[[API Docs](/api/entity/#tag/Relations)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Relations link entities to each other across the epilot platform. Any entity can relate to any other entity, regardless of schema. The Relations tab on each entity detail view shows all linked entities.

```mermaid
flowchart LR
    Order -->|"contacts (has_many)"| Contact1[Contact A]
    Order -->|"contacts (has_many)"| Contact2[Contact B]
    Order -->|"products (has_many)"| Product
    Contract -->|"billing_address ($relation_ref)"| Contact1
```

## Data Structure

Relations are stored as a JSON object with a `$relation` array. Each entry references a related entity by ID and can carry `_tags` for classification:

```json title="stored-value"
{
  "contacts": {
    "$relation": [
      {
        "entity_id": "48e9432b-05e9-44fb-a8c2-8d29d9ceade8",
        "_tags": ["CEO", "primary"]
      },
      {
        "entity_id": "c0f7ad05-f03d-4d6a-a36a-c85281da28bb",
        "_tags": ["Head of sales"]
      }
    ]
  }
}
```

## Relation References

Relation references (`$relation_ref`) point to a specific attribute on a related entity, avoiding data duplication. This is useful when a contract should reference the billing address or payment method stored on another entity.

```json title="stored-value"
{
  "billing_address": {
    "$relation_ref": [
      {
        "entity_id": "843f2de0-f71a-43fc-a5f5-908e20c4df25",
        "path": "address",
        "_id": "addr1"
      }
    ]
  }
}
```

| Field | Description |
|-------|-------------|
| `entity_id` | The related entity's ID |
| `path` | Path to the attribute on the related entity |
| `_id` | Optional: ID of a specific item within a repeatable attribute |

## Hydration

Pass `hydrate=true` to Entity API operations (`getEntity`, `searchEntities`, `getRelations`) to resolve `$relation` and `$relation_ref` references in-place. Each relation entry is expanded to include the full entity data while preserving the original reference metadata.

See [Entity API — Relations API](/docs/entities/entity-api#relations-api) for API usage examples.

## Relation Attributes

Relations are defined on schemas as [relation attributes](/docs/entities/attributes#relation). Key schema properties:

- `relation_type` — `"has_many"` or `"has_one"`: the **cardinality** (how many entities the attribute holds), not the direction
- `allowedSchemas` — restricts which entity types can be linked
- `reverse_attributes` — makes the attribute a **reverse relation**: the related entities point to this entity, and the attribute is derived from them. Absent means a **direct relation**. See [Direction](#direction-direct-and-reverse-relations)
- `relation_affinity_mode` — `"weak"` (preserved on duplication) or `"strong"` (discarded on duplication)

### Direction: direct and reverse relations

Every relation attribute has a **direction**: which of the two entities stores the link. The direction is determined by the presence of `reverse_attributes`, and is independent of `relation_type`.

| | Direct relation | Reverse relation |
|---|---|---|
| `reverse_attributes` | absent | present |
| Who points to whom | this entity points to the related entities | the related entities point to this entity |
| Where the link is stored | in this attribute's value on this entity (`$relation`) | on the related entities, in the direct attribute named in `reverse_attributes` |
| Value of this attribute | stored on this entity | derived when the entity is hydrated; nothing is stored on this entity |

`relation_type` is a separate axis. It only says how many entities the attribute can hold: `has_one` for one, `has_many` for many. Either direction can use either value.

`reverse_attributes` maps the slug of the related schema to the name of the direct attribute on that schema that points back:

```json title="contact schema: direct relation (this contact points to an account)"
{ "name": "account", "type": "relation", "relation_type": "has_one", "allowedSchemas": ["account"] }
```

```json title="account schema: reverse relation (the contacts that point to this account)"
{
  "name": "contacts",
  "type": "relation",
  "relation_type": "has_many",
  "allowedSchemas": ["contact"],
  "reverse_attributes": { "contact": "account" }
}
```

The link lives on each contact, in `contact.account`. `account.contacts` lists the contacts whose `account` points to the account, so it is a view and not separately stored data.
