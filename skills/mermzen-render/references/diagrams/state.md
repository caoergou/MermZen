# State Diagrams (`stateDiagram-v2`)

## Style

- Use **composite states** (`state Id { ... }`) only when the nested behavior
  is itself complex enough to deserve its own mini-diagram — not just to
  group states visually. A flat diagram with clear names is easier to follow
  than shallow nesting for its own sake.
- **Concurrent regions (`--` divider) are the buggiest corner of this diagram
  type on MermZen's pinned Mermaid version** — transitions leaving a
  composite state only reliably work out of the *first* concurrent region;
  transitions connecting states nested inside a concurrent region can fail to
  render at all, especially with deeper nesting. Prefer separate diagrams
  over concurrent regions unless you've tested the exact structure renders.
- **Choice pseudostates (`<<choice>>`) always need an else/default branch.**
  UML semantics require every choice's guards to cover all cases; a
  choice diagrammed without a catch-all path is technically ill-formed.
- Mermaid's fork/join (`<<fork>>`/`<<join>>`) is commonly used loosely as a
  generic branch/merge rather than strict UML orthogonal-region semantics —
  that's fine for MermZen's purposes, just don't add guards/labels to a
  fork's outgoing edges (real UML disallows it, and mixing the concepts
  confuses readers who know UML).
- No verified numeric state-count ceiling exists from an authoritative
  source — treat "~15-20 states before splitting" as a reasonable practitioner
  heuristic, not a hard rule.

## Syntax and rendering gotchas

**Can't transition directly between the internal states of two *different*
composite states** — route through the composite state boundary itself, not
state-to-state across composites.

**Multiple distinct labeled transitions between the same two states (and
self-loops) can collapse into a single visible arc** — a confirmed Mermaid
rendering bug. If you need two separate transitions between the same pair of
states, consider merging them into one transition with a combined label
instead of relying on both rendering separately.

**`classDef`/`class` has only partial support** — doesn't apply to `[*]` or
composite states. See [general-syntax.md](../general-syntax.md) for the full
breakdown by diagram type.
