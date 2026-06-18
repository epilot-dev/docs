---
sidebar_position: 3
title: "File Data Delivery"
---

# File Data Delivery

[[API Docs](/api/webhooks)]
[[SDK](https://www.npmjs.com/package/@epilot/webhooks-client)]

Some events carry one or more files — for example **File Created** (`event_FileCreated`). For these **file events**, a webhook can deliver the actual file *bytes* to your endpoint, not just a reference to them.

You choose how the bytes are delivered with the webhook's `deliveryMode`:

- **`json_base64`** — each file is Base64-encoded and embedded in the JSON payload. Supports JSONata transformation.
- **`binary_multipart`** — files are sent as binary parts in a `multipart/form-data` request. Best for ERP systems and large files.

:::info
`deliveryMode` is **only relevant for file events**. For all other events it is absent and has no effect. A webhook is a file event when its event payload contains an `event_attachments` array (see below).
:::

## What is a file event?

File events are delivered using the [Event Catalog](/api/event-catalog) envelope (fields such as `_event_name`, `_event_id`, `_org_id`, and the hydrated entity), not the `metadata`/`entity` structure of [automation-trigger webhooks](./automation-trigger.md). What makes an event a *file event* is a top-level `event_attachments` array. Each entry describes one file:

| Field           | Type     | Description                                                        |
| --------------- | -------- | ------------------------------------------------------------------ |
| `entity_id`     | string   | Entity ID of the file                                              |
| `filename`      | string?  | Name of the file (e.g. `invoice.pdf`)                              |
| `mime_type`     | string?  | MIME type (e.g. `application/pdf`)                                 |
| `size_bytes`    | number?  | File size in bytes                                                 |
| `readable_size` | string?  | Human-readable size (e.g. `"200 KB"`)                              |
| `s3ref`         | object?  | Internal storage reference (`bucket`, `key`) — not directly accessible to you |
| `version_index` | number   | File version index (`0` for newly created files)                  |

```json title="File event payload (abbreviated)"
{
  "_event_name": "FileCreated",
  "_event_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "_event_time": "2026-06-18T10:00:00.000Z",
  "_org_id": "739224",
  "operation": "createEntity",
  "event_attachments": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "filename": "invoice.pdf",
      "mime_type": "application/pdf",
      "size_bytes": 204800,
      "readable_size": "200 KB",
      "version_index": 0
    }
  ]
  // ...plus the hydrated entity (e.g. "file": { ... }) and other event fields
}
```

## Default: references only

If you do **not** set a `deliveryMode`, the webhook is delivered as a normal JSON payload. The `event_attachments` references are included, but **the file binaries are not loaded or transmitted** — your endpoint receives the references only and is responsible for fetching the files itself if needed.

To deliver the actual bytes, opt in by choosing one of the two delivery modes below. In the webhook configuration UI this is the *"This event can include attached files — include them in the payload?"* setting.

## Mode 1 — JSON (Base64)

Set `deliveryMode: "json_base64"`. Each attached file is downloaded, Base64-encoded, and appended to the payload as a `file_data` array. The original `event_attachments` references remain in place.

Each `file_data` entry contains:

| Field        | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `base64`     | string | The file bytes, Base64-encoded       |
| `mime_type`  | string | MIME type of the file                |
| `filename`   | string | Original filename                    |
| `size_bytes` | number | File size in bytes                   |

```json title="json_base64 payload"
{
  "_event_name": "FileCreated",
  "_org_id": "739224",
  "event_attachments": [
    { "entity_id": "3fa85f64-...", "filename": "invoice.pdf", "mime_type": "application/pdf", "size_bytes": 204800, "version_index": 0 }
  ],
  "file_data": [
    {
      "base64": "JVBERi0xLjQKJcfsj6IK...",
      "mime_type": "application/pdf",
      "filename": "invoice.pdf",
      "size_bytes": 204800
    }
  ]
  // ...plus other event fields
}
```

The request is sent as `application/json`. A [JSONata transformation](./customization.md) — if configured — runs **after** `file_data` is added, so your expression can reference the encoded files.

## Mode 2 — Binary (multipart/form-data)

Set `deliveryMode: "binary_multipart"`. Files are sent as binary parts in a `multipart/form-data` request (`Content-Type: multipart/form-data; boundary=...`). This avoids the ~33% size overhead of Base64 and is the format most ERP systems and file-import endpoints expect.

The body is shaped by the optional `multipartConfig` object:

| Field                | Default             | Description                                                                                                                                                  |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fileFieldName`      | `"file"`            | Name of the binary form part. The same name is reused for every part when multiple files are sent.                                                           |
| `fileFieldStrategy`  | `"single"`          | `single` fails the delivery if the picker resolves to more than one attachment. `multi` accepts any non-empty count.                                          |
| `fileSource`         | `"event_attachments"` | JSONata expression selecting which attachment(s) to send. When it resolves to `undefined`, `null`, or `[]`, the event is silently skipped. Validated at save time. |
| `extraFields`        | `{}`                | Map of `formFieldName → JSONata expression` for additional **scalar** form parts (e.g. an entity reference).                                                  |

```text title="binary_multipart request body"
--boundary
Content-Disposition: form-data; name="file"; filename="invoice.pdf"
Content-Type: application/pdf

<binary bytes>
--boundary
Content-Disposition: form-data; name="entityId"

3fa85f64-5717-4562-b3fc-2c963f66afa6
--boundary--
```

### Picking files with `fileSource`

`fileSource` is a JSONata expression evaluated against the event payload. Use it to filter or select attachments:

```text title="fileSource examples"
event_attachments                              // all attachments (default)
event_attachments[0]                           // only the first
event_attachments[mime_type='application/pdf'] // only PDFs
event_attachments[mime_type='application/pdf'][0]
```

If `fileFieldStrategy` is `single` (the default) and `fileSource` returns more than one attachment, the delivery **fails** — narrow the expression (e.g. add `[0]`) or switch to `multi`.

### Adding scalar fields with `extraFields`

Each `extraFields` value is a JSONata expression evaluated against the event payload, then passed through [environment-secret resolution](../environments-secrets.md) (the same as custom headers). A few rules:

- **Quote static literals.** A bare `"business_partner"` is treated as a path lookup and yields `undefined`. For a literal value, single-quote it *inside* the JSON string: `"'business_partner'"`.
- Expressions yielding `undefined` or `null` silently omit the field.
- Object/array results are JSON-stringified before being appended.

```json title="multipartConfig example"
{
  "deliveryMode": "binary_multipart",
  "multipartConfig": {
    "fileFieldName": "file",
    "fileFieldStrategy": "single",
    "fileSource": "event_attachments[0]",
    "extraFields": {
      "entityId": "event_attachments[0].entity_id",
      "entityType": "'business_partner'"
    }
  }
}
```

:::note
The main `jsonataExpression` does **not** apply in `binary_multipart` mode — shape the body with `fileSource` and `extraFields` instead.
:::

## Choosing a mode

| | `json_base64` | `binary_multipart` |
| --- | --- | --- |
| Transport | JSON (`application/json`) | `multipart/form-data` |
| Size overhead | ~33% (Base64) | None (raw bytes) |
| File metadata | In each `file_data` entry | Multipart part headers (`filename`, `Content-Type`) + your `extraFields` |
| JSONata transform | Yes (full payload) | Only via `fileSource` / `extraFields` |
| Best for | Lightweight integrations, small files | ERP systems, large files |

## Limits and behavior

- **Maximum file size: 100 MB per file.** Larger files are rejected with HTTP status `413` and code `FILE_TOO_LARGE`; the delivery is not retried.
- **No attachments → skipped.** If a file event arrives with no matching attachments, no HTTP request is sent and no error notification is raised — the event is marked *skipped* (`NO_FILE_ATTACHMENTS`).
- Files are buffered in memory during delivery, which is why the 100 MB ceiling applies regardless of mode.

## Signature verification

Both modes are signed using the [Standard Webhooks](../security.md) `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers.

- **`json_base64`** is signed over the full JSON request body — verify it exactly like any other webhook (see [Security](../security.md)).
- **`binary_multipart`** cannot be signed over the raw body, because the multipart boundary is randomized. Instead, epilot signs a **deterministic content string** derived from the file bytes and their metadata. See [Verifying multipart signatures](../security.md#verifying-multipart-signatures).

:::caution
`extraFields` values are **not** part of the signed content. Do not rely on them for security-sensitive data.
:::
