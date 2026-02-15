---
sidebar_position: 7
title: Open Source
---

# Open Source

epilot builds on open source and actively gives back. Our product codebase depends on millions of lines of open source code, and we contribute tools, libraries, and SDKs to the community under permissive licenses.

Public repositories live at [github.com/epilot-dev](https://github.com/epilot-dev).

## Philosophy

Open source is a core part of how we build software. Our engineering principle [Rent over Build](https://github.com/epilot-dev/engineering-principles#rent-over-build-we-rent-the-necessary-and-focus-on-building-the-important) means we rely heavily on open source libraries and frameworks, then focus engineering effort on what makes epilot unique.

We publish our own tools as open source when they solve general problems that others face too -- reusable utilities, framework plugins, SDKs, and UI components. This is good for the ecosystem and good for us: external contributions improve quality, public code raises the bar, and developers who know our tools can onboard faster.

## Projects We Maintain

### SDKs and API Clients

| Project | Description | Links |
| --- | --- | --- |
| **epilot SDK (JavaScript)** | Typed SDK for all epilot APIs. Full IntelliSense support. | [GitHub](https://github.com/epilot-dev/sdk-js) / [npm](https://www.npmjs.com/package/epilot-sdk) |
| **openapi-client-axios** | Framework-agnostic OpenAPI client built on axios. Powers all `@epilot/*-client` packages. | [GitHub](https://github.com/openapistack/openapi-client-axios) / [npm](https://www.npmjs.com/package/openapi-client-axios) |
| **openapi-backend** | Build, validate, route, authenticate, and mock APIs using OpenAPI definitions. Used across epilot backend services. | [GitHub](https://github.com/openapistack/openapi-backend) / [npm](https://www.npmjs.com/package/openapi-backend) |

Both `openapi-backend` and `openapi-client-axios` are part of the [OpenAPI Stack](https://github.com/openapistack) project, created and maintained by epilot's Head of Engineering. They form the backbone of our [API-first architecture](/docs/architecture/api-first).

See the [SDK documentation](/docs/architecture/sdk) for usage details.

### Terraform Providers

epilot publishes Terraform providers on the [Terraform Registry](https://registry.terraform.io/namespaces/epilot-dev) for managing epilot resources as infrastructure-as-code. These power our [Blueprints](/docs/blueprints/intro) system.

| Provider | Purpose |
| --- | --- |
| `epilot-dev/epilot-workflow` | Workflow definitions |
| `epilot-dev/epilot-portal` | Portal configuration |
| `epilot-dev/epilot-role` | Roles and permissions |
| `epilot-dev/epilot-dashboard` | Dashboard creation |
| `epilot-dev/epilot-file` | File entity management |
| `epilot-dev/epilot-validation-rule` | Journey validation rules |
| `epilot-dev/epilot-notificationtemplate` | Notification templates |
| `epilot-dev/epilot-custom-variable` | Custom variables |

### UI Components

| Project | Description | Links |
| --- | --- | --- |
| **concorde-elements** | React component library for epilot [Journeys](/docs/journeys/journey-builder). Used for all Concorde design components (inputs, checkboxes, radios, etc.). MIT licensed, PRs welcome. | [GitHub](https://github.com/epilot-dev/concorde-elements) / [npm](https://www.npmjs.com/package/@epilot/concorde-elements) |

See [Custom CSS](/docs/journeys/custom-css) for details on the Concorde design system and its tokens.

### Domain Libraries

| Project | Description | Links |
| --- | --- | --- |
| **@epilot/switching-deadlines** | German energy market switching deadline calculations (GPKE/GeLi Gas compliance). | [GitHub](https://github.com/epilot-dev/switching-deadlines) / [npm](https://www.npmjs.com/package/@epilot/switching-deadlines) |
| **@epilot/pricing** | Pricing calculation utilities for epilot price entities. | [npm](https://www.npmjs.com/package/@epilot/pricing) |

See the [Deadlines documentation](/docs/deadlines/intro) and [Pricing library documentation](/docs/pricing/pricing-library/) for usage.

### Integrations

| Project | Description | Links |
| --- | --- | --- |
| **epilot-app-zapier** | Zapier integration for epilot | [GitHub](https://github.com/epilot-dev/epilot-app-zapier) |
| **epilot-app-schufa** | Schufa credit check integration | [GitHub](https://github.com/epilot-dev/epilot-app-schufa) |

### Other

| Project | Description | Links |
| --- | --- | --- |
| **engineering-principles** | The 10 core principles guiding epilot engineering. | [GitHub](https://github.com/epilot-dev/engineering-principles) |
| **docs** | This developer documentation site (Docusaurus). | [GitHub](https://github.com/epilot-dev/docs) |

## Open Source We Build On

epilot's tech stack relies on major open source projects:

| Layer | Key Technologies |
| --- | --- |
| **Frontend** | React, TypeScript, Svelte, Tailwind CSS, single-spa, Vite, Radix UI |
| **Backend** | Node.js, Python, openapi-backend, Zod, AWS CDK, AWS SAM |
| **Data** | DynamoDB, Elasticsearch, ClickHouse |
| **AI** | LangChain |
| **Testing** | Vitest, Playwright |
| **Infrastructure** | Terraform, AWS CDK |

See the full landscape on our [Tech Radar](https://docs.epilot.io/techradar/).

## Open Skies Program

The **Open Skies Program** is epilot's initiative to incentivize engineers and employees to contribute to open source and publish technical blog posts. The program reinforces epilot's commitment to giving back to the communities we depend on.

Open Skies rewards two categories of contribution:

| Category | Examples |
| --- | --- |
| **Blog posts** | Technical articles on AI, serverless architecture, SaaS engineering, product design |
| **Open source** | Bug fixes, feature implementations, npm libraries, tooling, documentation |

All contributions are public and visible — published on the [epilot dev blog](https://dev.to/epilot), open source repositories, or other public channels.

:::info
Open Skies reflects a core belief: the engineers who build epilot should be recognized beyond our walls. Public contributions grow careers, strengthen the ecosystem, and build trust with customers and partners.
:::

## Contributing

All projects under [epilot-dev](https://github.com/epilot-dev) accept contributions. To get started:

1. Find a project on [github.com/epilot-dev](https://github.com/epilot-dev)
2. Check the repository README for setup instructions
3. Open an issue or submit a pull request

## Licensing

epilot open source projects typically use the **MIT License**:

- **MIT, BSD, ISC** — Permissive, preferred for most projects
- **Apache 2.0** — Preferred when patent protection matters
