---
sidebar_position: 3
---

# Template Variables

[[API Docs](/api/template-variables)]
[[SDK](https://www.npmjs.com/package/@epilot/template-variables-client)]

The Template Variables API provides variable discovery and substitution email and document templates using [Handlebars](https://handlebarsjs.com/).

## Template Variables API

This API is called to both discover available variables as well as execute the variable substitution using handlebars.

Each time an email or document template is used, the Template Variable API is called with the appropriate standardised parameters.

The Template Variable API uses the Entity API and others to fetch the correct values for each variable when compiling the template.

## Variable Picker

We provide a picker UI for users to search and explore available variables.

![Variable Picker UI](../../static/img/variable-picker.png)
