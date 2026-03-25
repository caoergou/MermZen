---
title: 如何用 Mermaid 画用户旅程图
description: 深入讲解 Mermaid 用户旅程图的阶段划分、触点定义、情感曲线等语法，附电商购物流程的完整实战示例，包含痛点分析与应用场景。
date: 2026-03-05
slug: journey
---

# 如何用 Mermaid 画用户旅程图

<span class="post-meta">2026-03-05 · MermZen 教程

用户旅程图（User Journey Map）是**UX 设计的核心工具**，用于可视化用户与产品互动的完整过程。它的核心价值在于：

- **识别痛点**：发现用户体验的断点和高摩擦环节
- **量化情感**：用 1-5 分评估用户在每个触点的情感状态
- **驱动优化**：为产品迭代提供数据支撑

Mermaid 使用 `journey` 关键字声明用户旅程图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJzLyi8tykut5FIAgpLMkpxUhSfXFhflFqZl5pXnpyZWpCiVoIyVpNSiLyc1LzS3EtmVoIyVoCjQVkFCVmJebm5alFhmaAI6hVoGJgYo-jYx1TW1hCo5hefm5-s4lAQWYDvQMhRACDUx1dQFBQAUmFaqBQA8SwKq" width="100%" height="600" frameborder="0"></iframe>

## 评分体系：为什么是 1-5 分？

情感评分是 Journey 图的核心价值所在。理解评分依据对于正确使用至关重要：

| 分数 | 情感状态 | 典型表现 | 设计启示 |
|------|---------|---------|---------|
| **5 分** | 愉悦 | 流程顺畅、超出预期、有惊喜 | **保持优势**，可作为亮点宣传 |
| **4 分** | 满意 | 流程正常、无明显障碍 | 正常水平，持续监控 |
| **3 分** | 中性 | 可接受但有改进空间 | **优化候选**，关注竞品做法 |
| **2 分** | 烦恼 | 流程复杂、等待时间长、需要改进 | **重点优化**，影响转化率 |
| **1 分** | 愤怒 | 流程中断、严重问题、用户流失 | **紧急修复**，可能导致弃用 |

### 评分来源

实际项目中的评分应该来自：

1. **用户访谈**：直接询问用户感受
2. **问卷调研**：NPS（净推荐值）调研
3. **行为数据**：页面停留时间、跳出率、转化漏斗
4. **客服工单**：投诉类型和频率统计

## 声明图表

使用 `journey` 关键字：

```
journey
    title 用户旅程图标题
```

## 痛点识别示例

这个示例展示了**如何通过 Journey 图识别痛点**：

```
journey
    title 用户购物旅程：痛点分析视角
    section 发现阶段
      搜索引擎搜索 : 5: 用户
      广告点击 : 2: 用户
      社交媒体推荐 : 4: 用户
    section 考虑阶段
      产品详情阅读 : 5: 用户
      用户评价查看 : 4: 用户
      价格比较 : 3: 用户
    section 购买阶段
      加入购物车 : 5: 用户
      填写地址 : 2: 用户
      选择支付方式 : 3: 用户
    section 收货阶段
      订单确认 : 5: 用户
      物流跟踪 : 4: 用户
      确认收货 : 5: 用户
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1UctOwlAQ3fsV9xt8bPgdwwJjIBFcuCtikUeAQouAojwCFDC0LApYWvBnOnOHlb_glWJitd7VTc5jzpy5SFxfxaM3R0y8VCx1GWVcG2NuRdaM5yfYkPm4-OE-8sYTv7Uhl8UXhfQs6bW9Ihk9T8UScQaVKi_Pd80lGos9wBgqbW71wa2jWvb_LMLOIgf7Awnsd6gWvpzvHQEf_4L5YOutBzCteRsVy2MqKYJ0GiB9JyApQ61qIIG31kFNkznCjLxrymQ6IQkO25p3nrPCzpC3i39GCCeBdV00NdpmBHwSnsCaeXawAyh0QR76VdJmFFZA7xWyLWjP4VkKKWAn5bE4Qc30nCY-2OBW_h2P2pIsPTCejD6U6rxnkDEIW13cd5GmVYfepiFL-zrf9qf6Ey2_G78" width="100%" height="600" frameborder="0"></iframe>

### 痛点解读

| 低分触点 | 分数 | 可能原因 | 优化方向 |
|---------|-----|---------|---------|
| 广告点击 | 2 | 广告内容与落地页不符、跳转太慢 | 优化广告投放精准度、加快落地页加载 |
| 填写地址 | 2 | 表单字段多、无自动填充、需手动输入 | 增加地址联想、自动定位、一键填充 |
| 选择支付 | 3 | 支付方式少、界面复杂 | 简化支付流程、增加主流支付方式 |

**关键洞察**：`填写地址` 仅 2 分，是**转化漏斗的关键断点**，应优先优化。

## 优化前后对比

Journey 图可以直观展示优化效果：

### 优化前：地址填写流程

```
journey
    title 优化前：地址填写流程
    section 填写地址
      选择省份 : 3: 用户
      选择城市 : 3: 用户
      输入详细地址 : 2: 用户
      手动输入邮编 : 2: 用户
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJzLyi8tykut5FIAgpLMkpxUhSd7Zjztmfa0s_f9nllP52x4Orfh6cLVT9tmPtva-HxFN1hhcWpySWZ-ngJEAqIILKGg8LKh81n3yudzGp_s3qtgpWBspfB8yopnHdtRpJ_O73u6owmL9It9k5-2Ln2xftnz3W0QY4GKjNAUPevsftq1AqL0ZdO653umISsCAAJiaZM" width="100%" height="400" frameborder="0"></iframe>

