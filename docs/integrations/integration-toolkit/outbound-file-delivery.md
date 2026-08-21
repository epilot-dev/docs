---
sidebar_position: 7
title: Outbound File Delivery
description: Configure Integration Hub to deliver files from epilot events to an external API
slug: /integrations/integration-toolkit/outbound-file-delivery
---

# Outbound File Delivery

Outbound file delivery sends files attached to an epilot event to an external document API. Configure the trigger, file selection, authentication, request mapping, retries, and monitoring in Integration Hub.

`CustomerRequestSubmitted` is a common example: a submitted request can contain several `event_attachments`, and each attachment can be delivered separately.

:::info Upload versus download
This page covers files moving **out of epilot**. To make files from an external archive available in epilot, use the [download File Proxy](./file-proxy.md).
:::

## Configure in Integration Hub

An upload uses two use cases in the same integration:

| Integration Hub use case | Purpose |
| --- | --- |
| **File Proxy · Upload** | Defines how files are grouped, authenticated, mapped, and sent to the external API. |
| **Outbound** | Selects the event that triggers delivery and points it to the upload File Proxy. |

### Before you start

You need:

- an integration in Integration Hub;
- an Event Catalog event that provides file attachments, such as [`CustomerRequestSubmitted`](/docs/integrations/core-events#customer);
- an external HTTP endpoint that accepts the file; and
- target URLs and credentials stored on the integration's **Environment** tab.

### 1. Create an upload File Proxy

1. Open **Integration Hub**, select the integration, and open **Use Cases**.
2. Under **Other use cases**, select **Create → File Proxy**.
3. Enter a name and slug, set **Direction** to **Upload**, and enable the use case.
4. Configure the upload:
   - **Delivery split → One per file** sends each attachment separately. Leave it off to send all attachments in one delivery.
   - **OAuth2 Authentication** configures Client Credentials or Resource Owner Password authentication. Leave it unconfigured for an unauthenticated endpoint.
   - **Delivery rules** sets **Attempts per file** and **Maximum file size**.
   - **Request steps** defines the target URL, method, headers, request body, and response type. Add more steps for multi-request APIs.
   - **Proxy** optionally routes requests through a Secure Proxy from the same integration.
5. In **Live preview**, select a sample event or load one from event history. Check the rendered URL, headers, and request body for each step.
6. Select **Create Use Case**.

The preview does not fetch a file or call the target API. It shows the request shape using the selected event and placeholder values for file content, environment values, and earlier step results.

### 2. Add the outbound trigger

1. Return to **Use Cases** and add an **Outbound** use case.
2. Under **Event Type**, select the event that should trigger the upload. File deliveries only support events that provide file attachments.
3. Optionally add an **Event filter**. For example, `$count(event_attachments) > 0` handles only events that contain files.
4. Under **File Deliveries**, select **Add file delivery**.
5. Give the delivery a name, select the upload File Proxy under **Send files through**, and enable it.
6. For a file-only outbound use case, turn off **Track acknowledgements**. If the same use case also contains a webhook that expects acknowledgements, leave it on or use a separate outbound use case for the file delivery.
7. Select **Create Use Case**.

## Configuration object reference

Integration Hub edits the same `configuration` objects exposed by the Integration Toolkit API. The objects below show the relationship between the UI and API without including use-case metadata such as name, slug, type, or enabled state.

### Upload File Proxy configuration

```json
{
  "direction": "upload",
  "fan_out": {
    "enabled": true
  },
  "auth": {
    "type": "oauth2_client_credentials",
    "token_url": "{{env.DOCUMENT_TOKEN_URL}}",
    "client_id": "{{env.DOCUMENT_CLIENT_ID}}",
    "client_secret": "{{env.DOCUMENT_CLIENT_SECRET}}"
  },
  "steps": [
    {
      "method": "POST",
      "url": "{{env.DOCUMENT_API_URL}}/documents",
      "headers": {
        "Content-Type": "application/json"
      },
      "body_jsonata": "{ \"filename\": $file_data[0].filename, \"fileData\": $file_data[0].base64 }",
      "response_type": "json"
    }
  ],
  "upload": {
    "max_file_bytes": 26214400,
    "max_delivery_attempts": 8
  }
}
```

| Configuration field | Integration Hub control | Purpose |
| --- | --- | --- |
| `direction` | **Direction → Upload** | Sends epilot files to an external system. |
| `fan_out.enabled` | **Delivery split → One per file** | Chooses one delivery per attachment or one delivery containing all attachments. |
| `auth` | **OAuth2 Authentication** | Configures the token request and credentials. |
| `secure_proxy.use_case_slug` | **Proxy** | Routes requests through a Secure Proxy in the same integration. |
| `steps[]` | **Request steps** | Defines the ordered HTTP requests. |
| `steps[].enabled` | **Run this step when** | Runs the step only when its JSONata condition is true. |
| `steps[].url` | **URL** | Handlebars template for the target URL. |
| `steps[].method` | **Method** | `GET`, `POST`, `PUT`, or `PATCH`. |
| `steps[].headers` | **Headers** | Request headers with optional Handlebars values. |
| `steps[].body_jsonata` | **Body (JSONata)** | Produces a JSON object or array for the request body. |
| `steps[].response_type` | **Response Type** | Treats the response as `json` or `binary`. |
| `upload.max_delivery_attempts` | **Delivery rules → Attempts per file** | Sets 1–100 delivery attempts; the default is 8. |
| `upload.max_file_bytes` | **Delivery rules → Maximum file size** | Sets a per-file limit up to the 100 MiB platform maximum. |
| `upload.max_total_bytes` | Configuration object only | Optionally limits the combined size when **One per file** is off. |

### Outbound configuration

```json
{
  "event_catalog_event": "CustomerRequestSubmitted",
  "event_filter": "$count(event_attachments) > 0",
  "ack_tracking": "off",
  "mappings": [
    {
      "name": "External document archive",
      "enabled": true,
      "delivery": {
        "type": "file_proxy",
        "use_case_slug": "customer-request-document-upload"
      }
    }
  ]
}
```

| Configuration field | Integration Hub control | Purpose |
| --- | --- | --- |
| `event_catalog_event` | **Event Type** | Selects the event that starts delivery. |
| `event_filter` | **Event filter** | Optionally limits which events are handled. |
| `ack_tracking` | **Track acknowledgements** | Waits for a consumer acknowledgement when enabled. |
| `mappings[]` | **File Deliveries** | Adds one or more file-delivery targets. |
| `mappings[].name` | File delivery name | Labels the delivery in Integration Hub and monitoring. |
| `mappings[].enabled` | **Enabled** | Turns this file delivery on or off. |
| `mappings[].delivery.use_case_slug` | **Send files through** | Selects an upload File Proxy from the same integration. |

For endpoint details and the full schema, see [Configuration](./configuration.md).

## Delivery split

The **One per file** setting controls what each delivery contains:

- **On** — one delivery per attachment. Each file has its own retry and monitoring status.
- **Off** — one delivery containing every attachment from the event.

Request-step expressions use `$file_data` in both modes. It contains one item when **One per file** is on and all attachments when it is off.

If the event contains no attachments, no request is sent. Use the outbound **Event filter** when events without files should be ignored before delivery.

## Configure request steps

Each request step has these UI fields:

- **Run this step when** — optional JSONata condition;
- **URL** — Handlebars template;
- **Method** — `GET`, `POST`, `PUT`, or `PATCH`;
- **Response Type** — `json` or `binary`;
- **Headers** — optional name-value pairs; and
- **Body (JSONata)** — optional JSONata mapping for write methods.

### Map the request body

**Body (JSONata)** must return an object or array. Leave it blank to send the files unchanged: a single attachment object when **One per file** is on, or the complete attachment array when it is off.

The event payload is the expression root, so fields such as `contact.customer_number`, `ticket._purpose`, and `_event_id` are available directly. Additional bindings start with `$`:

| Binding | Contains |
| --- | --- |
| `$file_data` | Files in this delivery, always as an array. |
| `$steps` | Results of earlier request steps as `statusCode`, `headers`, and `body`. |
| `$env` | Values from the integration's **Environment** tab. |
| `$ack_id` | Event acknowledgement ID, when available. |
| `$now()` | Current ISO timestamp. |
| `$germanDate(iso)` | An ISO timestamp formatted as a German date. |

Each `$file_data` item provides the values most commonly needed by a target API:

| Field | Contains |
| --- | --- |
| `entity_id` | File entity ID. |
| `version_index` | Referenced file version. |
| `filename` | File name. |
| `mime_type` | MIME type. |
| `size_bytes` | File size in bytes. |
| `base64` | Base64-encoded file content. |
| `_tags` | File entity tags. |
| `relation_tags` | Tags on the relation that attached the file. |
| `category` | File category. |
| `file_date` | Document date. |

Example:

```jsonata
{
  "customerNumber": contact.customer_number,
  "filename": $file_data[0].filename,
  "mimeType": $file_data[0].mime_type,
  "fileData": $file_data[0].base64,
  "idempotencyKey": $file_data[0].entity_id & ":" & _event_id
}
```

Write `$file_data[0].filename`, including the `$`. A missing value is omitted from the resulting object; `null`, `""`, `false`, and `0` are sent as values. For an optional field, test its existence explicitly:

```jsonata
{ "pin": $exists(contact.customer_pin) ? $string(contact.customer_pin) }
```

### Configure URLs, headers, and authentication

**URL**, **Headers**, and OAuth2 fields use Handlebars. Reference values from the integration's **Environment** tab as `{{env.NAME}}`:

```text
{{env.DOCUMENT_API_URL}}/documents
```

Previous JSON responses are available to later steps, for example `{{steps.0.body.documentId}}` in a URL or header and `$steps[0].body.documentId` in a JSONata body. Store base URLs and credentials as environment values rather than literals; see [Environments & Secrets](/docs/environments/environments-secrets).

### Run steps conditionally

Use **Run this step when** to enter a JSONata expression that returns `true` or `false`. A false result skips that step and the remaining steps for the delivery. For example, this sends only PDF files when **One per file** is on:

```jsonata
$file_data[0].mime_type = "application/pdf"
```

Use the outbound **Event filter** for event-level selection and **Run this step when** for file- or step-level selection.

## Delivery behavior

- Delivery is at least once. If the target API supports idempotency keys, send a stable value such as `$file_data[0].entity_id & ":" & _event_id`.
- Any HTTP response below `400` completes the delivery successfully.
- `408`, `429`, and `5xx` responses, timeouts, and temporary authentication or file-fetch errors are retried up to **Attempts per file**. Other `4xx` responses are not retried.
- **Maximum file size** defaults to the 100 MiB platform maximum. A lower value can be configured per upload File Proxy.
- When **One per file** is off, `upload.max_total_bytes` can set an additional combined-size limit through the configuration API.

## Monitor deliveries

Open the integration's **Monitoring** tab to inspect deliveries and their event traces. With **One per file** enabled, each attachment has its own status, while all attachments from the same source event remain grouped by the event trace.

The most relevant monitoring codes are:

| Outcome | Code | Meaning |
| --- | --- | --- |
| Delivered | `FILE_PROXY_UPLOADED` | The external API accepted the final request. |
| Skipped | `FAN_OUT_EMPTY` | The event contained no attachments. |
| Skipped | `STEP_DISABLED` | **Run this step when** evaluated to false. |
| Retrying | `FILE_PROXY_UPLOAD_RETRYING` | Another delivery attempt is scheduled. |
| Failed | `FILE_PROXY_UPLOAD_FAILED` | Delivery failed or exhausted its attempts. |
| Failed | `FILE_FETCH_FAILED` | The file content could not be loaded. |
| Failed | `FILE_TOO_LARGE` | A configured or platform size limit was exceeded. |
| Failed | `ATTACHMENT_NOT_FOUND` | The referenced file or version was not found. |
| Failed | `MAPPING_EXPRESSION_FAILED` | A body or condition expression was invalid or returned an unsupported result. |

Open an entry to see the use case, delivery, attachment, attempt, and available request or response details. Credentials and large values such as file content are not shown.

## Troubleshooting

| Symptom | Check in Integration Hub |
| --- | --- |
| No option appears under **Send files through** | Create a File Proxy in the same integration, set **Direction** to **Upload**, and enable it. |
| The event does not appear under **Event Type** | File delivery requires an event that provides file attachments. |
| The preview or delivery contains no files | Confirm the selected event contains `event_attachments` and check the outbound **Event filter**. |
| A mapped filename or file body is missing | Use `$file_data`, including the `$` and an array index such as `$file_data[0].base64`. |
| A URL or credential is empty | Confirm the value exists on the integration's **Environment** tab and reference it as `{{env.NAME}}`. |
| Every delivery is skipped | Check **Run this step when** and the `STEP_DISABLED` monitoring entry. |
| A target `4xx` response is not retried | Only `408` and `429` are retryable client errors. Correct the request mapping or target configuration. |
| A file is rejected as too large | Check **Maximum file size** and, when sending all files together, `upload.max_total_bytes`. |

## Related documentation

- [Core Events](/docs/integrations/core-events)
- [Configuration](./configuration.md)
- [File Proxy downloads](./file-proxy.md)
- [External Monitoring Events](./external-monitoring-events.md)
- [Pollable Outbound](./pollable-outbound.md)
