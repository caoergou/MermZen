---
title: 如何用 Mermaid 画甘特图
description: 掌握甘特图的任务声明、日期格式、依赖关系、关键路径标记，以产品迭代计划为例演示项目管理场景。
date: 2026-03-04
slug: gantt
---

# 如何用 Mermaid 画甘特图

<span class="post-meta">2026-03-04 · MermZen 教程

甘特图（Gantt Chart）以横向条形展示项目任务的时间安排，直观呈现任务的开始时间、持续时长和相互依赖关系。适合项目管理、迭代排期、发布计划等场景。

## 为什么用甘特图？

### 解决的问题

甘特图帮助解决项目管理中的核心痛点：

- **时间可视化** — 一眼看出整个项目的时间跨度、各任务的持续时间
- **依赖关系清晰** — 明确哪些任务必须在其他任务完成后才能开始
- **进度追踪** — 通过状态标记快速了解当前进展
- **资源协调** — 识别任务重叠期，合理安排人力
- **里程碑管理** — 标记关键节点，确保项目按期交付

### 时间轴图 vs 甘特图

| 特性 | 时间轴图 (Timeline) | 甘特图 (Gantt) |
|------|-------------------|----------------|
| 侧重点 | 事件发生的时间点 | 任务的持续时间 |
| 展示形式 | 垂直列表 + 时间点 | 横向条形图 |
| 依赖关系 | 不支持 | 支持 `after` 依赖 |
| 适用场景 | 历史回顾、里程碑展示 | 项目规划、进度管理 |
| 任务状态 | 无 | `done`/`active`/`crit` |

**简单判断**：如果需要管理"任务何时做、做多久、谁依赖谁"，用甘特图；如果只是展示"发生了什么"，用时间轴。

### 适用与不适用的场景

**适合使用甘特图**：
- 软件开发迭代规划
- 产品发布计划
- 营销活动排期
- 建筑工程进度管理
- 多人协作项目的任务分配

**不适合使用甘特图**：
- 只需要展示事件序列（用流程图或时间轴）
- 任务数量极少（少于3个）且没有依赖
- 需要展示复杂决策分支（用流程图）
- 系统架构设计（用类图或架构图）

## 与其他图表对比

| 图表类型 | 核心用途 | 与甘特图的区别 |
|---------|---------|---------------|
| **甘特图** | 项目进度管理 | 强调时间跨度、任务依赖、持续时长 |
| **时间轴** | 事件序列展示 | 强调时间点，无依赖关系，适合历史回顾 |
| **流程图** | 流程逻辑与决策 | 强调步骤顺序和分支判断，无时间概念 |

### 何时选择哪种图表

```
需要管理项目进度、资源、依赖？
    ├── 是 → 甘特图
    └── 否 → 只需要展示事件？
              ├── 是 → 有时间跨度概念？
              │         ├── 是 → 甘特图
              │         └── 否 → 时间轴
              └── 否 → 有流程/决策逻辑？
                        ├── 是 → 流程图
                        └── 否 → 其他图表
```

**示例对比**：

- **甘特图**："后端API开发"需要7天，完成后"前端开发"才能开始（5天）→ 用甘特图清晰展示依赖和时长
- **时间轴**："2026年3月发布v1.0，6月发布v2.0"→ 用时间轴展示发布节点
- **流程图**："用户登录 → 验证密码 → 成功/失败分支"→ 用流程图展示逻辑

## 基本结构

一个完整的甘特图声明包含三个要素：

