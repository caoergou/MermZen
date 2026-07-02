---
title: How to Draw Git Graphs in Mermaid
description: Comprehensive guide to Mermaid Git graph syntax including branch creation, commits, merging, and tagging with complete product development workflow example.
date: 2026-03-05
slug: gitgraph
---

# How to Draw Git Graphs in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Git graphs visualize version control system branch management, commit history, and merge operations. They are ideal for software development team collaboration, project management, and version control teaching. Mermaid uses `gitGraph` keyword for Git graphs.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFEACyqEgPhKtQBvOw-K" width="100%" height="600" frameborder="0"></iframe>

## Why Use Git Graphs?

### Problems Git Graphs Solve

Git graphs address key challenges in understanding and communicating version control workflows:

- **Visualizing Branching Strategies**: Transform abstract Git commands into visual timelines that show exactly when branches were created, where commits were made, and how code flows together
- **Tracking Development Flow**: See the complete journey of code from initial commits through feature branches to final merge
- **Documenting Release History**: Create permanent visual records of what code went into each release
- **Onboarding New Team Members**: Help newcomers understand your team's branching conventions without reading lengthy documentation

### Suitable Scenarios

Git graphs excel in these situations:

**Team Onboarding**: When new developers join, a Git graph shows your branching strategy at a glance.

<iframe src="https://eric.run.place/MermZen/embed.html#eJx9jj9rw0AMR7-K0Ny4acfbEghdCunQbl50Z-WsxPeHs2xaSr97YxwPAROtv8d7-sURzesTOjToRd8K5baOcD0V7Rg-mQIco01UGokeDt8Ucscz4lIIoiCNgRo_SjqzU-hZh1zjTNhC0bVwYtKh8DN14niTSzrJqmM37Qa-ei5woyCT50XnWnaXNCgEkrhasMluaNB2Rb5P1sB78hKh_-mVwwNr4OL50dv3wFIFJT-lxpdqW21rxL9_0OB1TQ" width="100%" height="400" frameborder="0"></iframe>

**Code Review Preparation**: Before reviewing complex changes, visualize the branch structure to understand the context.

**Release Planning**: Plan and communicate release strategies by showing which features will merge when.

<iframe src="https://eric.run.place/MermZen/embed.html#eJx9kMFuwjAMhl_F8hkx4Ng72hXBtReTmtQicapgqk2Id1-2grSiCF_9f99v-YYjNpsFOmzQi31mGvpWoYyJBYY9B6YLwy6QqqiH7RfFIfCUcSlGMZCugRbH9XK1XEGeiK7FKXPMpK6HjkcOaahwB6NsUOjC_8ZewBOTXTN_DPQdWa0i2E0bEDX2mUySPh2uZ3dOV5vXv5g1mZzE_YGXin8bSQLMU2_9kbPn-uHzVa35aSyl-p95NICRf3y7_KtFvP8A2y6XdA" width="100%" height="450" frameborder="0"></iframe>

**Documentation**: Include in technical documentation to illustrate your Git workflow.

### When NOT to Use Git Graphs

Git graphs are **not suitable** for:

- **Simple Linear History**: If your project just commits to main with no branching, a Git graph adds no value:

```
gitGraph
    commit "Initial commit"
    commit "Add feature A"
    commit "Fix bug B"
    commit "Release v1.0"
```
<a href="https://eric.run.place/MermZen/#eJxlybsOQEAQBdBfubm1CEodBdGqt1kMJvEKSyTi3zUq2nMuHowjjzVjdury1S69mQCgnsdRHQyLSZ3a4QXDTydNg1as21dB8ttMT1R7h_Q3pQxiN8ER-oEh7wfAlSsY" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

- **Showing File Changes**: Git graphs show commit structure, not what changed in each commit
- **Detailed Code Review**: Use diff views for line-by-line code changes
- **Performance Analysis**: Git graphs don't show commit sizes or impact

## Comparison with Other Diagrams

### Git Graph vs Flowchart

Understanding when to use each diagram type helps you choose the right visualization:

