---
sidebar_position: 5
---

# Journey Launcher

The Journey Launcher allows journeys to share a common start screen. When embedded in a client web page, the journey launcher allows the user to select from various journeys shown as tabs. The first step of each journey is shown whenever the corresponding journey tab is selected.

In order to setup a journey launcher, follow the steps below:

# 1. Get the ID for the Journey Launcher template

You need to have access to a Journey launcher tamplate in order to create a Launcher Journey. To get the templateId of the launcher template, use the following request:

```
curl --location --request POST 'https://journey-config.sls.epilot.io/v1/journey/templates/search' \
--header 'Authorization: Bearer <your-auth-token-here>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "q": "(!(_exists_:tags)) OR !(tags:draft) OR (tags:launcher)"
}'
```

The response will return with a list of all launcher templates (ideally only one). Take note of the `templateId` from `results[0].templateId` as this is needed in the following steps.

# 2. Get the IDs for the Brand and Style

The journey launcher is a special type of journey that is created from a template. In addition to the journey template, the journey launcher also requires:

- Brand id
- Style id

To get the brand and style IDs, use the following request:

```
curl --location --request GET 'https://design-builder-api.sls.epilot.io/v1/brands' \
--header 'Authorization: Bearer <your-auth-token-here>'
```

Make a note of the `id` field in the from one of the `brands` in the response. This is the brand ID.

To get the style ID, use the following request:

```
curl --location --request GET 'https://design-builder-api.sls.epilot.io/v1/designs' \
--header 'Authorization: Bearer <your-auth-token-here>'
```

Make a note of the `id` field in the from one of the `designs` in the response. This is the style ID. Also, ensure that the selected design has the same `brand_id` as the brand ID identified previously.

# 3. Create a launcher journey using the template ID

With the template ID from Step 1, create a launcher journey using the following request:

```
curl --location --request POST 'https://journey-config.sls.epilot.io/v1/journey/configuration' \
--header 'Authorization: Bearer <your-auth-token-here>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "<name for the launcher journey>",
    "organizationId": "<your organisation id>",
    "brandId": "<brand id from the previous step>",
    "steps": [
        {
            "name": "Launcher step",
            "schema": {
                "type": "object",
                "properties": {
                    "Launcher block": {
                        "type": "object"
                    }
                }
            },
            "stepId": "New step",
            "hideNextButton": true,
            "uischema": {
                "type": "MainContentCartLayout",
                "options": {
                    "scale": 5
                },
                "elements": [
                    [
                        {
                            "type": "JourneyLauncherControl",
                            "options": {
                                "stickyOnMobile": false,
                                "stickyOnMobileIndex": 1,
                                "showPaper": true
                            },
                            "scope": "#/properties/Launcher block"
                        }
                    ],
                    [],
                    [],
                    []
                ]
            }
        }
    ],
    "rules": [],
    "logics": [],
    "tags": [
        "launcher"
    ],
    "settings": {
        "designId": "<design id from the previous step>",
        "templateId": "<journey launcher template id from Step 1>",
        "description": "<optional text description for the launcher>",
        "safeModeAutomation": true,
        "runtimeEntities": [
            "OPPORTUNITY"
        ]
    }
}'
```

The response object contains the journey ID for the newly created launcher journey. Take a note of this journey ID as it will be needed when linking journeys to this journey ID.

# 4. Get the journey IDs for the (child) journeys that have to be linked

To search for a journey using the title of the journey, use the following request:

```
curl --location --request POST 'https://entity.sls.epilot.io/v1/entity/v1/entity:search' \
--header 'Authorization: Bearer <your-auth-token-here>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "q": "_schema:journey",
  fields: ['journey_id', '_title', 'tags'],
  "size": 25,
  "sort": "_created_at:asc",
  "from": 0,
  "hydrate": true
}'
```

Do this and take note of the `journeyId` for each child journey that is to be linked to the launcher journey.

# 5. Link journeys to the launcher journey

Now the child journeys can be linked to the launcher journey. Create an array `linkedJourneys` of the following form:

```json
[
  {
    "id": "<linked journey id 1>",
    "title": "<title of the linked journey>",
    "label": "<label on the tab of the linked journey>",
    "icon": "<name of the icon>"
  },
  {
    "id": "<linked journey id 2>",
    "title": "<title of the linked journey>",
    "label": "<label on the tab of the linked journey>",
    "icon": "<name of the icon>"
  }
]
```

Add the `linkedJourneys` array to the key `steps[0].uischema.elements][0][0].options.linkedJourneys` to the response of the launcher journey creation step. Here is a sample request:

```
curl --location --request PUT 'https://journey-config.sls.epilot.io/v1/journey/configuration' \
--header 'Authorization: Bearer <your-auth-token-here>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "version": 0,
    "settings": {
        "runtimeEntities": [
            "OPPORTUNITY"
        ],
        "safeModeAutomation": true,
        "designId": "<design ID>",
        "description": "<optional text description>",
        "templateId": "<launcher template ID>"
    },
    "rules": [],
    "logics": [],
    "name": "<your jouney launcher name>",
    "organizationId": "728",
    "brandId": "3154079",
    "steps": [
        {
            "name": "Launcher step",
            "schema": {
                "type": "object",
                "properties": {
                    "Launcher block": {
                        "type": "object"
                    }
                },
                "required": []
            },
            "stepId": "New step",
            "hideNextButton": true,
            "uischema": {
                "type": "MainContentCartLayout",
                "options": {
                    "scale": 5
                },
                "elements": [
                    [
                        {
                            "type": "JourneyLauncherControl",
                            "options": {
                                "stickyOnMobile": false,
                                "stickyOnMobileIndex": 1,
                                "showPaper": true,
                                "isNested": false,
                                "linkedJourneys": [
                                    {
                                        "id": "<linked journey id 1>",
                                        "title": "<title of the linked journey>",
                                        "label": "<label on the tab of the linked journey>",
                                        "icon": "<name of the icon>"
                                    }
                                ]
                            },
                            "scope": "#/properties/Launcher block"
                        }
                    ],
                    [],
                    [],
                    []
                ]
            }
        }
    ],
    "journeyId": "<launcher journey id>",
    "revisions": 0,
    "lastModifiedAt": "2023-04-10T06:55:08.931Z"
}'
```

With this, the launcher journey has been created using a launcher template. It also has been assigned a design and the linked child journeys are mapped. The launcher journey is now ready to be used.
