---
sidebar_position: 3
title: Editing and synchronizing
hide_title: true
---

## Editing Blueprints 

After installation or creation, Blueprints can be adjusted. All changes are applied directly within the Blueprint overview.

---

### Changing Blueprint name

To change a Blueprint’s name, hover over it, click the pen icon, enter the new name, and confirm by clicking the checkmark icon.

![Edit Blueprint name](/img/blueprints/3-edit-blueprint-name.png)

---

### Adding Resources

- Click the **“Ressource hinzufügen”** button on the left.

- Follow the procedure for adding a resource, the same as when creating a Blueprint.

- For detailed instructions, see [Creating a Blueprint](/docs/blueprints/installing-a-blueprint#creation-of-custom-blueprint).


![Resources toc](/img/blueprints/3-resources-toc.png)

### Removing Resources

- In the Blueprint overview, select the resources you want to remove.

- Click **“Delete from this Blueprint”** to remove them.

:::info

Note: Resources removed from the Blueprint still exist in your organization. They are simply no longer a part of this Blueprint.

:::

![Remove resource](/img/blueprints/3-remove-resource.png)

---

### Actions

Blueprints offer a set of actions that allow you to manage and share them efficiently. The available actions can be accessed from the **top-right navbar** of the Blueprint overview.

![Actions](/img/blueprints/3-actions.png)

---

### Synchronize with another organization

- Transfer the Blueprint and its resources to other organizations you are associated with.

- For detailed instructions, see [Synchronizing Blueprints](#synchronizing-your-blueprint-with-another-org).

---

### Download

- Download the Blueprint by selecting **Actions → Download** in the top-right navbar and confirming the operation.

:::info

Note: This function is only available for custom Blueprints, not for those installed from the Marketplace.

:::

![Download](/img/blueprints/3-blueprint-download.png)

---

### Delete

- Remove the Blueprint by selecting Actions → Delete in the top-right navbar and confirming.

:::info

Note: Deleting a Blueprint does **not** delete the underlying resources in your organization. It only removes the grouping of those resources as part of the Blueprint.

:::

![Delete](/img/blueprints/3-blueprint-delete.png)

---

## Synchronizing your blueprint with another org

When a Blueprint has been created or installed in your sandbox, you can synchronize it with other organizations you are associated with. Synchronization means transfering configuration elements (resources) —such as journeys, automations, products, workflows, and entity schemas—from one tenant to another.

On the **Blueprints tab** all the Blueprints available in your organisation: both created and installed from a Marketplace, are listed in the “Blueprints” tab. The label in “Source” column will help you understand where each Blueprint is coming from.

![Installed blueprints tab](/img/blueprints/3-installed-blueprints-tab.png)

Clicking a table item opens a detailed view of the resources included in the Blueprint.

This page also allows you to easily manage all the resources involved with your blueprint.

![Installed blueprint page](/img/blueprints/3-installed-blueprint-page.png)

As of now, those resources only exist on the current **sandbox organization**, but after you are happy with the configuration, you can easily “[sync](#synchronizing-your-blueprint-with-another-org)” this blueprint with another org (typically, the associated **production organization**).

This will create a copy of this blueprint, together with the current state of each resource, and apply them on the selected destination org.

---

### The Synchronization Process

The process will look similar to the [blueprint installation process](/docs/blueprints/installing-a-blueprint):

Click on **“Actions → Synchronize”** on the top right corner.

![Actions](/img/blueprints/3-actions.png)

You will be directed to a screen that allows to select the destination org you wish to synchronize to, meaning - where do you wish to transfer your Blueprint to.

![Switch org screen](/img/blueprints/3-switch-org-screen.png)

Select your production org and click on “**Continue**”.

![Switch org screen selector](/img/blueprints/3-switch-org-screen-selector.png)

Now we will prepare the resources of your blueprint for synchronization.

Depending on the amount of resources, this may take from 1~5 min, after which you can click on “**Continue to destination organization**”.

![Continue to destination](/img/blueprints/3-continue-to-destination.png)

---

### Switching to the destination org

You will be prompted to switch the **destination org** to finish the syncing process, just click continue and you will be redirected there.

![Destination modal](/img/blueprints/3-destination-modal.png)

---

### Reviewing the resources impact


Now on the destination org, you will be able to review the impact that this blueprint will have on the resources of this org, just like in the [blueprint installation process](/docs/blueprints/installing-a-blueprint).

Just click on “See resources with their impact” to review it.


You will see what will be created denoted by **New**, and if some of those resources are already present on the destination org (that will happen if it’s not the first time syncing the blueprint), you will see either **No changes**,  “**Update**" or “**Delete**".

![Resources impact](/img/blueprints/3-resources-impact.png)

If everything is as expect you can now click on “Synchronize Blueprint” to finish the process.


---

And that’s it! 
You will be presented with the success page of the synchronization process, which will give you a link to see the instance of your blueprint in this destination org!

![Sync complete screen](/img/blueprints/3-sync-complete-screen.png)

You successfully synchronized your sandbox blueprint to your production org!

---

### Further editing the blueprint

Now you are able to edit and manage your Blueprint, for more details [click here](#editing-blueprints).

After that, if you need, you can sync those changes back to the sandbox.

For that, just repeat this process, but this time, starting from the blueprint overview page of the destination org.

:::info

We recommend experimenting with changes in the Sandbox and syncing to Production only when you are satisfied with the setup.

:::


![Installed blueprint page](/img/blueprints/3-installed-blueprint-page.png)


That also counts for the blueprint back in the sandbox: you can go back and continue to make changes and experiment by adding, removing or editing resources. Those changes will only be present on your sandbox until you click on “**Actions → Synchronize**” again.
