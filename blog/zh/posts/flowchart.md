

# 如何用 Mermaid 画流程图

<span class="post-meta">2026-03-04 · MermZen 教程

流程图用于描述一个过程的步骤与决策路径，适合展示用户操作流程、业务审批逻辑、算法流程等场景。Mermaid 使用 `graph` 或 `flowchart` 关键字声明流程图，纯文本书写，无需绘图工具。

## 声明图表

使用 `graph` 或 `flowchart` 关键字，后接方向参数：

```
graph TD
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHEBAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 方向参数 | 含义 | 效果 |
|---------|------|------|
| `TD` / `TB` | Top → Down（从上到下） | 最常用，适合流程步骤 |
| `LR` | Left → Right（从左到右） | 适合状态机、管道 |
| `BT` | Bottom → Top（从下到上） | 倒序场景 |
| `RL` | Right → Left（从右到左） | 较少使用 |

## 节点形状

节点是流程图的基本元素，不同括号代表不同形状：

```
graph TD
    A[方框]
    B(圆角方框)
    C{菱形}
    D((圆形))
    E([椭圆])
    F[[子程序框]]
    G[(数据库)]
    H>标注旗帜]
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHHhUgACx-hn03Y-W9gWC-Y5aTyd0_Zi-SSImCZYzLn6Rf_Gp3sX1YJ5LhogJUCuJkTWVSP62ZK1QKFYCN8tOvrp2gnPV3Q_3dUPMhZirnu0xrOpG571rnu6a7ImRMjD7tmC9mebVzybPv3pjjmxAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 形状 | 典型用途 |
|------|------|---------|
| `A[文字]` | 矩形 | 普通步骤、动作 |
| `A(文字)` | 圆角矩形 | 子流程、子任务 |
| `A{文字}` | 菱形 | 判断条件、分支 |
| `A((文字))` | 圆形 | 连接点、汇合节点 |
| `A([文字])` | 椭圆 | 开始 / 结束节点 |
| `A[[文字]]` | 矩形带双线 | 子程序调用 |
| `A[(文字)]` | 圆柱 | 数据库、存储 |

## 连线类型

连线决定节点之间的视觉关系：

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --文字--> F
    A -->|标签| G
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQ8AniUgACRwVdXTsFJzhbV8EZxtYDSrhAOba2dgqucEXPprU_XTsdpNENYUjNswXtz9fuq1FwBwA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 含义 |
|------|------|
| `A --> B` | 实线箭头（最常用） |
| `A --- B` | 实线无箭头 |
| `A -.-> B` | 虚线箭头（可选路径、弱依赖） |
| `A ==> B` | 粗线箭头（强调流程） |
| `A --文字--> B` | 带说明的连线 |
| `A -->|标签| B` | 带标签的连线（等价写法） |
| `A --o B` | 末端为圆圈 |
| `A --x B` | 末端为叉号（错误/拒绝路径） |

## 子图（subgraph）

用 `subgraph` 将相关节点分组，使流程图层次更清晰：

```
graph TD
    subgraph 前端
        A[用户界面] --> B[表单验证]
    end
    subgraph 后端
        C[API 网关] --> D[数据库]
    end
    B --> C
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHHhUgCC4tKkdDD_aWfv89XrwWIg4Bj9fMqKZx3bn0_teTl3UayCrq6dglP0i4UrnvZOfbmq58X6xliw2tS8FDRzJvQhm-Mc7RjgqfB878SnrZshprhEP5u64Vnvuqe7JqMa4QSWdgYA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：用户登录流程

```
graph TD
    A([开始]) --> B[用户输入账号 / 密码]
    B --> C{账号是否存在?}
    C -->|否| D[提示账号不存在]
    D --> B
    C -->|是| E{密码是否正确?}
    E -->|否| F[记录失败次数]
    F --> G{失败次数 ≥ 3?}
    G -->|是| H[锁定账号 30 分钟]
    G -->|否| B
    E -->|是| I[生成 Session Token]
    I --> J[跳转首页]
    J --> K([结束])
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHHhUgACR43op3sani7vjtVU0NW1U3CKfj5lxbOO7S_2TX7auvTFlmVP-7cr6Cs8Xd_2fEFjLFiLE1ihczVE8tmM9U8nLHu6dsbTOSvsa8EKnEEKaoCiNQou0c_6Jzxfsgui9smOXohCiEEuEBuR9AANq1FwrYbYBjH52drFzxeug5rsijDZLfrFug1P9059umTjiy1Ln61Z-GzqBoixbmBj3auRZRQedS5VMIaa4o6wyyP65ZTGp-tmQT1qbKDwtKPt5aT5sUgKwdY5IdkP1ukJDKj5zzomKASnFhdn5ucphORnp-ZB9HmCXeAV_WL75hd717xcNu3lwq0QGS-wjLdG9PPdk5_NnR-rCQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `graph TD` | 从上到下 |
| `graph LR` | 从左到右 |
| `A[文字]` | 方框节点 |
| `A{文字}` | 判断菱形 |
| `A([文字])` | 开始/结束 |
| `A --> B` | 实线箭头 |
| `A -->|标签| B` | 带标签箭头 |
| `A -.-> B` | 虚线箭头 |
| `subgraph 标题` | 子图分组 |
| `%% 注释` | 行注释 |

