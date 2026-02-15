---
sidebar_position: 3
---

# Metering

[[API Docs](/api/metering)]
[[SDK](https://www.npmjs.com/package/@epilot/metering-client)]

The Metering API manages meters and their readings. It provides endpoints for retrieving meter information, updating meter details, creating readings, and querying reading history. Both administrators and portal end-users have access, with different permission scopes.

- [Administrator Actions](#administrator-actions)
- [Customer Actions](#customer-actions)

## Administrator Actions

[[API Docs](/api/metering/#tag/ECP-Admin)]

Administrators have full access to meter management:

- Retrieve and monitor customer meters
- Update meter details (type, location, manufacturer)
- View specific meter or counter information
- Create individual or bulk meter readings with metadata (recorder, reason)
- Create readings from journey submissions
- Query readings within a specified interval

## Customer Actions

[[API Docs](/api/metering/#tag/ECP)]

Portal end-users (Customer Portal) access a scoped subset of metering functionality:

- View their associated meters with details (type, location, linked contracts)
- Update specific meter details where permitted
- Submit meter readings through the portal interface

## Entities

- [Meter](#meter)
- [Counter](#counter)

### Meter

A meter represents a device that measures consumption or production of a resource (electricity, water, gas). It carries attributes like meter type, manufacturer, meter number, and location.

```json title="Meter entity example"
{
    "_id": "string",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": [
    "example",
    "mock"
    ],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "meter",
    "ma_lo_id": "A09-123",
    "meter_type": "three-phase-meter",
    "tariff_type": "Peak load tariff",
    "meter_number": "J-1093-1AK",
    "sector": "power",
    "location": [
    {
        "country": "Germany",
        "city": "Koln",
        "postal_code": 81475,
        "street": "Melatengürtel",
        "street_number": 71,
        "additional_info": "5. Etage",
        "_tags": [
        "billing",
        "delivery"
        ]
    }
    ],
    "used_for": "Domestic Usage",
    "manufacturer": "Energy One",
    "calibration_date": "2022-10-10T00:00:00.000Z",
    "contract": {
    "$relation": [
        {
        "entity_id": "9a2081a2-1615-44b8-b988-d757983290dd",
        "_slug": "contact"
        }
    ]
    },
    "customer": {
    "$relation": [
        {
        "entity_id": "9a2081a2-1615-44b8-b988-d757983290dd",
        "_slug": "contact"
        }
    ]
    }
}
```
### Counter

A counter is a component within a meter that tracks a specific measurement. For example, an electricity meter may have counters for peak/off-peak consumption, or for feed-in vs. feed-out energy. Counter attributes include direction, transformer ratio, unit, and current consumption.

```json title="Counter entity example"
{
    "_id": "991a1821-43bc-46b8-967d-64a3d87c31f8",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": [
    "example",
    "mock"
    ],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "meter_counter",
    "obis_number": "A-34",
    "direction": "feed-in",
    "transformer_ratio": 70,
    "unit": "w",
    "forecast_reading_value": "270",
    "forecast_as_of": "2022-12-10T00:00:00.000Z",
    "current_consumption": 240,
    "last_reading": "2022-10-10T00:00:00.000Z",
    "conversion_factor": 3,
    "tariff_type": "ht"
}
```
