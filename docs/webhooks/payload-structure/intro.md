---
sidebar_position: 1
title: Common Data Structure
---

# What data is sent to your webhook?

[[API Docs](/api/webhooks)]
[[SDK](https://www.npmjs.com/package/@epilot/webhooks-client)]

Webhooks have different payload structures depending on its trigger type. The most common event is the `Automation Trigger Webhook` event. Once this event is selected, you are able to trigger a webhook request within an automation.
The other use case is the `Portal Access Entity Access` event, which is triggered when a user accesses an entity in the portal. This event is used to track user access to entities and can be used to trigger webhooks based on user actions.

![Trigger](../../../static/img/webhooks/trigger.gif)

The following section describes the payload structure for both event types.

Every webhook event always contains a `metadata` object, which includes the organization ID and other metadata related information about the event. The `entity` object contains the entity data, while the `relations` and `activity` objects are optional and can be included based on the webhook configuration.

```json
{
   "metadata": {
      "organization_id": "org_1234567890",
      "event_type": "automation_trigger_webhook",
      "timestamp": "2023-10-01T12:00:00Z"
   },
   "entity": {
      "_id": "123456",
      "_schema_": "opportunity",
      "name": "New Opportunity",
      "status": "open"
   },
   "relations": [
      // optional relations to other entities
   ],
   "activity": {
      // optional activity data
   },
   "changed_attributes": {
      "added": {},
      "deleted": {},
      "updated": {}
   }
}
```

The flow can be nailed down to a simple overview with the following steps:

1. You configure a trigger for the webhook
2. If the trigger is of type `Portal Access`, you get a webhook request every time a user accesses (login) its portal account.
2. If the trigger is of typ `Automation Trigger`, you can connect a webhook action in the automation configuration.
3. You can configure a JSONata query in the webhook config to further transform the payload to your needs


![Simple Overview](../../../static/img/webhooks/intro.png)

# Main Entity
There is always a main entity in the webhook payload. This is the entity that the webhook is triggered on. The `entity` object contains the data of this main entity, which can be a contact, opportunity, or any other entity type.
If you select the `Portal Access Entity Access` event, the `entity` object will contain the contat entity of the user who accessed the resource. If you select the `Automation Trigger Webhook` event, the `entity` object will contain the entity data related to the automation trigger.



# Webhook fields

The payload sent to the webhook URL contains the following fields (prerequisite is the input is not transformed with a JSONata query):

| Field                                        | Type       | Description                                           |
| -------------------------------------------- | ---------  | ----------------------------------------------------- |
| `metadata`                                   | object     | Contains metadata about the configured event          |
| `metadata.action`                            | string?    | Action that triggered the event                       |
| `metadata.origin`                            | string?    | Origin of the event                                   |
| `metadata.creation_timestamp`                | string     | Time of event creation                                |
| `metadata.webhook_id`                        | string     | The ID of the webhook configuration                   |
| `metadata.webhook_name`                      | string?    | The name of the webhook configuration                 |
| `metadata.automation_name`                   | string?    | The name of the automation that triggered the event   |
| `metadata.organization_id`                   | string     | The ID of the given organization                      |
| `metadata.user_id`                           | string?    | The ID of the user for manual triggered events        |
| `metadata.correlation_id`                    | string     | ID used to track the event                                   |
| `metadata.execution_id`                      | string?    | When triggered by an automation this is its execution id     |
| `metadata.action_id`                         | string?    | When triggered by an automation this is the id of the action |
| `entity`                                     | object     | The main entity data relevant to the event            |
| `relations`                                  | array?     | Optional relations to other entities                  |
| `activity`                                   | object?    | Optional activity data                                |
| `changed_attributes`                         | object?    | The attributes that were added, deleted, or updated   |
