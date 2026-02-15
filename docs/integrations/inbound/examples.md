---
sidebar_position: 6
title: Examples
description: Complete integration examples for common use cases
---

# Integration Examples

Complete, working examples for common ERP integration scenarios.

## Example 1: Customer Master Data Sync

Synchronize customer data from an ERP system into epilot contacts.

### Use Case

- Sync customer profiles from SAP
- Create or update contact entities
- Handle email and phone as repeatable fields
- Link to existing accounts

### Input Payload

```json
{
  "customerId": "C-10042",
  "salutation": "Mr",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+49 123 456789",
  "dateOfBirth": "1985-03-15",
  "address": {
    "street": "Hauptstraße 42",
    "zip": "50667",
    "city": "Köln",
    "country": "DE"
  },
  "accountId": "ACC-5001",
  "status": "active"
}
```

### Mapping Configuration

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "fields": [
        { "attribute": "customer_number", "field": "customerId" },
        { "attribute": "salutation", "field": "salutation" },
        { "attribute": "first_name", "field": "firstName" },
        { "attribute": "last_name", "field": "lastName" },
        { "attribute": "email", "field": "email", "_type": "email" },
        { "attribute": "phone", "field": "phone", "_type": "phone" },
        { "attribute": "birthdate", "field": "dateOfBirth" },
        { "attribute": "address_street", "field": "$.address.street" },
        { "attribute": "address_zip", "field": "$.address.zip" },
        { "attribute": "address_city", "field": "$.address.city" },
        { "attribute": "address_country", "field": "$.address.country" },
        {
          "attribute": "full_address",
          "jsonataExpression": "address.street & ', ' & address.zip & ' ' & address.city"
        },
        { "attribute": "source", "constant": "SAP" },
        {
          "attribute": "account",
          "relation": {
            "entity_schema": "account",
            "unique_ids": ["account_number"],
            "source_field": "accountId",
            "enabled": "$exists(accountId)"
          }
        }
      ]
    }
  ]
}
```

### API Request

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/erp/updates/events' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "meta": { "correlation_id": "customer-sync-001" },
    "events": [{
      "event_type": "UPDATE",
      "object_type": "customer",
      "timestamp": "2024-01-15T10:00:00Z",
      "format": "json",
      "payload": "{\"customerId\":\"C-10042\",\"salutation\":\"Mr\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"phone\":\"+49 123 456789\",\"dateOfBirth\":\"1985-03-15\",\"address\":{\"street\":\"Hauptstraße 42\",\"zip\":\"50667\",\"city\":\"Köln\",\"country\":\"DE\"},\"accountId\":\"ACC-5001\",\"status\":\"active\"}",
      "deduplication_id": "customer-C-10042-v1"
    }]
  }'
```

---

## Example 2: Contract with Related Entities

Synchronize contracts that link to customers and include nested meter data.

### Use Case

- Create or update contract entities
- Link to existing customer contact
- Create meters from nested array
- Establish contract-meter relationships

### Input Payload

```json
{
  "contractId": "CTR-2024-0001",
  "customerId": "C-10042",
  "contractType": "electricity",
  "startDate": "2024-02-01",
  "endDate": "2025-01-31",
  "status": "active",
  "tariff": {
    "name": "Basic Power",
    "pricePerKwh": 0.32
  },
  "meters": [
    {
      "meterId": "M-001234",
      "type": "electricity",
      "location": "Basement",
      "initialReading": 10000
    },
    {
      "meterId": "M-001235",
      "type": "electricity",
      "location": "Garage",
      "initialReading": 500
    }
  ]
}
```

### Mapping Configuration