| Aspect | Git Graph | Flowchart |
|--------|-----------|-----------|
| **Purpose** | Show version control history | Show process steps and decisions |
| **Timeline** | Implicit (chronological) | Explicit (step sequence) |
| **Branching** | Natural first-class concept | Requires manual diamond shapes |
| **Best For** | Code history, release planning | Business processes, algorithms |

**Use Git Graphs when**: Documenting your team's Git workflow, planning releases, or showing how features branch and merge.

**Use Flowcharts when**: Documenting deployment processes, CI/CD pipelines, or decision workflows. For example, a code review process is better shown as a flowchart:

```
flowchart TD
    A[Start Development] --> B{Feature Complete?}
    B -->|Yes| C[Create Pull Request]
    B -->|No| D[Continue Coding]
    D --> B
    C --> E{Code Review Approved?}
    E -->|Yes| F[Merge to Main]
    E -->|No| G[Address Feedback]
    G --> D
    F --> H[Deploy to Production]
```
<a href="https://eric.run.place/MermZen/#eJxNjzFPwzAQhf_KyTNdGDuAUrspS1EFLMhkCPGjWLi2cexUKOl_J06C6G1P9937dD3r2Pr2hjVszT6MOzefdYj0It4sjVPI55izQAfj_Ak2VrRa3dGmL1HHFEDcnbxBxP1lPtnk_fCKdiAueRgp0CEZQ0_4TmhjdY09uoGE5M5GbVPuUtoeF0LMojnwKWz7kcDY1GmcqfA-uA7qz7z9N5dyj3AERUf7WtvqGsjOnSyUCmhbKgH1XjdfC7KbPMv35RQepIA37ieXHYJTqYna2YpdfgHcBmG7" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Decision Guide

- **Multiple parallel features merging at different times?** → Git Graph
- **Sequential process with decision points?** → Flowchart
- **Showing who worked on what and when?** → Git Graph
- **Documenting how to handle errors?** → Flowchart

## Declaring a Chart

Use `gitGraph` keyword:

```
gitGraph
    title Git Graph Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFEACyqEgPhKtQBvOw-K" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Basic Commits and Branches

Create simple commits and branches:

```
gitGraph
    title Basic Git Graph
    commit "Initial commit"
    commit "Feature A"
    branch feature-branch1
    commit "Complete feature 1"
    commit "Fix bug 1"
    checkout main
    branch feature-branch2
    commit "Complete feature 2"
```
<a href="https://eric.run.place/MermZen/#eJyFjcsKwjAURH9luGtdNMvuVLD4D9mkITYX8yjxpgjiv7uohVJBlzNnHk-aqFU7stTSwNIVM3qdAEBYgsPR3NmiY8EK2RwjCzRdEgub8DE0bfDZGanF4bCQvphkPa6zv59ls2mdchyDE7fE0HwP8wN9HVbEO3vLVRANpx9f6t-X0kSvN3YUWj4" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Branch Merging

Demonstrate branch merging operations:

```
gitGraph
    title Branch Merge Example
    commit
    branch feature-1
    commit
    commit
    checkout main
    branch feature-2
    commit
    commit
    checkout main
    merge feature-1
    commit
    merge feature-2
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXAqSsxLzlDwTS1KT1VwrUjMLchJhcgn5-fmZpZA2EkQVWmpiSWlRam6hpgqUNgZqcnZ-aUlCrmJmXlYDTAi2YBcsAPxOABVgZFSLQB0zFEG" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Tags and Versions

Add tags and version management:

