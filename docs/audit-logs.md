---
sidebar_position: 14
---

# Audit Logs

[[SDK](https://www.npmjs.com/package/@epilot/audit-logs-client)]

Audit logs record all events that modify resources in your organization: entity changes, automation runs, webhook updates, and more.

:::info
Audit logs are an enterprise-tier feature. Contact sales for details.
:::

![Audit log table](../static/img/audit-log-table.png)

## Permission

Viewing audit logs requires the `audit_log:view` permission. Admin users have this by default. Assign it to other users through access management.

## Audited services

Coverage expands over time. Contact support if you need audit logs for a service not yet covered.

| Service        | Audited |
| -------------- | ------- |
| Entity         | Yes     |
| Workflow       | Yes     |
| Webhook        | Yes     |
| Automation     | Yes     |
| Journey        | No      |
| User           | Yes     |
| Permission     | Yes     |
| Blueprint      | No      |
| Messaging      | No      |
| Email Settings | Yes     |

## Facade APIs

The Entity API is audited. Facade APIs (wrappers around the Entity API) are not separately audited to avoid duplicate entries.