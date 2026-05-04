# Journey Embed SDK — demo deck

A 6-slide PowerPoint deck for Sales / Marketing / CS introducing the new
Journey Embed SDK and contrasting it with the legacy `__epilot` script.

## Get the .pptx

Two ways:

### 1. Decode the prebuilt deck (no Python needed)

```bash
base64 -d journey-embed-sdk-demo.pptx.b64 > journey-embed-sdk-demo.pptx
open journey-embed-sdk-demo.pptx   # macOS
# or
start journey-embed-sdk-demo.pptx  # Windows
```

### 2. Rebuild from source

```bash
pip install python-pptx
python3 build_deck.py
# produces journey-embed-sdk-demo.pptx in this directory
```

## Slides

1. Title — Journey Embed SDK (Beta)
2. Legacy `__epilot` embed — and where it fell short
3. Introducing the SDK — `.asIframe()` + `.asWebComponent()`
4. Capabilities — modes, data injection, events, distribution
5. Demo placeholder — Embed Configurator video walkthrough
6. Value for Sales / Marketing / CS

## Sources

- `docs/journeys/embedding.md` (legacy `__epilot` script)
- `docs/journeys/sdk.md` (Journey Embed SDK Beta)
- `docs/journeys/web-components.md` (`<epilot-journey>`)
