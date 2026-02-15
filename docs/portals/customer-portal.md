---
sidebar_position: 1
---

# Overview

[[API Docs](/api/customer-portal)]
[[SDK](https://www.npmjs.com/package/@epilot/customer-portal-client)]
[[Setup Docs](https://help.epilot.cloud/hc/de/articles/4417739340050-Kundenportal-einrichten-epilot-360-)]

epilot Portals are white-label, self-service interfaces that connect organizations with their end-users (customers and installers). Administrators build portals from configurable blocks with custom branding, domain, email templates, and granular permissions. End-users access their data and perform pre-configured actions.

- [Administrator Actions](#administrator-actions)
- [End-user Actions](#end-user-actions)
- [Architecture](/docs/portals/architecture)
- [Metering](/docs/portals/metering)
- [Webhooks](/docs/portals/portal-webhooks)

## Administrator Actions

[[API Docs](/api/customer-portal/#tag/ECP-Admin)]

Administrators configure and manage the portal through a set of APIs:

- **Domain configuration** -- set the URL where the portal is accessible (custom domain or epilot subdomain).
- **Email templates** -- create templates for registration confirmation, password recovery, and invitation emails.
- **Granular permissions** -- grant or restrict access to specific features, entities, or actions per portal. This controls what end-users can see and do based on their roles.
- **Entity identifiers** -- configure which fields end-users can use to search for entities (contracts, orders, opportunities).
- **Entity actions** -- define actions that let end-users participate in journeys and submit updates to entities.

## End-user Actions

[[API Docs](/api/customer-portal/#tag/ECP)]

End-users log in to the portal to view and interact with their entities. Using configured entity identifiers, they search for specific records without contacting the organization directly.

:::tip
Portal permissions are fully configurable per entity type and action. See [Permissions](/docs/auth/permissions) for the underlying RBAC model.
:::

End-users can also trigger service processes by modifying entity data within the boundaries of their granted permissions. Examples:

1. **Add details to an opportunity** -- An installer adds PV panel specifications (technical details, pricing) to an existing opportunity using edit permissions.
2. **Update a delivery address** -- A customer changes the delivery address on an active contract.
3. **Enrich contact information** -- An installer adds newly acquired certifications or qualifications to their contact profile.
