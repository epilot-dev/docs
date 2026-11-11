---
sidebar_position: 5.5
title: Search Indexing Guarantees
description: "Consistency and freshness guarantees of the entity search and list APIs: when writes become searchable, what is indexed, and how to paginate reliably."
---

# Search Indexing Guarantees

[[API Docs](/api/entity/#tag/Entities)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Entities live in two places: a **primary store**, which is the source of truth, and a **search index**, which powers `searchEntities`, `listEntities` and with them every [entity table](/docs/entities/entity-tables) in epilot.

Every write goes to the primary store first and is indexed afterwards. This page describes what you can rely on between those two steps.

## At a Glance

| You do | You can rely on |
|--------|-----------------|
| Write an entity (default) | It is searchable **when the write call returns** |
| Write with `?async=true` | It becomes searchable shortly after — **eventually consistent**, no upper bound |
| Read by ID (`getEntity`) | **Always** the latest stored state |
| Search or list | Matching, sorting and `hits` reflect the index; returned entities are loaded fresh from the primary store |
| Change an entity that other entities relate to | Related entities are re-indexed **asynchronously** |
| Paginate with `from` | Up to `from + size = 25,000`, results may shift between pages |
| Paginate with `stable_for` + `search_after` | A consistent snapshot, no missing or duplicate items |

## Which API Reads From Where

| Operation | Reads from | Consistency |
|-----------|-----------|-------------|
| `getEntity`, `getEntityV2` | Primary store | Strong — read-your-writes |
| `getRelations`, `getRelationsV3` | Primary store | Strong — read-your-writes |
| `searchEntities`, `listEntities` | Search index | See [write guarantees](#write-guarantees) |
| `getRelationsV2` | Search index | Same as search |
| `autocomplete` | Search index | Same as search |
| `upsertEntity` (matching by `unique_key`) | Search index | Same as search — see [upserts](#upserts-and-unique-keys) |
| `exportEntities` | Search index | Same as search |

If you know the entity ID, read by ID. Use search to find entities, not to confirm a write.

## Write Guarantees

### Synchronous writes (default)

`createEntity`, `updateEntity`, `patchEntity`, `upsertEntity` and the relation operations (`addRelations`, `updateRelation`, `removeRelations`, `deleteRelation`) index the entity **before they respond**. Once you receive the success response:

- The entity is stored and readable by ID.
- The entity is visible in `searchEntities` and `listEntities` with its new values.
- Webhooks and automations triggered by the write can already find the entity through search.

`deleteEntity` is always synchronous. A deleted entity leaves the default search results before the call returns. Soft-deleted entities stay findable with `include_deleted: "true"` or `"only"`.

### Asynchronous writes (`?async=true`)

Pass `async=true` to skip waiting for the index. The call returns as soon as the entity is stored, and indexing happens in the background.

- The entity is immediately readable by ID.
- It appears in search **eventually** — usually within a few seconds. There is no guaranteed upper bound: during bulk imports or large migrations the delay grows with the backlog.
- Multiple quick writes to the same entity are coalesced. The index always converges to the **latest stored state**, never to an intermediate or older one.
- Webhooks and automations triggered by the write may run **before** the entity is searchable.

Use `async=true` for migrations and bulk loads where throughput matters more than immediate searchability. Keep the default for anything interactive.

```json title="createEntity — POST /v1/entity/contact?async=true"
{
  "first_name": "Erika",
  "last_name": "Mustermann"
}
```

:::caution
Do not write with `async=true` and then search for the entity right away. Use the `_id` from the write response and read by ID instead.
:::

### Failed writes

A write that returns a `5xx` error may already be stored but not yet indexed. Read the entity by ID to check, and call [`reindexEntity`](#repairing-a-stale-entity) or repeat the update to make it searchable.

## Related Entity Data

Search documents contain a copy of the data of directly related entities (one level deep). This is what makes free-text search and relation filters work across relations — for example finding an order by its customer's name.

That copy is refreshed **asynchronously**, even for synchronous writes:

- When you update a contact, the contact itself is searchable with the new values right away.
- Orders, contracts and other entities that relate to this contact are re-indexed in the background. Until then, searching orders by the contact's **old** name still matches.
- Up to 500 related entities are refreshed right after each change. Entities with more relations than that are caught up by a nightly job.
- Changes that cannot affect related search documents are skipped.

The entities returned in the response are not affected: hydrated relations (`hydrate: true`) are always loaded fresh from the primary store. Only **matching, filtering and sorting** on related data can lag.

## What Is Indexed

Only data described by the entity schema is searchable:

- Attributes defined in the schema, including attributes added by [capabilities](/docs/entities/capabilities)
- System fields such as `_id`, `_schema`, `_title`, `_tags`, `_purpose`, `_created_at`, `_updated_at`, `_acl`
- Direct relations and a copy of the related entities' data, one level deep

Properties that are **not** part of the schema are stored and returned by `getEntity`, but you cannot search, filter or sort by them. Add the attribute to the schema first.

Invalid values are skipped rather than rejected: a date attribute holding a non-date string or an address attribute without address fields is stored, but not indexed.

:::info
After adding an attribute to a schema, existing entities become searchable by it the next time they are written or re-indexed.
:::

## Search Results

### Matching vs. returned data

`searchEntities` and `listEntities` evaluate the query, sort order, aggregations and `hits` total against the index. The entities in `results` are then loaded from the primary store.

This means a result can be **newer** than the state that matched. If an entity was changed with `async=true` a moment ago, it may still be returned for a filter it no longer satisfies — carrying its current values.

### Totals

`hits` is the exact number of matching entities, not an estimate, including for result sets beyond the pagination window.

### Permissions

Access restrictions are part of the index and applied at query time. A change to an entity's access is effective in search as soon as that entity is re-indexed, following the same rules as any other write.

## Pagination

### Offset pagination (`from` / `size`)

- `size` is capped at **1,000** per page.
- `from + size` is limited to **25,000**. A larger `from` is not rejected — it is clamped to the last available window, so paging past the limit returns the same items again.
- Each page is an independent query. If entities are created, changed or deleted between requests, items can shift across pages and appear twice or not at all.

Offset pagination is the right choice for interactive tables where a person pages through results.

### Deep pagination (`search_after`)

Pass the `sort_end` array of the previous response as `search_after` to continue after the last item. This has no depth limit. Always pass an explicit `sort`, for example `_created_at:asc`.

On its own, `search_after` still runs every page as an independent query: entities that change between requests, or that share the same sort value, can be skipped or repeated. Combine it with a stable query to rule that out.

### Stable queries (`stable_for`)

For a guaranteed consistent walk through a result set, combine `search_after` with a [stable query](/docs/entities/entity-api#stable-queries):

```json title="listEntities — POST /v1/entity:list"
{
  "filter": [{ "term": { "_schema": "contact" } }],
  "sort": "_created_at:asc",
  "size": 1000,
  "stable_for": 30
}
```

```json title="Next page"
{
  "filter": [{ "term": { "_schema": "contact" } }],
  "sort": "_created_at:asc",
  "size": 1000,
  "stable_for": 30,
  "stable_query_id": "<stable_query_id from the previous response>",
  "search_after": [1747905443332, "0.000023312468"]
}
```

`search_after` takes the `sort_end` array of the previous response as is. Always pass the `stable_query_id` of the **latest** response — it can change between pages.

A stable query freezes the index at the moment of the first request:

- Every matching entity is returned exactly once — no gaps, no duplicates.
- Writes made after the first request are **not** visible in later pages.
- The snapshot lives for `stable_for` seconds (maximum 60) and is extended by every request that passes `stable_for` again.
- When it expires, the API responds with `400 Point in time query has expired`. Start over with a new query.

## Repairing a Stale Entity

Background indexing is retried automatically. In the rare case an entity stays out of date in search, any of these brings it back in sync:

- Write the entity again (any update re-indexes it).
- Call `reindexEntity`, which re-indexes the entity and all entities related to it:

```text title="reindexEntity — POST /v1/entity/{slug}/{id}:reindex"
200 OK
```

## Upserts and Unique Keys

`upsertEntity` finds the existing entity for a `unique_key` through the search index. Uniqueness is therefore **not** enforced transactionally:

- Two concurrent upserts with the same key can both find nothing and create two entities.
- An upsert that follows an `async=true` write of the same key may not find it yet and create a duplicate.

To keep unique keys unique, run upserts for the same key one after another and use synchronous writes (the default). Pass `strict=true` to get a `409` instead of a silent update when more than one entity already matches.

## Recommendations

| Scenario | Approach |
|----------|----------|
| Create an entity, then show it in a list | Default synchronous write, then search |
| Create an entity, then keep working with it | Use the `_id` from the response and `getEntity` |
| Bulk load or migration | `async=true`, verify by ID, not by search |
| Export or batch-process a full result set | `stable_for` + `search_after` |
| More than 25,000 results | `search_after`, never a large `from` |
| React to entity changes | [Webhooks](/docs/integrations/webhooks) instead of polling search |
| Sync by `unique_key` | Sequential, synchronous `upsertEntity` calls |
