---
title: Overview
sidebar_position: 0
slug: /webhooks
---

# Webhooks

[[API Docs](/api/webhooks)]
[[SDK](https://www.npmjs.com/package/@epilot/webhooks-client)]

The epilot [Webhooks API](/api/webhooks) provides the possibility to subscribe to epilot events. This allows you to receive notifications via HTTP requests to your configured webhook URL every time events occur in your account. This can be useful for integrating epilot with other systems, triggering actions based on events, or simply monitoring activity within your epilot environment.
This document describes the steps how to configure a webhook, what's the payload structure, how to manage those configurations, and how to handle data transmission. 

## Data Transmission
Webhooks do use the `Transfer-Encoding: chunked` mechanism when sending HTTP requests. This applies to webhook payloads triggered by various events in the system, ensuring that data is efficiently transmitted to your server.

### What is Transfer-Encoding: chunked?
The Transfer-Encoding: chunked header is used in HTTP/1.1 to send data in small, manageable chunks rather than all at once. With this method, the total size of the content doesn’t need to be known in advance, and data can be sent progressively.

### Why is This Important?
When receiving webhook events from our system:

- Chunked Data Transfer: The HTTP request body will arrive in parts (or "chunks"), each sent with its own size indicator. This means your server will need to handle and process the data as it arrives.
- Streaming Efficiency: This method allows us to stream data efficiently, especially for large payloads, ensuring that your server gets the data without needing to wait for the entire payload to be generated.
- Completion Signal: The transfer is complete when a zero-length chunk is sent, signaling the end of the payload.


### How to Handle Chunked Webhook Requests

To ensure proper handling of our webhook payloads, your server must:

- Support chunked transfer encoding: Most modern web servers handle this automatically, but ensure your environment does not reject or misinterpret chunked data.
- Process Data in Chunks: If necessary, ensure your application processes the incoming data incrementally as it arrives.
- End-of-Transfer Detection: Be aware that the payload transmission is complete when a final, empty chunk is received.

### Limitations
The chunked transfer encoding mechanism is not supported by all servers. If your server does not support this feature, please contact our support team for assistance, as we have workarounds available.

Already known services which do not support chunked transfer encoding are:
- [Microsoft Power Automate](https://www.microsoft.com/de-de/power-platform/products/power-automate?market=de)
