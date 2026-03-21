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
(cd "$PRICING_DEMO" && npm install --no-audit --no-fund)

echo "→ Building pricing demo..."
(cd "$PRICING_DEMO" && npx tsc -b && npx vite build)

echo "→ Copying build output to $TARGET..."
rm -rf "$TARGET"
cp -r "$PRICING_DEMO/dist" "$TARGET"

echo "✓ Pricing playground updated at static/pricing-playground/"
