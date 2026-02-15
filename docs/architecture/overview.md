---
sidebar_position: 1
---

# Introduction to epilot

:::info

_epilot_ is a multi-tenant SaaS platform for energy suppliers, municipal utilities, grid operators, and solution providers. It provides a 360° energy XRM (extended relationship management) to digitize sales, service, and grid processes end-to-end.

[What is an energy XRM?](https://www.epilot.cloud/en/blog/what-is-an-energy-xrm)

:::

## Overview

The epilot application consists of:

- [The epilot portal](/docs/portal/microfrontends) — single-spa micro-frontend SPA
- [Embeddable Journey Frontends](/docs/journeys/journey-builder) — customer-facing forms and flows
- [Customer & Installer Portals](/docs/portals/customer-portal) — self-service portals
- Serverless microservices with [public APIs](/api)

## Tech Stack

### Languages

| | |
|---|---|
| **TypeScript** | Primary language for frontend and backend |
| **Python** | Used in select backend services |

### Frontend

| Technology | Role |
|---|---|
| [React](https://react.dev/) | Main UI framework |
| [Svelte](https://svelte.dev/) | Used in select micro-frontends |
| [single-spa](https://single-spa.js.org/) | Micro-frontend orchestration for the epilot portal |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Volt UI](https://www.npmjs.com/package/@epilot/volt-ui) | epilot design system (React and Svelte) |
| [Capacitor](https://capacitorjs.com/) | Hybrid native runtime for [portal mobile apps](/docs/portals/mobile-app) |
| [Axios](https://axios-http.com/) / [openapi-client-axios](https://www.npmjs.com/package/openapi-client-axios) | HTTP client with OpenAPI type generation |

### Backend

| Technology | Role |
|---|---|
| [AWS Lambda](https://aws.amazon.com/lambda/) | Serverless compute for all microservices |
| [API Gateway](https://aws.amazon.com/api-gateway/) (HTTP API) | API routing and authorization |
| [Step Functions](https://aws.amazon.com/step-functions/) | Workflow orchestration |
| [EventBridge](https://aws.amazon.com/eventbridge/) | Event-driven communication between services |
| [S3](https://aws.amazon.com/s3/) | File and object storage |
| [SQS](https://aws.amazon.com/sqs/) | Message queuing |
| [openapi-backend](https://www.npmjs.com/package/openapi-backend) | OpenAPI-first request handling |
| [Zod](https://zod.dev/) | Runtime schema validation |

### Databases

| Technology | Role |
|---|---|
| [DynamoDB](https://aws.amazon.com/dynamodb/) | General-purpose data store for microservices |
| [Elastic Cloud](https://www.elastic.co/cloud) | Full-text search and indexing for business entities |
| [ClickHouse Cloud](https://clickhouse.com/) | Analytical queries, [Datalake](/docs/datalake/epilot-datalake), workflow data, audit logs |
| [Momento](https://www.gomomento.com/) | Caching |

See the [Tech Radar](https://docs.epilot.io/techradar/) for the full technology landscape.

## System Architecture Diagram

[![System Architecture Diagram](../../static/img/system-architecture.jpg)](../../static/img/system-architecture.jpg)