```json
{
  "entities": [
    {
      "entity_schema": "meter",
      "jsonataExpression": "meters",
      "unique_ids": ["meter_number"],
      "fields": [
        { "attribute": "meter_number", "field": "meterId" },
        { "attribute": "type", "field": "type" },
        { "attribute": "location", "field": "location" },
        { "attribute": "initial_reading", "field": "initialReading" }
      ]
    },
    {
      "entity_schema": "contract",
      "unique_ids": ["contract_number"],
      "fields": [
        { "attribute": "contract_number", "field": "contractId" },
        { "attribute": "contract_type", "field": "contractType" },
        { "attribute": "start_date", "field": "startDate" },
        { "attribute": "end_date", "field": "endDate" },
        { "attribute": "status", "field": "status" },
        { "attribute": "tariff_name", "field": "$.tariff.name" },
        { "attribute": "price_per_kwh", "field": "$.tariff.pricePerKwh" },
        { "attribute": "source", "constant": "ERP" },
        {
          "attribute": "customer",
          "relation": {
            "entity_schema": "contact",
            "unique_ids": ["customer_number"],
            "source_field": "customerId"
          }
        },
        {
          "attribute": "meters",
          "relation": {
            "entity_schema": "meter",
            "unique_ids": ["meter_number"],
            "source_field": "meters.meterId",
            "operation": "_set"
          }
        }
      ]
    }
  ]
}
```

---

## Example 3: Bulk Meter Readings Import

Import a batch of meter readings from a scheduled ERP export.

### Use Case

- Process bulk meter reading data
- Link readings to existing meters
- Calculate consumption values
- Track import batch information

### Input Payload

```json
{
  "batchId": "READING-BATCH-2024-01-15",
  "importTimestamp": "2024-01-15T06:00:00Z",
  "source": "SAP_METER_EXPORT",
  "readings": [
    {
      "meterId": "M-001234",
      "readingDate": "2024-01-15",
      "currentValue": 12500.50,
      "previousValue": 12000.00,
      "unit": "kWh",
      "readingType": "scheduled"
    },
    {
      "meterId": "M-001235",
      "readingDate": "2024-01-15",
      "currentValue": 750.25,
      "previousValue": 500.00,
      "unit": "kWh",
      "readingType": "scheduled"
    },
    {
      "meterId": "M-002001",
      "readingDate": "2024-01-15",
      "currentValue": 1250.00,
      "previousValue": 1100.00,
      "unit": "m3",
      "readingType": "scheduled"
    }
  ]
}
```

