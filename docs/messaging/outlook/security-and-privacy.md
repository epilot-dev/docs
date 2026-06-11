---
title: Security & Privacy
sidebar_position: 4
---

# Security & Privacy

## Summary

| Topic | Answer |
|---|---|
| Auth to Microsoft 365 | OAuth 2.0 authorization code flow via MSAL; delegated user-context scopes only. No application permissions. |
| Identity used to read mail | A single Microsoft 365 account chosen by you – typically a dedicated service account. Since epilot users don't login via Microsoft SSO. |
| Tenant admin consent | Required (Microsoft policy for `*.Shared` scopes). Revocable in Entra at any time. |
| What epilot stores | Access token, refresh token, tenant ID, scope set, and the connecting user's identity. Encrypted at rest with AWS-managed KMS (AES-256). |
| Token rotation | Access tokens refresh on demand (1h lifetime). Refresh tokens rotate on every refresh. |
| Transport | TLS 1.2+ on every hop. |
| Data residency | AWS `eu-central-1` (Frankfurt) by default. |
| Sub-processors specific to this integration | Microsoft (source), AWS (hosting), Datadog (operational telemetry – metadata only, no message bodies). |
| Disconnect | One click in epilot. Independently revocable in Entra. |

## Trust model

![Trust model](/img/outlook/trust-model.svg)

Microsoft Entra decides what flows into epilot. epilot's permissions decide who inside epilot sees it. epilot cannot reach mailboxes the service account does not already have access to in Exchange – that boundary is enforced by Microsoft.

## Authentication

epilot uses the OAuth 2.0 authorization code flow via Microsoft's MSAL library as a confidential client (server-only client secret, never exposed to the browser).

