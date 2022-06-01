---
sidebar_position: 7
---

# Submissions

[[API Docs](/api/submission)]
[[SDK](https://www.npmjs.com/package/@epilot/submission-client)]

Submissions are entities that store raw data collected from Journeys or other outside data sources into epilot.

Submissions are created via the public [Submission API](/api/submission).

## Submission API

The Submission API can be used by external journeys to create Submission entities.

See [[Submission API Docs](/api/submission)] for examples.

## Passing Files

Submission API can be used together with [File API](https://docs.epilot.io/api/file) to pass file uploads to submissions using the following flow:

Use the `uploadFile` or `uploadFilePublic` operation of File API to generate a temporary upload URL and receive an s3ref:

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

After the file has uploaded, pass the `s3ref` in the `entities.*.files` attribute in your Submission API payload:

```
POST https://submission.sls.epilot.io/v1/submission/submissions
```

Request Body:
```json
// application/json
{ 
  "organization_id": "123",
  "source_type": "api",
  "source_id": "example",
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


## Submission Schema

A Submission entity does not have a fixed schema for all its data like other business entities, but rather is designed to collect the raw JSON payload to be further processed in other entities.

A typical use of submissions is to map the incoming submission payload into further business entities like Contacts, Opportunities and Orders using [Automation](/docs/automation/automation-flows).

A standard Submission has the following two Attributes:

- **Source**
  - Links to the source of the submission
- **Entities**
  - Mapped entity relations

![](../static/img/submission.png)

## Example Submission Payload

```json
// example submission from a journey
{
  "steps": [
    {
      "Produktauswahl": {
        "product": {
          "selectedProductId": "a457da80-7ef1-4b4b-8373-f2baf2731317",
          "selectedPriceId": "d091655d-a241-42d7-9adc-2195b9b1de04",
          "selectionMetadata": {
            "selectedProduct": {
              "_id": "a457da80-7ef1-4b4b-8373-f2baf2731317",
              "_schema": "product",
              "name": "Walbox New",
              "code": "WN",
              "vendor": "WN",
              "labels": [
                "sale"
              ],
              "priceOptions": {
                "$relation": []
              },
              "_org": "66",
              "_updated_at": "2022-01-04T20:26:00.571Z",
              "_title": "Walbox New",
              "price_options": {
                "$relation": [
                  {
                    "entity_id": "d091655d-a241-42d7-9adc-2195b9b1de04"
                  }
                ]
              }
            },
            "selectedPrice": {
              "_id": "d091655d-a241-42d7-9adc-2195b9b1de04",
              "unit_amount": 100000,
              "unit_amount_currency": "EUR",
              "unit_amount_decimal": "1000",
              "sales_tax": "standard",
              "tax_behavior": "inclusive",
              "price_display_in_journeys": "show_price",
              "type": "one_time",
              "description": "test price",
              "active": true,
              "_schema": "price",
              "_org": "66",
              "_created_at": "2022-01-04T20:25:54.389Z",
              "_updated_at": "2022-01-04T20:25:54.389Z",
              "billing_period": "weekly",
              "billing_duration_unit": "months",
              "notice_time_unit": "months",
              "termination_time_unit": "months",
              "renewal_duration_unit": "months",
              "_title": "test price"
            }
          },
          "productName": "Walbox New",
          "prices": [
            {
              "price": 1000,
              "priceCurrency": "€",
              "title": "Einmalig",
              "interval": "one_time"
            }
          ],
          "productFeatures": [],
          "collapsedDetails": true,
          "id": "a457da80-7ef1-4b4b-8373-f2baf2731317||d091655d-a241-42d7-9adc-2195b9b1de04"
        },
        "quantity": 1
      }
    },
    {
      "Persönliche Informationen": {
        "customerType": "Private",
        "salutation": "Herr",
        "title": "Dr.",
        "firstName": "Viljami",
        "lastName": "Kuosmanen",
        "email": "v.kuosmanen@epilot.cloud",
        "telephone": "0101010101"
      },
      "Adresse": {
        "countryCode": "de",
        "zipCode": "50668",
        "city": "Köln",
        "streetName": "Example Str.",
        "houseNumber": "11"
      }
    },
    {
      "Zusätzliche Dokumente": [
        {
          "file_name": "cool-cat.jpeg",
          "file_size": 80430,
          "original_name": "cool-cat.jpeg",
          "file_type": "jpeg",
          "s3ref": {
            "bucket": "epilot-prod-user-content",
            "key": "66/temp/2ec73b47-fe8b-4cc2-a0f4-81d2fb549f38/cool-cat.jpeg"
          }
        }
      ],
      "Zahlungsmethoden": {
        "type": "BankTransfer"
      }
    },
    {
      "Einwilligungen & Bestellung": {
        "first_consent": true,
        "second_consent": true
      }
    },
    {}
  ],
  "order_number": "ORN5513gA",
  "order_id": "4e357016-83b0-43a8-a64e-c47cf8367d34",
  "source_type": "journey",
  "source_id": "d32ee890-73be-11ec-ab85-6950938ffb7d"
}
```
