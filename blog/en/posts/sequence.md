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


## Declaring Participants

```
sequenceDiagram
    participant User
    participant Server
    participant Database
```
<a href="https://eric.run.place/MermZen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShdDi1CIMweDUojIswi6JJYlJicWpAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#ZYxBDoMwDATvfYWP5MAHOCCB-AEvsFLTRAIb7EaU30NphFSx15kdoyURe-oivhSnBxxryrpuK-hljE-QmRhQVVYobGMfVFiSudNsy0NtKujQAv27SjYLG7mcdFcRv5mfltkJc-NOP9dzje8AXsUMigHjmJTcDg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#hY07DsIwDIb3nsIXqBQeU4cuBQnEwIA4gCFWiWSc4KSV4PSEBhjhnyx__yPSbSA508phr3itIIu9D7AeSe-wMHF6vdSxI0l12x5IM2xgQ6jpRJggOOm_voLrbCyJBoJ_YxJbTQdygk7JZuyQI4zIzv5omBsD-13p4EiwlX-JpZnBUXBIF6_uQfaz_wQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#fVJbT8IwFH7nV5zwBAYCEi_JEjGK46IguI3waMp2HI1bi22BGLL_btfBQG57ak-_2zlnEn8WyHx8oSQUJC6A_oivuICxRGGucyIU9emcMAXPgq9O1Z9GPRfF8sSLgwGVR9XBr_vRL5hy6lNtNjfKFriLaUwVRDykzAA2LxqTu1gwGroe1Mic1gwQ1gsNYSTGivaRcsVFkGT6OUkLmDAWdGwv0__8IjSycm5iCAZU_W_X1jjw-UJHL9XLx8KmH53d7tstD66g7QwHkMpKmHRtx4atxcOj4Rr8gUc6CBDo6-iZAYkUjDbNwJJENDDlQ-89iQ4yFEQhvE488Pg3Mih13cbtXfkkczMOV49DopSUM2utUlYC96e89tfUqNdh-AYZvmL6S3LKbmW7tep_CkFvKuI-idIbCfGIoBljA0-j6VkoUBwCImdTTkQWCSOJMBGchfmmLzXXe285F5Z9vsGb-jWsUQiuz8UeM_PPHYvJ-ejujK_AECHWU922iSz4Aw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
