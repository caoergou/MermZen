---
title: How to Draw Flowcharts in Mermaid
description: Complete guide to Mermaid flowchart syntax including node shapes, connector types, subgraphs, and conditional logic with practical examples.
date: 2026-03-04
slug: flowchart
---

# How to Draw Flowcharts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Flowcharts visualize process steps and decision paths, making them ideal for user flows, approval processes, or algorithm descriptions. Mermaid uses either `graph` or `flowchart` keywords for flow diagrams.

## Declaring a Chart

```
graph TD
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHEBAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

Direction parameters:

| Parameter | Meaning |
|-----------|---------|
| `TD` / `TB` | Top to bottom |
| `LR` | Left to right |
| `BT` | Bottom to top |
| `RL` | Right to left |

## Node Shapes

```
graph TD
    A[Rectangle]
    B(Rounded rect)
    C{Diamond}
    D((Circle))
    E([Stadium / pill])
    F[[Subroutine]]
    G[(Database)]
```
<a href="https://caoergou.github.io/mermzen/#JYwxDsIwDEV3TuHRmTgDNMDeslkZ3MYqltKkSpMJcXeq5G_vPemvmfcPvO0Fzt1olKVwXIO4Ju44phq9eMhnMM0NX6u8peh_DS3ioHkJYnp-IE2FvdYNrrBrCK77J9FU55xq0Siu378ILRee-RDj_g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Syntax | Shape | Usage |
|--------|-------|-------|
| `A[text]` | Rectangle | Step / action |
| `A(text)` | Rounded rectangle | Subprocess |
| `A{text}` | Diamond | Decision / condition |
| `A((text))` | Circle | Connector / junction |
| `A([text])` | Stadium | Start / end |

## Connector Types

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --label--> F
    A -->|label| G
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQ8AniUgACRwVdXTsFJzhbV8EZxtYDSrhAOba2dgqucEU5iUmpOSB9bggzasCCNQruAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Syntax | Meaning |
|--------|---------|
| `A --> B` | Solid arrow |
| `A --- B` | Solid line, no arrow |
| `A -.-> B` | Dashed arrow |
| `A ==> B` | Bold arrow (emphasis) |
| `A --text--> B` | Labeled arrow |

## Subgraphs

```
graph TD
    subgraph Frontend
        A[UI Layer] --> B[Validation]
    end
    subgraph Backend
        C[API] --> D[Database]
    end
    B --> C
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHHhUgCC4tKkdDDfrSg_ryQ1LwUsCgKO0aGeCj6JlalFsQq6unYKTtFhiTmZKYklmfl5sWBVMNVwM5wSk7ORjXCOdgzwhOh2iXZJLElMSixORdXrBJZ1BgA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: User Login Flow

```
graph TD
    A([Start]) --> B[User enters credentials]
    B --> C{Account exists?}
    C -->|No| D[Show error]
    D --> B
    C -->|Yes| E{Password valid?}
    E -->|No| F[Increment fail count]
    F --> G{Fails ≥ 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to dashboard]
    J --> K([End])
```
<a href="https://caoergou.github.io/mermzen/#TY5LTsMwEIb3nGKW7aISUvegpnmQghAiZYGsLIw9baymNpoxFCnhAByEi3ESXCeCzGo08_2PPcnXBrbpBYRZzUTlJfl6DovFFSTiiZEArUdiUIQ6rEa2XEc6idC6Wynl3qwH_DDs-fozPtfnZ3_vekhF1bgTIJGjQZgO7hPuGbmHrHuQzCdHGt5la_TolP055aK0ocUxtICdNC3E3MEzj55Fl4c7w8_XNyxHffGfcCPunDqAHAsvL-FobD2hzinJJDWqSlGgRZIeoUJm4yxs3QFHYRmDN-IRtSFUHrwDLbl5cZL0gGwicjsTmdX1_Bc" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://caoergou.github.io/mermzen/) and paste the code there.
