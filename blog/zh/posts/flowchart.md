---
title: 如何用 Mermaid 画流程图
description: 深入讲解 Mermaid 流程图的节点形状、连线类型、子图分组、条件判断语法，附用户登录流程的完整实战示例。
date: 2026-03-04
slug: flowchart
---

# 如何用 Mermaid 画流程图

<span class="post-meta">2026-03-04 · MermZen 教程

流程图用于描述一个过程的步骤与决策路径，适合展示用户操作流程、业务审批逻辑、算法流程等场景。Mermaid 使用 `graph` 或 `flowchart` 关键字声明流程图，纯文本书写，无需绘图工具。

<iframe src="https://eric.run.place/MermZen/embed.html#Sy9KLMhQCHHhUgACR43op3sani7vjtVU0NW1U3CKfj5lxbOO7S_2TX7auvTFlmVP-7cr6Cs8Xd_2fEFjLFiLE1ihczVE8tmM9U8nLHu6dsbTOSvsa8EKnEEKaoCiNQou0c_6Jzxfsgui9smOXohCiEEuEBuR9AANq1FwrYbYBjH52drFzxeug5rsijDZLfrFug1P9059umTjiy1Ln61Z-GzqBoixbmBj3auRZRQedS5VMIaa4o6wyyP65ZTGp-tmQT1qbKDwtKPt5aT5sUgKwdY5IdkP1ukJDKj5zzomKASnFhdn5ucphORnp-ZB9HmCXeAV_WL75hd717xcNu3lwq0QGS-wjLdG9PPdk5_NnR-rCQA" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `graph` 或 `flowchart` 关键字，后接方向参数：

```
graph TD
```
<a href="https://eric.run.place/MermZen/#Sy9KLMhQCHEBAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#Sy9KLMhQCHHhUgACx-hn03Y-W9gWC-Y5aTyd0_Zi-SSImCZYzLn6Rf_Gp3sX1YJ5LhogJUCuJkTWVSP62ZK1QKFYCN8tOvrp2gnPV3Q_3dUPMhZirnu0xrOpG571rnu6a7ImRMjD7tmC9mebVzybPv3pjjmxAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#Sy9KLMhQ8AniUgACRwVdXTsFJzhbV8EZxtYDSrhAOba2dgqucEXPprU_XTsdpNENYUjNswXtz9fuq1FwBwA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#Sy9KLMhQCHHhUgCC4tKkdDD_aWfv89XrwWIg4Bj9fMqKZx3bn0_teTl3UayCrq6dglP0i4UrnvZOfbmq58X6xliw2tS8FDRzJvQhm-Mc7RjgqfB878SnrZshprhEP5u64Vnvuqe7JqMa4QSWdgYA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#Sy9KLMhQCHHhUgACR43op3sani7vjtVU0NW1U3CKfj5lxbOO7S_2TX7auvTFlmVP-7cr6Cs8Xd_2fEFjLFiLE1ihczVE8tmM9U8nLHu6dsbTOSvsa8EKnEEKaoCiNQou0c_6Jzxfsgui9smOXohCiEEuEBuR9AANq1FwrYbYBjH52drFzxeug5rsijDZLfrFug1P9059umTjiy1Ln61Z-GzqBoixbmBj3auRZRQedS5VMIaa4o6wyyP65ZTGp-tmQT1qbKDwtKPt5aT5sUgKwdY5IdkP1ukJDKj5zzomKASnFhdn5ucphORnp-ZB9HmCXeAV_WL75hd717xcNu3lwq0QGS-wjLdG9PPdk5_NnR-rCQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
