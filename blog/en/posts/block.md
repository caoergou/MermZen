---
title: How to Draw Block Diagrams in Mermaid
description: Comprehensive guide to Mermaid block diagram syntax — grid layout with columns and space, nested composite blocks, and the real edge-crossing limitations you'll hit in practice.
date: 2026-03-05
slug: block
---

# How to Draw Block Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Block diagrams give you direct, manual control over a grid layout — useful when you want specific positioning that a flowchart's automatic layout won't give you. Mermaid uses the `block-beta` diagram type, built around a `columns` grid, `space` for gaps, and nested `block:groupId:N ... end` for composite structures.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhHAdo2OUfCsVnECqYpRilWoBGs8R8A" width="100%" height="300" frameborder="0"></iframe>

## Why Use Block Diagrams?

- **Manual positioning** — Place blocks in an exact grid, without relying on an auto-layout engine's choices
- **Nested structures** — Group related blocks visually with a composite container
- **Simple, static layouts** — Good for grid-like structures (network racks, module layouts) where the shape is fixed, not flow-driven

### Use Cases

✅ **Suitable**:
- Small (≤10-15 blocks), mostly-flat grid layouts where you need exact positioning
- Simple network/module diagrams with a handful of connections between *adjacent* blocks

❌ **Not suitable**:
- Anything with many connections, especially connections that "skip over" a block in the grid — block-beta has no anchor points, so an edge is just a straight line between block centers, and it **will** cross through anything in between (see below)
- Deep nesting combined with column spans — this combination is where `block-beta` is least stable (see Limitations)
- Anything rendered inside a React/SPA-based tool — `block-beta` has a documented crash (`Converting circular structure to JSON`) that a major team (Vercel) hit in production and worked around by switching to a flowchart

## Comparison with Other Diagrams

| Diagram Type | Core Purpose | Difference from Block |
|--------------|--------------|------------------------|
| **Block** | Manual grid positioning | You control exact placement; the tradeoff is far weaker edge-routing and stability than a flowchart |
| **Architecture** | Small cloud/system topologies with icons | Has icons, mandatory anchors, but still no manual positioning |
| **Flowchart** | Process & decisions, general-purpose structure | Automatic but *mature* layout; the safe default for anything non-trivial |

## Declaring a Chart

```
block-beta
    columns 1
    A["My Block"]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhHAdo2OUfCsVnECqYpRilWoBGs8R8A" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

`columns N` sets a fixed column count; blocks placed after it wrap into new rows automatically. Note: `title` is **not** a valid statement here — like architecture-beta, it's silently accepted but has zero visual effect. Don't bother.

## Basic Blocks and Connections

```
block-beta
    columns 3
    A["Block A"] B["Block B"] C["Block C"]

    A --> B
    B --> C
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhnAdo2OUnEBKFBxjlGIVnOBcJxDXGc51jlGKjcmD6lHQ1bVTcIJwnMAcZ6VaANGWIEs" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

**Only connect adjacent blocks.** This example connects A→B and B→C — each edge spans one block. If you instead added `A --> C` (skipping over B), the edge would be drawn as a straight line from A's center to C's center — cutting directly through B's label. There's no anchor concept in block-beta like there is in architecture-beta; an edge is just a line between two block centers, with no awareness of what's in between.

**Never place two blocks side-by-side without a `space` between them if you plan to connect them with an edge to something else** — Mermaid's own docs call this out explicitly as a common mistake that breaks the layout.

## Nested (Composite) Blocks

