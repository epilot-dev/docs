---
sidebar_position: 4
---

# Serverless

The epilot backend is built using serverless technology. This means we favour the usage of managed 3rd party services to build our features.

We chose this approach to speed up our development by leveraging off-the-shelf components to build our software and avoid having to maintain and operate our own cloud infrastructure.

The majority of backend microservices are built using serverless AWS services such as Lambda, Step Functions, API Gateway, S3, DynamoDB and EventBridge.

## Boilerplate Projects

We offer internal boilerplate (cookie-cutter) projects to bootstrap serverless backend projects on popular frameworks and get started quickly:

- [AWS SAM](https://gitlab.com/e-pilot/platform/cookie-cutter/ts-sam)
- [AWS CDK](https://gitlab.com/e-pilot/platform/cookie-cutter/ts-cdk-react-standalone)
- [SLS Framework](https://gitlab.com/e-pilot/platform/cookie-cutter/ts-serverless)
- [Fargate](https://gitlab.com/e-pilot/platform/cookie-cutter/docker-fargate)

## Event Driven Architecture

TODO