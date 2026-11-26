---
title: Permissions
hide_title: true
sidebar_position: 3
description: "How to declare the permissions your App needs and how they are granted when the App is installed."
---

# Permissions

An App that reads or changes data in epilot needs permissions to do so. You declare the permissions your App needs per version. When an organization installs the App, epilot creates a role with exactly these permissions in that organization, and the App acts with that role.

An App that only shows its own interface or only talks to external systems does not need any permissions.

## Declaring permissions

Permissions are declared as a list of grants, for example "view contacts". You have two ways to set them.

### In the App configuration

In the App configuration you pick a role from your own organization, and its grants are copied into the App version.

1. In your organization's settings, open **Access Management** → **Roles** and create a role with the grants your App needs. Choose **User Role** as the role type.
2. Open your App and go to the **Permissions** section.
3. Select the role and click **Update**.

The grants are copied at the moment you click **Update**. If you change the role later, select it again and click **Update** to apply the change to the App version.

### In the App manifest

If you manage your App with the [CLI](/docs/apps/cli), list the grants under `permissions` in the [App manifest](/docs/apps/app-manifest). No role is needed.

## Permissions and versions

Permissions belong to a version. Once a version is public, its permissions are locked. To change them, [create a new version](/docs/apps/versioning#creating-a-new-version) and have it [reviewed](/docs/apps/publishing/verification-process).

Request only the permissions your App needs. They are checked during the review, and a customer sees them before installing.

## What happens on installation

When an organization installs your App and the installed version declares permissions, epilot creates a role in that organization named "Automatically created by App *your App name*". It carries the grants of the installed version. The role is removed again when the App is uninstalled.

The role you used to pick the grants stays in your own organization and is not shared with anyone.

## Using the permissions

Your App receives a short-lived access token that carries its permissions. Use it to call the epilot APIs on behalf of the installation.

| Where your code runs | How it gets the token |
| --- | --- |
| [Custom Workflow Action](/docs/apps/components/custom-action) | Sent as the `x-epilot-token` header of the request to your endpoint. Only sent when the App declares permissions. |
| [Functions](/docs/apps/functions/overview) | Functions run with a token that carries the App's permissions. |

Components that render inside epilot, such as journey blocks and custom pages, act as the signed-in user and do not use the App's permissions.
