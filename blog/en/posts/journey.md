---
title: How to Draw User Journey Diagrams in Mermaid
description: Comprehensive guide to Mermaid user journey diagram syntax including phase division, touchpoints, emotional curves with practical pain point analysis and real-world applications.
date: 2026-03-05
slug: journey
---

# How to Draw User Journey Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

User Journey Maps are **core tools in UX design** for visualizing the complete process of user-product interaction. Their core value lies in:

- **Identifying Pain Points**: Discovering breakpoints and high-friction areas in user experience
- **Quantifying Emotions**: Rating user emotional state at each touchpoint (1-5 scale)
- **Driving Optimization**: Providing data support for product iterations

Mermaid uses the `journey` keyword for user journey diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslLKyi8tykutjMlTUFBQKMksyUlVCC1OLVLwgogruGQmphcl5iqEgKSUagEtyROq" width="100%" height="600" frameborder="0"></iframe>

## The Rating System: Why 1-5?

Emotional scoring is the core value of Journey diagrams. Understanding the rating basis is crucial:

| Score | Emotional State | Typical Manifestation | Design Insight |
|-------|-----------------|------------------------|----------------|
| **5** | Delighted | Smooth flow, exceeds expectations, has surprises | **Maintain advantage**, can be highlighted in marketing |
| **4** | Satisfied | Normal flow, no obvious obstacles | Normal level, continue monitoring |
| **3** | Neutral | Acceptable but has room for improvement | **Optimization candidate**, check competitor approaches |
| **2** | Annoyed | Complex flow, long wait times, needs improvement | **Priority optimization**, affects conversion rate |
| **1** | Frustrated | Flow broken, serious issues, user churn | **Urgent fix**, may cause abandonment |

### Where Do Scores Come From?

In real projects, ratings should come from:

1. **User Interviews**: Directly asking users about their experience
2. **Survey Research**: NPS (Net Promoter Score) surveys
3. **Behavioral Data**: Page duration, bounce rate, conversion funnel
4. **Customer Support Tickets**: Complaint types and frequency statistics

## Declaring a Chart

Use `journey` keyword:

```
journey
    title User Journey Diagram Title
```

## Pain Point Identification Example

This example shows **how to identify pain points through Journey diagrams**:

```
journey
    title Shopping Journey: Pain Point Perspective
    section Discovery
      Search Engine : 5: User
      Ad Click : 2: User
      Social Media Recommendation : 4: User
    section Consideration
      Product Detail Reading : 5: User
      User Review Viewing : 4: User
      Price Comparison : 3: User
    section Purchase
      Add to Cart : 5: User
      Fill Address : 2: User
      Select Payment Method : 3: User
    section Delivery
      Order Confirmation : 5: User
      Logistics Tracking : 4: User
      Confirm Receipt : 5: User
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1Ub1OwzAYfJVTZqZSlmwohQFREbXAxGLZR_NRx44-u6kqxLujtI1ooWy27nx__iz6opxcFbYoi4-40cDdWwCALNkTyyZ2nYQVHg5YidpIQB0lZNTU1NFm6Xl4k4ZLDJhJsrGnHqWAJY3aBndhJYEocVPiJVFH-Nah8mLXKDE5R5bRivGY04nBgja2LYMze5cS01PyaF7FkMRR96RRp9boNjZjxmzEY0HjhlZ_kgxnLNgLt3gVbg-k6TmpVrFEFdvOqKR9kutLSeqN2sYk_tR0yBGV0fzX-V68HxjKlC7sQE-bUZtdy5AxZ26i-893Ri-n6z-pow67vIu243a_7B_jSlIWm_Csxq4v9j4qDP9A6U46FF_fPk-3VA" width="100%" height="600" frameborder="0"></iframe>

### Pain Point Analysis

| Low-Score Touchpoint | Score | Possible Reasons | Optimization Direction |
|----------------------|-------|------------------|------------------------|
| Ad Click | 2 | Ad content doesn't match landing page, slow redirect | Improve ad targeting, speed up landing page |
| Fill Address | 2 | Many form fields, no autofill, manual input required | Add address suggestions, auto-location, one-click fill |
| Select Payment | 3 | Few payment options, complex interface | Simplify payment flow, add mainstream payment methods |

**Key Insight**: `Fill Address` scores only 2, it's a **critical breakpoint in the conversion funnel**, should be prioritized.

## Before & After Optimization Comparison

Journey diagrams can visually show optimization effects:

### Before: Address Filling Flow

```
journey
    title Before Optimization: Address Filling
    section Fill Address
      Select Province : 3: User
      Select City : 3: User
      Enter Detailed Address : 2: User
      Manually Enter Zip Code : 2: User
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJxlzbsKAjEQheFXOaS2Wrt0umonCmIjNiEZZWRMlmR2YRXfXbyjtvN_hzmbzthqYLyx5pDaHKnfRgBQViGMaZcyYdEoH_nklFO0GIWQqRTMWITj_uEL-Vu9H1_iUYAVCXnFMqeOoydYDC3WhfIPqFn7_ziNShkTUsdC4f3dovp2cxdbJ9I_BxtuUKdAH2guV9SOS18" width="100%" height="400" frameborder="0"></iframe>

