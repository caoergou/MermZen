---
title: 如何用 Mermaid 画需求图
description: 深入讲解 Mermaid 需求图的六种真实需求类型、元素关系（satisfies/traces/derives/refines/contains/copies），附完整的需求可追溯性示例。
date: 2026-03-05
slug: requirement
---

# 如何用 Mermaid 画需求图

<span class="post-meta">2026-03-05 · MermZen 教程

需求图（基于 SysML 需求图）用于展示需求本身、需求之间的关系，以及哪些系统元素满足或验证了这些需求，适合监管类或安全相关项目里的需求可追溯性管理。Mermaid 用 `requirementDiagram` 声明需求图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyYvJQxJVKC1OLYpPLC3JUKiOyctMsVIwjMkrSa0osVKIUXq-effz3fOf7prydP3O51NWPOvY_mL_7BcLe17sWv1k996Xq3perG-MUYrJK8oszrZSyMhMz4jJK0stykyrzE0tychPsVIoSS0uicmrVaoFAMLsRAA" width="100%" height="300" frameborder="0"></iframe>

## 为什么用需求图？

- **可视化需求结构** — 一眼看出需求之间的层级和依赖关系
- **可追溯性** — 把每条需求关联到满足它的元素、以及确认它的验证方法
- **追踪派生/细化需求** — 看清一条高层需求如何拆解成更具体的子需求

### 适用场景

✅ **适合**：需要正式需求可追溯性（SysML 风格）的监管类或安全相关项目；记录哪些组件满足哪些需求。

❌ **不适合**：不需要可追溯性的轻量级产品需求——一个普通列表或表格更简单、更容易维护。

## 声明图表

```
requirementDiagram

requirement user_auth {
id: 1
text: "系统应对用户进行身份验证"
risk: high
verifymethod: test
}
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyYvJQxJVKC1OLYpPLC3JUKiOyctMsVIwjMkrSa0osVKIUXq-effz3fOf7prydP3O51NWPOvY_mL_7BcLe17sWv1k996Xq3perG-MUYrJK8oszrZSyMhMz4jJK0stykyrzE0tychPsVIoSS0uicmrVaoFAMLsRAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`requirement` 块只需要这四个字段：`id`、`text`、`risk`（`high`/`medium`/`low`）、`verifymethod`（`analysis`/`inspection`/`test`/`demonstration`）。不存在 `type`、`status`、`priority` 字段——这些听起来很合理，但在真实语法里并不存在。`title` 在这个图表类型里也**不是**有效的顶层语句——写了会直接**导致渲染失败**（已实测确认），这点和 architecture-beta、block-beta 不同，那两者里无效的 `title`只是被静默忽略。

**重要**：CJK（中文）文本放进 `text:` 字段时**必须加引号**，比如 `text: "系统应对用户进行身份验证"`。不加引号会直接渲染失败（已实测确认）——这点和英文文本不同，英文文本不加引号也没问题。

## 六种需求类型

除了通用的 `requirement`，Mermaid 还支持 5 种更具体的类型——字段结构相同，语义标签不同：

```
requirementDiagram

interfaceRequirement api_interface {
id: 3
text: "系统应提供 REST API"
risk: medium
verifymethod: inspection
}

physicalRequirement server_rack {
id: 4
text: "系统应运行在冗余服务器上"
risk: low
verifymethod: analysis
}

designConstraint tech_stack {
id: 5
text: "系统应使用 TypeScript"
risk: low
verifymethod: analysis
}
```
<a href="https://eric.run.place/MermZen/#eJyNzj9Lw0AYgPGvctzs5J_lNlEHN2k7HpTj8rZ5afImvneNhtLVoSh2KEixIN2yu4il9sskTT-GCGqLdHB-ht8zkJlUhwfSSiUZrvvIEAP5czRdNrEmTUgeuGMsNLZZmBTbv0EMNGGgxJEmD7deCS3r10W9eKneJ-vHcfnxLBoXzZY4vbrUUhOj6ykRQ4D9WFMGjJ08Bh8mgRJILgXrMSFNwy89DXOH1kS7uAPOgNtsbO-HPt5Db1bjzfy-mhXV3VO5nK5nD9VoXk2L8m203YiSm78PhkyUO3TfBwE47NJZQs6zQfLCgw3bzu_oJ3v0crmqJ4Vo5Sk0LWPq_2vK4Sf5NK64" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 类型 | 用于 |
|------|------|
| `requirement` | 通用兜底 |
| `functionalRequirement` | 系统必须做什么 |
| `performanceRequirement` | 速度/吞吐量/延迟指标 |
| `interfaceRequirement` | API、协议、集成点 |
| `physicalRequirement` | 硬件、部署、物理约束 |
| `designConstraint` | 强制指定的技术、标准或设计决策 |

## 元素与关系

```
requirementDiagram

requirement user_auth {
id: 1
text: "系统应对用户进行身份验证"
risk: high
verifymethod: test
}

element AuthService {
type: simulation
}

