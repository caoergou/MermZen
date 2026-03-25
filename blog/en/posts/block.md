---
title: How to Draw Block Diagrams in Mermaid
description: Comprehensive guide to Mermaid block diagram syntax including component definition, connection relationships, nested structures with complete system architecture example.
date: 2026-03-05
slug: block
---

# How to Draw Block Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Block diagrams visualize complex system component structures, hierarchical relationships, and connections. They are ideal for system architecture design, network topology, and industrial flow diagrams. Mermaid uses `block-beta` keyword for block diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVVwAgkquGQmphcl5iqEgMSUagHDVxFl" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `block-beta` keyword:

```
block-beta
    title Block Diagram Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVVwAgkquGQmphcl5iqEgMSUagHDVxFl" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Basic Block Definition

Create simple blocks and connections:

```
block-beta
    title Basic Block Diagram
    block "Block A"
    block "Block B"
    block "Block C"

    "Block A" --> "Block B"
    "Block A" --> "Block C"
    "Block B" --> "Block C"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVVwSizOTFZwAkkpuGQmphcl5kKkwaoVYpQgUo4xStiEnbALO4OEIRJIBijo6tph6sSlwBldgROmAqVaAE2fQGU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Nested Block Structures

Create complex nested structures with sub-blocks:

```
block-beta
    title Nested Block Diagram
    block "System" {
        block "Subsystem 1" {
            block "Component A"
            block "Component B"
        }
        block "Subsystem 2" {
            block "Component C"
            block "Component D"
        }
    }

    "Component A" --> "Component C"
    "Component B" --> "Component D"
    "Subsystem 1" --> "Subsystem 2"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVXwSy0uSU1RcALJKbhkJqYXJeZC5MHKFWKUgiuLS1JzY5QUqiHiKHKlScVgaQVDVAXIipzzcwvy81LzShQcY5QIKXFCVlKLz0YjYmx0JmyjCxYba2PyIAw01yvo6tphNx_NDxgKXRAKUQMNohDFW0q1AFyBfs4" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Network Topology

```
block-beta
    title Company Network Topology
    block "Headquarters Network" {
        block "Core Switch"
        block "Server Cluster" {
            block "Web Server"
            block "Database Server"
            block "Application Server"
        }
        block "Office Network" {
            block "Employee Computers"
            block "Printers"
        }
    }
    block "Branch Office" {
        block "Branch Switch"
        block "Local Server"
        block "Employee Devices"
    }
    block "Internet"

    "Core Switch" --> "Web Server"
    "Core Switch" --> "Database Server"
    "Core Switch" --> "Application Server"
    "Core Switch" --> "Employee Computers"
    "Core Switch" --> "Printers"
    "Core Switch" --> "Internet"
    "Branch Switch" --> "Local Server"
    "Branch Switch" --> "Employee Devices"
    "Branch Switch" --> "Internet"
```
<a href="https://eric.run.place/MermZen/#eJyF0bFOwzAQBuBXOXmmC2MHJJoigYQAqZVYslzMlVp1bddxUkVV3h0FB3CTs5jvs_37v4toxfL2RkixFJW28rCigKUBAAgqaILCHh2aDl4onK0_wNY6q-1nF833ESjFI-HHqUEfyNc_tBRwiSqVhfUEm7MKcl-K-XhDviUPhW7qQP76itS9UwXRprekYo0BK6zpH3bvnFYSg7KGkf084etupyTxn0zdw9Fp21FssBmKyUV488pM5-PD_XXNK49G7iFG4PsdSb7hZytRM1-d5V5TqyT9pppEeRoiGwrDOE4mu4XF4o5dFO8y6-Jxfmm8z--C99ON8CqtIKpJ-aPjGs_ZXPs5_5dB9F9kSycC" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `block-beta` | Declare block diagram |
| `title Title` | Set chart title |
| `block "Name"` | Define block |
| `block "Name" { ... }` | Define block with sub-blocks |
| `"Block1" --> "Block2"` | Define connection between blocks |
| `%% comment` | Line comment |

## Next Step

After mastering block diagrams, continue learning [Mermaid Requirement Diagrams](requirement.html) for project requirements management and analysis.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
