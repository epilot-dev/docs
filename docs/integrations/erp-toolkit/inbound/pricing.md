---
sidebar_position: 5
title: Pricing
description: Map ERP line items and calculate prices during inbound synchronization
---

# Pricing / Line Items

Pricing mappings calculate prices for line items on contract and order entities as part of inbound ERP event processing. The system:

1. Extracts line item data from the ERP payload
2. Resolves product and price entity references by unique keys (similar to [relations](./relations))
3. Calls the epilot Pricing API (`calculatePricingDetails`) to compute totals, taxes, and breakdowns
4. Persists the calculated `line_items`, totals, and `total_details` on the target entity

## Line Item Types

Two types of line items are supported:

- **Product/price reference items** -- Reference existing product and price entities by unique keys. The Pricing API fetches the full product/price data and computes amounts.
- **Custom items** -- Provide a `unit_amount` directly without referencing a product or price entity. Still sent through the Pricing API for tax and total computation.

## Configuration Structure

The `pricing` property is an optional configuration on an entity mapping, at the same level as `fields`:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["external_id"],
  "fields": [...],
  "pricing": {
    "jsonataExpression": "lineItems",
    "items": [...],
    "result_mapping": {...},
    "on_error": "fail"
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `jsonataExpression` | string | No | JSONata expression to extract the line items array from the entity data. If omitted, the entity data itself is used. |
| `items` | array | Yes* | Array of line item configurations. Acts as a template when a single entry is provided. *Required unless `items_jsonata` is used. |
| `items_jsonata` | string | No | JSONata expression that returns the full pricing API input array. Use for complex transformations. Mutually exclusive with `items`. |
| `result_mapping` | object | No | Controls which entity attributes receive the pricing output. See [Result Mapping](#result-mapping). |
| `on_error` | string | No | Error handling strategy: `fail` (default), `skip`, or `warn`. See [Error Handling](#error-handling). |

## Product/Price Reference Items

Reference existing product and price entities by unique keys. The system resolves entity IDs at runtime and passes them to the Pricing API.

```json
{
  "product": {
    "entity_schema": "product",
    "unique_ids": [
      { "attribute": "external_id", "field": "productCode" }
    ]
  },
  "price": {
    "entity_schema": "price",
    "unique_ids": [
      { "attribute": "external_id", "field": "tariffId" }
    ]
  },
  "quantity": { "field": "qty" }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `product` | PricingEntityRef | Yes | Reference to the product entity |
| `price` | PricingEntityRef | No | Reference to the price entity. If omitted, the product must have exactly one active price |
| `quantity` | FieldValue | Yes | Number of units |
| `unit_amount_override` | FieldValue | No | Override the price's `unit_amount` for this line item |
| `description_override` | FieldValue | No | Override the line item description |

**PricingEntityRef** follows the same pattern as [relation unique IDs](./relations):

```json
{
  "entity_schema": "product",
  "unique_ids": [
    { "attribute": "external_id", "field": "productCode" }
  ]
}
```

Each `unique_ids` entry supports the standard value sources:
- `{ "attribute": "...", "field": "..." }` -- extract from payload field
- `{ "attribute": "...", "jsonataExpression": "..." }` -- compute with JSONata
- `{ "attribute": "...", "constant": "..." }` -- fixed value

## Custom Items

Custom items define a `unit_amount` directly without referencing product/price entities. They are still sent through the Pricing API for consistent tax and total computation.

```json
{
  "_custom": true,
  "description": { "field": "itemName" },
  "unit_amount": { "field": "unitPriceCents" },
  "unit_amount_currency": { "constant": "EUR" },
  "quantity": { "field": "qty" },
  "tax_rate": { "constant": 19 }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `_custom` | `true` | Yes | Discriminator flag. Must be `true` |
| `description` | FieldValue | Yes | Line item description |
| `unit_amount` | FieldValue | Yes | Price per unit (integer, in cents) |
| `unit_amount_decimal` | FieldValue | No | Price per unit as decimal string (e.g., `"12.50"`). Alternative to `unit_amount` |
| `unit_amount_currency` | FieldValue | No | ISO 4217 currency code. Defaults to `EUR` |
| `quantity` | FieldValue | Yes | Number of units |
| `type` | FieldValue | No | `one_time` or `recurring`. Defaults to `one_time` |
| `billing_period` | FieldValue | No | Required if `type` is `recurring`: `weekly`, `monthly`, `every_quarter`, `every_6_months`, `yearly` |
| `tax_rate` | FieldValue | No | Tax rate percentage (e.g., `19` for 19%) |

## Items Configuration Modes

### Template Mode

Provide one or more item configurations in the `items` array. When the `jsonataExpression` extracts an array of N data items:

- **Single config** in `items`: The config acts as a **template** applied to every extracted data item.
- **N configs** in `items`: Each config maps to the corresponding data item by index.

This is the simplest mode for homogeneous ERP arrays where every line item follows the same structure.

```json
{
  "pricing": {
    "jsonataExpression": "positions",
    "items": [
      {
        "product": {
          "entity_schema": "product",
          "unique_ids": [{ "attribute": "external_id", "field": "articleNumber" }]
        },
        "price": {
          "entity_schema": "price",
          "unique_ids": [{ "attribute": "external_id", "field": "priceKey" }]
        },
        "quantity": { "field": "quantity" }
      }
    ]
  }
}
```

With input:

```json
{
  "positions": [
    { "articleNumber": "PROD-A", "priceKey": "TARIFF-1", "quantity": 2 },
    { "articleNumber": "PROD-B", "priceKey": "TARIFF-2", "quantity": 1 }
  ]
}
```

The single template is applied to each position, producing two line items for the pricing API.

### JSONata Mode

Use `items_jsonata` for full control over the Pricing API input. The expression receives the extracted entity data and must return an array of objects matching the Pricing API's `PriceItemsDto` format.

```json
{
  "pricing": {
    "items_jsonata": "$map(positions, function($v) { $v.type = 'product' ? { 'product_id': $v.epilotProductId, 'price_id': $v.epilotPriceId, 'quantity': $number($v.qty) } : { 'description': $v.label, 'unit_amount': $v.priceInCents, 'unit_amount_currency': 'EUR', 'quantity': $number($v.qty), 'is_composite_price': false } })"
  }
}
```

This mode is useful when:
- Line items need complex transformations that don't fit the template pattern
- Product/price IDs are already resolved in the payload (no entity lookup needed)
- You need conditional logic per item (e.g., different handling based on item type)

:::note
In JSONata mode, product/price entity resolution by unique keys is **not** performed automatically. If you need entity lookup, use template mode instead.
:::

## Value Extraction Pattern

All value fields in the pricing configuration (`quantity`, `unit_amount`, `description`, etc.) use the same extraction pattern as the rest of the mapping system:

| Mode | Syntax | Description |
|------|--------|-------------|
| Field reference | `{ "field": "qty" }` | Extract value from payload field. Supports JSONPath with `$` prefix |
| JSONata expression | `{ "jsonataExpression": "$number(quantity) * factor" }` | Compute value with a JSONata expression |
| Constant | `{ "constant": "EUR" }` | Fixed value |

## Result Mapping

By default, the Pricing API response is mapped to standard entity attributes. Customize the target attribute names using `result_mapping`:

```json
{
  "pricing": {
    "items": [...],
    "result_mapping": {
      "line_items_attribute": "line_items",
      "amount_subtotal_attribute": "amount_subtotal",
      "amount_total_attribute": "amount_total",
      "total_details_attribute": "total_details",
      "currency_attribute": "currency"
    }
  }
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `line_items_attribute` | `line_items` | Entity attribute for the calculated line items array |
| `amount_subtotal_attribute` | `amount_subtotal` | Entity attribute for the subtotal (before taxes). Set to `null` to skip |
| `amount_total_attribute` | `amount_total` | Entity attribute for the total (after taxes). Set to `null` to skip |
| `total_details_attribute` | `total_details` | Entity attribute for the full tax/recurrence breakdown. Set to `null` to skip |
| `currency_attribute` | `currency` | Entity attribute for the currency code. Set to `null` to skip |

The pricing result attributes are **merged** with other field-mapped attributes. If a field mapping and the pricing result both set the same attribute, the pricing result takes precedence.

## Error Handling

The `on_error` property controls what happens when pricing calculation fails:

| Strategy | Behavior |
|----------|----------|
| `fail` | **Default.** The entity update fails and is retried via SQS dead-letter queue. Use when pricing data is critical |
| `skip` | Log a warning and proceed with the entity update without pricing attributes |
| `warn` | Log a warning, publish a monitoring event, and proceed without pricing attributes |

**Error scenarios:**
- **Product/price not found** -- A referenced product or price entity cannot be found by its unique keys. Unlike relations, missing products/prices are **not** auto-created (they are master data).
- **Pricing API failure** -- The `calculatePricingDetails` call returns an error or times out.
- **Partial resolution failure** -- If any line item's product/price cannot be resolved, the entire pricing calculation fails (all-or-nothing).

## Processing Flow

Pricing calculation happens during **entity update processing** (asynchronous, after extraction):

```
ERP Event Payload
    │
Stage 1: Extraction
    ├── Apply entity-level JSONata
    ├── Map fields, relations, relation_refs
    ├── Extract pricing data via pricing.jsonataExpression
    └── Pass pricing config + extracted data in EntityUpdate message
    │
Stage 2: Entity Update Processing
    ├── Fetch existing entity
    ├── Resolve relations
    ├── Process pricing:
    │   ├── Resolve product/price entity refs → product_id/price_id
    │   ├── Build PriceItemsDto input
    │   ├── Call calculatePricingDetails API
    │   └── Merge result into entity attributes
    ├── Create/update entity (with pricing attributes merged)
    └── Queue post_actions if needed
```

Pricing resolution is **asynchronous** -- it does not block extraction of other entities. Products/prices are resolved at the same stage as relations, using the same entity lookup mechanism.

## Examples

### Contract with Product/Price References

Map ERP line items to a contract by looking up products and prices by `external_id`.

**Configuration:**

```json
{
  "entities": [
    {
      "entity_schema": "contract",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "contractId" },
        { "attribute": "contract_name", "field": "name" },
        {
          "attribute": "billing_contact",
          "relations": {
            "operation": "_set",
            "items": [{
              "entity_schema": "contact",
              "unique_ids": [{ "attribute": "customer_number", "field": "customerId" }]
            }]
          }
        }
      ],
      "pricing": {
        "jsonataExpression": "lineItems",
        "items": [
          {
            "product": {
              "entity_schema": "product",
              "unique_ids": [{ "attribute": "external_id", "field": "productCode" }]
            },
            "price": {
              "entity_schema": "price",
              "unique_ids": [{ "attribute": "external_id", "field": "tariffId" }]
            },
            "quantity": { "field": "quantity" }
          }
        ]
      }
    }
  ]
}
```

**Input:**

```json
{
  "contractId": "V-2024-001",
  "name": "Stromvertrag Haushalt",
  "customerId": "CUST-123",
  "lineItems": [
    { "productCode": "STROM-HH", "tariffId": "BASIC-2024", "quantity": 1 },
    { "productCode": "NETZ-HH", "tariffId": "NETZ-STD", "quantity": 1 }
  ]
}
```

**Processing:**

1. System extracts `lineItems` array via JSONata
2. For each item, resolves the product and price by `external_id`
3. Calls `calculatePricingDetails` with the resolved product/price IDs and quantities
4. Sets `line_items`, `amount_subtotal`, `amount_total`, `total_details`, and `currency` on the contract entity

### Custom Items (No Product/Price)

Use custom items when the ERP provides pre-calculated prices that don't correspond to existing product/price entities.

**Configuration:**

```json
{
  "entities": [
    {
      "entity_schema": "order",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "orderId" },
        { "attribute": "status", "constant": "placed" }
      ],
      "pricing": {
        "jsonataExpression": "items",
        "items": [
          {
            "_custom": true,
            "description": { "field": "itemName" },
            "unit_amount": { "field": "unitPriceCents" },
            "unit_amount_currency": { "constant": "EUR" },
            "quantity": { "field": "qty" },
            "tax_rate": { "constant": 19 }
          }
        ]
      }
    }
  ]
}
```

**Input:**

```json
{
  "orderId": "ORD-5678",
  "items": [
    { "itemName": "Installation Fee", "unitPriceCents": 9900, "qty": 1 },
    { "itemName": "Monthly Service", "unitPriceCents": 2500, "qty": 12 }
  ]
}
```

The Pricing API computes taxes and totals for each custom item, and the order is updated with calculated `line_items` and totals.

### Unit Amount Override

Override the price entity's `unit_amount` with a value from the ERP payload. Useful when the ERP provides negotiated or custom prices.

```json
{
  "pricing": {
    "jsonataExpression": "lineItems",
    "items": [
      {
        "product": {
          "entity_schema": "product",
          "unique_ids": [{ "attribute": "external_id", "field": "productCode" }]
        },
        "price": {
          "entity_schema": "price",
          "unique_ids": [{ "attribute": "external_id", "field": "tariffId" }]
        },
        "quantity": { "field": "qty" },
        "unit_amount_override": { "field": "negotiatedPriceCents" }
      }
    ]
  }
}
```

### JSONata Items Expression

Use `items_jsonata` when you need full control over the Pricing API input.

**Configuration:**

```json
{
  "entities": [
    {
      "entity_schema": "order",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "orderId" }
      ],
      "pricing": {
        "items_jsonata": "$map(positions, function($v) { $v.type = 'product' ? { 'product_id': $v.epilotProductId, 'price_id': $v.epilotPriceId, 'quantity': $number($v.qty) } : { 'description': $v.label, 'unit_amount': $v.priceInCents, 'unit_amount_currency': 'EUR', 'quantity': $number($v.qty), 'is_composite_price': false } })"
      }
    }
  ]
}
```

**Input:**

```json
{
  "orderId": "ORD-9999",
  "positions": [
    { "type": "product", "epilotProductId": "uuid-1", "epilotPriceId": "uuid-2", "qty": "2" },
    { "type": "fee", "label": "Shipping", "priceInCents": 499, "qty": "1" }
  ]
}
```

The JSONata expression maps each position to the Pricing API format, handling both product-referenced and custom items with full flexibility.

## Validation

- `pricing.items` is required when `items_jsonata` is not provided, and vice versa. They are mutually exclusive.
- Each product/price reference item must have a `product` with at least one `unique_ids` entry.
- Each custom item (`_custom: true`) must have `description`, `unit_amount`, and `quantity`.
- The `pricing` property is only meaningful on entities with pricing capability (typically `contract` or `order`), but this is not enforced at the mapping level.

## Next Steps

- [Meter Readings](./meter-readings) - Handle meter reading data
- [Examples](./examples) - Complete integration examples
