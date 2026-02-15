---
sidebar_position: 8
title: Passwordless Login
---

# Passwordless Login

Passwordless login removes the need for a password entirely. Users authenticate via a secure sign-in link or one-time code sent to their email address.

Since 2025, passwordless login is the **default authentication method** on epilot 360, replacing password-based login as the primary experience. This reflects industry best practices -- eliminating passwords removes the most common attack vector (credential theft and reuse) while providing a simpler login experience.

## epilot 360

When a user visits the epilot 360 login page, the primary action is "Email me a sign-in link":

1. The user enters their email address on the login screen.
2. A secure sign-in link is sent to their inbox.
3. The user clicks the link to complete authentication.

Users can switch to password-based login at any time via "Sign in with password". The login screen remembers the user's preferred method for future sessions.

Organisation administrators can manage passwordless login from **Organisation Settings > Features**.

## Customer Portals

Passwordless login is also available for [customer portals](/docs/portals/customer-portal). Portal administrators can enable it in the portal configuration:

```json title="Portal auth settings"
{
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    }
  }
}
```

When enabled, portal users receive a one-time code or magic link instead of entering a password.

:::tip
Passwordless login and advanced MFA are mutually exclusive on portals. Enabling one automatically disables the other.
:::

## Security Considerations

Passwordless login via email is significantly more secure than passwords for most organizations because it eliminates credential reuse and phishing of static credentials. However, for the highest level of phishing resistance, consider combining passwordless with [Passkeys](/docs/auth/passkeys) or [SSO](/docs/sso/single-sign-on).

## Configuration via API

- **Portal auth settings**: `auth_settings` object on the [Portal API](/api/customer-portal)
- **Organisation settings**: [Organization API](/api/organization)

## See Also

- [Multi-Factor Authentication](/docs/auth/mfa) -- TOTP and SMS second factor
- [Passkeys](/docs/auth/passkeys) -- phishing-resistant biometric and hardware key authentication
- [SSO](/docs/sso/single-sign-on) -- federated login with corporate identity providers
- [Authentication](/docs/auth/authentication) -- OAuth 2.0 login flow
