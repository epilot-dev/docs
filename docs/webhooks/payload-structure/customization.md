---
sidebar_position: 4
---

# Customization

[[API Docs](/api/webhooks)]
[[SDK](https://www.npmjs.com/package/@epilot/webhooks-client)]

## Get full control over the webhook payload by using JSONata
[JSONata](https://jsonata.org/) is a lightweight query and transformation language for JSON data. It allows you to extract, transform, and manipulate JSON data in a flexible way. In the context of webhooks, JSONata can be used to customize the payload of the webhook request by defining a transformation expression that specifies how the data should be structured.

To use JSONata in your webhook configuration, you can define a transformation expression that specifies how the data should be structured. This expression can include filters, transformations, and other operations to customize the payload according to your needs.
For example, you can use JSONata to extract specific fields from the entity data, transform the data into a different format, or filter out unnecessary fields. This allows you to create a payload that is tailored to your specific requirements and reduces the amount of data that needs to be transmitted over the network.


:::info
By using JSONata, we give you full control over the webhook payload. You can customize the payload structure, include or exclude specific fields, and transform the data as needed. This flexibility allows you to create a payload that is optimized for your use case and reduces the amount of data that needs to be transmitted. Use the testing feature to verify that your JSONata expression produces the desired payload structure.

You can use the [JSONata online editor](https://try.jsonata.org/) to test your expressions and see the results in real-time. This can help you quickly iterate on your payload structure and ensure that it meets your requirements before deploying it in production.
:::

### How to Use JSONata
To use JSONata in your webhook configuration, follow these steps:
1. **Open the Webhook Configuration**: Navigate to the webhook configuration page in the epilot portal.
2. **Select the JSONata Option**: In the webhook configuration, select the option to use JSONata for customizing the payload.
3. **Define the Transformation Expression**: Enter the JSONata expression that defines how the data should be transformed. You can use the provided example as a starting point and modify it according to your needs.
4. **Test the Configuration**: Use the test feature to verify that the JSONata expression produces the desired payload structure. You can adjust the expression as needed based on the test results.
### Example JSONata Expression

Imagine the following webhook payload structure for an opportunity. Most of the time we are only interested in a sub-set of this data structure. By using JSONata we can simplify the payload and even use its utilities to parse and transform data to your needs.

```json
{
  "metadata": {
    "webhook_id": "kT5iDYx373p6v6hWGJVn9j",
    "organization_id": "739224",
    "webhook_name": "Wewbhook",
    "automation_name": "FLOW#wfjV8L8-fD#TASK#25bdd4ec-4335-434b-938e-9afd91cdc9d5",
    "organization_name": "Epilot Dev",
    "correlation_id": "d7fc4288-381c-41cc-ba74-535e3ae84a0b",
    "creation_timestamp": "2025-07-09T11:50:25.933Z",
    "execution_id": "5cc9432c-a2ae-4649-93e5-ec528eb4e1e4",
    "action_id": "64ec83d2-fa59-44ab-9d27-8dbcbdfde2a9"
  },
  "entity": {
    "status": "open",
    "source": {
      "title": "manual",
      "href": null
    },
    "source_type": "manual",
    "_schema": "opportunity",
    "_id": "21e2c48f-ec99-4cd3-8552-b776c0c0aec5",
    "_org": "739224",
    "_owners": [
      {
        "org_id": "739224",
        "user_id": "10010729"
      }
    ],
    "_created_at": "2025-07-03T06:15:39.776Z",
    "_updated_at": "2025-07-08T13:43:11.069Z",
    "opportunity_number": "OP-6376",
    "_title": "OP-6376",
    "_acl": {
      "view": [
        "org_739224"
      ],
      "edit": [
        "org_739224"
      ],
      "delete": [
        "org_739224"
      ]
    }
  },
  "relations": []
  }
}
```

by using this JSONata query:

```json
{
    "org_id": metadata.organization_id,
    "user_id": $number(entity._owners.user_id),
    "lead_nr": entity.opportunity_number,
    "status": entity.status
}
```

This will result in the following payload:

```json
{
    "org_id": "739224",
    "user_id": 10010729,
    "lead_nr": "OP-6376",
    "status": "open"
}
```
This example demonstrates how to extract specific fields from the webhook payload and transform them into a simplified structure. You can adjust the JSONata expression to include or exclude fields, apply transformations, or filter data as needed.


## Get Additional Attributes

Customizing the payload of an incoming webhook request is entirely feasible. The standard structure for this customization typically follows this general format:

```json
{
   metadata: {
    organization_id: '',
    ...
   }, // always present
   entity: {} // always present,
   relations: {} // optional,
   activity: {} // optional,
   changed_attributes: {
      added: {},
      deleted: {},
      updated: {}
   } // optional
}
```
- Include Changed Attributes
  - shows the ***changed*** added|deleted|updated attributes ***after*** the event
  - important note: this will only be included if the event is a change event e.g. an `Entity update: Opportunity` automation trigger. Manual trigger will not fill changed attribures.
- Include Activity
- Include Relations
  - **hydrated** relations to other entities
  - important note: including this can increase the payload size significantly

![Custom Webhook Payload Configuration](../../../static/img/webhooks/custom-payload.png)

## Custom header

Custom headers can be added to the webhook request to provide additional information or authentication. This feature allows users to include custom headers in the webhook request, enhancing the security and customization options available for webhook configurations.

![Custom Webhook Header](../../../static/img/webhooks/custom-header.png)

The following headers are forbidden and will be removed from the request:
```
    'x-epilot-org-id',
    'x-ivy-org-id',
    'Authorization',
    'A-IM',
    'Accept-Charset',
    'Accept-Datetime',
    'Accept-Encoding',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Encoding',
    'Transfer-Encoding',
    'Host',
    'Content-Type',
    'Content-Range',
    'Content-MD5',
    'Range',
    'User-Agent',
    'Date',
    'Expect',
    'Forwarded',
    'From',
    'Host',
    'HTTP2-Settings',
    'If-Match',
    'If-Modified-Since',
    'If-None-Match',
    'If-Range',
    'If-Unmodified-Since',
    'Max-Forwards',
    'Origin',
    'Pragma',
    'Proxy-Authorization',
    'Referer',
    'Server',
    'TE',
    'Trailer',
    'Transfer-Encoding',
    'Upgrade',
    'Via',
    'Warning',
    'x-forwarded-*',
    'x-amz-*',
    'x-amzn-*'
```

## Custom oauth parameter

Custom OAuth parameters can be seamlessly integrated into the webhook configuration process. These parameters can be included as part of the OAuth request, appended as body, query, or header parameters. This feature empowers users to augment the OAuth request with supplementary information as needed, enhancing the flexibility and customization options within the authentication flow.

![Custom Webhook Ouath Parameter](../../../static/img/webhooks/custom-oauth.png)
