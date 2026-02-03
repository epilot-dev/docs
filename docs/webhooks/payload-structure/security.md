---
sidebar_position: 3
title: "Security"
---

## API Key

API Key authentication allows you to secure your webhook endpoint by requiring a secret key to be included in the request headers. When configuring your webhook, you can specify an API key that epilot will send with each request.

The API key is typically sent in the `X-API-Key` header. Your endpoint should validate this key before processing any webhook payload to ensure the request originates from epilot.

## Basic Auth (Username + Password)

Basic Authentication provides a simple way to secure your webhook endpoint using a username and password combination. When configured, epilot encodes the credentials using Base64 and includes them in the `Authorization` header with the `Basic` scheme.

Your server should decode and validate these credentials before accepting the webhook payload. This method is widely supported and easy to implement, though it should always be used over HTTPS to prevent credential exposure.

## OAuth

OAuth authentication enables secure, token-based access to your webhook endpoints. This method is particularly useful when integrating with systems that already use OAuth for authentication.

When configured with OAuth, epilot will obtain an access token from your authorization server and include it in the `Authorization` header with the `Bearer` scheme. This approach provides enhanced security through token expiration and refresh mechanisms.


### How Webhooks Are Further Secured (Asymmetric Signature)
To ensure that webhook requests are secure, epilot uses an asymmetric signature mechanism. This involves generating a unique signature for each request that is sent to the external system. The signature is created using a private key that is known only to the epilot platform, and it is verified by the external system using a corresponding [public key](https://webhooks.sls.epilot.io/v1/.well-known/public-key). This ensures that only authorized requests are processed, and it prevents unauthorized access to the external system. 

To secure the endpoint our webhook is calling, you need to verify the signature of the request. We recommend to use the `verifyEpilotSignature` function by our App SDK as it handles the verification process for you. This function checks the signature against the public key and ensures that the request is valid. We use a standard way to sign & verify the requests according to the [webhook spec](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md).
