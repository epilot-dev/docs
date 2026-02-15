---
title: Workflow data on entities
sidebar_position: 2
---

# Workflow data on entities

[[API Docs](/api/workflow-execution)]
[[SDK](https://www.npmjs.com/package/@epilot/workflow-client)]


## Workflow data structure

The example below shows how workflow information is stored inside the entity payload. The `workflows` object is keyed by `definition_id`, with each key containing an array of active workflow execution summaries.
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

## Previous Data Structure (Deprecated)

:::info
The array-based `workflows` structure below has been replaced by the hashmap structure shown above. If your integration still uses the old format, refer to the [Migration](#migration) section for field mappings.
:::
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

To migrate from the old array-based structure to the new hashmap structure, apply the following field mappings:

**Deprecated structure:**
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

**Current structure:**
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

### Changes

**Structural change:** `workflows` migrated from an array to a hashmap keyed by `definition_id`.

**New fields:**

| Field | Description |
|-------|-------------|
| `primary` | Points to the primary workflow execution |
| `duedate` | Workflow-level due date |
| `last_update_time` | Timestamp of the last update |
| `task_assignees` | Assignees for the current task |
| `task_execution_type` | `AUTOMATION` or `MANUAL` |

**Renamed fields:**

| Old Field | New Field |
|-----------|-----------|
| `workflow_status` | `status` |
| `workflow_assignees` | `assignees` |
| `workflow_definition_id` | `definition_id` |
| `next_open_step_id` | `task_id` |
| `next_open_step_name` | `task_name` |
| `next_open_section_id` | `phase_id` |
| `next_open_section_name` | `phase_name` |