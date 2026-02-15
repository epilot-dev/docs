---
sidebar_position: 4
---

# Permissions

[[API Docs](/api/permissions)]
[[SDK](https://www.npmjs.com/package/@epilot/permissions)]

epilot implements flexible role-based access control (RBAC) inspired by the design of AWS IAM policies.

The permissions system has three core concepts:

- **Users** may be assigned **Roles**
- **Roles** are collections of **Grants**
- **Grants** are used to evaluate whether the user has permissions to perform actions and access resources

## Usage

The [`@epilot/permissions`](https://www.npmjs.com/package/@epilot/permissions) package handles fetching a user's roles and grants and evaluating them against requested actions:

```js
import { tokenIsPermitted } from "@epilot/permissions";

const isPermitted = await tokenIsPermitted(token, "myaction");
```

## Example Role

```json
// Example manager role in org 66
{
  "id": "66:manager",
  "name": "Manager",
  "slug": "manager",
  "organization_id": "66",
  "type": "user_role",
  "grants": [
    { "action": "entity:*", "effect": "allow" },
    { "action": "users:*", "effect": "allow" },
    { "action": "partners:*", "effect": "allow" },
    { "action": "legacy_products:*", "effect": "allow" }
  ]
}
```

## Grants Evaluation Logic

The evaluation model follows AWS IAM conventions:

- **Rule 1**: Tenants are isolated by organization. Roles only grant access to resources within their own organization.
- **Rule 2**: The `owner` role (present in all orgs) inherits all grants from the organization.
- **Rule 3**: Roles have no grants by default (principle of least privilege).
- **Rule 4**: All role and organization grants are pooled during evaluation.
- **Rule 5**: At least one organization role grant and at least one user role grant must match. Neither may contain an explicit deny.
- **Rule 6**: Evaluation matches all available grants against the requested action and resource. Wildcard expressions (e.g. `entity:*`) are supported.

## Organization Root Role

Every user in an organization automatically has a mandatory root role. This root role defines the maximum set of grants any user in the organization may receive.

The root role is managed by epilot admins and controlled by the organization's pricing tier.

## See Also

- [Authorization](/docs/auth/authorization) — how epilot authorizes API requests
- [Token Types](/docs/auth/token-types) — comparison of all epilot token types
- [`@epilot/permissions`](https://www.npmjs.com/package/@epilot/permissions) — permissions evaluation package
