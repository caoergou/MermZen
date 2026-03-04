---
title: How to Draw Class Diagrams in Mermaid
description: Learn how to create class diagrams in Mermaid, including inheritance, associations, composition, and multiplicity notation.
date: 2026-03-04
slug: class
---

# How to Draw Class Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Class diagrams describe object-oriented systems by showing classes, their attributes, methods, and relationships between classes.

## Declaring Classes

```
classDiagram
    class User {
        +int id
        +String name
        +String email
        +login() bool
        +logout() void
    }
```
<a href="https://caoergou.github.io/mermzen/#S85JLC52yUxML0rM5VIAgmSQgEJocWqRQjVYAAS0M_NKFDJTEPzgkqLMvHSFvMTcVAzB1NzEzByEaE5-emaehqZCUn4-qmh-aQlQuCwfam4tAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `+` - Public
- `-` - Private
- `#` - Protected
- `~` - Package-private

## Relationships

```
classDiagram
    Animal <|-- Dog : Inheritance
    Dog *-- Paw : Composition
    Dog o-- Toy : Aggregation
    Dog --> Food : Association
    User ..> Logger : Dependency
```
<a href="https://caoergou.github.io/mermzen/#VcpBCsJADAXQvafIWpgeoEihOAiCCxd6gDANMdAmZVKQgoc3daH4V5__fhnRPQtyxWkHkV5lwhEOr5QgG0MLZ31QlQW10OexrfvQKz5DjzbN5rKI6Vct9GZraM9cifFPU-rgZDZs7G5Ffnx3qtA0HVyMOWoLmWbSgbSsbw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Multiplicity

```
classDiagram
    User "1" --> "0..*" Order : Places
    Order "1" *-- "1..*" OrderItem : Contains
```
<a href="https://caoergou.github.io/mermzen/#S85JLC52yUxML0rM5VIAgtDi1CIFJUMlBV1dOwUlAz09LSUF_6IUoKCVQkBOYnJqMVgZRAikTktXF0gj1HmWpOYC1Trn55UkZuYVAwA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Example: E-commerce Order System

```
classDiagram
    class User {
        +int id
        +String name
        +placeOrder() Order
    }

    class Order {
        +int id
        +Date createdAt
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
    }

    User "1" --> "0..*" Order
    Order "1" *-- "1..*" OrderItem
    OrderItem "*" --> "1" Product
```
<a href="https://caoergou.github.io/mermzen/#lZBBCsIwEEX3PcWQlVZa9AKC0I0rC9UDjEksgTSt6XQh4t1N0mKKYMHZDPkzvJ_5XGPfFwpri00CrrgX4NJLC88g-NooQ6BEfFdklanBYCOj2Gnk8mSFtKs1hB5mr2QGDvISuUCSwK10TRwo6hw1P7eE2rFvukX6wT6SbL759wENKXpENRBgMIpKq_jshlpSNVxp2ai0rRg4_R3Q6Np9HCdoCJvtGGTZHtg2z1M2i29MzI_TLHM9jv2pcSUcztKJ4tanX74B" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://caoergou.github.io/mermzen/) and paste the code there.
