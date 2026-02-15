---
sidebar_position: 3
---

# File Collections

[[API Docs](/api/file)]
[[SDK](https://www.npmjs.com/package/@epilot/file-client)]

File Collections let you group and organize files within entities. They support drag-and-drop and come in two types: shared (global) and personal (user).

## Global Collections

Global collections are shared across the entire organization. Create them from the Label Builder under the **File Collections** tab, or via the [Taxonomies](/docs/entities/taxonomies#file-collections) functionality and [Taxonomy API](/api/entity#tag/Taxonomy/operation/createTaxonomyClassification). Only a taxonomy classification is required -- no taxonomy family.

Each global collection is associated with a specific schema (e.g., opportunity, order). Files added to a global collection are scoped to the individual entity, providing a common organizational structure across entities of the same type.

![Global File Collections](../../static/img/file/global-file-collections.png)

## User Collections

User collections are personal to the user who creates them. Create them from the Files area of any entity with the files capability, or via the [file collection facade API](/api/file).

Each user collection is associated with a specific schema, letting you build custom file views per entity type.

![User File Collections](../../static/img/file/user-file-collections.png)