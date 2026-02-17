---
title: Custom Workflow Task
hide_title: true
sidebar_position: 5
---

# Custom Workflow Action

Extend epilot's automation capabilities with custom actions that integrate seamlessly into the platform's workflow engine.

## What Are Custom Actions?

epilot provides a powerful automation engine for creating complex workflows and processes. Custom Actions are specialized components that you add to these workflows, enabling integrations and processing steps that are not available out-of-the-box. Customers install these actions to extend their automation capabilities with tailored solutions that fit their business needs.

## Why Use Custom Actions?
Custom Actions provide several key benefits:
- **Tailored Functionality**: Create specific actions that address unique business requirements
- **Seamless Integration**: Actions fit naturally into epilot's automation workflows, enhancing existing processes
- **Reusability**: Once created, actions can be reused across multiple workflows, reducing the time to set up new automations
- **Community Sharing**: Share your custom actions with the epilot community, allowing others to benefit from your innovations


## How to Create a Custom Action

## External Integration

### How To Integrate External Systems
A custom action with an external integration is basically a webhook (POST) request to your defined system. 
You can either:
1. Trigger some asynchronous processing in your system, or
2. Update epilot data with an access token built from the permission/role you can define (see [Permissions](/apps/about-apps/configure-permissions)).

The payload of the request is the following:
```json
{
  "type": "external_integration",
  "timestamp": "2022-11-03T20:26:10.344522Z",
  "data": {
    "org_id": "", // The ID of the organization that the action is executed in
    "entity": "", // The entity type that the action is executed on, e.g. "opportunity", "contact","contract", etc.
    "action_config": {},
    "app_config": {}, 
    "app_options": {}, // The options configured by the user when installing the app
    "execution_id": "",
    "execution_status": "",
    "exection_action_id": "",
    "trigger_event": "", // information about the calling event, e.g. "opportunity.created", "opportunity.updated", etc.
  }
}
```

Additionally, you will receive 4 headers specified by epilot:
```http
webhook-signature	v1a,puLZGVBm1MhSFz/kpgDsbt56DqanAAEg5Y5pgkVaz2d9WTbp6sGpo64qJFm8DWE8fo85b3cOs0CvV9v4WseUBw==
webhook-timestamp	1749649159
webhook-id	msg_245c477923600038edb96d07f9d95f77

optional: x-epilot-token: ey...
```

The `webhook-*` headers are used to verify and check the authenticity of the request. See more about [how to secure external integrations](#how-external-integrations-are-secured-asymmetric-signature) below.

The `x-epilot-token` is an access token that is generated based on the permissions and roles defined in your app configuration. This token allows you to securely access epilot data and perform actions on behalf of the user. (expires after 10 min)

### Example: Sync Data With Your Platform and Write Back to epilot Entities
To create a custom action that syncs data with your platform and writes back to epilot entities, you can follow these steps:
1. **Define the Action**: Create a new custom action in your app configuration with the type `external_integration`.
2. **Define the Permissions**: Specify the permissions required for the action to access the necessary data in epilot.

Now whenever a customer installs your App and invokes the custom action, the request will be sent to your external system with the payload described above. Your system can then process the request, perform the necessary operations (e.g., syncing data), and respond accordingly. By specifying the previous permission an access token is attached to the request. You can use that token and our [official SDK](https://github.com/epilot-dev/sdk-js) to write back to epilot entities.

### How External Integrations Are Secured (Asymmetric Signature)
To ensure that external integrations are secure, epilot uses an asymmetric signature mechanism. This involves generating a unique signature for each request that is sent to the external system. The signature is created using a private key that is known only to the epilot platform, and it is verified by the external system using a corresponding [public key](https://app.sls.epilot.io/v1/public/.well-known/public-key). This ensures that only authorized requests are processed, and it prevents unauthorized access to the external system. 

To secure the endpoint our custom action is calling, you need to verify the signature of the request. We recommend to use the `verifyEpilotSignature` function by our App SDK as it handles the verification process for you. This function checks the signature against the public key and ensures that the request is valid. We use a standard way to sign & verify the requests according to the [webhook spec](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md).