## 下一步

掌握流程图后，继续学习 [Mermaid 时序图](sequence.html)，用于描述系统之间的交互顺序。





# Mermaid Flowchart Tutorial

<span class="post-meta">2026-03-04 · MermZen Tutorials

Flowcharts describe the steps and decision paths of a process — perfect for user journeys, approval workflows, and algorithm logic. Mermaid uses the `graph` or `flowchart` keyword to declare a flowchart in plain text, no drawing tools required.

## Declaring a Chart

Use `graph` or `flowchart` followed by a direction parameter:

```
graph TD
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHEBAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Direction | Meaning | Best for |
|-----------|---------|---------|
| `TD` / `TB` | Top → Down | Most common; step-by-step flows |
| `LR` | Left → Right | State machines, pipelines |
| `BT` | Bottom → Top | Reverse order diagrams |
| `RL` | Right → Left | Rarely used |

## Node Shapes

Nodes are the building blocks. Different bracket styles create different shapes:

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
<a href="https://caoergou.github.io/mermzen/#JYwxDsIwDEV3TuHRmTgDNMDeslkZ3MYqltKkSpMJcXeq5G_vPemvmfcPvO0Fzt1olKVwXIO4Ju44phq9eMhnMM0NX6u8peh_DS3ioHkJYnp-IE2FvdYNrrBrCK77J9FU55xq0Siu378ILRee-RDj_g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Syntax | Shape | Typical use |
|--------|-------|------------|
| `A[text]` | Rectangle | Steps, actions |
| `A(text)` | Rounded rectangle | Subprocesses |
| `A{text}` | Diamond | Conditions, decisions |
| `A((text))` | Circle | Connectors, junctions |
| `A([text])` | Stadium | Start / End nodes |
| `A[[text]]` | Double-border rect | Subroutine calls |
| `A[(text)]` | Cylinder | Databases, storage |

## Connection Types

Links define how nodes relate visually:

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --label--> F
    A -->|label| G
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQ8AniUgACRwVdXTsFJzhbV8EZxtYDSrhAOba2dgqucEU5iUmpOSB9bggzasCCNQruAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Syntax | Meaning |
|--------|---------|
| `A --> B` | Solid arrow (most common) |
| `A --- B` | Solid line, no arrow |
| `A -.-> B` | Dashed arrow (optional path) |
| `A ==> B` | Thick arrow (emphasis) |
| `A --text--> B` | Arrow with inline label |
| `A -->|label| B` | Arrow with label (alternate) |
| `A --o B` | Circle endpoint |
| `A --x B` | Cross endpoint (error/rejection) |

## Subgraphs

Use `subgraph` to group related nodes and add visual hierarchy:

```
graph TD
    subgraph Frontend
        A[UI Layer] --> B[Form Validation]
    end
    subgraph Backend
        C[API Gateway] --> D[Database]
    end
    B --> C
```
<a href="https://caoergou.github.io/mermzen/#Sy9KLMhQCHHhUgCC4tKkdDDfrSg_ryQ1LwUsCgKO0aGeCj6JlalFsQq6unYKTtFu-UW5CmGJOZkpiSWZ-XmxYKUwLXCDnBKTs5HNcY52DPBUcE8sSS1PrIQY5RLtkliSmJRYnIpqhhNY1hkA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: User Login Flow

```
graph TD
    A([Start]) --> B[User enters credentials]
    B --> C{Account exists?}
    C -->|No| D[Show error message]
    D --> B
    C -->|Yes| E{Password correct?}
    E -->|No| F[Increment fail count]
    F --> G{Fails >= 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to dashboard]
    J --> K([End])
```
<a href="https://caoergou.github.io/mermzen/#TY9NT8MwDIbv_Aoft8MkpJ0ZWtcPOhBCdBxQ1EOWmDXamiA7aEgt_500raA-RfbzfuRE8rOBQ3oDYbYLUXlJvl7CarWBRLwxEqD1SAyKUIenkReuI51EaNdtlXJf1gN-G_Z8_xOPu-HYP7seUlE17gpI5AhaZJYnHA3SMWXGvyP3kHUvkvnqSINyRKj85Jn9eeaitKFPG_rAhzQXiA1G1zy6Fl0e9gybO1hP8uI_4kE8OXUGOTVf30JrbD2jhpBkFhpVpSjQIkmPUIV_GGfh4M44CcuYuxevqM1QGrwDLbk5Okl6RPYReVyIzOp6-Qs" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Description |
|--------|-------------|
| `graph TD` | Top-down layout |
| `graph LR` | Left-right layout |
| `A[text]` | Rectangle node |
| `A{text}` | Diamond (decision) |
| `A([text])` | Start/End (stadium) |
| `A --> B` | Solid arrow |
| `A -->|label| B` | Labeled arrow |
| `A -.-> B` | Dashed arrow |
| `subgraph title` | Group nodes |
| `%% comment` | Line comment |

## Next Up

After flowcharts, learn [Mermaid Sequence Diagrams](sequence.html) to visualize interactions between systems over time.



---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://caoergou.github.io/mermzen/)，然后将代码粘贴进去。
