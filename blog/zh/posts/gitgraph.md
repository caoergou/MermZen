---
title: 如何用 Mermaid 画 Git 图
description: 深入讲解 Mermaid Git 图的分支创建、提交、合并、标签等语法，附版本控制流程的完整实战示例。
date: 2026-03-05
slug: gitgraph
---

# 如何用 Mermaid 画 Git 图

<span class="post-meta">2026-03-05 · MermZen 教程

Git 图用于可视化版本控制系统的分支管理、提交历史和合并操作，适合软件开发团队协作、项目管理、版本控制教学等场景。Mermaid 使用 `gitGraph` 关键字声明 Git 图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFF4OnvfswXtLxfNUKoFAGesEeQ" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `gitGraph` 关键字：

```
gitGraph
    title Git 图标题
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFF4OnvfswXtLxfNUKoFAGesEeQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本提交和分支

创建简单的提交和分支：

```
gitGraph
    title 基本 Git 图
    commit "初始提交"
    commit "功能 A"
    branch "功能分支1"
    commit "完成功能 1"
    commit "修复 bug 1"
    checkout main
    branch "功能分支2"
    commit "完成功能 2"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXg6f9ezOWsU3DNLFJ7O3geRSc7Pzc0sUYhRetox9-ny7mf9E57sWhKjhC7ZNf9F814FR5hEUlFiXnIGXOJpR9uzKesNMbWt63nWMQGqGVP6yf51T5f0KiSVpiNJZqQmZ-eXlijkJmbm4bHMCL9lRjFKSrUAuBNwXQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 分支合并

演示分支合并操作：

```
gitGraph
    title 分支合并示例
    commit
    branch feature-1
    commit
    commit
    checkout main
    branch feature-2
    commit
    commit
    checkout main
    merge feature-1
    commit
    merge feature-2
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXja0fZsyvqnEzqe7tz2fMmuJ_u6IbLJ-bm5mSUQdlJRYl5yhkJaamJJaVGqriGmChR2Rmpydn5piUJuYmYeVgOMSDYgN7UoPRWfA1AVGCnVAgDhnlab" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 标签和版本

添加标签和版本管理：

```
gitGraph
    title 版本管理示例
    commit "v1.0.0 发布"
    branch feature/auth
    commit "添加认证功能"
    commit "修复安全漏洞"
    checkout main
    merge feature/auth tag: "v1.1.0"
    branch hotfix/security
    commit "紧急安全修复"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXje2fFszprn6xY-n9D2fMmuJ_u6IbLJ-bm5mSUKMUplhnoGegYKT_snPt3RHKMEkU0qSsxLzlBIS00sKS1K1U8sLclA0_Zs--6nXQterFvyYn3j0675L5r3wvTClTzZv-7pkt6n6zqftq54tqf_2ZZ5cCUZqcnZ-aUlCrmJmXkQodzUovRUFAsVShLTrSAONNQzQHNZRn5JWmaFfnFqcmlRZkklms3Ptyx_1rAUYjPEFQRtRjMQxXLDGCWlWgD525DX" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：产品开发流程