```
gantt
    title 我的项目计划
    dateFormat YYYY-MM-DD
    section 第一阶段
    任务名称 : 2026-03-01, 5d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUCjJLMlJVXjWMfH5rJaXC3c-n73uxbqFTzsmQWRTEktS3fKLchNLFCIjIyN1fX11XVwgUsWpySWZ-XkKz9esebKj4eWMbc_WbYXIPNm9-2nXwqcTep8v36BgpWBkYGSma2Csa2Coo2CaolQLACOyOI0" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk83dPwtH8iROzlnIZnG5uedrQ9mzdBwUrByMDITNfAWNfAUEfBOAWiJNRT4cW6fS_WLVRAVmCio2CaolQLAP3CLRU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

持续时长单位：`d`（天）、`w`（周）、`h`（小时）

### 任务依赖（after 关键字）

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    后端开发  : be, 2026-03-01, 7d
    前端开发  : fe, after be, 5d
    联调测试  : after fe, 3d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk83dPwtH8iROzphL7nq9dDRBQUrBSSUnUUjAyMzHQNjHUNDHUUzFOg6jp7UdSlpeooJKaVpBaBdZhCVb1onPJiQ_Ozrd0v1k8FqYKoAKk1TlGqBQAo2EH9" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5ym82D_76a5lELGn2zc9XdfzrGPCk927n3YtVFCwUkjJz0vVUVBQMDIwMtM1MNY1MNRRME6BKH-xf_aLhT1PdqxFKE9MLsksS9VBKDfRUTCFKn82c93LhllP97U-7ZoH4lspwABctaWOgglU9dPWzS-nrHuxff3TfS0Q1clFmSU6aKqNUVQ_2TEF7iaYegwXgXUp1QIAKxFvpQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 状态标记 | 视觉效果 |
|---------|---------|
| `done` | 灰色（已完成） |
| `active` | 蓝色高亮（进行中） |
| `crit` | 红色（关键路径） |
| `milestone` | 菱形里程碑节点 |
| 不标记 | 默认颜色（待开始） |

## 关键路径是什么？

**关键路径**（Critical Path）是项目中从开始到结束的最长任务链。关键路径上的任何任务延期，都会直接导致整个项目延期。

```
gantt
    dateFormat YYYY-MM-DD
    section 关键路径示例
    需求分析    : crit, req, 2026-03-01, 3d
    后端开发    : crit, be, after req, 5d
    前端开发    : fe, after req, 4d
    联调测试    : crit, test, after be, 2d
    上线部署    : crit, after test, 1d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk8bd38csq6F9vXP93X8nzJrif7uiHyL-c0PNvY9LSj7dm8CSC-lUJyUWaJjkJRaqGOgpGBkZmugbGugaGOgnEKRMPTCX3PV69_uqfhaf9EZA1JqToKiWklqUUQraYw5Z29aMrTUBWaQBW-aJzyYkPzs63dL9ZPRTa3JLW4BKYBZIcRVP2THV3Pd-1_2bzi-d5NyOohKiG6DFOUagECC3Zk" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

上例中，**需求分析 → 后端开发 → 联调测试 → 上线部署** 构成关键路径（共 11 天），而前端开发可以与后端开发并行，不影响总工期。

**建议**：用 `crit` 标记关键路径上的任务，让团队一眼识别哪些任务不能延期。

### 里程碑（milestone）

```
gantt
    dateFormat YYYY-MM-DD
    section 发布
    开发完成    : milestone, m1, 2026-03-15, 0d
    上线发布    : milestone, m2, 2026-03-20, 0d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk87Z_4dEczROzpngYQd13Ps44JIL6VQm5mTmpxSX5eqo5CrqGOgpGBkZmugbGuoamOgkEKRNOTHV3Pd-2HGIOpyQihycgApEmpFgBDcTs8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

里程碑用 `0d` 持续时间表示一个时间点，而非时间段。

### 排除工作日

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    excludes 2026-04-04, 2026-04-05
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIpVYk55SmpBYrlKemZqfmpRSjCRsZGJnpGpjoGpjoINimSrUAvVge6A" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
    性能检查        : crit,   perf,   after test, 1d
    正式上线        : milestone,      after perf, 0d
```
<a href="https://eric.run.place/MermZen/#eJyFkUFLAlEQx7_KsOc11jU8eIsk8OCxg-Fl2R1jSVfbfVoQgVRaKCoFCUVlJlEQrXQILDS_jG9dv0W4s2bpobkMzLzff_4z70AoCBFZFFQhImwrBmNJAwCA6SyNEEczs4UG8No1tx94peUeD6AQXJHAtdv87ILeagrDjayZURgkEolEIB4PRKPUwn01ndfQgj3EHTQ0K2lQw0KV6VkDJjdF5-1o1Ku79pdrt6lJRbd7wu02-BEBLWugCAAm7k4TyJIcDkihgBQUQdaI3IwBr7f4XZXkFsi87oGgpBiavk7IJwlYnJnR02gxH_8hSUfSFpfh_SJvnFONTuY8t53bIdVJUVGZXkARWC4tLiqu-l6c5un45Z6XS9z-GPebvHxF7CwUky2xYZ9d86xYsB6DSak2Hti_OPXP_uRAXtrCea-63ctRrz7qVcafQ38d7--pNT-PauqeE4aWl0mYxswO6xSfpmSn6LQel8kcmqk5STrBGfna4f0GufjvS0hH0oTDbyvrCj8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 最佳实践