```
gitGraph
    title Version Management Example
    commit "v1.0.0 release"
    branch feature/auth
    commit "Add authentication"
    commit "Fix security vulnerability"
    checkout main
    merge feature/auth tag: "v1.1.0"
    commit "Test fixes"
    branch hotfix/security
    commit "Critical security fix"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#eJyFjrFuwzAMRH-F0Fw4dkZvRdB26hZk8sIotEVUogKJMhQU_fciMJIg7tD1eI_3vs1s-u2LsaY3E-tHwrMbBABAWT3BgVLmKPCJghMFEoW3iuHsaWnZGAIrDGbumrZpIZEnzDSY5XxMKNbBSKgl0QaLuhX3ejrBNSZRtqgc5cbeK-9cIZMtifUCc_FCCY_sWS_3qiP7FYtCQJYlCpQmehoGxalfTLum_bOyp6wwcqW8kndRR66bm8EK2yW-ivuH4cj1X6_Vzye1bjDm5xeEWYhS" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Full Example: Product Development Flow

```
gitGraph
    title Product Development Git Flow
    commit "Project initialization"
    commit "Basic architecture"
    branch feature/login
    commit "Implement login functionality"
    commit "Login UI optimization"
    checkout main
    branch feature/dashboard
    commit "Dashboard framework"
    commit "Data visualization components"
    commit "User statistics"
    checkout main
    branch feature/settings
    commit "User settings page"
    commit "Security settings"
    checkout main
    merge feature/login tag: "v1.0.0-beta"
    commit "Testing fixes"
    merge feature/dashboard
    merge feature/settings tag: "v1.0.0"
    branch hotfix/performance
    commit "Optimize loading speed"
    commit "Reduce memory leaks"
    checkout main
    merge hotfix/performance tag: "v1.0.1"
```
<a href="https://eric.run.place/MermZen/#eJyNkktPwzAQhP_Kymfog2OPqKKqhEQF9JbL1tkkS_2SvUlbEP8dpaWRkiDgujOeb7z2h2rU4u5GabVQJcsqYqgyBwAgLIZgE31ea4ElNWR8sOQEVizwYPzh4tPeWhbI1Cb6N9IC7FgYDb-jsHeZGtjuMbEGjLpiIS11pKtlF9HpCgrCdjo1vmQ3OLy2wdC5xFmFona6paBhOY1Qj2fPdg0-CNthoYr03tcCFq-YQYEcU7XzGPNB7PI6hyKipYOP-xF6iYLQcKq7RbRa8I6cpJF7myhCEhROwjr9v2IiEXZl-jHvW4OAJY2QL6TryHLqbL9ALcWS-u8CguUCMtXMJ7PJ7HZHgiPEK6U2GQo-UhffzxqsuC92F-ixBr-l8lLwcRooFj5adJoGLZ4ub09gPOZtnRSI8lHZZ8prTWDJ-ngCQ7j_eyNjdq_qPFPq8wvTwSe7" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Best Practices

### 1. Keep Diagrams Simple (Max 5-6 Branches)

Complex diagrams become hard to read. Limit yourself to 5-6 concurrent branches maximum:

```
gitGraph
    title Best Practices Example
    commit "Meaningful commit message"
    branch feature/user-profile
    commit "feat: Add user profile page"
    checkout main
    commit "chore: Update dependencies"
    merge feature/user-profile tag: "v1.1.0"
    branch hotfix/security
    commit "fix: Security vulnerability fix"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#eJx9jk1LxEAQRP9KM2fdNR7npiCeBEG85dI7qSSNmQ9mekJE_O8SsgsaxWNXvyreh5mNvb0yzlgziD5mTmMbiIhUdALdoyg9Z3YqDoUeFvZpwka46L0oteYJHCQMfZ0umUcpPKA1G3nKHNxIPVhrxrEW5OuUYy-_plbE0l3X0QrRGaL0bcyNcG-xKnmWsKu7MWZYek0dK6hDQugQnKBc2h55wJ8mpDxYas3cHJrDzU59jNrLcixwNYu-761lsfRy_tFcp4DMJ5nWq5flH_NNZ7f-w6Rpjfn8ApzZj2Y" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

**Why**: Each branch adds visual complexity. Too many branches create a "spaghetti" diagram that's impossible to follow.

### 2. Use Meaningful Branch Names

Clear branch names communicate intent:

