---
sidebar_position: 3
---

# File Collections

[[API Docs](/api/file)]
[[SDK](https://www.npmjs.com/package/@epilot/file-client)]

File Collections introduce a fast, intuitive way to group and access files as you work inside entities. They adapt to an org’s workflow, shared and / or personal, and make organising files as simple as drag & drop. And there are two flavours:

## Global Collections

Global collections are created from the Label Builder in the 'File Collections' tab. They can also be created using the [Taxonomies](/docs/entities/taxonomies#file-collections) functionality and [API](/api/entity#tag/Taxonomy/operation/createTaxonomyClassification).

They are created with a hard association to a schema (opportunity, order etc) and they are shared for the entire organisation. A file added to a global collection is only in that collection for the added entity. It is used to provide a common set of collections that schemas might require on a common basis.

![Global File Collections](../../static/img/file/global-file-collections.png)

## User Collections

User collections are created from the Files area of an entity that has the files capability. They can also be created using the [file collection facade API](/api/file) that simplifies collection creation.

They are unique to the user who created the collection and have a hard association to a schema (opportunity, order etc). This allows a user to create quick views on files of their choice.

![User File Collections](../../static/img/file/user-file-collections.png)