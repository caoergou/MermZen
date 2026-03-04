

# 如何用 Mermaid 画甘特图

<span class="post-meta">2026-03-04 · MermZen 教程

甘特图（Gantt Chart）以横向条形展示项目任务的时间安排，直观呈现任务的开始时间、持续时长和相互依赖关系。适合项目管理、迭代排期、发布计划等场景。

## 基本结构

一个完整的甘特图声明包含三个要素：

```
gantt
    title 我的项目计划
    dateFormat YYYY-MM-DD
    section 第一阶段
    任务名称 : 2026-03-01, 5d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCCksySnFSFZx0Tn89qeblw5_PZ616sW_i0YxJYMiWxJNUtvyg3sUQhEgh0fX11XVzAMsWpySWZ-XkKz9esebKj4eWMbc_WbQVLPNm9-2nXwqcTep8v36BgpWBkYGSma2Csa2Coo2CaAgA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `title` — 图表标题（可选）
- `dateFormat` — 日期格式，**必须与任务日期格式一致**
- `section` — 任务分组标题，一个甘特图可以有多个 section
- 任务行：`任务名 : 开始日期, 持续天数`

## 日期格式

`dateFormat` 支持多种格式，推荐使用 `YYYY-MM-DD`：

| 格式 | 示例 |
|------|------|
| `YYYY-MM-DD` | `2026-03-01` |
| `DD/MM/YYYY` | `01/03/2026` |
| `MM-DD-YYYY` | `03-01-2026` |

## 任务定义详解

### 指定开始日期和持续时长

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    需求分析 : 2026-03-01, 3d
    UI 设计  : 2026-03-04, 5d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLFKcml2Tm5yk83dPwtH8iWOjlnIZnG5uedrQ9mzdBwUrByMDITNfAWNfAUEfBOAWsItRT4cW6fS_WLVRAljfRUTBNAQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

持续时长单位：`d`（天）、`w`（周）、`h`（小时）

### 任务依赖（after 关键字）

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    后端开发  : be, 2026-03-01, 7d
    前端开发  : after be, 5d
    联调测试  : after 前端开发, 3d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLFKcml2Tm5yk83dPwtH8iWOjphL7nq9dDBBQUrBSSUnUUjAyMzHQNjHUNDHUUzFMgyjp7UZQlppWkFoEVm0IUvGic8mJD87Ot3S_WT0UoQNamo2CcAgA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`after 任务名` 表示在指定任务完成后才开始，实现依赖链。给任务指定 ID（如 `be`），方便其他任务引用。

### 任务状态标记

```
gantt
    dateFormat YYYY-MM-DD
    section 进度
    已完成任务  : done,   2026-03-01, 3d
    进行中任务  : active, 2026-03-04, 5d
    普通待办    :         2026-03-09, 4d
    关键路径    : crit,   2026-03-09, 3d
    关键且进行中: crit, active, 2026-03-09, 3d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLFKcml2Tm5ym82D_76a5lYKGn2zc9XdfzrGPCk927n3YtVFCwUkjJz0vVAUoZGRiZ6RoY6xoY6igYp4BVAzW-WNjzZMdahOpEoJFlQPVw1SY6CqYQ1c9mrnvZMOvpvtanXfNAfCsFGIArttRRMIEoftq6-eWUdS-2r3-6rwWiOLkos0QHTbExsuInO6bAHQRTjuEcsCYA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 状态标记 | 视觉效果 |
|---------|---------|
| `done` | 灰色（已完成） |
| `active` | 蓝色高亮（进行中） |
| `crit` | 红色（关键路径） |
| `milestone` | 菱形里程碑节点 |
| 不标记 | 默认颜色（待开始） |

### 里程碑（milestone）

```
gantt
    dateFormat YYYY-MM-DD
    section 发布
    开发完成    : milestone, m1, 2026-03-15, 0d
    上线发布    : milestone, m2, 2026-03-20, 0d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLFKcml2Tm5yk87Z_4dEczWOjpngYQb13Ps44JIL6VQm5mTmpxSX5eqo5CrqGOgpGBkZmugbGuoamOgkEKWM-THV3Pd-2HGIKpxwihx8gApAcA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

里程碑用 `0d` 持续时间表示一个时间点，而非时间段。

### 排除工作日

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    excludes 2026-04-04, 2026-04-05
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLpFYk55SmpBYrlKemZqfmpRSjihoZGJnpGpgAkQ6CbQoA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`excludes weekends` 自动排除周六周日，也可以指定具体假期日期。

## 完整示例：产品迭代计划

```
gantt
    title MermZen 博客功能 v1.0 计划
    dateFormat YYYY-MM-DD
    excludes weekends

    section 需求与设计
    需求评审        : done,   req,    2026-03-01, 2d
    UI 原型设计     : done,   ui,     after req,  3d
    设计评审        : milestone,      after ui,   0d

    section 开发
    博客模板开发    : active, tpl,    after ui,   4d
    文章内容编写    :         art,    after ui,   6d
    Actions CI 配置 :         ci,     after tpl,  2d

    section 测试与上线
    功能测试        : crit,   test,   after ci,   3d
    性能检查        : crit,           after test, 1d
    正式上线        : milestone,      after 性能检查, 0d