### Mapping Configuration

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "readings",
      "meter": {
        "unique_ids": ["meter_number"]
      },
      "fields": [
        { "attribute": "meter_number", "field": "meterId" },
        { "attribute": "reading_date", "field": "readingDate" },
        { "attribute": "value", "field": "currentValue" },
        { "attribute": "previous_value", "field": "previousValue" },
        { "attribute": "unit", "field": "unit" },
        { "attribute": "reading_type", "field": "readingType" },
        {
          "attribute": "consumption",
          "jsonataExpression": "currentValue - previousValue"
        },
        { "attribute": "batch_id", "field": "$$.batchId" },
        { "attribute": "import_timestamp", "field": "$$.importTimestamp" },
        { "attribute": "source", "field": "$$.source" }
      ]
    }
  ]
}
```

---

## Example 4: Complex Business Partner with Multiple Addresses

Handle business partners with multiple address types.

### Use Case

- Sync business accounts with multiple addresses
- Map billing and shipping addresses separately
- Handle multiple contact persons

### Input Payload

```json
{
  "partnerId": "BP-50001",
  "companyName": "Mustermann GmbH",
  "vatId": "DE123456789",
  "industryCode": "D35",
  "addresses": {
    "billing": {
      "street": "Rechnungsstraße 1",
      "zip": "10115",
      "city": "Berlin",
      "country": "DE"
    },
    "shipping": {
      "street": "Lieferweg 42",
      "zip": "10117",
      "city": "Berlin",
      "country": "DE"
    }
  },
  "contacts": [
    {
      "contactId": "CON-001",
      "firstName": "Hans",
      "lastName": "Schmidt",
      "role": "CEO",
      "email": "h.schmidt@mustermann.de"
    },
    {
      "contactId": "CON-002",
      "firstName": "Anna",
      "lastName": "Müller",
      "role": "CFO",
      "email": "a.mueller@mustermann.de"
    }
  ]
}
```

### Mapping Configuration

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "jsonataExpression": "contacts",
      "unique_ids": ["contact_number"],
      "fields": [
        { "attribute": "contact_number", "field": "contactId" },
        { "attribute": "first_name", "field": "firstName" },
        { "attribute": "last_name", "field": "lastName" },
        { "attribute": "role", "field": "role" },
        { "attribute": "email", "field": "email", "_type": "email" },
        { "attribute": "source", "constant": "ERP_PARTNER" }
      ]
    },
    {
      "entity_schema": "account",
      "unique_ids": ["partner_number"],
      "fields": [
        { "attribute": "partner_number", "field": "partnerId" },
        { "attribute": "name", "field": "companyName" },
        { "attribute": "vat_id", "field": "vatId" },
        { "attribute": "industry_code", "field": "industryCode" },
        { "attribute": "billing_street", "field": "$.addresses.billing.street" },
        { "attribute": "billing_zip", "field": "$.addresses.billing.zip" },
        { "attribute": "billing_city", "field": "$.addresses.billing.city" },
        { "attribute": "billing_country", "field": "$.addresses.billing.country" },
        {
          "attribute": "billing_address",
          "jsonataExpression": "addresses.billing.street & ', ' & addresses.billing.zip & ' ' & addresses.billing.city"
        },
        { "attribute": "shipping_street", "field": "$.addresses.shipping.street" },
        { "attribute": "shipping_zip", "field": "$.addresses.shipping.zip" },
        { "attribute": "shipping_city", "field": "$.addresses.shipping.city" },
        { "attribute": "shipping_country", "field": "$.addresses.shipping.country" },
        {
          "attribute": "shipping_address",
          "jsonataExpression": "addresses.shipping.street & ', ' & addresses.shipping.zip & ' ' & addresses.shipping.city"
        },
        {
          "attribute": "contacts",
          "relation": {
            "entity_schema": "contact",
            "unique_ids": ["contact_number"],
            "source_field": "contacts.contactId",
            "operation": "_set"
          }
        }
      ]
    }
  ]
}
```

---

## Example 5: Conditional Processing

Handle different entity types based on payload conditions.

### Use Case

- Different mapping for individual vs. business customers
- Conditional field processing
- Skip entities when conditions not met

### Input Payload (Individual)

```json
{
  "customerId": "C-10043",
  "customerType": "individual",
  "firstName": "Maria",
  "lastName": "Weber",
  "email": "m.weber@email.de"
}
```

### Input Payload (Business)

```json
{
  "customerId": "C-10044",
  "customerType": "business",
  "companyName": "Weber Industries",
  "vatId": "DE987654321",
  "email": "info@weber-industries.de"
}
```

### Mapping Configuration

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": "customerType = 'individual'",
      "fields": [
        { "attribute": "customer_number", "field": "customerId" },
        { "attribute": "first_name", "field": "firstName" },
        { "attribute": "last_name", "field": "lastName" },
        { "attribute": "email", "field": "email", "_type": "email" },
        { "attribute": "customer_type", "constant": "individual" }
      ]
    },
    {
      "entity_schema": "account",
      "unique_ids": ["customer_number"],
      "enabled": "customerType = 'business'",
      "fields": [
        { "attribute": "customer_number", "field": "customerId" },
        { "attribute": "name", "field": "companyName" },
        { "attribute": "vat_id", "field": "vatId" },
        { "attribute": "email", "field": "email", "_type": "email" },
        { "attribute": "customer_type", "constant": "business" }
      ]
    }
  ]
}
```

---

## Testing with Mapping Simulation

Before deploying your mapping, test it using the simulation endpoint:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/erp/updates/mapping_simulation' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "event": {
      "event_type": "UPDATE",
      "object_type": "customer",
      "format": "json",
      "payload": "{\"customerId\":\"C-10042\",\"firstName\":\"John\",\"lastName\":\"Doe\"}"
    }
  }'
```

The simulation returns transformed entity data without persisting anything, so you can verify mappings before production use.