AuthService - satisfies -> user_auth
```
<a href="https://eric.run.place/MermZen/#eJxNzrFqAkEQxvFXGbaORSy3EAK-ge2ALN7oDvFG3Z09FLFIl8LSLoWkC7GwSCF6iC-juctbBDEQ248__L65KYxtPpiesSbQJHGgnETb7AbB5SgodyukSKHrknqYo3Bm4RFFaaoW0FRfZVWuL4fVZbuvVh_fr7v69Fa_L-vD5lwefz6X9fYFDUrg-GzB88CjFBS4P8tJ_SizoBQVZXFFaXgDn5L6DoWCe3QldTYmC5HzNHTKI_mr76sGRKcc-0wRGq3_x2bxC0txZLg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`element id { type: ... }` 定义一个参与需求关系的真实事物（服务、文档、测试用例）。关系的语法统一是 `source - relationshipType -> target`：

| 关系 | 含义 |
|------|------|
| `satisfies` | 元素满足需求 |
| `verifies` | 元素验证需求（比如测试用例） |
| `traces` | 较弱的可追溯性关联，比 satisfies 更松散 |
| `contains` | 需求包含子需求（层级关系） |
| `derives` | 需求由另一条需求派生而来 |
| `refines` | 需求细化（补充细节）另一条需求 |
| `copies` | 需求是另一条需求的副本 |

需求之间也可以直接建立关系，不一定要通过元素：

```
requirementDiagram

requirement parent_req {
id: 1
text: "父需求"
risk: low
verifymethod: test
}

requirement child_req {
id: 1.1
text: "子需求"
risk: low
verifymethod: test
}

parent_req - contains -> child_req
```
<a href="https://eric.run.place/MermZen/#eJyVzjEKwkAQheGrDFMbQcstrDzGgCzJaAaTWbMZoxICYmXpAbyChY03UvEWlkY721d872-xQTceYIoOI1driVyy2lT8IvqSlLS3wspHVptFrqAllczBiNR4aw4In8fb67x_XA-EpFHqpYMibEgbjjLflWx5yBwY10ba_cppLkX2BQ979P1y-o_uhSaQBjUvWkMy-fxg9wZAamJp" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：登录需求可追溯性

```
requirementDiagram

requirement user_auth {
id: 1
text: "系统应对用户进行身份验证"
risk: high
verifymethod: test
}

functionalRequirement login_flow {
id: 1.1
text: "系统应提供登录表单"
risk: medium
verifymethod: inspection
}

performanceRequirement response_time {
id: 2
text: "登录应在 2 秒内响应"
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
<a href="https://eric.run.place/MermZen/#eJx9kjFLw0AYhv_KkdkKdswgCC6Ck-J2UI70S3OY-y7eXVpL6eCgOLQo2g5SQZwsOnRwEBuqf6Zp4r-QttaktbgeL-_z8H7XsKqWXdywHMu2FJyEXIEANLucVRQTFCnmXkmoQZVYaDzSoMjLNtmiaODU2IRayWuURA_xsBMP3pNOf3L5ln720sdWOnwZR6Ov51Y6OKMWRcX1sU08XvEoVkFxty7AeLJsEwPaUGxOoW6IjuESmX-Qw_uywrHk-rL2y99cZzC5uh5_9JK7KB5108d-3O5mYAFlHopVNEcdwIz4IxCAcqUSDB3IGyjQgUQNJcMFLCSKOYUZczrCfZ8USfJ0E1-cx7fteNjJFHxZW-WXQUjURrGcAvhz5k5ovENQVe7MiKYegE00F6G_Lr0_3eho759kvq9ANDNcuxw0KWxn96W46FlJZCegmP2GAnEkGsbxT2YZZhRz5j1LQ1rNb9qtETE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

两个元素（`AuthService`、`LoginUI`）满足两条需求，一条需求包含一条子需求，还有一个元素追溯到一条性能需求——一张完整、小巧的可追溯性关系图。

## 常见错误

- **用了 `type`、`status`、`priority` 字段**——这些都不存在。唯一有效的字段是 `id`、`text`、`risk`、`verifymethod`。
- **用了 `title`**——在这个图表类型里会直接导致整个图渲染失败。
- **写成 `requirement "显示名称" { ... }`**——`requirement` 后面紧跟的是一个裸标识符（类似变量名），不是带引号的显示字符串。应该写成 `requirement my_req { text: "这里放人类可读的文字" }`——可读文本要放进 `text` 字段。
- **CJK 文本不加引号**——不像英文文本，中文文本放进 `text:` 字段必须加引号，否则渲染失败。
- **编造关系名**，比如 `requires`、`impacts`——真实存在的只有 `satisfies`、`verifies`、`traces`、`contains`、`derives`、`refines`、`copies`。

## 快速参考

| 语法 | 作用 |
|------|------|
| `requirementDiagram` | 声明需求图 |
| `requirement id { ... }` | 通用需求 |
| `functionalRequirement id { ... }` | 系统必须做什么 |
| `performanceRequirement id { ... }` | 速度/吞吐量/延迟指标 |
| `interfaceRequirement id { ... }` | API/协议/集成点 |
| `physicalRequirement id { ... }` | 硬件/部署约束 |
| `designConstraint id { ... }` | 强制指定的技术/标准/设计决策 |
| `id`、`text`、`risk`、`verifymethod` | 需求块内仅有的 4 个有效字段 |
| `element id { type: ... }` | 定义一个真实世界的元素 |
| `a - satisfies -> b` | `a` 满足需求 `b` |
| `a - verifies -> b` | `a` 验证需求 `b` |
| `a - contains -> b` | `a` 包含子需求 `b` |

## 下一步

如果想用更轻量的方式展示概念间的关系、不需要 SysML 那种正式程度，请查看[流程图教程](flowchart.html)。

---

要试运行上面的代码，点击[打开编辑器](https://eric.run.place/MermZen/)并粘贴代码。
