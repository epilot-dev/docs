---
sidebar_position: 3
---

# Attributes

[[API Docs](/api/entity/#tag/Schemas)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

The most basic way to configure entities is to define a list of Attributes for your schemas

Attributes defined in the schema are rendered as columns in tables and editable fields on the entity edit view.

Each attribute has a `type`, a field `name`, and a display `title`.

## String Attribute

A `string` type attribute defines a simple text field or textarea.

![String Attribute](/img/attribute-string.png)

```json
// basic text field
{
  "type": "string",
  "name": "basic_text_field",
  "label": "Basic Text Field"
}
// with placeholder
{
  "type": "string",
  "name": "with_placeholder",
  "label": "Text with placeholder",
  "placeholder": "Write your name here"
}
// multi-line textarea
{
  "type": "string",
  "name": "textarea",
  "label": "Textarea",
  "multiline": true,
  "rows": 3,
  "layout": "full_width",
}
```

## Select Attribute

A `select` type attribute defines a dropdown list with predefined options.

![Select Attribute](/img/attribute-select.png)

```json
// simple dropdown list with options
{
  "type": "select",
  "name": "simple_select",
  "label": "Simple Dropdown",
  "options": ["Yes", "No", "Maybe"]
}
// dropdown list with title/value pairs
{
  "type": "select",
  "name": "with_values",
  "label": "Dropdown with values",
  "options": [
    {
      "title": "Pending",
      "value": "pending"
    },
    {
      "title": "In Progress",
      "value": "in_progress"
    },
    {
      "title": "Done",
      "value": "completed"
    }
  ]
}
// autocomplete with free text input
{
  "type": "select",
  "name": "autocomplete",
  "label": "Autocomplete",
  "options": [],
  "allow_any": true
}
```

## Boolean Attribute

A `boolean` attribute defines a toggle selection with `true` or `false` values.

![Boolean Attribute](/img/attribute-boolean.png)

```json
// simple toggle, enabled by default
{
  "type": "boolean",
  "name": "enabled",
  "label": "Enabled",
  "default": true
}
```

# Conditional Rendering

As expected, when dealing with attributes, it's likely that depending on the present entity data, some attributes may not make sense to be visible. To accommodate this, entity attributes can be controlled by a conditional rendering expression. 

An expression is composed by three parts:

```
<attribute_name> {operand} "<value>"
```

The following example, illustrates a simple expression:

```
type="electric"
```

Expressions can also be composed by multiple expressions with two conditional operators: OR and an AND.

An example of a composed expression would look like:

```
type="electric" AND is_rechargeable="true"
```

The list of supported operators include:

```
=,!=,>=,<=,>,<
```


## Limitations

### Attribute Values

We support only comparisons using strings and numbers. You can't use arrays or objects.

### Composed Expressions

At the moment, a composed expression can only be combined by 1 type of logical operator. Which means, you can have a full expression composed by ANDs or by ORs.
