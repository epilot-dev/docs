---
sidebar_position: 1
---

# Blueprint Pipelines (Sandbox Solution)

A Sandbox solution for customers who wish to safely test epilot configuration in a sandbox environment and promote their changes to their production organization in a controlled fashion using an automated Pipeline.
This solution introduces easy-to-use *Pipelines*, built on the technical foundation of our currently being developed Blueprints Self Service Solution, which provides a way to export and import configurations between epilot organizations.

:::info

This feature is currently in **beta** and fully functional. Expect ongoing improvements and new capabilities in upcoming updates.

:::


![Blueprint Pipelines](/img/blueprints/pipelines.png)
<p align="center">
  <i>Figure 1: Blueprint Pipelines</i>
</p>


![Create Pipeline](/img/blueprints/connect-pipeline.png)
<p align="center">
  <i>Figure 2: Create a Pipeline by connecting an organisation</i>
</p>

### Supported Resources

The following resource configurations are supported currently:

- **Journeys**
  - Journey Launcher

- **Automations**
  - Webhooks*
  - Workflows
  - Email Templates
  - Document Templates

- **Products**
  - Prices
  - Taxes
  - Cross Sellable Products
  - Files (Images, Downloads, Availability)

- **Entity Mappings**
- **Entity Schemas***
  - Attributes
  - Groups
  - Capabilities
  - Headlines*

- **Taxonomies** (Purposes are included here)
  - Purposes
    - in Schema attributes
    - in Schema groups
    - in Schema root
    - Purposes assigned to entities
      - Email templates
      - Files
      - Products, prices, taxes
      - Automation action / Entity mapping

- **Workflows**
  - Closing Reasons
  - Automations
  - Journeys
  - Portal related configuration

- **Email Templates**
  - Files (Attachments) 
  - Journeys Linked in Template (Post Qualification Journey)
  - Custom Variables*

- **Files**
  - Document Templates  
  - Product Images
  - Email Attachments
  - Product Downloads 
  - Availability Files 
  - Address Suggestions on Journeys 

- **Designs***

---

### A Preview of installing supported resources

![Tree of resources being installed](/img/blueprints/import-resources-tree.png)
<p align="center">
  <i>Figure 3: List of resources being installed by the blueprint</i>
</p>

### Not Supported Resources (Upcoming)

- **Email Templates**
  - Custom Variables 

### Later

- [ ] Dashboards
- [ ] Saved Views (Table & Inbox)
- [ ] Portals
- [ ] Roles
- [ ] Families (Labels)

### Known Limitations*

1. Webhooks are included as part of automations, but created in incomplete state, waiting for the user to add a URL and auth configuration.
2. Installing full schemas can sometimes take a very long time.
3. Email Templates currently don’t include Custom Variables and cannot be exported independently.
4. Designs can be copied standalone, but the target organization’s default design is applied for installed Journeys.
5. Capabilities and Headlines are currently only exported when exporting full schema.