```
gitGraph
    title Meaningful Branch Names
    commit id: "Initial commit"
    branch feature/user-authentication
    commit id: "Add OAuth login"
    checkout main
    branch bugfix/login-redirect-issue-234
    commit id: "Fix redirect loop"
    checkout main
    merge feature/user-authentication tag: "v1.1.0"
    merge bugfix/login-redirect-issue-234
```
<a href="https://eric.run.place/MermZen/#eJyFj7FuwkAMhl_FupkAoUzZ6FDEALxAFnNxLlZzPnTxRZFQ370pIQMSoh6t7_9--2Z6U2wWxprCONZ9xGtTCoyjrC3BkVBYXJ1a-IwotoETeuomxAbvWYGrAkpzEFbG9rEszYRcplBNqCnSKnUUM0zakChbVA7yQrWrKjjvRgra4Fhml23Ifoek4JHlSX9JruZhdaezSBVHsppx1yXKNh_bFxVfPMAMji3h-qbEU3T07gVQdH_SPl_my_VsmmL_nGZ-fgHecYJH" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

| Convention | Example | Purpose |
|------------|---------|---------|
| `feature/` | `feature/user-profile` | New feature development |
| `bugfix/` | `bugfix/login-error-234` | Non-urgent bug fixes |
| `hotfix/` | `hotfix/security-patch` | Production-critical fixes |
| `release/` | `release/v2.0.0` | Release preparation |

### 3. Tag Important Releases

Always tag releases so you can reference them later:

```
gitGraph
    title Tag Important Releases
    commit id: "Project start"
    branch feature/core-api
    commit id: "Core API implementation"
    checkout main
    merge feature/core-api tag: "v1.0.0"
    branch hotfix/critical-fix
    commit id: "Fix security issue"
    checkout main
    merge hotfix/critical-fix tag: "v1.0.1"
    branch feature/new-module
    commit id: "New module added"
    checkout main
    merge feature/new-module tag: "v1.1.0"
```
<a href="https://eric.run.place/MermZen/#eJyNkMtOw0AMRX_FmjVpmy6zQ0igbqoKsczGeNzEMI9oxtOHEP9OqgjxCoLZeXx9dHRfzME06ytDpjGd6F3CoW8DjE9FHcMDdrDxQ0yKQeGeHWPmPCUoei8KYhtozS7FJyaFrJi0NVPiMWGgHvaMWhIvKSaucJCZ85txBde7DYgfHHsOiioxvIOoZ3qORcGjhOnLc-r4BxoUuwvvUC9Wi9U3jz7qXk5LSqJC6KpxmFG5lRNkpjKmziA5F_7TYgb8RaT-pZDAx8pHWxzPeGz5CNMS0Fq2_-7ig_pJor60YV7fAMTQpFw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

Tags make it easy to:
- Roll back to stable versions
- Generate changelogs
- Track what features shipped when

### 4. Show Merge Strategies Clearly

Document your merge strategy in the diagram:

```
gitGraph
    title Show Merge Strategies
    commit id: "Main branch"
    branch feature-a
    commit id: "Feature A commit 1"
    commit id: "Feature A commit 2"
    checkout main
    branch feature-b
    commit id: "Feature B work"
    checkout main
    merge feature-a id: "Merge commit (merge)"
    checkout feature-b
    merge main id: "Rebase onto main"
    checkout main
    merge feature-b id: "Fast-forward merge"
```
<a href="https://eric.run.place/MermZen/#eJyNjzEPgkAMhf9K00kTGWRk00EnFl1ZylHggnDmKDIY_7vIcQxKiJ2u7ev37j3xgVG4Q4URFlrOlu5l0sBQouXGcC1NDzHbYniKJeFCc-sEytS1FtBZBAnGpBtILTWqTNDtXQc5k3SWA1q4OrkdHPx474_XZeEsK1lVphOoB_9F23SFd4Te2GqFVY_B5wQ-6zidiJtRs_2BfPk70oc8QS6cUstgGjHO8N9fpD4EtRLkxvZkMydJEF9vg4uXug" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

| Strategy | When to Use | Visual Characteristic |
|----------|-------------|----------------------|
| **Merge Commit** | Preserving feature history | Creates a merge bubble |
| **Rebase** | Linear history preferred | No merge bubble, commits replayed |
| **Fast-Forward** | Simple feature branches | No merge commit, straight line |

## Common Mistakes

### Mistake 1: Overly Complex Diagrams

❌ **Don't create diagrams with too many branches:**

