# Timeline (`timeline`)

- Group related periods with `section <name>` — sections get distinct
  automatic coloring (up to 12 unique colors before they start repeating),
  which is the main practical reason to use them.
- No `direction` control is available on MermZen's pinned Mermaid version
  (added in 11.14.0 — see [version-limits.md](../version-limits.md)).
  Timeline always lays out left-to-right.
- Keep individual event/period text short. Long text historically had
  wrapping bugs in some Mermaid versions; use `<br>` for manual line breaks
  rather than relying on auto-wrap if a period's text runs long.
