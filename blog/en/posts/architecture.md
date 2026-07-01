---
title: How to Draw Architecture Diagrams in Mermaid
description: Comprehensive guide to Mermaid architecture diagram syntax including groups, services, mandatory edge anchors, and the real layout limitations you'll hit in practice.
date: 2026-03-05
slug: architecture
---

# How to Draw Architecture Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Architecture diagrams visualize system components, their groupings, and how they connect — ideal for system design, architecture reviews, and technical documentation. Mermaid uses the `architecture-beta` diagram type, built around `group` and `service` declarations plus explicitly anchored edges.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGM9q1UCK4sLknNjVWqBQCjdBW9" width="100%" height="500" frameborder="0"></iframe>

## Why Use Architecture Diagrams?

- **Visualize system structure** — See at a glance what components make up the system and how they interact
- **Architecture review** — Identify design issues before implementation
- **Team communication** — Help new members quickly understand the system landscape
- **Technical documentation** — Give architecture docs a concrete, visual anchor

### Use Cases

✅ **Suitable**:
- Small-to-medium cloud/system topologies (roughly 8 services or fewer — more on this limit below)
- Architecture review discussions
- Onboarding docs for a system's high-level shape

❌ **Not suitable**:
- Anything larger than ~8 services, or with services that fan out/in from multiple directions — use a flowchart with `subgraph` instead (see [Mermaid Flowcharts](flowchart.html))
- Code logic flow → use a flowchart
- Time sequence → use a sequence diagram

## Comparison with Other Diagrams

| Diagram Type | Core Purpose | Difference from Architecture |
|--------------|--------------|------------------------------|
| **Architecture** | Small cloud/system topologies with icons | Cloud-style icons, but very limited layout control |
| **Flowchart** | Process & decisions, general-purpose structure | No built-in icons, but mature layout control (`direction`, `subgraph`) and far more reliable at scale |

**Selection guide**: if you want cloud-style icons and your system has a small, mostly-linear set of components, use architecture. If you need more than ~8 components, multiple fan-outs, or precise layout control, use a flowchart instead.

## Declaring a Chart

```
architecture-beta
    group sys(cloud)[My System]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGM9q1UCK4sLknNjVWqBQCjdBW9" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

A `group` is a labeled container: `group id(icon)[Title]`. The 5 built-in icons are `cloud`, `database`, `disk`, `internet`, and `server` — that's the complete icon set, there's no way to add custom icons (e.g. a specific cloud provider's logo) without a full JS integration most users won't have.

Note: `title` is **not** a valid top-level statement here (unlike flowchart or gantt) — it's silently ignored if you add one. Don't bother.

## Defining Services

```
architecture-beta
    group sys(cloud)[My System]

    service ui(internet)[Frontend] in sys
    service logic(server)[Backend] in sys
    service store(database)[Database] in sys
    service ext(server)[Payment System]
```
<a href="https://eric.run.place/MermZen/#eJx1zj8LwjAQBfCvcmRKQBfHjiJuguCYdkjTowbbi1wupUH87lL8A4Ju9-D3HndTk6o2K-VVpRz7cxD0khnXLYqrCQCg55ivkErSfoi5M_ZQ4FSS4NjU9CQJeQoeIQcdSJAJxdg9RxKkroFAS_2bDrEPXi8J2dit85e_NElk1J0T17qExu5e12-Ns3xmj66MSPJ-V90fy91ULw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

`service id(icon)[Title] in groupId` places a service inside a group. Leave off `in groupId` to render a service **outside** any group — useful for external systems ("Payment System" above renders outside "My System").

## Connections Between Services

```
architecture-beta
    group sys(cloud)[My System]

    service ui(internet)[Frontend] in sys
    service logic(server)[Backend] in sys
    service store(database)[Database] in sys
    service ext(server)[Payment System]

    ui:B -- T:logic
    logic:B -- T:store
    logic:R -- L:ext
```
<a href="https://eric.run.place/MermZen/#eJx1jrEKwjAQhl_lyNSAXRwzFnFSEHVLO6TpUYNtIsmltIjvLm1VVHT77-O7u__KOiaWC6aZYMrrkyHUFD2mJZLKLQBA7V28QBhCohsXKy63AxyGQNgWuZ2VgL4zGiGaxFhCb5G4XHtnCW1VgLHj-qfauNroZJzQc5kpff6rBnIek0qRKlVALleP9NvGnl5nd2po0dJ33WhEBmkKRzG1mOEUn3x6-c73I98I7Ind7jFTaFE" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

**Edge anchors are mandatory, not optional**: `serviceA:DIR -- DIR:serviceB` where `DIR` is `T`/`B`/`L`/`R`. Leaving one off is a **hard parse error**, not a fallback to some default side — there's no default. Use `-->` instead of `--` for a directional arrowhead.

## Full Example: Small Shop System

```
architecture-beta
    group sys(cloud)[Shop System]

    service web(internet)[Web App] in sys
    service api(server)[API Gateway] in sys
    service orders(server)[Order Service] in sys
    service payments(server)[Payment Service] in sys
    service db(database)[Order Database] in sys
    service cache(disk)[Session Cache] in sys

    web:B -- T:api
    api:B -- T:orders
    orders:B -- T:db
    orders:R -- L:payments
    api:R -- L:cache
