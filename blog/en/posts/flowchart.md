---
title: How to Draw Flowcharts in Mermaid
description: Complete guide to Mermaid flowchart syntax including node shapes, connector types, subgraphs, and conditional logic with practical examples.
date: 2026-03-04
slug: flowchart
---

# How to Draw Flowcharts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Flowcharts visualize process steps and decision paths, making them ideal for user flows, approval processes, or algorithm descriptions. Mermaid uses either `graph` or `flowchart` keywords for flow diagrams.
<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" width="100%" height="600" frameborder="0"></iframe>

## Why Use Flowcharts?

Flowcharts excel at **clearly expressing process steps and decision paths**. Compared to plain text descriptions, flowcharts can:

- Visually display branching logic, avoiding missed edge cases
- Help team members quickly understand business rules
- Serve as development documentation, reducing communication costs

**Ideal Use Cases:**
- User flows: login, registration, checkout processes
- Business approval logic: leave requests, expense approvals
- Algorithm flows: search, sort, calculation logic

## Practical Use Cases

### User Flow Example

User login flow is the most common flowchart application, clearly showing validation, error handling, and success redirect branches:

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
<a href="https://eric.run.place/MermZen/#eJxNjk1OwzAQRq8y8qqVqITorgtQ0_yQghAiZYFMFsYeiNXURmPTIiU9AAfhYpwE1Ukg63nfe9OwPVtcnDHJFuyNxHsFm_jZAAAsJ7zwgnw5hdnsEiL-6JAAjUdyIAkVGq9F7coOjwK1apZS2g_jAT-18-7q2F1Xp2t7Z1uIeVHZAyCRpX4ad4Ex-YSuhaS5F84dLCnYi1qrQZb8yVKeG0m4Q-PhVegaQrvXpkGbNanQtYOfr2-YD4bsP3LNb63cgujfnp_DTptyjJ1C0bgcdjnP0CAJj1Cgc9oa2NgtDtM8xNf8AZUmlB68BSVc9WIFqZ5ZB-ZmwhOjyik7_gJxL3n6" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Business Approval Example

Leave approval flow demonstrating multi-level approval logic:

```
graph TD
    A([Start]) --> B[Submit leave request]
    B --> C{Days ≤ 3?}
    C -->|Yes| D[Direct supervisor approves]
    C -->|No| E[Department manager approves]
    D --> F{Approved?}
    E --> F
    F -->|Yes| G[Update attendance system]
    F -->|No| H[Notify rejection]
    G --> I([End])
    H --> I
```
<a href="https://eric.run.place/MermZen/#eJxljkFOwzAQRa8y8qqV6AZ2XYDaOm3ZdFNYIOPFkAzFiNhmPIkUJT0A9-BknAQ1BlGJ5bz_9P_0qlXzywtVqrk6MMYXuNOPHgBgMTF7QRY7hdnsGpZm3zzVTuCNsCVgem8oic3uclRWvcYuwdfHJ1zdHHOyOiXDA6UBtNGOqRRITSRuXQoMGCOHlpI9t3dhgMJoishSkxeo0eOB_tl6XF33i4yr380i83ys_x7YmPtYoRCgCPkKfUmQuiRU23P3NL81uyDuuQOmVyrFBf-jbMbu24kpfGWnmW0zU8dvd3ln1A" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Algorithm Flow Example

Binary search algorithm flowchart:

```
graph TD
    A([Start]) --> B[Initialize left=0, right=n-1]
    B --> C{left ≤ right?}
    C -->|No| D[Return -1 not found]
    C -->|Yes| E[Calculate mid = left + right / 2]
    E --> F{"arr[mid] == target?"}
    F -->|Yes| G[Return mid]
    F -->|No| H{"arr[mid] < target?"}
    H -->|Yes| I[left = mid + 1]
    H -->|No| J[right = mid - 1]
    I --> C
    J --> C
    D --> K([End])
    G --> K
```
<a href="https://eric.run.place/MermZen/#eJxlkE1uwjAUhK8y8goEUYElqotKEkio1EXbTeV4YRETLAUHuU4XTThA79GT9SRVbH4idTlv5n1v9BrySeazMdmSOSmMOO7xFmUaAB4H7NUKY_kQQfCAJUu1skqU6kuilDtLJ2MYVewt1cGU-52li4ZN5-P3-8cHFifvhp3bPlctIvYibW00gil0ZbGrap3zfupdfrSIWSjKbV0KK3FQOag7jJHH4g6z807s7q6ajAhj2EHlHJTCClNIu8jI-f7qRl5fCnTZvtu1S_qc-3-Y5IZJmStEXbsRLm9IrqgN81V9IrgmUv8oLzZ9ETnxNGCxzvnQz9Z-Rk5_sDF9gw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Declaring a Chart

