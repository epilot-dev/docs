[@epilot/pricing](README.md) / Exports

# @epilot/pricing

## Table of contents

### Enumerations

- [OperationType](enums/OperationType.md)
- [PricingModel](enums/PricingModel.md)

### Interfaces

- [PricingEntitiesExtractResult](interfaces/PricingEntitiesExtractResult.md)

### Type Aliases

- [AmountFormatter](modules.md#amountformatter)
- [ComputeAggregatedAndPriceTotals](modules.md#computeaggregatedandpricetotals)
- [Currency](modules.md#currency)
- [DineroConvertor](modules.md#dineroconvertor)
- [PriceTierDisplayMode](modules.md#pricetierdisplaymode)
- [PricingDetails](modules.md#pricingdetails)
- [RelationAttributeValue](modules.md#relationattributevalue)
- [Tax](modules.md#tax)
- [TaxAmountBreakdown](modules.md#taxamountbreakdown)
- [TimeFrequency](modules.md#timefrequency)
- [TimeFrequencyNormalizerMatrix](modules.md#timefrequencynormalizermatrix)

### Variables

- [BillingPeriods](modules.md#billingperiods)
- [DECIMAL\_PRECISION](modules.md#decimal_precision)
- [DEFAULT\_CURRENCY](modules.md#default_currency)
- [GENERIC\_UNIT\_DISPLAY\_LABEL](modules.md#generic_unit_display_label)
- [TaxRates](modules.md#taxrates)
- [timeFrequencyNormalizerMatrix](modules.md#timefrequencynormalizermatrix-1)

### Functions

- [computeAggregatedAndPriceTotals](modules.md#computeaggregatedandpricetotals-1)
- [computePriceComponent](modules.md#computepricecomponent)
- [computePriceItemDetails](modules.md#computepriceitemdetails)
- [computeQuantities](modules.md#computequantities)
- [extractPricingEntitiesBySlug](modules.md#extractpricingentitiesbyslug)
- [formatAmount](modules.md#formatamount)
- [formatAmountFromString](modules.md#formatamountfromstring)
- [formatPriceUnit](modules.md#formatpriceunit)
- [getDisplayTierByQuantity](modules.md#getdisplaytierbyquantity)
- [getTierDescription](modules.md#gettierdescription)
- [isPriceBuiltInUnit](modules.md#ispricebuiltinunit)
- [isTaxInclusivePrice](modules.md#istaxinclusiveprice)
- [normalizePriceMappingInput](modules.md#normalizepricemappinginput)
- [normalizeTimeFrequency](modules.md#normalizetimefrequency)
- [normalizeTimeFrequencyToDinero](modules.md#normalizetimefrequencytodinero)
- [parseDecimalValue](modules.md#parsedecimalvalue)
- [toDinero](modules.md#todinero)
- [toDineroFromInteger](modules.md#todinerofrominteger)
- [toIntegerAmount](modules.md#tointegeramount)

## Type Aliases

### AmountFormatter

Ƭ **AmountFormatter**: (`{
  amount,
  currency,
  format,
  locale,
}`: { `amount`: `number` \| `string` ; `currency?`: [`Currency`](modules.md#currency) ; `enableSubunitDisplay?`: `boolean` ; `format?`: `string` ; `locale?`: `string`  }) => `string`

#### Type declaration

▸ (`{
  amount,
  currency,
  format,
  locale,
}`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `{
  amount,
  currency,
  format,
  locale,
}` | `Object` |
| `{
  amount,
  currency,
  format,
  locale,
}.amount` | `number` \| `string` |
| `{
  amount,
  currency,
  format,
  locale,
}.currency?` | [`Currency`](modules.md#currency) |
| `{
  amount,
  currency,
  format,
  locale,
}.enableSubunitDisplay?` | `boolean` |
| `{
  amount,
  currency,
  format,
  locale,
}.format?` | `string` |
| `{
  amount,
  currency,
  format,
  locale,
}.locale?` | `string` |

##### Returns

`string`

#### Defined in

[src/formatters/index.ts:23](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L23)

___

### ComputeAggregatedAndPriceTotals

Ƭ **ComputeAggregatedAndPriceTotals**: (`priceItems`: `PriceItemsDto`) => [`PricingDetails`](modules.md#pricingdetails)

#### Type declaration

▸ (`priceItems`): [`PricingDetails`](modules.md#pricingdetails)

##### Parameters

| Name | Type |
| :------ | :------ |
| `priceItems` | `PriceItemsDto` |

##### Returns

[`PricingDetails`](modules.md#pricingdetails)

#### Defined in

[src/pricing.ts:43](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L43)

___

### Currency

Ƭ **Currency**: ``"AED"`` \| ``"AFN"`` \| ``"ALL"`` \| ``"AMD"`` \| ``"ANG"`` \| ``"AOA"`` \| ``"ARS"`` \| ``"AUD"`` \| ``"AWG"`` \| ``"AZN"`` \| ``"BAM"`` \| ``"BBD"`` \| ``"BDT"`` \| ``"BGN"`` \| ``"BHD"`` \| ``"BIF"`` \| ``"BMD"`` \| ``"BND"`` \| ``"BOB"`` \| ``"BOV"`` \| ``"BRL"`` \| ``"BSD"`` \| ``"BTN"`` \| ``"BWP"`` \| ``"BYN"`` \| ``"BZD"`` \| ``"CAD"`` \| ``"CDF"`` \| ``"CHE"`` \| ``"CHF"`` \| ``"CHW"`` \| ``"CLF"`` \| ``"CLP"`` \| ``"CNY"`` \| ``"COP"`` \| ``"COU"`` \| ``"CRC"`` \| ``"CUC"`` \| ``"CUP"`` \| ``"CVE"`` \| ``"CZK"`` \| ``"DJF"`` \| ``"DKK"`` \| ``"DOP"`` \| ``"DZD"`` \| ``"EGP"`` \| ``"ERN"`` \| ``"ETB"`` \| ``"EUR"`` \| ``"FJD"`` \| ``"FKP"`` \| ``"GBP"`` \| ``"GEL"`` \| ``"GHS"`` \| ``"GIP"`` \| ``"GMD"`` \| ``"GNF"`` \| ``"GTQ"`` \| ``"GYD"`` \| ``"HKD"`` \| ``"HNL"`` \| ``"HRK"`` \| ``"HTG"`` \| ``"HUF"`` \| ``"IDR"`` \| ``"ILS"`` \| ``"INR"`` \| ``"IQD"`` \| ``"IRR"`` \| ``"ISK"`` \| ``"JMD"`` \| ``"JOD"`` \| ``"JPY"`` \| ``"KES"`` \| ``"KGS"`` \| ``"KHR"`` \| ``"KMF"`` \| ``"KPW"`` \| ``"KRW"`` \| ``"KWD"`` \| ``"KYD"`` \| ``"KZT"`` \| ``"LAK"`` \| ``"LBP"`` \| ``"LKR"`` \| ``"LRD"`` \| ``"LSL"`` \| ``"LYD"`` \| ``"MAD"`` \| ``"MDL"`` \| ``"MGA"`` \| ``"MKD"`` \| ``"MMK"`` \| ``"MNT"`` \| ``"MOP"`` \| ``"MRU"`` \| ``"MUR"`` \| ``"MVR"`` \| ``"MWK"`` \| ``"MXN"`` \| ``"MXV"`` \| ``"MYR"`` \| ``"MZN"`` \| ``"NAD"`` \| ``"NGN"`` \| ``"NIO"`` \| ``"NOK"`` \| ``"NPR"`` \| ``"NZD"`` \| ``"OMR"`` \| ``"PAB"`` \| ``"PEN"`` \| ``"PGK"`` \| ``"PHP"`` \| ``"PKR"`` \| ``"PLN"`` \| ``"PYG"`` \| ``"QAR"`` \| ``"RON"`` \| ``"RSD"`` \| ``"RUB"`` \| ``"RWF"`` \| ``"SAR"`` \| ``"SBD"`` \| ``"SCR"`` \| ``"SDG"`` \| ``"SEK"`` \| ``"SGD"`` \| ``"SHP"`` \| ``"SLL"`` \| ``"SOS"`` \| ``"SRD"`` \| ``"SSP"`` \| ``"STN"`` \| ``"SVC"`` \| ``"SYP"`` \| ``"SZL"`` \| ``"THB"`` \| ``"TJS"`` \| ``"TMT"`` \| ``"TND"`` \| ``"TOP"`` \| ``"TRY"`` \| ``"TTD"`` \| ``"TWD"`` \| ``"TZS"`` \| ``"UAH"`` \| ``"UGX"`` \| ``"USD"`` \| ``"USN"`` \| ``"UYI"`` \| ``"UYU"`` \| ``"UYW"`` \| ``"UZS"`` \| ``"VES"`` \| ``"VND"`` \| ``"VUV"`` \| ``"WST"`` \| ``"XAF"`` \| ``"XAG"`` \| ``"XAU"`` \| ``"XBA"`` \| ``"XBB"`` \| ``"XBC"`` \| ``"XBD"`` \| ``"XCD"`` \| ``"XDR"`` \| ``"XOF"`` \| ``"XPD"`` \| ``"XPF"`` \| ``"XPT"`` \| ``"XSU"`` \| ``"XTS"`` \| ``"XUA"`` \| ``"XXX"`` \| ``"YER"`` \| ``"ZAR"`` \| ``"ZMW"`` \| ``"ZWL"``

ISO 4217 CURRENCY CODES as specified in the documentation
Taken from https://www.iso.org/iso-4217-currency-codes.html
sorted and parsed

#### Defined in

node_modules/@types/dinero.js/index.d.ts:96

___

### DineroConvertor

Ƭ **DineroConvertor**: (`unitAmountDecimal`: `string`, `currency?`: [`Currency`](modules.md#currency)) => `dinero.Dinero`

#### Type declaration

▸ (`unitAmountDecimal`, `currency?`): `dinero.Dinero`

##### Parameters

| Name | Type |
| :------ | :------ |
| `unitAmountDecimal` | `string` |
| `currency?` | [`Currency`](modules.md#currency) |

##### Returns

`dinero.Dinero`

#### Defined in

[src/formatters/index.ts:53](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L53)

___

### PriceTierDisplayMode

Ƭ **PriceTierDisplayMode**: `Components.Schemas.PriceTierDisplayMode`

#### Defined in

[src/types/index.d.ts:27](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L27)

___

### PricingDetails

Ƭ **PricingDetails**: `Components.Schemas.PricingDetails`

#### Defined in

[src/types/index.d.ts:8](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L8)

___

### RelationAttributeValue

Ƭ **RelationAttributeValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$relation` | { `_schema`: `string` ; `_tags`: `string`[] ; `entity_id`: `string`  }[] |

#### Defined in

[src/pricing.ts:60](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L60)

___

### Tax

Ƭ **Tax**: `Components.Schemas.Tax`

#### Defined in

[src/types/index.d.ts:11](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L11)

___

### TaxAmountBreakdown

Ƭ **TaxAmountBreakdown**: `Components.Schemas.TaxAmountBreakdown`

#### Defined in

[src/types/index.d.ts:21](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L21)

___

### TimeFrequency

Ƭ **TimeFrequency**: `Exclude`<`BillingPeriod`, ``"one_time"``\>

#### Defined in

[src/types/index.d.ts:25](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L25)

___

### TimeFrequencyNormalizerMatrix

Ƭ **TimeFrequencyNormalizerMatrix**: { [outputFrequency in TimeFrequency]: { [inputFrequency in TimeFrequency]: Object } }

A interface for a normalized time frequencies transformation matrix

Eg. Output must be monthly, input was yearly

`timeFrequencyNormalizerMatrix.yearly.monthly`

#### Defined in

[src/normalizers/constants.ts:15](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/normalizers/constants.ts#L15)

## Variables

### BillingPeriods

• `Const` **BillingPeriods**: `Set`<`string`\>

#### Defined in

[src/pricing.ts:28](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L28)

___

### DECIMAL\_PRECISION

• `Const` **DECIMAL\_PRECISION**: ``12``

#### Defined in

[src/formatters/constants.ts:1](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/constants.ts#L1)

___

### DEFAULT\_CURRENCY

• `Const` **DEFAULT\_CURRENCY**: ``"EUR"``

#### Defined in

[src/currencies/index.ts:26](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/currencies/index.ts#L26)

___

### GENERIC\_UNIT\_DISPLAY\_LABEL

• `Const` **GENERIC\_UNIT\_DISPLAY\_LABEL**: ``"unit"``

#### Defined in

[src/formatters/constants.ts:6](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/constants.ts#L6)

___

### TaxRates

• `Const` **TaxRates**: `Readonly`<{ `nontaxable`: `number` = 0; `reduced`: `number` = 0.07; `standard`: `number` = 0.19 }\>

#### Defined in

[src/pricing.ts:30](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L30)

___

### timeFrequencyNormalizerMatrix

• `Const` **timeFrequencyNormalizerMatrix**: [`TimeFrequencyNormalizerMatrix`](modules.md#timefrequencynormalizermatrix)

A normalized time frequencies transformation matrix

See also [TimeFrequencyNormalizerMatrix](modules.md#timefrequencynormalizermatrix)

#### Defined in

[src/normalizers/constants.ts:29](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/normalizers/constants.ts#L29)

## Functions

### computeAggregatedAndPriceTotals

▸ **computeAggregatedAndPriceTotals**(`priceItems`): `PricingDetails`

Computes all the integer amounts for the price items using the string decimal representation defined on prices unit_amount field.
All totals are computed with a decimal precision of DECIMAL_PRECISION.
After the calculations the integer amounts are scaled to a precision of 2.

This compute function computes both line items and aggregated totals.

#### Parameters

| Name | Type |
| :------ | :------ |
| `priceItems` | `PriceItemsDto` |

#### Returns

`PricingDetails`

#### Defined in

[src/pricing.ts:43](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L43)

___

### computePriceComponent

▸ **computePriceComponent**(`priceItemComponent`, `priceMappings`, `parentQuantity`): `PriceItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `priceItemComponent` | `PriceItemDto` |
| `priceMappings` | `PriceInputMappings` |
| `parentQuantity` | `number` |

#### Returns

`PriceItem`

#### Defined in

[src/pricing.ts:82](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L82)

___

### computePriceItemDetails

▸ **computePriceItemDetails**(`priceItem`): `PricingDetails`

Computes the pricing details for a given PriceItem in isolation.
The computed price item will be the only entry from the PricingDetails items array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priceItem` | `PriceItemDto` \| `CompositePriceItemDto` | the price item to compute |

#### Returns

`PricingDetails`

the pricing details

#### Defined in

[src/pricing.ts:313](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L313)

___

### computeQuantities

▸ **computeQuantities**(`price`, `quantity?`, `priceMapping?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `price` | `Price` |
| `quantity?` | `number` |
| `priceMapping?` | `PriceInputMapping` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isUsingPriceMappingToSelectTier` | `boolean` |
| `quantityToSelectTier` | `number` |
| `safeQuantity` | `number` |
| `unitAmountMultiplier` | `number` |

#### Defined in

[src/pricing.ts:645](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L645)

___

### extractPricingEntitiesBySlug

▸ **extractPricingEntitiesBySlug**(`priceItems`): [`PricingEntitiesExtractResult`](interfaces/PricingEntitiesExtractResult.md)

Extracts the pricing entities from a list of price items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priceItems` | (`PriceItem` \| `CompositePriceItem`)[] | a list of price items |

#### Returns

[`PricingEntitiesExtractResult`](interfaces/PricingEntitiesExtractResult.md)

the product and price relations from the price items grouped by their slug.

#### Defined in

[src/pricing.ts:150](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/pricing.ts#L150)

___

### formatAmount

▸ **formatAmount**(`«destructured»`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `amount` | `string` \| `number` |
| › `currency?` | [`Currency`](modules.md#currency) |
| › `enableSubunitDisplay?` | `boolean` |
| › `format?` | `string` |
| › `locale?` | `string` |

#### Returns

`string`

#### Defined in

[src/formatters/index.ts:23](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L23)

___

### formatAmountFromString

▸ **formatAmountFromString**(`«destructured»`): `string`

Formats a decimal amount (string) to the desired user-displayable format

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currency?` | [`Currency`](modules.md#currency) |
| › `decimalAmount` | `string` |
| › `enableSubunitDisplay?` | `boolean` |
| › `format?` | `string` |
| › `locale?` | `string` |
| › `precision?` | `number` |
| › `useRealPrecision?` | `boolean` |

#### Returns

`string`

- The user-displayable formatted amount

#### Defined in

[src/formatters/index.ts:36](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L36)

___

### formatPriceUnit

▸ **formatPriceUnit**(`unit`, `hideGenericUnitLabel?`): `string`

Formats built-in price units into a displayable representation. Eg. kw -> kW

#### Parameters

| Name | Type |
| :------ | :------ |
| `unit` | `string` |
| `hideGenericUnitLabel?` | `boolean` |

#### Returns

`string`

the formatted unit

#### Defined in

[src/formatters/index.ts:54](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L54)

___

### getDisplayTierByQuantity

▸ **getDisplayTierByQuantity**(`tiers`, `quantity`, `pricingModel`): `PriceTier`

This function returns the price tier that matches the input quantity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tiers` | `PriceTier`[] | The price tiers. |
| `quantity` | `number` | The quantity. |
| `pricingModel` | ``"per_unit"`` \| ``"tiered_graduated"`` \| ``"tiered_volume"`` \| ``"tiered_flatfee"`` \| [`PricingModel`](enums/PricingModel.md) | The pricing model. |

#### Returns

`PriceTier`

The selected tier.

#### Defined in

[src/tiers/index.ts:19](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/tiers/index.ts#L19)

___

### getTierDescription

▸ **getTierDescription**(`pricingModel`, `tier`, `unit`, `locale`, `currency`, `t`, `options?`): `string`

Get the tier description for a tiered price. This function will return a string
describing the price, based on the tier and unit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pricingModel` | [`PricingModel`](enums/PricingModel.md) | - |
| `tier` | `PriceTier` | The price tier. |
| `unit` | `string` | The price unit. |
| `locale` | `string` | The locale to use when formatting the price. |
| `currency` | [`Currency`](modules.md#currency) | The currency to use when formatting |
| `t` | (`key`: `string`, `options?`: { `defaultValue?`: `string` ; `ns`: `string`  }) => `string` | - |
| `options` | `Object` | - |
| `options.enableSubunitDisplay?` | `boolean` | - |
| `options.showStartsAt?` | `boolean` | - |

#### Returns

`string`

The tier description.

#### Defined in

[src/tiers/index.ts:49](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/tiers/index.ts#L49)

___

### isPriceBuiltInUnit

▸ **isPriceBuiltInUnit**(`unit`): unit is string

Checks whether a price unit is a built-in unit or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `string` | the built-in unit code or user custom unit |

#### Returns

unit is string

true if the unit is a built-in unit

#### Defined in

[src/formatters/index.ts:294](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L294)

___

### isTaxInclusivePrice

▸ **isTaxInclusivePrice**(`price`): `boolean`

Checks whether a price is tax inclusive or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `price` | `Price` | the price object |

#### Returns

`boolean`

true if the price is tax inclusive, false otherwise. defaults to true.

#### Defined in

[src/utils/index.ts:39](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/utils/index.ts#L39)

___

### normalizePriceMappingInput

▸ **normalizePriceMappingInput**(`priceMapping`, `price`): `Dinero`

This function takes in a quantity, block mapping number, block mapping frequency, price, and parent quantity
and returns the normalized quantity. The block mapping number and block mapping frequency are used to
calculate the normalized quantity. The normalized quantity is the quantity multiplied by the block mapping
number and block mapping frequency. The block mapping number and block mapping frequency are converted to
dinero objects and then multiplied with the quantity. The normalized quantity is then multiplied by the
parent quantity and returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `priceMapping` | `PriceInputMapping` | - |
| `price` | `Price` | The price to be used to calculate the normalized quantity |

#### Returns

`Dinero`

The normalized quantity

#### Defined in

[src/normalizers/index.ts:16](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/normalizers/index.ts#L16)

___

### normalizeTimeFrequency

▸ **normalizeTimeFrequency**(`timeValue`, `timeValueFrequency`, `targetTimeFrequency`, `precision?`): `number`

This function will normalize an inputted value of a specific time frequency to the
desired time frequency based on constant values defined here [timeFrequencyNormalizerMatrix](modules.md#timefrequencynormalizermatrix-1).

The default precision is set to 4 decimal places.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeValue` | `number` | the value in time that will be normalized |
| `timeValueFrequency` | [`TimeFrequency`](modules.md#timefrequency) | the current time frequency of the value |
| `targetTimeFrequency` | [`TimeFrequency`](modules.md#timefrequency) | the time frequency the value will be normalized to |
| `precision?` | `number` | the precision of the normalized value |

#### Returns

`number`

normalizedFrequencyInput

See also [TimeFrequency](modules.md#timefrequency)

#### Defined in

[src/types/index.d.ts:28](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L28)

___

### normalizeTimeFrequencyToDinero

▸ **normalizeTimeFrequencyToDinero**(`timeValue`, `timeValueFrequency`, `targetTimeFrequency`, `precision?`): `Dinero`

This function will normalize an inputted value of a specific time frequency to the
desired time frequency based on constant values defined here [timeFrequencyNormalizerMatrix](modules.md#timefrequencynormalizermatrix-1).

The default dinerojs precision is set to 12 decimal places.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeValue` | `number` | the value in time that will be normalized |
| `timeValueFrequency` | [`TimeFrequency`](modules.md#timefrequency) | the current time frequency of the value |
| `targetTimeFrequency` | [`TimeFrequency`](modules.md#timefrequency) | the time frequency the value will be normalized to |
| `precision?` | `number` | - |

#### Returns

`Dinero`

a DineroJS object representing the normalized frequency input

See also [TimeFrequency](modules.md#timefrequency)

#### Defined in

[src/types/index.d.ts:34](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/types/index.d.ts#L34)

___

### parseDecimalValue

▸ **parseDecimalValue**(`value`): `string`

Converts a decimal string value into a valid decimal amount value, without any thousand separators, using dot as the decimal separator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | The decimal string value to convert |

#### Returns

`string`

A valid decimal amount value

#### Defined in

[src/formatters/index.ts:377](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L377)

___

### toDinero

▸ **toDinero**(`unitAmountDecimal`, `currency?`): `Dinero`

Convert an amount decimal and currency into a dinero object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `unitAmountDecimal` | `string` |
| `currency?` | [`Currency`](modules.md#currency) |

#### Returns

`Dinero`

#### Defined in

[src/formatters/index.ts:53](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L53)

___

### toDineroFromInteger

▸ **toDineroFromInteger**(`integerAmount`, `currency?`): `Dinero`

Utility mapper from Integer amount into DineroJS object using DECIMAL_PRECISION (12).

#### Parameters

| Name | Type |
| :------ | :------ |
| `integerAmount` | `number` |
| `currency?` | [`Currency`](modules.md#currency) |

#### Returns

`Dinero`

#### Defined in

[src/formatters/index.ts:268](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L268)

___

### toIntegerAmount

▸ **toIntegerAmount**(`decimalAmount`): `number`

Converts a string decimal amount to an integer amount with 2 digits precision.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `decimalAmount` | `string` | a string decimal amount |

#### Returns

`number`

the decimal amount represent as an integer scaled to 2 decimal places precision.

#### Defined in

[src/formatters/index.ts:262](https://gitlab.com/e-pilot/product/checkout-and-pricing/pricing-api/-/blob/6ff898d/packages/pricing/src/formatters/index.ts#L262)
