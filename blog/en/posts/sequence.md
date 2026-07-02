---
title: How to Draw Sequence Diagrams in Mermaid
description: A practical guide to Mermaid sequence diagrams covering participants, message types, loops, conditional logic, and parallel execution with API integration examples.
date: 2026-03-04
slug: sequence
---

# How to Draw Sequence Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Sequence diagrams show interactions between participants over time. They answer the question: **Who sends what to whom at which moment?** Perfect for API flows, user-system interaction, and microservice communication.
<iframe src="https://eric.run.place/MermZen/embed.html#K04tLE3NS051yUxML0rM5VIAgpz8_AKFZ-v7X86aomBsoPB8-SSwMAg8XbfoWcf256vX69rZPZvT-7Rr4dOZK6wUnu5vfrF987PFDc-2dsPVwuV1gYrhGq0UCvLz0sGKUvNSAA" width="100%" height="500" frameborder="0"></iframe>

## Why Use Sequence Diagrams?

Sequence diagrams are the best choice for showing **interaction flows**:

- **Show message interactions between multiple participants** — Clearly present "who does what to whom"
- **Perfect for API call chains** — Frontend → Backend → Database → Cache, all at a glance
- **Clearly express "who sends what to whom at which moment"** — Timeline flows top to bottom, intuitive order

```
sequenceDiagram
    actor User
    participant Frontend
    participant API as API Server
    participant Database
    
    User->>Frontend: Click login
    Frontend->>API: POST /api/login
    API->>Database: SELECT * FROM users
    Database-->>API: User data
    API-->>Frontend: 200 OK + Token
    Frontend-->>User: Redirect to dashboard
```
<a href="https://eric.run.place/MermZen/#bY47bwIxEIT_yshlCAJRukCKeEhRQIe4S5dm8a3AAuyLbWgQ_z17saw8Xdhaz7czc1NXpSePyiitIr9f2BmeW9oHOr85yCGTfMBr5JDnjkKyxnbkEpbBu8Su_as8bZ5B8fOpOVz_W55Toh1Fzkq--5jhdFp8NWYna444-b11mSiSUGKusanqBiPq7OgbJIroJUCjXqwWswYPWG6rNS4SEjNYkGGx6wugld8vox99JuMxqhcM0Pgj_64kZL-vseXWBjYJyYtZPOw8hVbdPwA" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Declaring Participants

```
sequenceDiagram
    participant User
    participant Server
    participant Database
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCwqyUzOLEjMK1EILU4twhQNTi0qwybukliSmJRYnKpUCwC2TiLE" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

- `sequenceDiagram` declares the diagram type
- `participant name` controls the order of participants (left → right)
- `actor name` renders as a stick figure (for human users)
- `participant A as Alias` creates aliases for readability

## Message Types

```
sequenceDiagram
    A->>B: Solid open arrow (synchronous)
    B-->>A: Dashed open arrow (response)
    A-)B: Solid async arrow
    A--)B: Dashed async arrow
    A-xB: Solid with cross (failure)
```
<a href="https://eric.run.place/MermZen/#eJxtjL0KwjAQgF_lyNSAWRwzBFr6Bq4uRzxtoObqnWkV8d1FawuC8_fzMKPx242JxhulS6EcqU14EjzvMwBA7UJoPOy4TwfggTKgCE9Q6T3HTjhzUTurjXMh1B5a1I5-ZSEdOCvZZWrXJ75Hs7fAD_1e_uDb2k7p2kEUVoXqiKkvQtY8X-APQ6g" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Arrow Type Selection Guide

Choose the right arrow type to make your diagram semantically clearer:

| Arrow Type | Syntax | Use Case |
|------------|--------|----------|
| Solid arrow `->>` | `A->>B: request` | Synchronous request, HTTP request, function call |
| Dashed arrow `-->>` | `B-->>A: response` | Return value, HTTP response, callback result |
| Async arrow `->)` | `A-)B: event` | Event publishing, non-blocking call, WebSocket message |
| Failure arrow `-x` | `A-xB: timeout` | Failed call, timeout, request error |

```
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: HTTP request (sync)
    Server-->>Client: HTTP response (return)
    
    Client-)Server: WebSocket message (async)
    Server--)Client: Push notification (async response)
    
    Client-xServer: Request timeout (failure)
```
<a href="https://eric.run.place/MermZen/#bY-xDoIwEIZfpelEE1kcGVh0cCRK4uJSmwMvwhXbK9EY392aAovccMPdd_flf8tRFtuNNLKQHh4ByMAedet0fyERa9CO0eCgicWuQyD-n5_AjeDSPPVE5mWZVoU41HUl3E_gWWT-RUYlMgF5RNPNgvrBkgeROeDgSK18V_PzM1xP1tyBRQ_e6zZe6RWFmg1V8DdBlrFBoxktTfxiXbM9Z9txSsHYgw0xTaOxCw6U_HwB" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Best Practices

### Participant Naming Conventions

- Use `actor` for **real users** (renders as stick figure)
- Use `participant` for **system components** (services, databases, caches, etc.)
- Use `as` keyword for **short aliases** to keep code concise

### Add Key Notes

Use `note` to add explanations for key steps, helping readers understand complex logic:

```
sequenceDiagram
    participant A
    participant B
    Note right of A: Note for A
    Note over A,B: Note spanning multiple participants
    A->>B: Message
