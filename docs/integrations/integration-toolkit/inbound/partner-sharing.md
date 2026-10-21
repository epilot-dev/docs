---
sidebar_position: 7.5
title: Partner Sharing
description: Share inbound entities with partner organizations, kept in sync with every event
---

# Partner Sharing

An inbound entity mapping can keep the entity it writes shared with [partner organizations](../../../collaboration/sharing.md). Use it when your system knows which partner works on a record. For example, a sales partner represents a customer. The partner then sees the record in their own organization while you keep owning it.

Sharing is configured per entity mapping, next to `fields`, and kept in sync with every event:

1. The entity is written as usual.
2. It is **shared** with every listed partner whose `enabled` is true.
3. It is **unshared** from every listed partner whose `enabled` is false.

## Prerequisites

Each partner organization needs an existing partnership with your organization. Sharing does not create partnerships or send invitations. A partner without one is skipped and reported as [`SHARING_PARTNER_NOT_CONNECTED`](#errors-and-monitoring).

## Configuration

Add a `sharing` block to the entity mapping, with one entry per partner organization:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["customer_number"],
  "fields": [
    { "attribute": "customer_number", "field": "customerNo" },
    { "attribute": "first_name", "field": "firstName" },
    { "attribute": "last_name", "field": "lastName" }
  ],
  "sharing": {
    "partners": [
      { "partner_org_id": "739224", "enabled": "salesPartner.number = 'SP-1001'" },
      { "partner_org_id": "739225", "enabled": "salesPartner.number = 'SP-1002'" }
    ]
  }
}
```

| Property | Required | Description |
| --- | --- | --- |
| `partners` | Yes | One entry per partner organization. At least one. |
| `partners[].partner_org_id` | Yes | ID of the partner organization. |
| `partners[].enabled` | No | `true`, `false`, or a JSONata expression. Evaluated against the payload item, like field-level [`enabled`](./mapping.md). Defaults to `true`. |

With the configuration above, this event shares the contact with organization `739224`:

```json
{
  "customerNo": "C-100234",
  "firstName": "Erika",
  "lastName": "Mustermann",
  "salesPartner": { "number": "SP-1001" }
}
```

If a later event names `SP-1002`, the contact is unshared from `739224` and shared with `739225`. If a later event names no sales partner, it is unshared from both.

:::note
`enabled: false` does not mean "skip this partner". Sharing is always kept in sync, so it means "this entity must not be shared with this partner": a share that exists is removed.
:::

To share several entities of one event, for example the contact and its contract, add a `sharing` block to each entity mapping. Only the mapped entity itself is shared, not its relations.

## How it works

- **Only changes are sent.** The target state is compared with who the entity is currently shared with. A repeated event with the same outcome makes no sharing call, and partners get no duplicate notification.
- **Runs on unchanged entities too.** Sharing is checked even when the entity's attributes did not change. A changed `enabled` result therefore applies on the next event.
- **Upserts only.** Sharing is skipped for the `delete` and `purge` modes.
- **The entity is written first.** A sharing problem never undoes the entity write.

## Errors and monitoring

Each case has its own monitoring code, so you can filter on it in the Monitoring tab or set up notifications for it.

| Situation | Behaviour | Code |
| --- | --- | --- |
| No partnership with a listed partner organization | That partner is skipped, the others are synced. Not retried. | `SHARING_PARTNER_NOT_CONNECTED` (warning) |
| The sharing service rejects the request | Nothing is synced for this entity. Not retried. | `SHARING_REJECTED` (warning) |
| Temporary failure (service unavailable, timeout, throttling) | The entity update is retried automatically. | `SHARING_FAILED` (error), once all retries are used up |

Warning events carry the affected `partner_org_ids` in their details. When sharing changed, the entity's success event carries `sharing.shared` and `sharing.unshared` with the partner organization IDs.

See [Monitoring Codes](../monitoring/codes.md) for the full list.

## Testing a mapping

The mapping simulation in the Integration Hub's test view returns `sharing` on each entity update. Every partner's `enabled` is shown already evaluated against the test payload:

```json
"sharing": {
  "partners": [
    { "partner_org_id": "739224", "enabled": true },
    { "partner_org_id": "739225", "enabled": false }
  ]
}
```

The simulation does not call the sharing service. It shows the target state, not the changes that would be sent.
