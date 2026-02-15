---
sidebar_position: 4
---

# Entity Tables

[[API Docs](/api/entity/#tag/Entities)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Entity tables display entities of a given schema in a configurable list view. They support search, attribute-based filtering, column sorting, saved views, and bulk import/export.

## Search and Filtering

[[Search API](/api/entity/#tag/Entities/operation/searchEntities)]

### Free-text Search

Type any keyword in the search bar to perform a fuzzy search across entity data, including hydrated relation data (one level deep).

:::info
Free-text search does not traverse nested relations (i.e. relations of related entities).
:::

### Attribute Filters

Filter by specific attributes loaded from the entity's schema. Each attribute type renders an appropriate filter UI:

| Attribute Type | Filter Behavior |
|----------------|-----------------|
| **String** | List of existing values to pick from |
| **Number** | Range filter (min/max) by default, or value list |
| **Date** | Calendar picker with presets (today, yesterday, this month, etc.) |
| **Select / Status** | Dropdown with the defined options |
| **Address** | Sub-field picker (street, city, postal code, country, etc.) |
| **Relation** | Drill into the related schema's non-relation attributes |
| **User** | List of platform users with name, email, and avatar |
| **Tags / Purposes** | Pick from existing tag or purpose values |
| **ID** | Direct entity ID lookup |

Each filter also supports an **(empty)** option to find entities where the attribute has no value — useful for data hygiene.

**Unsupported filter types:** `computed`, `image`, `file`.

:::tip
Filter suggestions load progressively (up to 50 results). Type a keyword to search within the filter values if you need to find a specific option.
:::

## Saved Views

[[API Docs](/api/entity#tag/Saved-Views)]

Saved views let you persist a table configuration (filters, sort order, visible columns) and share it with your team. Views can be favorited for quick access.

## Import / Export

- [Export Entities](/api/entity/#tag/Export/operation/exportEntities) — export entity data as CSV or XLSX
- [Import Entities](/api/entity#tag/Entity-Import/operation/importEntities) — bulk-import entities from CSV or XLSX