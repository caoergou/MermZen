---
title: How to Draw Pie Charts in Mermaid
description: Learn how to create pie charts in Mermaid. The simplest diagram type - just three lines of code.
date: 2026-03-04
slug: pie
---

# How to Draw Pie Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Pie charts visualize proportions of a whole. They are ideal for showing traffic sources, time allocation, or budget distribution.

## Why Use Pie Charts?

- **Intuitive proportion display** — Instantly see each part's share of the whole
- **"Part-to-whole" at a glance** — No calculation needed, proportions are obvious
- **Great for quick presentations** — Non-technical audiences understand easily

## Data Suitability

- **Optimal slice count: 3-7** — Too few looks sparse, too many becomes cluttered
- **Merge into "Other" beyond 7** — Keep the chart clean and readable
- **Best with clear differences** — Slice sizes should be visually distinct

## Best Practices

- **Arrange from largest to smallest** — Place the biggest slice at the start (usually top-right)
- **Most important at start position** — Reader's eyes land there first
- **Use contrasting colors** — Mermaid auto-colors, adjacent slices are distinct

## When NOT to Use Pie Charts?

- **More than 7 categories** — Consider bar charts instead
- **Similar values** — Like 30% vs 35%, hard to distinguish visually
- **Need precise comparison** — Bar charts are better for exact values
- **Negative or zero values** — Pie charts can't show negatives, zero slices are meaningless

## Basic Syntax

```
pie title My Pie Chart
    "Category A" : 25
    "Category B" : 35
    "Category C" : 40
```
<a href="https://eric.run.place/MermZen/#eJwryExVKMksyUlV8K1UCABynDMSi0q4FIBAyTmxJDU9v6hSwVFJwUrByBRN1Akkaowu6gwSNTEAAGUWF6I" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<a href="https://eric.run.place/MermZen/#eJwtyTEKgDAMQNHdUwRvYHEQZ1cRrBcIIbWB0kqsg7fX0v7x_UsYsuTAsKaYfXjhUHROCGx6lPju4K_f9MRYkFHJ9zDDaOpZRJlyETNVsYkEQ5Ghyc6OVZuZDwsuIE0" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Development Time Allocation

```
pie title Development Time Distribution
    "Requirements" : 15
    "Frontend" : 35
    "Backend" : 25
    "Testing" : 15
    "Documentation" : 10
```
<a href="https://eric.run.place/MermZen/#eJwryExVKMksyUlVcEktS83JL8hNzStRCMnMBQpkFpcUZSaVlmTm53EpAIFSUGphaWZRKkhJsZKClYKhKUTcrSg_ryQ1LwUkZgwVc0pMzoYKGUGFQlKLSzLz0pF1uuQnl4KMSwRZApYwAAAiQyp7" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
