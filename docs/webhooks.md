---
sidebar_position: 14
---

# Webhooks

[[API Docs](/api/webhooks)]
[[SDK](https://www.npmjs.com/package/@epilot/webhooks-client)]

The epilot [Webhooks API](/api/webhooks) provides the possibility to subscribe to epilot public events. This will allow you to receive notifications with payload to your configured webhook URL every time events happen in your account.

This document describes the steps how to configure hooks, subscribe to events and how to manage those configurations. Service is reachable using https connection to ensure encryption between client and service.

Webhooks can be comfortably configured and managed by admin users in epilot portal.

[Webhooks API Documentation](/api/webhooks)

## Data Transmission
Webhooks do use the `Transfer-Encoding: chunked` mechanism when sending HTTP requests. This applies to webhook payloads triggered by various events in the system, ensuring that data is efficiently transmitted to your server.

### What is Transfer-Encoding: chunked?
The Transfer-Encoding: chunked header is used in HTTP/1.1 to send data in small, manageable chunks rather than all at once. With this method, the total size of the content doesn’t need to be known in advance, and data can be sent progressively.

### Why is This Important?
When receiving webhook events from our system:

- Chunked Data Transfer: The HTTP request body will arrive in parts (or "chunks"), each sent with its own size indicator. This means your server will need to handle and process the data as it arrives.
- Streaming Efficiency: This method allows us to stream data efficiently, especially for large payloads, ensuring that your server gets the data without needing to wait for the entire payload to be generated.
- Completion Signal: The transfer is complete when a zero-length chunk is sent, signaling the end of the payload.
How to Handle Chunked Webhook Requests
To ensure proper handling of our webhook payloads, your server must:

- Support chunked transfer encoding: Most modern web servers handle this automatically, but ensure your environment does not reject or misinterpret chunked data.
- Process Data in Chunks: If necessary, ensure your application processes the incoming data incrementally as it arrives.
- End-of-Transfer Detection: Be aware that the payload transmission is complete when a final, empty chunk is received.

### Limitations
The chunked transfer encoding mechanism is not supported by all servers. If your server does not support this feature, please contact our support team for assistance.

Already known services which do not support chunked transfer encoding are:
- [Microsoft Power Automate](https://www.microsoft.com/de-de/power-platform/products/power-automate?market=de)

## Webhook Payload Structure

You can use the Entity API to get a full [JSON schema](/api/entity#tag/Schemas/operation/getJsonSchema) and a [JSON example](/api/entity#tag/Schemas/operation/getSchemaExample) of an entity part of your webhook. Alternatively, you can download these from the epilot portal for each of your entities from the entity builder UI.

![Export Entity Schema](../static/img/export-entity-schema.png)

## Webhook Events
You can view and filter failed and succesful events and its details. Every event can be replayed. The replay will send the same payload and creates a new event afterwards. By default, all events are persisted for 4 weeks. 

![Webhook Events](../static/img/webhooks/events.gif)


## Testing Webhook Configurations
The webhook configuration can be tested by sending a test request to the configured URL. This feature allows users to verify the webhook configuration and ensure that the request is being sent to the correct endpoint. The test request will include a sample payload, allowing users to verify that the webhook is functioning as expected. This sample payload can be either customized or a entity schema can be used.


## Synchronous invocation
To get immediate feedback on the success of a webhook request, the webhook can be configured to be invoked synchronously. This will cause the webhook to wait for the response of the request before proceeding. If the request fails, the webhook will be flagged as unsuccessful. This feature has to be enabled in the webhook action of the automation configuration.
![Option to enable sync webhooks](../static/img/automation-sync-webhook.png)

### Limitations
Sync webhooks are limited to a maximum duration of 30 seconds. If the request exceeds this time limit, it will be automatically aborted, prompting the webhook to retry the request up to 2 times. If, after these retries, the request continues to fail, the webhook will be flagged as unsuccessful.

## Customization

### Payload configuration

Customizing the payload of an incoming webhook request is entirely feasible. The standard structure for this customization typically follows this general format:

```json
{
   metadata: {
    organization_id: '',
    ...
   }, // always present
   entity: {} // always present,
   relations: {} // optional,
   activity: {} // optional,
   changed_attributes: {
      added: {},
      deleted: {},
      updated: {}
   } // optional
}
```
- Include Changed Attributes
  - shows the ***changed*** added|deleted|updated attributes ***after*** the event
  - important note: this will only be included if the event is a change event e.g. an `Entity update: Opportunity` automation trigger. Manual trigger will not fill changed attribures.
- Include Activity
- Include Relations
  - **hydrated** relations to other entities
  - important note: including this can increase the payload size significantly

![Custom Webhook Payload Configuration](../static/img/webhooks/custom-payload.png)

### Custom header

Custom headers can be added to the webhook request to provide additional information or authentication. This feature allows users to include custom headers in the webhook request, enhancing the security and customization options available for webhook configurations.

![Custom Webhook Header](../static/img/webhooks/custom-header.png)

The following headers are forbidden and will be removed from the request:
```
    'x-epilot-org-id',
    'x-ivy-org-id',
    'Authorization',
    'A-IM',
    'Accept-Charset',
    'Accept-Datetime',
    'Accept-Encoding',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Encoding',
    'Transfer-Encoding',
    'Host',
    'Content-Type',
    'Content-Range',
    'Content-MD5',
    'Range',
    'User-Agent',
    'Date',
    'Expect',
    'Forwarded',
    'From',
    'Host',
    'HTTP2-Settings',
    'If-Match',
    'If-Modified-Since',
    'If-None-Match',
    'If-Range',
    'If-Unmodified-Since',
    'Max-Forwards',
    'Origin',
    'Pragma',
    'Proxy-Authorization',
    'Referer',
    'Server',
    'TE',
    'Trailer',
    'Transfer-Encoding',
    'Upgrade',
    'Via',
    'Warning',
    'x-forwarded-*',
    'x-amz-*',
    'x-amzn-*'
```

### Custom oauth parameter

Custom OAuth parameters can be seamlessly integrated into the webhook configuration process. These parameters can be included as part of the OAuth request, appended as body, query, or header parameters. This feature empowers users to augment the OAuth request with supplementary information as needed, enhancing the flexibility and customization options within the authentication flow.

![Custom Webhook Ouath Parameter](../static/img/webhooks/custom-oauth.png)

## Static IPs
Enterprise customers have the option to configure their webhook integrations to send requests from a predefined list of static IP addresses. This feature enables organizations to introduce stricter network-level security controls, such as firewall rules or IP whitelisting, to ensure that only trusted requests are allowed to access internal systems.

This can be particularly valuable for customers operating in secure environments or requiring compliance with internal or regulatory data protection standards.

:::info
This feature is only available upon request for enterprise plans. Please contact support to enable static IPs for your webhook configuration.
:::

## Limitations

### Timeout
As previously mentioned, the webhook request times out after 30 seconds for synchronous webhooks. For asynchronous webhooks, the request will not time out, but the webhook will be flagged as unsuccessful if the request takes longer than 2 minutes to complete. This is to prevent the webhook from being stuck in a pending state indefinitely. Contact support if you need to increase this timeout. Keep in mind that for long running requests, it is recommend to handle them asynchronously on the 3rd party side and return a 202 Accepted response to the webhook request.
