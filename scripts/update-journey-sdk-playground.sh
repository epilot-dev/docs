#!/usr/bin/env bash
set -euo pipefail

# THIS SCRIPT ASSUMES you are within the codebase repo.

# Rebuild the epilot-journey-sdk demo and copy the output to the docs static folder.
# Usage: npm run update-journey-sdk-playground  (from the docs root)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
JOURNEY_SDK_DEMO="$DOCS_ROOT/../epilot-journey-sdk/demo"
TARGET="$DOCS_ROOT/static/journey-sdk-playground"

if [ ! -d "$JOURNEY_SDK_DEMO" ]; then
  echo "ERROR: journey-sdk-playground not found at $JOURNEY_SDK_DEMO"
  exit 1
fi

echo "→ Installing journey-sdk-playground dependencies..."
(cd "$JOURNEY_SDK_DEMO" && pnpm install --frozen-lockfile 2>/dev/null || npm install --no-audit --no-fund)

echo "→ Building journey-sdk-playground..."
(cd "$JOURNEY_SDK_DEMO" && npx tsc -b && npx vite build)

# Verify the build has the correct base path
if ! grep -q '/journey-sdk-playground/assets/' "$JOURNEY_SDK_DEMO/dist/index.html"; then
  echo "ERROR: Built index.html is missing /journey-sdk-playground/ base path."
  echo "       Ensure vite.config.ts has: base: '/journey-sdk-playground/'"
  exit 1
fi

echo "→ Copying build output to $TARGET..."
rm -rf "$TARGET"
cp -r "$JOURNEY_SDK_DEMO/dist" "$TARGET"

echo "✓ Journey SDK playground updated at static/journey-sdk-playground/"
