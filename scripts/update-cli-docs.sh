#!/usr/bin/env bash
#
# Copies CLI command reference docs from sdk-js/packages/cli/docs
# and generates the API commands table in docs/cli/overview.md
#
# Usage: npm run update-cli
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_ROOT="$SCRIPT_DIR/.."
CLI_DOCS_SRC="$DOCS_ROOT/../sdk-js/packages/cli/docs"
CLI_DOCS_DEST="$DOCS_ROOT/docs/cli/commands"
OVERVIEW_FILE="$DOCS_ROOT/docs/cli/overview.md"

START_MARKER="<!-- cli-commands-table -->"
END_MARKER="<!-- /cli-commands-table -->"

if [ ! -d "$CLI_DOCS_SRC" ]; then
  echo "Error: CLI docs not found at $CLI_DOCS_SRC"
  echo "Make sure the sdk-js repo is checked out and CLI docs are generated."
  exit 1
fi

# --- 1. Copy CLI command docs ---
echo "Copying CLI command docs from $CLI_DOCS_SRC"
mkdir -p "$CLI_DOCS_DEST"
rm -f "$CLI_DOCS_DEST"/*.md

for src_file in "$CLI_DOCS_SRC"/*.md; do
  filename="$(basename "$src_file")"
  [ "$filename" = "index.md" ] && continue

  slug="${filename%.md}"
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
        prev = None
        while prev != line:
            prev = line
            line = re.sub(
                r'(?<!\`)<([a-zA-Z][a-zA-Z0-9_-]*)>(?!\`)',
                lambda m: m.group(0) if m.group(1).lower() in HTML_TAGS else '\`<' + m.group(1) + '>\`',
                line
            )
    print(line)
" > "$CLI_DOCS_DEST/$filename"
done

COUNT="$(ls "$CLI_DOCS_DEST"/*.md 2>/dev/null | wc -l)"
echo "Copied $COUNT command docs to $CLI_DOCS_DEST"

# --- 2. Generate API commands table ---
echo "Generating CLI commands table in $OVERVIEW_FILE"

TABLE_LINES="| API | Command | Reference |"
TABLE_LINES="$TABLE_LINES
| --- | ------- | --------- |"

for doc_file in "$CLI_DOCS_DEST"/*.md; do
  filename="$(basename "$doc_file")"
  slug="${filename%.md}"
  # Extract title from the first H1 line (skip frontmatter)
  title="$(grep -m1 '^# ' "$doc_file" | sed 's/^# //')"
  TABLE_LINES="$TABLE_LINES
| $title | \`epilot $slug\` | [reference](commands/$slug) |"
done

# Replace the table between markers in overview.md
if grep -q "$START_MARKER" "$OVERVIEW_FILE"; then
  TABLE_FILE="$(mktemp)"
  printf '%s\n' "$TABLE_LINES" > "$TABLE_FILE"
  awk -v tfile="$TABLE_FILE" '
    /<!-- cli-commands-table -->/ { print; print ""; while ((getline l < tfile) > 0) print l; found=1; next }
    /<!-- \/cli-commands-table -->/ { found=0 }
    found { next }
    { print }
  ' "$OVERVIEW_FILE" > "$OVERVIEW_FILE.tmp"
  rm -f "$TABLE_FILE"
  mv "$OVERVIEW_FILE.tmp" "$OVERVIEW_FILE"
  echo "Updated commands table in $OVERVIEW_FILE"
else
  echo "Warning: $START_MARKER markers not found in $OVERVIEW_FILE"
  echo "Add the markers to enable auto-generation of the commands table."
fi

echo "Done!"
