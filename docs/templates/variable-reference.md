---
sidebar_position: 1
---

# Variable Reference

This page provides a complete reference for all variables and Handlebars helpers available in epilot templates.

## Variable Syntax

Variables use [Handlebars](https://handlebarsjs.com/) syntax with double curly braces:

```handlebars
{{variable_name}}
{{entity.attribute}}
{{helper_name argument1 argument2}}
```

## Entity Variables

Access entity data using the entity slug as a prefix:

| Syntax | Description |
|--------|-------------|
| `{{contact.first_name}}` | Contact's first name |
| `{{order._title}}` | Order title |
| `{{opportunity.billing_address}}` | Opportunity's billing address |
| `{{_title}}` | Title of the main entity in context |

### Nested Attributes

Access nested attributes with dot notation:

```handlebars
{{order.line_items.0.product.name}}
{{contact.payment.0.data.iban}}
```

### Computed Metadata Fields

Some fields store IDs that are resolved to human-readable values using the `:<field>` suffix:

```handlebars
{{opportunity._tags:name}}        <!-- Resolved tag names -->
{{opportunity._purpose:name}}     <!-- Resolved purpose names -->
```

## System Variables

| Variable | Description |
|----------|-------------|
| `{{system.date}}` | Current date (formatted for the org locale) |
| `{{system.time}}` | Current time |

## Environment Variables

Reference organization-level environment variables in templates using the `{{ env.* }}` prefix. Environment variables are resolved at runtime, allowing the same template to work across sandbox and production environments.

```handlebars
{{env.portal.domain}}
{{env.erp_api.base_url}}
{{env.n8n.metering_webhook_url}}
```

### Using Environment Variables in Templates

Environment variables are supported anywhere template variables work:

**Email subject:**
```handlebars
Your order confirmation from {{env.company.name}}
```

**Email body:**
```html
<p>
  View your order in the 
  <a href="https://{{env.portal.domain}}/orders">customer portal</a>.
</p>
```

**Document templates:**
```handlebars
Contact us at {{env.support.email}} or visit {{env.company.website}}
```

:::tip
Use [Environments & Secrets](/docs/environments/environments-secrets) to manage your organization's environment variables. Variables set there can be referenced with `{{ env.key }}` in any template.
:::

### Variable Types

| Type | In Templates | In Webhooks |
|------|:------------:|:-----------:|
| **String** | Yes | Yes |
| **SecretString** | No | Yes |

`SecretString` values are only available in trusted backend contexts (webhooks, integrations) and are never exposed in user-facing templates.

For full details on creating and managing environment variables, see [Environments & Secrets](/docs/environments/environments-secrets).

## Organization Variables

| Variable | Description |
|----------|-------------|
| `{{organization.name}}` | Organization name |
| `{{organization.website}}` | Organization website URL |
| `{{organization.email}}` | Organization email |
| `{{organization.phone}}` | Organization phone number |
| `{{organization.address}}` | Full formatted address |
| `{{organization.signature}}` | Email signature |

## User Variables

| Variable | Description |
|----------|-------------|
| `{{user.display_name}}` | Current user's display name |
| `{{user.email}}` | Current user's email |
| `{{user.phone}}` | Current user's phone number |
| `{{user.department}}` | Current user's department |

## Portal & Link Variables

| Variable | Context | Description |
|----------|---------|-------------|
| `{{consent.optInLink}}` | Email | Double opt-in confirmation link |
| `{{unsubscribe_url}}` | Email | Unsubscribe link |
| `{{portalUser.confirmationLink}}` | Email | Portal user email confirmation link |
| `{{portalUser.forgotPasswordLink}}` | Email | Portal password reset link |
| `{{customerPortal.invitationLink}}` | Email | Customer portal invitation link |
| `{{installerPortal.invitationLink}}` | Email | Installer portal invitation link |
| `{{customerPortal.newDocumentLink}}` | Email | Link to new document in customer portal |
| `{{customerPortal.entityLink}}` | Email | Link to entity in customer portal |
| `{{customerPortal.userEmailsOnEntity}}` | Email | Portal user emails associated with the entity |

---

## Handlebars Helpers

### Standard Library Helpers

All helpers from [`handlebars-helpers`](https://github.com/helpers/handlebars-helpers) are available, including:

- **math**: `add`, `subtract`, `multiply`, `divide`, `ceil`, `floor`, `round`, `abs`
- **number**: `bytes`, `addCommas`, `toFixed`, `toPrecision`
- **comparison**: `eq`, `ne`, `lt`, `lte`, `gt`, `gte`, `and`, `or`, `not`
- **array**: `first`, `last`, `after`, `before`, `join`, `sort`, `length`, `map`, `filter`
- **string**: `capitalize`, `lowercase`, `uppercase`, `trim`, `truncate`, `replace`, `split`
- **date**: `moment` (Moment.js formatting)
- **object**: `get`, `keys`, `values`, `extend`, `merge`
- **url**: `encodeURI`, `decodeURI`, `urlResolve`, `urlParse`

```handlebars
{{add 1 2}}                    <!-- 3 -->
{{multiply price quantity}}    <!-- price * quantity -->
{{uppercase "hello"}}          <!-- HELLO -->
{{truncate description 100}}   <!-- First 100 chars -->
```

---

### Address Helpers

#### formatAddress

Formats an address object into a single-line string.

```handlebars
{{formatAddress 'billing_address.0'}}
```

#### address

Formats the primary address from context (searches for `billing` or `primary` tags).

```handlebars
{{address}}
{{address "contact"}}
```

#### billing_address

Formats the billing address (searches for `billing`, `shipping`, or `primary` tags).

```handlebars
{{billing_address}}
```

#### shipping_address

Formats the shipping address (searches for `shipping`, `billing`, or `primary` tags).

```handlebars
{{shipping_address}}
```

#### delivery_address

Formats the delivery address (searches for `delivery` or `primary` tags).

```handlebars
{{delivery_address}}
```

#### additional_address

Formats an additional address tagged as `primary`.

```handlebars
{{additional_address}}
```

---

### Contact Helpers

#### email

Retrieves the email address, prioritizing `email` then `billing_email`.

```handlebars
{{email}}
{{email "contact"}}
```

#### billing_email

Retrieves the billing email, prioritizing `billing_email` then `email`.

```handlebars
{{billing_email}}
```

#### phone

Retrieves the phone number, prioritizing `phone` then `billing_phone`.

```handlebars
{{phone}}
{{phone "contact"}}
```

#### billing_phone

Retrieves the billing phone, prioritizing `billing_phone` then `phone`.

```handlebars
{{billing_phone}}
```

---

### Date & Time Helpers

#### formatDate

Formats a date string. Defaults to `dd.MM.yyyy`.

```handlebars
{{formatDate "2025-05-13"}}                <!-- 13.05.2025 -->
{{formatDate order.created_at "yyyy-MM-dd"}}
```

#### formatDateTime

Formats a date/time string. Defaults to `dd.MM.yyyy HH:mm`.

```handlebars
{{formatDateTime "2025-05-13T14:30:00Z"}}
{{formatDateTime order.created_at "yyyy-MM-dd HH:mm:ss"}}
```

#### dateMath

Performs date arithmetic.

**Parameters:**
- `inputDate` - The starting date
- `expression` - Arithmetic expression like `+1d`, `-2w`, `+1M`
- `inputFormat` (optional) - Input date format
- `format` (optional) - Output date format

```handlebars
{{dateMath "2025-05-13" "+14d"}}           <!-- Add 14 days -->
{{dateMath order.date "-1M"}}               <!-- Subtract 1 month -->
{{dateMath "2025-05-13" "+1y" format="dd.MM.yyyy"}}
```

**Expression units:** `d` (days), `w` (weeks), `M` (months), `y` (years)

---

### Currency Helpers

#### asCurrency

Formats a number as currency using [@epilot/pricing](https://github.com/epilot-dev/pricing).

**Parameters:**
- `amount` - The number to format
- `currency` (default: `EUR`) - Currency code
- `locale` (default: `de`) - Locale for formatting
- `displayZeroAmount` (default: `false`) - Show zero amounts

```handlebars
{{asCurrency 1000}}                       <!-- 1.000,00 € -->
{{asCurrency 99.99 "USD" "en"}}           <!-- $99.99 -->
{{asCurrency order.total "EUR" "de" true}}
```

#### fromCents

Converts a cent value to decimal. Handles both raw integers and formatted strings.

```handlebars
{{fromCents 23562}}                       <!-- 235.62 -->
{{fromCents "9.999,00 €"}}                <!-- 9999.00 -->
{{multiply (fromCents product.price.amount_total) 1.1}}
```

#### toNumber

Parses a locale-formatted number string to a number.

```handlebars
{{toNumber "1,50"}}                       <!-- 1.5 (German format) -->
{{toNumber "1.50"}}                       <!-- 1.5 (English format) -->
```

---

### Comparison Helpers

#### gt

Returns `true` if the first value is greater than the second.

```handlebars
{{#if (gt quantity 10)}}Bulk discount!{{/if}}
```

#### lt

Returns `true` if the first value is less than the second.

```handlebars
{{#if (lt stock 5)}}Low stock{{/if}}
```

#### eq

Returns `true` if two values are equal.

```handlebars
{{#if (eq status "approved")}}Approved!{{/if}}
```

---

### Boolean Helpers

#### yn

Converts a boolean value to localized "Yes" or "No".

```handlebars
{{yn true}}                              <!-- Yes / Ja -->
{{yn false}}                             <!-- No / Nein -->
{{yn is_active "Active" "Inactive"}}     <!-- Custom labels -->
```

#### xif

Returns `"x"` if truthy, empty string if falsy. Useful for checkboxes in documents.

```handlebars
{{xif is_selected}}
```

---

### Tag & Filter Helpers

#### withTag

Retrieves a value from an array by tag.

**Parameters:**
- `arr` - Array to search
- `tag` (default: `primary`) - Tag to match
- `attribute` (optional) - Attribute to extract

```handlebars
{{withTag contacts tag="billing" attribute="email"}}
{{withTag addresses tag="delivery"}}
```

**Special tags:**
- `*` - Get values from all items (comma-separated)
- `...tagname` - Get all items matching the tag (spread)

```handlebars
{{withTag items tag="*" attribute="name"}}           <!-- All names -->
{{withTag contacts tag="...customer" attribute="email"}}
```

---

### String Helpers

#### padStart

Pads a string to a target length with a character.

```handlebars
{{padStart "5" 3 "0"}}                   <!-- 005 -->
{{padStart invoice_number 8 "0"}}        <!-- 00001234 -->
```

---

### Journey Link Helpers

#### generateJourneyLink

Generates a signed journey link with optional parameters.

**Required:**
- `journey_id` - The journey ID

**Optional:**
- `custom_url` - Custom domain for the URL
- `expires_in` - Token expiration ([ms format](https://github.com/vercel/ms))
- `nonce` - Add a nonce to the payload

```handlebars
{{generateJourneyLink hash.journeyId="abc123"}}
{{generateJourneyLink hash.journeyId="abc123" hash.expires_in="7d"}}
{{generateJourneyLink hash.journeyId="abc123" hash.custom_url="portal.example.com"}}
```

---

### Order Table Helpers

These helpers are used internally by [Order Table Variables](/docs/templates/custom-variables#order-table-variable).

| Helper | Description |
|--------|-------------|
| `calculateColspan` | Calculates colspan for table cells |
| `calculatePeriodColspan` | Calculates colspan for period columns |
| `calculateSummaryColspan` | Calculates colspan for summary sections |
| `isColumnEnabled` | Checks if a column is enabled |
| `shouldDisplayDetails` | Checks if column details should display |
| `isSummaryVisible` | Checks if summary section is visible |
| `isExternalFeesMetadataVisible` | Checks if external fees are visible |
| `makeStyle` | Converts config to CSS style string |

---

## Excel-like Formulas

The `calc` helper supports Excel-like formulas for calculations.

```handlebars
{{calc "ROUND(price * quantity, 2)"}}
{{calc "IF(qty > 10, 10, qty)"}}
{{calc "MAX(price1, price2, price3)"}}
{{calc "ROUND(a + b, 0)" a=fee b=shipping}}
```

### Arithmetic Operators

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `^` | Exponentiation |
| `%` | Modulus |
| `()` | Grouping |
| `-n` | Negation |

### Formula Functions

| Function | Description |
|----------|-------------|
| `ABS(n)` | Absolute value |
| `AND(a, b, ...)` | Logical AND |
| `AVERAGE(a, b, ...)` | Average of values |
| `CEIL(n)` | Round up |
| `FLOOR(n)` | Round down |
| `IF(cond, t, f)` | Conditional |
| `MAX(a, b, ...)` | Maximum value |
| `MIN(a, b, ...)` | Minimum value |
| `NOT(a)` | Logical NOT |
| `OR(a, b, ...)` | Logical OR |
| `ROUND(n, places)` | Round to decimal places |
| `SUM(a, b, ...)` | Sum of values |
| `RAND()` | Random number 0-1 |

### Date Functions

All date functions work with ISO 8601 strings and use UTC by default.

| Function | Description |
|----------|-------------|
| `NOW([tz])` | Current datetime |
| `TODAY([tz])` | Current date |
| `DATEADD(date, val, unit, [tz])` | Add/subtract time |
| `DATEDIFF(start, end, unit, [tz])` | Difference between dates |
| `YEAR(date, [tz])` | Extract year |
| `MONTH(date, [tz])` | Extract month (1-12) |
| `DAY(date, [tz])` | Extract day (1-31) |
| `HOUR(date, [tz])` | Extract hour (0-23) |
| `MINUTE(date, [tz])` | Extract minute (0-59) |
| `SECOND(date, [tz])` | Extract second (0-59) |
| `WEEKDAY(date, [type], [tz])` | Day of week |
| `WEEKNUM(date, [type], [tz])` | Week number |

**DATEADD units:** `years`, `quarters`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`

```handlebars
{{calc "DATEADD(order.date, 14, \"days\")"}}
{{calc "DATEDIFF(start_date, TODAY(), \"months\")"}}
{{calc "YEAR(invoice.date)"}}
```

---

## Where Variables Are Supported

| Feature | Variables | Environment Variables | Secrets |
|---------|:---------:|:--------------------:|:-------:|
| Email templates | Yes | Yes | No |
| Document templates | Yes | Yes | No |
| Webhooks | Yes | Yes | Yes |
| Automation actions | Yes | Yes | Yes |
| Entity mapping | Yes | Yes | Yes |
| Journey configurations | Yes | Yes | No |
| Customer Portal | Yes | Yes | No |
| ERP integrations | Yes | Yes | Yes |

:::note
**Secrets** (`SecretString` environment variables) are only available in trusted backend contexts like webhooks and integrations. They are never exposed in templates or the frontend.
:::
