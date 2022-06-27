---
sidebar_position: 1
---

# Example: 3rd Party Journey

This article shows 2 examples for integrating a custom 3rd party form source via the epilot API.

In this example we'll create the following entities:

- **Opportunity**
- **Order**
- **Submissiom**
- **Contact**
- **Account**

We'll also cover the following topics:

1. Attaching Files to entities
1. Creating relations between the Entities
1. Starting workflows

## Method 1: Using Submission API (Simple)

[[Postman Collection](/downloads/simple-submission.postman_collection.json.zip)]

The simplest way to integrate a custom 3rd party journey is to directly use the [Submission API](/api/submission) and configure an [Automation](/docs/automation) to create further entities and trigger emails and workflows.

### Step 1: Upload Files (optional)

Submission API may be used together with [File API](https://docs.epilot.io/api/file) to pass file uploads to submissions using the following flow:

Use the `uploadFile` or `uploadFilePublic` operation of File API to generate a temporary upload URL and receive an s3ref.

Please note that the `uploadFile` requires a valid OAuth2 authorization token for epilot.

```
POST https://file.sls.epilot.io/v1/files/public/upload
```

Request Body:

```json
// application/json
{
  "filename": "document.pdf",
  "mime_type": "application/pdf"
}
```

Response (200):

```json
// application/json
{
  "s3ref": {
    "bucket": "epilot-user-content",
    "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
  },
  "upload_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123"
}
```

Then, upload a file with a `PUT` operation to the generated upload_url. (Hint: make sure you pass the correct Content-Type header and encoding!)

```
PUT https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
```

Request Body:

```
(binary data)
```

### Step 2: Create Submission

To create a Submission, call the [Submission API](/api/submission) with data from your custom form or journey:

```
POST https://submission.sls.epilot.io/v1/submission/submissions
```

Any valid JSON data can be passed via the `entities` property.

```json
// application/json
{
  // replace with your epilot organization id
  "organization_id": "123",
  "source_type": "api", // select "api" to signify the submission was created via a custom API integration
  "source_id": "example-api-journey", // source_id is used to identify your journey when triggering automations
  "entities": [
    {
      "_schema": "submission", // important: must be set to "submission"
      "description": "Submission created via API"
      // add your custom submission data here
    }
  ]
}
```

If you uploaded any files during the first step, you should pass the `s3ref`s in the `entities.*.files` property in your Submission API payload:

Request Body:

```json
{
  // ...
  "entities": [
    {
      "_schema": "submission",
      "description": "Submission with files",
      "files": [
        {
          "s3ref": {
            "bucket": "epilot-user-content",
            "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
          }
        }
      ]
    }
  ]
}
```

You may also optionally add marketing opt ins to your Submission API payload to display consent information on the created entities.

```json
{
  // ...
  "opt_ins": [
    {
      "topic": "EMAIL_MARKETING",
      "identifier": "example@submission.com",
      "meta": {
        // extra metadata such as the IP address may be added for the consent event
      }
    }
  ]
}
```

### Step 3: Create an Automation Flow

To automatically create epilot epilot entities, send emails and start workflows from your submissions, you can configure an [Automation](/docs/automation/intro).

Create a new Automation from [Configuration > Advanced Configuration > Automations > Create](/app/automation-hub/flow/create)

Configure an API Submission trigger with the same `source_id` you're passing in your Submission API payload.

![API Submission Trigger](/img/automation-trigger-api.png)

Switch to the _Actions_ Tab and add your first Entity Mapping action.

![Map Entity Action](/img/automation-map-entity-action.png)

You can now start mapping fields from your submission to business objects. Refer to the [Entity Mapping documentation](/docs/automation/entity-mapping) for details.

![Map Entity Action](/img/automation-entity-mapping.png)

You may also

To ensure proper relations between actions, the recommended order for journey submission Automation actions is the following:

1. Create/Edit Account
1. Create/Edit Contact
1. Create/Edit Order
1. Create/Edit Opportunity
1. Start Workflow
1. Trigger Webhook

Refer to the [Automation documentation](/docs/automation) for details.

## Method 2: Direct API usage

[[Postman Collection](/downloads/api-journey.postman_collection.json.zip)]

In some cases it may be easier to directly use epilot APIs to create your business objects and trigger actions, instead of using Automation.

### Step 1: Create customer entities (contact + account)

We start by using the Entity API [`upsertEntity`](/api/entity#operation/getUserLoginParameters) operation to create or update a Contact, and optionally an Account entity, which are related to each other:

```
PATCH https://entity.sls.epilot.io/v1/entity/account:upsert
```

Request body 1:

```json
{
  "unique_key": ["customer_number"],
  "entity": {
    "_schema": "account",
    "_title": "Testfirma GmbH",
    "name": "Apple GmbH",
    "customer_number": "123456789",
    "email": [
      {
        "_tags": [],
        "email": "applegmbh+demo@epilot.cloud"
      }
    ],
    "address": [
      {
        "_tags": ["billing"],
        "street": "Im Mediapark",
        "street_number": "8a",
        "postal_code": "50670",
        "city": "Köln",
        "country": "DE",
        "additional_info": ""
      }
    ],
    "phone": [
      {
        "_tags": ["business"],
        "phone": "0123456789"
      }
    ]
  }
}
```

Request body 2:

```json
{
  "unique_key": ["email.0.email"],
  "entity": {
    "address": [
      {
        "_tags": ["billing"],
        "street": "Im Mediapark",
        "street_number": "8a",
        "postal_code": "50670",
        "city": "Köln",
        "country": "DE",
        "additional_info": ""
      }
    ],
    "first_name": "Martina",
    "last_name": "Crimmann",
    "salutation": "Ms. / Mrs.",
    "email": [
      {
        "_tags": ["business"],
        "email": "m.crimmann@epilot.cloud"
      }
    ],
    "phone": [
      {
        "_tags": ["business"],
        "phone": "0123456789"
      }
    ],
    "account": {
      "$relation": [
        {
          // replace with your account id
          "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",
          "_tags": []
        }
      ]
    }
  }
}
```

Make sure to take note of each returned entity `_id` property.

### Step 2: Upload Files

Next, we use the File API `uploadFile` operation together with `saveFile` to upload files and save them as File entities.

Again, make note of the file ids for later use.

Call `uploadFile` to receive an `s3ref` and `upload_url`:

```
POST https://file.sls.epilot.io/v1/files/upload
```

Upload the file with a PUT request to the `upload_url`:

```
PUT https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf?X-Amz-...
```

Pass s3ref to `saveFile`:

```
POST https://file.sls.epilot.io/v1/files/upload
```

Check out [the File API example](/docs/files/file-api#example-flow), or the example Postman collection for the full request flow example.

### Step 3: Creating an Order

We first use the [Entity Search API](/api/entity#operation/searchEntities) to fetch all configured products and their prices in epilot:

```
POST https://entity.sls.epilot.io/v1/entity:search
```

```json
{
  "q": "_schema:product",
  "size": 1000,
  "hydrate": true,
  "fields": ["_schema", "_id", "price_options"]
}
```

Taking note of product and price ids, we create an order entity by calling the [Pricing API `createOrder` operation](/api/pricing#operation/createOrder).

```
POST https://pricing-api.sls.epilot.io/v1/order
```

```json
{
  "status": "draft",
  "line_items": [
    {
      "currency": "EUR",
      "description": "string",
      "quantity": 1,
      // replace with your product id and selected price id
      "product_id": "5299d52a-f878-44ce-8bb4-3abc1ec6b7c8",
      "price_id": "707dfb87-f14b-4540-b474-933f13c7db7b"
    }
  ],
  "source_type": "Helium",
  "currency": "EUR",
  "billing_first_name": "Martina",
  "billing_last_name": "Crimmann",
  "billing_company_name": "Apple GmbH",
  "billing_email": "m.crimmann@epilot.cloud",
  "billing_phone": "0123456789",
  "billing_address": [
    {
      "_tags": ["Rechnungsadresse"],
      "street": "Im Mediapark",
      "street_number": "8a",
      "postal_code": "50670",
      "city": "Köln",
      "country": "Deutschland",
      "additional_info": ""
    }
  ],
  "delivery_address": [],
  "_tags": ["Test Bestellung"]
}
```

### Step 4: Create Opportunity

We use the [Entity API `createEntity` operation](http://localhost:3000/api/entity#operation/createEntity) to create an Opportunity entity with the correct relations.

```
POST https://entity.sls.epilot.io/v1/entity/opportunity
```

```json
{
  "customer": {
    "$relation": [
      // replace with contact and account ids
      {
        "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",
        "_tags": []
      },
      {
        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",
        "_tags": []
      }
    ]
  },
  "billing_address": {
    "$relation_ref": [
      {
        // replace with your contact id
        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",
        "path": "address",
        "relation_tag": "billing"
      }
    ]
  },
  "opportunity_title": "WEG Im Mediapark 8a",
  "description": "Dies ist eine Beschreibung.",
  "_files": {
    "$relation": [
      {
        // replace with your file ids
        "entity_id": "4509d528-efda-4a46-9284-c83a7138b790",
        "_tags": []
      }
    ]
  },
  "items": {
    "$relation": [
      {
        // replace with your order id
        "entity_id": "27260061-39b1-4905-a27a-703e68466ab7",
        "_tags": []
      }
    ]
  }
}
```

### Step 5: Start Workflow (optional)

To start a workflow, we call the Workflow API `createExecution` operation:

```
POST https://workflows-execution.sls.epilot.io/v1/workflows/executions
```

```json
{
  // replace with your configured workflow id
  "workflowId": "5SMPGoqP",
  "trigger": "AUTOMATIC",
  "assignedTo": [],
  "contexts": [
    // add the entity ids you want to display the workflow on
    {
      "id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",
      "schema": "account"
    },
    {
      "id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",
      "schema": "contact"
    },
    {
      "id": "ba9d8b53-b44b-47b3-89df-9222832c37a4",
      "schema": "opportunity"
    }
  ]
}
```

### Step 5: Create Submission (optional)

To store the raw journey submission data and possibly trigger further automations, we can also create a submission entity using the `createEntity` operation:

```
POST https://entity.sls.epilot.io/v1/entity/submission
```

```json
{
  "description": "Example Submission created via Entity API",
  "source_type": "api",
  "source_id": "", // add a source_id here in case you want to trigger automations
  "journey_data": {
    // add any raw data here
  },
  "mapped_entities": {
    "$relation": [
      // add all your entities as relations to submission
      {
        "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",
        "_tags": ["account"]
      },
      {
        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",
        "_tags": ["contact"]
      },
      {
        "entity_id": "27260061-39b1-4905-a27a-703e68466ab7",
        "_tags": ["order"]
      },
      {
        "entity_id": "ba9d8b53-b44b-47b3-89df-9222832c37a4",
        "_tags": ["opportunity"]
      }
    ]
  }
}
```
