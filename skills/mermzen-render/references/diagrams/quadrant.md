# Quadrant Charts (`quadrantChart`)

- Points are placed by explicit `[x, y]` coordinates (each in `[0, 1]`) —
  there's no auto-layout; you place every point yourself.
- `quadrant-1`-`quadrant-4` label the four quadrants (1=top-right, going
  clockwise). `x-axis Low --> High` / `y-axis Low --> High` label the axes.
- Point styling: `Point A: [0.9, 0.0] radius: 12` supports `color`,
  `radius`, `stroke-width`, `stroke-color`. Class-based styling
  (`Point A:::class1: [...]` + `classDef class1 ...`) also works, with
  precedence: direct style > class style > theme style.
- There's no built-in collision avoidance between point labels — if two
  points are close together, their labels can overlap. Space out point
  coordinates deliberately for points that are conceptually close, or move
  detail into the point's own label text rather than relying on proximity to
  convey grouping.
- Quadrant titles don't wrap — keep them short (this is a real, currently
  open rendering limitation, not a style suggestion).
