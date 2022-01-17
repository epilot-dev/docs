---
sidebar_position: 6
---

# Using CDK inside Epilot

Most of our constructs are provided in our package `@epilot/cdk-constructs`. Check it out! Install it right now from [NPM](https://www.npmjs.com/package/@epilot/cdk-constructs)

### Http OpenAPI definition

Are you using `OpenAPI` to design and build your API? Great we have you from here. You write lambda functions and write them up with your Specification and `HttpOpenApi` will do the rest. This creates for you an API Gateway V2 with all the necessary proxy configuration.

```typescript
const api = new HttpOpenApi(this, 'MyApi', {
    serviceName: 'my-service',
    openApiSpec: './openapi.yml',
    lambdasSourcePath: './dist/src' // optional. It defaults to './.build/src'
    integrations: [
        {
            operationId: 'getEntity', // found in openapi.yml
            handler: 'api.getEntity' // file.method to handle the request
        },
        {
            operationId: 'storeEntity',
            handler: 'api.storeEntity'
        }
    ]
})
```

Want an custom domain? Here is a example how we are using it.

```typescript
// we use this simple statement to check if we want a custom damain for a stage or not
if (domain.CUSTOM_DOMAIN_ENABLED) {
  api.enableCustomDomain(domain.CUSTOM_DOMAIN_NAME, domain.CUSTOM_DOMAIN_CERTIFICATE_ARN, domain.HOSTED_ZONE_NAME);
}
```
