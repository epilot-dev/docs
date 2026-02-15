---
sidebar_position: 3
title: Attributes
---

# Attributes

[[API Docs](/api/entity/#tag/Schemas)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

Attributes are the building blocks of [entity schemas](/docs/entities/flexible-entities). Each attribute defines a field that appears as a column in table views and as an editable field in the entity detail view.

Every attribute requires a `type`, a field `name` (unique identifier), and a display `label`.

## Common Properties

All attribute types share these base properties:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Unique identifier for the attribute |
| `label` | `string` | Display label in the UI |
| `type` | `string` | Attribute type (see sections below) |
| `required` | `boolean` | Whether the field is required |
| `readonly` | `boolean` | Whether the field is read-only |
| `hidden` | `boolean` | Do not render in entity views |
| `show_in_table` | `boolean` | Show as column in table views |
| `sortable` | `boolean` | Allow sorting by this attribute |
| `group` | `string` | Group ID for UI grouping |
| `layout` | `string` | Layout hint, e.g. `"full_width"` |
| `order` | `integer` | Sort order within group |
| `default_value` | `any` | Default value for new entities |
| `placeholder` | `string` | Placeholder text for input |
| `repeatable` | `boolean` | Allow multiple values (see [Repeatable Attributes](#repeatable-attributes)) |
| `has_primary` | `boolean` | Support marking one item as primary |
| `render_condition` | `string` | Conditional visibility expression (see [Conditional Rendering](#conditional-rendering)) |

---

## Basic Types

### String

A text input or textarea. The most common attribute type.

```json title="Schema definition"
{
  "type": "string",
  "name": "description",
  "label": "Description",
  "multiline": true,
  "rich_text": true,
  "rows": 5
}
```

| Property | Type | Description |
|----------|------|-------------|
| `multiline` | `boolean` | Render as textarea |
| `rich_text` | `boolean` | Enable rich text (HTML) editor |
| `rows` | `integer` | Number of visible rows for textarea |

### Number

A numeric input field.

:::info
Number attributes are stored as **strings by default** (e.g. `"1234567.89"`). Set `data_type: "number"` to store as a numeric type instead. This matters when consuming entity data via the API.
:::

```json title="Schema definition"
{
  "type": "number",
  "name": "quantity",
  "label": "Quantity",
  "format": "0,0.00",
  "show_separator": true,
  "data_type": "number"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `format` | `string` | Number format pattern (e.g. `"0,0.00"`) |
| `show_separator` | `boolean` | Display thousands separator (default: `true`) |
| `data_type` | `string` | `"string"` (default) or `"number"` -- controls the stored JSON type |

```json title="Stored value (default)"
"1234567.89"
```

```json title="Stored value (data_type: number)"
1234567.89
```

### Boolean

A toggle with `true` / `false` values. Renders as a switch or checkbox.

```json title="Schema definition"
{
  "type": "boolean",
  "name": "is_active",
  "label": "Active",
  "default_value": true,
  "display_type": "switch"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `display_type` | `string` | `"switch"` (default) or `"checkbox"` |

### Date

A date picker. Values are stored in ISO 8601 format.

```json title="Schema definition"
{
  "type": "date",
  "name": "start_date",
  "label": "Start Date"
}
```

```json title="Stored value"
"2025-01-15"
```

### Datetime

A date and time picker. Values include the time component in UTC.

```json title="Schema definition"
{
  "type": "datetime",
  "name": "scheduled_at",
  "label": "Scheduled At"
}
```

```json title="Stored value"
"2025-01-15T14:30:00.000Z"
```

### Link

A URL field with a display title and href.

```json title="Schema definition"
{
  "type": "link",
  "name": "website",
  "label": "Website"
}
```

```json title="Stored value"
{
  "title": "epilot",
  "href": "https://epilot.cloud"
}
```

---

## Selection Types

### Select

A single-value dropdown. Options can be simple strings or title/value pairs.

```json title="Schema definition"
{
  "type": "select",
  "name": "priority",
  "label": "Priority",
  "options": [
    { "title": "Low", "value": "low" },
    { "title": "Medium", "value": "medium" },
    { "title": "High", "value": "high" }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `options` | `array` | List of options (strings or `{ title, value }` objects) |
| `allow_any` | `boolean` | Allow free-text input (autocomplete mode) |

### Radio

Single selection rendered as radio buttons. Same schema as `select`.

```json title="Schema definition"
{
  "type": "radio",
  "name": "contact_type",
  "label": "Contact Type",
  "options": ["Individual", "Business"]
}
```

### Multiselect

Multiple choice selection from a dropdown.

```json title="Schema definition"
{
  "type": "multiselect",
  "name": "categories",
  "label": "Categories",
  "options": ["Solar", "Wind", "Gas", "Electric"],
  "allow_extra_options": true
}
```

| Property | Type | Description |
|----------|------|-------------|
| `options` | `array` | List of options (strings or `{ title, value }` objects) |
| `allow_any` | `boolean` | Allow free-text input in addition to options |
| `allow_extra_options` | `boolean` | Allow users to enter values not in the options list |
| `disable_case_sensitive` | `boolean` | Case-insensitive matching of values against options |

```json title="Stored value"
["Solar", "Wind"]
```

### Checkbox

Multiple selection rendered as checkboxes. Same schema and value structure as `multiselect`.

```json title="Schema definition"
{
  "type": "checkbox",
  "name": "features",
  "label": "Features",
  "options": ["Wifi", "Parking", "Pool"]
}
```

### Status

A dropdown with color-coded status options. Commonly used for entity lifecycle states.

```json title="Schema definition"
{
  "type": "status",
  "name": "status",
  "label": "Status",
  "options": [
    { "value": "draft", "title": "Draft" },
    { "value": "active", "title": "Active" },
    { "value": "closed", "title": "Closed" }
  ]
}
```

### Tags

A freeform tags input. Optionally provide predefined options or suggestions.

```json title="Schema definition"
{
  "type": "tags",
  "name": "labels",
  "label": "Labels",
  "options": ["important", "follow-up", "archived"],
  "suggestions": ["vip", "partner"]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `options` | `string[]` | Predefined tag options shown in the picker |
| `suggestions` | `string[]` | Suggested tags shown as autocomplete hints |

```json title="Stored value"
["important", "follow-up"]
```

### Country

A country picker using ISO 3166-1 alpha-2 codes.

```json title="Schema definition"
{
  "type": "country",
  "name": "country",
  "label": "Country"
}
```

```json title="Stored value"
"DE"
```

---

## Contact Types

### Email

An email address field. Typically repeatable with tags for categorization (e.g. work, personal).

```json title="Schema definition"
{
  "type": "email",
  "name": "email",
  "label": "Email",
  "repeatable": true,
  "has_primary": true
}
```

```json title="Stored value (repeatable)"
[
  { "_id": "abc123", "_tags": ["primary", "work"], "email": "work@example.com" },
  { "_id": "def456", "_tags": ["personal"], "email": "personal@example.com" }
]
```

### Phone

A phone number field. Typically repeatable with tags for mobile, home, work, etc.

```json title="Schema definition"
{
  "type": "phone",
  "name": "phone",
  "label": "Phone",
  "repeatable": true,
  "has_primary": true
}
```

```json title="Stored value (repeatable)"
[
  { "_id": "abc123", "_tags": ["mobile"], "phone": "+491234567890" }
]
```

### Address

A structured address with multiple sub-fields. Usually repeatable with tags like `billing`, `shipping`, or `home`.

```json title="Schema definition"
{
  "type": "address",
  "name": "address",
  "label": "Address",
  "repeatable": true,
  "has_primary": true,
  "default_address_fields": [
    "street", "street_number", "postal_code", "city", "country"
  ]
}
```

The `default_address_fields` array controls which sub-fields are visible by default. If omitted, the default fields are `street`, `street_number`, `postal_code`, and `city`.

<details>
<summary>Stored value example (repeatable)</summary>

```json
[
  {
    "_id": "addr1",
    "_tags": ["billing"],
    "salutation": "Mr.",
    "title": "Prof. Dr.",
    "first_name": "John",
    "last_name": "Doe",
    "company_name": "epilot GmbH",
    "street": "Hauptstrasse",
    "street_number": "123",
    "postal_code": "50668",
    "city": "Cologne",
    "country": "DE",
    "additional_info": "2nd floor",
    "suburb": "Altstadt",
    "plot_of_land": "1",
    "plot_area": "A",
    "coordinates": "50.9375,6.9603"
  }
]
```

</details>

**Available address fields:** `salutation`, `title`, `first_name`, `last_name`, `company_name`, `street`, `street_number`, `postal_code`, `city`, `country`, `additional_info`, `suburb`, `plot_of_land`, `plot_area`, `postbox`, `coordinates`, `start_date`, `end_date`.

---

## Financial Types

### Currency

A monetary amount stored as an integer (cents) with a separate currency code and decimal representation.

```json title="Schema definition"
{
  "type": "currency",
  "name": "total_price",
  "label": "Total Price",
  "currency": [
    { "code": "EUR", "description": "Euro", "symbol": "\u20ac" }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `currency` | `array` | Available currency options (required). Each entry has `code` (ISO 4217), `description`, `symbol`, and optional `flag` |
| `currency_selector_only` | `boolean` | When `true`, only shows the currency picker without an amount input (default: `false`) |

:::info
Currency attributes generate **three sibling fields** on the entity. When reading entity data via the API, use the `_decimal` field for display and the base field (integer cents) for calculations.
:::

| Field | JSON Type | Example | Description |
|-------|-----------|---------|-------------|
| `total_price` | `number` | `12350` | Integer amount in minor units (cents) |
| `total_price_currency` | `string` | `"EUR"` | ISO 4217 currency code |
| `total_price_decimal` | `string` | `"123.50"` | Human-readable decimal string |

### Payment

A payment method field supporting SEPA, invoice, and cash types. Typically repeatable.

```json title="Schema definition"
{
  "type": "payment",
  "name": "payment",
  "label": "Payment Method",
  "repeatable": true
}
```

**Payment types:** `payment_sepa`, `payment_invoice`, `payment_cash`.

<details>
<summary>Stored value example (repeatable)</summary>

```json
[
  {
    "_id": "pay1",
    "_tags": ["primary"],
    "type": "payment_sepa",
    "data": {
      "bank_name": "Deutsche Bank",
      "iban": "DE89370400440532013000",
      "bic_number": "DEUTDEFF",
      "fullname": "John Doe"
    }
  },
  {
    "_id": "pay2",
    "_tags": [],
    "type": "payment_invoice"
  }
]
```

</details>

---

## Relation Types

Relations link entities together. See [Relations](/docs/entities/relations) for a full guide.

### Relation

A link to one or more entities. The core building block of the epilot data model.

:::info
Relations are always stored as arrays via the `$relation` wrapper, regardless of whether `relation_type` is `"has_one"` or `"has_many"`.
:::

```json title="Schema definition"
{
  "type": "relation",
  "name": "contacts",
  "label": "Contacts",
  "relation_type": "has_many",
  "allowedSchemas": ["contact"],
  "enable_relation_picker": true,
  "enable_relation_tags": true,
  "summary_fields": ["email", "phone"],
  "reverse_attributes": {
    "contact": "account"
  },
  "actions": [
    { "action_type": "add_existing", "label": "Add Existing", "default": true },
    { "action_type": "create_new", "label": "Create New" }
  ]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `relation_type` | `string` | `"has_many"` or `"has_one"` |
| `allowedSchemas` | `string[]` | Which entity schemas can be linked |
| `enable_relation_picker` | `boolean` | Show entity search picker (default: `true`) |
| `enable_relation_tags` | `boolean` | Allow tagging relations (default: `true`) |
| `summary_fields` | `string[]` | Fields to display in relation summary |
| `reverse_attributes` | `object` | Map of schema slug to reverse attribute name (e.g. `{ "contact": "account" }`) |
| `relation_affinity_mode` | `string` | `"weak"` (kept on duplication) or `"strong"` (discarded on duplication) |
| `actions` | `array` | Available relation actions (see below) |
| `drawer_size` | `string` | Detail drawer width: `"small"`, `"medium"`, or `"large"` |
| `details_view_mode_enabled` | `boolean` | Enable Master-Details view for inline preview, editing, and creation (default: `false`) |
| `edit_mode` | `string` | `"list-view"` for list-based editing |
| `relation_picker_filter` | `object` | Additional search filter for the picker, e.g. `{ "q": "NOT is_composite_price:true" }` |
| `add_button_label` | `string` | Custom label for the add button |
| `search_placeholder` | `string` | Custom placeholder text for the relation search input |

**Action types:**

| `action_type` | Description |
|----------------|-------------|
| `add_existing` | Pick an existing entity to link |
| `create_new` | Create a new entity using the first `allowedSchemas` schema |
| `create_from_existing` | Clone an existing entity to create a new linked entity |

```json title="Stored value"
{
  "$relation": [
    { "entity_id": "uuid-1", "_tags": ["primary"] },
    { "entity_id": "uuid-2", "_tags": [] }
  ]
}
```

### Relation User

A reference to epilot platform users (not entity contacts).

```json title="Schema definition"
{
  "type": "relation_user",
  "name": "assignee",
  "label": "Assignee"
}
```

```json title="Stored value"
[
  {
    "type": "user",
    "user_id": "10010729",
    "display_name": "Jane Smith",
    "email": "jane@example.com",
    "org_id": "739224"
  }
]
```

### Relation Address

A reference to an address attribute on a related entity, avoiding data duplication.

```json title="Schema definition"
{
  "type": "relation_address",
  "name": "billing_address",
  "label": "Billing Address"
}
```

```json title="Stored value"
{
  "$relation_ref": [
    { "entity_id": "uuid-1", "path": "address", "_id": "addr1" }
  ]
}
```

### Relation Payment Method

A reference to a payment method on a related entity.

```json title="Schema definition"
{
  "type": "relation_payment_method",
  "name": "payment_ref",
  "label": "Payment Reference"
}
```

```json title="Stored value"
{
  "$relation_ref": [
    { "entity_id": "uuid-1", "path": "payment", "_id": "pay1" }
  ]
}
```

---

## File Types

:::info
File and image attributes are **relation attributes** under the hood. They store `$relation` arrays pointing to `file` entities. The UI renders them with upload widgets and previews, but the underlying data model is identical to any other [relation](/docs/entities/relations).
:::

See [File API](/api/file) for upload and management.

### File

A file attachment (any type). Stored as a relation to a file entity.

```json title="Schema definition"
{
  "type": "file",
  "name": "documents",
  "label": "Documents",
  "multiple": true,
  "allowed_extensions": ["pdf", "docx"],
  "default_access_control": "private"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `multiple` | `boolean` | Allow multiple files |
| `allowed_extensions` | `string[]` | Restrict to specific file extensions (without dot, e.g. `"csv"`) |
| `default_access_control` | `string` | `"private"` or `"public-read"` |
| `display_images_landscaped` | `boolean` | Display uploaded images in landscape mode in the entity detail view |
| `enable_description` | `boolean` | Show an i18n description alongside the attribute label. Set the description via platform locales as `file.{attribute_name}.description_text` |

```json title="Stored value"
{
  "$relation": [
    { "entity_id": "file-uuid-1", "_tags": [] },
    { "entity_id": "file-uuid-2", "_tags": [] }
  ]
}
```

### Image

An image attachment. Same schema as `file` but with image-specific preview rendering. Supports the same properties as `file` above.

```json title="Schema definition"
{
  "type": "image",
  "name": "photos",
  "label": "Photos",
  "multiple": true,
  "display_images_landscaped": true
}
```

---

## Special Types

### Sequence

An auto-incrementing identifier with a configurable prefix. Commonly used for order numbers and ticket IDs.

```json title="Schema definition"
{
  "type": "sequence",
  "name": "order_number",
  "label": "Order Number",
  "prefix": "ORD-",
  "start_number": 1000
}
```

| Property | Type | Description |
|----------|------|-------------|
| `prefix` | `string` | Text prepended to the number (e.g. `"ORD-"`) |
| `start_number` | `integer` | Initial sequence value |

```json title="Stored value"
"ORD-1042"
```

### Computed

A read-only field whose value is derived from other attributes using a Handlebars template (value formatter).

```json title="Schema definition"
{
  "type": "computed",
  "name": "total_display",
  "label": "Total",
  "value_formatter": "{{formatCurrencyAttribute entity attribute locale}}",
  "amount_field": "amount_total",
  "currency_field": "currency"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `value_formatter` | `string` | Handlebars template for display value |

### Consent

Tracks GDPR consent with opt-in/opt-out events and audit trail.

```json title="Schema definition"
{
  "type": "consent",
  "name": "marketing_consent",
  "label": "Marketing Consent",
  "topic": "EMAIL_MARKETING",
  "identifiers": ["email"]
}
```

| Property | Type | Description |
|----------|------|-------------|
| `topic` | `string` | **Required.** The consent topic (e.g. `"EMAIL_MARKETING"`) |
| `identifiers` | `string[]` | Entity attributes used as consent identifiers (e.g. `["email"]`) |

<details>
<summary>Stored value example</summary>

```json
{
  "status": "active",
  "identifiers": [
    {
      "identifier": "83573fb1-a945-44d6-82f8-8cc41183967c",
      "status": "active",
      "events": [
        {
          "type": "OPT_IN",
          "identifier": "83573fb1-a945-44d6-82f8-8cc41183967c",
          "topic": "EMAIL_MARKETING",
          "organization_id": "739224",
          "source": "https://portal.epilot.cloud",
          "created_at": "2025-01-15T08:46:12.652Z"
        }
      ]
    }
  ]
}
```

</details>

See [Consent API](/api/consent) for managing consent programmatically.

### Purpose

Links an entity to taxonomy purposes for classification. See [Taxonomies](/docs/entities/taxonomies).

```json title="Schema definition"
{
  "type": "purpose",
  "name": "_purpose",
  "label": "Purpose"
}
```

```json title="Stored value"
["purpose-uuid-1", "purpose-uuid-2"]
```

### Ordered List

An ordered list of repeatable sub-items, where ordering is significant. Each item stores its value under the attribute name as key.

```json title="Schema definition"
{
  "type": "ordered_list",
  "name": "steps",
  "label": "Steps"
}
```

```json title="Stored value"
[
  { "_id": "id1", "_tags": [], "steps": "First step" },
  { "_id": "id2", "_tags": [], "steps": "Second step" }
]
```

### Automation

A reference to an automation flow. Used internally to link entities to triggered automations.

```json title="Schema definition"
{
  "type": "automation",
  "name": "automation_trigger",
  "label": "Automation"
}
```

### Internal

A hidden field with no UI representation. Used to store arbitrary JSON data programmatically.

```json title="Schema definition"
{
  "type": "internal",
  "name": "metadata",
  "label": "Metadata"
}
```

---

## System Attribute Types

<details>
<summary>Types used by platform features (not typically created manually)</summary>

| Type | Description |
|------|-------------|
| `internal_user` | Internal epilot user information |
| `invitation_email` | Email address for partner invitations |
| `partner_status` | Partner relationship status |
| `partner_organisation` | Shared partner organization data |
| `portal_access` | Portal access configuration |
| `price_component` | Price component for product pricing |

</details>

---

## Repeatable Attributes

Any attribute type can be made repeatable by setting `"repeatable": true`. This transforms the stored value into an array of items, each with a unique `_id` and optional `_tags`.

```json title="Schema definition"
{
  "name": "notes",
  "label": "Notes",
  "type": "string",
  "multiline": true,
  "repeatable": true,
  "has_primary": true
}
```

```json title="Stored value"
[
  { "_id": "abc123", "_tags": ["important"], "value": "First note" },
  { "_id": "def456", "_tags": ["follow-up"], "value": "Second note" }
]
```

When `has_primary` is set, one item can be marked as the primary entry using a `"primary"` tag.

Built-in repeatable types like `email`, `phone`, and `address` store their value under a type-specific key (e.g. `"email"`, `"phone"`) rather than `"value"`.

**Accessing items in templates:**
- `entity.email.0.email` -- first email address
- `entity.address.0.city` -- city from first address

---

## Conditional Rendering

<details>
<summary>Expression-based attribute visibility</summary>

Conditional rendering controls the visibility of attributes in the Entity Details view. Use `render_condition` to hide or show attributes based on entity data.

An expression consists of three parts:

```
<attribute_name> {operator} "<value>"
```

Example:

```
type = "electric"
```

Combine expressions with `AND` or `OR` (but not both in one expression):

```
type = "electric" AND is_rechargeable = "true"
```

**Supported operators:** `=`, `!=`, `>=`, `<=`, `>`, `<`

### Where render conditions apply

**Entity List Item** -- display summary attributes conditionally:

```json
{
  "ui_config": {
    "list_item": {
      "summary_attributes": [
        {
          "label": "Variability",
          "value": "{{t \"summary.Variable\" }}",
          "show_as_tag": true,
          "tag_color": "secondary",
          "render_condition": "is_composite_price = \"false\" & variable_price = \"true\""
        }
      ]
    }
  }
}
```

**Attributes on Entity Details view:**

```json
{
  "name": "price_components",
  "label": "Price Component",
  "type": "relation",
  "show_in_table": true,
  "render_condition": "is_composite_price = \"true\""
}
```

**Attribute Groups:**

```json
{
  "id": "Payment Information",
  "label": "Payment Information",
  "expanded": true,
  "order": 20,
  "render_condition": "is_composite_price = \"false\""
}
```

Expressions can access the full entity context -- all attributes of the current entity are available.

### Limitations

- **Value types:** Only strings and numbers are supported. Object/array comparisons are not supported, but nested properties work: `price_components.value.$relation.length < "1"`
- **Mixed operators:** A composed expression can only use one type of logical operator (`AND` or `OR`, not both).
- **No visual builder:** The Entity Builder does not yet support a UI for building expressions. Configure them by editing the schema directly via the [Entity Builder](/api/entity/#tag/Schemas).

</details>
