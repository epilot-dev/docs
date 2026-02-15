---
title: Portal Webhooks
sidebar_position: 4
---

# Portal Webhooks

Portal-specific webhooks let you integrate external applications with activities that occur inside customer and installer portals.

## Setup

1. Configure a webhook that includes the portal activity:

![Doc Downloaded Webhook](../../static/img/portals/doc-downloaded-webhook.png)

2. Go to **Automations** and create a new automation with a portal-specific trigger (e.g. "File Activity: File Downloaded from portal"):

![Doc Downloaded Automation Trigger](../../static/img/portals/doc-downloaded-automation-trigger.png)

3. Add an action to the automation and select the webhook you created:

![Doc Downloaded Automation Action](../../static/img/portals/doc-downloaded-automation-action.png)

## Webhook Payload

The webhook message contains the full `entity` involved in the activity. The `activity` object includes the activity `type` and `caller` information identifying the portal user who triggered it.

```json title="Example: DocDownloadedFromPortal"
{
    "metadata": {
        "webhook_id": "17DwnAQo8zZaJWCQ5HaZhC",
        "organization_id": "739224"
    },
    "entity": {
        "_schema": "file",
        "_id": "78794089-343c-4bcd-97a1-9b307c3ac040",
        "_org": "739224",
        ...other entity attributes
    },
    "activity": {
        "type": "DocDownloadedFromPortal",
        "title": "Portal user downloaded the file",
        "message": "Portal user {{entity payload.caller.portalUserId}} has downloaded the file {{entity payload.entity._id}}.",
        "payload": {
            "caller": {
                "portal_user_id": "bed23253-b00b-4a09-8815-2bc87c69ae97",
                "contact_entity_id": "78794089-343c-4bcd-97a1-9b307c3ac040",
                "email": "portal.user@example.com",
                "portal_origin": "END_CUSTOMER_PORTAL"
            },
            "entity": {
                "_id": "78794089-343c-4bcd-97a1-9b307c3ac040",
                "_schema": "file",
                "_org": "739224"
            },
            "orgId": "739224"
        },
        "_org": "739224",
        "_id": "01HCYQ73MPPQDR5ZHV1GQ25CZY",
        "timestamp": "2023-10-17T11:44:25.238Z",
        "operations": [
            null
        ]
    }
}
```

## Activity Types

| Type | Automation Trigger |
|---|---|
| `DocDownloadedFromPortal` | File Activity: File Downloaded from portal |
