---
sidebar_position: 3
---

# Relations

[[API Docs](/api/entity/#tag/Relations)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Epilot entities can be linked with each other using Relations

![Relation Attribute Example](../../static/img/entity-relation.png)

A list of all related entities can be found on the Relations tab in the default entity view.

Relations are stored on entities using a special JSON object with a `$relation` property.

Example relation attribute value:

```json
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

Relations are supported natively by Entity API, which also exposes a [decicated Relations API](/api/entity/#tag/Relations) to manage relations of entities.
