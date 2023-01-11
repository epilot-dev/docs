---
title: Workflow data on entities
sidebar_position: 2
---

# Workflow data on entities

[[API Docs](/api/workflow-execution)]


## Current data structure

The example below is the current data structure of how the workflow information presents itself inside the entity payload. The current workflow payload is more detailed than before and provides better overview.
```json
{
    "_id": "11111111-1111-1111-1111-111111111111",
    "_schema": "opportunity",

    ...

    "workflows": {
        "rUqQv3Xd": [
            {
                "id": "85mk9wzyp98",
                "definition_id": "rUqQv3Xd",
                "name": "Solar Workflow",
                "status": "STARTED",
                "assignees": [
                    "10014629",
                    "10002602"
                ],
                "duedate": "2023-01-01T10:00:00.000Z",
                "last_update_time": "2023-01-01T10:00:00.000Z",
                "task_id": "8tpx9mi4ryb",
                "task_name": "Clean Energy",
                "task_assignees": [
                    "10014629",
                    "10002602",
                    "10016846"
                ],
                "task_duedate": "2023-01-10T23:23:27.111Z",
                "task_execution_type": "AUTOMATION",
                "phase_id": "362pq2sy9ll",
                "phase_name": "Research"
            },
            {
                "id": "3ur6cry7r7x",
                "definition_id": "rUqQv3Xd",
                "name": "Solar Workflow",
                "status": "STARTED",
                "assignees": [
                    "10014629",
                    "10002602"
                ],
                "duedate": "2023-01-01T10:00:00.000Z",
                "last_update_time": "2023-01-01T10:00:00.000Z",
                "task_id": "7olrwq658ne",
                "task_name": "Conclusions",
                "task_assignees": [
                    "10014629"
                ],
                "task_duedate": "2023-01-01T10:00:00.000Z",
                "task_execution_type": "MANUAL",
                "phase_id": "q2rivpohtla",
                "phase_name": "Closing"
            }
        ],
        "V_opYKRV": [
            {
                "id": "opse3yk2tit",
                "definition_id": "V_opYKRV",
                "name": "Wallbox Workflow",
                "status": "STARTED",
                "assignees": [
                    "10014629",
                    "10002602"
                ],
                "last_update_time": "2023-01-01T10:00:00.000Z",
                "task_id": "rdaq2e48y00",
                "task_name": "Schedule & perform E-Check on site",
                "task_assignees": [],
                "task_execution_type": "MANUAL",
                "phase_id": "k0b4ht9i0vb",
                "phase_name": "Pre-Check",
                "task_duedate": "2023-01-01T10:00:00.000Z"
            }
        ],
        "primary": {
            "id": "85mk9wzyp98",
            "definition_id": "rUqQv3Xd",
            "name": "Solar Workflow",
            "status": "STARTED",
            "assignees": [
                "10014629",
                "10002602"
            ],
            "duedate": "2023-01-01T10:00:00.000Z",
            "last_update_time": "2023-01-01T10:00:00.000Z",
            "task_id": "8tpx9mi4ryb",
            "task_name": "Clean Energy",
            "task_assignees": [
                "10014629",
                "10002602",
                "10016846"
            ],
            "task_duedate": "2023-01-10T23:23:27.111Z",
            "task_execution_type": "AUTOMATION",
            "phase_id": "362pq2sy9ll",
            "phase_name": "Research"
        }
    }
}
```

## Old data structure and migration
`deprecated`

The example below is the old structure for workflow data on entities.
```json
{
    "_id": "11111111-1111-1111-1111-111111111111",
    "_schema": "opportunity",

    ...

    "workflows": [
        {
            "id": "85mk9wzyp98",
            "name": "Solar Workflow",
            "workflow_status": "STARTED",
            "workflow_assignees": [
                "10014629",
                "10002602"
            ],
            "workflow_definition_id": "rUqQv3Xd",
            "next_open_step_id": "8tpx9mi4ryb",
            "next_open_step_name": "Clean Energy",
            "next_open_section_id": "362pq2sy9ll",
            "next_open_section_name": "Research"
        },
    ]
}
```

## Migration

How to migrate from the old workflow structure to the new workflow structure. Changes:

`deprecated workflow structure`
```json
{
    "_id": "11111111-1111-1111-1111-111111111111",
    "_schema": "opportunity",

    ...

    "workflows": [
        {
            "id": "85mk9wzyp98",
            "name": "Solar Workflow",
            "workflow_status": "STARTED",
            "workflow_assignees": [
                "10014629",
                "10002602"
            ],
            "workflow_definition_id": "rUqQv3Xd",
            "next_open_step_id": "8tpx9mi4ryb",
            "next_open_step_name": "Clean Energy",
            "next_open_section_id": "362pq2sy9ll",
            "next_open_section_name": "Research"
        },
    ]
}
```

`current workflow structure`
```json
{
    "_id": "11111111-1111-1111-1111-111111111111",
    "_schema": "opportunity",

    ...

    "workflows": {
        "rUqQv3Xd": [
            {
                "id": "85mk9wzyp98",
                "definition_id": "rUqQv3Xd",
                "name": "Solar Workflow",
                "status": "STARTED",
                "assignees": [
                    "10014629",
                    "10002602"
                ],
                "duedate": "2023-01-01T10:00:00.000Z",
                "last_update_time": "2023-01-01T10:00:00.000Z",
                "task_id": "8tpx9mi4ryb",
                "task_name": "Clean Energy",
                "task_assignees": [
                    "10014629",
                    "10002602",
                    "10016846"
                ],
                "task_duedate": "2023-01-10T23:23:27.111Z",
                "task_execution_type": "AUTOMATION",
                "phase_id": "362pq2sy9ll",
                "phase_name": "Research"
            }
        ]
        "primary": {
            "id": "85mk9wzyp98",
            "definition_id": "rUqQv3Xd",
            "name": "Solar Workflow",
            "status": "STARTED",
            "assignees": [
                "10014629",
                "10002602"
            ],
            "duedate": "2023-01-01T10:00:00.000Z",
            "last_update_time": "2023-01-01T10:00:00.000Z",
            "task_id": "8tpx9mi4ryb",
            "task_name": "Clean Energy",
            "task_assignees": [
                "10014629",
                "10002602",
                "10016846"
            ],
            "task_duedate": "2023-01-10T23:23:27.111Z",
            "task_execution_type": "AUTOMATION",
            "phase_id": "362pq2sy9ll",
            "phase_name": "Research"
        }
    }
}
```

### Changes
- Updated from `workflows` Array ➡️ `workflows` Hashmap (`definition_id`: {...})
- Added `primary` key into `workflows` object
- Added `duedate` key into `workflows` object
- Added `last_update_time` key into `workflows` object
- Added `task_assignees` key into `workflows` object
- Added `task_execution_type` key into `workflows` object
- Migrated `workflow_status` ➡️ `status`
- Migrated `workflow_assignees` ➡️ `assignees`
- Migrated `workflow_definition_id` ➡️ `definition_id`
- Migrated `next_open_step_id` ➡️ `task_id`
- Migrated `next_open_step_name` ➡️ `task_name`
- Migrated `next_open_section_id` ➡️ `phase_id`
- Migrated `next_open_section_name` ➡️ `phase_name`