```
block-beta
    columns 3
    Frontend space Backend
    space:3
    block:db_cluster:3
        columns 3
        DB1[("Primary DB")] DB2[("Replica")] Cache[("Cache")]
    end

    Frontend --> Backend
    Backend --> DB1
    Backend --> Cache
```
<a href="https://eric.run.place/MermZen/#eJxtjj0LwkAMhv9KyKRgh9btBofzcC6uVuSaBiy9Xsu1FUT873JpHfzIlDxveHgfeEOVbZBQYek6apKSR1t4AADq3NT6AbbzeQidH9lXMPSWGLSlhn01Z4LU8igeVZUXctMwcnjzP844RqenVYF5qFsb7mB0geszGJ1FeuTe1WQF7S1dOUJZIpol0uKrY5LsPhsuhwRGp79QpPh8ATRyUVI" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

`block:groupId:N ... end` creates a named container spanning `N` columns, which can declare its own `columns` for its internal grid. The default styling gives composite blocks a light background so they read as a distinct group.

## Full Example: Network Topology

```
block-beta
    columns 2

    block:hq:2
        columns 2
        Router1["Core Router"]:2
        Switch1["Switch A"] Switch2["Switch B"]
        PC1["Workstations"] Server1[("File Server")]
    end

    space:2

    block:branch:2
        columns 2
        Router2["Branch Router"]:2
        AP1["Wi-Fi AP"] PC3["Workstations"]
    end

    hq --> branch
```
<a href="https://eric.run.place/MermZen/#eJyNjzEPgjAUhP_Ky5s0kUHcOpgACXOjg4NlgNqEBmylFByM_920QDDg4Pbucpf33Qt7JOEOORIsas2roBA2ZwoAgOu6u6sWQqYGwwdI2ZBw0IvQZJ10Z4XZXxkm2ohRMsy-a-entLx0meGCiGE2uuHsxgyzuUQTV7hoU7U2t1Kr1peE6d27DcNU1mLUDLdjU6jbNKB95FyQxZ7C5IqXf21yZLGP_14VUQ8og1RCRB0cTQ5r5BVX2UAQHGEgwfcHcf55vA" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

**Key technique: connect group IDs, not internal nodes, for inter-group edges.** `hq --> branch` draws a clean line from one composite block's boundary to the other's, without crossing anything inside either group. If you instead connected a specific node inside `hq` to a specific node inside `branch` (e.g. `Router1 --> Router2`), the edge is drawn straight through the layout and is far more likely to cross an internal block's label — confirmed by testing.

## Limitations (confirmed by testing and GitHub issues)

Treat `block-beta` as the least stable diagram type in Mermaid's toolkit:

- **No anchor points.** Unlike architecture-beta, edges connect block *centers*, not sides — any edge that isn't between strictly adjacent blocks risks crossing something.
- **Nested groups + column spans is fragile.** Column-span context doesn't always propagate correctly through nesting; some shapes (round-edge) span their columns correctly, others don't.
- **A real production crash exists**: `Converting circular structure to JSON`, triggered inside React/Next.js environments — Vercel's own examples repo hit this and replaced a `block-beta` diagram with a flowchart as the fix, rather than working around it.
- **No `title` statement** (silently ignored, like architecture-beta).

**Recommendation**: use `block-beta` only for small, mostly-flat grids where exact positioning genuinely matters more than reliability. For anything else — more connections, deeper nesting, or anything you need to be robust across renderers — use a flowchart with `subgraph` instead (see [Mermaid Flowcharts](flowchart.html)).

## Quick Reference

| Syntax | Function |
|--------|----------|
| `block-beta` | Declare a block diagram |
| `columns N` | Set a fixed column count for the current grid |
| `id["Label"]` | Define a block |
| `id[("Label")]` | Define a cylinder-shaped block (e.g. for databases) |
| `id:N` | Make a block span N columns |
| `space` / `space:N` | Leave a gap of 1 or N columns |
| `block:groupId:N ... end` | Nested composite block spanning N columns |
| `A --> B` | Connect two **adjacent** blocks (avoid skipping over blocks) |

## Next Step

For anything more complex than a small, mostly-flat grid, see [Mermaid Flowcharts](flowchart.html) — it trades block-beta's manual positioning for far more mature, reliable layout.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
