---
sidebar_position: 3
---

# Document Generation

[[API Docs](/api/document)]
[[SDK](https://www.npmjs.com/package/@epilot/document-client)]

## Overview

The Document Generation API is a powerful serverless document processing service that enables dynamic document creation from templates. It supports multiple input and output formats, advanced variable substitution, image handling with loops, and Excel generation capabilities.

### Key Features
- **Multi-format Support**: Process DOCX, XLSX, XLS, XLSM, and ICS templates
- **Variable Substitution**: Replace template variables with dynamic data from entities
- **Image Processing**: Direct image embedding with size control and loop support
- **PDF Generation**: Convert documents to PDF with preview URLs
- **Excel Support**: Full spreadsheet generation with formula preservation
- **Async Processing**: Handle large documents with job tracking
- **Multi-language**: Support for English and German localization

### Architecture
The service uses a dual-Lambda architecture:
- **API Handler Function**: REST API router for synchronous operations (Node.js 22)
- **Generate Document Function**: Dockerized Lambda for async document processing (Node.js 18 + Python)

## API Endpoints

### 1. Extract Template Metadata

Extract metadata and variables from document templates.

**Endpoint:** `POST /v2/documents:meta`

**Supported Formats:**
- `.docx`, `.doc` - Word documents
- `.xlsx`, `.xls`, `.xlsm` - Excel spreadsheets

**Request Example:**
```json
{
  "template_document": {
    "s3ref": {
      "bucket": "epilot-files-prod",
      "key": "123/templates/contract-template.docx"
    }
  }
}
```

**Response Example:**
```json
{
  "page_margins": {
    "top": 1440,
    "bottom": 1440,
    "left": 1440,
    "right": 1440,
    "header": 720,
    "footer": 720
  },
  "variables": [
    "customer_name",
    "order.billing_contact.0.salutation",
    "items[0].description",
    "opportunities[Primary].value"
  ]
}
```

### 2. Generate Documents

Generate documents from templates with variable substitution.

**Endpoint:** `POST /v2/documents:generate`

**Supported Input Formats:**
- `.docx` - Word documents
- `.xlsx`, `.xls`, `.xlsm` - Excel spreadsheets
- `.ics` - Calendar files

**Supported Output Formats:**
- `.pdf` - PDF with preview URL
- `.docx` - Word document (text-only mode)
- `.xlsx` - Excel spreadsheet
- `.ics` - Calendar format

**Query Parameters:**
- `job_id` - Track async generation status
- `mode` - Generation mode:
  - `partial_generation` - User validation before final output
  - `full_generation` (default) - Complete generation in one step
- `preview_mode` - Preview behavior:
  - `open` - Open in browser
  - `download` (default) - Force download

**Request Example:**
```json
{
  "template_document": {
    "s3ref": {
      "bucket": "epilot-files-prod",
      "key": "123/templates/invoice-template.docx"
    },
    "filename": "invoice-template.docx"
  },
  "context_entity_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "user_123",
  "language": "en",
  "variable_payload": {
    "custom_field": "Override value",
    "discount": 15
  },
  "template_settings": {
    "top_margin": 1440,
    "bottom_margin": 1440,
    "show_guidelines": false
  }
}
```

**Response Example:**
```json
{
  "job_id": "job_550e8400",
  "job_status": "SUCCESS",
  "pdf": {
    "s3ref": {
      "bucket": "epilot-generated-documents",
      "key": "123/output/invoice.pdf"
    },
    "preview_url": "https://s3.amazonaws.com/...",
    "filename": "invoice.pdf"
  },
  "docx": {
    "s3ref": {
      "bucket": "epilot-generated-documents",
      "key": "123/output/invoice.docx"
    },
    "preview_url": "https://s3.amazonaws.com/...",
    "filename": "invoice.docx"
  },
  "variable_payload": {
    "customer_name": "John Doe",
    "custom_field": "Override value",
    "discount": 15
  }
}
```

### 3. Convert Documents

Convert documents between formats (currently DOCX to PDF).

**Endpoint:** `POST /v2/documents:convert`

**Request Example:**
```json
{
  "input_document": {
    "s3ref": {
      "bucket": "epilot-files-prod",
      "key": "123/documents/contract.docx"
    }
  },
  "output_format": "pdf",
  "output_filename": "contract-converted.pdf",
  "language": "en"
}
```

**Response Example:**
```json
{
  "output_document": {
    "s3ref": {
      "bucket": "epilot-generated-documents",
      "key": "123/converted/contract-converted.pdf"
    },
    "preview_url": "https://s3.amazonaws.com/...",
    "filename": "contract-converted.pdf"
  }
}
```

## Template Variables

### Basic Variable Syntax

Templates use double curly braces for variable substitution:

```
{{variable_name}}              // Simple variable
{{customer.name}}               // Nested object
{{address.street.number}}       // Deep nesting
{{items.0.price}}              // Alternative array syntax
{{opportunities[Primary].value}} // Label-lookup array access
{{data["special-key"]}}        // Bracket notation for special characters on Label Lookups
```

### Variable Resolution Order

Variables are resolved in the following precedence order:
1. **`variable_payload`** - Explicitly provided values (highest priority)
2. **`context_data`** - Additional context data
3. **Template Variables API** - Entity attributes from `context_entity_id`
4. **User Preferences** - Language settings from `user_id`

### Complex Variable Examples

```
// Customer information
{{customer.first_name}} {{customer.last_name}}
{{customer.address.0.street}}
{{customer.contacts[billing].email}}

// Order details with calculations
{{ calc "ROUND((price * qty) * (1 - discount), 2)" }}
{{order.total_amount}}

// Conditional display (in supported templates)
{{#has_discount}}
  Discount: {{discount_percentage}}%
{{/has_discount}}
```

You can find more examples about calculation variables [here](https://docs.epilot.io/docs/templates/template-variables#excel-like-formulas).

## Image Variables

### Basic Image Syntax

Images can be embedded in documents using the special syntax:

#### Direct Image URL
```
{{% image_url }}
```
This renders the image at its original size.

#### Image with Size Control
Use an image placeholder in your template and set the variable in the alt text:
1. Insert an image placeholder in your Word/Excel template
2. Set the alt text to: `{{% image_url }}`
3. The placeholder image dimensions will control the rendered size

### Image Loops and Collections

<div style={{display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center'}}>
<img src="/img/docgen/docgen-images-p-1.png" alt="Document Generation Images Example 1" style={{ maxWidth: '50%', width: '100%' }} />
<img src="/img/docgen/docgen-images-p-2.png" alt="Document Generation Images Example 2" style={{ maxWidth: '50%', width: '100%' }} />
</div>


#### Mapping Journey Submissions to File Attributes

Since the global `_files` attribute is not yet supported, you need to map Journey submission fields to file attributes. For example, map a journey field to `my_journey_images`.

#### Basic Image Loop
```
{{#my_journey_images[*]}}
    {{% public_url }}
{{/my_journey_images[*]}}
```
This iterates through all images in the collection.

#### Filtered Image Loop by Label
```
{{#my_journey_images[...solar-panel]}}
    {{% public_url }}
{{/my_journey_images[...solar-panel]}}
```
This only includes images with the label "solar-panel".

#### Complete Example with Formatting
```
{{#property_images[*]}}
    Property Image:
    {{% public_url }}

    Description: {{ _title }}
    Uploaded: {{ _created_at }}
{{/property_images[*]}}
```

### Automatic Public URL Generation

The Document Generation service automatically handles private images:
- Private images are automatically converted to signed URLs with temporary access credentials
- These signed URLs include encrypted authentication tokens that grant time-limited access
- URLs expire shortly after document processing completes for security

### Important Compatibility Note

⚠️ **Order Tables with Margin Corrections are Incompatible with Loops**

Templates containing order tables with margin corrections like:
```
{{~order_table mt=2 mb=2}}
```

**Cannot** be used with image loops or any FOR_LOOP constructs.

**Solution:** Remove the margin correction variables and adjust margins directly in your Word template using Word's built-in margin settings.

## Excel Generation

<div style={{display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center'}}>
<img src="/img/docgen/docgen-excel-1.png" alt="Excel Document Generation Example 1" style={{ maxWidth: '50%', width: '100%' }} />
<img src="/img/docgen/docgen-excel.png" alt="Excel Document Generation Example 2" style={{ maxWidth: '50%', width: '100%' }} />
</div>

### Excel Template Support

The Document Generation API fully supports Excel templates with:
- **Variable substitution** in cells
- **Formula preservation** (recalculation is not supported due to Excel's security model)
- **Image embedding** in spreadsheets
- :warning: **Order Table variables** are not supported due to Excel's limitations with direct HTML rendering

### Excel Variable Syntax

#### Cell Variables
```
A1: {{customer_name}}
B1: {{order_date}}
```

#### Images in Excel
```
Cell A1: {{% product_image }}
Cell B2: {{% chart_url }}
```

### Excel Generation Example

**Request:**
```json
{
  "template_document": {
    "s3ref": {
      "bucket": "epilot-files-prod",
      "key": "templates/report-template.xlsx"
    }
  },
  "context_entity_id": "550e8400-e29b-41d4",
  "variable_payload": {
    "report_title": "Q4 Sales Report",
    "sales_data": [
      {"month": "October", "revenue": 125000},
      {"month": "November", "revenue": 145000},
      {"month": "December", "revenue": 168000}
    ],
    "chart_image": "https://charts.example.com/q4-sales.png"
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Variables Not Replaced
- **Check variable syntax**: Ensure correct use of `{{}}` brackets
- **Verify data source**: Check if variable exists in payload or entity
- **Review precedence**: Remember `variable_payload` overrides entity data

#### 2. Image Not Rendering
- **Check URL format**: Use `{{% url }}` with correct syntax
- **Verify image access**: Ensure image URL is accessible
- **Label filtering**: Confirm images have correct labels when using filters

#### 3. Loop Syntax Errors
- **Array notation**: Use `[*]` for all items, `[...label]` for filtered
- **Closing tags**: Ensure matching opening and closing loop tags
- **Margin conflicts**: Remove `{{~order_table mt=2 mb=2}}` when using loops

#### 4. Excel Formula Issues
- **Formula preservation**: Use standard Excel formula syntax
- **Variable in formulas**: Wrap variables in appropriate functions

## Code Examples

### JavaScript/TypeScript Client

```typescript
import { DocumentClient } from '@epilot/document-client';

const client = new DocumentClient(...);

// Generate document
async function generateInvoice(customerId: string) {
  const response = await client.generateDocument({
    template_document: {
      s3ref: {
        bucket: 'epilot-files-prod',
        key: 'templates/invoice.docx'
      }
    },
    context_entity_id: customerId,
    variable_payload: {
      invoice_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  });

  return response.pdf.preview_url;
}

// Extract template metadata
async function analyzeTemplate(templateRef: S3Reference) {
  const metadata = await client.getTemplateMeta({
    template_document: { s3ref: templateRef }
  });

  console.log('Variables found:', metadata.variables);
  console.log('Page margins:', metadata.page_margins);

  return metadata;
}
```

### cURL Examples

```bash
# Extract template metadata
curl -X POST https://api.epilot.cloud/v2/documents:meta \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template_document": {
      "s3ref": {
        "bucket": "epilot-files-prod",
        "key": "templates/contract.docx"
      }
    }
  }'

# Generate document
curl -X POST https://api.epilot.cloud/v2/documents:generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template_document": {
      "s3ref": {
        "bucket": "epilot-files-prod",
        "key": "templates/invoice.docx"
      }
    },
    "context_entity_id": "550e8400-e29b-41d4-a716-446655440000",
    "variable_payload": {
      "custom_message": "Thank you for your business!"
    }
  }'
```

## Advanced Features

### Template Settings
Customize document appearance:
```json
{
  "template_settings": {
    "top_margin": 1440,
    "bottom_margin": 1440,
    "left_margin": 1080,
    "right_margin": 1080,
    "show_guidelines": false,
    "enable_headers": true,
    "enable_footers": true
  }
}
```

### Job Status Tracking

For async operations, track job status:

```typescript
// Initial request returns job_id
const { job_id } = await client.generateDocument({ ... });

// Poll for status
const checkStatus = async (jobId: string) => {
  const response = await client.getJobStatus(jobId);

  switch(response.job_status) {
    case 'STARTED':
    case 'PROCESSING':
      // Still processing, check again later
      setTimeout(() => checkStatus(jobId), 2000);
      break;
    case 'SUCCESS':
      // Document ready
      console.log('Document URL:', response.pdf.preview_url);
      break;
    case 'FAILED':
      // Handle error
      console.error('Generation failed:', response.error);
      break;
  }
};
```

## Support

For additional references:
- **API Documentation**: [API Reference](/api/document)
- **SDK**: [@epilot/document-client](https://www.npmjs.com/package/@epilot/document-client)