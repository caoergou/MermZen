# Sankey Diagrams (`sankey-beta`)

- Body is CSV: `source,target,value` per line, exactly 3 columns. Quote
  labels containing commas: `"Heating and cooling, homes",Losses,20`.
- **Cannot render cycles** — this is a hard limitation of the underlying
  `d3-sankey` library MermZen's Mermaid version depends on, not a
  MermZen-specific restriction. Don't attempt a sankey diagram with a flow
  that loops back on itself.
- **Node order isn't preserved** — the layout algorithm reorders nodes to
  minimize (but not eliminate) crossings, and a Mermaid maintainer has
  confirmed this can't be fixed without replacing the underlying layout
  library entirely. Don't rely on nodes appearing in your declaration order.
- Explicitly experimental per Mermaid's own docs.
- Color options: `linkColor` (`source`/`target`/`gradient`/hex),
  `nodeAlignment` (`justify`/`center`/`left`/`right`). Newer options
  (`nodeColors`, `nodeWidth`, `labelStyle`) are **not available** on
  MermZen's pinned Mermaid version — see
  [version-limits.md](../version-limits.md).
