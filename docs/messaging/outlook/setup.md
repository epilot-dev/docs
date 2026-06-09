---
title: Setup
sidebar_position: 2
---

# Setting up the Outlook integration

Setup involves two parties: your Microsoft 365 tenant admin and your epilot organisation admin. The Microsoft side controls which mailboxes the connecting account can reach; the epilot side controls which epilot users can work with them.

## Prerequisites

| Requirement | Detail |
|---|---|
| Microsoft 365 tenant | Microsoft's global commercial cloud. |
| Tenant admin | Required once, to grant admin consent. |
| Connecting Microsoft 365 account | Must have read access (and, for sending, `Send As` or `Send on Behalf`) on the shared mailboxes you want exposed in epilot. We recommend a dedicated service account, which normally takes a full user-seat from your Microsoft 365 license. |
| epilot organisation admin | Needs the `email_setting:edit` permission. |

## The connect flow

![Outlook connect flow](/img/outlook/connect-flow.svg)

1. **Start the connection.** In epilot, go to **Email Settings → Connections → Outlook** and click **Connect**.
2. **Tenant admin consent.** Microsoft shows the consent screen listing the exact scopes (see below) and your tenant admin approves on behalf of the whole tenant. This is a one-time, tenant-wide step required by Microsoft. Subsequent reconnects do not re-prompt.
3. **Connecting user signs in.** The service account (recommended) signs in and authorises the scopes for itself (`Mail.Shared.Read`, `Mail.Shared.ReadWrite`, `Mail.Shared.Send`).
4. **Tokens are stored.** epilot stores the refresh token, access token, tenant ID, and the connecting user's identity, encrypted at rest in AWS Frankfurt (`eu-central-1`).
5. **Pick the shared mailboxes.** In the **Email Addresses** tab, add each the shared mailbox you want exposed via the "Connect Outlook Email Address" option. When connecting an Outlook email address, epilot confirms the service account can reach it in Exchange, subscribes to Microsoft Graph change notifications, and starts a backfill of the last 30 days (configurable at connect time) into an epilot Shared Inbox. Epilot automatically connect Outlook email address with an Epilot Shared Inbox, so if in the future you decide to disconnect an Outlook Email Address you can keep your previous email under the epilot Shared Inbox. 

From this point on, the mailbox is live in epilot.

## Scopes requested

The integration uses Microsoft Graph delegated (user-context) permissions only. It does not use application permissions – the service account's Exchange access is always the upper bound.

| Feature | Scopes |
|---|---|
| Identity (always) | `User.Read`, `offline_access` |
| Mail | `Mail.Read.Shared`, `Mail.ReadWrite.Shared`, `Mail.Send.Shared` |

Notes:

- `*.Shared` scopes grant access only to mailboxes the signed-in user already has access to in Exchange. They do not bypass Exchange ACLs.
- `offline_access` lets epilot refresh tokens silently. Without it, the integration would stop working an hour after connection.
- Admin consent is required because Microsoft flags these scopes "admin consent required". It is Microsoft's policy, not epilot's.
- Conditional Access (MFA, compliant device, IP allowlist) on the connecting account applies at sign-in. epilot does not bypass it.

## Why a service account

We recommend a dedicated Entra service account – not a person's account – for the connection. With a service account:

- IT owns the credentials. Password and certificate rotation stay centralised (we recommend disabling password rotation for the service account, to avoid frequent disconnections).
- The Microsoft 365 audit log clearly attributes every Graph call to the integration.
- Mailbox access is granted explicitly. You add the service account to each shared mailbox you want exposed.
- Offboarding has no impact. The connection survives when employees leave.

Grant the service account `Read` (and `Send As` or `Send on Behalf`) on each shared mailbox: Microsoft 365 admin center → Teams & groups → Shared mailboxes → *(mailbox)* → Members.

## Disconnecting

The epilot admin can disconnect at any time from **Email Settings → Connections → Outlook**. This:

- Cancels any running backfill.
- Deletes every Microsoft Graph subscription created for the tenant.
- Removes the email-address entities backed by Outlook.
- Removes the stored tokens.

Your Microsoft 365 admin can also revoke independently in Entra (Enterprise applications → epilot → Permissions → Review permissions → Remove). After revocation, every Graph call from epilot returns `401` until the integration is reconnected.

Messages already synced into epilot remain until they are removed through epilot's normal retention controls – see [Security & Privacy → Retention](./security-and-privacy#retention).
