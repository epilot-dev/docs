import CodeBlock from '@theme/CodeBlock';
import React from 'react';


export const GetVariableContextApi = () => (
  <CodeBlock title="Get variable context" language="bash" showLineNumbers>
     {`curl --location --request POST 'https://template-variables-api.sls.epilot.io/v1/template-variables:context' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --header 'Authorization: Bearer <org-access-token>' \\
  --data-raw '{
    "parameters": {
      "template_type": "email",
      "language": "en",
      "main_entity_id": "entity-id"
    },
  }'`}
  </CodeBlock>
);
export const GetVariableContextSDK = () => (
  <CodeBlock title="Get variable context" language="typescript" showLineNumbers>
    {`import { authorizeWithToken } from 'epilot-sdk/auth'
import templateVariablesClient from 'epilot-sdk/template-variables-client'

const accessToken = 'org-access-token'

templateVariablesClient.defaults.baseURL = 'https://template-variables-api.sls.epilot.io'

// authorizing SDK clients
authorizeWithToken(templateVariablesClient, accessToken)

const entityId = entityId;

// Get data context
const dataContext = await templateVariablesClient
  .getVariableContext(null, {
    parameters: {
      template_type: 'email',
      language: 'en',
      main_entity_id: entityId
    }).then(({ data }) => data)`}
  </CodeBlock>
);

export const ReplaceVariablesApi = () => (
  <CodeBlock title="Replace template" language="bash" showLineNumbers>
     {`curl --location --request POST 'https://template-variables-api.sls.epilot.io/v1/template-variables:replace' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --header 'Authorization: Bearer <org-access-token>' \\
  --data-raw '{
    "inputs": 
      "{{table_order_items}}",
      "{{contact.first_name}}"
    ],
    "parameters": {
      "template_type": "email",
      "language": "en",
      "main_entity_id": "entity-id",
    }
  }`}
  </CodeBlock>
);

export const ReplaceVariablesSDK = () => (
  <CodeBlock title="Replace template" language="typescript" showLineNumbers>
    {`import { authorizeWithToken } from 'epilot-sdk/auth'
import templateVariablesClient from 'epilot-sdk/template-variables-client'

const accessToken = 'org-access-token'

templateVariablesClient.defaults.baseURL = 'https://template-variables-api.sls.epilot.io'

// authorizing SDK clients
authorizeWithToken(templateVariablesClient, accessToken)

const entityId = entityId;

// Replace the template
const replacedTemplate = await templateVariablesClient
  .replaceTemplates(null, {
    inputs: [
      '{{table_order_items}}',
      '{{contact.first_name}}'
    ],
    parameters: {
      template_type: 'email',
      language: 'en',
      main_entity_id: entityId,
    }
  }).then(({ data }) => data)`}
  </CodeBlock>
);

export const ReplaceEmailTemplateApi = () => (
  <CodeBlock title="Replace Email template" language="bash" showLineNumbers>
     {`curl --location --request POST 'https://email-template.sls.epilot.io/v1/email-template/templates:replace' \\
  --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  --header 'Authorization: Bearer <org-access-token>' \\
  --data-raw '{
    "email_template_id": "email-template-id",
    "variable_parameters": {
      "template_type": "email",
      "language": "en",
      "main_entity_id": "entity-id"
    }
  }'`}
  </CodeBlock>
);

export const ReplaceEmailTemplateSDK = () => (
  <CodeBlock title="Replace Emial template" language="typescript" showLineNumbers>
    {`import { authorizeWithToken } from 'epilot-sdk/auth'
import emailTemplateClient from 'epilot-sdk/email-template-client'

const accessToken = 'org-access-token'

emailTemplateClient.defaults.baseURL = 'https://email-template.sls.epilot.io'

// authorizing SDK clients
authorizeWithToken(emailTemplateClient, accessToken)

const emailTemplateId = 'email-template-id'
const entityId = 'entity-id';

// fetching the categories
const replacedEmailTemplate = await emailTemplateClient
  .replaceVariables(null, {
    email_template_id: emailTemplateId,
    variable_parameters: {
      template_type: 'email',
      language: 'en',
      main_entity_id: entityId,
    },
  }).then(({ data }) => data)`}
  </CodeBlock>
);