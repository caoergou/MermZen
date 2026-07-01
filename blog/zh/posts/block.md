---
title: 如何用 Mermaid 画块图
description: 深入讲解 Mermaid 块图的网格布局语法（columns/space）、嵌套复合块，以及实测验证过的边穿越标签的真实局限。
date: 2026-03-05
slug: block
---

# 如何用 Mermaid 画块图

<span class="post-meta">2026-03-05 · MermZen 教程

块图给你的是对网格布局的直接、手动控制——当你需要精确定位、而流程图的自动布局给不了的时候有用。Mermaid 用 `block-beta` 声明块图，核心是 `columns` 网格、用 `space` 留空隙，以及嵌套的 `block:groupId:N ... end` 复合结构。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhHAdo2OUnnVMfD6r5dm0nU_nTo9RilWqBQCXhBdx" width="100%" height="300" frameborder="0"></iframe>

## 为什么用块图？

- **手动定位** — 把方块精确摆在网格里，不依赖自动布局引擎的自主选择
- **嵌套结构** — 用复合容器把相关方块视觉上分组
- **简单静态布局** — 适合网格状结构（机架布局、模块排布）这类形状固定、不是由流程驱动的场景

### 适用场景

✅ **适合**：
- 小规模（≤10-15 个方块）、大致扁平的网格布局，且需要精确定位
- 只在**相邻**方块之间连线的简单网络/模块图

❌ **不适合**：
- 连线较多，尤其是"跳过"网格中某个方块的连线——block-beta 没有锚点概念，一条边只是两个方块中心之间的直线，中间挡着什么它都会直接穿过去（见下文）
- 深层嵌套叠加列跨度——这个组合正是 `block-beta` 最不稳定的地方（见"局限"一节）
- 跑在 React/SPA 类工具里——`block-beta` 有个已记录的崩溃问题（`Converting circular structure to JSON`），Vercel 自己在生产环境踩过这个坑，最后是把 `block-beta` 换成流程图解决的，而不是绕过它

## 与其他图表对比

| 图表类型 | 核心用途 | 与块图的区别 |
|---------|---------|-------------|
| **块图** | 手动网格定位 | 你能精确控制位置，代价是连线路由和稳定性远弱于流程图 |
| **架构图** | 带图标的小规模云/系统拓扑 | 有图标、强制锚点，但依然没有手动定位 |
| **流程图** | 流程与决策，通用结构展示 | 自动布局，但足够成熟；任何非简单场景的安全默认选择 |

## 声明图表

```
block-beta
    columns 1
    A["我的方块"]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhHAdo2OUnnVMfD6r5dm0nU_nTo9RilWqBQCXhBdx" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`columns N` 设置固定列数，之后声明的方块会自动换行排列。注意：`title` 在这里**不是**有效语句——和架构图一样，写了会被静默接受但没有任何视觉效果，别浪费时间加它。

## 基本方块与连接

```
block-beta
    columns 3
    A["方块 A"] B["方块 B"] C["方块 C"]

    A --> B
    B --> C
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhnAdo2OUnk3b-XTudAXHGKVYBScE3wnEd0bwnWOUYmPyoNoUdHXtFJwgHCcwx1mpFgCTtid0" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**只连接相邻的方块。** 这个例子连的是 A→B 和 B→C，每条边只跨一个方块。如果换成 `A --> C`（跳过 B），这条边会画成从 A 中心到 C 中心的直线——正好穿过 B 的文字。block-beta 不像架构图那样有锚点概念；一条边就是两个方块中心之间的直线，完全不知道中间有什么。

**如果打算给两个并排的方块连线到别处，中间一定要留 `space`**——Mermaid 官方文档明确把这个列为常见错误，会直接破坏布局。

## 嵌套（复合）方块

