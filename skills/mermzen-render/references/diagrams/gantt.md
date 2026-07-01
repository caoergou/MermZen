# Gantt Charts (`gantt`)

## Style

- Group tasks into `section`s once you exceed ~8-10 tasks — an ungrouped list
  of 20 tasks is overwhelming; the same tasks split across 4 sections is
  scannable.
- Use `after taskId` instead of hardcoded dates for dependent tasks, so the
  chart re-flows correctly if a start date shifts.
- Tags are meaningful, not decorative: `done`, `active`, `crit` (critical
  path, distinct color), `milestone` (zero-duration diamond marker). List tags
  before dates in the task metadata.
- Use `excludes weekends` to keep timelines realistic.
- `displayMode: compact` packs non-overlapping tasks onto the same row —
  useful for long, vertically-scrolling Gantt charts.