```
gitGraph
    title 产品开发 Git 流程图
    commit "项目初始化"
    commit "基础架构搭建"
    branch feature/login
    commit "登录功能实现"
    commit "登录 UI 优化"
    checkout main
    branch feature/dashboard
    commit "仪表板框架"
    commit "数据可视化组件"
    commit "用户统计功能"
    checkout main
    branch feature/settings
    commit "用户设置页面"
    commit "安全设置"
    checkout main
    merge feature/login tag: "v1.0.0-beta"
    commit "测试修复"
    merge feature/dashboard
    merge feature/settings tag: "v1.0.0"
    branch hotfix/performance
    commit "优化加载速度"
    commit "减少内存泄漏"
    checkout main
    merge hotfix/performance tag: "v1.0.1"
```
<a href="https://eric.run.place/MermZen/#eJyNUt9KwlAcfpXDua6sLn2B6AG6281xHbeR22QeI4hASe2PlUkpRqgtIiVoCWGRc_oy-50z3yJIhLZFdf195_v3O_t4FyfXl7CMk1jR2IZFsqpkIIQQ01iGIn_Ug6sijAtQq6MNjSE-LIp-FW4nc5Zs6rrGkIRn9oe4deC4Db0qnDUlHMGhOxJ2gXfeeKfEL5_BHS0oKYsYsorSlLC8RRMZU9GMyGNx44LXgNNucOiB0xEXg5j-nIK2NpE_bn0PoFJ5x8wzpJOFbMRwm-TUlEms7Yii7z4Fdp-3p9yu8M5bzJE3BvzcgdpL0KvAWVO4Jd-Ns8R1nx-_C7cbOPa8wP-T5ShjmqHkfpQMnInwnJk9nLXv42s7J1Duzym_-OnUUmh4ecSIkkQS3l1bWV1ZXU5RRuLNh9XgpeFPHXg4X4BhqcimYXBRK2wV-Q6qydLaXiJLrbRp6cSQafQ8X2eG07vA82aFLowe4ysc1WBQh0oZnlv8tcTHtT-3iNuGUq5JGB98AkJmW9Y" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>


## 为什么用 Git 图？

### Git 图解决什么问题？

Git 图专门用于**可视化版本控制系统的分支策略和代码演进历史**，解决以下核心问题：

| 问题 | Git 图解决方案 |
|------|----------------|
| 分支策略难以理解 | 直观展示分支创建、合并、删除的完整流程 |
| 代码评审时沟通困难 | 可视化展示功能分支与主线的关系 |
| 版本发布计划混乱 | 清晰标注版本标签和发布节点 |
| 新人上手困难 | 图形化展示团队 Git 工作流 |

### 适用场景

**✅ 推荐使用 Git 图的场景：**

1. **团队新人培训**：帮助新成员快速理解团队的 Git 工作流
2. **代码评审讨论**：在 PR 描述中展示分支合并策略
3. **发布计划制定**：可视化版本发布路线图
4. **技术方案文档**：记录项目的分支管理策略
5. **故障回溯分析**：展示问题修复的代码路径

<iframe src="https://eric.run.place/MermZen/embed.html#eJyVUMtOwkAU_ZXJrJWHS37A-AHuuhnq0E6kLanTRmJMNAaCUWhMADEEDQ9DN7YbjSFA_Bluh_6FNYjK6Ma7usl55pxgF-d2trCKc1hjfNcmJV0xUXKc8SJF0B3EnQeoVaNmKJ7aovUIXrgcV-G6vaKplmEwjhQc9yeiG0CtB-OrDxSv8LxNTFVHB9SlRaskaWB2Bt6NaIQwuIgrdTEPJFmBEu7YNE0crkta0fSj2usyGC3D88jvQ-92rf2m3E1h3or7L3FvgPb3vnCdqoeWwzdLGdTW6B-BUpMSKRvU5FJSss5i2okayTpDCCfJ85-wTc-1wCDM_Mn-NECcaLkk0s2mMqnMdp5yIo2mW7zAjtNHVHVsxstS1cVbAKM6BJdQ8aOZFz3f_6oqJ0uGGw2yCsan7-iM7d0" width="100%" height="500" frameborder="0"></iframe>

### 不适用场景

**❌ 不建议使用 Git 图的场景：**

- **简单线性历史**：如果项目只有一条主线，没有分支，用文字描述即可
- **单次提交说明**：单个 commit 的详细说明不需要 Git 图
- **文件级变更**：需要展示具体文件修改时，应使用 diff 或代码审查工具

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJUwCCksySnFSF5-sanvZOfb5r_7OG5U_72p72b3q_p-PJjt6XDU1PJ3Q8n7JCwT2zROHp7H3v93RC9CXn5-YChWKUnnbMfbq8-1n_hCe7lsQooUk-2777adeCp13zXzTvVXDEkH6yf93TJb0KSaXpGFJP-yc-3dGsUGaoZxCjpFQLAAwTV0g" width="100%" height="300" frameborder="0"></iframe>

