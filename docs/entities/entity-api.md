---
sidebar_position: 5
---

# Entity API

[[API Docs](/api/entity/#tag/Entities)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

The Entity API provides a common flexible data layer for epilot business objects.

The design of Entity API consists of multiple different parts each providing core functionality for Flexible Entities:

- [Schema API](#schema-api)
- [CRUD API](#crud-api)
- [Search API](#search-api)
- [Relations API](#relations-api)
- [Activity API](#activity-api)

## Schema API

[[API Docs](/api/entity/#tag/Schemas)]

The Schema API defines the unique data model of each tenants' business entities.

This is where you define what e.g. _Contacts_, _Orders_, _Opportunities_, _Products_ should look like.

Schema objects stored by the Schema API are used to control how the epilot application displays entities in the Portal UI.

The Schema API gives full control to create, update and delete Schemas, complete with versioning and blueprints as examples of entity schemas.

```json
// GET /v1/entity/schemas/contact
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

The CRUD API (create-read-update-delete) is a simple JSON document storage for entities.

Any JSON object can be stored and retrieved as an entity using the CRUD API.

```json
// createEntity
// POST /v1/entity/exampleSchema
{
  "hello": "world"
}
```

```json
// getEntity
// GET /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c
{
  "_id": "77f9e5ad-7809-4376-bbf1-817b3cadb94c",
  "_schema": "exampleSchema",
  "_created_at": "2022-09-01T00:00:00.000Z",
  "_updated_at": "2022-09-01T00:00:00.000Z",
  "hello": "world"
}
```

```json
// updateEntity
// PUT /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c
{
  "hello": "updated"
}
```

```json
// deleteEntity
// DELETE /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c
```

## Relations API

[[API Docs](/api/entity/#tag/Relations)]

The Relations API is a convenience API to manage relations between entities:

```json
// addRelations
// POST /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c/relations
[
  {
    "attribute": "products",
    "entity_id": "e8878f62-2d3d-4c86-bfe7-01a4180ff048",
    "_tags": []
  }
]
```

The API can also be used to retrieve the related entities using the `?hydrate=true` parameter:

```json
// getRelations
// GET /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c/relations?hydrate=true
[
  {
    "_id": "e8878f62-2d3d-4c86-bfe7-01a4180ff048",
    "_schema": "product",
    "_title": "Sample Product",
    "price": 10000
  }
]
```

## Search API

The Entity Search API provides list and search functionality for entity documents.

### Listing Entities

[[API Docs](/api/entity#operation/listEntities)]

Simple listing of entities without a need for loose matching can be done using a subset of [Elastic DSL](https://www.elastic.co/docs/explore-analyze/query-filter/languages/querydsl) with convenience combination operators.

```json
// listEntities
// POST /v1/entity:list
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

Elasticsearch (Lucene) query syntax is supported for complex querying.

```json
// searchEntities
// POST /v1/entity:search
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

Stable Queries are designed to allow paginating through large and changing datasets without missing or duplicating records or perform multiple queries on the same changing dataset. They provide consistency guarantees over a short window of time, making them suitable for automation, bulk processing, exports, and similar tasks where precision matters.

To use stable queries, pass `stable_for` (available both on `listEntities` or `searchEntities`), which denotes for how many seconds to maintain a stable search context.
Then, always use the latest returned `stable_query_id` — each subsequent search request can return different identifiers.

It is recommended to use `search_after` with Stable Queries as it allows doing precise deep pagination.

Avoid extending the TTL unnecessarily — stable windows are short by design to reduce server-side resource usage.

#### When to use Stable Queries?

- When you need to retrieve more than a few pages in one go.
- When you need to paginate more than 25 000 records deep (from + size).
- When you cannot tolerate missing or duplicate items during pagination.
- When you need to perform multiple queries within the same context.

#### When not to use Stable Queries?

- If you are performing just one query with no pagination (<=1000 items - max size).
- If your next related query is waiting for user input. For example, you do not know when the user will visit the next page and stable windows are limited in time by design. It is better to give the user tools to find the relevant record using filters or search rather than to require them to scan pages of results manually.

## Relations API

[[API Docs](/api/entity/#tag/Relations)]

The Relations API is a convenience API to manage relations between entities.

Relations are stored as an attribute with a `$relation` property on the entity document.

```json
// addRelations
// POST /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c/relations
[
  {
    "attribute": "account",
    "entity_id": "e8878f62-2d3d-4c86-bfe7-01a4180ff048",
    "_tags": []
  }
]
```

## Activity API

[[API Docs](/api/entity#tag/Activity)]

The Activity API provides an append-only event log for all actions performed on entities.

Each activity item contains a timestamp, the caller (who), a type, title and message a list of Entity `createEntity`, `updateEntity`, `deleteEntity` operations.

Entity mutations automatically create activities unless an existing activity id is provided explicitly, in which case the operation is linked to the existing activity.

Activities stored in the API appear in the Activity Feed in the entity portal UI.

```json
// getEntityActivityFeed
// GET  /v1/entity/exampleSchema/77f9e5ad-7809-4376-bbf1-817b3cadb94c/activity
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
