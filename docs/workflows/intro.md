---
title: Overview
sidebar_position: 1
---

# Workflows

[[API Docs](/api/workflow-execution)]
[[SDK](https://www.npmjs.com/package/@epilot/workflow-client)]

Workflows are a collection of tasks that is used to track the progress and performing operations from the task itself.

## Functionality

You can do following operations from a task in the running workflow.

- Run Automations
- Run Journeys
- Add notes
- Add assignees
- Add due date
- Mark the task as done
- Mark the task as in progress
- Skip the task

## Workflow Builder

A Workflow can be defined in the builder under: [Workflows > Workflow Builder](https://portal.epilot.cloud/app/workflows-hub).

You can either create one from scratch or use a template.

![workflow builder](../../static/img/workflows/workflow-builder.png)

### Task details

You can add several details to the tasks:

- Due date and dynamic due date
- Automations to run from the task
- Journey to complete from the task
- Required tasks to be completed before that task can be worked upon
- Task description
- Assignees

### Workflow details

From the settings button in the top bar, you can configure the entity attributes to update.

![configure entity update](../../static/img/workflows/configure_entity_update.png)

You can also configure closing reasons for the Workflow.

![closing reasons](../../static/img/workflows/closing-reasons.png)
