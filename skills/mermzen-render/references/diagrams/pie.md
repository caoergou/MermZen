# Pie Charts (`pie`)

- Practical slice ceiling: keep it to the general pie-chart-design norm of
  **~5-7 slices**. Mermaid itself only defines **12 distinct theme colors**
  (`pie1`-`pie12`) — beyond 12 slices, colors repeat and become
  indistinguishable regardless of readability concerns.
- Consider `pie showData` to print the actual value next to each label —
  pie charts are inherently bad at conveying small/similar proportions
  precisely, and showing the number compensates for that.
- **Known discrepancy**: despite the docs stating slices render clockwise in
  label order, Mermaid actually sorts slices by value internally before
  assigning colors — if you're relying on a specific label always getting a
  specific themed color, don't; the mapping isn't guaranteed to match
  declaration order.
- Long or CJK labels have had truncation/cutoff issues on narrow render
  widths in some Mermaid versions — keep pie slice labels short.
- Newer config (`donutHole`, `legendPosition`, `highlightSlice`) is **not
  available** on MermZen's pinned Mermaid version — see
  [version-limits.md](../version-limits.md).