> 💡 **提示**：上图展示了一个简单的线性历史，这种情况下使用 Git 图反而显得冗余，直接用文字描述"4 个提交"即可。

## Git 工作流最佳实践

### 功能分支工作流

每个功能一个分支，完成后合并到 main：

```
gitGraph
    title 功能分支工作流
    commit "初始化项目"
    branch feature/user-auth
    commit "添加用户认证"
    checkout main
    merge feature/user-auth
```
<a href="https://eric.run.place/MermZen/#ZY5NEoIwDIWv0ulaRyi0_FzAS3RT0hQYBZzauHG8u6mMK7LIZL6895K3fMlenSTIXo5zukb3mOwquNKc7igsadUFS20RfJ4LY8loxUR71JbqoIGJr8vdBduyzElYmcVltnQwcK9KNnZt01lqDCLvf_IhuhUmEdAlinihJ8azozQdwowPOUa5ggO0apmoquG_BlfnDuU_EiaE20ZJLG5ed7RgHPF4RH6-" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Git Flow 工作流

更复杂的分支策略，适合大型项目：

```
gitGraph
    title Git Flow 工作流
    commit "初始提交"
    branch develop
    commit "开发分支"
    branch feature/login
    commit "登录功能"
    checkout develop
    merge feature/login
    checkout main
    merge develop tag: "v1.0.0"
```
<a href="https://eric.run.place/MermZen/#bY5NEoIwDEav0unawfJTEA4gl-imtCkwAmU6LS4c724QWShmkUXyvpc86EKr5EQVrWjb-9rJuRMTwfK9H4DUvSfXwd6JCFwDFyEzXImQ6yzeMGXHERlBEUhijb1UDQKpZgiDzHDzBhsnJ9URDQsMdj6GDcMAT3W8iliOCp6Yn7AB6YOD82DbfjooirxoVhHnq6I0IlyY0btCdaBuNvjvD0ZwLfz17vgo99HGfuLEy7bCs0scsYgJSp8v" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 分支命名规范

| 前缀 | 用途 | 示例 |
|------|------|------|
| `feature/` | 新功能开发 | `feature/user-profile` |
| `bugfix/` | Bug 修复 | `bugfix/login-error` |
| `hotfix/` | 紧急修复 | `hotfix/security-patch` |
| `release/` | 发布准备 | `release/v1.2.0` |

## 常用命令对照

Git 图语法与 Git 命令的对应关系：

```
gitGraph
    title 常用命令对照
    commit id: "git commit"
    branch feature
    commit id: "git branch"
    checkout feature
    commit id: "git checkout"
    checkout main
    merge feature id: "git merge"
    commit id: "git tag v1.0" type: HIGHLIGHT
```
<a href="https://eric.run.place/MermZen/#hYxBCsIwEEWvMsxaxGprtRdoBZcus0nTaRs0bQmTgoh3NxorooiBCcOb__4FR8yWM1SYYaM5t3JoRQf-seYTgXAJrTbCpcnS_0mcVsLFRLHfy3rrebROQ171xmgGXWUg7lVPIDCcSys71UJNkp2lH0oITYpqSR17x3-kKfalGam7gAzZhqaaN_XBX95nMcsGxmi-EAh8HiiDYpcXez8HvN4A" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Git 图语法 | Git 命令 | 说明 |
|------------|----------|------|
| `commit "信息"` | `git commit -m "信息"` | 创建提交 |
| `branch 分支名` | `git branch 分支名` | 创建分支 |
| `checkout 分支名` | `git checkout 分支名` | 切换分支 |
| `merge 分支名` | `git merge 分支名` | 合并分支 |
| `tag: "版本号"` | `git tag 版本号` | 打标签 |

