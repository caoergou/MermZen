---
title: How to Draw Timeline Diagrams in Mermaid
description: Comprehensive guide to Mermaid timeline diagram syntax including phase division, event description, and timeline visualization with complete product development planning example.
date: 2026-03-05
slug: timeline
---

# How to Draw Timeline Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Timeline diagrams visualize project progress, historical events, product development plans, and time-related information. They are ideal for project management, historical research, and product planning. Mermaid uses `timeline` keyword for timeline diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXDOSCwqUQgBsZVqATj2Dmc" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `timeline` keyword:

```
timeline
    title Chart Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXDOSCwqUQgBsZVqATj2Dmc" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Phase Division

Divide timeline into phases, each containing multiple events:

```
timeline
    title Product Development Timeline
    2024-01 : Project Initiation
      - Requirements Analysis
      - Technology Selection
    2024-02 : Architecture Design
      - System Architecture
      - Database Design
    2024-03 : Frontend Development
      - Page Layout
      - Interactive Implementation
    2024-04 : Backend Development
      - API Development
      - Database Development
```
<a href="https://eric.run.place/MermZen/#eJx1j0FLw0AQhf_KY88Wauxpb5EgBDwE22Mv63ZIRzezdXcSCMX_LjVgEtHrvO99vLmawdjiznhjjXJHgYWOAgDKGghNiqfeKyoaKMRLR6I4rLhiW-w223vYG_tGXlELKzvlKBMBbPBCHz0nuvUzSnFhzJzn-ED-LDHEdsSeAvm5POkLWJTJn1nJa58IFWVuF_79mJW6FTOHlVP36vK6NYkfYPGUoijJafnkXG5cS3h2Y-wXx1qUkvPKA6HuLuH7Mfd79Q4Wj86__-sum_rvYLH4JzWfX9nlhwM" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Detailed Event Description

Add detailed event descriptions for each phase:

```
timeline
    title Project Milestones
    Phase 1 : Requirements Analysis & Planning
      - Complete user needs research
      - Determine project scope
      - Develop detailed plan
    Phase 2 : System Design & Architecture
      - Complete system architecture
      - Database design review
      - Confirm technical architecture
    Phase 3 : Development & Implementation
      - Frontend interface development
      - Backend API development
      - Database implementation
    Phase 4 : Testing & Deployment
      - Unit and integration testing
      - System integration testing
      - Performance testing
```
<a href="https://eric.run.place/MermZen/#eJx9kLtOw0AQRX_lykUqKHhU7gIWUgoki0dHs6xvkoH1rNmdBEWIf0fGSRwki26lOXPmaL-KbVFenhW-KAuTlkGULwoAJhaIOsU3esO9BGaLyjxM67XLxAVKPPBjI4kt1TLm6sIuS8YMdXCqoquBB85xG9su0IhNZoKSTUZipkt-PVIVjakVJbr97exjx1NgyxA7NDQngQ264PS06hIlHnfZ2KJilpVihnnyazF62yROFOUBd5NU5cy99uJmsCVuhZ-nFl1KamH0axXvwoRnKLtCecjv_wszLPqA_u1Moo7OuxTVqA1EjWnpfH_9uDhyN86_99i8XkwDx3iZuDRUXaPEE7OJrjBDxS7E3V_Js4rB7WtW6dcAG1ZGav_n_zI10zKm1qnnYVh8_wBkJtT2" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Full Example: Product Development Planning

```
timeline
    title 2024 Product Development Plan
    Q1 : First Quarter
      - Complete user requirements research
      - Determine product feature scope
      - Develop detailed development plan
      - System architecture design
    Q2 : Second Quarter
      - Frontend interface development
      - Backend API development
      - Database design and implementation
      - Basic functionality testing
    Q3 : Third Quarter
      - Advanced features development
      - User experience optimization
      - System integration testing
      - Performance testing and optimization
    Q4 : Fourth Quarter
      - Product beta testing
      - Collect user feedback
      - Final feature improvements
      - Product official release
