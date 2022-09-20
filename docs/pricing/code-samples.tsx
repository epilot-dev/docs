import CodeBlock from '@theme/CodeBlock';
import React from 'react';

export const GetOrderApiSample = () => (
  <CodeBlock title="Getting an Order using the Entity API" language="bash" showLineNumbers>
    {`curl --location --request GET 'https://entity.sls.epilot.io/v1/entity/schemas/order?id=<order-id>' \\
  --header 'Accept: application/json' \\
  --header 'Authorization: Bearer <org-access-token>'`}
  </CodeBlock>
);
export const GetOrderSample = () => (
  <CodeBlock title="Getting an Order using the Entity API" language="typescript" showLineNumbers>
    {`import { authorizeWithToken } from 'epilot-sdk/auth'
import entityClient from 'epilot-sdk/entity-client'
import pricingClient from 'epilot-sdk/pricing-client'

const accessToken = 'org-access-token'

entityClient.defaults.baseURL = 'https://entity.sls.epilot.io'
pricingClient.defaults.baseURL = 'https://pricing-api.sls.epilot.io'

// authorizing SDK clients
authorizeWithToken(entityClient, accessToken)
authorizeWithToken(pricingClient, accessToken)

const targetOrderId = 'order-id'

// fetching the order from entity api
const order = await entityClient
.getEntity({ slug: 'order', id: targetOrderId}) .then(({ data }) => data?.entity)`}
  </CodeBlock>
);

export const UpdateOrderApiSample = () => (
  <CodeBlock title="Updating an Order via Pricing API" language="bash" showLineNumbers>
    {`curl --location --request PUT 'https://pricing-api.sls.epilot.io/v1/order/<order-id>' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --header 'Authorization: Bearer <org-access-token>' \\
  --data-raw '{
      "line_items": [
          {
              "description": "individual adjustment",
              "_price": {
                  "unit_amount": 1000,
                  "unit_amount_decimal": "10.00",
                  "unit_amount_currency": "EUR"
              }
          }
      ]
  }'`}
  </CodeBlock>
);
export const UpdateOrderSample = () => (
  <CodeBlock title="Updating an Order via Pricing API" language="typescript" showLineNumbers>
    {`// pushing a new line item
order.line_items.push({
  description: 'individual adjustment',
  _price: {
    unit_amount: 1000,
    unit_amount_decimal: '10.00',
    unit_amount_currency: 'EUR'
  }
})

// updating the order
await pricingClient
  .putOrder({ id: targetOrderId }, order).then(({ data }) => data)`}
  </CodeBlock>
);