```
gitGraph
    title ❌ Overly Complex Diagram
    commit id: "Start"
    branch f1
    commit id: "F1"
    branch f2
    commit id: "F2"
    branch f3
    commit id: "F3"
    branch f4
    commit id: "F4"
    branch f5
    commit id: "F5"
    branch f6
    commit id: "F6"
    checkout main
    merge f1
    merge f2
    merge f3
    merge f4
    merge f5
    merge f6
```
<a href="https://eric.run.place/MermZen/#eJxtzzEOwjAMQNGrWJ5ZmrQduoJgZGDNEkJoI-K2ikwFQtyAK3A5TgJSASlRvH37Lb7hhI1YoMEGW8eboMdO9fAZduwtvJ4P2E42-CssBxq9vcDK6TZompUZiByDOzSgcMc6sML5sg-6Nx0ciwxcF6kSOSVSJXNKpqrMqTJVVU5Vqapzqv4p01lzGs4MpF0_r8iG1v6__paISkZVRlVFVeP9DY7Xfa8" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

✅ **Instead**: Split into multiple diagrams or simplify the scope.

### Mistake 2: Missing Commit Messages

❌ **Don't leave commits without messages:**

```
gitGraph
    title ❌ Missing Commit Messages
    commit
    commit
    branch feature
    commit
    commit
    checkout main
    merge feature
    commit
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJUwCCksySnFSFR3N7FHwzi4sz89IVnPNzczNLFHxTi4sT01OLIcqSwYKY7KSixLzkDIW01MSS0qJU_GqTM1KTs_NLSxRyEzPzIEK5qUXpqdh0K9UCAPVDO8Y" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

✅ **Instead**: Always add meaningful messages:

```
gitGraph
    title ✅ With Clear Messages
    commit id: "Initial setup"
    commit id: "Add dependencies"
    branch feature/auth
    commit id: "Implement login"
    commit id: "Add tests"
    checkout main
    merge feature/auth id: "Merge auth feature"
    commit id: "Prepare release"
```
<a href="https://eric.run.place/MermZen/#eJx1kLFqAzEQRH9lUR0wpLwuuDApDO7SXLOWxqfFkk5Ie26MS_-Fv85fYnE-AoHLljNvZmCv5mK6zw9jTWcG0V3h7PtE7VQ0gJ6PO_2IetoGcKE9auUB9Y3YMUZREtdRb76TqHCgCp1yb1aIL-fIISM5JCutZIGOhZP1dALrVLDhSf1af8wBEUkpjIOkfxcUVX-rrYc9j5NS5BaZpYgy4M_YEt7Pxiws7urGoSBzARW0j9TGmNsLt0tsWw" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Mistake 3: Not Showing Merge Conflict Resolution

❌ **Don't hide the complexity of merge conflicts:**

When two branches modify the same files, show that conflicts were resolved:

```
gitGraph
    title Show Conflict Resolution
    commit id: "Base commit"
    branch feature-x
    commit id: "Modify config.json"
    commit id: "Feature X complete"
    checkout main
    branch feature-y
    commit id: "Also modify config.json"
    commit id: "Feature Y complete"
    checkout main
    merge feature-x tag: "Pre-merge"
    merge feature-y id: "⚠️ Resolved conflict in config.json"
    commit id: "Both features integrated"
```
<a href="https://eric.run.place/MermZen/#eJyVUDtOxEAMvYrlmqWgTMciQYWEoGGlNMPEmRhmxqsZZyFCnIGeimNwHi7AFZhNlkVIkQB3fn4f24-4weroAC1W6FjPkll3dYRSyuoJrjq5hxOJrWercElZfK8sceJYCYEVuKmgxqXJtENqnOY3yUTbQUtG-0SLhxnVuTTcDgWLLbvD21yscYZ2OlnA9RZee1La0zqyd9IrBMNxNnaY8Tv2WSD8L3v1l-xAydH3xaDGbT0uSjOOvqQ_ecMu6v3l9ePtefrzhppxtfHzHH9dcym6vzkXgZJLRqmpEZ8-AZ9FpTQ" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

✅ **Best practice**: Document significant merge conflicts and their resolutions in the diagram to help future developers understand the integration challenges.

## Git Workflow Examples

### Feature Branch Workflow

One branch per feature, merge to main when complete:

```
gitGraph
    title Feature Branch Workflow
    commit "Project initialization"
    branch feature/user-auth
    commit "Add user authentication"
    checkout main
    merge feature/user-auth
