#!/usr/bin/env bash
set -euo pipefail

# THIS SCRIPT ASSUMES you are within the codebase repo.

# Rebuild the pricing demo and copy the output to the docs static folder.
# Usage: npm run update-playground  (from the docs root)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PRICING_DEMO="$DOCS_ROOT/../pricing/demo"
TARGET="$DOCS_ROOT/static/pricing-playground"

if [ ! -d "$PRICING_DEMO" ]; then
  echo "ERROR: pricing demo not found at $PRICING_DEMO"
  exit 1
fi

echo "→ Installing pricing demo dependencies..."
(cd "$PRICING_DEMO" && pnpm install --frozen-lockfile 2>/dev/null || npm install --no-audit --no-fund)

echo "→ Building pricing demo..."
(cd "$PRICING_DEMO" && npx tsc -b && npx vite build)

# Verify the build has the correct base path
if ! grep -q '/pricing-playground/assets/' "$PRICING_DEMO/dist/index.html"; then
  echo "ERROR: Built index.html is missing /pricing-playground/ base path."
  echo "       Ensure vite.config.ts has: base: '/pricing-playground/'"
  exit 1
fi

echo "→ Copying build output to $TARGET..."
rm -rf "$TARGET"
cp -r "$PRICING_DEMO/dist" "$TARGET"

echo "✓ Pricing playground updated at static/pricing-playground/"
