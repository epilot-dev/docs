---
title: Publishing Requirements
hide_title: true
sidebar_position: 2
---

# Publishing Requirements

Before a version of your App can become public, it goes through the [verification process](/docs/apps/publishing/verification-process). This page lists what we look for during that review, so you can check your App before you submit it.

The requirements apply to the version you submit. A private App that only runs in your own organizations does not have to meet them, see [Private vs. Public Apps](/docs/apps/getting-started/private-vs-public).

:::info
These are the general requirements. Depending on what your App does, the review may raise further points that are specific to your App.
:::

## App listing

Your listing is what customers see in the Marketplace before they install the App.

- **Name**: A clear name that describes the App. It must not suggest that the App is built or endorsed by epilot or by another company unless that is the case.
- **Description**: Explains what the App does, who it is for and what a customer needs to use it, for example an account with a third-party service.
- **Logo**: A logo in good quality that you have the right to use.
- **Support contact**: A support email address that is monitored and answers customer requests.
- **Documentation**: A link to documentation that covers installation, configuration and troubleshooting.
- **Notifications**: A notification email address, so that we can reach you about your App, for example about a failing component.

## Functionality

- The App does what its description says, and every component in the submitted version works.
- The version is complete. It contains no placeholder content, test data or unfinished components.
- The App can be installed and configured by following your documentation alone.
- Errors are handled. A failing request or missing configuration shows the user an understandable message instead of an empty or broken screen.
- The App has been tested in an organization other than the one it was built in, ideally a [sandbox](/docs/apps/getting-started/developer-sandbox).

## Configuration and options

- Every setting a customer must provide is declared as an [App option](/docs/apps/app-options), with a label and a description that explain what to enter.
- Options that are needed for the App to work are marked as required.
- Credentials such as API keys, tokens and passwords are declared as sensitive options. They are never hardcoded in the App, written to logs or shown in the interface.
- The App works with the default values of its optional settings.

## Permissions and data

- The App requests only the [permissions](/docs/apps/configure-permissions) it needs. Be ready to explain why each permission is required.
- The App reads and writes only the data it needs to do its job.
- If the App sends data to an external service, the description or documentation says which data is sent and to whom.
- Customer data is processed in line with applicable data protection law, including the GDPR. If you process personal data on behalf of customers, you can provide the required agreements.
- The App does not collect data for purposes the customer has not been told about.

## Security

- All communication with external services uses HTTPS.
- Calls to external APIs that need credentials go through the [API proxy](/docs/apps/components/api-proxy) or a [function](/docs/apps/functions/overview), so that secrets are never exposed in the browser.
- The App validates input it receives from users and from external services.
- Dependencies are kept up to date and have no known critical vulnerabilities.
- The App does not load and run code from sources you do not control.

## User experience

- Interfaces shown inside epilot are consistent with the look and feel of the platform and stay usable at common screen sizes.
- Texts are free of spelling mistakes and are available in German. English is recommended as well.
- Loading and error states are visible to the user.
- Components that end customers see, such as journey blocks and portal extensions, are accessible, including with a keyboard.

## Performance and reliability

- Interfaces load in a reasonable time and do not noticeably slow down the page they are embedded in.
- Functions and API calls finish within the platform's time limits and cope with a slow or unavailable external service.
- Scheduled functions run only as often as they need to.

## Versioning and maintenance

- The version number follows [semantic versioning](/docs/apps/versioning), and the changes are described when you submit a new version.
- A new version does not break existing installations. If a change needs action from customers, your documentation explains what to do.
- You keep the App working as the platform evolves and respond to support requests and to issues we report to you.

## Before you submit

1. Install the version in a clean organization and go through your own documentation.
2. Check every component and every option, including empty and invalid values.
3. Make sure the listing, the support contact and the documentation link are complete.
4. Remove test data, debug output and unused components.
5. [Request the review](/docs/apps/publishing/verification-process).
