---
title: 如何用 Mermaid 画块图
description: 深入讲解 Mermaid 块图的组件定义、连接关系、嵌套结构等语法，附系统架构的完整实战示例。
date: 2026-03-05
slug: block
---

# 如何用 Mermaid 画块图

<span class="post-meta">2026-03-05 · MermZen 教程

块图用于可视化复杂系统的组件结构、层次关系和连接方式，适合系统架构设计、网络拓扑、工业流程图等场景。Mermaid 使用 `block-beta` 关键字声明块图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVV4Onf609n7ni1of7lohlItAHbLEwo" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `block-beta` 关键字：

```
block-beta
    title 块图标题
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVV4Onf609n7ni1of7lohlItAHbLEwo" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本块定义

创建简单的块和连接：

```
block-beta
    title 基本块图
    block "块 A"
    block "块 B"
    block "块 C"

    "块 A" --> "块 B"
    "块 A" --> "块 C"
    "块 B" --> "块 C"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVV4On_Xszlrns6d_nT2Pog4WJlCjNLTudMVHGOUMAWdsAk6gwQhwnCtCrq6duh6sEk6o0o6oUsq1QIAmbxEBA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 嵌套块结构

创建包含子块的复杂嵌套结构：

```
block-beta
    title 嵌套块图
    block "系统" {
        block "子系统 1" {
            block "组件 A"
            block "组件 B"
        }
        block "子系统 2" {
            block "组件 C"
            block "组件 D"
        }
    }

    "组件 A" --> "组件 C"
    "组件 B" --> "组件 D"
    "子系统 1" --> "子系统 2"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKyslPznZKLUmMyVNQUFAoySzJSVV4urXn6dLpT-dOfzp7H0QcrEwhRun55t3Pd8-PUVKohogjyz1dOwEirWCIqgDFgN0tT3ZvU3CMUcIr74QsX4vPLiOCdjkTsMsFi121MXkQBrKLFXR17bAYi-xoVCUuCCWogQNRheIJpVoAAeKUHg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：网络拓扑图

```
block-beta
    title 公司网络拓扑
    block "总部网络" {
        block "核心交换机"
        block "服务器集群" {
            block "Web 服务器"
            block "数据库服务器"
            block "应用服务器"
        }
        block "办公网络" {
            block "员工电脑"
            block "打印机"
        }
    }
    block "分支办公室" {
        block "分支交换机"
        block "本地服务器"
        block "员工设备"
    }
    block "互联网"

    "核心交换机" --> "Web 服务器"
    "核心交换机" --> "数据库服务器"
    "核心交换机" --> "应用服务器"
    "核心交换机" --> "员工电脑"
    "核心交换机" --> "打印机"
    "核心交换机" --> "互联网"
    "分支交换机" --> "本地服务器"
    "分支交换机" --> "员工设备"
    "分支交换机" --> "互联网"
```
<a href="https://eric.run.place/MermZen/#eJyFkcFKw0AQhl9lmbO9eOzBgy_hJRdbchCLXoKXElBqq60EiVlBMYhKhBxCzEUsW9q-TGc3fQuhayWbzrbn_5uZf_6_CxfQ3N-DNjSh1Tlvnx663rFzxhhj3onXcRn2M7wfq2moJrG8i-Qw1OoKZg7Iy8myl2rdAdbVqkG8jXHeW4hEBh8yFg4QSBzg6B2f0-XLQM0Sc08VPHJb7B-ubjK2PRYyyFFEO0kUXPGUxPxNlzh6xX5GvWpQ4RP-fCr-XV6HVofDCIOiFsbfRd_MF28Hkn_p05gndMQa2hFxhnFBvmo6L_MZJjdrveZmIR7KK66mq8-0RBTMGo0DW1l23F6bfcZS4JYBop0tluo92VEjGY1utLLeSldhH6CKsdMVJ-D_AiGJwNM" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `block-beta` | 声明块图 |
| `title 标题` | 设置图表标题 |
| `block "名称"` | 定义块 |
| `block "名称" { ... }` | 定义包含子块的块 |
| `"块 1" --> "块 2"` | 定义块之间的连接 |
| `%% 注释` | 行注释 |

## 下一步

掌握块图后，继续学习 [Mermaid 需求图](requirement.html)，用于项目需求管理和分析。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
