---
title: 如何用 Mermaid 画架构图
description: 深入讲解 Mermaid 架构图的 group/service 语法、强制锚点规则，以及实测验证过的真实布局局限。
date: 2026-03-05
slug: architecture
---

# 如何用 Mermaid 画架构图

<span class="post-meta">2026-03-05 · MermZen 教程

架构图用于展示系统组件、分组和它们之间的连接关系，适合系统设计、架构评审、技术文档。Mermaid 用 `architecture-beta` 声明架构图，核心是 `group`（分组）和 `service`（服务），加上强制指定方向的连线。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGMjlF61jHx-ayW55t3P989P0YpVqkWAHCTG-g" width="100%" height="500" frameborder="0"></iframe>

## 为什么用架构图？

- **可视化系统结构** — 一眼看出系统由哪些组件构成，如何交互
- **架构评审** — 在实现前发现设计问题
- **团队沟通** — 帮新成员快速理解系统全貌
- **技术文档** — 给架构文档一个具体、直观的落脚点

### 适用场景

✅ **适合**：
- 中小规模的云/系统拓扑图（大致 8 个服务以内——下文会讲这个限制的来源）
- 架构评审讨论
- 系统整体形态的入门文档

❌ **不适合**：
- 超过约 8 个服务，或者有服务从多个方向汇入/发出——改用带 `subgraph` 的流程图（见[流程图教程](flowchart.html)）
- 展示代码逻辑流程 → 用流程图
- 展示时间序列 → 用时序图

## 与其他图表对比

| 图表类型 | 核心用途 | 与架构图的区别 |
|---------|---------|---------------|
| **架构图** | 带图标的小规模云/系统拓扑 | 有云图标，但布局控制非常有限 |
| **流程图** | 流程与决策，通用结构展示 | 没有内置图标，但布局控制成熟（`direction`、`subgraph`），大规模下更可靠 |

**选择建议**：如果想要云风格图标，且系统规模小、连接大致是线性的，用架构图。如果组件超过 8 个、有多处汇入汇出，或者需要精确控制布局，改用流程图。

## 声明图表

```
architecture-beta
    group sys(cloud)["我的系统"]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGMjlF61jHx-ayW55t3P989P0YpVqkWAHCTG-g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`group` 是一个带标签的容器：`group id(icon)[标题]`。内置图标只有 5 个：`cloud`、`database`、`disk`、`internet`、`server`——这就是全部，没有办法接入自定义图标（比如某个云厂商的 logo），除非做完整的 JS 集成（多数用户用不到）。

注意：`title` 在这里**不是**有效的顶层语句（不像流程图或甘特图），写了会被静默忽略，不会报错也不会显示，别浪费时间加它。

## 定义服务

```
architecture-beta
    group sys(cloud)["我的系统"]

    service ui(internet)["前端"] in sys
    service logic(server)["后端"] in sys
    service store(database)["数据库"] in sys
    service ext(server)["支付系统"]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGMjlF61jHx-ayW55t3P989P0YpNiYPorI4tagsMzlVoTRTIzOvJLUoL7UEpPppZ-_z1etjlGIVMvNA5qAqzslPz0zWAPFSi8CqJ_ThUV1ckl-UqpGSWJKYlFicCnbL1A3Petc93TUZl5bUihIk459NWf9k9wy405VqAV2KZ74" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`service id(icon)[标题] in groupId` 把服务放进分组里。不写 `in groupId` 则服务会渲染在**所有分组之外**——适合表示外部系统（上例中"支付系统"就渲染在"我的系统"外面）。

**重要**：架构图里的 CJK（中文）标签**必须加引号**，比如 `["前端"]`，不能写成 `[前端]`——这点和流程图不一样，流程图里中文不加引号也没问题，但架构图不加引号会直接解析失败（已实测验证）。

## 服务之间的连接

```
architecture-beta
    group sys(cloud)["我的系统"]

    service ui(internet)["前端"] in sys
    service logic(server)["后端"] in sys
    service store(database)["数据库"] in sys
    service ext(server)["支付系统"]

    ui:B -- T:logic
    logic:B -- T:store
    logic:R -- L:ext
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUrVTUotSYzJU1BQUEgvyi8tUCiuLNZIzskvTdGMjlF61jHx-ayW55t3P989P0YpNiYPorI4tagsMzlVoTRTIzOvJLUoL7UEpPppZ-_z1etjlGIVMvNA5qAqzslPz0zWAPFSi8CqJ_ThUV1ckl-UqpGSWJKYlFicCnbL1A3Petc93TUZl5bUihIk459NWf9k9wwMp5dmWjkp6OoqhFiB3QMRBDNh4mCbkcWDQOI-VqkVJUq1AAjWe-A" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**连线必须显式指定两端方向，不是可选项**：`serviceA:方向 -- 方向:serviceB`，方向是 `T`/`B`/`L`/`R` 之一。漏写一端会直接**报解析错误**，不存在"默认方向"这种兜底。想要箭头就用 `-->` 而不是 `--`。

## 完整示例：小型商店系统

```
architecture-beta
    group sys(cloud)["网店系统"]

    service web(internet)["Web 应用"] in sys
    service api(server)["API 网关"] in sys
    service orders(server)["订单服务"] in sys
    service payments(server)["支付服务"] in sys
    service db(database)["订单数据库"] in sys
    service cache(disk)["会话缓存"] in sys

    web:B -- T:api
    api:B -- T:orders
    orders:B -- T:db
    orders:R -- L:payments
    api:R -- L:cache
