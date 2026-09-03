---
sidebar_position: 3
title: Core Events
---

import EventSchemaViewer from '@site/src/components/EventSchemaViewer';

# Core Events

epilot's core event catalog with built-in event schemas, examples, and schema definitions.

See the [API Changelog](/api/changelog) for the full history of additions and changes to core events and APIs.

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

### Event Consumers

Published events can be consumed in several ways:

- **[Webhooks](/docs/integrations/webhooks)** -- deliver the event payload to an external system over HTTP
- **[Automations](/docs/automation/event-catalog-trigger)** -- start an Automation Flow inside epilot with the event payload as context
- **[Integration Toolkit](/docs/integrations/integration-toolkit/overview)** -- deliver events to ERPs through [Pollable Outbound](/docs/integrations/integration-toolkit/pollable-outbound) or [Outbound File Delivery](/docs/integrations/integration-toolkit/outbound-file-delivery)

## Starting Automations from Events

Any enabled event can start an [Automation Flow](/docs/automation/automation-flows) through the **Event Catalog event** trigger. The flow runs in the context of one entity from the event's entity graph (for example the `ticket` of a `CustomerRequestSubmitted` event), and the complete event payload is available to trigger conditions, action conditions, email and document templates, and webhook payloads as the `event` variable.

The trigger is pinned to an event version, so newer published versions are downgraded before the flow sees them, and loops are prevented by an automation chain carried on every event an automation causes, plus a default switch that ignores events published by the **Trigger Event** action of other automations.

See [Event Catalog Trigger](/docs/automation/event-catalog-trigger) for configuration, variables, and loop prevention.

## Built-in Event Schemas

### Metering

<EventSchemaViewer event="MeterReadingAdded" />

<EventSchemaViewer event="ServiceMeterReadingAdded" />

### Customer

<EventSchemaViewer event="CustomerRequestSubmitted" />

<EventSchemaViewer event="CustomerDetailsUpdated" />

### Billing Account

<EventSchemaViewer event="InstallmentUpdated" />

<EventSchemaViewer event="ServiceInstallmentChange" />

<EventSchemaViewer event="PaymentMethodUpdated" />

<EventSchemaViewer event="BillingAddressUpdated" />

<EventSchemaViewer event="BillingAccountConnectionRemoved" />

### Files

<EventSchemaViewer event="FileCreated" />

### Orders & Tariffs

<EventSchemaViewer event="OrderSubmission" />

<EventSchemaViewer event="TariffChange" />

### ERP Sync

<EventSchemaViewer event="OnDemandSyncContractRequested" />

<EventSchemaViewer event="OnDemandSyncCustomerRequested" />

### Automation

These events are triggered manually via automation.

<EventSchemaViewer event="GeneralRequestCreated" />

<EventSchemaViewer event="LocationMoveRequested" />

<EventSchemaViewer event="TerminateContractRequested" />

<EventSchemaViewer event="InvoiceSimulationRequested" />