**问题**：总评分约 2.5 分，多个步骤需要手动操作。

### 优化后：地址自动填充

```
journey
    title 优化后：地址自动填充
    section 填写地址
      自动定位城市 : 5: 用户
      地址联想输入 : 4: 用户
      邮编自动填充 : 5: 用户
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJzLyi8tykut5FIAgpLMkpxUhSd7ZjztmfZ0Qt_7PbOeztnwdG7Di_ZVT7tWPF24-mlrK1hhcWpySWZ-ngJIqG0mRBFYQkEBqnbdrCd7e5_O73u6o0nBSsHUSuH5lBXPOrZDFUGNbZzyrHnzi32Tn7YuBSoyQVP0smnd8z3TkO1GNgkAJvVfLA" width="100%" height="400" frameborder="0"></iframe>

**效果**：总评分提升至 4.7 分，步骤从 4 步减少到 3 步，用户完成率显著提升。

## 完整示例：电商用户旅程

```
journey
    title 电商用户旅程：情感曲线洞察
    section 需求识别
      意识到需求 : 4: 用户
      明确需求 : 5: 用户
      研究产品 : 4: 用户
    section 信息收集
      搜索商品 : 5: 用户
      浏览详情 : 4: 用户
      对比评价 : 5: 用户
      比价 : 3: 用户
    section 购买决策
      加入购物车 : 5: 用户
      填写地址 : 2: 用户
      选择支付 : 3: 用户
      确认订单 : 4: 用户
    section 交付体验
      支付成功 : 5: 用户
      物流跟踪 : 4: 用户
      收货确认 : 5: 用户
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJx1kc1OwkAUhfc-xTyDPxtex7DAGEgUF-5AoSmgQsKgKGgpQaAQOqj9EZDwMnPvTFe-gpM2NQbq7CbfnHPvOXOSuzjLpi_3iDr5TP40TQR1oaUJOkbdx4eyGNe-v57wuowlAzvvYrlB5wWYESrO08f5TC5Lgm4B364k00CfhoAQLNXD-zxiJEUOUyRyjV-074Rp_-KjLSx6VFgeX46gWdxRx4P5xsQiQ-oFHS22bXSF01cRIt22Lbp1OdIlG6pICUsBWyCjkpX4yk9SMxqBg8R1pDPjizloH2J2HxtWe1B-VUBULLkeJniCOQXtEbpzeC4ovL-Fg0IFaxZSxlftncGqJtOW9kDafbht_V_TcqDUfN0MJjdxktAQ9QZUjaT2Kxa6Rekb8nOS9HfUk84omv1X_QOU2R_1" width="100%" height="600" frameborder="0"></iframe>

### 关键洞察

从情感曲线可以清晰看到：

- **高点**（5分）：搜索商品、对比评价、加入购物车、支付成功、收货确认
- **低点**（2-3分）：填写地址、选择支付、比价

**行动建议**：
1. **优先**：优化地址填写流程（引入自动填充）
2. **次要**：简化支付选择、增加价格对比工具
3. **监控**：持续跟踪比价环节的情感变化

## 语法速查表

| 语法 | 功能 | 示例 |
|------|------|------|
| `journey` | 声明用户旅程图 | `journey` |
| `title 标题` | 设置图表标题 | `title 用户旅程` |
| `section 阶段名` | 划分旅程阶段 | `section 购买阶段` |
| `触点 : 分数: 角色` | 定义触点和情感 | `搜索 : 5: 用户` |
| `%% 注释` | 行注释 | `%% 这是注释` |

## 实际应用场景

| 场景 | 如何使用 Journey 图 |
|------|---------------------|
| **产品评审** | 展示用户路径，讨论优化优先级 |
| **团队对齐** | 让研发、设计、运营理解用户视角 |
| **竞品分析** | 对比竞品在不同触点的体验 |
| **A/B 测试** | 测试前后情感曲线对比 |
| **OKR 设定** | 基于痛点设定体验优化目标 |

## 下一步

掌握用户旅程图后，您可以：
- 结合 [Mermaid 时序图](sequence.html) 分析系统交互
- 使用 [Mermaid 流程图](flowchart.html) 绘制业务流程
- 查看 [Mermaid 图表速查表](../cheat-sheet.html) 获取完整语法参考

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。