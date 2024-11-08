---
sidebar_position: 3
title: Sandbox
---

# Sandbox

:::info

Sandboxes are currently in closed **BETA** only available to selected customers.

:::

Sandboxes are a way to safely test epilot configuration in a sandbox environment and promote configuration changes to production using a Blueprint Pipeline.

## Connecting a Sandbox

To easily promote configurations such as a journey with its connected resources to production, you should connect your sandbox to your production organization.

To do this, you need to generate an [API Token](/docs/auth/access-tokens) for your sandbox organization and add it to your production organization.

![Create Access Token](/img/create-access-token.png)

Once you have an API token for your sandbox organization, you should log in to your production organization and navigate to [Blueprints > Pipelines to other Organizations](https://portal.epilot.cloud/app/blueprints/pipelines) and select [Connect Organization](https://portal.epilot.cloud/app/blueprints/pipelines/create).

Here you can copy your Sandbox API token to connect your sandbox to your production organization.

![Connect Organization](/img/blueprints/connect-organization.png)

## Switching Between Organizations

To make switching between organizations easier, make sure to invite your user to both organizations, and use the organization switcher in the bottom left corner of the portal.

![Organization Switcher](/img/org-switcher.png)


## Importing Between Organizations

Log in to the organization you want to update. If you wish to start by copying existing configuration from production to your sandbox, you should log in to your Sandbox organization. If you want to promote changes from sandox to production, switch to your production organization.

To import configurations via sandbox pipeline, navigate to [Configuration > Blueprints](https://portal.epilot.cloud/app/blueprints) and select [Install Blueprint > Sandbox](https://portal.epilot.cloud/app/blueprints/pipelines/import).

![Sandbox Step 1](/img/blueprints/sandbox-step-1.png)

If the sandbox is already connected to your production organization, you can pick the source organization from the list.

Next, select the resources you want to import from your source organization. You can choose multiple resources here and preview the list of resources that will be imported.

Click on *Select Resources* once you're happy with your selection.

**Note that at this point, no changes will be made to your organization and you can still review the changes before applying!**

You will now see a preview of changes that will be made after applying:

![Sandbox Step 3](/img/blueprints/sandbox-step-3.png)

If you're happy with the changes. Click Approve & Install, and the changes will be applied to the organization you're logged into.
