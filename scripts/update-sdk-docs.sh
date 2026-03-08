#!/usr/bin/env bash
#
# Copies API-specific reference docs from sdk-js and generates
# the reference table for docs/sdk/overview.md
#
# Usage: npm run update-sdk
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_ROOT="$SCRIPT_DIR/.."
SDK_JS_ROOT="$DOCS_ROOT/../sdk-js"
SDK_DOCS_SRC="$SDK_JS_ROOT/packages/epilot-sdk-v2/docs"
SDK_DOCS_DEST="$DOCS_ROOT/docs/sdk/clients"
OVERVIEW_FILE="$DOCS_ROOT/docs/sdk/overview.md"

if [ ! -d "$SDK_DOCS_SRC" ]; then
  echo "Error: sdk-js docs not found at $SDK_DOCS_SRC"
  echo "Make sure the sdk-js repo is checked out at $SDK_JS_ROOT"
  exit 1
fi

# --- 1. Copy SDK client reference docs ---
echo "Copying SDK client docs from $SDK_DOCS_SRC"
mkdir -p "$SDK_DOCS_DEST"
rm -f "$SDK_DOCS_DEST"/*.md

for src_file in "$SDK_DOCS_SRC"/*.md; do
  filename="$(basename "$src_file")"
  slug="${filename%.md}"

  # Read the first heading to use as title
  title="$(head -1 "$src_file" | sed 's/^#\s*//')"

  # Prepend docusaurus frontmatter, escape MDX-incompatible syntax, and copy
  {
    echo "---"
    echo "title: \"$title\""
    echo "---"
    echo ""
    cat "$src_file"
  } | python3 -c "
import sys, re

# HTML tags that MDX/Docusaurus handles natively — don't escape these
HTML_TAGS = {
    'details', 'summary', 'div', 'span', 'p', 'br', 'hr', 'table', 'thead',
    'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'a', 'img', 'em', 'strong',
    'code', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sup',
    'sub', 'del', 'ins', 'abbr', 'b', 'i', 'u', 's', 'small', 'mark',
}

in_code = False
for line in sys.stdin:
    line = line.rstrip('\n')
    if line.startswith('\`\`\`'):
        in_code = not in_code
    if not in_code:
        # Escape <word> patterns that are not valid HTML tags and not in backticks
        # Run multiple passes to handle adjacent matches on the same line
        prev = None
        while prev != line:
            prev = line
            line = re.sub(
                r'(?<!\`)<([a-zA-Z][a-zA-Z0-9_-]*)>(?!\`)',
                lambda m: m.group(0) if m.group(1).lower() in HTML_TAGS else '\`<' + m.group(1) + '>\`',
                line
            )
    print(line)
" > "$SDK_DOCS_DEST/$filename"
done

echo "Copied $(ls "$SDK_DOCS_DEST"/*.md | wc -l) client docs to $SDK_DOCS_DEST"

# --- 2. Generate SDK reference table ---
echo "Generating SDK reference table in $OVERVIEW_FILE"

REDOC_CONFIG="$DOCS_ROOT/redoc.config.js"

# Build a lookup of available API routes from redoc.config.js
# Maps SDK slug -> API route path (some slugs differ, e.g. blueprint-manifest -> blueprints)
API_ROUTES=""
if [ -f "$REDOC_CONFIG" ]; then
  while IFS= read -r route; do
    api_slug="${route##*/}"
    API_ROUTES="$API_ROUTES $api_slug=$route"
  done < <(grep "routePath:" "$REDOC_CONFIG" | sed "s/.*routePath: *'\([^']*\)'.*/\1/")
fi

# SDK slug -> API route overrides (where they differ)
SLUG_OVERRIDES=" blueprint-manifest=/api/blueprints partner-directory=/api/partner workflow=/api/workflow-execution"

_lookup() {
  local key="$1" list="$2"
  # Match " key=value" in the space-delimited list
  if [[ "$list" =~ [[:space:]]${key}=([^[:space:]]+) ]]; then
    echo "${BASH_REMATCH[1]}"
  fi
}

get_api_route() {
  local slug="$1" result
  # Check explicit override first
  result="$(_lookup "$slug" "$SLUG_OVERRIDES")"
  if [ -n "$result" ]; then
    echo "$result"
    return
  fi
  # Check if route exists in redoc config
  result="$(_lookup "$slug" "$API_ROUTES")"
  if [ -n "$result" ]; then
    echo "$result"
    return
  fi
  echo ""
}

TABLE_LINES="| API | Import | Reference |"
TABLE_LINES="$TABLE_LINES
| --- | ------ | --------- |"

# Read the api-reference-table markers from the sdk-js README to get the
# canonical list (API name, import path). Fall back to scanning copied docs.
SDK_README="$SDK_JS_ROOT/packages/epilot-sdk-v2/README.md"

if [ -f "$SDK_README" ]; then
  # Parse lines between <!-- api-reference-table --> markers
  in_table=false
  while IFS= read -r line; do
    if [[ "$line" == "<!-- api-reference-table -->" ]]; then
      in_table=true
      continue
    fi
    if [[ "$line" == "<!-- /api-reference-table -->" ]]; then
      break
    fi
    if $in_table && [[ "$line" == \|\ \`epilot.* ]]; then
      # Extract: | `epilot.entity` | `@epilot/sdk/entity` | ... |
      api_name="$(echo "$line" | awk -F'|' '{print $2}' | xargs)"
      import_path="$(echo "$line" | awk -F'|' '{print $3}' | xargs)"
      # Derive slug from import path: @epilot/sdk/entity -> entity
      slug="$(echo "$import_path" | sed 's/`//g' | sed 's|@epilot/sdk/||')"
      api_route="$(get_api_route "$slug")"
      # Skip row if no API route exists
      if [ -z "$api_route" ]; then
        continue
      fi
      TABLE_LINES="$TABLE_LINES
| $api_name | $import_path | [SDK](clients/$slug) · [API]($api_route) |"
    fi
  done < "$SDK_README"
else
  # Fallback: generate from the copied docs files
  for doc_file in "$SDK_DOCS_DEST"/*.md; do
    filename="$(basename "$doc_file")"
    slug="${filename%.md}"
    api_route="$(get_api_route "$slug")"
    if [ -z "$api_route" ]; then
      continue
    fi
    TABLE_LINES="$TABLE_LINES
| \`@epilot/sdk/$slug\` | \`@epilot/sdk/$slug\` | [SDK](clients/$slug) · [API]($api_route) |"
  done
fi

# Replace the table between markers in overview.md
if grep -q '<!-- sdk-reference-table -->' "$OVERVIEW_FILE"; then
  TABLE_FILE="$(mktemp)"
  printf '%s\n' "$TABLE_LINES" > "$TABLE_FILE"
  # Use awk to replace content between markers
  awk -v tfile="$TABLE_FILE" '
    /<!-- sdk-reference-table -->/ { print; print ""; while ((getline l < tfile) > 0) print l; found=1; next }
    /<!-- \/sdk-reference-table -->/ { found=0 }
    found { next }
    { print }
  ' "$OVERVIEW_FILE" > "$OVERVIEW_FILE.tmp"
  rm -f "$TABLE_FILE"
  mv "$OVERVIEW_FILE.tmp" "$OVERVIEW_FILE"
  echo "Updated reference table in $OVERVIEW_FILE"
else
  echo "Warning: <!-- sdk-reference-table --> markers not found in $OVERVIEW_FILE"
  echo "Add the markers to enable auto-generation of the reference table."
fi

echo "Done!"
