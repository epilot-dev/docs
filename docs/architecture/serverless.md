---
sidebar_position: 5
---

# Serverless

:::info
epilot runs on serverless architecture: fully managed, self-scaling cloud services instead of self-managed containers or virtual machines.
:::

## Why Serverless?

Serverless lets the team ship faster with off-the-shelf components and zero infrastructure management overhead.

Principle: [Rent over build](https://github.com/epilot-dev/engineering-principles#rent-over-build-we-rent-the-necessary-and-focus-on-building-the-important)

## Technologies

Most backend microservices run on AWS Lambda, Step Functions, API Gateway, DynamoDB, S3, and EventBridge.

epilot also uses [ClickHouse Cloud](https://clickhouse.com/) for the [Datalake](/docs/datalake/epilot-datalake), analytical queries, and complex SQL workloads.

Notable third-party services: Elastic Cloud (search), Momento (caching), and Datadog (observability).

See the [Tech Radar](https://docs.epilot.io/techradar/) for the full technology landscape.