### 任务和分组数量建议

- **Section（分组）**：建议 3-5 个，过多会显得杂乱
- **每个 Section 的任务数**：建议 3-7 个，便于阅读和追踪
- **总任务数**：控制在 20 个以内，复杂的项目可以拆分为多个甘特图

### 任务依赖最佳实践

```
gantt
    title 迭代开发最佳实践示例
    dateFormat YYYY-MM-DD
    excludes weekends
    
    section 规划
    需求梳理     : done, plan, 2026-04-01, 2d
    任务拆分     : done, split, after plan, 1d
    
    section 开发
    核心功能     : crit, active, core, after split, 5d
    次要功能     : active, minor, after split, 7d
    代码审查     : review, after core minor, 2d
    
    section 交付
    集成测试     : crit, test, after review, 3d
    发布准备     : prep, after test, 1d
    v1.0发布     : milestone, release, after prep, 0d
```
<a href="https://eric.run.place/MermZen/#eJxtkF9LwlAYxr_KYddbzPUPvJbu_ACDbsb2FqO5je00gwg0Y4peqEEQJKlpdVNGiCSa-WV2jutbhJ4zwfDmwHnP83ve8zyXQiCkFVHQhbRwqtkYH9sIIYRNbAGK5-_RtEe-C6TepK1CNBuSwWP8NVr0J9FPjSkNDcOR4-U0jFRVVaVsVspk2BNc6Na5AT7KA5yBbfhszE4fdGw6Nopfb0jlls1-WwX6eU2fhotGuLyjNDIcG0TkWpotIkVWDiR5T5JTIlIMhkTTKal2aS0klU3Edy0Ti0g7weBxPmVs-wCLx2a0MybzEqm249KMu-neykbHZgAi0h0PElO-YZ-70rdu_FLcYBMqZ9qO9w87XAfoLTpFMujS9jPHPAhMyCf65crEQdmaIJr0o-k9r_AhpJUGHdXij7uNBBj8dR3Jgl1uR-pNMi6Rckj6ZQ65HriJnKFJe0FqR2YAl-ZMC3y8Kt0DCzR_3RAzkQ3h6g94Uew-" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**依赖设计原则**：
1. **避免循环依赖** — A 依赖 B，B 又依赖 A，会导致无法排期
2. **控制依赖深度** — 依赖链过长（A→B→C→D→E）会增加项目风险，适当并行化
3. **关键路径清晰** — 用 `crit` 标记决定总工期的任务链
4. **里程碑作为检查点** — 在重要阶段结束时设置里程碑

### 里程碑使用指南

- **设置时机**：阶段完成、重要交付、外部依赖节点
- **数量控制**：一个甘特图建议 2-4 个里程碑，过多会稀释重要性
- **命名规范**：使用动词+名词，如"设计评审完成"、"v1.0上线"

### 颜色/状态标记建议

| 标记 | 使用场景 | 视觉提示 |
|------|---------|---------|
| `done` | 已完成的任务 | 灰色，表示不再需要关注 |
| `active` | 正在进行的任务 | 蓝色，当前工作重点 |
| `crit` | 关键路径任务 | 红色，延期会影响总工期 |
| `crit, active` | 关键且进行中 | 红色高亮，最高优先级 |
| 无标记 | 待开始的任务 | 默认颜色，按计划执行 |

**颜色使用建议**：
- 不要把所有任务都标记为 `crit`，否则失去重点
- `active` 只标记当前正在做的，完成后改为 `done`
- 定期更新状态，保持图表反映真实进度

### 使用 `excludes weekends` 排除非工作日

让甘特图更贴近实际工作安排：

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    section 迭代
    Sprint 1 : 2026-03-02, 10d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJUwCClMSSVLf8otzEEoVIIND19dV1cYFIpVYk55SmpBYrlKemZqfmpRRDhItTk0sy8_MUXuxf-2T3YohYcEFRZl6JgqGClYKRgZGZroGxroGRjoKhQYpSLQA_biaA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 常见误区

