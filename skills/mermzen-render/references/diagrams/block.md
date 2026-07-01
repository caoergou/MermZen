# Block Diagrams (`block-beta`)

**Treat this as the least stable diagram type MermZen supports** — it has
the highest concentration of open rendering bugs of anything in this guide,
including a "Converting circular structure to JSON" crash that a major
production team (Vercel) hit and worked around by switching to flowchart
instead.

## Syntax

- `columns N` sets a fixed column count; blocks auto-wrap into new rows.
- `id:N` makes a block span N columns.
- `space` / `space:N` creates an intentional gap for layout control.
- `block:groupId:N ... end` creates a named, nestable container that can
  declare its own `columns`.
- Edges/arrows are supported between blocks: `A-->B`, `A---B` (no arrowhead),
  labeled `A-- "X" -->B`.

## Gotchas

- **No anchor points, unlike architecture-beta.** An edge connects two block
  *centers* with a straight line — it has no awareness of what's between
  them. Confirmed by testing: connecting non-adjacent blocks in a row (e.g.
  `A --> C` when `B` sits between them) draws the arrow straight through
  `B`'s label. Only connect strictly adjacent blocks.
- **Never place two blocks adjacent without a `space` between them if you
  intend to connect them with an edge** — Mermaid's own docs call this out as
  a common mistake that breaks layout.
- **When connecting two composite (nested) blocks, link the group IDs, not
  internal nodes.** `hq --> branch` (group-to-group) draws a clean line
  between the two group boundaries. Linking a specific node inside `hq` to a
  specific node inside `branch` instead routes straight through the layout
  and is far more likely to cross an internal block's label — confirmed by
  testing both.
- Composite/nested blocks are supported but fragile — column-span context
  doesn't always propagate correctly through nesting, and shape support for
  spanning varies (round-edge shapes span correctly, some others don't).
- Bar width/column width for spanned blocks has had regressions where text
  overflows or the whole diagram renders far too narrow.
- `title` is **not** a valid top-level statement — silently ignored, zero
  visual effect, same as architecture-beta.

## When to use this vs. a flowchart

**Use block-beta only for small (≤10-15 blocks), mostly-flat grid layouts**
where you genuinely need exact positional control that flowchart's
auto-layout can't give you — its core value proposition is *not* auto-layout,
it's manual grid placement.

For anything with nested groups, column spans, and non-rectangular shapes
together, or anything embedded in a React/SPA-based tool, prefer `graph`
with `subgraph` (see [flowchart.md](flowchart.md)) — it's far more mature,
even without block-beta's precise grid control.
