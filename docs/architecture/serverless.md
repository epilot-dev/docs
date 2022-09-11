---
sidebar_position: 4
---

# Serverless

:::info

The epilot platform is built on serverless architecture. In practice this means we favour the usage of fully managed, self-scaling 3rd party cloud services over self-managed containers or virtual machines.

:::

## Why Serverless?

We choose this approach to maintain development speed by leveraging off-the-shelf components and avoid the operational cost of having to maintain and operate our own cloud infrastructure.

Principle: [Rent over build](https://github.com/epilot-dev/engineering-principles#rent-over-build-we-rent-the-necessary-and-focus-on-building-the-important)

## Serverless technologies used

The majority of backend microservices are built using serverless AWS services such as Lambda, Step Functions, API Gateway, DynamoDB, S3 and EventBridge.

We also utilise Fargate for of serverless containers and Redshift Serverless + Firehose for our data lake on S3.

Other notable 3rd party cloud services we use include Elastic Cloud for search, Datadog for observability and GitLab for CI, feature flags and package registry.

See our [Tech Radar](/techradar) for more info on the serverless technologies we use.

## Boilerplate Projects

We offer internal boilerplate projects to bootstrap projects on popular frameworks and get started quickly:

- [create-mfe-app](https://gitlab.com/e-pilot/product/360-portal/epilot360-dev-utils/-/tree/main/packages/create-mfe-app)
- [AWS SAM](https://gitlab.com/e-pilot/platform/cookie-cutter/ts-sam)
- [AWS CDK](https://gitlab.com/e-pilot/platform/cookie-cutter/ts-cdk)
- [Fargate](https://gitlab.com/e-pilot/platform/cookie-cutter/docker-fargate)
