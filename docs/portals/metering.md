---
sidebar_position: 2
---

# Metering

[[API Docs](/api/metering)]
[[SDK](https://www.npmjs.com/package/@epilot/metering-client)]

The Metering API provides a comprehensive set of functionalities for managing meters and their readings within the system. It offers endpoints for retrieving meter information, updating meter details, creating meter readings, and more. The API caters to both administrators and customers, allowing them to perform various operations related to meter management and monitoring.

- [Administrator Actions](#administrator-actions)
- [Customer Actions](#customer-actions)

## Administrator Actions

[[API Docs](/api/metering/#tag/ECP-Admin)]

As an administrator, you have privileged access to the Metering API, enabling you to perform advanced meter management tasks. You can retrieve customer meters to monitor and analyze meter data, update meter details such as type, location, and manufacturer, and retrieve detailed information about a specific meter or counter. Additionally, you can create meter readings to record values, along with relevant metadata such as the person who recorded the reading and the reason behind it. This API also provides functionality for creating multiple meter readings at once, creating readings from journey submissions, and retrieving readings within a specified interval.

## Customer Actions

[[API Docs](/api/metering/#tag/ECP)]

Customers, specifically those using the ECP (Customer Portal), have access to a tailored set of functionalities within the Metering API. Through the portal, customers can view and access information about their meters. The API allows customers to retrieve their associated meters, providing details such as meter type, location, and associated contracts. Customers can also update specific meter details when necessary. The ECP ensures a user-friendly interface for customers, allowing them to easily manage and monitor their metering information.

## Entities

- [Meter](#meter)
- [Counter](#counter)

### Meter

A meter represents a device used for measuring and recording consumption or production of a particular resource, such as electricity, water, or gas. It is associated with specific attributes such as the meter type, manufacturer, meter number, and location. The Metering API allows administrators and customers to retrieve information about meters, update their details, and perform various operations related to meter readings. The example below is the structure of how a meter entity would like.
```json
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

A counter is a component within a meter that keeps track of specific measurements or readings. Counters are typically used to record values related to different aspects of resource consumption or production. For example, in an electricity meter, counters may track energy consumption during peak and off-peak hours or differentiate between energy fed into the grid (feed-in) and consumed from the grid (feed-out). The Metering API enables customers to retrieve counter details, including the counter's ID, direction, transformer ratio, unit of measurement, and current consumption. Customers can also update counter information and retrieve readings associated with specific meters and counters. The example below is the structure of how a counter entity would like. 
```json
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
