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

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1UctOwlAQ3fsV9xt8bPgdwwJjIBFcuCtikUeAQouAojwCFDC0LApYWvBnOnOHlb_glWJitd7VTc5jzpy5SFxfxaM3R0y8VCx1GWVcG2NuRdaM5yfYkPm4-OE-8sYTv7Uhl8UXhfQs6bW9Ihk9T8UScQaVKi_Pd80lGos9wBgqbW71wa2jWvb_LMLOIgf7Awnsd6gWvpzvHQEf_4L5YOutBzCteRsVy2MqKYJ0GiB9JyApQ61qIIG31kFNkznCjLxrymQ6IQkO25p3nrPCzpC3i39GCCeBdV00NdpmBHwSnsCaeXawAyh0QR76VdJmFFZA7xWyLWjP4VkKKWAn5bE4Qc30nCY-2OBW_h2P2pIsPTCejD6U6rxnkDEIW13cd5GmVYfepiFL-zrf9qf6Ey2_G78" width="100%" height="600" frameborder="0"></iframe>

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

<iframe src="https://eric.run.place/MermZen/embed.html#eJzLyi8tykut5FIAgpLMkpxUhSd7Zjztmfa0s_f9nllP52x4Orfh6cLVT9tmPtva-HxFN1hhcWpySWZ-ngJEAqIILKGg8LKh81n3yudzGp_s3qtgpWBspfB8yopnHdtRpJ_O73u6owmL9It9k5-2Ln2xftnz3W0QY4GKjNAUPevsftq1AqL0ZdO653umISsCAAJiaZM" width="100%" height="400" frameborder="0"></iframe>

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

<iframe src="https://eric.run.place/MermZen/embed.html#eJzLyi8tykut5FIAgpLMkpxUhSd7ZjztmfZ0Qt_7PbOeztnwdG7Di_ZVT7tWPF24-mlrK1hhcWpySWZ-ngJIqG0mRBFYQkEBqnbdrCd7e5_O73u6o0nBSsHUSuH5lBXPOrZDFUGNbZzyrHnzi32Tn7YuBSoyQVP0smnd8z3TkO1GNgkAJvVfLA" width="100%" height="400" frameborder="0"></iframe>

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

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1kc1OwkAUhfc-xTyDPxtex7DAGEgUF-5AoSmgQsKgKGgpQaAQOqj9EZDwMnPvTFe-gpM2NQbq7CbfnHPvOXOSuzjLpi_3iDr5TP40TQR1oaUJOkbdx4eyGNe-v57wuowlAzvvYrlB5wWYESrO08f5TC5Lgm4B364k00CfhoAQLNXD-zxiJEUOUyRyjV-074Rp_-KjLSx6VFgeX46gWdxRx4P5xsQiQ-oFHS22bXSF01cRIt22Lbp1OdIlG6pICUsBWyCjkpX4yk9SMxqBg8R1pDPjizloH2J2HxtWe1B-VUBULLkeJniCOQXtEbpzeC4ovL-Fg0IFaxZSxlftncGqJtOW9kDafbht_V_TcqDUfN0MJjdxktAQ9QZUjaT2Kxa6Rekb8nOS9HfUk84omv1X_QOU2R_1" width="100%" height="600" frameborder="0"></iframe>

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