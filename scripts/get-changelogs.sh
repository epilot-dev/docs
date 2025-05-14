#!/bin/sh
set -e

# S3_BUCKET="api-docs-changelog-demo"
S3_PREFIX="changelogs/"
LOCAL_DIR="./downloaded-changelogs"
PROCESSING_DIR="./changelog-processing"

if [ -z "$S3_BUCKET_DOCS" ]; then
  echo 'error: $S3_BUCKET_DOCS is not set' >&2
  exit 1
fi

# Ensure local directory exists
mkdir -p "$LOCAL_DIR"
mkdir -p "$PROCESSING_DIR"

# Download only .md files from S3
aws s3 sync "s3://$S3_BUCKET/$S3_PREFIX" "$LOCAL_DIR" --exclude "*" --include "*.md"

cp "$LOCAL_DIR"/*.md "$PROCESSING_DIR"

# Process downloaded files: update H1 header to only the last semantic version after "vs. "
for file in "$PROCESSING_DIR"/*.md; do
  [ -e "$file" ] || continue
  sed -i -E '1s/^# .*vs\. ([0-9]+\.[0-9]+\.[0-9]+).*$/# \1/' "$file"
done

echo "Changelog files downloaded and processed."

# Concatenate changelogs by type, highest version at top, lowest at end
for type in $(ls "$PROCESSING_DIR" | grep -oP '^.*(?=-[0-9]+\.[0-9]+\.[0-9]+\.md$)' | sort -u); do
  files=$(ls "$PROCESSING_DIR"/${type}-*.md 2>/dev/null | sort -V -r)
  [ -z "$files" ] && continue
  out_file="$PROCESSING_DIR/${type}.md"
  true > "$out_file"
  for f in $files; do
    cat "$f" >> "$out_file"
    printf "\n" >> "$out_file"
  done
  echo "Concatenated $type changelogs into $out_file"
  # Delete the numbered markdown files after processing
  rm -f $files
  echo "Deleted processed files: $files"
done