---
sidebar_position: 3
title: Core Events
---

import EventSchemaViewer from '@site/src/components/EventSchemaViewer';

# Core Events

epilot's core event catalog with built-in event schemas, examples, and schema definitions.

## Event Architecture

Events follow a consistent structure with common metadata fields and event-specific payloads. Each event may include hydrated entity data from the entity graph.

### Common Event Fields

All events include these fields:

- `_org_id`: epilot tenant/organization ID
- `_event_time`: ISO 8601 timestamp when event occurred
- `_event_id`: Unique event identifier (ULID)
- `_event_name`: Event name from catalog
- `_event_version`: Schema version number
- `_event_source`: Source that triggered the event

## Built-in Event Schemas

### Metering

<EventSchemaViewer event="MeterReadingAdded" />

### Customer

<EventSchemaViewer event="CustomerDetailsUpdated" />

### Billing Account

<EventSchemaViewer event="InstallmentUpdated" />

<EventSchemaViewer event="PaymentMethodUpdated" />

<EventSchemaViewer event="BillingAddressUpdated" />

### Automation

These events are triggered manually via automation.

<EventSchemaViewer event="GeneralRequestCreated" />

<EventSchemaViewer event="LocationMoveRequested" />

<EventSchemaViewer event="TerminateContractRequested" />

<EventSchemaViewer event="BillingAccountConnectionRemoved" />

<EventSchemaViewer event="ServiceMeterReadingAdded" />