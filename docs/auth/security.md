---
sidebar_position: 0
title: Security Architecture
---

# Security Architecture

epilot runs on AWS with security enforced at every layer: multi-tenant isolation, authentication, authorization, encryption, and API protection.

:::info
epilot is **ISO 27001:2022 certified** and undergoes regular penetration testing by independent security firms. The security strategy aligns with OWASP ASVS and the AWS Well-Architected Framework.
:::

## Multi-Tenant Architecture

epilot is a multi-tenant platform where each organization operates in a securely isolated environment. Tenant isolation is enforced at multiple levels so one organization's data is never accessible to another.

### Per-Organization User Pools

Each tenant organization gets its own **AWS Cognito User Pool** for identity management:

- **Complete identity isolation** — users, credentials, and authentication policies are scoped to a single organization
- **Independent SSO and MFA configuration** — each organization configures Single Sign-On and Multi-Factor Authentication via Organization Settings
- **Dedicated token issuance** — OAuth 2.0 tokens are issued per-organization with the organization ID embedded in token claims

### Organization-Scoped API Routing

Every API call executes in the context of a single organization. The caller's JWT contains the source organization ID, which the API Gateway authorizer validates and passes to backend microservices.

For cross-organization scenarios (such as partner data sharing), the `x-epilot-org-id` header specifies a target organization. When present:

- The acting organization context switches to the target organization
- Permission checks evaluate against the target organization's grants
- The caller must have explicit sharing permissions from the target organization

When omitted, the user's home organization from their token applies.

### Data Isolation

Backend services enforce tenant boundaries at the data layer:

- **Database queries** are always scoped to the acting organization ID
- **Elasticsearch indices** use organization-level isolation for entity search
- **S3 storage** uses organization-prefixed paths for file and document storage
- **DynamoDB tables** use organization ID as part of the partition key

## Authentication

