---
sidebar_position: 7.5
title: Partner Sharing
description: Share inbound entities with partner organizations, kept in sync with every event
---

# Partner Sharing

An inbound entity mapping can keep the entity it writes shared with [partner organizations](../../../collaboration/sharing.md). Use it when your system knows which partner works on a record. For example, a sales partner represents a customer. The partner then sees the record in their own organization while you keep owning it.

Sharing is configured per entity mapping, next to `fields`, and kept in sync with every event:

1. The entity is written as usual.
2. It is **shared** with every partner whose `enabled` is true.
3. It is **unshared** from every partner whose `enabled` is false.

You name the partners in one of two ways, or both:

- **[Listed partners](#configuration):** the mapping lists each partner organization ID.
- **[Partner lookups](#partner-lookups):** the payload names the partner (e.g. a sales partner number), and the partner organization is looked up in epilot at runtime. Use this when partner organizations are added over time, so the mapping does not change for each new partner.

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
| `partners` | No | One entry per partner organization. A `sharing` block needs `partners`, [`partner_lookups`](#partner-lookups), or both. |
| `partners[].partner_org_id` | Yes | ID of the partner organization. |
| `partners[].enabled` | No | `true`, `false`, or a JSONata expression. Evaluated against the payload item, like field-level [`enabled`](./mapping.md). Defaults to `true`. |
| `partner_lookups` | No | Partner organizations looked up at runtime. See [Partner lookups](#partner-lookups). |
| `exclusive` | No | `true` keeps the entity shared with the enabled partners only, and unshares it from every other partner organization. See [Exclusive sharing](#exclusive-sharing). Defaults to `false`. |

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

## Partner lookups

Listing partners needs every partner organization ID in the mapping. When partner organizations are created over time, for example one per sales partner, look the organization up instead:

1. The payload names the partner, e.g. `salesPartner.number`.
2. The lookup finds the entity in epilot that represents this partner: by default a `partner` entity, matched by `unique_ids`.
3. The entity is shared with the organization ID stored on that entity, by default in its `partner_org_id` attribute.

```json
"sharing": {
  "partner_lookups": [
    {
      "unique_ids": [
        { "attribute": "sales_partner_number", "field": "salesPartner.number" }
      ]
    }
  ],
  "exclusive": true
}
```

| Property | Required | Description |
| --- | --- | --- |
| `partner_lookups[].unique_ids` | Yes | How to find the partner entity. Same format as a relation's `unique_ids`: one entry per attribute, each with `field`, `jsonataExpression`, or `constant`. |
| `partner_lookups[].schema` | No | Schema of the partner entity. Defaults to `partner`. |
| `partner_lookups[].partner_org_id_attribute` | No | Attribute of the partner entity that holds the partner organization ID. Defaults to `partner_org_id`. |
| `partner_lookups[].enabled` | No | Like `partners[].enabled`. When false, the entity is unshared from the organization the lookup finds. |

With this configuration, an event with `"salesPartner": { "number": "SP-1001" }` shares the entity with the organization of the partner entity whose `sales_partner_number` is `SP-1001`.

:::caution Declare the lookup attribute on the schema
The lookup searches the partner entities, and only attributes declared on the schema are searchable. An attribute that is set on the partner entity but missing from the schema never matches, and every event reports `partner_not_found`. Add the attribute (e.g. `sales_partner_number`) to the `partner` schema before you use it in a lookup.
:::

What happens when a lookup does not find a partner organization:

- **The payload names no partner** (the `unique_ids` evaluate to nothing): the item has no partner. The lookup is skipped without a warning.
- **No partner entity matches**, or **the match has no organization ID yet**: the sharing with that partner is left unchanged, and [`SHARING_PARTNER_NOT_PROVISIONED`](#errors-and-monitoring) is reported. `details.reason` is `partner_not_found` or `partner_org_missing`. This is expected while a partner is still being set up. The next event for the entity shares it once the organization ID is set.
- **The organization found has no partnership** with your organization: like a listed partner, it is reported as `SHARING_PARTNER_NOT_CONNECTED`.

:::note
A lookup only runs when an event arrives. Entities that get no further events after a partner organization is set up are not shared automatically. Share them once when you set up the partner, e.g. by replaying their last event.
:::

A new partner entity can take a few seconds to become searchable. An event in that window reports `partner_not_found`, and the next event shares the entity.

## Exclusive sharing

By default, sharing only touches the partners the mapping names. A partner that is no longer named, e.g. because the payload now has a different sales partner, keeps its access.

With `"exclusive": true`, the enabled partners are the only partner organizations the entity stays shared with. Every other partner organization the entity is shared with is unshared. Your own organization always keeps its access. Use it when the payload decides the one partner an entity belongs to:

- When the sales partner changes, the entity moves to the new partner.
- When the payload no longer names a sales partner, the entity is unshared from the old one.

:::caution
Exclusive sharing also removes shares made outside this mapping, for example by a user in epilot or by another mapping.
:::

With `exclusive`, a lookup that finds no partner organization (`SHARING_PARTNER_NOT_PROVISIONED`) still counts as "no partner". The entity is unshared from its current partner even though the new one is not set up yet. It is shared with the new partner on the first event after that partner's organization ID is set. The old partner must not keep access to a record that now belongs to someone else, so the gap is intended. It is reported as `SHARING_PARTNER_NOT_PROVISIONED`.

Because of this, a misconfigured lookup (for example an attribute that is not declared on the partner schema) unshares every entity the mapping writes. Test a new lookup without `exclusive` first, and turn `exclusive` on once events stop reporting `partner_not_found`. A failed partner search is retried and never unshares.

## How it works

- **Only changes are sent.** The target state is compared with who the entity is currently shared with. A repeated event with the same outcome makes no sharing call, and partners get no duplicate notification.
- **Sharing becomes visible on the entity after a few seconds.** Who an entity is shared with is updated in the background after each share. An event for the same entity within those seconds still sees the previous state. It may share again with a partner that already has access (no harm done), and `exclusive` may not unshare yet. The next event catches up.
- **Runs on unchanged entities too.** Sharing is checked even when the entity's attributes did not change. A changed `enabled` result therefore applies on the next event.
- **Upserts only.** Sharing is skipped for the `delete` and `purge` modes.
- **The entity is written first.** A sharing problem never undoes the entity write.

## Errors and monitoring

Each case has its own monitoring code, so you can filter on it in the Monitoring tab or set up notifications for it.

| Situation | Behaviour | Code |
| --- | --- | --- |
| No partnership with a partner organization (listed or looked up) | That partner is skipped, the others are synced. Not retried. | `SHARING_PARTNER_NOT_CONNECTED` (warning) |
| A partner lookup finds no partner entity, or the entity has no organization ID yet | That lookup is skipped, the others are synced. Not retried. | `SHARING_PARTNER_NOT_PROVISIONED` (warning) |
| The sharing service rejects the request | Nothing is synced for this entity. Not retried. | `SHARING_REJECTED` (warning) |
| Temporary failure (service unavailable, timeout, throttling), also of a partner lookup | The entity update is retried automatically. | `SHARING_FAILED` (error), once all retries are used up |

Warning events carry the affected `partner_org_ids` in their details. `SHARING_PARTNER_NOT_PROVISIONED` carries `reason` (`partner_not_found` or `partner_org_missing`), the `unique_ids` that were searched, and `partner_entity_id` when a partner entity was found. When sharing changed, the entity's success event carries `sharing.shared` and `sharing.unshared` with the partner organization IDs.

See [Monitoring Codes](../monitoring/codes.md) for the full list.

## Testing a mapping

The mapping simulation in the Integration Hub's test view returns `sharing` on each entity update. Every partner's `enabled` is shown already evaluated against the test payload:

```json
"sharing": {
  "partners": [
    { "partner_org_id": "739224", "enabled": true },
    { "partner_org_id": "739225", "enabled": false }
  ],
  "lookups": [
    {
      "schema": "partner",
      "unique_ids": { "sales_partner_number": "SP-1001" },
      "partner_org_id_attribute": "partner_org_id",
      "enabled": true
    }
  ],
  "exclusive": true
}
```

The simulation does not call the sharing service. It shows the target state, not the changes that would be sent. Lookups are shown with their `unique_ids` evaluated, but the simulation does not search for the partner entity. The organization is only looked up when a real event is processed.
