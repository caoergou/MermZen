---
title: 如何用 Mermaid 画饼图
description: 三行代码生成 Mermaid 饼图，快速可视化数据占比，含语法说明与实用示例。
date: 2026-03-04
slug: pie
---

## 什么是饼图？

饼图（Pie Chart）直观展示各部分在整体中所占的比例，适合展示预算分配、用户来源分布、时间占比等数据。Mermaid 的饼图是所有图表类型中语法最简单的。

## 基本语法

```
pie title 标题
    "类别A" : 数值
    "类别B" : 数值
    "类别C" : 数值
```
<a href="https://caoergou.github.io/mermzen/#K8hMVSjJLMlJVXi2oP3lohlcCkCg9Hzj7qcdqx2VFKwUnk3d8LRhD7KwE3ZhZ4QwAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://caoergou.github.io/mermzen/#K8hMVSjJLMlJVXg2Z82zOR1P9zQ87Z_4bPq2l9O3PO1oe9nay6UABEov5zQ829gEFHk2b4KSgpWCoSlE_Gln7_PV6yG6QOLGMPEJfSjiRlDxZ1u7X6yf-mJDM5BENufZtPZnCxc_m7ThadtMsLgBAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://caoergou.github.io/mermzen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 再来一个示例：网站流量来源

```
pie title 网站月度流量来源
    "搜索引擎" : 42
    "直接访问" : 28
    "社交媒体" : 18
    "外链引用" : 12
```
<a href="https://caoergou.github.io/mermzen/#K8hMVSjJLMlJVXi-d-Lz1TOfzel4umvZs62NL9v7n81d-mzXBC4FIFB6NmHO8y2Lnu6Z-mxyn5KClYKJEUT8-ewtz_qWvli3_-X0dSBxIwuo-JJ9T3Ytebpq0pO9k0HihlDxp0umvZy8D2jO8ykrwOJGAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://caoergou.github.io/mermzen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `pie` | 声明饼图 |
| `pie title 标题` | 带标题的饼图 |
| `"名称" : 数值` | 一个扇区（数值为相对比例） |

## 下一步

你已经掌握了 Mermaid 最常用的五种图表！回到 [教程首页](index.html) 回顾所有内容，或直接打开 [MermZen 编辑器](../index.html) 开始绘图。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://caoergou.github.io/mermzen/)，然后将代码粘贴进去。
