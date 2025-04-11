---
sidebar_position: 10
---

# Content-Security-Policy (CSP)

Content Security Policy (CSP) is a feature that helps to prevent or minimize the risk of certain types of security threats. It consists of a series of instructions from a website to a browser, which instruct the browser to place restrictions on the things that the code comprising the site is allowed to do. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

In case of Journeys, this is relevant if you're [embedding Journeys](./embedding) to your website and need to whitelist all associated features.

## Recommended rules

Since Journeys are embedded through scripts and iframes, these are the suggested rules:

```
script-src 'self' 'unsafe-inline' https://*.epilot.io https://*.epilot.cloud;
frame-src 'self' https://*.epilot.io https://*.epilot.cloud;
```

, which is explained below:

- The `script-src` rule is allowing you to inject script from epilot domains, whiel the `'unsafe-inline'` directive allows executing inline scripts to initialise it.
- The `frame-src` rule is allowing you to embed epilot apps from our domains into your page.

### Alternative to `'unsafe-inline'`

Instead of allowing the execution of all inline scripts, you can selectively selectively allow the ones responsible for embedding journeys, which is preferrable from a security standpoint.

To selectively allow inline scripts to be executed, we recommend you use [nonces](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#nonce-based) or [hashes](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#hashes), and tweak your `script-src` rule accordingly.

As an example, you would add the `nonce` attribute to the embedding script you got from the Journey Builder, which is similar to the below:

```html
<div id="epilot-{journey-uuid}" style="width:100%;text-align:left"></div>
<script
  data-ep-init="false"
  src="https://embed.journey.epilot.io/bundle.js"
></script>
<script nonce="ee3ad7cc9b0f">
  __epilot.init([
    {
      journeyId: '{journey-uuid}',
      mode: 'inline',
      scrollToTop: true,
      topBar: true,
      lang: 'de',
    },
  ])
</script>
```

, and add that to your webpage, followed by the `script-src` rule below:

```text
script-src 'self' 'nonce-ee3ad7cc9b0f' https://*.epilot.io https://*.epilot.cloud;
```
