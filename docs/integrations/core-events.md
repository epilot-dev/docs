---
sidebar_position: 3
title: Core Events
---

import EventSchemaViewer from '@site/src/components/EventSchemaViewer';

# Core Events

epilot's core event catalog with built-in event schemas, examples, and schema definitions.

These events ship with epilot and are identical in every organization. To define an event on your own entity attributes, see [Custom Events](./custom-events.md).

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

### Grid

:::info Early access
The grid events are in early access and only listed for organizations that have them enabled. Contact epilot to get access.
:::

Each grid process runs on one opportunity. The `…Requested` event fires when the request is submitted; the `…Progressed` event fires at any later step the organization's automation chooses (follow-up journeys, completion, cancellation) and carries a full snapshot of the process plus its current `stage`: every workflow on the opportunity (`stage.workflows`, with status, phase and task) and the opportunity status. An opportunity often runs several workflows, so identify the grid process by its `definition_id` in `stage.workflows` and read its completion (`DONE`) or cancellation (`CLOSED`) there — the top-level workflow fields only mirror the most recently updated running workflow. Parties are delivered as `contacts` and `accounts`, with their role on the request in `relation_tags`.

<EventSchemaViewer event="GridConnectionRequested" />

<EventSchemaViewer event="GridConnectionProgressed" />

<EventSchemaViewer event="GridPlantRegistrationRequested" />

<EventSchemaViewer event="GridPlantRegistrationProgressed" />

### ERP Sync

<EventSchemaViewer event="OnDemandSyncContractRequested" />

<EventSchemaViewer event="OnDemandSyncCustomerRequested" />

### Automation

These events are triggered manually via automation.

<EventSchemaViewer event="GeneralRequestCreated" />

<EventSchemaViewer event="LocationMoveRequested" />

<EventSchemaViewer event="TerminateContractRequested" />

<EventSchemaViewer event="InvoiceSimulationRequested" />
