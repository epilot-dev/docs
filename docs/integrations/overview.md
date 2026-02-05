---
sidebar_position: 1
title: Overview
description: Introduction to the ERP Toolkit for integrating ERP systems with epilot
---

# Integrations

The heart of every integration from and into epilot is the ERP Toolkit. It enables seamless bi-directional data synchronization between your ERP system and the epilot platform. It provides a robust, event-driven architecture for managing customer data, contracts, meters, and other business entities across systems.

## What is the ERP Toolkit?

The ERP Toolkit is an integration layer that:

- **Transforms data** from ERP-specific formats into epilot entities
- **Synchronizes entities** bi-directionally between systems
- **Tracks changes** with full audit trails and monitoring
- **Handles complexity** of entity relationships and dependencies

## Integration Directions

### Inbound (ERP to epilot)

Transfer data from your ERP system into epilot. Common use cases include:

- Synchronizing customer master data (contacts, accounts)
- Importing contracts and subscriptions
- Loading meter readings and consumption data
- Updating billing information

[Learn more about Inbound Integration](./inbound/getting-started)

### Outbound (epilot to ERP)

Transfer data from epilot back to your ERP system. Common use cases include:

- Sending new customer registrations
- Exporting contract changes
- Triggering billing processes

:::note
Outbound integration documentation is coming soon.
:::

## Key Concepts

### Integrations

An **Integration** represents a connection to an external ERP system. Each integration contains:

- Unique identifier and name
- One or more **Use Cases** defining specific data flows
- Configuration for authentication and endpoints

### Use Cases

A **Use Case** defines a specific data synchronization scenario within an integration:

| Property | Description |
|----------|-------------|
| `type` | Either `inbound` or `outbound` |
| `enabled` | Toggle to activate/deactivate |
| `configuration` | Mapping rules and transformation logic |

### Mapping

Mappings define how ERP data transforms into epilot entities:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "mode": "upsert",
      "fields": [
        { "attribute": "first_name", "field": "firstName" },
        { "attribute": "last_name", "field": "lastName" }
      ]
    }
  ]
}
```

The `mode` field controls the operation: `upsert` (default), `delete`, `purge`, or prune-scope variants for synchronizing collections. See [Mapping](./inbound/mapping#operation-modes) for details.

## Architecture

![ERP Toolkit Integration Architecture](/img/integrations/overview.svg)

## Integration Patterns

There are two primary patterns for integrating your ERP system with epilot: **Pull-based (Delta Sync)** and **Event-driven**. The right choice depends on your ERP system's capabilities and data transformation requirements.

![Pull vs Event-Driven Integration Patterns](/img/integrations/pull-vs-event-driven.svg)

### Event-Driven (Direct Integration)

In an event-driven approach, your ERP system sends events directly to the ERP Toolkit whenever data changes.

**When to use:**
- Your ERP system supports webhooks or can send HTTP requests on data changes
- Data can be sent in the format expected by the ERP Toolkit (JSON)
- No complex transformations or validations are required beyond what the mapping configuration supports

**Advantages:**
- Real-time or near-real-time synchronization
- No additional infrastructure required
- Simpler architecture with fewer moving parts

### Pull-Based (Delta Sync with Middleware)

In a pull-based approach, a middleware layer periodically queries your ERP system for changes and pushes them to the ERP Toolkit.

**When to use:**
- Your ERP system cannot send webhooks or events
- Complex data transformations are required before sending to epilot
- Business logic or validations must be applied during synchronization
- Data from multiple ERP endpoints needs to be aggregated
- You need to implement retry logic or handle ERP-specific rate limits

**Advantages:**
- Works with any ERP system, regardless of webhook support
- Full control over transformation and validation logic
- Can implement custom batching and scheduling strategies
- Enables delta sync patterns (only sync changed records)

### Choosing the Right Pattern

| Requirement | Event-Driven | Pull-Based |
|-------------|--------------|------------|
| ERP supports webhooks | ✅ Required | Not required |
| Real-time sync needed | ✅ Best fit | Depends on polling interval |
| Complex transformations | Limited to mapping config | ✅ Full flexibility |
| Custom validation logic | Limited | ✅ Full flexibility |
| Aggregating multiple sources | Not supported | ✅ Supported |
| Minimal infrastructure | ✅ Best fit | Requires middleware |

:::tip
Many integrations use a **hybrid approach**: event-driven for simple, real-time updates (like contact changes) and pull-based for complex scenarios (like aggregating invoice data from multiple systems).
:::

## Getting Started

1. **Create an Integration** - Set up a new integration in epilot
2. **Configure Use Cases** - Define your data flows and mappings
3. **Send Events** - Push data from your ERP system
4. **Monitor** - Track synchronization status and errors

Continue to the [Inbound Integration Guide](./inbound/getting-started) for detailed setup instructions.

## Configuration

Learn how to configure integrations, use cases, and mappings in the [Configuration Guide](./configuration).
