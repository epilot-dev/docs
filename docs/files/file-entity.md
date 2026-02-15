---
sidebar_position: 1
---

# File Entity

[[API Docs](/api/file)]
[[SDK](https://www.npmjs.com/package/@epilot/file-client)]

All files uploaded to epilot are represented as File entities, available via the [Entity API](/docs/entities/entity-api).

## Access Control

The `access_control` attribute controls file visibility:

| Value | Description |
|-------|-------------|
| `private` (default) | Requires authentication to download |
| `public-read` | Accessible via `public_url` without authentication |

When a File entity is created, updated, or deleted, the underlying S3 object's access control is updated accordingly.

## File Relations

Attaching a file to an entity creates a File entity stored as a relation on the parent entity. Files can be attached via:

- Upload through the Files Tab
- File Manager through the Files Tab
- Document Generation
- File attribute
- Image attribute

## Versions

File entities support multiple versions. The latest version is used by default when a File entity is referenced.
