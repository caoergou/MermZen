# Mindmap (`mindmap`)

- Mermaid explicitly marks `mindmap` as **experimental**. Layout is fully
  automatic (branches radiate from the root) with no manual angle/position
  control — the Mermaid team's own tracker has an open complaint that layout
  "can be chaotic... crams everything in, causing nodes to overlap" once a
  mindmap gets non-trivial. There's no verified numeric ceiling from Mermaid
  itself; treat **~3-4 levels of depth** as a practical stopping point before
  overlap risk climbs.
- Shapes (`((circle))`, `[square]`, `(rounded)`, `))bang((`, `)cloud(`,
  `{{hexagon}}`) exist, but Mermaid has no official convention for what each
  should mean — if you use different shapes per level/type, that's a
  reasonable ad hoc convention, just don't present it as a documented
  standard.
- **Avoid `::icon(...)`.** It's explicitly experimental and, critically, only
  works if the *host page* separately loads an icon font (Font Awesome,
  Material) — MermZen's renderer does not do this, so icons will silently
  render as blank space. Rely on node text and shape instead.
- A newer `layout` config option (`tidy-tree`, `cose-bilkent`) exists in
  later Mermaid versions but is **not available** on MermZen's pinned
  version — see [version-limits.md](../version-limits.md).
