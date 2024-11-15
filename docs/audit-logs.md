---
sidebar_position: 14
---

# Audit logs

[[API Docs](/api/audit-logs)]
[[SDK](https://www.npmjs.com/package/@epilot/audit-logs-client)]

Audit logs are a record of all the events which modified resources in your account. This includes changes to entities, automations, webhooks, and more. The audit logs are immutable and can be accessed by admin users in the epilot portal.


:::info

Audit logs are a pricing feature for enterprise tiers. Contact our sales team to learn more about the pricing.

:::

![Audit log table](../static/img/audit-log-table.png)

## Permission
To access the audit logs, you need to have the `audit_log:view` permission. This permission is only available to admin users or as a dedicated permission, which can be assigned to any user in the access management.

## Services being audited
As epilot covers a variety of services, the audit logging is added incrementally. The following services are currently being audited. Contact our support team if you need audit logs for a service not listed here.


| Service  	|    |
|----------	|----------	|
| Entity   	| ✅      	|
| Workflow 	| ✅      	|
| Webhook  	| ✅      	|
| Automation| ✅      	|
| Journey  	| ❌       	|
| User     	| ✅    	|
| Permission     	| ✅       	|
| Blueprint     	| ❌       	|
| Messaging     	| ❌       	|
| Email Settings    	| ✅      	|


## Facade apis
Our generic entity api is audited. More specific wrappers for this apis (facade apis) are not audited to avoid duplication.