## 最佳实践

```
gitGraph
    title 最佳实践示例
    commit "有意义的提交信息"
    branch feature/user-profile
    commit "feat: 添加用户资料页"
    checkout main
    commit "chore: 更新依赖"
    merge feature/user-profile tag: "v1.1.0"
    branch hotfix/security
    commit "fix: 修复安全漏洞"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#fVBLbsMgEL2KxbpNwDY_XyCXYINhiFFjOyIQpap69w6OsqhV1QtkPc37fpE7Gdo34shAzjGfkr1OZmnwyzFfoDFFSEpN6YPsTOGjBlOUD9wUqTtbcTU-7906zzE3hmwUjS-jAQ-gx38pVI9I56sU2L4SgSFCRUDGJjAmu7ipCWBzSXAsN0jv17SGeIGdQz0ZajQfRgzVWlSVvFWItJ2sAfvqxjU6ayX5y8FN4D7WkpvZxmWn6aY1wSYqwkYet9baVzkuXhIzpDP8mbHJ9ox8cmcHdqC7UtOaQ3wcb-BKivlz3yc-qjNOgutyTX1dWmF4zkQtFeqQwjP4p8gz2M7nVyZmCPn-AQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**提交信息规范**：
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试
- `chore:` 构建/工具

**分支管理建议**：
- 功能分支命名：`feature/xxx`
- 合并前先 `git pull` 获取最新代码
- 定期清理已合并的分支
- 使用 Pull Request 进行代码评审

## 常见误区

```
gitGraph
    title 常见误区示例
    commit "直接在 main 开发 ❌"
    branch feature-a
    commit "功能 A"
    branch feature-b
    commit "功能 B"
    branch feature-c
    commit "功能 C"
    branch feature-d
    commit "功能 D"
    checkout main
    merge feature-a
    merge feature-b
    merge feature-c
    merge feature-d
    commit "分支过多导致混乱 ❌"
```
<a href="https://eric.run.place/MermZen/#fZHNboQgEIBfhXBuE0UR3Ft_kr4EFxhnVtNVGwO9NH33jppmt1WXAwkf8w0zzJf8lCf1IEGe5LmLb5P_aN0geMUuXlC4pLGwLtkact4DEpOi8C6Zet5LsmGNh7Hvuyic5KuKSpeqwmsONsqK3nfDnIqybNabnA_KlMDBixsmP0ArCH1MEz76TUatan7YZtSIpwNpW8aN9HwgwT3p5UBq7kmvvxK0CO9jikvzK-pxOuP_Lv_CsAdhD-5VkVX87VrNtRAYJnXOM9KBgEm-DKUh5iWa6wjk9w8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**避免这些问题**：

| 误区 | 正确做法 |
|------|----------|
| 直接在 main 分支开发 | 使用功能分支，完成后合并 |
| 分支过多导致混乱 | 及时删除已合并的分支 |
| 不使用标签标记版本 | 重要版本打 tag，便于回溯 |
| 提交信息不清晰 | 使用规范的提交信息格式 |
| 长期不合并分支 | 定期合并，减少冲突 |

## 速查表

| 语法 | 功能 |
|------|------|
| `gitGraph` | 声明 Git 图 |
| `title 标题` | 设置图表标题 |
| `commit "信息"` | 创建提交节点 |
| `branch 分支名` | 创建分支 |
| `checkout 分支名` | 切换分支 |
| `merge 分支名` | 合并分支 |
| `merge 分支名 tag: "版本号"` | 合并并打标签 |
| `%% 注释` | 行注释 |

## 下一步

掌握 Git 图后，您可以继续学习其他 Mermaid 图表类型，或查看我们的 [Mermaid 图表速查表](../cheat-sheet.html) 获取完整的语法参考。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
