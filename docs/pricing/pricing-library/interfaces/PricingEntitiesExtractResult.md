[@epilot/pricing](../README.md) / [Exports](../modules.md) / PricingEntitiesExtractResult

# Interface: PricingEntitiesExtractResult

## Table of contents

### Properties

- [\_tags](PricingEntitiesExtractResult.md#_tags)
- [price](PricingEntitiesExtractResult.md#price)
- [product](PricingEntitiesExtractResult.md#product)

## Properties

### \_tags

• **\_tags**: `string`[]

All pricing tags inferred from the products and prices of the provided price items.

#### Defined in

[src/pricing.ts:76](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L76)

___

### price

• **price**: [`RelationAttributeValue`](../modules.md#relationattributevalue)

A relation attribute value containing all price entities from the given price items.

#### Defined in

[src/pricing.ts:68](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L68)

___

### product

• **product**: [`RelationAttributeValue`](../modules.md#relationattributevalue)

A relation attribute value containing all product entities from the given price items.

#### Defined in

[src/pricing.ts:72](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L72)
