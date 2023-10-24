---
sidebar_position: 1
---

# Entity Viewers API

[[API Docs](/api/entity-viewers/#tag/Viewers)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-viewers-client)]

The Entity Viewers API provides the capability to track user view-actions with entities. It offers endpoints to track when a user has seen an entity, downloaded a file and allows to mark an entity as unseen.

The entity schame must have the `entity_viewers` capability configured:

```json
{
  "id": "8b2e66ef-5a30-4dcd-8f88-a51af7a54cc6",
  "name": "File",
  "plural": "Files",
  "slug": "file",
  "capabilities": [
    {
      "name": "entity_viewers",
      "title": "Entity Viewers",
      "ui_hooks": []
    }
  ],
}
```

Once the `entity_viewers` capability is configured, you can start tracking view actions for different entities.

To mark file as downloaded:
```
POST https://entity-viewers.sls.epilot.io/v1/viewers/file/8b2e66ef-5a30-4dcd-8f88-a51af7a54cc6/downloaded
```

To mark the opportunity as seen:
```
POST https://entity-viewers.sls.epilot.io/v1/viewers/opportunity/ac23565b-4944-44d4-b898-a3ac2f734c12/seen
```

To mark the contract as unseen:
```
DELETE https://entity-viewers.sls.epilot.io/v1/viewers/contract/24dcc29d-36c4-4824-88f5-1e9967138803/seen
```