### 误区一：将甘特图与时间轴混淆

**错误理解**：甘特图就是横着的时间轴。

**正解**：时间轴展示"事件在什么时候发生"，甘特图展示"任务持续多久、谁依赖谁"。

**何时用哪个**：
- 展示"公司发展里程碑" → 时间轴
- 规划"下个迭代的开发任务" → 甘特图

### 误区二：任务过度拆分

**❌ 不推荐**：将简单的登录功能拆成 8 个超细粒度任务

```
gantt
    title ❌ 任务过度拆分示例（不推荐）
    dateFormat YYYY-MM-DD
    
    section 开发
    登录页面-写HTML     : a1, 2026-03-01, 2h
    登录页面-写CSS      : a2, after a1, 2h
    登录页面-写JS       : a3, after a2, 2h
    登录页面-调试       : a4, after a3, 1h
    注册页面-写HTML     : b1, after a4, 2h
    注册页面-写CSS      : b2, after b1, 2h
    注册页面-写JS       : b3, after b2, 2h
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUCjJLMlJVXg0t0fhye7dT7sWvtjf_nTXsmfdbU872p4v2fVkX_f7PR1PdvQ-61vxonfC-z2dEG0piSWpbvlFuYklCpGRkZG6vr66Li4QKQhZnJpckpmfp_B0T8PT_okQseczdz_dO_Xlwq0v5y7Sfdo20yPE1wckrmClkGioo2BkYGSma2CsawBiZ2DX4hwcrADTYqSjkJhWkloE0YxDgxdUPUiDMVyDEQ4NLzY0v1g_FaHDBK7DWEfBEKrj2eYVT9t6sHojyRCuwQRhBboGJE8kwT2RZIhbA5InkuCeSAJ7QqkWAFOpvWw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**✅ 推荐**：合理合并，关注可交付成果

```
gantt
    title ✅ 合理任务粒度示例（推荐）
    dateFormat YYYY-MM-DD
    
    section 开发
    登录功能开发   : done, login, 2026-03-01, 1d
    注册功能开发   : done, reg, after login, 1d
    用户中心开发   : active, uc, after reg, 2d
    整体联调       : after uc, 1d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUCjJLMlJVXg0p1Xh6YSO5xPanuze_bRr4fNNk57uWvZ8ya4n-7rf7-l41rfiRe-E93s6IXpSEktS3fKLchNLFCIjIyN1fX11XVwgUhCyODW5JDM_T-Hpnoan_RMhYs9n7n66d-rTrvkvmvdCxBUUFKwUUvLzUnUUcvLTM_N0FIwMjMx0DYx1DQx1FAxTIPqebV7xtK0Hh76i1HQdhcS0ktQimBEwbc-nrHjWsf3JjrVP9zcjaUtMLsksS9VRKE2G6QMbYQSzbOqWJ3snv2ic8mJDswIEWEHVgXQYpijVAgBAWYpn" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**任务粒度原则**：
- 一个任务应该是可交付的、有意义的成果
- 粒度控制在"半天到三天"为宜
- 任务过多会导致图表臃肿，失去"一目了然"的价值

### 误区三：忽略任务依赖关系

**❌ 不推荐**：所有任务都独立声明，看不出逻辑关系

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    需求分析  : 2026-03-01, 3d
    UI设计    : 2026-03-04, 5d
    前端开发  : 2026-03-09, 7d
    后端开发  : 2026-03-09, 7d
```

**✅ 推荐**：明确依赖，让排期逻辑清晰可见

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    需求分析  : req, 2026-03-01, 3d
    UI设计    : after req, 5d
    后端开发  : api, after req, 7d
    前端开发  : after UI设计, after api, 7d
```

**依赖的价值**：
- 自动计算开始时间，避免手动日期错误
- 前置任务延期时，自动影响后续任务
- 可视化关键路径，识别项目风险点

### 误区四：不标记关键路径

**问题**：所有任务都是默认颜色，无法快速识别哪些任务对项目进度影响最大。

**建议**：用 `crit` 标记关键路径上的任务，让团队聚焦核心工作。

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

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