```
<a href="https://caoergou.github.io/mermzen/#hZHNTsJAEMfvPMU8QGtKMRy8GYkJB44e9NbQ1TSWou2CHhsVNBAgmkiiURGJ0cRY4sEEDcjLsG15C5ediggH57Kbmfn952tHsyiNATdqUJNAhti5LWIBq10z74FVWuHxAIrxJQVCr83OLkSqrlGynrdzGoVNbnImI6dSIkIOs2ZBJw4cELJLLN2JCbdDstTIWzC-cf23o1GvHnpfXE_E0Bd2T5jXhshWQM9bROI_m-xPHlAVNSkrCVmJS6DqAtxIA6u32F0VxebAgiE40LYpsSOZBIKYP18xZ5jEoRE9BVFG0f_Owfoua5wLFy7Kf277t0N0o5zGM4tci-6Z0rzcMvbhN0-Dl3tWLjHvI-g3WfkK0R_TbLqAJhFdFX04sJaGcakWDLwZLPtncqyvzg3gv1fD7iU_xKhXCT6HOIk4NkZ-15K1DdEF5cuRpqpYI9qn7z5NwI7rtx4Xwek02I6QiUfga4f1G9jCf4eYLSLxg3wD" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `gantt` | 声明甘特图 |
| `title 标题` | 图表标题 |
| `dateFormat YYYY-MM-DD` | 日期格式 |
| `excludes weekends` | 排除周末 |
| `section 名称` | 任务分组 |
| `任务名 : 日期, Nd` | 指定开始日期 |
| `任务名 : after 任务ID, Nd` | 依赖前置任务 |
| `任务名 : id, 日期, Nd` | 带 ID 的任务 |
| `:done` | 已完成（灰色） |
| `:active` | 进行中（蓝色） |
| `:crit` | 关键路径（红色） |
| `:milestone` | 里程碑节点 |

## 下一步

了解甘特图后，继续学习 [Mermaid 类图](class.html)，用于描述面向对象的系统结构。





# Mermaid Gantt Chart Tutorial

<span class="post-meta">2026-03-04 · MermZen Tutorials

A Gantt chart visualizes project tasks as horizontal bars showing their start time, duration, and dependencies. It's ideal for project management, sprint planning, and release scheduling.

## Basic Structure

A complete Gantt chart needs three elements:

```
gantt
    title My Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task name : 2026-03-01, 5d
```
<a href="https://caoergou.github.io/mermzen/#HYo7DoAgEAV7T_EOIAlitLA2diQUNpYb3fiHBLbx9hKmnJmdvEiFjJzyMOwHF8PFq8A95EvZSHgK8SXBklHWqnEsJeXvDB7uoMRoipsp3fD0MgYYbXqlW6WbGt32Aw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `title` — Chart title (optional)
- `dateFormat` — Date format; **must match the dates used in tasks**
- `section` — Group heading; a chart can have multiple sections
- Task line: `task name : start date, duration`

## Date Formats

`dateFormat` supports multiple formats; `YYYY-MM-DD` is recommended:

| Format | Example |
|--------|---------|
| `YYYY-MM-DD` | `2026-03-01` |
| `DD/MM/YYYY` | `01/03/2026` |
| `MM-DD-YYYY` | `03-01-2026` |

## Task Definition

### Fixed start date and duration

```
gantt
    dateFormat YYYY-MM-DD
    section Development
    Requirements : 2026-03-01, 3d
    UI Design    : 2026-03-04, 5d
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLFKcml2Tm5ym4pJal5uQX5KbmQXQEpRaWZhalgvjFClYKRgZGZroGxroGhjoKxilgFaGeQE3Fmel5IA6SChMdBdMUAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

Duration units: `d` (days), `w` (weeks), `h` (hours)

### Task dependencies (after keyword)

```
gantt
    dateFormat YYYY-MM-DD
    section Development
    Backend  : be, 2026-03-01, 7d
    Frontend : after be, 5d
    QA       : after Frontend, 3d
```
<a href="https://caoergou.github.io/mermzen/#NYvBDoIwEAXvfsX7gDYpECXhhmm4ceDocaWLMcrW1I3fD7ZhrjPzIFE9YSeQ8hDTSorbjh1H6302X571GQWef_yOn5WlHFeaXywB6HBng9rVF-sa6yqDNuRiSFH0n3SgRTnl7lzc1KNwuCM2aMIG" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`after taskId` starts a task immediately after another finishes. Assign an ID (e.g., `be`) so other tasks can reference it.

### Task state markers

