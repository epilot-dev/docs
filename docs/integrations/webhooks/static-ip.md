---
sidebar_position: 5
---

# Static IPs

Enterprise customers can configure webhook integrations to send requests from a fixed set of static IP addresses. This enables firewall rules and IP allowlisting to restrict access to internal systems.

:::info
Static IPs are available on enterprise plans by request. Contact support to enable this feature.
:::

## Default static IP addresses

Webhook requests sent through a static IP Secure Proxy originate from the following IPv4 addresses. Add all of them to your firewall allowlist:

| IP address       |
| ---------------- |
| `3.67.211.164`   |
| `18.196.226.8`   |
| `3.125.76.222`   |

:::caution
Allowlist all three addresses. Requests can originate from any of them, and you may use any subset at a given time.
:::

## Configuration

To set up static IPs for webhooks:

1. Contact epilot support to have a static IP Secure Proxy created for your organization. It is defined as a "Secure Proxy" use case in the Integration Hub.
2. Allowlist the [default static IP addresses](#default-static-ip-addresses) on your firewall.
3. In your webhook, open **Advanced settings** (Erweiterte Einstellungen) and select the proxy under **Secure Proxy** (Sicherer Proxy).
