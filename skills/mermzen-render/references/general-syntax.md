# General Syntax Rules

Cross-cutting syntax rules that apply across nearly every Mermaid diagram
type. Diagram-type-specific gotchas live in that type's own file (see
[INDEX.md](INDEX.md)) — check there too if this file doesn't explain a
failure.

## Reserved words — never use as a bare node/state/class ID

`end`, `default`, `style`, `linkStyle`, `classDef`, `class`, `call`, `href`,
`click`, `interpolate`, `graph`, `subgraph`.

```
# Breaks:
graph TD
    A --> end

# Fix — quote the label, use a different bare ID:
graph TD
    A --> finish["end"]
```

## Don't start node IDs with `o` or `x`

`oNode`, `xNode` etc. get misread as circle-end / cross-end edge tokens
(`--o`, `--x`) in flowcharts. Use `OpNode`, `ExitNode` instead.

## Quote labels containing special characters

Any of `( ) [ ] { } / \ : ; # @ ! ? < > " '` inside an **unquoted** label can
break parsing — parentheses in particular look like round-node syntax:

```
# Breaks: "(" and ")" look like node-shape syntax
A[Cost ($100)]

# Fix:
A["Cost ($100)"]
```

`#` specifically triggers HTML-entity lookup — use `#35;` for a literal `#`
if you can't quote it.

## Comments

`%%` must start its own line. A single `%`, or `%%` trailing after content on
the same line, does not work as a comment.

## Frontmatter placement

If using `---\nconfig:\n...\n---` YAML frontmatter, the opening `---` must be
the very first line of the file with zero preceding whitespace, or it's
silently ignored.

## `classDef`/`class` support varies a lot by diagram type

Verified directly against MermZen's renderer — don't assume this works
uniformly everywhere:

| Diagram type | Behavior |
|---|---|
| `flowchart` / `graph` | Works as expected |
| `sequenceDiagram` | **Breaks the render entirely** (parse error) — never use it here |
| `classDiagram` | Parses fine but silently does nothing — the style never applies |
| `erDiagram` | Same as classDiagram — parses fine, style never applies |
| `stateDiagram-v2` | Partial — doesn't apply to `[*]` or composite states |

Where `classDef` doesn't work, rely on the diagram's theme instead of
per-element styling.
