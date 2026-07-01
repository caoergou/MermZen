# ER Diagrams (`erDiagram`)

## Style

- Crow's-foot cardinality: `||` exactly one, `o|` zero-or-one, `}o`
  zero-or-many, `}|` one-or-many — e.g. `CUSTOMER ||--o{ ORDER : places`.
- Annotate keys explicitly with `PK`/`FK`/`UK` in the attribute block; omitting
  them loses the schema's clarity.
- Entity names are conventionally UPPERCASE.

## Syntax gotchas

**`classDef`/`class` styling parses fine but silently does nothing here** —
don't bother, rely on the theme instead. See
[general-syntax.md](../general-syntax.md) for the full breakdown by diagram
type.
