# Version Limits

MermZen pins **Mermaid 11.13.0** (released 2026-03-09). Features added in
later releases are **not available** — don't recommend them, and don't
assume a feature you recall from general Mermaid knowledge is present here
without checking this list first.

| Feature | Landed in | Status in MermZen |
|---------|-----------|--------------------|
| `layout: elk` (alternate flowchart/state layout engine) | — | Not bundled at all |
| Architecture `align row`/`align column` | 11.15.0 | Unavailable |
| Timeline `direction` statement | 11.14.0 | Unavailable |
| xychart per-point line labels (`line [25, 45 "note"]`) | 11.14.0 | Unavailable |
| Pie `donutHole`, `legendPosition`, `highlightSlice` | 11.16.0 | Unavailable |
| Mindmap `layout: tidy-tree`/`cose-bilkent` config | ~11.14-11.16 | Unavailable — mindmap always uses the older default layout |
| Sankey `nodeColors`, `nodeWidth`, `labelStyle` | ~11.16.0+ | Unavailable |

If asked for one of these, say so rather than emitting syntax that will
silently do nothing (or, depending on the feature, fail to parse) on
MermZen's pinned version.