```
gantt
    dateFormat YYYY-MM-DD
    section Status
    Completed   : done,          2026-03-01, 3d
    In progress : active,        2026-03-04, 5d
    Pending     :                2026-03-09, 4d
    Critical    : crit,          2026-03-09, 3d
    Crit+active : crit, active,  2026-03-09, 3d
```
<a href="https://caoergou.github.io/mermzen/#bc7BCsMgDAbg-54i9yl0tRus15bCDoXBTjuKBhFaLZrt-ScKlo39J2O-hBjpiA6QoiXh5MMqCZ4pfJ75OOZOREXWO3iQpFfMX4NftwUJdXr3oL1DBjVt0154I3hzYiB09jcHW_AmYIzJy7TvvU9U3zE4F39Hp60zud3DT6q_MuiKH4Ilq-RSvEoV--_F7o_ljOrrVd_-Aw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Marker | Visual style |
|--------|-------------|
| `done` | Gray (completed) |
| `active` | Blue highlight (in progress) |
| `crit` | Red (critical path) |
| `milestone` | Diamond milestone node |
| (none) | Default color (pending) |

### Milestones

```
gantt
    dateFormat YYYY-MM-DD
    section Release
    Dev Complete : milestone, m1, 2026-03-15, 0d
    Go Live      : milestone, m2, 2026-03-20, 0d
```
<a href="https://caoergou.github.io/mermzen/#VcuxCsIwFIXh3ac4D5BAGqmDq0GXdnHrGOxBAkmumEuf35pF_Mdz-J6xqh6wt0blVd4lKpY9O882hP40PjRJxZ2ZsbFvgRsuUl6ZSpxRUmZTqTQog4F3_mTd0Q6jgVs7uAmmtBG9f-B_wLsv-AA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

Use `0d` duration to mark a point in time rather than a span.

### Excluding days

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    excludes 2026-04-04, 2026-04-05
```
<a href="https://caoergou.github.io/mermzen/#S0_MKynhUgCClMSSVLf8otzEEoVIIND19dV1cQHLpFYk55SmpBYrlKemZqfmpRSjihoZGJnpGpgAkQ6CbQoA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`excludes weekends` skips Saturdays and Sundays automatically. You can also list specific holidays.

## Full Example: Product Iteration Plan

```
gantt
    title MermZen Blog Feature v1.0
    dateFormat YYYY-MM-DD
    excludes weekends

    section Design
    Requirements review : done,   req,   2026-03-01, 2d
    UI prototyping      : done,   ui,    after req,  3d
    Design sign-off     : milestone,     after ui,   0d

    section Development
    Blog template dev   : active, tpl,   after ui,   4d
    Article writing     :         art,   after ui,   6d
    Actions CI setup    :         ci,    after tpl,  2d

    section Testing & Launch
    QA testing          : crit,   test,  after ci,   3d
    Performance check   : crit,          after test, 1d
    Production launch   : milestone,     after 性能检查, 0d
```
<a href="https://caoergou.github.io/mermzen/#dZKxTsMwEIZ3nuImpgSlKerQrVBVqkQlQDDAZtmX1Kpjp_Ylha0SD8KAEE_B61Q8Bo6TAI3EDY505--__87JmSY6AR8kSSGs0BaPqOFCmRwWyKiyCPXoLAl3BCNcGFswggcf8WoVz-ehgk9cVQId7BA3qIU7CWmHnKTRMEcncx1St7itpMUCNTmwWEvcwRSE0Rj5qsVt80mTdBIn4zgZRZCKwN0vobSGDD2XUucQ4perZHMCywhtJzJuubY1NEdssqzjCqnQUQf3XCuSiKH3GpUpG8MhH1ZDWJTKbwME1kGQ-cu1V6NSRQPB89bIzJLkfsU7K6mfYAp9MEtDbtJxwYaDy6W3RFV5zPG_g7fN08EAd37SpuEpXLFK83Uo3sz8DO7HSOeGe2-NXlOKetW2RbfOa7RZ8wdojsDXyDdHXD9M6yaIjDrOGlG1flRw8f8zHPYfXy-fh7f94fU98s_xDQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Description |
|--------|-------------|
| `gantt` | Declare Gantt chart |
| `title text` | Chart title |
| `dateFormat YYYY-MM-DD` | Date format |
| `excludes weekends` | Skip weekends |
| `section name` | Task group |
| `task : date, Nd` | Fixed start date |
| `task : after id, Nd` | Depends on task |
| `task : id, date, Nd` | Task with ID |
| `:done` | Completed (gray) |
| `:active` | In progress (blue) |
| `:crit` | Critical path (red) |
| `:milestone` | Milestone node |

## Next Up

After Gantt charts, learn [Mermaid Class Diagrams](class.html) to describe object-oriented system structures.



---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://caoergou.github.io/mermzen/)，然后将代码粘贴进去。
