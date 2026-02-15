---
sidebar_position: 5
---

# Custom Variables

[[API Docs](/api/template-variables#tag/CustomVariables)]
[[SDK](https://www.npmjs.com/package/@epilot/template-variables-client)]

Custom Variables allow you to create reusable template logic stored at the organization level. They encapsulate Handlebars expressions, order table configurations, journey links, and text snippets into named variables that can be referenced across email and document templates.

Custom variables are particularly useful for complex HTML markup that needs to render consistently in both emails and documents. For example, an order confirmation table with line items, pricing, and tax breakdowns can be defined once as a custom variable and reused across order confirmation emails and PDF contracts.

## Variable Builder

Access the Variable Builder UI at **Configuration > Templates > Variable Builder** ([direct link](https://portal.epilot.cloud/app/variable-builder)).

## Variable Types

| Type | Description |
|------|-------------|
| `custom` | Free text combined with [Handlebars helpers](/docs/templates/template-variables#custom-handlebars-helpers). Use for reusable logic and computed values. |
| `order_table` | Renders an HTML order table with configurable columns, styling, headers, and footers. See [Order Table Variable](/docs/templates/template-variables#order-table-variable). |
| `journey_link` | Generates a signed journey link using `generateJourneyLink`. |
| `snippet` | Reusable text snippets for common content blocks. |

## Usage in Templates

Reference a custom variable using its `key`:

```handlebars
{{custom_variable_key}}
```

For order table variables, use the `~~` prefix:

```handlebars
{{~~my_order_table}}
```

## API Operations

| Operation | Method | Path |
|-----------|--------|------|
| List all | `GET` | `/v1/custom-variables` |
| Create | `POST` | `/v1/custom-variables` |
| Get by ID | `GET` | `/v1/custom-variables/{id}` |
| Update | `PUT` | `/v1/custom-variables/{id}` |
| Delete | `DELETE` | `/v1/custom-variables/{id}` |
| Search | `POST` | `/v1/custom-variables:search` |

## Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `type` | string | One of `custom`, `order_table`, `journey_link`, `snippet` |
| `name` | string | Display name |
| `key` | string (required) | Key used in Handlebars syntax `{{key}}` |
| `template` | string (required) | Handlebars template content |
| `config` | object | Type-specific configuration (e.g., column layout for order tables) |
| `_tags` | string[] | Tags for categorization and filtering |
| `helper_params` | string[] | Parameter names for helper function logic |
| `helper_logic` | string | JavaScript logic for helper function |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Relation Filtering (Look-Ahead)

When referencing related entities (e.g., orders within an opportunity), you can filter which relation to use with bracket syntax.

### Tag-Based Filtering

Filter by tag value from `_tags`:

```handlebars
{{opportunity.items[approved].line_items}}
{{~~order_table_items[approved]}}
```

### Attribute-Based Filtering

Filter by a specific attribute value using `=`:

```handlebars
{{opportunity.items[status=approved].line_items}}
{{~~order_table_items[status=approved]}}
```

The syntax is determined automatically:
- When `=` is present: filters by `attribute_name = attribute_value`
- When `=` is absent: filters by tag value in `_tags`

You can combine attribute filtering with order table variable properties:

```handlebars
{{~~order_table_items[status=approved] mt=5.5 mb=3.5}}
```

## Code Example

Create a custom variable:

```bash
curl -X POST https://template-variables-api.sls.epilot.io/v1/custom-variables \
  -H "Authorization: Bearer $EPILOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Greeting",
    "key": "custom_greeting",
    "type": "custom",
    "template": "Hello {{contact.first_name}} {{contact.last_name}}!",
    "_tags": ["greeting"]
  }'
```

Search for custom variables by type:

```bash
curl -X POST https://template-variables-api.sls.epilot.io/v1/custom-variables:search \
  -H "Authorization: Bearer $EPILOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "order_table",
    "size": 10
  }'
```
