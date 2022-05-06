---
sidebar_position: 4
---

# Architecture

[[API Docs](/api/automation#tag/executions)]
[[SDK](https://www.npmjs.com/package/@epilot/automation-client)]

[![Automation Architecture Diagram](../../static/img/automation-architecture.png)](../../static/img/automation-architecture.png)

The above diagram represents the implementation of epilot Automation. In nutshell:

- We store the Automation Flow Configurations in a DynamoDB Table
- A **Trigger Listener Function** is configured to listen to Entity Events and match them to configured Automation Triggers
- Matched Triggers create Executions in a DynamoDB Table
- An **Action Dispatcher** listens to changes in the Execution Table to dispatch jobs on the **Automation Event Bus**
- Jobs are picked up by **Automation Workers**, which are usually Lambda Step Functions configured to handle a specific type of Action
