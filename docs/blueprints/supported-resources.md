---
sidebar_position: 10
title: Supported Resources
hide_title: true
---

## Resources Supported in Blueprints

The following resource configurations are supported for blueprints and sandbox pipelines:

**Journeys**
- [x] Journey Launcher
- [x] Post Qualification Journeys

**Automations**
- [x] Webhooks*
- [x] Workflows
- [x] Email Templates
- [x] Document Templates
- [x] Entity Mappings

**Products**
- [x] Prices
- [x] Taxes
- [x] Cross Sellable Products
- [x] Files (Images, Downloads, Availability)

**Schemas**
- [x] Attributes
- [x] Groups
- [x] Capabilities
- [x] Headlines*
- [x] Full Schemas (Sandbox only)

**Taxonomies**
- [x] Purposes
- [x] Labels

**Workflows**
- [x] Closing Reasons
- [x] Automations
- [x] Journeys
- [x] Portal related configuration

**Email Templates**
- [x] Files (Attachments)
- [x] Journeys Linked in Template (Post Qualification Journey)
- [x] Custom Variables

**Files**
- [x] Document Templates
- [x] Product Images
- [x] Email Attachments
- [x] Product Downloads
- [x] Availability Files
- [x] Address Suggestions on Journeys

**Designs**
- [x] Designs

### Upcoming 

- [ ] Dashboards
- [ ] Saved Views (Table & Inbox)
- [ ] Roles & Permissions
- [ ] Families (Labels)
- [ ] Portals

### Known Limitations*

1. Webhooks are included as part of automations, but created in incomplete state, waiting for the user to add a URL and auth configuration
1. Importing schemas can sometimes take a very long time.
1. Only Purpose Taxonomies are currently supported
1. Designs can be copied standalone now, but the target organization’s default design is applied for imported Journeys
1. Capabilities and Headlines are currently only exported when exporting full schema
