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


**Blueprints** are an essential feature to package end-to-end epilot configuration into easily installable packages.

![Blueprints](/img/blueprints/blueprint-details.png)

Blueprints are intended to simplify the setup of epilot and radically reduce the time and effort required to go to market with specific industry use cases using the latest epilot features and best practices.

These packages can include a wide variety of connected epilot resources such as *[Products](/docs/entities/schemas-list#product), [Journeys](/docs/journeys/journey-builder), [Automations](/docs/automations/overview), [Workflows](/docs/workflows/overview), [Entity Attributes](/docs/entities/attributes), [Purposes](#), [Labels](#), [Email templates](/docs/entities/schemas-list#email_template) and [Document templates](/docs/files/document-generation)*.

Pre-made Blueprints incorporating latest industry best practices can be installed from the epilot Marketplace. Some examples:

- [Heat Pump Sales](https://marketplace.epilot.cloud/blueprints/edl-heat-pump)
- [Commodity Sales](https://marketplace.epilot.cloud/blueprints/commodity-b2c)
- [Solar System Installations](https://marketplace.epilot.cloud/blueprints/solar-b2c)
- [Registration of PV Systems](https://marketplace.epilot.cloud/blueprints/registration-of-pv-systems)
- [Registration of Grid Connections](https://marketplace.epilot.cloud/blueprints/hausanschluss-fernwarme)

:::note

**Technical Note**

Blueprints are implemented using official epilot Terraform SDK, available on [Terraform Registry](https://registry.terraform.io/namespaces/epilot-dev). A blueprint file is a zip file containing a terraform configurations that are imported through epilot APIs.

:::

