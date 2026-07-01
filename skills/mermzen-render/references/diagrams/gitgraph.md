# Git Graphs (`gitGraph`)

- **Keep to ≤8 concurrently-visible branches.** Mermaid only ships 8 distinct
  branch theme colors (`git0`-`git7`); a 9th branch reuses branch 1's color,
  making branches visually ambiguous even though nothing breaks.
- Use short, meaningful `id:` values on commits, not full SHAs — long commit
  labels historically caused overlap (Mermaid now rotates labels 45° by
  default specifically to compensate, but starting with a short label avoids
  needing that crutch).
- `commit type: HIGHLIGHT` (filled rectangle) for milestones/releases,
  `REVERSE` (crossed circle) to flag a revert, plus `tag: "v1.0.0"` for
  release tags — these are meaningful markers, not decoration.
- `cherry-pick id: "X"` requires that commit to already exist **on a
  different branch** than the current one, and the current branch needs at
  least one commit already. Cherry-picking a merge commit additionally
  requires an explicit `parent:` attribute (`cherry-pick id:"MERGE"
  parent:"B"`).
- Avoid repositioning the main branch via `mainBranchOrder` — there's an
  unresolved report of merge-link shapes rendering backwards when the main
  branch isn't at position 0.
- Branch `order:` values must be manually renumbered if you insert a branch
  between two existing ones later — there's no relative/variable ordering
  syntax.
