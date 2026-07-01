# MermZen Style Guide

Practical guidance for making Mermaid diagrams readable and good-looking. For
syntax pitfalls (things that break rendering), see [syntax-guide.md](syntax-guide.md).

## Supported diagram types

| Type | Directive | Best for |
|------|-----------|----------|
| Flowchart | `graph TD` / `graph LR` | Processes, decision trees, workflows |
| Sequence | `sequenceDiagram` | API calls, message flows, protocols |
| Class | `classDiagram` | OOP design, data models |
| State | `stateDiagram-v2` | State machines, lifecycles |
| ER | `erDiagram` | Database schemas, entity relationships |
| Gantt | `gantt` | Project timelines, schedules |
| Pie | `pie` | Proportions, distributions |
| Mindmap | `mindmap` | Brainstorming, hierarchical concepts |
| Architecture | `architecture-beta` | System architecture, cloud infra |
| Git Graph | `gitGraph` | Branch strategies, release flows |
| Block | `block-beta` | Block diagrams, system layouts |
| Quadrant | `quadrantChart` | Priority matrices, 2D comparisons |
| Timeline | `timeline` | Chronological events |
| Sankey | `sankey-beta` | Flow quantities, resource flows |
| XY Chart | `xychart-beta` | Bar/line charts, data visualization |

**Not supported by MermZen**: `layout: elk` (the alternate ELK layout engine).
MermZen bundles only the default `dagre` layout — don't recommend or rely on
ELK-specific behavior when writing diagrams for this renderer.

## How many nodes is too many?

Independent style guides converge on roughly the same thresholds:

- **≤15 nodes** — the sweet spot; stays easy to trace at a glance
- **~20 nodes** — hard warning line; strongly consider splitting
- **30+ nodes** — split into multiple diagrams, no exceptions