```
graph TD
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<a href="https://eric.run.place/MermZen/#eJwtjbEOwiAURX_l5U2QmJg4dtOi7q0bMrzCSyWh0CC4NP13Bzqec25yN_xhdzmhxQ7nTOsHXuodAQCuemBbKM6BTTM3MaQaHTvIbItsst-UpyVFtzdWQvQ-28DyGNyFHgs5Xxc4w-pDMEd4aD3WKadafGRzfDy1UFRooi9Lg_sf8Hkwvw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

| Syntax | Shape | Usage |
|--------|-------|-------|
| `A[text]` | Rectangle | Step / action |
| `A(text)` | Rounded rectangle | Subprocess |
| `A{text}` | Diamond | Decision / condition |
| `A((text))` | Circle | Connector / junction |
| `A([text])` | Stadium | Start / end |

### Node Shape Selection Guide

Choosing the right node shape makes flowcharts more readable:

| Shape | Syntax | Best For |
|-------|--------|----------|
| **Rectangle** `[text]` | Regular steps, actions, processes | Most common, represents operations |
| **Diamond** `{text}` | Decision conditions, branching | Must have at least two exits (yes/no) |
| **Circle** `((text))` | Connectors, junction points | For cross-page links or flow merging |
| **Stadium** `([text])` | Start/end nodes | Beginning and end of flow |

**Selection Tips:**
- Every flowchart should have clear start and end nodes (stadium shape)
- Use diamonds for decisions, with labeled exits (yes/no, success/fail)
- Use rectangles for regular processing steps
- Avoid overusing special shapes to keep diagrams clean

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFDwCYrJU1BQUHBU0NW1U3BCcHQVnOEcPV07BRcYz9bWTsEVoS4nMSk1B6TXDcmgGrBojYK7Ui0AIbcbvA" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUCguTYIIuBXl55Wk5qVAhEHAMTrUU8EnsTK1KFZBV9dOwSk6LDEnMyWxJDM_LxaiDK4eboxTYnI2iinO0Y4BnhADXKJdEksSkxKLU9G1O4HlnZVqAbsAMTo" width="100%" height="600" frameborder="0"></iframe>

## Best Practices

### 1. Limit Decision Nodes Per Layer

Keep decision nodes to **no more than 2 per layer** to avoid overly complex flowcharts:

```
graph TD
    A[Start] --> B{Condition 1?}
    B -->|Yes| C{Condition 2?}
    B -->|No| D[Process A]
    C -->|Yes| E[Process B]
    C -->|No| F[Process C]
```

If more decisions are needed, consider splitting into multiple sub-flows or using subgraphs.

### 2. Always Label Branch Exits

Every decision node branch should have a clear label:

```
graph LR
    A{Login success?} -->|Yes| B[Go to home]
    A -->|No| C[Show error]
```

**Recommended labels:** Yes/No, Success/Fail, Approved/Rejected, Valid/Invalid

### 3. Use Subgraphs to Group Related Nodes

Group related nodes with `subgraph` for better readability:

```
graph TD
    subgraph Client
        A[User Request] --> B[Authentication]
    end
    subgraph Server
        C[API Gateway] --> D[Business Logic]
        D --> E[Database]
    end
    B --> C
```
<a href="https://eric.run.place/MermZen/#eJxdjT0LwjAURf_KI7NdHDsIbSIiOIgfU-zwGh9toKSal1RE_O_WZij0jvcezv2IQeTrlTAiF43HRwsXdXMwhmOdCtlZciGV_xT6yuThRM9IHCrIsg2UuoihHTFrMNjeVQknd1_IzuQH8rNM6uK4hx0GeuE7uZQuI1tHzHDoG2uqmVYTsNUKA9bItLwpp12K7w-tyz_5" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### 4. Maintain Consistent Flow Direction

- **Top to bottom (TD)**: Most common, suitable for most business flows
- **Left to right (LR)**: Good for state machines, data pipelines, timelines

Avoid mixing multiple directions in the same diagram.

## Comparison with Other Diagrams

| Feature | Flowchart | Sequence Diagram | State Diagram |
|---------|-----------|------------------|---------------|
| **Core Focus** | Process steps + decisions | Object interaction order | State transitions |
| **Best For** | Business flows, algorithms | API calls, system interactions | State machines, lifecycles |
| **Decision Branches** | ✅ Primary focus | ❌ Not emphasized | ✅ Conditional transitions |
| **Time Sequence** | ⚠️ Optional | ✅ Core element | ⚠️ Implicit |
| **Participants** | ⚠️ Optional | ✅ Required | ❌ Single object |

**Selection Guide:**
- Need to show **decision branches**? → Flowchart
- Need to show **interaction order between objects**? → Sequence Diagram
- Need to show **state changes of a single object**? → State Diagram

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
<a href="https://eric.run.place/MermZen/#eJxNjk1OwzAQRq8y8qqVqITorgtQ0_yQghAiZYFMFsYeiNXURmPTIiU9AAfhYpwE1Ukg63nfe9OwPVtcnDHJFuyNxHsFm_jZAAAsJ7zwgnw5hdnsEiL-6JAAjUdyIAkVGq9F7coOjwK1apZS2g_jAT-18-7q2F1Xp2t7Z1uIeVHZAyCRpX4ad4Ex-YSuhaS5F84dLCnYi1qrQZb8yVKeG0m4Q-PhVegaQrvXpkGbNanQtYOfr2-YD4bsP3LNb63cgujfnp_DTptyjJ1C0bgcdjnP0CAJj1Cgc9oa2NgtDtM8xNf8AZUmlB68BSVc9WIFqZ5ZB-ZmwhOjyik7_gJxL3n6" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
