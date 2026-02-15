---
sidebar_position: 10
title: Supported Resources
---

# Supported Resources

[[API Docs](/api/blueprints)]

Blueprints support the following resource types. Each resource type corresponds to a `ResourceNodeType` in the [Blueprint Manifest API](/api/blueprints).

## Resource Types

| Resource Type | API Value | Description |
|---------------|-----------|-------------|
| **Journeys** | `journey` | Journey configurations and launchers |
| **Design Builder** | `designbuilder` | Journey design / theming configurations |
| **Products** | `product` | Product entities |
| **Prices** | `price` | Price entities |
| **Coupons** | `coupon` | Promotional codes |
| **Product Recommendations** | `product_recommendation` | Cross-sellable product configurations |
| **Taxes** | `tax` | Tax configurations |
| **Files** | `file` | Images, document templates, attachments, downloads |
| **Email Templates** | `emailtemplate` | Email templates with attachments and variables |
| **Schemas** | `schema` | Full entity schemas |
| **Schema Attributes** | `schema_attribute` | Individual schema attributes |
| **Schema Capabilities** | `schema_capability` | Schema capabilities |
| **Schema Groups** | `schema_group` | Attribute groups |
| **Schema Group Headlines** | `schema_group_headline` | Group headlines |
| **Automation Flows** | `automation_flow` | Automation flow configurations |
| **Entity Mappings** | `entity_mapping` | Entity mapping definitions |
| **Workflow Definitions** | `workflow_definition` | Workflow configurations |
| **Closing Reasons** | `closing_reason` | Workflow closing reasons |
| **Taxonomies** | `taxonomy` | Taxonomy definitions |
| **Taxonomy Classifications** | `taxonomy_classification` | Purposes and labels |
| **Webhooks** | `webhook` | Webhook configurations |
| **Integrations** | `integration` | ERP and third-party integrations |
| **Custom Variables** | `custom_variable` | Custom template variables |
| **Dashboards** | `dashboard` | Dashboard configurations |
| **Saved Views** | `saved_view` | Table and inbox saved views |
| **Roles** | `role` | Roles and permission configurations |
| **User Groups** | `usergroup` | User group definitions |
| **Portal Configurations** | `portal_config` | Customer portal configurations |
| **Apps** | `app` | App configurations |
| **Targets** | `target` | Target / goal definitions |
| **Kanban Views** | `kanban` | Kanban board configurations |
| **Validation Rules** | `validation_rule` | Entity validation rules |
| **Flow Templates** | `flow_template` | Reusable flow templates |
| **Notification Templates** | `notification_template` | Notification template configurations |

## Known Limitations

1. **Webhooks** are included as part of automations but created in an incomplete state -- users must manually add the URL and auth configuration after import.
2. **Designs** can be copied standalone, but the target organization's default design is applied for imported journeys.
3. **Schema capabilities** are only exported when exporting the full schema (not as individual resourcesMove).

## See Also

- [Blueprint Overview](/docs/blueprints/intro) -- What blueprints are and how they work
- [Installing a Blueprint](/docs/blueprints/installing-a-blueprint) -- Step-by-step installation guide
- [Editing and Synchronizing](/docs/blueprints/editing-and-synchronizing) -- Managing blueprint changes
