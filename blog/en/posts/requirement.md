---
title: How to Draw Requirement Diagrams in Mermaid
description: Comprehensive guide to Mermaid requirement diagram syntax — the six real requirement types, element relationships (satisfies/traces/derives/refines/contains/copies), and a full requirements-traceability example.
date: 2026-03-05
slug: requirement
---

# How to Draw Requirement Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Requirement diagrams (based on SysML requirement diagrams) visualize requirements, how they relate to each other, and which system elements satisfy or verify them. They're ideal for requirements traceability in regulated or safety-relevant projects. Mermaid uses the `requirementDiagram` type.

<iframe src="https://eric.run.place/MermZen/embed.html#eJxNy7EKwkAMgOFXCZlddMzsIzgG5GhjE-xFvOSKpfTdpU6uP9-_4YJ0OeGAhE3e3ZpU8bxamVqp7Ox_FXpIu5eeChu7jQRn9pRPEtxUINZIqRBa5hkOJZ42lJTfF-zN4kmgNin7Is0ea5XU10iQEsm-4_4F6_Q1-g" width="100%" height="300" frameborder="0"></iframe>

## Why Use Requirement Diagrams?

- **Visualize requirement structure** — see hierarchy and dependencies between requirements at a glance
- **Traceability** — associate each requirement with the elements that satisfy it and the verification method that confirms it
- **Track derived/refined requirements** — see how a high-level requirement breaks down into more specific ones

### Use Cases

✅ **Suitable**: regulated or safety-relevant projects that need formal requirements traceability (SysML-style); documenting which components satisfy which requirements.

❌ **Not suitable**: lightweight product requirements without a traceability need — a plain list or table is simpler and faster to maintain.

## Declaring a Chart

```
requirementDiagram

requirement user_auth {
id: 1
text: The system shall authenticate users
risk: high
verifymethod: test
}
```
<a href="https://eric.run.place/MermZen/#eJxNy7EKwkAMgOFXCZlddMzsIzgG5GhjE-xFvOSKpfTdpU6uP9-_4YJ0OeGAhE3e3ZpU8bxamVqp7Ox_FXpIu5eeChu7jQRn9pRPEtxUINZIqRBa5hkOJZ42lJTfF-zN4kmgNin7Is0ea5XU10iQEsm-4_4F6_Q1-g" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

A `requirement` block needs exactly these four fields: `id`, `text`, `risk` (`high`/`medium`/`low`), and `verifymethod` (`analysis`/`inspection`/`test`/`demonstration`). There's no `type`, `status`, or `priority` field — those don't exist in the real syntax, despite sounding plausible. `title` is also **not** a valid top-level statement — it breaks the render entirely (confirmed by testing), unlike architecture-beta or block-beta where an invalid `title` is just silently ignored.

## The Six Requirement Types

Beyond the generic `requirement`, Mermaid supports five more specific types — same field structure, different semantic label:

```
requirementDiagram

interfaceRequirement api_interface {
id: 3
text: The system shall expose a REST API
risk: medium
verifymethod: inspection
}

physicalRequirement server_rack {
id: 4
text: The system shall run on redundant servers
risk: low
verifymethod: analysis
}

designConstraint tech_stack {
id: 5
text: The system shall use TypeScript
risk: low
verifymethod: analysis
}
```
<a href="https://eric.run.place/MermZen/#eJyNzrtqAzEQheFXGVSnyqVRF5IU6YK9pWAZpLF38Gokz2g3XozfPQRixwQMqQ-H_zu62fn7Oxedd0r7iZUySXtl3CrmIEFYGukGI61-Z8DK_WWAYxBOHh6CNDo0D91AYIs1ymADjiPQoRYjQFi9rTt4_ngPomw7D5kSTznITMqbJVMbSvLAYpVi4yJBTt-GOizGEcdrgpHOpL1i3J0BjzcBOgkUAaU0ScLL286OsXz-RaDguBjbDyGR8VZeilhTZGnQKA69tav80838ZATdUmkdlWv7X9SdvgBfDZv5" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

| Type | Use for |
|------|---------|
| `requirement` | Generic, catch-all |
| `functionalRequirement` | What the system must do |
| `performanceRequirement` | Speed/throughput/latency targets |
| `interfaceRequirement` | APIs, protocols, integration points |
| `physicalRequirement` | Hardware, deployment, physical constraints |
| `designConstraint` | Mandated technology, standards, or design decisions |

## Elements and Relationships

```
requirementDiagram

requirement user_auth {
id: 1
text: The system shall authenticate users
risk: high
verifymethod: test
}

element AuthService {
type: simulation
}

AuthService - satisfies -> user_auth
```
<a href="https://eric.run.place/MermZen/#eJxNjkEKwjAQRa8yZG0XusxCELyBLgMS2q8ZbEbNTIql9O5SFXT7eZ_3Jjc4v1m51nlX8KhckCG253gpMQcJ8rdSVZRTrJZoCsKdp3UQw9M8HRNIRzVk0hT7nhYKYtxGw_unQQrr1VPiSwoyoPB5zLB06zwZ1ILMiw_9x7Wrlg4oA7dYbDbe4Uk51z4a3-RL_1MNaTTWM0Op2f5i3fwCvipWsg" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

