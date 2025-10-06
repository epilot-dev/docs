---
title: Blueprints
sidebar_position: 1
---

# Blueprints

[[API Docs](/api/blueprints)]
[[Marketplace](https://marketplace.epilot.cloud)]

:::info

Blueprints are currently in closed **BETA** only available to selected customers.

:::


Available through the **epilot Marketplace**, Blueprints allow companies to quickly launch and operate a wide variety of use cases with just a few clicks.

![Marketplace blueprints carousel](/img/blueprints/1-marketplace-carousel.png)

---



### Example Use Cases

A common example of a Blueprint is the sale of **heat pumps, PV systems, or electricity and gas tariffs.**

Here’s how it works in practice:
A customer applies through a predefined interactive form on your website. The request is captured in epilot, creating a lead for your agents team. Agents are notified immediately, and automated workflows (e.g., emails, task assignments) ensure the case is processed smoothly.

---

### Why Blueprints help you set up Use Cases faster

Setting up epilot from scratch requires configuring multiple resources. For example:

- **Customer entry points (Journeys)** on your website
- **Automations**, such as emails or notifications
- **Workflows** to define the process steps
- **Products** with all relevant details
- **Entity schemas and templates** to structure data; and many more

Configuring all these resources individually can be time-consuming. Since epilot already knows what good configurations look like, we provide predefined best practice setups as Blueprints.

A Blueprint is essentially a ready-to-use epilot configuration that combines these resources into one package. Each Blueprint is carefully orchestrated so that all components work seamlessly together.

---

### Benefits of Blueprints

- **Faster time-to-market**: introduce new products and use cases quickly without complex setup.
- **Reduced effort**: eliminate manual configuration by using pre-built best practices.

---

### Quality and expansion

- All Blueprints are **built, verified, and tested by epilot**, ensuring they meet industry standards and best practices.

- The epilot Marketplace is continuously updated with **new Blueprints and partner integrations.**

---

### Licensing & availability

Blueprints use features that require a **Professional** or **Enterprise** license.

If you are using a **Business** or **Starter** license, please contact your sales representative for further guidance.

---

### Installation and sandbox

Epilot Marketplace Blueprints can be installed only in a [sandbox environment](/docs/blueprints/intro#sandbox).

A sandbox is a safe testing space that allows you to validate configurations without affecting your production environment. Once the Blueprint has been installed and tested successfully, it can be synchronized into your production organization.

For step-by-step instructions, see the [Installation documentation](/docs/blueprints/installing-a-blueprint).

---

## Sandbox

A **Sandbox** provides the ability to safely test the epilot configuration in a separate tenant, away from the tenant used in daily business operations. Typical configurations include journeys along with their associated elements such as automations, products, workflows, or entity schemas. Once validated, these setups can be transferred to the desired tenant

A sandbox environment is the only place where Marketplace Blueprints can be installed. This ensures that all configurations are tested safely before being transferred to production.

---

### Sandbox activation

If you would like to use a sandbox but do not yet have one, please contact your Customer Success or Sales representative.

Alternatively, you can also request a  sandbox directly during the installation of a Blueprint.

![Wallbox B2C blueprint description page](/img/blueprints/1-wallbox-description.png)


---

### Sandbox set up for synchronizing between organizations

To transfer configurations between organizations (for example, from a sandbox to a production environment), you must have a user account with the **same email address** in both organizations. With this in place, the connection between the organizations is created automatically for that user, and the transfer process can be executed without additional setup. To learn how synchronize resources between your Sandbox and other Org [click here].

---

### Switching Between Organizations

:::tip

To make switching between organizations possible, invite your users to both organizations using the same email address. Then you can conveniently switch between organizations by clicking your initials in the bottom left corner.

:::

![Org Switcher](/img/blueprints/1-org-switcher.png)

---

:::note

**Technical Note**

Blueprints are implemented using official epilot Terraform SDK, available on [Terraform Registry](https://registry.terraform.io/namespaces/epilot-dev). A blueprint file is a zip file containing a terraform configurations that are imported through epilot APIs.

:::

