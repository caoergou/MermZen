---
title: 如何用 Mermaid 画饼图
description: 三行代码生成 Mermaid 饼图，快速可视化数据占比，含语法说明与实用示例。
date: 2026-03-04
slug: pie
---

## 什么是饼图？

饼图（Pie Chart）直观展示各部分在整体中所占的比例，适合展示预算分配、用户来源分布、时间占比等数据。Mermaid 的饼图是所有图表类型中语法最简单的。

## 为什么用饼图？

- **直观展示占比关系** — 一眼看出各部分在整体中的分量
- **"部分与整体"一目了然** — 无需计算，直接感知比例大小
- **适合快速汇报** — 非技术人员也能轻松理解

## 数据适用性

- **最佳扇区数量：3-7 个** — 太少显得空洞，太多难以区分
- **超过 7 个建议合并为"其他"** — 保持图表清晰可读
- **数据差异明显时效果最好** — 扇区大小对比鲜明，易于识别

## 最佳实践

- **从大到小排列** — 最大的扇区放在起始位置（通常是右上角）
- **最重要的放起始位置** — 读者视线首先落在此处
- **使用对比色区分扇区** — Mermaid 自动配色，相邻扇区颜色区分明显

## 什么时候不该用饼图？

- **超过 7 个类别时** — 考虑用柱状图或条形图
- **数据差异不明显** — 如 30% vs 35%，肉眼难以区分
- **需要精确比较时** — 柱状图更适合精确数值对比
- **有负数或零值时** — 饼图无法表示负值，零值扇区无意义

## 基本语法

```
pie title 标题
    "类别A" : 40
    "类别B" : 35
    "类别C" : 25
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqyExVKMksyUlVeLag_eWiGTF5CgoKCjFKzzfuftqx2jFGScFKwcQAVdQJLGpsiirqDBY1MlWqBQCaTyK6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `pie` — 声明饼图
- `title 标题` — 可选，图表标题
- `"名称" : 数值` — 每个扇区的名称和数值
- 数值无需加百分号，Mermaid 自动计算各类别占比

## 完整示例：开发时间分配

```
pie title 本月开发时间分配
    "需求分析" : 15
    "前端开发" : 35
    "后端开发" : 25
    "测试调试" : 15
    "文档撰写" : 10
```
<a href="https://eric.run.place/MermZen/#eJwryExVKMksyUlVeDZnzbM5HU_3NDztn_hs-raX07c87Wh72drLpQAESi_nNDzb2AQUeTZvgpKClYKhKUT8aWfv89XrIbpA4sYw8Ql9KOJGUPFnW7tfrJ_6YkMzkEQ259m09mcLFz-btOFp20ywuAEAk11Gmw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://eric.run.place/MermZen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 再来一个示例：网站流量来源

```
pie title 网站月度流量来源
    "搜索引擎" : 42
    "直接访问" : 28
    "社交媒体" : 18
    "外链引用" : 12
```
<a href="https://eric.run.place/MermZen/#eJwryExVKMksyUlVeL534vPVM5_N6Xi6a9mzrY0v2_ufzV36bNcELgUgUHo2Yc7zLYue7pn6bHKfkoKVgokRRPz57C3P-pa-WLf_5fR1IHEjC6j4kn1Pdi15umrSk72TQeKGUPGnS6a9nLwPaM7zKSvA4kYA5aM-bw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://eric.run.place/MermZen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `pie` | 声明饼图 |
| `pie title 标题` | 带标题的饼图 |
| `"名称" : 数值` | 一个扇区（数值为相对比例） |

## 下一步

你已经掌握了 Mermaid 最常用的五种图表！回到 [教程首页](index.html) 回顾所有内容，或直接打开 [MermZen 编辑器](../index.html) 开始绘图。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
