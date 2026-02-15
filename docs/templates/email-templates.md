---
sidebar_position: 2
---

# Email Templates

[[API Docs](/api/email-template)]
[[SDK](https://www.npmjs.com/package/@epilot/email-template-client)]

The Email Template API manages reusable email templates in epilot. Templates define the structure and content of outgoing emails, supporting HTML content, variable substitution, branding, and file attachments.

Each email template is stored as an entity with metadata (sender, recipients, subject), an HTML body with optional plaintext fallback, and references to attached files.

## Template Components

| Component | Description |
|-----------|-------------|
| **Name** | Display name for the template |
| **Brand** | Associated brand for styling and sender identity. Set to `0` for all brands |
| **From** | Sender email address (supports custom email domains) |
| **To / Cc / Bcc** | Default recipient addresses |
| **Subject** | Email subject line (supports [template variables](/docs/templates/template-variables)) |
| **Body** | HTML and/or plaintext content with variable placeholders |
| **Attachments** | File references stored in S3. Files over 10 MB are sent as download links. Supports [document templates](/docs/templates/document-templates) as attachments -- documents are generated with variable substitution at send time and attached as PDF/DOCX |

## Variables

Templates support [Handlebars](https://handlebarsjs.com/)-based variable substitution powered by the [Template Variables API](/docs/templates/template-variables). Insert variables into subject lines and body content using double curly braces:

```handlebars
Hello {{contact.first_name}},

Your order {{order._title}} has been confirmed.
```

Variables are resolved at send time against entity data. Use the variable picker in the template editor to browse available variables.

## System Templates

epilot provides built-in system templates for platform features:

| Template | Purpose |
|----------|---------|
| **Double Opt-in** | Sends a confirmation link for consent management / newsletter opt-in |
| **Portal Invitation** | Invites end customers to register for the Customer Portal (ECP) |
| **Installer Portal Invitation** | Invites partners to register for the Installer Portal |

System templates can be customized per organization but cannot be deleted.

## Key API Operations

| Operation | Description |
|-----------|-------------|
| `createEmailTemplate` | Create a new email template entity |
| `getEmailTemplate` | Retrieve a template by ID |
| `updateEmailTemplate` | Update an existing template |
| `deleteEmailTemplate` | Delete a template |
| `getSystemEmailTemplate` | Retrieve a system template by type |

See the full [API reference](/api/email-template) for request and response schemas.

## Sending Emails with Templates

To send an email using a template, use the [Message API](/docs/messaging/message-api) with a `template_id`. The Message API resolves template variables against the provided entity context before sending.

```bash
curl -X POST https://message.sls.epilot.io/v1/message/send \
  -H "Authorization: Bearer $EPILOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "abc-123-template-id",
    "to": ["customer@example.com"],
    "entity_id": "entity-uuid",
    "schema": "contact"
  }'
```

The `entity_id` and `schema` fields provide the context for variable resolution. The template's subject, body, and attachments are used, with all `{{variables}}` replaced with actual entity data.

## Bulk Messaging

For sending the same template to multiple recipients (e.g. campaigns or notifications), use bulk automation with email templates. The automation engine iterates over a set of entities and sends individualized emails with per-recipient variable resolution.

Configure bulk messaging through **Automation > Actions > Send Email** and select the target template.

## Creating a Template

```bash
curl -X POST https://email-template.sls.epilot.io/v1/email-template \
  -H "Authorization: Bearer $EPILOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Order Confirmation",
    "brand_id": 0,
    "from": "noreply@example.com",
    "to": [],
    "subject": "Your order {{order._title}} is confirmed",
    "body": {
      "html": "<h1>Hi {{contact.first_name}},</h1><p>Thank you for your order.</p>",
      "text": "Hi {{contact.first_name}}, Thank you for your order."
    },
    "attachments": []
  }'
```