**Problem**: Average score ~2.5, multiple steps requiring manual operation.

### After: Address Autofill

```
journey
    title After Optimization: Address Autofill
    section Fill Address
      Auto-detect City : 5: User
      Address Suggestion Input : 4: User
      Zip Code Auto-fill : 5: User
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJxVzT0LwjAUheG_csisi-iSLRQEJwdxKS6S3JYrMSnJjVDF_y5t_MD5PLznoW5KrxbKKq0usaRA4ykAgLB4gumEEvaD8JXvZ-EYNIxziXKGKRI79r76THaasWXvP6QumOXSkZAVNCwjNDYax0zpK97NQ-l7ynNoF4Yi0Fj_y5YHNNFRjU7_v5p6vgCHnUKT" width="100%" height="400" frameborder="0"></iframe>

**Result**: Score improved to 4.7, steps reduced from 4 to 3, user completion rate significantly increased.

## Full Example: E-Commerce User Journey

```
journey
    title E-Commerce User Journey: Emotional Curve Insights
    section Need Recognition
      Recognize Need : 4: User
      Define Requirements : 5: User
      Product Research : 4: User
    section Information Gathering
      Search Products : 5: User
      Browse Details : 4: User
      Compare Reviews : 5: User
      Compare Prices : 3: User
    section Purchase Decision
      Add to Cart : 5: User
      Fill Address : 2: User
      Select Payment : 3: User
      Confirm Order : 4: User
    section Delivery Experience
      Payment Success : 5: User
      Logistics Tracking : 4: User
      Confirm Receipt : 5: User
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1kc1OwzAQhF9llTNcClxyg7SgIgRRCjcu1maaLCR2WTspBfHuKE2D-hNulmd29vP4O2qjeHIWcRRHb65Ri82rJSIKEirQ7DxxdQ1l0IuH0n1viWlWuyDOmoqSRlvQ3HopyuD7YQ_uVHoEcsrArrDSXfQqDVdf6B0xXcbb_EGfYikWlOGjEUUNGzzFdHVoStXlDQfK4GGUy-OYAWJul05rsz3fmVBCxRZDyKIf3WWNbLlRt_agKYKRyp-iJq5eGe1YW8F6JGAwpCqMTr8Yg0wb5dJsF7H4vaqu85yCo8RoOM2-larqHArfJU8O1QUqcKDUbLoGjzd3ZHYpWtOT5tD_2puikha6odnnCiqwjL8P2AUvGuYe4AjvwRXig7CnZzX8LrYY66-HyMCQ1d4bo59f2zXSlw" width="100%" height="600" frameborder="0"></iframe>

### Key Insights

From the emotional curve, we can clearly see:

- **High Points** (5): Search products, compare reviews, add to cart, payment success, confirm receipt
- **Low Points** (2-3): Fill address, select payment, compare prices

**Action Recommendations**:
1. **Priority**: Optimize address filling (introduce autofill)
2. **Secondary**: Simplify payment selection, add price comparison tools
3. **Monitor**: Continuously track emotional changes in price comparison

## Quick Reference

| Syntax | Function | Example |
|--------|----------|---------|
| `journey` | Declare user journey | `journey` |
| `title Title` | Set chart title | `title User Journey` |
| `section Phase Name` | Divide journey phases | `section Purchase Phase` |
| `Touchpoint : Score: Role` | Define touchpoints and emotions | `Search : 5: User` |
| `%% comment` | Line comment | `%% This is a comment` |

## Real-World Application Scenarios

| Scenario | How to Use Journey Diagrams |
|----------|------------------------------|
| **Product Reviews** | Show user paths, discuss optimization priorities |
| **Team Alignment** | Let engineering, design, operations understand user perspective |
| **Competitor Analysis** | Compare experience across touchpoints |
| **A/B Testing** | Compare emotional curves before and after |
| **OKR Setting** | Set experience optimization goals based on pain points |

## Next Steps

After mastering user journey diagrams, you can:
- Combine with [Sequence Diagrams](sequence.html) to analyze system interactions
- Use [Flowcharts](flowchart.html) to map business processes
- Check our [Mermaid Cheat Sheet](../cheat-sheet.html) for complete syntax reference

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.