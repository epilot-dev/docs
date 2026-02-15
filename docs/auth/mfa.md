---
sidebar_position: 7
title: Multi-Factor Authentication
---

# Multi-Factor Authentication (MFA)

MFA adds a second verification step after password login, significantly reducing the risk of account compromise from stolen credentials.

epilot supports TOTP (time-based one-time password) via authenticator apps such as Google Authenticator, Authy, or 1Password, as well as SMS-based MFA.

:::tip
For the strongest protection against phishing, consider [Passkeys](/docs/auth/passkeys) or [SSO](/docs/sso/single-sign-on) instead of or in addition to MFA. Passkeys and SSO eliminate shared secrets entirely, providing phishing-resistant authentication.
:::

## How It Works

1. A user logs in with their email and password via [AWS Cognito](/docs/auth/authentication).
2. Cognito challenges the user for a TOTP or SMS code.
3. The user enters the code from their authenticator app or SMS.
4. On successful verification, Cognito issues OAuth 2.0 tokens.

## Enabling MFA for Your Organisation

Organisation administrators can enable MFA from **Organisation Settings > Security** in the epilot 360 portal.

Two modes are available:

- **Optional** -- individual users choose whether to enable MFA on their account.
- **Required** -- all users in the organisation must set up MFA on their next login.

## User Setup

When MFA is enabled, users are prompted to configure it on their next login:

1. Open an authenticator app on your mobile device.
2. Scan the QR code displayed on the epilot login screen.
3. Enter the 6-digit code from the app to confirm setup.
4. On all future logins, you will be prompted for a TOTP code after entering your password.

The MFA status of each user is tracked via the `mfa_enabled` field on the [User API](/api/user).

## MFA on Customer Portals

Customer portals support an advanced MFA mode that sends a login code and magic link to the user's email after password entry. Portal administrators can enable this in portal settings under **Security > Multi-factor Authentication**.

## Configuration via API

- **User MFA status**: `mfa_enabled` field on the [User API](/api/user)
- **Organisation settings**: [Organization API](/api/organization)

## See Also

- [Passwordless Login](/docs/auth/passwordless) -- sign-in links without passwords
- [Passkeys](/docs/auth/passkeys) -- phishing-resistant biometric and hardware key authentication
- [SSO](/docs/sso/single-sign-on) -- federated login with OIDC and SAML
- [Authentication](/docs/auth/authentication) -- OAuth 2.0 login flow