```
<a href="https://eric.run.place/MermZen/#eJx9j81qwzAQhF9l0UmG-tKjbkkLpVBIqAs5ODmspKUWSSQhyTEm5N2LqrgmYHrb_WZmf67swsTzE1NMMAyqM4lU6gPVkhLuLQDAd3C9hzhGrk6u11XbdM5DM8ZE58PeFlOkcDGKYCDJjU0ULKWq3ZGElfcHMDYPeLSiNzzXFKp2tX2HN0w04LhsdkFTiH_-TW6hKeJywuN4JpvmzLaA_1Naco0JJUaatrze--WAQtUR1yYeq7ahGI2z8JLZbC-BgaRYQ13Dl0BvCkNvJlYeLLjUk6LlA_3M9ENM782D7sLvQez2A-ICnus" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

Six services, each edge a straight R-L or T-B connection, no service reached from two different directions — this is deliberate, and it's the whole point of the next section.

## The Real Limitation: Diagonal Edges Cross Labels

This is the single biggest gotcha with this diagram type, confirmed by direct testing, not a rumor: **a diagonal edge (mixing a horizontal anchor on one end with a vertical anchor on the other, when the two services aren't aligned) can be drawn straight through a neighboring service's label**, even with fully correct anchor syntax. The underlying layout engine (`cytoscape.js-fcose`, a force-directed solver) positions services without reserving clearance for edges that cross diagonally.

Concretely, this happens when:

- **A service is reached from more than one direction.** If both a "Gateway" and a "Worker" connect to the same "App Server", the layout engine can't guarantee either edge avoids "App Server"'s own label.
- **You use a diagonal bend** (e.g. anchoring `B` on one side and `T` on the other, when the services end up horizontally offset).

There's no syntax-level fix. The only reliable mitigations:

1. **Use only straight R-L and T-B edges**, and avoid diagonal bends.
2. **Avoid fan-in**: don't have two services both connect into a third from different directions.
3. **Keep it small.** More services means more chances for the auto-layout to place something in an edge's path. Roughly 6-8 services with a mostly-linear topology (like the Shop System example above) is the practical ceiling.
4. **Don't nest groups.** A `group` inside another `group` adds its own layout constraints on top of the parent's — confirmed by testing, this measurably increases the odds of misaligned "straight" edges rendering diagonally. Prefer one flat group over nested sub-groups.

If you hit this and need more than ~8 services, or need multiple fan-outs, switch to a flowchart with `subgraph` — it sacrifices the cloud icons but gives you actual layout control (`direction`, subgraph grouping, node ordering) that architecture-beta doesn't have.

## Other things worth knowing

- **No `direction` statement, no manual grid positioning.** Layout is 100% automatic. You can't fix a bad layout by reordering declarations the way you can with a flowchart.
- **Quote labels with special characters.** `group sys(cloud)[E-Commerce System]` — the hyphen breaks parsing (confirmed by testing). Use `group sys(cloud)["E-Commerce System"]` instead, or avoid the special character.
- **Rendering can occasionally fail non-deterministically** on the exact same input, re-running unchanged — a known consequence of the force-directed layout solver not being fully deterministic. If a render inexplicably fails, retry once before assuming your syntax is wrong.

## Quick Reference

| Syntax | Function |
|--------|----------|
| `architecture-beta` | Declare an architecture diagram |
| `group id(icon)[Title]` | Define a group; icons: `cloud`, `database`, `disk`, `internet`, `server` |
| `group id(icon)[Title] in parentId` | Nest a group inside another (increases layout risk — see above) |
| `service id(icon)[Title]` | Define a service outside any group |
| `service id(icon)[Title] in groupId` | Define a service inside a group |
| `a:DIR -- DIR:b` | Edge with mandatory anchors (`T`/`B`/`L`/`R`), no arrowhead |
| `a:DIR --> DIR:b` | Edge with an arrowhead |
| `a:DIR -[Label]- DIR:b` | Edge with a label |

## Next Step

For system diagrams with more than ~8 components, or anything needing precise layout control, see [Mermaid Flowcharts](flowchart.html) instead.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