epilot uses [OAuth 2.0](https://oauth.net/2/) for authentication via AWS Cognito. See [Authentication](/docs/auth/authentication) for full details.

### Authentication Flow

1. **User login** — The user authenticates against their organization's Cognito User Pool via passwordless link (default), passkey, password, or SSO
2. **Token issuance** — Cognito issues a JWT access token (valid 60 minutes) and a refresh token
3. **API authorization** — The access token is passed in the `Authorization: Bearer <token>` header on every API request
4. **Token refresh** — Clients use the refresh token to obtain new access tokens without re-authentication

### Token Types

epilot supports multiple token types for different use cases:

| Token Type | Lifetime | Use Case |
|---|---|---|
| **OAuth Access Token** | 60 minutes | Interactive user sessions |
| **Access Token (Long-lived)** | No expiration | Third-party integrations, automation |
| **Publishable Token** | No expiration | Client-side embedding (journeys, portals) |

Long-lived Access Tokens inherit the creating user's roles and permissions, and can be revoked at any time. Publishable Tokens are restricted to a narrow set of public-facing operations. See [Access Tokens](/docs/auth/access-tokens) and [Token Types](/docs/auth/token-types) for details.

### Authentication Methods

epilot supports multiple authentication methods, configurable per organization:

| Method | Description |
|---|---|
| **Passwordless (default)** | Sign-in links sent via email — the default login experience on epilot 360 |
| **Passkeys (WebAuthn/FIDO2)** | Biometric or hardware key authentication with phishing-resistant public-key cryptography |
| **Password + MFA** | Traditional password with TOTP or SMS second factor |
| **SSO (OIDC/SAML)** | Federated login via corporate identity providers (Azure AD, Okta, Google) |

Organizations enable and combine these methods in **Organization Settings**. See [MFA](/docs/auth/mfa), [Passwordless Login](/docs/auth/passwordless), [Passkeys](/docs/auth/passkeys), and [SSO](/docs/sso/single-sign-on) for configuration details.

## Authorization

epilot uses a layered authorization model: the API Gateway validates requests at the edge, and application-level code enforces fine-grained permissions. See [Authorization](/docs/auth/authorization) for implementation details.

### API Gateway Authorizer

All requests pass through a **Lambda authorizer** on the API Gateway. The authorizer:

1. Validates the bearer token (JWT signature, expiration, issuer)
2. Extracts identity claims (user ID, organization ID, roles)
3. Passes validated claims to backend microservices as request context
4. Rejects requests with invalid or expired tokens before they reach application code

### Role-Based Access Control (RBAC)

epilot implements a flexible RBAC system inspired by AWS IAM. See [Permissions](/docs/auth/permissions) for full documentation.

The permission model has three core concepts:

- **Users** are assigned one or more **Roles**
- **Roles** contain collections of **Grants**
- **Grants** define allowed (or explicitly denied) actions on resources

#### Grant Evaluation Rules

1. **Tenant isolation** — Roles only grant access to resources within their organization
2. **Owner role** — A built-in `owner` role inherits all organization grants (present in every organization)
3. **Least privilege** — Roles have no grants by default
4. **Dual-role matching** — Both the organization root role grant **and** a user role grant must match for access
5. **Explicit deny** — An explicit deny in any matched grant overrides all allows
6. **Wildcard support** — Actions and resources support wildcards (e.g., `entity:*`)

#### Organization Root Role

Each organization has a mandatory root role that defines the **maximum permission set** any user in that organization can receive. The organization's subscription tier determines this role. User roles can only grant permissions up to the ceiling set by the root role.

<details>
<summary>Example role definition</summary>

```json title="Manager role with explicit deny"
{
  "id": "66:manager",
  "name": "Manager",
  "organization_id": "66",
  "type": "user_role",
  "grants": [
    { "action": "entity:*", "effect": "allow" },
    { "action": "entity:*", "resource": "partner:*", "effect": "deny" }
  ]
}
```

This role allows all entity actions but explicitly denies access to partner-owned entities.

</details>

## Encryption

### Encryption at Rest

All data stored in epilot is encrypted at rest using AWS-managed encryption:

- **Amazon S3** — Server-side encryption with AWS KMS (SSE-KMS) with service-specific keys
- **Amazon DynamoDB** — Encryption at rest enabled by default using AWS-owned keys
- **Amazon Elasticsearch / OpenSearch** — Node-to-node encryption and encryption at rest enabled
- **Amazon RDS / ClickHouse** — Encrypted storage volumes

**AWS Key Management Service (KMS)** manages encryption keys with automatic rotation and IAM-based access controls.

### Encryption in Transit

All data in transit uses TLS encryption:

- **API endpoints** — All epilot APIs are served exclusively over HTTPS (TLS 1.2+)
- **Inter-service communication** — Internal service-to-service calls use encrypted channels within the AWS network
- **Database connections** — Connections to data stores use TLS encryption
- **CDN delivery** — Static assets are served via Amazon CloudFront with enforced HTTPS

## API Protection

### Rate Limiting

Rate limiting operates at multiple levels:

- **API Gateway throttling** — Per-API request quotas and burst limits
- **Lambda concurrency limits** — Backend execution is bounded by configurable concurrency settings
- **CloudFront rate limiting** — IP-based and path-based rate limiting rules at the CDN edge
- **WAF rate rules** — AWS WAF enforces request rate limits with automatic blocking of offending IPs

### DDoS Protection

Multi-layered DDoS defense:

- **AWS Shield** — Network and transport layer (L3/L4) protection for all AWS resources
- **AWS WAF** — Application layer (L7) protection with managed rule sets including:
  - Managed DDoS mitigation rules
  - IP reputation lists
  - Geo-blocking for regions outside the service area
  - Bot detection and management
- **CloudFront distribution** — All public-facing endpoints (both frontend SPAs and backend APIs) are served through CloudFront, providing a globally distributed edge layer that absorbs volumetric attacks
- **Origin access controls** — Direct access to origin servers (S3 buckets, API Gateways) is restricted so that only CloudFront can reach them

### Web Application Firewall (WAF)

AWS WAF protects all public-facing endpoints against common web attack vectors:

- SQL injection
- Cross-site scripting (XSS)
- Known vulnerability exploitation
- Malicious bot traffic

WAF rules are continuously tuned based on traffic patterns and threat intelligence.

## API Key Security

epilot distinguishes between two categories of API credentials:

- **Access Tokens** — Secret, long-lived tokens that carry the creating user's full permissions. Keep confidential; use for server-to-server integrations. See [Access Tokens](/docs/auth/access-tokens).
- **Publishable Tokens** — Safe to embed in client-side code (journey embed scripts, portal widgets). Restricted to public operations and cannot access sensitive data. See [Token Types](/docs/auth/token-types).

:::warning
Use the most restrictive token type for your use case. Publishable Tokens belong in client-side code; Access Tokens belong strictly server-side.
:::

## Infrastructure Security

epilot runs entirely on **AWS** in the **EU (Frankfurt, `eu-central-1`) region**:

- **Serverless architecture** — Lambda-based microservices eliminate the need to manage and patch servers
- **Infrastructure as Code** — All infrastructure is provisioned through CloudFormation and Terraform, enabling version-controlled, auditable infrastructure changes
- **Centralized logging** — Application logs, access logs, and security events are aggregated in Datadog and AWS CloudTrail for monitoring and incident response
- **Automated security scanning** — CI/CD pipelines include SAST, dependency vulnerability scanning, and secret detection powered by [Corgea](https://corgea.com)
- **Automated remediation** — Corgea continuously monitors all repositories and automatically opens pull requests to fix detected vulnerabilities and keep dependencies up to date, reviewed and merged by the engineering team
- **Penetration testing** — Independent third-party penetration tests are conducted regularly against all platform components

## Supply Chain Security

### Software Bill of Materials (SBOM)

epilot maintains a Software Bill of Materials (SBOM) for its platform components in standard formats (CycloneDX / SPDX). The SBOM is available on request for supply chain security assessments and compliance purposes.

To request an SBOM, contact your epilot account manager or the epilot support team.

### Automated Vulnerability Management

epilot uses **[Corgea](https://corgea.com)** to automate vulnerability and dependency management across all service repositories:

- **SAST (Static Application Security Testing)** — Corgea continuously scans source code for security weaknesses using static analysis, integrated directly into the CI/CD pipeline
- **Automated fix PRs** — When vulnerabilities are detected, Corgea automatically opens pull requests with fixes that are reviewed and merged by the engineering team — no manual triage required
- **Dependency updates** — Outdated or vulnerable dependencies are flagged and patched through automated PRs, minimizing exposure to known CVEs across the supply chain

## Backup and Recovery

### Scope

epilot maintains technical and organizational measures to enable the recovery of the platform, its core functionalities, and customer data in the event of failures, operational errors, or infrastructure incidents. Recovery capabilities differ between (a) core transactional data and platform functionality and (b) analytical and derived services.

### Core Data Protection (Point-in-Time Recovery)

Customer master data and operational records stored in epilot databases are protected using continuous point-in-time recovery (PITR).

- Data can be restored to a specific point in time within the retention window.
- For accidental deletions or data corruption, the effective Recovery Point Objective (RPO) is approximately minutes.

The target Recovery Time Objective (RTO) for core platform functionality is up to 10 hours, depending on the nature of the incident.

### System-Wide Incident Recovery

In the event of major incidents affecting infrastructure, deployments, or an entire cloud region, recovery may require restoration of databases, reconfiguration of services, and reprocessing of data.

- Core platform functionality will be prioritized as described above.
- Analytical and derived services (like dashboards, datalake, webhook monitoring, audit logs, and reporting) require additional reconstruction steps and may have an RTO of up to 24 hours.

### Platform Configuration Backups

epilot maintains regular builds and backups of application code and system configuration to enable restoration of the software and its functionalities.

### Data Retention and Deletion

End customer data shall be retained for a period of 90 days following termination of the contract in accordance with the agreement (cf. GTC SS 6.4). Such end customer data may be deleted by the contractual partner at any time.

### Limitations

Recovery objectives represent targets and depend on the failure scenario, data volume, and required reprocessing steps. Objectives do not apply in cases of force majeure or external dependencies outside epilot's control.

## Data Protection & International Transfers

epilot processes customer data exclusively within the European Union and maintains comprehensive safeguards for any sub-processors with non-EU parent companies.

### Data Processing Location

All primary data processing occurs in the **AWS EU (Frankfurt, `eu-central-1`) region**. Customer data — including entities, files, communications, and workflow state — is stored and processed within the EU.

### Sub-Processors

epilot engages the following sub-processors for platform operations. Each sub-processor has a **Data Processing Agreement (DPA)** in accordance with Article 28 GDPR.

| Sub-Processor | Purpose | Data Location | Parent Company |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructure, compute, storage, databases | EU (Frankfurt) | USA |
| **Elastic Cloud** | Entity search and indexing | EU (Netherlands) | USA |
| **Datadog** | Infrastructure monitoring, logging, APM | EU (Netherlands) | USA |
| **FullStory** | Session analytics for product improvement | EU (Germany) | USA |
| **ConvertAPI** | Document format conversion | EU (Lithuania) | Lithuania |

### International Data Transfer Safeguards

For sub-processors with parent companies outside the EU, epilot implements the following safeguards in accordance with GDPR Chapter V:

**Standard Contractual Clauses (SCCs)**

All sub-processors with US parent companies have executed **EU Standard Contractual Clauses** pursuant to Article 46(2)(c) GDPR. SCCs provide contractual guarantees that personal data transferred outside the EU receives equivalent protection to EU data protection standards.

**EU-US Data Privacy Framework**

Where applicable, sub-processors participate in the **EU-US Data Privacy Framework** (DPF), providing an additional adequacy mechanism recognized by the European Commission. FullStory is an active participant in the EU-US DPF.

**Technical and Organizational Measures**

Beyond contractual safeguards, epilot implements technical measures to minimize data exposure:

- **Data residency enforcement** — All sub-processors are contractually required to process data within their EU data centers
- **Access restrictions** — Sub-processor support access from non-EU locations is either disabled or restricted to anonymized/aggregated data
- **Data minimization** — Only necessary data is shared with each sub-processor

### Monitoring & Analytics Data Handling

For monitoring and analytics services specifically:

**Datadog**
- Processes infrastructure metrics, logs, and application performance data
- Configured to use EU (Netherlands) data center exclusively
- Sensitive fields (PII) are redacted at the application level before transmission
- No end-customer personal data is included in monitoring payloads

**FullStory**
- Session replay captures user interactions for UX improvement
- **Privacy-first configuration**: PII fields are masked/excluded from recordings using CSS selectors and attribute blocklists
- Data is processed in the EU (Germany) data center
- Recordings exclude sensitive form fields (passwords, payment details, personal identifiers)

### Transfer Impact Assessment

epilot maintains a **Transfer Impact Assessment (TIA)** evaluating the legal framework in third countries where sub-processor parent companies are headquartered. The assessment considers:

- Whether the sub-processor can access EU-stored data from non-EU locations
- Applicable foreign government access laws
- Technical measures preventing unauthorized access
- Contractual commitments from sub-processors

The current assessment concludes that the combination of EU data residency, SCCs, DPF certification (where applicable), and technical access controls provides adequate protection equivalent to GDPR standards.

### Documentation Requests

For compliance purposes, epilot can provide:

- **Sub-processor list** — Current list of all sub-processors with DPA status
- **DPA copies** — Data Processing Agreements with specific sub-processors
- **Transfer Impact Assessment** — Detailed TIA documentation
- **Technical measures documentation** — Configuration details for data minimization and access controls

Contact your epilot account manager or [support@epilot.cloud](mailto:support@epilot.cloud) to request compliance documentation.

## Compliance

epilot maintains the following certifications and compliance measures:

- **ISO 27001:2022** — Certified information security management system
- **GDPR compliance** — Data processing agreements with all sub-processors, data minimization practices, lawful transfer mechanisms (SCCs, DPF), and right-to-deletion mechanisms via [Data Governance](/docs/data-governance/overview)
- **Regular security audits** — Ongoing internal and external assessments informed by OWASP ASVS standards
- **Security taskforce** — A dedicated cross-functional team that triages and resolves security findings
- **Penetration testing** — Annual third-party penetration tests with remediation tracking

## Further Reading

- [Authentication](/docs/auth/authentication) — OAuth 2.0 login, Cognito User Pools, SDK usage
- [MFA](/docs/auth/mfa) -- Multi-factor authentication with TOTP and SMS
- [Passwordless Login](/docs/auth/passwordless) -- Email-based sign-in links (default since 2025)
- [Passkeys](/docs/auth/passkeys) -- Phishing-resistant biometric and hardware key authentication
- [SSO](/docs/sso/single-sign-on) — Single sign-on with OIDC and SAML identity providers
- [Authorization](/docs/auth/authorization) — JWT validation, API Gateway authorizer, Permissions API
- [Access Tokens](/docs/auth/access-tokens) — Creating and managing long-lived API tokens
- [Token Types](/docs/auth/token-types) — Comparison of access tokens vs. publishable tokens
- [Permissions](/docs/auth/permissions) — RBAC model, grant evaluation, role management
- [Data Governance](/docs/data-governance/overview) — Automated contact deletion and data lifecycle management