```
<a href="https://eric.run.place/MermZen/#eJxtkk9PwzAMxb-K1TNIMDj1BkxI3DYBNy5e8rpZS5PiuBN_xHdH2VYodNf4xe9n-31Wu6qenVWuqiuTFkEiXiIRkYkF0Oxidk0LTb53RnPsEFLXIhotAseDcHlJNd2LZqNlz2rQwzvROd2ltgswUJ-hpHjtRVH-Z1JksLrNr3gOg7YSQd3RsAFbr6DsUoexcM9BHsYS4MmPwLofsCJ9fM-GloqRGNy-m0eW9QA_o5oe4VL0U_p7TdEQPUk0aMMOY6df3S27bZHdLB5OC-ZsvOI8WBOXnmUzRcYmKY6bZXHU9NGVdw5i72TIJnF9RL6imp42oieIb_yOo4MfNpdP8zyXa-CtgwqiA6XOpJWPfyTH3ZXh17qv_QUpmgW0SdoW06G4n27acXldYpJ6tc2Ue0jYCsZTk7sUApwdQtQAfsVuOzqTRA4_WZG207Q7hGxqkJpGnHAgRQBnVF_f5D_-yw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Why Use Timeline Diagrams?

Timeline diagrams are linear narrative tools for visualizing the chronological order and development of events.

### What Problems Do They Solve?

- **Visualize chronological order**: Clearly show the sequence of events at a glance
- **Track milestones**: Mark key nodes for easy review and summary
- **Narrative expression**: More storytelling than tables, ideal for presentations
- **Simplify complex timelines**: Condense lengthy history or project progress into visual charts

### Comparison with Gantt Charts and Flowcharts

| Diagram Type | Core Feature | Use Case |
|-------------|-------------|----------|
| **Timeline** | Linear narrative, emphasizes chronological order | Historical events, project milestones, product evolution |
| **Gantt Chart** | Shows task duration and parallel relationships | Project progress management, resource scheduling |
| **Flowchart** | Shows decision branches and process flow | Business processes, algorithm logic, decision trees |

**Key Difference**: Timeline diagrams do not show task duration, only mark the time points when events occur.

### Suitable Scenarios

✅ **Suitable**:
- Product version release history
- Company development milestones
- Historical/biographical event summaries
- Project key node reviews

❌ **Not Suitable**:
- Need to show task duration → Use Gantt chart
- Need to show parallel tasks and dependencies → Use Gantt chart
- Need to show decision branches → Use flowchart
- Need to show organizational structure → Use org chart

## Best Practices

### Recommended Number of Phases

Keep it between **3-8 phases**:

- **Fewer than 3**: Insufficient information, consider using lists or tables
- **3-5**: Best readability, ideal for presentations
- **6-8**: Suitable for detailed planning, but watch the layout
- **More than 8**: Consider splitting into multiple timelines or using other charts

### Events Per Phase

Recommend **1-5 events per phase**:

```
timeline
    title Recommended Event Count Example
    Q1 : First Quarter
      - Requirements research    ✅ 1-5 events optimal
      - Technology selection
      - Architecture design
    Q2 : Second Quarter
      - Core feature development ✅ Keep it concise
      - Unit testing
```

**Avoid over-segmentation**:
```
timeline
    title ❌ Not Recommended: Too Many Events
    Q1 : First Quarter
      - Requirements research
      - Requirements review
      - Requirements confirmation
      - Technology selection
      - Technology review
      - Technology confirmation
      - Architecture design
      - Architecture review
      - ... (too many details)
```

### Choosing Time Span

Select appropriate time granularity based on content:

| Time Span | Recommended Granularity | Example |
|-----------|------------------------|---------|
| Within 1 year | Month/Week | Quarterly planning, project sprints |
| 1-5 years | Quarter/Month | Product roadmap, annual plan |
| Over 5 years | Year/Decade | Company history, industry development |

## Common Mistakes

### Mistake 1: Timeline is Not a Gantt Chart

❌ **Misconception**: Thinking timelines can show task duration

```
timeline
    title ❌ Timeline Cannot Express Duration
    Q1 : Development Phase (3 months)  ← Cannot show "duration"
      - Frontend development
      - Backend development
```

✅ **Correct Approach**: Timelines only mark time points; use Gantt charts for duration

```
gantt
    title ✅ Use Gantt Chart to Show Duration
    dateFormat YYYY-MM
    section Development
    Frontend development     :2024-01, 3M
    Backend development      :2024-01, 3M
```

### Mistake 2: Don't Over-Segment

❌ **Over-segmentation**: Including every small task

```
timeline
    title ❌ Over-segmented
    Week1 : First Week
      - Monday meeting
      - Tuesday documentation
      - Wednesday coding
      - Thursday testing
      - Friday deployment
    Week2 : Second Week
      - Monday meeting
      - ...
```

✅ **Appropriate summarization**: Focus on key milestones

```
timeline
    title ✅ Focus on Key Nodes
    Week1 : First Week
      - Complete requirements review
      - Start development
    Week2 : Second Week
      - Complete core features
      - Pass testing
```

### Mistake 3: Timeline is Not a Flowchart

Timelines emphasize **chronological order**, flowcharts emphasize **logical branches**:

- Need to show "if...then..." decision logic → Use flowchart
- Need to show "first...then..." chronological order → Use timeline

## Quick Reference

| Syntax | Function |
|--------|----------|
| `timeline` | Declare timeline diagram |
| `title Title` | Set chart title |
| `Phase Name : Description` | Define timeline phase |
| `- Event` | Event within phase |
| `%% comment` | Line comment |

## Next Step

After mastering timeline diagrams, continue learning [Mermaid Mindmaps](mindmap.html) for organizing ideas and information architecture design.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