| Setting | Value |
|---|---|
| Flow | Authorization code (`response_type=code`) |
| Authority | `https://login.microsoftonline.com/{tenant_id}` |
| Scopes | Delegated `*.Shared` mail, plus identity and `offline_access`. See [Setup → Scopes](./setup.md#scopes-requested). |
| State parameter | HMAC-SHA-256 signed payload binding the org ID, a nonce, a timestamp, and the requested features, such as mail or calendar (coming soon). Maximum age: 1 hour. |
| Client secret | Held only on the server, sourced from a managed secret store, KMS-encrypted, rotated periodically. |

State validation on the callback protects against CSRF (an attacker cannot forge a state that links to a different epilot org), state substitution (the requested features are bound into the signature so the token exchange cannot escalate scopes), and replay (the nonce and timestamp window prevent reuse of an old state).

### Why delegated, not application

Microsoft Graph supports two patterns. **Delegated** permissions act as a specific signed-in user and inherit that user's Exchange ACLs. **Application** permissions act as the app itself and can read every mailbox in the tenant.

epilot uses delegated permissions only. Application permissions would let epilot reach mailboxes the service account does not have, and would not match least privilege. Your IT admin can verify this in Microsoft Entra → Enterprise applications → epilot → Permissions: the "Application permissions" section is empty.

### Webhook authentication

Microsoft Graph posts change notifications to a public endpoint without a Bearer token. epilot does not trust unsigned requests. Every subscription carries a `clientState` value that ties it to the originating epilot organisation and mailbox, plus a 32-byte random nonce. Microsoft echoes that value verbatim on every notification, and epilot drops anything whose `clientState` does not match a known subscription.

Today's subscriptions request *basic* notifications (no message content inline), which Microsoft does not sign. If we move to rich notifications later, those are signed by an asymmetric key and the signature will be validated as well.

## Data at rest

| Data | Where | Encryption |
|---|---|---|
| Refresh and access tokens | DynamoDB | AES-256 with AWS-managed KMS. |
| Subscription metadata (`clientState`, expiry, resource path) | DynamoDB | AES-256 with AWS-managed KMS. |
| Mailbox-to-organisation mappings | DynamoDB | AES-256 with AWS-managed KMS. |
| Message headers, bodies, recipients | DynamoDB + ElasticSearch | AES-256 with AWS-managed KMS. |
| Message attachments | S3 | AES-256 (SSE-S3). |
| Backfill manifests | S3 | AES-256 (SSE-S3). Contain Graph message IDs only, no body content. Expire after 14 days. |
| Logs | CloudWatch and Datadog | TLS in transit, AES-256 at rest. Tokens, message bodies, and attachment content are excluded from log payloads. |

All tables and indexes are partitioned by `org_id`. There is no cross-tenant read path.

Customer-supplied KMS keys (BYOK) are not currently supported for this integration.

## Data in transit

| Hop | Protocol |
|---|---|
| Browser ↔ epilot | HTTPS (TLS 1.2+) |
| Browser ↔ Microsoft authorize endpoint | HTTPS (Microsoft-managed) |
| epilot ↔ Microsoft token endpoint and Graph API | HTTPS (TLS 1.2+), Bearer token |
| Microsoft Graph → epilot webhook endpoint | HTTPS (TLS 1.2+); `clientState` validated on receipt |

Microsoft will refuse to create a subscription against an HTTP endpoint.

## Data flow

![Outlook integration data flow](/img/outlook/data-flow.svg)

The notification itself contains no message body. If the token has been revoked between the notification and epilot's fetch, the message is simply not retrieved.

## Access inside epilot

This is the part customers most often misunderstand, so it is worth being explicit.

**What epilot enforces:**

- Users must be authenticated to the epilot organisation (SSO, password, MFA according to your epilot configuration).
- Users need the `email_setting:view` permission to see message data.
- Every table is partitioned by `org_id`; no cross-tenant access path exists.

**What epilot does *not* currently enforce:**

- epilot does **not** re-check Exchange or Entra mailbox ACLs at view time. Once a shared mailbox is connected, any epilot user in that organisation with `email_setting:view` can see messages from it.

**This is the same model your other epilot mailboxes already use.** If you already run shared mailboxes on epilot's SES-backed domain, the access model is identical: epilot's organisation admin decides which mailboxes exist on the platform, and epilot's permissions decide who in your organisation sees them. There is no Entra or Exchange layer for those mailboxes – there cannot be, since they live on epilot's infrastructure. Connecting an Outlook mailbox does not change that model; it changes where the mail originates. Once a message is inside epilot, the access rules are epilot's, regardless of whether it arrived via SES or via Microsoft Graph.

**Two layers, not one.** In practice you get defence in depth, with each side authoritative for one decision:

1. *Exchange is the upstream gate.* The service account can only read mailboxes you grant it access to in Exchange. If a mailbox should not be exposed to epilot at all, do not grant the service account access to it. Microsoft remains authoritative for "what is allowed to flow into epilot".
2. *epilot is the downstream gate.* Of the mailboxes that do flow in, your epilot admin decides which to connect, and your epilot permissions decide which users can see them.

If you need finer per-mailbox restrictions inside epilot today, the levers are: limit who in your organisation has an epilot account; limit who holds `email_setting:view`; and only grant the service account Exchange access to the mailboxes you actually want exposed.

Mental model: the service account opens the door; epilot's organisation membership is the room.

## Permissions epilot requests, and why

| Scope | What it grants | Why |
|---|---|---|
| `User.Read` | Read the signed-in user's profile | Show the connecting account in the epilot UI. |
| `offline_access` | Receive a refresh token | Refresh access tokens silently for unattended sync. |
| `Mail.Read.Shared` | Read mail in shared mailboxes the user can access | Backfill and real-time fetch. |
| `Mail.ReadWrite.Shared` | Mark as read/unread and move messages between folders (in accessible shared mailboxes) | Status sync between Outlook and epilot. |
| `Mail.Send.Shared` | Send as or on behalf of the shared mailbox | Outgoing mail from epilot. |

epilot does **not** request: `Mail.Read` or `Mail.ReadWrite` (the unscoped versions covering every mailbox in the tenant), `Files.*`, `Sites.*`, `User.ReadWrite.All`, `Directory.*`, or any application-context permissions.

## Retention

| Data | Default retention | Deleted on |
|---|---|---|
| OAuth tokens | Lifetime of the connection | Disconnect, Entra consent revocation (refresh fails and tokens are cleaned up), organisation deletion. |
| Subscription records | Lifetime of the subscription | Disconnect, expiry without renewal. |
| Synced messages | Your organisation's message retention policy | Admin-driven deletion in epilot, organisation deletion. |
| Backfill manifests | 14 days | S3 lifecycle rule. Manifests contain only Graph IDs. |
| Operational logs | Up to 3 months | Standard log retention policy. |

For a GDPR Art. 17 erasure request:

1. Disconnect the integration in epilot. Tokens, subscriptions, and mailbox mappings are deleted within seconds.
2. Use epilot's message-deletion tooling to remove historical content from epilot.
3. Data still held in Microsoft (the originals in your Exchange mailboxes) is untouched – it was never epilot's to delete.

## Sub-processors specific to this integration

| Sub-processor | Role | Data exposed |
|---|---|---|
| Microsoft | Source – Microsoft 365 and Graph API | Mail content from your tenant. |
| Amazon Web Services | Hosting (compute, storage, KMS) – `eu-central-1` by default | All synced data, at rest and in transit within epilot's AWS account. |
| Datadog | Operational telemetry (logs, metrics, traces) | Metadata only: organisation, tenant, mailbox identifiers, latencies, error rates. Message bodies, attachments, and token material are excluded. |

epilot's full sub-processor list, covering the platform beyond this integration, is in your DPA.

## Incident handling

If you believe credentials have been compromised:

1. **Revoke consent in Entra.** Microsoft Entra admin center → Enterprise applications → epilot → Permissions → Remove. This invalidates the refresh token immediately and stops every subsequent Graph call.
2. **Rotate the service account password or certificate** in Microsoft 365.
3. **Notify epilot support** at `support@epilot.cloud` so we can confirm disconnect cleanup completed and audit recent Graph activity.

On the epilot side, suspicious refresh-token usage, subscription-state drift, and elevated `clientState` mismatch rates generate alerts that page the on-call engineer.

## What this integration does not do

- It does not read mail outside the shared mailboxes you explicitly connect.
- It does not access SharePoint, OneDrive, Teams chat, contacts, tasks, or any other Microsoft 365 workload.
- It does not use application permissions. There is no path by which epilot can read mailboxes the service account does not already have access to.
- It does not bypass Conditional Access. If your policies block the service account at sign-in, the integration cannot connect.
- It does not cache or share Microsoft credentials with any other service.

## Verifying

- The permissions actually granted to epilot are visible in Microsoft Entra admin center → Enterprise applications → epilot → Permissions.
- Recent activity by the connecting account is visible in Microsoft 365 sign-in logs and Exchange audit logs, filtered by the service account.
- For enterprise customers, epilot exposes a connection-status endpoint that reports current sync health.