```
<a href="https://eric.run.place/MermZen/#eJx9jz1Lw0AYx7_KcVMEszhm001wEBEcTId7ebCHegmXS0sRRxchgzTFIoro5GIrdEvab9NL-jHkPIPpELeH3_P_PS83eICDvV3McICJYn2hgelUgU9Bk1AihNCFitIYJaPEY1dRynfOQ1yvHkzxWC_KunwNcS-ULpmAGggGaAjUE1KDkqBt_AwoMkVe5x8h7iEh7bBtg8TCszUom98_PkR2xd2iKx8pDippKZvZu8km1XNm7t-6pJiMrkHqtlbl83U5_V_j1ONEE0oSaG2afFXZzBTjLosR1gePi-TSSuvl02b-Ui_H5nPaNpwzBBocIN9HpwGJhWMkFg1zzzrs6qbD6RY9sfQoaP78G_Tb-LkJ334D4vq-6Q" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

六个服务，每条边都是纯粹的 R-L 或 T-B 直线，没有任何服务被两个不同方向同时连入——这是有意为之的，也是下一节要讲的重点。

## 真实局限：斜线会穿过标签

这是这个图表类型最大的坑，已经实测确认，不是道听途说：**斜向的边（一端用水平方向锚点、另一端用垂直方向锚点，且两个服务没有对齐）可能直接画穿相邻服务的标签**，即便锚点语法完全正确。底层的布局引擎（`cytoscape.js-fcose`，一个力导向求解器）在摆放服务时不会为斜穿的边预留避让空间。

具体会在以下情况出现：

- **一个服务被多个方向连入**。如果"Gateway"和"Worker"都连到同一个"App Server"，布局引擎没法保证两条边都避开"App Server"自己的标签。
- **用了斜向弯折**（比如一端锚 `B`、另一端锚 `T`，而两个服务最终水平方向上有偏移）。

这个问题在语法层面无解。可靠的规避方法只有：

1. **只用纯 R-L、T-B 直线边**，避免斜向弯折。
2. **避免多向汇入**：不要让两个服务从不同方向同时连到第三个服务。
3. **规模保持小**。服务越多，自动布局把东西摆在边路径上的概率就越高。像上面"商店系统"这种大致线性、6-8 个服务的规模是实际的上限。
4. **不要嵌套分组**。`group` 嵌套在另一个 `group` 里会在父分组的约束之上再加一层约束——已实测确认，这会明显增加"直线"边最终却被渲染成斜线的概率。优先用一个扁平分组，而不是嵌套子分组。

如果遇到这个问题，且确实需要超过 8 个服务或多处汇入汇出，改用带 `subgraph` 的流程图——牺牲云图标，换来真正的布局控制（`direction`、分组、节点排序），这些架构图都没有。

## 其他要知道的事

- **没有 `direction` 语句，也没有手动网格定位**。布局完全自动。不能像流程图那样通过调整声明顺序来修正糟糕的布局。
- **含特殊字符的标签要加引号**。`group sys(cloud)[E-Commerce System]`——连字符会导致解析失败（已实测确认）。改成 `group sys(cloud)["E-Commerce System"]`，或者干脆避开特殊字符。
- **同样的代码偶尔会随机渲染失败**，重新跑一次又能成功——这是力导向布局求解器本身不完全确定性导致的已知现象。如果渲染莫名其妙失败了，先重试一次，别急着怀疑自己的语法写错了。

## 快速参考

| 语法 | 作用 |
|------|------|
| `architecture-beta` | 声明架构图 |
| `group id(icon)[标题]` | 定义分组；图标：`cloud`、`database`、`disk`、`internet`、`server` |
| `group id(icon)[标题] in parentId` | 把分组嵌套进另一个分组（会增加布局出错风险，见上文） |
| `service id(icon)[标题]` | 在任何分组之外定义服务 |
| `service id(icon)[标题] in groupId` | 在分组内定义服务 |
| `a:方向 -- 方向:b` | 无箭头连线，方向必须指定（`T`/`B`/`L`/`R`） |
| `a:方向 --> 方向:b` | 带箭头连线 |
| `a:方向 -[标签]- 方向:b` | 带标签的连线 |

## 下一步

如果系统组件超过 8 个，或者需要精确的布局控制，请查看[流程图教程](flowchart.html)。

---

要试运行上面的代码，点击[打开编辑器](https://eric.run.place/MermZen/)并粘贴代码。
