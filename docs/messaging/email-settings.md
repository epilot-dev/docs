---
sidebar_position: 1
---

# Email Settings

## Custom Email Domain

[[API Docs](/api/email-settings#tag/Domains)]
[[SDK](https://www.npmjs.com/package/@epilot/email-settings-client)]
[[Setup Docs](https://help.epilot.cloud)]

epilot supports sending emails from its default domain, but you can also bring your own subdomain. This lets you send and receive messages through epilot on behalf of your organization.

:::tip
We recommend having someone familiar with DNS records handle this integration.
:::

### Subdomain Delegation

The recommended approach is to delegate your subdomain to epilot. With delegation:

- epilot manages the subdomain entirely.
- Email sending and receiving work out of the box.
- The subdomain can also serve as a portal domain for end customers or installers. See the [portal domain setup guide](https://help.epilot.cloud) for details.

### Self-Managed Subdomain

If you prefer not to delegate full domain access, epilot provides a DNS configuration file containing 8 records required for email activation:

| Record Type | Count | Purpose |
|-------------|-------|---------|
| CNAME | 3 | DKIM signing |
| MX | 2 | Mail exchange |
| TXT | 3 | SPF (2) and DMARC (1) |

Contact [epilot support](mailto:support@epilot.cloud) to request the DNS configuration.

:::warning
Do not remove the DNS records after setup. Removing them breaks email sending and receiving.
:::

:::info
If you manage your own subdomain, epilot may occasionally ask you to update DNS records for security or deliverability reasons. This is not needed when the subdomain is delegated.
:::

### SPF, DMARC, and DKIM

When you delegate a subdomain, epilot creates all necessary MX and TXT records in an AWS-hosted zone:

- **SPF** (Sender Policy Framework) -- specifies which servers can send email for your domain.
- **DMARC** (Domain-based Message Authentication, Reporting and Conformance) -- sets an authentication policy and enables reporting.
- **DKIM** (DomainKeys Identified Mail) -- cryptographically signs outgoing emails.

These protocols verify sender identity and reduce the risk of phishing and spam. See the [AWS email authentication docs](https://docs.aws.amazon.com/ses/latest/dg/email-authentication-methods.html) for more detail.

### Custom Mail-From Domain

Per [AWS SES best practices](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html), the Mail-From domain should differ from the sender address. epilot configures the Mail-From domain as `mail.${subdomain}` to improve deliverability.

### Transport Security

All emails are transmitted over TLS by default via AWS SES, protecting message contents in transit.

### Attachment Scanning

epilot scans all email attachments using [AWS S3 VirusScan](https://github.com/widdix/aws-s3-virusscan) powered by the ClamAV engine. Malicious files are automatically deleted before delivery.

### Email Receiving

Incoming emails are processed via AWS SES receipt rules and stored as message entities with attachments organized under their parent threads. Each tenant's email data is fully isolated.

## Email Addresses

[[API Docs](/api/email-settings#tag/Settings)]
[[SDK](https://www.npmjs.com/package/@epilot/email-settings-client)]
[[Setup Docs](https://help.epilot.cloud)]

Configure specific email addresses within your subdomain for sending and receiving messages.
