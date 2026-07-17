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

### Domain Setup

When you add a subdomain in epilot, the portal generates a DNS configuration containing the 8 records required to activate email. You add these records at your DNS provider, and epilot verifies them automatically once they propagate:

| Record Type | Count | Purpose |
|-------------|-------|---------|
| CNAME | 3 | DKIM signing |
| MX | 2 | Mail exchange |
| TXT | 3 | SPF (2) and DMARC (1) |

To set up your subdomain:

1. Open **Email Settings** in the portal and add your subdomain.
2. Copy the 8 generated DNS records shown for that subdomain.
3. Create each record at your DNS provider exactly as displayed.
4. Wait for DNS propagation -- epilot verifies the records and activates the subdomain automatically. Propagation can take up to 48 hours, though it is usually much faster.

Once verified, email sending and receiving are enabled for the subdomain.

:::warning
Do not remove the DNS records after setup. Removing them breaks email sending and receiving.
:::

### SPF, DMARC, and DKIM

The DNS records you add during setup configure the standard email authentication mechanisms:

- **SPF** (Sender Policy Framework) -- specifies which servers can send email for your domain.
- **DMARC** (Domain-based Message Authentication, Reporting and Conformance) -- sets an authentication policy and enables reporting.
- **DKIM** (DomainKeys Identified Mail) -- cryptographically signs outgoing emails.

These protocols verify sender identity and reduce the risk of phishing and spam. See the [AWS email authentication docs](https://docs.aws.amazon.com/ses/latest/dg/email-authentication-methods.html) for more detail.

### Custom Mail-From Domain

Per [AWS SES best practices](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html), the Mail-From domain should differ from the sender address. epilot configures the Mail-From domain as `mail.${subdomain}` to improve deliverability.

### Transport Security

By default, AWS SES uses **opportunistic TLS** when sending email. This means SES attempts to establish a secure TLS connection with the receiving mail server and, if the server advertises TLS support, delivers the message encrypted -- protecting its contents in transit.

If the receiving server does not support TLS, the message is still delivered, but over an unencrypted connection rather than being dropped. This prioritizes deliverability: emails always reach their destination, and they are encrypted whenever the recipient's server allows it.

### Sending IP Addresses

epilot sends outbound email through the following dedicated IP addresses:

| IP Address |
|------------|
| `54.240.88.116` |
| `54.240.88.117` |

If your organization (or a recipient's mail server) enforces IP-based filtering, allowlist these addresses to ensure emails sent from epilot are accepted. Mail servers that only permit known senders may otherwise reject or bounce messages originating from unrecognized IPs.

### Attachment Scanning

epilot scans all email attachments using [AWS S3 VirusScan](https://github.com/widdix/aws-s3-virusscan) powered by the ClamAV engine. Malicious files are automatically deleted before delivery.

### Email Receiving

Incoming emails are processed via AWS SES receipt rules and stored as message entities with attachments organized under their parent threads. Each tenant's email data is fully isolated.

## Email Addresses

[[API Docs](/api/email-settings#tag/Settings)]
[[SDK](https://www.npmjs.com/package/@epilot/email-settings-client)]
[[Setup Docs](https://help.epilot.cloud)]

Configure specific email addresses within your subdomain for sending and receiving messages.