Mermaid's default `dagre` layout engine has known, unfixable-in-syntax
degradation on large diagrams: excessive whitespace padding and shrunken node
text (see [mermaid-js/mermaid#3262](https://github.com/mermaid-js/mermaid/issues/3262)).
There's no config that reliably fixes this — split the diagram instead of
trying to tune spacing.

**Hand-drawn style needs a stricter ceiling (~10-12 nodes).** The sketchy
rendering (via rough.js, the same library Excalidraw uses) adds positional
jitter to every line, and jitter scales with line length. Long or crossing
edges become noticeably harder to trace under hand-drawn rendering than under
crisp classic-style lines — the visual cues a reader normally uses (straight
lines, consistent angles) get blurred by the sketch noise. If a diagram is
dense, use `--look classic` instead of the hand-drawn default.

## Direction

| Direction | When to use |
|-----------|-------------|
| `TD` / `TB` | Hierarchies, decision trees, sequential processes with one dominant path — the default choice when unsure |
| `LR` | Pipelines, timelines, wide fan-outs (horizontal space is cheaper than vertical) |
| `BT` | Dependency chains / build-up flows leading to a goal |
| `RL` | Rare; right-to-left language contexts only |

Direction affects readability more than most other choices — if a layout
looks cramped or crossed, try changing direction before adjusting anything
else. **Never mix directions within one diagram.** If different sections
logically need different flow, use a `direction` statement inside a
`subgraph` instead — but note the limitation below.

## Node shapes (use consistently)

Shapes have standardized meanings (ISO 5807). Pick a convention and hold it
for the whole diagram — readers rely on shape consistency to parse a diagram
quickly:

```mermaid
graph TD
    A([Rounded — start/end]) --> B[Rectangle — process]
    B --> C{Diamond — decision}
    C --> D[(Database)]
    C --> E((Circle — event))
    B --> F>Flag — async]
    B --> G[[Subroutine]]
    B --> H{{Hexagon — prep}}
```

- Diamond = decision (label the outgoing edges `Yes`/`No`, not just arrows)
- Cylinder = database/persistent storage specifically — state the actual
  operation in the label (`"Query users WHERE active"`), not a vague "Database"
- Rectangle = a process step doing one thing

## Keep labels short

- **2-4 words per label.** Long labels widen nodes and cause layout sprawl —
  wrap with `<br/>` instead of letting one node grow wide.
- **Label every edge out of a decision**, especially `-->|yes|` / `-->|no|`.
  Unlabeled branches force the reader to guess.

## Subgraphs: for named logical groups, not just tidiness

Use `subgraph` when a group of nodes has a real name ("Frontend," "Team A"),
not merely to visually cluster nearby nodes — the layout engine already
handles proximity on its own.

```mermaid
graph TD
    subgraph Frontend
        A[React App] --> B[API Client]
    end
    subgraph Backend
        C[REST API] --> D[Database]
    end
    B --> C
```

For composite/multi-team flows, treat each subgraph as a mini-flowchart with
one clear entry and one clear exit, and route only the module-to-module
handoff edges between subgraphs. This reads as "a few rooms, each with an
obvious door," instead of a pile of loosely grouped nodes.

**Known limitation**: a subgraph's own `direction` statement is silently
ignored if any node inside links to a node outside the subgraph — in that
case the subgraph just inherits the parent diagram's direction. This is an
easy mistake: don't assume `direction` inside a subgraph will "just work" if
that subgraph also connects to outside nodes.

## Complex flowcharts: concrete de-cluttering techniques

- **Cap the main "spine" length.** If the primary path is longer than ~8
  nodes, promote a chunk of it into a named subgraph. A short spine with a
  couple of named modules reads far better than one long chain.
- **Control fan-out.** When one node has many outgoing edges, the layout
  engine spreads them wide, blowing out the diagram's width. Insert an
  intermediate "router" node so the fan-out happens one level lower and stays
  narrower.
- **Isolate retry/loop edges.** Cycles (retry loops, back-edges) are exactly
  what forces diagonal edges to cross other edges — the single biggest cause
  of "which arrow goes where?" confusion. There's no syntax fix for this in
  Mermaid's default layout; consider splitting the happy path and the
  retry/error path into two separate diagrams instead of forcing both into one.
- **Match branch symmetry.** When a decision splits into two paths, keep both
  branches at the same visual depth with mirrored spacing. Asymmetric spacing
  unintentionally signals "one branch matters more."

## Edge styling

```mermaid
graph LR
    A -->|labeled| B
    B -.->|dotted| C
    C ==>|thick| D
```

## Color and theme

- `default` — neutral, safe everywhere
- `dark` — for dark backgrounds or slides
- `forest` — green tones, easy on the eyes for docs
- `neutral` — minimal, professional
- `base` — the only theme where `themeVariables` actually take effect; use it
  if you need custom colors

**Use `classDef`, not repeated inline `style`, for anything reused.** Define
a class once, apply it with `class nodeId className` or `:::className`.
`classDef` must be declared *after* the nodes it targets.

`classDef` support varies a lot by diagram type — verified against MermZen's
actual renderer:

- `flowchart` / `graph` — works as expected
- `sequenceDiagram` — **breaks the render entirely** (parse error); never use it here
- `classDiagram` / `erDiagram` — parses fine but silently does nothing (the
  style never applies); don't bother, rely on the theme instead
- `stateDiagram-v2` — partial support (doesn't apply to `[*]` or composite states)

## Backgrounds (MermZen-specific)

- `transparent` — for embedding in docs/slides (default)
- `grid` — subtle grid, good for presentations
- Any CSS color / hex — for standalone images

## Sequence diagrams

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant API as Backend API
    participant DB as Database

    User->>FE: Click submit
    activate FE
    FE->>API: POST /data
    activate API
    API->>DB: INSERT
    DB-->>API: OK
    deactivate API
    API-->>FE: 201 Created
    deactivate FE
    FE-->>User: Success toast
```

- Order participants left-to-right by call chain: initiator on the far left,
  most-downstream dependency on the far right.
- `actor` for humans/external systems (stick figure), `participant` for
  internal services (box) — a real semantic distinction, not just cosmetic.
- Arrow semantics are meaningful, not decorative: `->>` synchronous/blocking,
  `-->>` response/return, `-)` async fire-and-forget, `-x` failed/terminated.
- Use `+`/`-` activation shorthand to show who's "busy" — helps surface
  bottlenecks visually.
- Group with `box` when there are more than ~4-5 participants, to avoid width
  cramping.
- Past ~15-20 messages or more than 2 levels of nested control flow (`alt`/
  `loop`/`par`), split into separate diagrams per major path.

## Gantt charts

- Group tasks into `section`s once you exceed ~8-10 tasks — an ungrouped list
  of 20 tasks is overwhelming; the same tasks split across 4 sections is
  scannable.
- Use `after taskId` instead of hardcoded dates for dependent tasks, so the
  chart re-flows correctly if a start date shifts.
- Tags are meaningful, not decorative: `done`, `active`, `crit` (critical
  path, distinct color), `milestone` (zero-duration diamond marker). List tags
  before dates in the task metadata.

## ER diagrams

- Crow's-foot cardinality: `||` exactly one, `o|` zero-or-one, `}o`
  zero-or-many, `}|` one-or-many — e.g. `CUSTOMER ||--o{ ORDER : places`.
- Annotate keys explicitly with `PK`/`FK`/`UK` in the attribute block; omitting
  them loses the schema's clarity.

## Accessibility

Add `accTitle` and `accDescr` to diagrams when they're meant to be published
or shared (docs, blog posts) — a short title (3-8 words) and one or two
sentences of description. Mermaid renders these as SVG accessibility metadata
regardless of the visual style chosen.

## CJK content

Chinese/Japanese/Korean text works out of the box with the Xiaolai SC font.
Keep CJK labels to **2-6 characters** — Xiaolai SC is wider than Latin fonts,
so long CJK labels bloat node width more than the equivalent English text.
Mixing CJK and English in one label is fine: `A[用户 User]`.