`element id { type: ... }` defines a real-world thing (a service, a document, a test case) that participates in requirement relationships. The syntax for any relationship is `source - relationshipType -> target`:

| Relationship | Meaning |
|---|---|
| `satisfies` | An element satisfies a requirement |
| `verifies` | An element verifies a requirement (e.g. a test case) |
| `traces` | A loose traceability link, weaker than satisfies |
| `contains` | A requirement contains a sub-requirement (hierarchy) |
| `derives` | A requirement is derived from another |
| `refines` | A requirement refines (adds detail to) another |
| `copies` | A requirement is a copy of another |

Requirements can also relate to each other, not just to elements:

```
requirementDiagram

requirement parent_req {
id: 1
text: parent requirement
risk: low
verifymethod: test
}

requirement child_req {
id: 1.1
text: child requirement
risk: low
verifymethod: test
}

parent_req - contains -> child_req
```
<a href="https://eric.run.place/MermZen/#eJyVjsEKwjAQRH9lydkKeszBk5-xICFd7WKzsZu1VUr_XRDR6M3rvOHNzG50frty0XmnNFxZKZHYnsNJQ0JBqVK4BCWxg9IAMwq3HjYoRjfzLwRVG0W5nD30eUIZSfl4T2Rdbj0YFUNZfvWx4779sq_f_if7X189biBmscBSoNl9ttzyAM70Yh4" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Full Example: Login Requirements Traceability

```
requirementDiagram

requirement user_auth {
id: 1
text: The system shall authenticate users
risk: high
verifymethod: test
}

functionalRequirement login_flow {
id: 1.1
text: The system shall provide a login form
risk: medium
verifymethod: inspection
}

performanceRequirement response_time {
id: 2
text: Login shall respond within 2 seconds
risk: low
verifymethod: demonstration
}

element AuthService {
type: simulation
}

element LoginUI {
type: simulation
}

AuthService - satisfies -> user_auth
LoginUI - satisfies -> login_flow
user_auth - contains -> login_flow
AuthService - traces -> response_time
```
<a href="https://eric.run.place/MermZen/#eJx9kk1rwzAMhv-KyHkdrEcfBoNdBjtt3c1QjKPUYracWUq6UvrfR5OlTbuPq3n1Pg-S91VfmeVN5StTFfzoqGBC1kdym-KSZcuzV-gEy9p1GmBvmWoDd5YVP9XAKiDIThQTSHAxwjGFrOSd4jAnlgvJu4FAm2C5x0LNLqGGXBtQFLV8OPKajr1SZhdfZuSYN8TrJubtCX37N7wtuacawY1z0OSSJnzCmrp0LUAsLQ7cb40Wy3HKsce5R0FpMwuulRJOKstJ5HmgjQ5jsoYtaSCGJQj6zPVpDTFvryVqTJlFi5t5YBzBD52GVyw9-QGruxYNCKUu_pYeRN6e_knO-xYgTkkaQoHF_fnKlqeeq8T5GpbPf2IBPrM64h-ZS5gW58eei21Why-B-PcE" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

Two elements (`AuthService`, `LoginUI`) satisfy two requirements, one requirement contains a sub-requirement, and one element traces to a performance requirement — a complete, small traceability graph.

## Common Mistakes

- **Using `type`, `status`, or `priority` fields** — these don't exist. The only fields are `id`, `text`, `risk`, `verifymethod`.
- **Using `title`** — breaks the render entirely for this diagram type specifically.
- **Writing `requirement "Display Name" { ... }`** — the identifier right after `requirement` is a bare ID (like a variable name), not a quoted display string. Use `requirement my_req { text: "Display text goes here" }` instead — the human-readable text belongs in the `text` field.
- **Making up relationship names** like `requires` or `impacts` — only `satisfies`, `verifies`, `traces`, `contains`, `derives`, `refines`, `copies` are real.
- **Hyphens in attribute values** (e.g. `docref: some-doc`) can break parsing — avoid hyphens in attribute values, or quote them if your renderer's version supports it.

## Quick Reference

| Syntax | Function |
|--------|----------|
| `requirementDiagram` | Declare a requirement diagram |
| `requirement id { ... }` | Generic requirement |
| `functionalRequirement id { ... }` | What the system must do |
| `performanceRequirement id { ... }` | Speed/throughput/latency target |
| `interfaceRequirement id { ... }` | API/protocol/integration point |
| `physicalRequirement id { ... }` | Hardware/deployment constraint |
| `designConstraint id { ... }` | Mandated tech/standard/design decision |
| `id`, `text`, `risk`, `verifymethod` | The only 4 valid fields inside a requirement block |
| `element id { type: ... }` | Define a real-world element |
| `a - satisfies -> b` | `a` satisfies requirement `b` |
| `a - verifies -> b` | `a` verifies requirement `b` |
| `a - contains -> b` | `a` contains sub-requirement `b` |

## Next Step

For a lighter-weight way to show relationships between concepts without SysML formality, see [Mermaid Flowcharts](flowchart.html).

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
