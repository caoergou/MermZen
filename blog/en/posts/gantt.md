---
title: How to Draw Gantt Charts in Mermaid
description: Complete tutorial on Gantt charts in Mermaid, covering task dependencies, critical path marking, milestones, and weekend/holiday exclusion.
date: 2026-03-04
slug: gantt
---

# How to Draw Gantt Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Gantt charts visualize project tasks as horizontal bars, showing start/end dates and dependencies. They are essential for project planning, sprint scheduling, and release management.

## Basic Structure

```
gantt
    title My Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task name : 2026-03-01, 5d
```
<a href="https://caoergou.github.io/mermzen/#HYo7DoAgEAV7T_EOIAlitLA2diQUNpYb3fiHBLbx9hKmnJmdvEiFjJzyMOwHF8PFq8A95EvZSHgK8SXBklHWqnEsJeXvDB7uoMRoipsp3fD0MgYYbXqlW6WbGt32Aw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `title` - Optional
- `dateFormat` - Required (YYYY-MM-DD recommended)
- `section` - Grouping for tasks
- Duration units: `d` (days), `w` (weeks), `h` (hours)

## Task Dependencies

```
gantt
    dateFormat YYYY-MM-DD
    section Development
    Backend  : be, 2026-03-01, 7d
    Frontend : after be, 5d
    QA       : after Frontend, 3d
```
<a href="https://caoergou.github.io/mermzen/#NYvBDoIwEAXvfsX7gDYpECXhhmm4ceDocaWLMcrW1I3fD7ZhrjPzIFE9YSeQ8hDTSorbjh1H6302X571GQWef_yOn5WlHFeaXywB6HBng9rVF-sa6yqDNuRiSFH0n3SgRTnl7lzc1KNwuCM2aMIG" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`after id` starts a task after another completes.

## Task States

```
gantt
    dateFormat YYYY-MM-DD
    Completed   : done,   2026-03-01, 3d
    In progress : active, 2026-03-04, 5d
    Pending     :         2026-03-09, 4d
    Critical    : crit,   2026-03-09, 3d
```
<a href="https://caoergou.github.io/mermzen/#XcrBCoMwDMbx-54iD9BCZ91guyrCDsKuO5YmlIK2UsOe32iZh32nf8gvuMR8ARk6piGX2TF8ZHocdd8fny7Py0RMKP0EzImUVGOauzZWm6sCiwd8JVhKDoXWVaDzHL9CT9gquFX4poQxhT0F_nbCh4K2wq5Ejt5NFXq51B-0uAE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Product Iteration

```
gantt
    title MermZen Blog Feature v1.0
    dateFormat YYYY-MM-DD
    excludes weekends

    section Design
    Requirements    : done,   req,    2026-03-01, 2d
    UI prototyping  : done,   ui,     after req,  3d

    section Development
    Template dev    : active, tpl,    after ui,   4d
    Article writing :         art,    after ui,   6d
    CI setup        :         ci,     after tpl,  2d

    section Launch
    QA testing      : crit,   test,   after ci,   3d
    Launch          : milestone,      after test, 0d
```
<a href="https://caoergou.github.io/mermzen/#ZZDNTsMwEITvfYp9gASlCeqht0JUqRI5gOAANytegoVju_Y6hbfHP2kDZS-JJzvfTDwwRbSCMCRIInRoxzdUcCf1AHtk5C3CtL6p0g5nhHttR0bwGqbsurJt0xf86qXn6OCE-ImKu1WSHfYktIIWnRhUkp7w6IXFERW5eN4C1wqL8GbxGB9QV_WmrJqyWhdQ82R6OYCxmjR9G6GG3yYvkgfYO6GdEQ2_Tp9QahMjk_6Mo5HhV4DjlCuwsDgFHhlZLLTMvs0VdpZEH27oZAXFDls4D7P0z7TJpvtDKEHenFcXU_-nd86tr3o_MK_6jyQ97oDQpeAZ1IceERHl4gLK2CanZ_8lMphGIcP6fHVLekJU_Ac" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://caoergou.github.io/mermzen/) and paste the code there.
