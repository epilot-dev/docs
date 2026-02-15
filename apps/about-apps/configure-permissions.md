---
title: Permissions
hide_title: true
sidebar_position: 3
---

# Permissions

Learn how to configure permissions your App requires to function properly. When building an app for the epilot platform, you may need to request specific permissions to access certain features or data. This guide will help you understand how to configure these permissions effectively.

## What Are Permissions?
Permissions in epilot control access to various features and data within the platform. When you create an app, you can specify which permissions your app requires to function correctly. This ensures that users have the necessary access rights to use your app without encountering permission-related issues.

## How to Configure Permissions For Your App
To configure permissions for your app, you need to create a role in your own organization and specify which grants (permissions) this role should have. This role can then be assigned to users who will be using your app.

### Step 1: Create a Role
1. Go to the **Access Management** section of your epilot organization (under settings).
2. Navigate to the **Roles** tab.
3. Click on **New Role**.
4. Enter a name for the role (e.g., "App User Role").
5. Click **Save** to create the role.

:::info
A dedicated **App Role** type is coming soon. For now, please select the **User Role** for the role type.
:::

### Step 2: Configure Permissions
1. After creating the role, you will see a list of available permissions (grants).
2. Go to your App configuration in the epilot platform.
3. In the **Permissions** section, select the role you created in Step 1. and save the changes.

## How To Use Permissions in Your App

Once your App is installed, a role you specified is automatically created in the customer's organization. This role will have the permissions you configured in Step 2. 

Now every component has different options to access those permissions. For example the Custom Action component can access the permissions through the `x-epilot-token` header in the http request. This token contains the necessary information to authenticate and authorize the action being performed.

Check the specific component documentation for details on how to access permissions in your app.

## Supported Permissions by Component Type

| Component Type            | Permissions Supported |
|---------------------------|-----------------------|
| Custom Journey Block      | No                   |
| Portal Extension          | No                   |
| Custom Action  | Yes                   |