---
title: How to Draw Pie Charts in Mermaid
description: Learn how to create pie charts in Mermaid. The simplest diagram type - just three lines of code.
date: 2026-03-04
slug: pie
---

# How to Draw Pie Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Pie charts visualize proportions of a whole. They are ideal for showing traffic sources, time allocation, or budget distribution.

## Basic Syntax

```
pie title My Pie Chart
    "Category A" : 25
    "Category B" : 35
    "Category C" : 40
```
<a href="https://caoergou.github.io/mermzen/#K8hMVSjJLMlJVfCtVAgAcpwzEotKuBSAQMk5sSQ1Pb-oUsFRScFKwcgUTdQJJGqMLuoMEjUxAAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

Key features:
- `pie title` adds a chart title
- Values don't have to sum to 100 - Mermaid calculates percentages
- Use `showData` to display exact percentages
- Use `textPosition` to customize labels

## Examples

### Traffic Sources

```
pie title Monthly Traffic Sources
    "Organic Search" : 42
    "Direct" : 28
    "Social" : 18
    "Referral" : 12
```
<a href="https://caoergou.github.io/mermzen/#LckxCoAwDEDR3VMEb2BxEGdXEawXCCG1gdJKrIO319L-8f1LGLLkwLCmmH144VB0TghsepT47uCv3_TEWJBRyfcww2jqWUSZchEzVbGJBEORocnOjlWbmQ8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Development Time Allocation

```
pie title Development Time Distribution
    "Requirements" : 15
    "Frontend" : 35
    "Backend" : 25
    "Testing" : 15
    "Documentation" : 10
```
<a href="https://caoergou.github.io/mermzen/#K8hMVSjJLMlJVXBJLUvNyS_ITc0rUQjJzAUKZBaXFGUmlZZk5udxKQCBUlBqYWlmUSpISbGSgpWCoSlE3K0oP68kNS8FJGYMFXNKTM6GChlBhUJSi0sy89KRdbrkJ5eCjEsEWQKWMAAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://caoergou.github.io/mermzen/) and paste the code there.
