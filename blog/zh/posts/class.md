---
title: 如何用 Mermaid 画类图
description: 用 Mermaid 类图描述面向对象模型，掌握类、属性、方法、继承、组合等关系语法，含完整示例。
date: 2026-03-04
slug: class
---

## 什么是类图？

类图（Class Diagram）是 UML 中最常用的图表之一，用于描述系统中类的结构（属性和方法）以及类之间的关系（继承、关联、组合等）。适合系统设计、数据建模、团队协作讨论等场景。

## 基本语法

### 声明类与成员

```
classDiagram
    class User {
        +int id
        +String name
        -String password
        +login() bool
        +logout() void
    }
```
<a href="https://caoergou.github.io/mermzen/#S85JLC52yUxML0rM5VIAgmSQgEJocWqRQjVYAAS0M_NKFDJTEPzgkqLMvHSFvMTcVLigLlSwAGhAeX4Rkuqc_PTMPA1NhaT8_BwU0fzSEqBwWT7U6FoA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**访问修饰符：**

| 符号 | 含义 |
|------|------|
| `+` | 公有（public） |
| `-` | 私有（private） |
| `#` | 保护（protected） |
| `~` | 包内可见（package） |

属性格式：`+类型 属性名` 或 `+属性名 类型`（两种均可）。
方法格式：`+方法名(参数) 返回类型`。

### 类之间的关系

```
classDiagram
    Animal <|-- Dog : 继承
    Animal <|-- Cat : 继承
    Dog *-- Paw : 组合
    Cat o-- Toy : 聚合
    Dog --> Food : 依赖
    User ..> Logger : 使用
```
<a href="https://caoergou.github.io/mermzen/#S85JLC52yUxML0rM5VIAAse8zNzEHAWbGl1dBZf8dAUrhee7lz_r3I8h6ZxYgioJUq0FlAhILAdLtDyd0AGWAKnMB0qE5FcCJV40zoJJgHTo6topuOXnpwBlnuyb-2LrNLBMaHFqkYKenp2CT356OpAJlNy7__mUFQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 写法 | 关系类型 | 含义 |
|------|---------|------|
| `A <\|-- B` | 继承 | B 继承 A |
| `A <\|.. B` | 实现 | B 实现接口 A |
| `A *-- B` | 组合 | A 由 B 构成（强依赖） |
| `A o-- B` | 聚合 | A 包含 B（弱依赖） |
| `A --> B` | 关联 | A 引用 B |
| `A ..> B` | 依赖 | A 临时使用 B |

### 多重性标注

```
classDiagram
    User "1" --> "0..*" Order : 下单
    Order "1" *-- "1..*" OrderItem : 包含
```
<a href="https://caoergou.github.io/mermzen/#S85JLC52yUxML0rM5VIAgtDi1CIFJUMlBV1dOwUlAz09LSUF_6IUoKCVwpMd3U97p4KVQYRA6rR0dYE0Qp1nSWouUO3TntanE1YDAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：电商订单模型

```
classDiagram
    class User {
        +int id
        +String name
        +String email
        +placeOrder() Order
    }

    class Order {
        +int id
        +Date createdAt
        +String status
        +calcTotal() float
    }

    class OrderItem {
        +int quantity
        +float unitPrice
        +getSubtotal() float
    }

    class Product {
        +int id
        +String name
        +float price
        +int stock
    }

    User "1" --> "0..*" Order : 下单
    Order "1" *-- "1..*" OrderItem : 包含
    OrderItem "*..*" --> "1" Product : 引用
```
<a href="https://caoergou.github.io/mermzen/#lZGxSgQxEIb7e4ohla7soe0VgnCNlQenDzDOxiWYzZ7JpBCxtFLBwnsHwRew8HFcfA2zcx5ZPTwwzZAvf-YjE7IYwtRg7bEZQVrUAzgL2sONgH7tGcdgqryfszeuBoeN3oC6QWMzXVgkfeIr7Xd2Qaqc3Y4GOsHbfFNkDeR1KtURbygDI8eQMaGl05bRJuWFbZH_UB6zbn5rryI6NnydqXSA6AzPvKHBg2vN83jO20Uz31aR-N_TXFkXP439zcAtXQ498lnqQEFZHoLaH48L9T3RCXy83XePS4mtUJ8ryjLVnJMxTKB7uOueXnNWsCokJ63T1fVrUvp9-fn88gU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://caoergou.github.io/mermzen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `classDiagram` | 声明类图 |
| `class 类名 { }` | 定义类 |
| `+属性名 类型` | 公有属性 |
| `-属性名 类型` | 私有属性 |
| `+方法名() 返回类型` | 方法定义 |
| `A <\|-- B` | 继承关系 |
| `A *-- B` | 组合关系 |
| `A o-- B` | 聚合关系 |
| `A --> B` | 关联/依赖 |
| `"1" --> "0..*"` | 多重性标注 |

## 下一步

了解类图后，继续学习 [Mermaid 饼图](pie.html)，用三行代码生成数据占比可视化。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://caoergou.github.io/mermzen/)，然后将代码粘贴进去。
