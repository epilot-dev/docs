---
sidebar_position: 1
---

# Authentication

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) for user authentication.

## Quick Start

To obtain OAuth tokens, the user should initiate authentication using their user pool details.

```sh
# TODO: Provide an example for this using the epilot SDK
```

## Cognito User Pools

Each tenant organisation in epilot has their own Cognito user pool backend and OAuth configuration to provide login and 3rd party Single Sign-On.

## User API

The epilot user API provides functionality to invite and manage users in epilot organisations.

The Cognito sync service part of the User API takes care of managing users in each User Pool.