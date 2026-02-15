---
sidebar_position: 7
title: MFA, Passwordless & Passkeys
---

# MFA, Passwordless & Passkeys

epilot supports multiple authentication methods beyond username and password. Configure these per organisation to meet your security and compliance requirements.

## Authentication Options Overview

| Method | epilot 360 | Customer Portals | Status |
|---|---|---|---|
| Password + MFA (TOTP) | Supported | Supported | Generally available |
| Passwordless (magic link / OTP) | Supported | Supported | Generally available |
| Passkeys (WebAuthn / FIDO2) | Supported | — | Generally available |
| SSO (OIDC / SAML) | Supported | — | Generally available |

The default login experience on epilot 360 is **passwordless** — users are presented with an "Email me a sign-in link" button as the primary option. Password-based login, SSO, and passkeys are available as alternatives.

## Multi-Factor Authentication (MFA)

MFA adds a second verification step after password login. epilot supports TOTP (time-based one-time password) via authenticator apps such as Google Authenticator, Authy, or 1Password, as well as SMS-based MFA.

### How It Works

1. A user logs in with their email and password via [AWS Cognito](/docs/auth/authentication).
2. Cognito challenges the user for a TOTP or SMS code.
3. The user enters the code from their authenticator app or SMS.
4. On successful verification, Cognito issues OAuth 2.0 tokens.

### Enabling MFA for Your Organisation

Organisation administrators can enable MFA from **Organisation Settings > Security** in the epilot 360 app.

Two modes are available:

- **Optional** — individual users choose whether to enable MFA on their account.
- **Required** — all users in the organisation must set up MFA on their next login.

:::info

MFA is available on eligible [pricing tiers](https://www.epilot.cloud/en/pricing). The feature is controlled by the `security_multi_factor_auth` entitlement on your organisation.

:::

### User Setup

When MFA is enabled, users are prompted to configure it on their next login:

1. Open an authenticator app on your mobile device.
2. Scan the QR code displayed on the epilot login screen.
3. Enter the 6-digit code from the app to confirm setup.
4. On all future logins, you will be prompted for a TOTP code after entering your password.

The MFA status of each user is tracked via the `mfa_enabled` field on the [User API](/api/user).

### MFA on Customer Portals

Customer portals support an advanced MFA mode that sends a login code and magic link to the user's email after password entry. Portal administrators can enable this in portal settings under **Security > Multi-factor Authentication**.

## Passwordless Login

Passwordless login removes the need for a password entirely. Instead, users authenticate via a secure sign-in link or one-time code sent to their email address.

### epilot 360

Passwordless login is the **default login method** on epilot 360. When a user visits the login page, the primary action is "Email me a sign-in link".

1. The user enters their email address on the login screen.
2. A secure sign-in link is sent to their inbox.
3. The user clicks the link to complete authentication.

Users can switch to password-based login at any time via "Sign in with password". The login screen remembers the user's preferred method for future sessions.

Organisation administrators can enable or disable passwordless login from **Organisation Settings > Features**.

### Customer Portals

Passwordless login is also available for [customer portals](/docs/portals/customer-portal). Portal administrators can enable it in the portal configuration:

```json
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

## Passkeys (WebAuthn / FIDO2)

Passkeys allow users to sign in to epilot 360 using biometrics (fingerprint, face recognition) or hardware security keys, with no password or OTP required. epilot's passkey support is built on the FIDO2 / WebAuthn standard.

### How Passkeys Work

Passkeys use public-key cryptography. A private key is stored securely on the user's device, while a public key is registered with epilot. Authentication requires the user to verify their identity on their device — no shared secrets are transmitted.

epilot supports two passkey login flows:

- **Email-based flow** — the user enters their email, then authenticates with a passkey registered to their account.
- **Discoverable flow** — the user clicks "Sign in with passkey" without entering an email. The browser presents all available passkeys and resolves the user identity automatically.

### Registering a Passkey

Users can register passkeys from **My Account > Passkeys** in epilot 360:

1. Enter a friendly name for the passkey (e.g. "Work Laptop", "YubiKey").
2. Click **Register passkey**.
3. Complete the browser's WebAuthn prompt (fingerprint, face scan, or security key tap).
4. The passkey appears in the list and can be used for future logins.

Users can register multiple passkeys and delete them at any time.

### Enabling Passkeys for Your Organisation

Passkey login is controlled by a feature flag (`passkey_login`) on your organisation. Contact your account manager or epilot support to enable passkeys.

Once enabled, the "Sign in with passkey" button appears on the login screen alongside the passwordless and SSO options.

## Security Recommendations

For organisations with strict compliance requirements, we recommend the following configuration:

| Requirement | Recommended Setting |
|---|---|
| Baseline security | Enable optional MFA for all users |
| Regulatory compliance (e.g. ISO 27001) | Enforce required MFA org-wide |
| Modern passwordless experience | Enable passwordless login (default) |
| Phishing-resistant authentication | Enable passkeys for your organisation |
| Customer-facing portals | Enable passwordless login on portals |
| Enterprise SSO | Configure OIDC/SAML via [SSO](/docs/sso/single-sign-on) |

:::tip

Passkeys provide the strongest phishing resistance because no shared secret (password or OTP) is ever transmitted. Combined with SSO, this gives you a defence-in-depth authentication posture.

:::

## Configuration via API

Manage MFA and authentication settings programmatically:

- **User MFA status**: `mfa_enabled` field on the [User API](/api/user)
- **Portal auth settings**: `auth_settings` object on the [Portal API](/api/customer-portal)
- **SSO configuration**: [SSO](/docs/sso/single-sign-on) identity provider setup
- **Organisation settings**: [Organization API](/api/organization)

## See Also

- [Authentication](/docs/auth/authentication) — OAuth 2.0 login flow and Cognito basics
- [Token Types](/docs/auth/token-types) — comparison of all epilot token types
- [Access Tokens](/docs/auth/access-tokens) — long-lived tokens for integrations
- [SSO](/docs/sso/single-sign-on) — single sign-on with OIDC and SAML
- [Security Architecture](/docs/architecture/security) — platform security overview