```
block-beta
    columns 3
    前端 space 后端
    space:3
    block:db_cluster:3
        columns 3
        DB1[("主数据库")] DB2[("副本")] Cache[("缓存")]
    end

    前端 --> 后端
    后端 --> DB1
    后端 --> Cache
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwhnCfdvY-X71eobggMTlV4emEvuer10MkwCJWUFVgQ6xSkuKTc0qLS1KLYOJYDAQBFyfDaI0YpSc7dj-buuFZ77qnuybHKGnGKrg4GYHEn3aufzZnDVjEOTE5IxUk9nzP5KdrZ4DEIMak5qXE5KE4UVfXDsWBEDZY2MXJEEMMbLJSLQAsfmMc" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`block:groupId:N ... end` 创建一个横跨 `N` 列的命名容器，内部可以再声明自己的 `columns`。复合方块默认带浅色背景，看起来是一个独立分组。

## 完整示例：网络拓扑

```
block-beta
    columns 2

    block:hq:2
        columns 2
        Router1["核心路由器"]:2
        Switch1["交换机 A"] Switch2["交换机 B"]
        PC1["办公终端"] Server1[("文件服务器")]
    end

    space:2

    block:branch:2
        columns 2
        Router2["分部路由器"]:2
        AP1["Wi-Fi 接入点"] PC3["办公终端"]
    end

    hq --> branch
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPztZNSi1JjMlTUFBQSM7PKc3NK1YwismDCIAVWGUUWhlB-GiKYEJB-aUlqUWG0TFKzxbseLq_-cX29c-nbHw6c0WMUiyy1uDyzJLkDJC6J7uWPOtd9GzOLgXHGKVYqIQRioRTjFIsQmuAM0jb0655T1vXPN_d8Xz1erC-1KIykMUaMUrPprU_2b3t2Zzep10LwTZrQnWn5qXAvFNckJicaoXmu6SixLzkDKJ8CHLg0462l80rcPnQMQDkzPBMXbdMhWd9S5-2Ln3etBPk0gBnY0z3Yzgwo1BBV9dOAeIkpVoA0q6hvA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**关键技巧：跨分组连线要连分组 ID，不要连内部节点。** `hq --> branch` 画出的是一条从一个复合块边界到另一个复合块边界的干净直线，不会穿过任一分组内部的任何东西。如果换成连接某个分组内部的具体节点到另一个分组内部的具体节点（比如 `Router1 --> Router2`），这条边会直接穿过整个布局，更容易穿过内部方块的文字——已实测确认。

## 局限（已实测验证 + GitHub issue 佐证）

把 `block-beta` 当作 Mermaid 工具箱里最不稳定的图表类型：

- **没有锚点**。不像架构图，边连接的是方块的**中心**而不是边缘——任何跨越了非严格相邻方块的连线都有穿越风险。
- **嵌套分组 + 列跨度组合很脆弱**。列跨度在嵌套时的上下文传递并不总是正确；有些形状（圆边）能正确跨列，有些不能。
- **确实存在一个生产环境崩溃**：`Converting circular structure to JSON`，在 React/Next.js 环境下触发——Vercel 自己的 examples 仓库踩过这个坑，最后是把 `block-beta` 图换成流程图解决的，而不是绕过它。
- **没有 `title` 语句**（和架构图一样，写了会被静默忽略）。

**建议**：只在小规模、大致扁平的网格布局里用 `block-beta`，且精确定位确实比稳定性更重要的场景。其他情况——连线更多、嵌套更深，或者需要在不同渲染器间保持稳健——改用带 `subgraph` 的流程图（见[流程图教程](flowchart.html)）。

## 快速参考

| 语法 | 作用 |
|------|------|
| `block-beta` | 声明块图 |
| `columns N` | 设置当前网格的固定列数 |
| `id["标签"]` | 定义一个方块 |
| `id[("标签")]` | 定义圆柱形方块（如数据库） |
| `id:N` | 让方块横跨 N 列 |
| `space` / `space:N` | 留 1 列或 N 列的空隙 |
| `block:groupId:N ... end` | 横跨 N 列的嵌套复合方块 |
| `A --> B` | 连接两个**相邻**方块（避免跳过方块） |

## 下一步

如果需求超出了小规模扁平网格的范畴，请查看[流程图教程](flowchart.html)——它用流程图成熟可靠的自动布局取代了 block-beta 的手动定位。

---

要试运行上面的代码，点击[打开编辑器](https://eric.run.place/MermZen/)并粘贴代码。
