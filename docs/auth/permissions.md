---
sidebar_position: 4
---

# Permissions

[[API Docs](/api/permissions)]
[[SDK](https://www.npmjs.com/package/@epilot/permissions)]

Epilot implements flexible role-based access control using influenced by the design of AWS IAM policies.

The epilot Permissions system consists of these basic ideas:

- **Users** may be assigned **Roles**
- **Roles** are collections of **Grants**
- **Grants** are used to evaluate whether the user has permissions to perform actions and access resources

## Usage

To use the epilot Permissions API, we provide a package that implements both fetching the user's roles and grants as well as evaluating them.

Example:

```js
import { tokenIsPermitted } from "@epilot/permissions";

const isPermitted = await tokenIsPermitted(token, "myaction");
```

Readme link: [@epilot/permissions](https://www.npmjs.com/package/@epilot/permissions)

## Example Role

```json
// Example manager role in org 66
{
  "id":"66:manager",
  "name":"Manager",
  "slug":"manager",
  "organization_id":"66",
  "type":"user_role",
  "grants":[
    {
      "action":"entity:*",
      "effect": "allow"
    },
    {
      "action":"users:*",
      "effect": "allow"
    },
    {
      "action":"partners:*",
      "effect": "allow"
    },
    {
      "action":"legacy_products:*",
      "effect": "allow"
    }
  ]
```

## Grants Evaluation Logic

A lot of this will be familiar to AWS IAM users. This is "heavily inspired" by their design

- **Rule 1**: Tenants are isolated into Organizations. Roles may only grant access to resources within the tenant Organization.
- **Rule 2**: The owner role inherits all grants from the organization. (hardcoded role, present in all orgs)
- **Rule 3**: By default roles have no grants until they are defined. (Principle of least privilege)
- **Rule 4**: When evaluating all role and organization grants are added to the grant pool.
- **Rule 5**: At least one organization role grant and at least one user role grant must be matched to pass the evaluation. Neither must contain a matched explicit deny.
- **Rule 6**: An evaluation will try to match all available grants where a given action and resource matches. Wildcard expressions are supported.
- **Rule 7**: Role hierarchies can be defined where child roles are constrained by parent roles. Both parent and child must grant permission for access to be allowed. Parent roles that are not directly assigned to a user are not evaluated independently.

## Organization Root Role

In addition to user roles, each user in the organization also has a mandatory root role when acting in the organization.

The organization root role defines the maximum set of grants any user in that organization may receive.

This role is only accessible to epilot admins and is controlled by the pricing tier of that organization.

## Role Hierarchies

Roles can form hierarchies where a role may have a **parent role**. This enables more sophisticated permission management by allowing child roles to be constrained by their parent roles.

### Parent-Child Role Relationships

When a role has a parent role defined:
- The **child role** defines the specific permissions granted to the user
- The **parent role** acts as a constraint, defining the maximum permissions the child can have
- **Both the parent AND child must grant permission** for access to be allowed
- If either the parent or child denies access, the entire role pair denies access

This prevents permission escalation and ensures that child roles cannot exceed the scope defined by their parent roles.

### Use Cases

**Example: Department Manager with Limited Scope**
```json
{
  "id": "66:sales-manager",
  "name": "Sales Manager",
  "slug": "sales-manager",
  "type": "user_role",
  "organization_id": "66",
  "parent_role": "66:manager",
  "grants": [
    {
      "action": "entity:view",
      "resource": "opportunity:*"
    },
    {
      "action": "entity:edit",
      "resource": "opportunity:*"
    }
  ]
}
```

In this example:
- The parent role (`manager`) defines broad permissions
- The child role (`sales-manager`) narrows access to only opportunities
- The user can only view/edit opportunities that the parent role also permits

## Links

- Permissions package: https://www.npmjs.com/package/@epilot/permissions
