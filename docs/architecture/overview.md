---
sidebar_position: 1
---

# Introduction to epilot

:::info

_epilot_ is a multi-tenant SaaS platform for collaborative ecommerce.

Our tenants sell complex products online and collaborate with partners to deliver great ecommerce experiences to their end customers.

:::

## Overview

The epilot application consists of:

- [The 360 portal app](/docs/portal/microfrontends)
- [Embeddable journey frontends](/docs/journeys/journey-builder)
- End customer portal app
- Serverless microservices with [APIs](/api)
- Internal admin area

## Tech Stack

The portal frontend is a single-page web application (SPA) hosted on AWS CloudFront consisting of frontend microservices orchestrated by the [single-spa](https://single-spa.js.org/) framework.

Most of our frontend codebase is written in React and Typescript but other frameworks such as Svelte are also used in parts of the application.

The epilot application backend consists of serverless microservices written mostly in Typescript and Python leveraging serverless AWS services such as Lambda, Step Functions, API Gateway, S3, DynamoDB, EventBridge.

![Tech Stack](../../static/img/epilot-tech-stack.png)

Check out our [Tech Radar](https://docs.epilot.io/techradar/) for a more detailed view of our tech stack!