```
<a href="https://eric.run.place/MermZen/#eJxljLEOwjAMBX_F8gxCYuwGA6xsLF2M6zamTYJcByQQ_46qTMD67t698I7NdoWMDQ7qR6NbaBMAgKtPAgchLyawN0oc4Jxt7Kf8qArnGNWhxZPlq7CDJnWlSZ_kmlOLVbvUb19TmzKLral4-Insug4WBguT5MpfFQ7CYy4OkTTVKYoN8t_F9wdia0m1" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Git Flow Workflow

More complex branching strategy for large projects:

```
gitGraph
    title Git Flow Workflow
    commit "Initial commit"
    branch develop
    commit "Development branch"
    branch feature/login
    commit "Login feature"
    checkout develop
    merge feature/login
    checkout main
    merge develop tag: "v1.0.0"
```
<a href="https://eric.run.place/MermZen/#eJxtjb0OwjAMBl_F8oxK6dgZUSGxs2QJwU2t5qeK3HZAvDtCaQYq1vvu7Bcu2DYHNNiiZemSngYVAACExRF0LHBxcYV7TGPv4ppHE71nAYXXwMLabUBhnh9JBzPAkxZycdol50w9BdnEXdaTljnR0UXLYRffvqwYpTMDmTHO8vvQU7L091jRvS4ou1sOom0LCpdTVVe1Qnx_AGMfYfI" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Branch Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New feature development | `feature/user-profile` |
| `bugfix/` | Bug fixes | `bugfix/login-error` |
| `hotfix/` | Emergency fixes | `hotfix/security-patch` |
| `release/` | Release preparation | `release/v1.2.0` |

## Common Commands Reference

Git graph syntax mapped to Git commands:

```
gitGraph
    title Common Commands Reference
    commit id: "git commit"
    branch feature
    commit id: "git branch"
    checkout feature
    commit id: "git checkout"
    checkout main
    merge feature id: "git merge"
    commit id: "git tag v1.0" type: HIGHLIGHT
```
<a href="https://eric.run.place/MermZen/#eJyFzDELwjAQBeC_ctwsoo5ZHZKCkzhmiem1CZqkpNeCiP9dbKyIIk4H7973rjii2CzQosDWs8ymczoCALDnM8E2hZDidEyse9hTQ5mipVKyKQTP4GsB-uGfgcbyPmYTrYOGDA_5FymlmVhH9pQG_oPm2hcLxscSBcotzTNvdMpf7nOYTQvjernSCHzpSICqpNpVUh3wdgc-FWH4" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

| Git Graph Syntax | Git Command | Description |
|------------------|-------------|-------------|
| `commit "message"` | `git commit -m "message"` | Create commit |
| `branch name` | `git branch name` | Create branch |
| `checkout name` | `git checkout name` | Switch branch |
| `merge name` | `git merge name` | Merge branch |
| `tag: "version"` | `git tag version` | Create tag |

**Commit Message Convention**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Build/tooling

**Branch Management Tips**:
- Feature branch naming: `feature/xxx`
- Pull latest code before merging
- Regularly clean up merged branches
- Use Pull Requests for code review

## Quick Reference

| Syntax | Function |
|--------|----------|
| `gitGraph` | Declare Git graph |
| `title Title` | Set chart title |
| `commit "Message"` | Create commit node |
| `branch BranchName` | Create branch |
| `checkout BranchName` | Switch branch |
| `merge BranchName` | Merge branch |
| `merge BranchName tag: "Version"` | Merge and tag |
| `%% comment` | Line comment |

## Next Step

After mastering Git graphs, you can continue learning other Mermaid diagram types or check our [Mermaid Cheat Sheet](../cheat-sheet.html) for complete syntax reference.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
