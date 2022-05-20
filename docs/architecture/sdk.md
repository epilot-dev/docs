---
sidebar_position: 3
---

# SDK

[[GitHub](https://github.com/epilot-dev/sdk-js)]
[[NPM](https://www.npmjs.com/package/epilot-sdk)]

We provide a JavaScript / TypeScript SDK library for developers interacting with epilot APIs.

## Getting Started

Install the SDK

```sh
npm install --save epilot-sdk
```

Authenticate and call epilot APIs:

```typescript
import { authenticate } from 'epilot-sdk/auth';
import entityClient from 'epilot-sdk/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});
credentials.configureClient(entityClient);

await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });
```

## Importing

The full SDK library is available both as a single package [`epilot-sdk`](https://www.npmjs.com/package/epilot-sdk) and as separate dependencies:

```typescript
import entityClient from 'epilot-sdk/entity-client' // recommended way
import { getClient } from '@epilot/entity-client' // granular way
```

## SDK Packages

> TODO: some packages are still private

- [@epilot/auth](https://www.npmjs.com/package/@epilot/auth)
- [@epilot/entity-client](https://www.npmjs.com/package/@epilot/entity-client)
- [@epilot/user-client](https://www.npmjs.com/package/@epilot/user-client)
- [@epilot/organization-client](https://www.npmjs.com/package/@epilot/organization-client)
- [@epilot/submission-client](https://www.npmjs.com/package/@epilot/submission-client)
- [@epilot/pricing-client](https://www.npmjs.com/package/@epilot/pricing-client)
- [@epilot/file-client](https://www.npmjs.com/package/@epilot/file-client)
- [@epilot/document-client](https://www.npmjs.com/package/@epilot/document-client)
- [@epilot/automation-client](https://www.npmjs.com/package/@epilot/automation-client)
- [@epilot/message-client](https://www.npmjs.com/package/@epilot/message-client)
- [@epilot/notification-client](https://www.npmjs.com/package/@epilot/notification-client)
- [@epilot/template-variables-client](https://www.npmjs.com/package/@epilot/template-variables-client)
- [@epilot/workflows-definition-client](https://www.npmjs.com/package/@epilot/workflows-definition-client)
- [@epilot/workflows-execution-client](https://www.npmjs.com/package/@epilot/workflows-execution-client)
- [@epilot/design-builder-api-client](https://www.npmjs.com/package/@epilot/design-builder-api-client)
- [@epilot/customer-portal-client](https://www.npmjs.com/package/@epilot-sdk/customer-portal-client)
- [@epilot/workflow-client](https://www.npmjs.com/package/@epilot-sdk/workflow-client)
