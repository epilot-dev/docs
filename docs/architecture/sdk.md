---
sidebar_position: 3
---

# SDK

[[GitHub](https://github.com/epilot-dev/sdk-js)]
[[NPM](https://www.npmjs.com/package/epilot-sdk)]

We provide a JavaScript / TypeScript SDK for interacting with epilot APIs.

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authenticate, authorizeClient } from 'epilot-sdk/auth';
import { getClient } from 'epilot-sdk/entity';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(credentials))

await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });
```

## SDK Packages

TODO: Some packages are not yet public

- [epilot-sdk](https://www.npmjs.com/package/epilot-sdk)
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