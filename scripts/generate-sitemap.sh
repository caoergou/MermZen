#!/usr/bin/env bash
# Generate sitemap.xml and robots.txt for SEO/AI crawlers.
# Usage: ./scripts/generate-sitemap.sh <BASE_URL>
# Example: ./scripts/generate-sitemap.sh https://owner.github.io/mermzen/

set -e
BASE_URL="${1%/}"
if [ -z "$BASE_URL" ]; then
  echo "Usage: $0 <BASE_URL>" >&2
  exit 1
fi

SITEMAP="sitemap.xml"
ROBOTS="robots.txt"

# Collect URLs: index.html -> base, other .html -> base/path
urls=()
while IFS= read -r -d '' f; do
  case "$f" in
    ./blog/_template-*.html) continue ;;
    ./blog/*/posts/*) continue ;;
  esac
  if [ "$f" = "./index.html" ]; then
    urls+=("$BASE_URL/")
  elif [ "$(basename "$f")" = "index.html" ]; then
    d="$(dirname "$f")"
    urls+=("$BASE_URL/${d#./}/")
  else
    urls+=("$BASE_URL/${f#./}")
  fi
done < <(find . -maxdepth 4 -name "*.html" \
  -not -path "./node_modules/*" \
  -not -path "./dist/*" \
  -not -path "./test-results/*" \
  -not -path "./dogfood-output/*" \
  -not -path "./.playwright-mcp/*" \
  -not -path "./blog-csdn/*" \
  -print0 | sort -z)

# Write sitemap.xml
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for u in "${urls[@]}"; do
    echo "  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>"
  done
  echo '</urlset>'
} > "$SITEMAP"

# Write robots.txt
{
  echo "User-agent: *"
  echo "Allow: /"
  echo ""
  echo "Sitemap: ${BASE_URL}/sitemap.xml"
} > "$ROBOTS"

echo "Generated $SITEMAP ($(( ${#urls[@]} )) URLs) and $ROBOTS with base $BASE_URL"
