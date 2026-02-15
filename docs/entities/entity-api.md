---
sidebar_position: 5
---

# Entity API

[[API Docs](/api/entity/#tag/Entities)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

The Entity API is the primary data layer for epilot business objects. It exposes five sub-APIs:

- [Schema API](#schema-api) — define entity data models
- [CRUD API](#crud-api) — create, read, update, delete entities
- [Search API](#search-api) — list and search entities
- [Relations API](#relations-api) — manage links between entities
- [Activity API](#activity-api) — audit log for entity mutations

## Schema API

[[API Docs](/api/entity/#tag/Schemas)]

The Schema API defines the data model for each organization's business entities. Schemas control how entities like Contacts, Orders, and Products are structured and displayed in the UI.

Schemas support versioning and can be created, updated, or deleted programmatically. See [Core Entities](/docs/entities/core-entities) for the built-in schemas.

```json title="GET /v1/entity/schemas/contact"
{
  "id": "5dbbe2c7-43c8-4043-b470-f41882efeefa",
  "name": "Contact",
  "plural": "Contacts",
  "slug": "contact",
  "icon": "person",
  "published": true,
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    // ...
  },
  "group_settings": [
    {
      "id": "Personal Details",
      "label": "Personal Details",
      "expanded": true,
      "order": 10
    }
    // ...
  ],
  "attributes": [
    {
      "label": "Last Name",
      "name": "last_name",
      "type": "string",
      "group": "Personal Details",
      "layout": "half_width",
      "protected": true,
      "order": 5
    },
    {
      "label": "First Name",
      "name": "first_name",
      "type": "string",
      "group": "Personal Details",
      "layout": "half_width",
      "protected": true,
      "order": 6
    }
    //
  ],
  "capabilities": [
    {
      "name": "files",
      "title": "Files",
      "feature_flag": "ff_files_enabled",
      "ui_hooks": [
        {
          "hook": "EntityDetailsV2:Tab",
          "title": "Files",
          "component": "EntityFiles",
          "order": 50
        }
      ]
    },
    {
      "name": "messages",
      "title": "Messages",
      "feature_flag": "ff_messaging_enabled",
      "ui_hooks": [
        {
          "hook": "EntityDetailsV2:Tab",
          "title": "Messages",
          "import": "@epilot360/messaging",
          "order": 51,
          "requiredPermission": {
            "action": "message:view"
          }
        }
      ]
    }
    // ...
  ],
  "created_at": "2022-05-10T19:20:03.225Z",
  "updated_at": "2022-08-19T15:49:13.387Z",
  "version": 26
}
```

## CRUD API

[[API Docs](/api/entity/#tag/Entities)]

The CRUD API provides create, read, update, and delete operations for entity documents. Any JSON object can be stored as an entity.

```json title="createEntity — POST /v1/entity/{schema}"
{
  "hello": "world"
}
```

```json title="getEntity — GET /v1/entity/{schema}/{id}"
{
  "_id": "77f9e5ad-7809-4376-bbf1-817b3cadb94c",
  "_schema": "exampleSchema",
  "_created_at": "2022-09-01T00:00:00.000Z",
  "_updated_at": "2022-09-01T00:00:00.000Z",
  "hello": "world"
}
```

```json title="updateEntity — PUT /v1/entity/{schema}/{id}"
{
  "hello": "updated"
}
```

```text title="deleteEntity — DELETE /v1/entity/{schema}/{id}"
204 No Content
```

## Search API

The Search API provides list and search functionality for entity documents.

### Listing Entities

[[API Docs](/api/entity#operation/listEntities)]

Use `listEntities` for structured filtering with a subset of [Elasticsearch Query DSL](https://www.elastic.co/docs/explore-analyze/query-filter/languages/querydsl):

```json title="listEntities — POST /v1/entity:list"
{
  "filter": [
    { "term": { "_schema": "exampleSchema" } },
    { "term": { "hello": "world" } }
  ],
  "sort": "_created_at:desc",
  "from": 0,
  "size": 10,
  "hydrate": false,
  "fields": ["_id", "_title", "first_name"]
}
```

### Searching Entities

[[API Docs](/api/entity#operation/searchEntities)]

Use `searchEntities` for free-text search with Lucene query syntax:

```json title="searchEntities — POST /v1/entity:search"
{
  "q": "_schema:exampleSchema AND hello:world",
  "sort": "_created_at:desc",
  "from": 0,
  "size": 10,
  "hydrate": false,
  "fields": ["_id", "_title", "first_name"]
}
```

### Stable Queries

Stable Queries let you paginate through large, changing datasets without missing or duplicating records. They provide consistency guarantees over a short time window, making them ideal for automation, bulk processing, and exports.

To use stable queries, pass `stable_for` (seconds) on `listEntities` or `searchEntities`. Always use the latest returned `stable_query_id` in subsequent requests — the ID can change between pages. Combine with `search_after` for precise deep pagination.

:::tip
Keep the `stable_for` TTL short. Stable windows consume server-side resources and are designed for batch operations, not interactive pagination.
:::

**Use stable queries when:**
- Paginating more than a few pages in one batch
- Paginating beyond 25,000 records deep (`from` + `size`)
- You need consistency guarantees (no missing/duplicate items)
- Running multiple queries against the same dataset snapshot

**Skip stable queries when:**
- Fetching a single page (up to 1,000 items, the max `size`)
- The next page request depends on user input (the stable window may expire)

## Relations API

[[API Docs](/api/entity/#tag/Relations)]

The Relations API manages links between entities. Relations are stored as attributes with a `$relation` property on the entity document.

```json title="addRelations — POST /v1/entity/{schema}/{id}/relations"
[
  {
    "attribute": "products",
    "entity_id": "e8878f62-2d3d-4c86-bfe7-01a4180ff048",
    "_tags": []
  }
]
```

Pass `?hydrate=true` to retrieve full related entity data:

```json title="getRelations — GET /v1/entity/{schema}/{id}/relations?hydrate=true"
[
  {
    "_id": "e8878f62-2d3d-4c86-bfe7-01a4180ff048",
    "_schema": "product",
    "_title": "Sample Product",
    "price": 10000
  }
]
```

See [Relations](/docs/entities/relations) for details on how relations are stored and queried.

## Activity API

[[API Docs](/api/entity#tag/Activity)]

The Activity API provides an append-only audit log for all entity mutations.

Each activity item contains a timestamp, the caller identity, a type, title, message, and a list of operations (`createEntity`, `updateEntity`, `deleteEntity`).

Entity mutations automatically create activity entries. To group multiple operations under one activity, pass an existing `activity_id` in the request.

```json title="getEntityActivityFeed — GET /v1/entity/{schema}/{id}/activity"
{
  "total": 1,
  "results": [
    {
      "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
      "timestamp": "2019-08-24T14:15:22Z",
      "type": "MyCustomActivity",
      "title": "My custom activity",
      "message": "{{caller}} did something with {{entity payload.entity.id}}.",
      "payload": {
        "entity": {
          "id": "77f9e5ad-7809-4376-bbf1-817b3cadb94c",
          "schema": "exampleSchema"
        }
      },
      "caller": {
        "EpilotAuth": {
          "token": {
            "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
            "token_use": "access",
            "auth_time": 1614333023,
            "exp": 1614336623,
            "iat": 1614333023,
            "email": "example@epilot.cloud"
          }
        }
      },
      "operations": [
        {
          "entity": "77f9e5ad-7809-4376-bbf1-817b3cadb94c",
          "org": "123",
          "activity_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
          "operation": "createEntity",
          "params": {
            "id": "77f9e5ad-7809-4376-bbf1-817b3cadb94c",
            "slug": "contact"
          },
          "payload": {
            "_schema": "contact",
            "_org": "123",
            "status": "Inactive"
          }
        }
      ]
    }
  ]
}
```
