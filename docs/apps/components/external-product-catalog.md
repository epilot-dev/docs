---
title: External Product Catalog
hide_title: true
sidebar_position: 7
---

<h1 align="center">External Product Catalog</h1>

<p align="center">Integrate external product catalogs with epilot</p>

## Configuration

To add an **External Product Catalog** component, create a new App or update an existing App.

<img src="/img/apps/external-product-catalog/external-catalog-option-menu.png" width="400" />

All development is performed using the built-in configuration editor accessible from the component editor.

The editor provides you with autocomplete and validation of the configuration. That way you can start with the example provided in this documentation and fine-tune your external product catalog without ever leaving the editor.

<img src="/img/apps/external-product-catalog/component-editor.png" width="700" />

## Hooks

Hooks allow changing or adding functionality to external product catalogs.
They typically rely on your API for the execution of any necessary logic and expect a certain response.

### Supported Hooks / Catalog Types

The interface supports two types of data exchange, depending on the block being used in the journey:
- **Products**: Returns an array of products (`type: "products"`).
- **Product Recommendations**: Returns a source product and a list of offer products (`type: "product-recommendations"`).

### Template Variables

You can use template variables throughout your configuration to dynamically inject values from various sources. Template variables use the `{{Variable.path}}` syntax.

#### Available Variables

- **`Options.*`**: Access values from the app options configured during installation
  - Example: `{{Options.api_url}}`, `{{Options.api_key}}`

- **`AuthResponse.*`**: Access data from the authentication response data
  - Example: `{{AuthResponse.access_token}}`
  - Use this to extract tokens or other authentication data returned by your auth endpoint

- **`Context.*`**: Access properties from the current context (e.g. Journey Context)
  - Example: `{{Context.journey_id}}`, `{{Context.journey_url.params.xxx}}`

### Example

Below is an example of a configuration for the `products` hook, assuming a typical OAuth2 authentication flow, where the client credentials are stored in the app options.

```json title="Products hook with OAuth2 authentication"
{
  "hooks": [
    {
      "id": "prod-catalog",
      "type": "products",
      "name": {
        "en": "Prod Products",
        "de": "Prod Produkte"
      },
      "auth": {
        "url": "{{Options.oauth_api_url}}/auth/token",
        "method": "POST",
        "headers": {
          "Authorization": "Basic {{Options.oauth_client_id | append: \":\" | append: Options.oauth_client_secret | base64_encode}}",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": {
          "grant_type": "client_credentials",
          "scope": "{{Options.oauth_scope}}"
        }
      },
      "call": {
        "url": "{{Options.base_api_url}}/products",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{AuthResponse.access_token}}"
        }
      }
    }
  ]
}
```

### Security Considerations

:::caution
Never hardcode sensitive credentials in your configuration. Always store API keys and secrets as app options, which are encrypted at rest.
:::

- **Credentials Storage**: Store sensitive credentials (like API keys) as app options rather than hardcoding them
- **Token Expiration**: Ensure your authentication tokens have appropriate expiration times
- **HTTPS**: Always use HTTPS URLs for authentication endpoints and redirects
- **Access Control**: Implement proper authorization checks on your authentication endpoint to ensure only authorized clients can obtain tokens

## Usage in Journeys

After your External Product Catalog component is configured and the app is installed, it can be used within epilot's Journeys. Currently we support seamless integration of the external product catalog into the journey via Product Blocks and Product Recommendations Blocks (beta).

When a journey creator adds a **Product Block** or **Product Recommendations Block** in a journey, they can select the integration as the source for products. Only hooks that are supported for the selected block type will be available (e.g. only `products` hook for Product Block, only `product-recommendations` hook for Product Recommendations Block).

<img src="/img/apps/external-product-catalog/journey-product-block-config.png" width="500" />

This allows the journey to dynamically fetch products and pricing from your external catalog in journeys.

By default, only data from preceding steps (in their defined order) is passed to the steps/blocks data context. While this works for most use cases, you can configure the data context to also include data from subsequent steps, enabling non-linear journey flows. This configuration also makes the data each integration passes to the journey more explicit, lighter and easier to manage.

<img src="/img/apps/external-product-catalog/blocks-data-selection.png" width="500" />

## Usage in Portals

After your External Product Catalog component is configured and the app is installed, it can also be used within epilot's Portals.

When configuring a Portal, you can add a **Product Block** and select the integration as the source for products. Only hooks that are supported for the selected block type will be available.

<img src="/img/apps/external-product-catalog/portal-product-block-config.png" width="500" />

This allows the portal to dynamically fetch products and pricing from your external catalog.

## Integration Interface

To ensure seamless communication between epilot and your external catalog, your integration must respect the **External Catalog Integration Interface**.

### Specification

The integration works as a request to your service endpoint with the following request and response:

1.  **Request**: A payload containing the `context` of the journey, portal, or a custom one defined by you/epilot.
2.  **Response**: A list of products or product recommendations in a specific format.

For detailed information on the request and response schemas, please refer to the [External Catalog Integration Interface documentation](https://docs.api.epilot.io/pricing-api-external-catalog).


