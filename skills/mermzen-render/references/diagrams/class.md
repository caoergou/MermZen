# Class Diagrams (`classDiagram`)

## Style

Use the relationship arrow that actually matches the semantics — this is the
single most common mistake (an academic study of LLM-generated UML found
~55% of relationship errors were aggregation used where plain association was
meant):

| Arrow | Meaning | Use when |
|-------|---------|----------|
| `-->` | Association | Class A merely knows about / uses class B — the default, weakest relationship. Start here. |
| `o--` | Aggregation | Shared whole-part; the part can outlive the whole and can belong to more than one whole |
| `*--` | Composition | Exclusive ownership; the part belongs to *at most one* whole at a time |
| `<\|--` | Inheritance | "is-a" |
| `..\|>` | Realization | Class implements an interface's contract |
| `..>` | Dependency | Weak, transient — "may need to change if," e.g. a method parameter type |

Practical rule: default to association; only upgrade to aggregation/composition
when the domain genuinely requires expressing ownership.

- **Omit visibility modifiers (`+`/`-`/`#`/`~`) on conceptual/overview
  diagrams.** Standard UML style guidance (Ambler) explicitly recommends
  showing visibility only on detailed design diagrams, not high-level ones —
  it's not an omission to fix, it's the right default for most diagrams.
- **Size ceiling**: keep to roughly **9 classes** for a diagram meant to be
  read at a glance (Miller's-7±2-derived guidance, Ambler's *Elements of UML
  2.0 Style*). A separate empirical study found comprehension actually peaks
  around ~50 elements *when there are few layout flaws* — so if a diagram
  must be larger, prioritize reducing edge crossings over trimming node
  count.
- **Known Mermaid rendering weak spots**: self-referencing relationships only
  partially render (only the first one shows); multiplicity labels can
  overlap/drift once a class has many relations (reported "unusable" past
  ~10 relations on one class). Don't rely on multiplicity labels being legible
  in a dense diagram — move detail into a `note` instead.

## Syntax gotchas

**Generic types with a comma in angle brackets break parsing** — the comma
reads as a delimiter: `Map~K, V~` fails. Use a single placeholder type name
and put the real generic signature in a `note` instead.

**Namespaces**: relationships and `note` statements that reference classes
inside a `namespace { }` block must be declared **outside** the namespace
block. Namespaces cannot be nested.

**`classDef`/`class` styling parses fine but silently does nothing here** —
don't bother, rely on the theme instead. See
[general-syntax.md](../general-syntax.md) for the full breakdown by diagram
type.
