# MermZen Syntax Guide — Common LLM Mistakes

Concrete syntax pitfalls that break rendering. Unlike [style-guide.md](style-guide.md)
(which is about making valid diagrams look good), everything here is about
avoiding parse errors and rendering failures.

**Recommended workflow**: render the diagram, then actually look at the output
image before reporting success. Syntax-valid Mermaid can still produce a
visually broken result (clipped labels, cramped layout, wrong orientation)
that only a rendered-image check catches. If a render fails, try one targeted
fix (quote the offending label, rename a reserved-word ID) and retry once
before giving up and reporting the error to the user.

## Reserved words — never use as a bare node ID

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

## Sequence diagrams: participant names can't collide with keywords

Mermaid's lexer matches block keywords **case-insensitively**. Naming a
participant `Loop`, `Note`, or `Alt` collides with the `loop`/`note`/`alt`
control-flow keywords and breaks parsing:

```
# Breaks: "Loop" collides with the loop keyword
participant Loop

# Fix:
participant Loop_ as "Loop Service"
```

Avoid (case-insensitively): `loop`, `alt`, `opt`, `par`, `note`, `end`,
`activate`, `deactivate`, `rect`, `critical`, `break`.

## Don't start node IDs with `o` or `x`

`oNode`, `xNode` etc. get misread as circle-end / cross-end edge tokens
(`--o`, `--x`). Use `OpNode`, `ExitNode` instead.

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

## Semicolons in sequence message text

A literal `;` in sequence diagram message text is read as a statement
separator unless escaped as `#59;`.

## Comments

`%%` must start its own line. A single `%`, or `%%` trailing after content on
the same line, does not work as a comment.

## Every block opener needs exactly one `end`

`alt`, `opt`, `par`, `loop`, `rect`, `subgraph` — a dropped `end` on a deeply
nested block is a common mistake. Count openers and closers before rendering.

## `alt`/`else`: don't deactivate in both branches

```
# Breaks: only one branch executes, so the "other" deactivate
# throws "trying to inactivate an inactive participant"
alt success
    API->>DB: query
    DB-->>API: result
    deactivate API
else failure
    API->>DB: query
    DB-->>API: error
    deactivate API
end

# Fix: deactivate once, after the whole alt block
alt success
    API->>DB: query
    DB-->>API: result
else failure
    API->>DB: query
    DB-->>API: error
end
deactivate API
```

`rect` background-highlight blocks cannot be nested inside each other.

## Subgraphs: link to inner nodes, not the subgraph container

If a node inside a subgraph is also linked from outside, don't additionally
link to the subgraph's own ID — link to the inner node ID directly. Linking
to both can cause a parse error in some renderer versions.

## classDef/class: don't use in sequenceDiagram, useless in classDiagram/erDiagram

Verified against MermZen's renderer directly:

- `sequenceDiagram` + `classDef`/`class` → **parse error, breaks the render**.
  Never use it here.
- `classDiagram` + `classDef`/`class` → parses fine but the style silently
  never applies. Don't bother.
- `erDiagram` + `classDef`/`class` → same — parses fine, style silently
  never applies.

These are only reliable in `flowchart`/`graph` (and partially in
`stateDiagram-v2`, see [style-guide.md](style-guide.md)).

## Class diagrams

- Generic types with a comma in angle brackets break parsing — the comma
  reads as a delimiter: `Map~K, V~` fails. Use a single placeholder type name
  and put the real generic signature in a `note` instead.
- Relationships and `note` statements that reference classes inside a
  `namespace { }` block must be declared **outside** the namespace block.
  Namespaces cannot be nested.

## State diagrams

Can't transition directly between the internal states of two *different*
composite states — route through the composite state boundary itself, not
state-to-state across composites.

## `linkStyle`: don't put the hex color last

```
# Can fail to parse — hex color as the last attribute
linkStyle 0 stroke-width:4px,stroke:#FF69B4

# Fix — reorder, or use a CSS color name
linkStyle 0 stroke:#FF69B4,stroke-width:4px
```

## Frontmatter placement

If using `---\nconfig:\n...\n---` YAML frontmatter, the opening `---` must be
the very first line of the file with zero preceding whitespace, or it's
silently ignored.
