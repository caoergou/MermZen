# MermZen Reference Index

Each diagram type has its own file covering **both** style (how to make it
look good) and syntax (how to avoid breaking the render) for that type. Read
only the file(s) for the diagram type you're generating — don't load
everything.

| Diagram type | Directive | File |
|---|---|---|
| Flowchart | `graph TD` / `graph LR` | [diagrams/flowchart.md](diagrams/flowchart.md) |
| Sequence | `sequenceDiagram` | [diagrams/sequence.md](diagrams/sequence.md) |
| Class | `classDiagram` | [diagrams/class.md](diagrams/class.md) |
| State | `stateDiagram-v2` | [diagrams/state.md](diagrams/state.md) |
| ER | `erDiagram` | [diagrams/er.md](diagrams/er.md) |
| Gantt | `gantt` | [diagrams/gantt.md](diagrams/gantt.md) |
| Architecture | `architecture-beta` | [diagrams/architecture.md](diagrams/architecture.md) |
| Mindmap | `mindmap` | [diagrams/mindmap.md](diagrams/mindmap.md) |
| Timeline | `timeline` | [diagrams/timeline.md](diagrams/timeline.md) |
| Pie | `pie` | [diagrams/pie.md](diagrams/pie.md) |
| Git Graph | `gitGraph` | [diagrams/gitgraph.md](diagrams/gitgraph.md) |
| Block | `block-beta` | [diagrams/block.md](diagrams/block.md) |
| Sankey | `sankey-beta` | [diagrams/sankey.md](diagrams/sankey.md) |
| Quadrant | `quadrantChart` | [diagrams/quadrant.md](diagrams/quadrant.md) |
| XY Chart | `xychart-beta` | [diagrams/xychart.md](diagrams/xychart.md) |
| User Journey | `journey` | [diagrams/journey.md](diagrams/journey.md) |
| Requirement | `requirementDiagram` | [diagrams/requirement.md](diagrams/requirement.md) |

**Not sure which diagram type fits the request?** Pick by what's being
described: a process/decision → flowchart; a request/response exchange →
sequence; a data model → class or ER; a lifecycle/machine → state; a
schedule → gantt; a cloud/system topology → architecture (but see its file
for when to use flowchart-with-subgraphs instead); anything else, check the
table above by name.

## Cross-cutting references

- [general-syntax.md](general-syntax.md) — syntax rules that apply across
  nearly every diagram type (reserved words, quoting, comments, frontmatter).
  Read this if a render fails and the diagram-type-specific file doesn't
  explain why.
- [version-limits.md](version-limits.md) — features unavailable on MermZen's
  pinned Mermaid version. Check this before recommending anything that
  sounds like a newer Mermaid feature.

## General principles (apply to most diagram types)

- **Node/element-count ceilings exist for a reason**: Mermaid's layout
  engines degrade — not just aesthetically but sometimes into actual
  rendering bugs — well before "infinite." Each diagram-type file gives a
  concrete ceiling; when in doubt, split into multiple diagrams rather than
  cramming more into one.
- **Render, then look at the result.** Syntax-valid Mermaid can still
  produce a visually broken diagram (clipped labels, cramped layout, a line
  through a label). Check the actual output image before reporting success.
  If a render fails outright, check the diagram type's file and
  [general-syntax.md](general-syntax.md), apply one targeted fix, and retry
  once before reporting the error to the user.
- **`accTitle`/`accDescr`** work in most diagram types for accessibility
  metadata — worth adding to anything meant to be published or shared.
- **CJK text** works out of the box via the Xiaolai SC font in every diagram
  type. Keep CJK labels to 2-6 characters — the font is wider than Latin
  fonts, so long CJK labels bloat element width more than equivalent English.
