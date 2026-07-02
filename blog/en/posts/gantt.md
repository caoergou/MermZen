---
title: How to Draw Gantt Charts in Mermaid
description: Complete tutorial on Gantt charts in Mermaid, covering task dependencies, critical path marking, milestones, and weekend/holiday exclusion.
date: 2026-03-04
slug: gantt
---

# How to Draw Gantt Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Gantt charts visualize project tasks as horizontal bars, showing start/end dates and dependencies. They are essential for project planning, sprint scheduling, and release management.

## Why Use Gantt Charts?

Gantt charts are one of the most intuitive visualization tools for project management:

- **Visualize project timelines**: See all task start/end dates and durations at a glance
- **Identify task dependencies**: Clearly show which tasks must complete first and which can run in parallel
- **Spot delay risks**: Use critical path analysis to identify bottleneck tasks that could impact overall progress
- **Transparent team collaboration**: Help all team members understand the project scope and their responsibilities

## Basic Structure

```
gantt
    title My Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task name : 2026-03-01, 5d
```
<a href="https://eric.run.place/MermZen/#eJwlybEKwjAQBuBX-bm5gTSiQ-biFsjQJeBypIdW2wSaQxDx3R2yft-X3uTdQJk83bmo3goA6KqbIHwQj_qUrIgbl14Lq1zrsbMipZRMCGaaejXJutaC-OAmGDvO3F4ovAs8nHUXY0_GjgPOC_3-mhklWQ" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<a href="https://eric.run.place/MermZen/#eJw1y7EKwjAUheFXOWROIKaokE0J3To4BlxichXRJiVeuojvLpr2rP933mIW1kgRhRW3kJnPGQBSYOpLHQPDe-_VMCjnWnpR5HvJcDTTs0wj5eVzDPFBOQEWF5Iw2uyU7pTeSOxTI30tmX_GIlyZ6h9ul3g6oG2Nq5bokvh8AdmQMXw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<a href="https://eric.run.place/MermZen/#eJxdyrEKwjAUheFXOWS-gdpUwawtgkPBNeASklACbVLSSxfx3UVaFTzTD-d7iFXomoQTWgw2Md8TAHjL4ZLLZBnGGCP7XnbddrV5msfAwQPQ8DkFAlBX9UlWSlYHgvKbvCbMJQ8lLAs0rOO4BvrJhnDc5S0kH9PwTmh89pVnQrPLtkSOzo6bdCUy_UnlxfMFiPA3Yg" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## What is Critical Path?

The **critical path** is the longest chain of tasks from project start to finish. Any delay in critical path tasks directly delays the entire project.

```
gantt
    dateFormat YYYY-MM-DD
    section Critical Path Example
    Requirements    : crit, req, 2026-03-01, 3d
    Backend dev     : crit, be, after req, 5d
    Frontend dev    : fe, after req, 4d
    Integration test: crit, after be, 2d
    Deployment      : crit, after Integration test, 1d
```
<a href="https://eric.run.place/MermZen/#eJxdzk8LgkAQBfCvMux5Bf9UB49lQgchugVdpt2pJF11naSIvnvaGlhzW_b3Hu8pOhGHUigRizMa5oOB_jQypZUtkWHfn5dlXpK4r5YU55WBlc05V1jAFvkC6zuWdUGO7Ki55ZZKMtwO7xhUjyVYaiSEfrjw_MjzAwmRdoElqisZDZo6mAaOJAFPTNZF5yNPbWV44mM4_cLZCDc9O1v87GVq-dvr6NAejjKhuqgew2L4WeDkf4-EQIvXG5gCYVU" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

In this example, **Requirements → Backend dev → Integration test → Deployment** forms the critical path (11 days total). Frontend dev can run in parallel with Backend dev and doesn't affect the total duration.

**Tip**: Use `crit` to mark critical path tasks so the team can quickly identify which tasks cannot be delayed.

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
<a href="https://eric.run.place/MermZen/#eJxlkMFOwzAQRH9llXOC0hT1kFshqlSJHkBwCOrFsodg4dipvUlBiH9HidMWVF8i73rePOU7GZKySBOZlEkjLPPeEhGxZgPawbevsHRnXEMbCO49aFjc5PGREoyN861gquu6zna7rKriCp_S9AqBjsAHrAp7GxcBkrWzVCHoZp494dBrjxaWw3gvSTmLlIg8DuOHirxYZfkyyxcpFSqmXrbUeceOvzptm7-pXk8hEm8MPzOW6tpggHHd2BoXz2g7IxikMEQNIVkPSIk7k16AEX87a6w9a2lAR6959CjpdITnq9RqTt1vKYD77vT2kpL_5GNzcSX_IHor3-PscU2MMJXPLOn1VD2O0zMrkpezQSSca6mkVhsEnv_hxWBi5Cr5-QV7CaFF" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Best Practices

