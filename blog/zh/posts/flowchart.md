---
title: 如何用 Mermaid 画流程图
description: 深入讲解 Mermaid 流程图的节点形状、连线类型、子图分组、条件判断语法，附用户登录流程的完整实战示例。
date: 2026-03-04
slug: flowchart
---

# 如何用 Mermaid 画流程图

<span class="post-meta">2026-03-04 · MermZen 教程

流程图用于描述一个过程的步骤与决策路径，适合展示用户操作流程、业务审批逻辑、算法流程等场景。Mermaid 使用 `graph` 或 `flowchart` 关键字声明流程图，纯文本书写，无需绘图工具。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" width="100%" height="600" frameborder="0"></iframe>

## 为什么用流程图？

流程图的核心价值在于**清晰表达过程步骤和决策路径**。相比纯文字描述，流程图能：

- 直观展示分支逻辑，避免遗漏边界情况
- 让团队成员快速理解业务规则
- 作为开发文档，减少沟通成本

**适合场景：**
- 用户操作流程：登录、注册、下单等操作流程
- 业务审批逻辑：请假审批、报销审批等
- 算法流程：查找、排序、计算等逻辑

## 实际场景建议

### 用户流程示例

用户登录流程是最常见的流程图应用场景，清晰展示验证、错误处理、成功跳转等分支：

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
<a href="https://eric.run.place/MermZen/#eJxNj0FLwmAYx7_Kw04KSZE3D0Vzatoxb287REhFMCOhyybkIVlEOHLGiMRGbnnQzchYVPZhoufd9i2ivRN3_v_-v__zyNw5l1tf4Q64HHd4tn96BFVhTwIA2EoR_LrA52sxDZnMBvDE10dU9YLvLl5awczGjgergG7bf2yJrMNHZF5mKTVc1GycGPgw2mwyIv9PKKjZCgiEdjR_-MHg3_cbRsYqgY0mW9RwFSjIbJHJ6eTJN52FvLCUF0ngTHHew-FLMLPo2KS9aWwuRuaSnIzg58qC7MJTWs5tk1BvoXMf_5tdA1Tb4e1ATJLRIp-8IeqWia8PqKrBbq3ROK5LUK2f1KS4WY6uqJDAew3m49C-C823OKpE0U6K-J9d2h-Iaa75B8UPvnA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 业务审批示例

请假审批流程展示多级审批逻辑：

```
graph TD
    A([开始]) --> B[员工提交请假申请]
    B --> C{请假天数 ≤ 3?}
    C -->|是| D[直属领导审批]
    C -->|否| E[部门经理审批]
    D --> F{审批通过?}
    E --> F
    F -->|是| G[更新考勤系统]
    F -->|否| H[通知员工驳回]
    G --> I([结束])
    H --> I
```
<a href="https://eric.run.place/MermZen/#eJxtUbtuwzAM_BVBUwM0gCKLopWhRRLn0b2b5cGWpXYKigLuYuffS1oNEAPVcJB4vOOBGuWP3OpnGeRWfny3X5_ivfJXQWf3VPsBklKELnTNSqzXL2LPRQMlYR_BD7boqcHE1vih7BJSXRlChKLIlSbb7Wf5YVy2gdOOTACV8IPW1oji9ZYFBxZMRFqdJlHRXLSJpkCA6AdXlpbuXQqM7Yb6NLpmKQWj7SSOJHUqUmQHjBhDIjTK_iOt5pin8ZFi-aal4CngPd0x9-XHaRH1XPONo1roaDmlUrQK0JEqGFLHCfrULKU56qW-z0Lk7T5u2rXINraPf9LzHOGNv4kMibMIqVll8pJJefsFgtOICA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 算法流程示例

二分查找算法流程图：

```
graph TD
    A([开始]) --> B[初始化 left=0, right=n-1]
    B --> C{left ≤ right?}
    C -->|否| D[返回 -1 未找到]
    C -->|是| E[计算 mid = left + right / 2]
    E --> F{"arr[mid] == target?"}
    F -->|是| G[返回 mid]
    F -->|否| H{"arr[mid] < target?"}
    H -->|是| I[left = mid + 1]
    H -->|否| J[right = mid - 1]
    I --> C
    J --> C
    D --> K([结束])
    G --> K
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUHDUiH66p-Hp8u5YTQVdXTsFp-inHXOfLu9-2jNNISc1rcTWQEehKDM9o8Q2T9cwFqLHCazSuRokr_CocwlEgX0tRNYZJFvzdMKyGgWX6Bf7pzydPU9B11Dh2ZxVzzr3Pe3YEIus7NmM9TUKrtEv1i18vm66Qm5mioIt2FoFbYihCvoKRlANrmBb3apjlBKLiqJzM1NiFWxtFUoSi9JTS-xjlKC2uyGMdYfZDlKLLAt2mweyQTYY5nggzPGMBrvIFuw8bQVYKHggzPKKhjgWokQXrsQTElAQjhcyxwXM8daIfr578rO582M1IcLuEGGlWgBTQZOB" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 声明图表

使用 `graph` 或 `flowchart` 关键字，后接方向参数：

```
graph TD
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUHCMfjZt57OFbbEQrpPG0zltL5ZPgghqQgSdq1_0b3y6d1EthOuiAVL0dO8iTai8q0b0syVrn85pi4UKuEVHP1074fmK7qe7-kFmQw13j9Z4NnXDs951T3dN1oSKedg9W9D-bPOKZ9OnP90xJ1apFgBJ3Uqf" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 形状 | 典型用途 |
|------|------|---------|
| `A[文字]` | 矩形 | 普通步骤、动作 |
| `A(文字)` | 圆角矩形 | 子流程、子任务 |
| `A{文字}` | 菱形 | 判断条件、分支 |
| `A((文字))` | 圆形 | 连接点、汇合节点 |
| `A([文字])` | 椭圆 | 开始 / 结束节点 |
| `A[[文字]]` | 矩形带双线 | 子程序调用 |
| `A[(文字)]` | 圆柱 | 数据库、存储 |

