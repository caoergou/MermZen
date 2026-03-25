---
title: How to Draw Architecture Diagrams in Mermaid
description: Comprehensive guide to Mermaid architecture diagram syntax including component definitions, interface descriptions, and deployment patterns with microservices architecture example.
date: 2026-03-05
slug: architecture
---

# How to Draw Architecture Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Architecture diagrams visualize system architectures, component relationships, and deployment patterns. They are ideal for system design, architecture reviews, and technical documentation. Mermaid uses `architecture-beta` keyword for architecture diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUp1Si1JjMlTUFBQKMksyUlVCK4sLknNVXBEUqLgkpmYXpSYq1QLABsCF9g" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `architecture-beta` keyword:

```
architecture-beta
    title System Architecture Diagram
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUp1Si1JjMlTUFBQKMksyUlVCK4sLknNVXBEUqLgkpmYXpSYq1QLABsCF9g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Component Definition

Define system components including services, databases, external systems:

```
architecture-beta
    title Basic Architecture Components
    container "Frontend Application" {
        component "User Interface"
        component "API Calls"
    }
    container "Backend Services" {
        component "Business Logic"
        component "Data Access"
    }
    database "Database" {
        component "User Data"
        component "Business Data"
    }
    system "External Payment System"
```
<a href="https://eric.run.place/MermZen/#eJyFz8FKA0EMgOFXCTl76rG33Vah4KFQeptLTKMGZzPLJC2W0neXdVcp6uJtIF_4Mxc84XJxh4xLpMqvGsJxrNJKUDIAgNDIAi25MjQ3Alal64uJhY-QiwWpSYWED7VYiB2g6fusTKHFEsJllKOetiHh3qXCxkLqM7Ek_Fs12w2sKGf_Atff3Zb4bcjupJ6Uxeeb7dHVxB0ey4vyXHNNQdAwi_-sHijoiVwmNDz_-eDA5jrf19yiqeRnD-kg4f17SDXKsKVzN-ztPicJ8foBydOSkw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Connection Relationships

Define connections and dependencies between components:

```
architecture-beta
    title Component Relationship Diagram
    container "Frontend Application" {
        component "User Interface"
        component "API Calls"
    }
    container "Backend Services" {
        component "Business Logic"
        component "Data Access"
    }
    database "Database" {
        component "User Data"
        component "Business Data"
    }
    system "External Payment System"

    "User Interface" --> "API Calls"
    "API Calls" --> "Business Logic"
    "Business Logic" --> "Data Access"
    "Data Access" --> "User Data"
    "Data Access" --> "Business Data"
    "Business Logic" --> "External Payment System"
```
<a href="https://eric.run.place/MermZen/#eJyFkMFqAjEQhl9lmHO99OihsGoLQg-i9JbLNE41NDtZMqNUxHcv666ldbP0Fv58ky_zn_GI08cH9DhFyn4fjL0dMs_YyAkAgAWLDPNUN0lYDNYcyUIS3YcGFoF2meqO9EmMgnAGhy85ibFsoWqaGPx1wiGcO7Kjby86fFPOsBTj_EGeHZaparWEOcWoN-Ay9M7If7baDedj8KzjztlBg7AqvKZd8GPOBRlB5T3rvXVLRu-k3EPt8Z8FW2zM8_Ob31Bv0pMa1-Dw-cs4C0VY0alu5zbXmxbvyGGTMJk8lar7E_VQuZFh3uOFau7CHhwsX8aKFYzaR7vAyzdET-Rh" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Microservices Architecture

```
architecture-beta
    title E-Commerce System Microservices Architecture
    container "User Interface Layer" {
        component "Web Interface"
        component "Mobile App"
        component "Admin Console"
    }
    container "API Gateway" {
        component "Request Routing"
        component "Authentication"
        component "Rate Limiting & Circuit Breaking"
    }
    container "Business Services Layer" {
        component "User Service"
        component "Product Service"
        component "Order Service"
        component "Payment Service"
        component "Inventory Service"
    }
    database "Data Storage" {
        component "MySQL Primary"
        component "MySQL Replica"
        component "Redis Cache"
    }
    system "External Systems" {
        component "Alipay"
        component "WeChat Pay"
        component "Logistics System"
    }

    "Web Interface" --> "API Gateway"
    "Mobile App" --> "API Gateway"
    "Admin Console" --> "API Gateway"

    "API Gateway" --> "User Service"
    "API Gateway" --> "Product Service"
    "API Gateway" --> "Order Service"
    "API Gateway" --> "Payment Service"
    "API Gateway" --> "Inventory Service"

    "User Service" --> "MySQL Primary"
    "User Service" --> "Redis Cache"
    "Product Service" --> "MySQL Primary"
    "Product Service" --> "Redis Cache"
    "Order Service" --> "MySQL Primary"
    "Inventory Service" --> "MySQL Primary"

    "Payment Service" --> "Alipay"
    "Payment Service" --> "WeChat Pay"
    "Order Service" --> "Logistics System"
```
<a href="https://eric.run.place/MermZen/#eJyNk7Fu20AMhl-FuKFTvXTMUEBWgsKAjbo2gixa6BNrE5Xu1DvKiRDk3YtEsmvLRzubho-8n9THV7M3d9--GmvuDAa7YyErbaApCRYOAEBYKoKHSe7rmoIlWHdRqIYF2-AjhT1bipCd1PZ11jtBdhSgMI-RAsycUPiNlmCOHYXCwGtP9nTdeEdOoDBPtPkPFyYNLfyGK4KsaTQiK2t2kHsXfXVs83YZLlvO4AcKPWOnZ1rR35aiwMq3wm6rvtnKjpywRWHvNGqFQjDnmt9bwRfIOdiWBaaB8M9J90TYaRvZUYywPmz-xjI_Vj_AWp5l8GVr5Rb2M5Sf6IVd_f51A5u5PTnxoRuDw8wlCm4wEhTmHgVhLT7glvQ5F9361xyWgWsMnSrNB7SipmKL6t-hkiPkaHfjULE3vzAPL0LBYTXcQtRjZRU3qOZ5onyHAkudmPstR2Ebh6dOEvUfF-cCk8n3sdUH9PRornGj00mjR_jsfno0ZV2aVNxLw0kDlb5pD9Nw0sZDwfksQ0VSN4VNCJWY-3pjDU_2Hq3peufE7FrBMcx4twdBzmTXuUvttcyX-pu3f1_DGoY" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `architecture-beta` | Declare architecture diagram |
| `title Title` | Set chart title |
| `container "Name" { ... }` | Define container component |
| `component "Name"` | Define internal component |
| `database "Name" { ... }` | Define database component |
| `system "Name"` | Define external system |
| `"Component1" --> "Component2"` | Define connection between components |
| `%% comment` | Line comment |

## Next Step

After mastering architecture diagrams, continue learning [Mermaid Block Diagrams](block.html) for complex system architecture and process flow visualization.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