```

### Control Participant Count

**Recommended: no more than 5 participants**. Too many participants make diagrams hard to read. For complex systems:
- Split into multiple sequence diagrams
- Use `box` to group related participants
- Omit minor intermediate steps

```
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Cache
    participant Database
    
    Note over User,Database: Recommended: max 5 participants
    
    User->>Frontend: Send request
    Frontend->>API: API call
    API->>Cache: Query cache
    Cache-->>API: Cache hit
    API-->>Frontend: Return result
    Frontend-->>User: Display data
```
<a href="https://eric.run.place/MermZen/#ZU_LCsJADPyVsGe9CF72IIhF8CI-8OYlboMutLt1NxVF_HfTrvXVHAKZmWQmd3VRejRQRmkV6VyTM5RZPAYs9w6k0LAPsIsU0lxhYGtshY5hHrxjcnmfma4WfXCG5kR9OEPGA8YXk_rSM4G_UHIedBINGzK-LMWTcg0lXmH8fSt-32g2h5NJF1LDVjqE5snISdJxIpPEuokNBosisTIJ0abWsK4p3IR8v9Diw26zneBk-bP6470hroMT91gX_-YibLJqyGysCrxBLu-qxxM" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Comparison with Other Diagrams

| Feature | Sequence Diagram | Flowchart | Activity Diagram |
|---------|------------------|-----------|-------------------|
| **Core Focus** | Time sequence | Decision branches | Process steps |
| **Best For** | API call chains, microservice communication | Business logic, decision flows | Workflows, business processes |
| **Participants** | Multiple (recommended ≤5) | Unlimited | Unlimited |
| **Time Expression** | Top to bottom, intuitive | No time concept | Can annotate time |

**Selection Guide:**
- Need to show **who does what to whom** → Sequence Diagram
- Need to show **conditional branches and loops** → Flowchart
- Need to show **complete business process** → Activity Diagram

## Control Structures

```
sequenceDiagram
    loop Every 30s
        Client->>Server: Heartbeat ping
        Server-->>Client: pong
    end

    alt Credentials valid
        Server-->>Client: 200 OK
    else Invalid
        Server-->>Client: 401 Unauthorized
    end
```
<a href="https://eric.run.place/MermZen/#eJyFTrsKAjEQ_JUltQfxtEqR5hQUCwuxu2a9LGcgbs4kF1Dx30Xio9OphnkxN5GFqieiE0pEOo_EHS0s9gFPLQMAOO8HWGYKF5jJWLQnGmeJU6X1jkKmoGBFGNKBMMFguf8Gi19VWpeKgsG_fWLTcqHoEjSBDHGy6CJkdNb8WqmlhO3mteMiwZr_duZyCnvGMR19sFcynxfi_gCNZlG6" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Full Example: HTTP Login Flow

```
sequenceDiagram
    actor User
    participant Browser
    participant APIServer
    participant Redis
    participant MySQL

    User->>Browser: Submit login
    Browser->>APIServer: POST /api/login {username, password}

    APIServer->>Redis: GET login_fail:{username}
    Redis-->>APIServer: Fail count (0)

    APIServer->>MySQL: SELECT * FROM users WHERE username=?
    MySQL-->>APIServer: User record

    alt Password valid
        APIServer->>APIServer: Generate JWT Token (HS256)
        APIServer->>Redis: SET session:{token} 7d
        APIServer-->>Browser: 200 OK {token, user}
        Browser->>Browser: Store in localStorage
        Browser-->>User: Redirect to dashboard
    else Wrong password
        APIServer->>Redis: INCR login_fail:{username}
        APIServer-->>Browser: 401 {error: "Invalid password"}
        Browser-->>User: Show error message
    end
```
<a href="https://eric.run.place/MermZen/#eJx9kVFP20AQhP_KyE9QxSKNoJVOqquWGkhLSBob5SVSddjbcMK5C3uXRCjyf0c-Ow4Fl8e73dlvZ2cXbAIx6AVZIAJLj2vSGf1QcsFyOdcAIDNnGLeWuH6vJDuVqZXUDt_ZbDsL3ybDhHjTVZpSruzb79FT8vt6rutCRQujqBkvkKzvlsqhMAvVdDSlMIpalMBknKQ4kSt14juxW1tiLZfUw0pauzWcl3tEKwujyK8kcBmnNeLPX6kK0arLWuG7wn-JF1IVyMxaOxz1j7tme18CSXwdn6f4gIvpeIRqssXsKp7G2FO-fK3FXvAKU90DTJnhfM-QhcOkMYWNLFRe_7_mv5hySZpYOsLPWYrUPJDG0VUyOPt03C1tzpLEKSxZq4wWO1fJSnzupL2MbNDvY_wLtaDnXZYHzSG-Q8bOMEFpFCaTRfWSC3qrCKPo1vdX2zFlDs4gl_b-zkhutqLCEmZs9KLN_V2Hw5vz6XvJ_9_laf8jdsRsWGAeDLUP4gANOiy3BpJ7s4XXYknWtm5J50H5DAJ8KvE" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