### 节点形状选择指南

选择正确的节点形状能让流程图更易读：

| 形状 | 语法 | 适用场景 |
|------|------|---------|
| **矩形** `[文字]` | 普通步骤、动作、处理过程 | 最常用，表示执行操作 |
| **菱形** `{文字}` | 判断条件、分支决策 | 必须有至少两个出口（是/否） |
| **圆形** `((文字))` | 连接点、汇合节点 | 用于跨页连接或流程汇合 |
| **椭圆** `([文字])` | 开始/结束节点 | 流程的起点和终点 |

**选择建议：**
- 每个流程图都应有明确的开始和结束节点（椭圆）
- 判断节点使用菱形，分支出口必须标注（是/否、成功/失败）
- 普通处理步骤使用矩形
- 避免过度使用特殊形状，保持简洁

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFDwCYrJU1BQUHBU0NW1U3BCcHQVnOEcPV07BRcYz9bWTsEVoe7ZtPana6eDNLshmVTzbEH787X7ahTclWoBp5wgRw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUCguTYIIPO3sfb56PUQQBByjn09Z8axj-_OpPS_nLopV0NW1U3CKfrFwxdPeqS9X9bxY3xgLUZyal4Ju1IQ-FKOcox0DPBWe7534tHUzxCCX6GdTNzzrXfd012R0U5zACpyVagHR3EXO" width="100%" height="600" frameborder="0"></iframe>

## 最佳实践

### 1. 控制决策节点数量

建议每层决策节点不超过 **2 个**，避免流程图过于复杂：

```
graph TD
    A[开始] --> B{条件1?}
    B -->|是| C{条件2?}
    B -->|否| D[处理A]
    C -->|是| E[处理B]
    C -->|否| F[处理C]
```

如果需要更多判断，考虑拆分为多个子流程或使用子图。

### 2. 分支出口必须标注

每个判断节点的分支出口都应有清晰的标签：

```
graph LR
    A{登录成功?} -->|是| B[跳转首页]
    A -->|否| C[显示错误]
```

**推荐标签：** 是/否、成功/失败、通过/驳回、有效/无效

### 3. 使用子图分组相关节点

将相关的节点用 `subgraph` 分组，提升可读性：

```
graph TD
    subgraph 用户端
        A[用户请求] --> B[身份验证]
    end
    subgraph 服务端
        C[API网关] --> D[业务逻辑]
        D --> E[数据库]
    end
    B --> C
```
<a href="https://eric.run.place/MermZen/#eJxljrsOwjAMRX8lykylJmleDEh9MLAxsDUd0jSBqUKgsCD-HadRB8odLMv32Ndv_MJ7usMO7_H1Ye83dOnMjEDPOOaBiZJTZaKgTEJvfchAUt3_umoMUIWr6ICK4oAa8JW3o4mVD5OJ2iqXKEeGfMTP01-ckCWgnFqyjWv7-nyCYeBgcSJZTun6dJ_YdUmXDBJV0GtKUregR0AFlyVUJjwseM22rzQL2eLPFxbjUGY" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 4. 保持流程方向一致

- **从上到下（TD）**：最常用，适合大多数业务流程
- **从左到右（LR）**：适合状态机、数据管道、时间线

避免在同一张图中混用多个方向。

## 与其他图表对比

| 特性 | 流程图 | 时序图 | 状态图 |
|------|--------|--------|--------|
| **核心表达** | 过程步骤 + 决策 | 对象交互顺序 | 状态转换 |
| **适用场景** | 业务流程、算法 | API 调用、系统交互 | 状态机、生命周期 |
| **决策分支** | ✅ 强调 | ❌ 不侧重 | ✅ 有条件转换 |
| **时间顺序** | ⚠️ 可选 | ✅ 核心 | ⚠️ 隐含 |
| **参与者** | ⚠️ 可选 | ✅ 必需 | ❌ 单一对象 |

**选择建议：**
- 需要展示**决策分支**？→ 流程图
- 需要展示**多个对象的交互顺序**？→ 时序图
- 需要展示**单一对象的状态变化**？→ 状态图

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
<a href="https://eric.run.place/MermZen/#eJxNj0FLwmAYx7_Kw04KSZE3D0Vzatoxb287REhFMCOhyybkIVlEOHLGiMRGbnnQzchYVPZhoufd9i2ivRN3_v_-v__zyNw5l1tf4Q64HHd4tn96BFVhTwIA2EoR_LrA52sxDZnMBvDE10dU9YLvLl5awczGjgergG7bf2yJrMNHZF5mKTVc1GycGPgw2mwyIv9PKKjZCgiEdjR_-MHg3_cbRsYqgY0mW9RwFSjIbJHJ6eTJN52FvLCUF0ngTHHew-FLMLPo2KS9aWwuRuaSnIzg58qC7MJTWs5tk1BvoXMf_5tdA1Tb4e1ATJLRIp-8IeqWia8PqKrBbq3ROK5LUK2f1KS4WY6uqJDAew3m49C-C823OKpE0U6K-J9d2h-Iaa75B8UPvnA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
