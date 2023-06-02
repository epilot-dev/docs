---
sidebar_position: 1
---

# Customer / Installer Portal

[[API Docs](/api/customer-portal)]
[[SDK](https://www.npmjs.com/package/@epilot/customer-portal-client)]
[[Setup Docs](https://help.epilot.cloud/hc/de/articles/4417739340050-Kundenportal-einrichten-epilot-360-)]

The portals enable seamless interaction between administrators and customers, offering a tailored and collaborative experience. Administrators have the power to configure the portal, including portal design, domain settings, email templates, customer permissions, and a lot others. End Customers & Installers, on the other hand, can access their entities, perform actions, and even search their entities based on configured entity identifiers.

- [Administrator Actions](#administrator-actions)
- [Customer / Installer Actions](#customer--installer-actions)

## Administrator Actions

[[API Docs](/api/customer-portal/#tag/ECP-Admin)]

Administrators play a crucial role in configuring and managing the portal. By defining domain configurations, administrators ensure that the portal is accessible on the desired URL. They can also create email templates for various processes, such as registration confirmation, password recovery, and invitation emails.

Additionally, administrators can define granular permissions for the portals individually, granting or restricting access to specific features, entities, or actions. This ensures that customers/installers have appropriate privileges based on their roles and responsibilities. This streamlined approach enhances usability while maintaining the necessary security measures. 

Furthermore, administrators can configure entity identifiers, allowing customers to search for specific entities based on the configured fields. This empowers administrators to tailor the portal to their business needs, providing customers with efficient ways to access and retrieve information. Additionally, administrators can set up entity actions, granting customers/installers the ability to participate in journeys and provide updates and information related to entities like opportunities, contracts, and orders. This enhances collaboration and streamlines service processes within the portal.

## Customer / Installer Actions

[[API Docs](/api/customer-portal/#tag/ECP)]

Customers/Installers benefit from the APIs by gaining convenient access to the portal and their respective entities. They can log in and seamlessly navigate through the portal to view and interact with their entities. With the help of configured entity identifiers, customers can easily search for specific entities based on relevant fields, saving time and effort in finding the desired information and avoid contacting the organization.

One of the key capabilities for customers/installers is the ability to trigger service processes directly from the portal. Customers/Installers can initiate these processes by making direct data changes to the entities they have access to, based on the permissions granted to them by administrators. This empowers customers/installers to actively engage and participate in the service processes, saving time and facilitating smooth communication between the customers and the organization.

Here are a few examples of actions that customers/installers can perform through the portal:

1. Adding Additional Information to an Opportunity: As an installer, s[he] can provide additional information about a photovoltaic (PV) panel to an existing opportunity. By leveraging the "edit" permissions granted by administrators, the installer can update the opportunity with specific details, such as technical specifications or pricing options related to the PV panel. This ensures that the organization has the most up-to-date and accurate information to further the opportunity.

2. Changing the Delivery Address within a Contract: Customers, such as end-users, may need to update their delivery address for an ongoing contract. Through the portal, they can easily modify the contract's delivery address, ensuring that the products or services are delivered to the correct location. This flexibility allows customers to manage their contracts efficiently and make necessary adjustments as their circumstances change.

3. Adding New Information to a Contact: Installers may acquire new qualifications or certifications that are relevant to their contact information. By accessing their contact details through the portal, they can add this new information, such as their gained education or training, to ensure that the organization has the most accurate and complete profile. This enables the organization to stay informed about the installer's updated qualifications and provide tailored services based on their expertise.

Overall, these APIs foster a collaborative environment where administrators configure and manage the portal, while customers/installers enjoy a seamless and personalized experience, accessing, and interacting with their entities efficiently.
