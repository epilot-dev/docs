---
sidebar_position: 1
title: Core Events
---

import EventSchemaViewer from '@site/src/components/EventSchemaViewer';

# Core Events

This page provides an overview of epilot's core event catalog with all of the built-in event schemas, including examples and schema definitions.

## Event Architecture

Events in epilot follow a consistent structure with common metadata fields and event-specific payloads. Each event may include hydrated entity data from the entity graph.

### Common Event Fields

All events include these standard fields:

- `_org_id`: epilot tenant/organization ID
- `_event_time`: ISO 8601 timestamp when event occurred
- `_event_id`: Unique event identifier (ULID)
- `_event_name`: Event name from catalog
- `_event_version`: Schema version number
- `_event_source`: Source that triggered the event

## Built-in Event Schemas

### Metering

<EventSchemaViewer event="MeterReadingAdded" />

### Billing

<EventSchemaViewer event="InstallmentUpdated" />

<EventSchemaViewer event="PaymentMethodUpdated" />

<EventSchemaViewer event="BillingAddressUpdated" />

<EventSchemaViewer event="BillingAccountConnectionRemoved" />

### Customer

<EventSchemaViewer event="CustomerDetailsUpdated" />

### Tickets

<EventSchemaViewer event="GeneralRequestCreated" />

<EventSchemaViewer event="LocationMoveRequested" />

<EventSchemaViewer event="TerminateContractRequested" />
