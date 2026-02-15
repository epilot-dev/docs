---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SDK

[[GitHub](https://github.com/epilot-dev/sdk-js)]

:::tip
Every epilot API ships with a typed TypeScript client — full types and IntelliSense out of the box.
:::

## Getting Started

Install the client for the API you need:

<Tabs>
  <TabItem value="npm" label="npm" default>

```sh title="Install"
npm install --save @epilot/entity-client
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```sh title="Install"
yarn add @epilot/entity-client
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```sh title="Install"
pnpm add @epilot/entity-client
```

  </TabItem>
</Tabs>

Authorize with an [Access Token](/docs/auth/access-tokens) and call an API:

```typescript title="Create a contact entity"
import { getClient } from '@epilot/entity-client';

const entityClient = getClient();
entityClient.defaults.headers['Authorization'] = 'Bearer <your-access-token>';

await entityClient.createEntity('contact', {
  first_name: 'Example',
  last_name: 'Contact',
});
```

## Available Clients

All clients are published on npm under the `@epilot` scope and listed on GitHub: [epilot-dev/sdk-js/clients](https://github.com/epilot-dev/sdk-js/tree/main/clients)

| Package | API Docs |
|---|---|
| [`@epilot/access-token-client`](https://www.npmjs.com/package/@epilot/access-token-client) | [Access Token API](/api/access-token) |
| [`@epilot/address-suggestions-client`](https://www.npmjs.com/package/@epilot/address-suggestions-client) | [Address Suggestions API](/api/address-suggestions) |
| [`@epilot/app-client`](https://www.npmjs.com/package/@epilot/app-client) | [App API](/api/app) |
| [`@epilot/automation-client`](https://www.npmjs.com/package/@epilot/automation-client) | [Automation API](/api/automation) |
| [`@epilot/billing-client`](https://www.npmjs.com/package/@epilot/billing-client) | [Billing API](/api/billing) |
| [`@epilot/blueprint-manifest-client`](https://www.npmjs.com/package/@epilot/blueprint-manifest-client) | [Blueprint Manifest API](/api/blueprints) |
| [`@epilot/consent-client`](https://www.npmjs.com/package/@epilot/consent-client) | [Consent API](/api/consent) |
| [`@epilot/customer-portal-client`](https://www.npmjs.com/package/@epilot/customer-portal-client) | [Portal API](/api/customer-portal) |
| [`@epilot/design-client`](https://www.npmjs.com/package/@epilot/design-client) | [Design API](/api/design) |
| [`@epilot/document-client`](https://www.npmjs.com/package/@epilot/document-client) | [Document API](/api/document) |
| [`@epilot/email-settings-client`](https://www.npmjs.com/package/@epilot/email-settings-client) | [Email Settings API](/api/email-settings) |
| [`@epilot/email-template-client`](https://www.npmjs.com/package/@epilot/email-template-client) | [Email Template API](/api/email-template) |
| [`@epilot/entity-client`](https://www.npmjs.com/package/@epilot/entity-client) | [Entity API](/api/entity) |
| [`@epilot/entity-mapping-client`](https://www.npmjs.com/package/@epilot/entity-mapping-client) | [Entity Mapping API](/api/entity-mapping) |
| [`@epilot/erp-integration-client`](https://www.npmjs.com/package/@epilot/erp-integration-client) | [ERP Integration API](/api/erp-integration) |
| [`@epilot/file-client`](https://www.npmjs.com/package/@epilot/file-client) | [File API](/api/file) |
| [`@epilot/journey-client`](https://www.npmjs.com/package/@epilot/journey-client) | [Journey API](/api/journey) |
| [`@epilot/kanban-client`](https://www.npmjs.com/package/@epilot/kanban-client) | [Kanban API](/api/kanban) |
| [`@epilot/message-client`](https://www.npmjs.com/package/@epilot/message-client) | [Message API](/api/message) |
| [`@epilot/metering-client`](https://www.npmjs.com/package/@epilot/metering-client) | [Metering API](/api/metering) |
| [`@epilot/notes-client`](https://www.npmjs.com/package/@epilot/notes-client) | [Notes API](/api/notes) |
| [`@epilot/notification-client`](https://www.npmjs.com/package/@epilot/notification-client) | [Notification API](/api/notification) |
| [`@epilot/organization-client`](https://www.npmjs.com/package/@epilot/organization-client) | [Organization API](/api/organization) |
| [`@epilot/partner-directory-client`](https://www.npmjs.com/package/@epilot/partner-directory-client) | [Partner API](/api/partner) |
| [`@epilot/permissions-client`](https://www.npmjs.com/package/@epilot/permissions-client) | [Permissions API](/api/permissions) |
| [`@epilot/pricing-client`](https://www.npmjs.com/package/@epilot/pricing-client) | [Pricing API](/api/pricing) |
| [`@epilot/purpose-client`](https://www.npmjs.com/package/@epilot/purpose-client) | [Purpose API](/api/purpose) |
| [`@epilot/submission-client`](https://www.npmjs.com/package/@epilot/submission-client) | [Submission API](/api/submission) |
| [`@epilot/template-variables-client`](https://www.npmjs.com/package/@epilot/template-variables-client) | [Template Variables API](/api/template-variables) |
| [`@epilot/user-client`](https://www.npmjs.com/package/@epilot/user-client) | [User API](/api/user) |
| [`@epilot/validation-rules-client`](https://www.npmjs.com/package/@epilot/validation-rules-client) | [Validation Rules API](/api/validation-rules) |
| [`@epilot/webhooks-client`](https://www.npmjs.com/package/@epilot/webhooks-client) | [Webhooks API](/api/webhooks) |
| [`@epilot/workflow-client`](https://www.npmjs.com/package/@epilot/workflow-client) | [Workflow Execution API](/api/workflow-execution) |
| [`@epilot/workflow-definition-client`](https://www.npmjs.com/package/@epilot/workflow-definition-client) | [Workflow Definition API](/api/workflow-definition) |