### Use `after` for Task Dependencies

Clearly define task dependencies to let the Gantt chart automatically calculate start times for subsequent tasks:

```
gantt
    dateFormat YYYY-MM-DD
    section Development Flow
    Requirements review  : req, 2026-03-01, 2d
    Technical design    : after req, 3d
    Implementation      : after Technical design, 5d
    Code review         : after Implementation, 1d
```
<a href="https://eric.run.place/MermZen/#eJxdTrsKwjAU_ZVL5gT6QIesloJDF3ERXEJyrYE0adPYDuK_G5si1jMdzuveJ5kILyiRhJNW2BCuFiKUCFg734kAlwjWNKyqkjWiDNpZqHBC4_oObYDauDm5Jxwe2uNHHcHjpHEG4JENFIqs2LOsZFkeuUr5M8q71VIYUDjqdtE4iFtAn0rlGjx2vVlmxXIdfoP_IxR2a-vgFH7fgG1ru0ghV-T1BsqMVEc" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Use `excludes weekends` for Non-Working Days

Make your Gantt chart reflect actual work schedules:

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    section Sprint
    Sprint 1 : 2026-03-02, 10d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJUwCClMSSVLf8otzEEoVIIND19dV1cYFIpVYk55SmpBYrlKemZqfmpRRDhItTk0sy8_MUgguKMvOgpkDYCoYKVgpGBkZmugbGugZGOgqGBilKtQDwRCRq" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Use `milestone` for Key Dates

Milestones are key time points in a project, marked with diamonds:

```
gantt
    dateFormat YYYY-MM-DD
    section Milestones
    Requirements freeze  : milestone, m1, 2026-03-10, 0d
    Code freeze          : milestone, m2, 2026-03-20, 0d
    Production release   : milestone, m3, 2026-03-25, 0d
```
<a href="https://eric.run.place/MermZen/#eJxlzjELwjAQhuG_cmROIE3RoaviVhA3wSU0n1JoEkyuDor_3UqoVnzHu3vgHuImGiNFJxpxsYH5FGjKWcYuJm-ZjlOqbdV2W1YZHfcxUNsPyBwDcpkfcB37BI_Amc4JuIOoIT-fSfKVJKPNWulaVVqSdkVuosNHzP1K85VmIfcpurG8kzDAZvzJeiFXbymeL2lRR4o" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Limit Tasks per Section to 5

Too many tasks make Gantt charts hard to read. If a phase has too many tasks, consider splitting into multiple sections or sub-projects.

## Common Pitfalls

### Overly Granular Tasks

**Problem**: Breaking tasks down to hourly levels makes the Gantt chart overly complex.

**Solution**: Use **1-5 days** as the minimum task unit. Finer-grained tasks are better managed with kanban boards or task lists.

### Ignoring Task Dependencies

**Problem**: All tasks have fixed dates without using `after` for dependencies.

**Consequence**: When predecessor tasks are delayed, subsequent tasks don't automatically adjust, making the Gantt chart unreliable.

**Solution**: Prefer `after` for dependencies, and only specify fixed dates when necessary.

### Not Marking Critical Path

**Problem**: All tasks use default colors, making it impossible to quickly identify which tasks have the most impact on project progress.

**Solution**: Use `crit` to mark critical path tasks so the team can focus on core work.

## Quick Reference

| Syntax | Function |
|--------|----------|
| `gantt` | Declare Gantt chart |
| `title Title` | Chart title |
| `dateFormat YYYY-MM-DD` | Date format |
| `excludes weekends` | Exclude weekends |
| `section Name` | Task group |
| `Task : Date, Nd` | Specify start date |
| `Task : after TaskID, Nd` | Depend on previous task |
| `Task : id, Date, Nd` | Task with ID |
| `:done` | Completed (gray) |
| `:active` | In progress (blue) |
| `:crit` | Critical path (red) |
| `:milestone` | Milestone marker |

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
