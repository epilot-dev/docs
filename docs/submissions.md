---
sidebar_position: 7
---

# Submissions

[[API Docs](/api/submission)]

Submissions are entities that store raw data collected from Journeys or other outside data sources into epilot.

Submissions are created via the public [Submission API](/api/submission).

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
