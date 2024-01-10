---
title: Workflow Notes
sidebar_position: 3
---

# Workflow Notes

[[API Docs](/api/workflow-execution)]
[[SDK](https://www.npmjs.com/package/@epilot/workflow-client)]
[[Notes Docs](https://docs.api.dev.epilot.io/discussion)]

Workflow Notes use the [Comments API](https://docs.api.dev.epilot.io/discussion#tag/Comments) with some specifications.

The schema remains the same except the `context_id`. It should be in the format `{entity_id}-workflow-{workflow_id}-{task_id}`.

You can find the ids in the URL params when you are in the notes view of the task.

| field       | Description                                 |
| ----------- | ------------------------------------------- |
| entity_id   | Id of the entity                            |
| workflow_id | Id of the workflow                          |
| task_id     | Id of the task where note should be created |

![Workflow Notes](../../static/img/workflows/workflow-notes.png)
