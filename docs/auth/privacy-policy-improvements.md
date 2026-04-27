---
sidebar_position: 99
title: Privacy Policy Improvements (Proposal)
draft: true
---

# Privacy Policy Improvements Proposal

This document proposes improvements to the [epilot Privacy Policy](https://www.epilot.cloud/en/privacy-policy) to address customer DPO questions regarding sub-processors, international data transfers, and GDPR safeguards.

:::note Internal Document
This is a proposal for the legal/compliance team. Once approved, updates should be applied to the public privacy policy.
:::

## Current Gap Analysis

The current privacy policy at `epilot.cloud/en/privacy-policy` primarily covers the **epilot marketing website** (Webflow, HubSpot, Google Analytics, etc.) but does not comprehensively address data processing for the **epilot platform product**.

### Customer Question (Summary)

> All subcontractors listed are based in the EU or process data in the EU. However, AWS, Elasticsearch, Datadog, and FullStory have U.S. parent companies. There is no explicit statement as to whether personal data is transferred to third countries (e.g., support access from the U.S.) and what safeguards (SCCs, Data Privacy Framework) are in place.

## Proposed Additions

### 1. Dedicated Platform Sub-Processor Section

Add a new section specifically for the epilot platform (separate from website analytics tools):

```markdown
## epilot Platform Sub-Processors

The following sub-processors are engaged for operating the epilot platform.
All sub-processors have executed Data Processing Agreements (DPA) per Article 28 GDPR.

| Sub-Processor | Purpose | Data Location | Safeguards |
|---|---|---|---|
| Amazon Web Services (AWS) | Cloud infrastructure | EU (Frankfurt) | SCCs, ISO 27001 |
| Elastic Cloud | Search and indexing | EU (Netherlands) | SCCs, SOC 2 |
| Datadog | Monitoring and logging | EU (Netherlands) | SCCs, SOC 2 |
| FullStory | Session analytics | EU (Germany) | SCCs, EU-US DPF |
| ConvertAPI | Document conversion | EU (Lithuania) | DPA |
```

### 2. International Transfer Disclosure

Add explicit disclosure about transfers to third countries:

```markdown
## International Data Transfers

### Primary Processing Location

All customer data is processed and stored within the European Union,
specifically in the AWS EU (Frankfurt) region.

### Sub-Processors with Non-EU Parent Companies

Certain sub-processors have parent companies headquartered in the
United States. For these sub-processors:

1. **Data Residency**: All data is processed in EU data centers.
   Sub-processors are contractually prohibited from transferring
   customer data outside the EU.

2. **Support Access**: Where sub-processor support personnel may access
   data from non-EU locations for troubleshooting purposes, the following
   safeguards apply:
   - Standard Contractual Clauses (SCCs) per Article 46(2)(c) GDPR
   - EU-US Data Privacy Framework certification (where applicable)
   - Technical access controls and audit logging
   - Data minimization (access limited to necessary data)

3. **Transfer Impact Assessment**: epilot maintains a Transfer Impact
   Assessment (TIA) evaluating the legal framework and risks associated
   with each sub-processor. The TIA is available upon request.
```

### 3. Technical Safeguards Disclosure

Add transparency about technical measures:

```markdown
## Technical Safeguards for Monitoring Services

### Datadog (Infrastructure Monitoring)

- Processes infrastructure metrics, logs, and application performance data
- EU (Netherlands) data center with data residency enforcement
- PII redaction at application level before data transmission
- No end-customer personal data included in monitoring payloads

### FullStory (Session Analytics)

- Session replay for product improvement and support
- EU (Germany) data center
- Privacy-first configuration with PII field masking
- Sensitive form fields excluded from recordings
- CSS selector and attribute blocklists for data exclusion
```

### 4. Safeguards Summary Table

Add a clear summary of GDPR Article 46 mechanisms:

```markdown
## Legal Basis for International Transfers

| Sub-Processor | Primary Safeguard | Additional Safeguards |
|---|---|---|
| AWS | Standard Contractual Clauses | ISO 27001, SOC 2 |
| Elastic | Standard Contractual Clauses | SOC 2 Type II |
| Datadog | Standard Contractual Clauses | SOC 2, ISO 27001 |
| FullStory | EU-US Data Privacy Framework | SCCs (supplementary) |
| ConvertAPI | Data Processing Agreement | EU-based company |

All Standard Contractual Clauses follow the European Commission's
2021 SCCs (Commission Implementing Decision 2021/914).
```

### 5. Documentation Request Process

```markdown
## Compliance Documentation

For compliance assessments, the following documentation is available upon request:

- Complete sub-processor list with current DPA status
- Copies of Data Processing Agreements
- Transfer Impact Assessment (TIA)
- Technical and Organizational Measures (TOMs)
- Sub-processor change notification history

Contact: support@epilot.cloud or your epilot account manager
```

## Implementation Recommendations

1. **Separate Product vs. Website Sections**: Clearly distinguish between website analytics (current policy content) and platform sub-processors (new section)

2. **Maintain Sub-Processor List**: Keep an up-to-date list that can be referenced or linked from the privacy policy

3. **Notification Process**: Document the process for notifying customers of sub-processor changes (typically 30-day advance notice per DPA terms)

4. **Version Control**: Add version date and changelog to the privacy policy

## Response Template for Customer DPOs

Based on the above, here is a suggested response template:

---

**Re: Sub-Processor Data Transfer Inquiry**

Thank you for your inquiry regarding our sub-processor arrangements and international data transfers.

**Data Processing Location**: All epilot platform data is processed and stored in the EU, specifically in the AWS EU (Frankfurt) region.

**Sub-Processors with US Parent Companies**: While AWS, Elastic, Datadog, and FullStory have US parent companies, all data processing occurs in their EU data centers:
- AWS: EU (Frankfurt)
- Elastic: EU (Netherlands)  
- Datadog: EU (Netherlands)
- FullStory: EU (Germany)

**GDPR Safeguards**: We have implemented the following safeguards per GDPR Articles 44-49:

1. **Standard Contractual Clauses (SCCs)**: All sub-processors have executed the European Commission's 2021 Standard Contractual Clauses per Article 46(2)(c) GDPR.

2. **EU-US Data Privacy Framework**: FullStory is an active participant in the EU-US Data Privacy Framework, providing an additional adequacy mechanism.

3. **Data Residency Enforcement**: Sub-processors are contractually required to process data in EU data centers only.

4. **Technical Measures**: 
   - Datadog: PII redaction at source; no personal data in monitoring payloads
   - FullStory: Privacy-first configuration with PII masking enabled

5. **Transfer Impact Assessment**: We maintain a TIA documenting our assessment of each sub-processor's legal framework and the supplementary measures in place.

**Support Access**: For sub-processor support scenarios where personnel may access data from non-EU locations, SCCs and technical access controls apply. Access is logged and limited to troubleshooting purposes.

We are happy to provide copies of our DPAs, TIA, or other compliance documentation upon request.

---

## Related Documentation

- [Security Architecture](/docs/auth/security) — Platform security documentation including sub-processor details
- [Data Governance](/docs/data-governance/overview) — Data lifecycle and deletion capabilities
