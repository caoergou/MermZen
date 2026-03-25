---
title: 如何用 Mermaid 画架构图
description: 深入讲解 Mermaid 架构图的组件定义、接口描述、部署模式等语法，附微服务架构的完整实战示例。
date: 2026-03-05
slug: architecture
---

# 如何用 Mermaid 画架构图

<span class="post-meta">2026-03-05 · MermZen 教程

架构图用于可视化系统架构、组件关系、部署模式等，适合系统设计、架构评审、技术文档等场景。Mermaid 使用 `architecture-beta` 关键字声明架构图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUp1Si1JjMlTUFBQKMksyUlVeL559_Pd85_N2_ZsXsvT2fuUagFLzxiR" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `architecture-beta` 关键字：

```
architecture-beta
    title 系统架构图
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKLErOyCxJTS4pLUp1Si1JjMlTUFBQKMksyUlVeL559_Pd85_N2_ZsXsvT2fuUagFLzxiR" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 组件定义

定义系统组件，包括服务、数据库、外部系统等：

```
architecture-beta
    title 基础架构组件
    container "前端应用" {
        component "用户界面"
        component "API 调用"
    }
    container "后端服务" {
        component "业务逻辑"
        component "数据访问"
    }
    database "数据库" {
        component "用户数据"
        component "业务数据"
    }
    system "外部支付系统"
```
<a href="https://eric.run.place/MermZen/#eJyFz8FKw0AQgOFXGebsyWNveuvNB9jLGhcM2K0kqyClUGgPWhpRTFVEWyIeAoWkIFTJgr5Mdid5C9EVQWnwPB_zz_TwGFubG-hhC3ng7ftKeOooENtCcSYBAJSvDgSYeUHJwM5WdjYiPSr1yk29rlTclyIAhuYsokVuipjilCH0nHCqc9iVQipgSHFqT19oOqkfHhmuN1s7baiWw689TvTX5C7OaZHb-8iMk-Zc-Xpnxkk90NXbZVPOTpc2yqrsvb7J_gT3uOK7PBQ_yhRX__3mYFPMHfTbfMfCk1CJzudrT9f1MLVxXupbetak5wyx_wFGgLXU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 连接关系

定义组件之间的连接和依赖关系：

```
architecture-beta
    title 组件关系图
    container "前端应用" {
        component "用户界面"
        component "API 调用"
    }
    container "后端服务" {
        component "业务逻辑"
        component "数据访问"
    }
    database "数据库" {
        component "用户数据"
        component "业务数据"
    }
    system "外部支付系统"

    "用户界面" --> "API 调用"
    "API 调用" --> "业务逻辑"
    "业务逻辑" --> "数据访问"
    "数据访问" --> "用户数据"
    "数据访问" --> "业务数据"
    "业务逻辑" --> "外部支付系统"
```
<a href="https://eric.run.place/MermZen/#eJyFkE9LwzAYxr_KS87u4nEHQW_e_AC5xBqw4DJpoyBjIExBhxXFTsU_yMRDYdAOClMWmF-mSdpvITNFWEnw-uRHfu_z9NAxaq-vIQ-1EQm8fZ9Tjx8FdItyghkAAPf5AQUtzgoxk-e5zoV8Xpgnr8s48RkNACN5GelJJuexjhOMoGcIQ3UOu4wyDhjpOFEXn3p0Vb2-Y2RnNne2oZwOfv8xRN-iu7nWk0y9RHI4duuKryc5HFenolzcunRqNFVRWqbf1UPaEO4RTnZJSP8oOb_7r5sBXTJz0CpTy8KTkNPOstrHfTVIVJwV4lHnQou3JWmg5oLQam1YJ1vNasw2RzOtUdsqzbRGbb0dqK2-4wDbCqj_A8f4Mvg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：微服务架构

```
architecture-beta
    title 电商系统微服务架构
    container "用户界面层" {
        component "Web 端"
        component "移动端"
        component "管理后台"
    }
    container "API 网关" {
        component "请求路由"
        component "身份验证"
        component "限流熔断"
    }
    container "业务服务层" {
        component "用户服务"
        component "产品服务"
        component "订单服务"
        component "支付服务"
        component "库存服务"
    }
    database "数据存储" {
        component "MySQL 主库"
        component "MySQL 从库"
        component "Redis 缓存"
    }
    system "外部系统" {
        component "支付宝"
        component "微信支付"
        component "物流系统"
    }

    "Web 端" --> "API 网关"
    "移动端" --> "API 网关"
    "管理后台" --> "API 网关"

    "API 网关" --> "用户服务"
    "API 网关" --> "产品服务"
    "API 网关" --> "订单服务"
    "API 网关" --> "支付服务"
    "API 网关" --> "库存服务"

    "用户服务" --> "MySQL 主库"
    "用户服务" --> "Redis 缓存"
    "产品服务" --> "MySQL 主库"
    "产品服务" --> "Redis 缓存"
    "订单服务" --> "MySQL 主库"
    "库存服务" --> "MySQL 主库"

    "支付服务" --> "支付宝"
    "支付服务" --> "微信支付"
    "订单服务" --> "物流系统"
```
<a href="https://eric.run.place/MermZen/#eJx9k01LAkEYx7_KMOe8dOwQ1C0o6OXQZS-rDiTUFjoFIh20khItwzUqesEIssRdJUxx077Mzsz6LWIbFXebmdvC_nie__PnNxl4BBfm52AMLkA9GdtJYBTDh0m0jLCuGQAAgBN4FwFmdkg1zz4d5jyToUUfSqRQo09f9OmUY7F9A-sJAyWBBplZp-ddVi2OHl9IO6dBkOEQB_cO9g1kYKDBbRQFrGFrUPybvTmkUFcBVo2V86R8Sa5aE-b4f56l9RXABtfk7FMexbO7tJ3zujYz27J1Xr_hOoPRR9GzszJmdFemnSzLm_SmqYjk9u79Av9qVFbEu-SgbKfbfyOVrJrxrBdSqqoZatquc6tmSL9CmiFmfF9cx3pUTyF_UrVFSxZp3pJcXX7bWnprYxW4PYf0K7J9Y8a5VDCbKJ5IAfbtJwtlSqVTGO35uV9vRid1LrA8EW-AWI_S84eW-1PjmNTKi3dfgfGqaRz-MSM9iEQWQ3ZOmBnzVVRAfyE4QQNPgIMis4SgSC8hKHJMCIpEE4Jh26aXB7KPYZFOElRkTPhQ5VQhKp4abEU5NXiuBJ3AwRIDzc4ILOFEHkuiBnWGx79SB6Rl" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `architecture-beta` | 声明架构图 |
| `title 标题` | 设置图表标题 |
| `container "名称" { ... }` | 定义容器组件 |
| `component "名称"` | 定义内部组件 |
| `database "名称" { ... }` | 定义数据库组件 |
| `system "名称"` | 定义外部系统 |
| `"组件1" --> "组件2"` | 定义组件之间的连接 |
| `%% 注释` | 行注释 |

## 下一步

掌握架构图后，继续学习 [Mermaid 块图](block.html)，用于更复杂的系统架构和流程图可视化。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
