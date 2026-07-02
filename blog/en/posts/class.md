---
title: How to Draw Class Diagrams in Mermaid
description: Learn how to create class diagrams in Mermaid, including inheritance, associations, composition, and multiplicity notation.
date: 2026-03-04
slug: class
---

# How to Draw Class Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Class diagrams describe object-oriented systems by showing classes, their attributes, methods, and relationships between classes.
<iframe src="https://eric.run.place/MermZen/embed.html#eNqrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVMAArCIQmhxapFCNUQEBLQz80oUMlOQBIJLijLz0hXyEnNTMUVTcxMzc5CEc_LTM_M0NBWS8vPRhPNLS4DiZfkws2uVagF1my2H" width="100%" height="600" frameborder="0"></iframe>


## Why Use Class Diagrams?

- **Most common static structure diagram in UML**: Class diagrams are the core tool for object-oriented modeling
- **Describe system structure**: Clearly show classes, attributes, methods, and relationships
- **Wide range of applications**:
  - Object-oriented design and analysis
  - Database modeling (complement to ER diagrams)
  - API interface design
  - Code architecture documentation

## UML Design Scenarios

| Scenario | Purpose |
|----------|---------|
| System design phase | Plan class structure, define attributes and methods, organize relationships between classes |
| Code review | Discuss coupling between classes, evaluate inheritance hierarchy |
| Documentation | Generate class diagram documentation for team understanding |
| Database design | Map classes to database tables, plan entity relationships |

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAAiyiEFqcWKVRDREBAOzOvRCEzBUkguKQoMy9dIS8xNxVTNDU3MTMHSTgnPz0zT0NTISk_H004v7REQ1OhLB9mdq1SLQB1my2H" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

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
<a href="https://eric.run.place/MermZen/#eNpVyjELwjAQBeC_cmQU08ExSKEYBKGDg24uR3qcgfauJEUp6n83xUF90-N972Fuxm3WJhhnQo85-4iccLgIlDQSB-xh-7QWvDI4OMiVUpxQAn0uy7wqfMR74Z0Oo-Y4RZUva-GTzoUb5kSM_2xtDXvVbvGcNcQfP2dKUFU1tMpcqgNPI0lHEmbzegNc7Tpn" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

### Relationship Type Selection Guide

| Relationship | Syntax | Use Case |
|--------------|--------|----------|
| **Inheritance** | `<\|--` | is-a relationship (subclass inherits from parent), e.g., "Dog is an Animal" |
| **Composition** | `*--` | Whole-part relationship, same lifecycle (part cannot exist independently), e.g., "Person and Heart" |
| **Aggregation** | `o--` | Whole-part relationship, independent lifecycle (part can exist independently), e.g., "Class and Student" |
| **Dependency** | `-->` | Usage relationship, temporary dependency, e.g., "method parameter" |
| **Association** | `--` | Ownership relationship, permanent association, e.g., "Student and Course" |

**Selection Tips:**
- If it's an "is-a" relationship → use inheritance
- If parts are destroyed with the whole → use composition
- If parts can exist independently → use aggregation
- If it's just temporary usage → use dependency

## Multiplicity

```
classDiagram
    User "1" --> "0..*" Order : Places
    Order "1" *-- "1..*" OrderItem : Contains
```
<a href="https://eric.run.place/MermZen/#eNqrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVMAgtDi1CKFGCXDGCUFXV07IMtAT08LyPEvSgFKWCkE5CQmpxZD1ELEIIq1dHVBLCTFniWpuUANzvl5JYmZecVKtQAOqiJX" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Best Practices

### Class Design Guidelines

- **Control class size**: Keep each class under 10 attributes, maintain single responsibility
- **Use access modifiers**:
  - `+` Public: External interfaces
  - `-` Private: Internal implementation details
  - `#` Protected: Accessible by subclasses
- **Clearly annotate multiplicity**: Use `1`, `0..*`, `1..*` to express quantity relationships
- **Control relationship complexity**: Keep relationships per class under 10 to avoid over-coupling

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Class name | PascalCase | `UserAccount`, `OrderItem` |
| Attribute | camelCase | `userName`, `createdAt` |
| Method | verb + camelCase | `placeOrder()`, `calcTotal()` |
| Relationship label | concise verb phrase | `Places`, `Contains`, `References` |

### Common Mistakes

- ❌ Overusing inheritance (prefer composition)
- ❌ Ignoring multiplicity notation (leads to unclear relationships)
- ❌ Using verbs for class names (class names should be nouns)
- ❌ Mixing access modifier styles for attributes and methods

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
<a href="https://eric.run.place/MermZen/#eNqdUcFqwzAM_RWh05Yupd2xh8Ggl50WSHvzRXO8YHCczlEGo_Tf69ilFZS2MF0kP8nvWc97_MXV6wtqXKF2NAxrS22gTnmIkRDYDibAPiNTzKxnsI0Aag7Wt-CpMwLdOdLmMzQmPD1Dyrl5UF7Sp859_jWxAR1MTM07i4Ympzc9k4sK364nvq3wwaa7UvkZybPlPwEnGhi95SpYLfdpDdfjFz-Uq0LfjJr_Y1kW312Ez9TpExQuFUJZvsVqMZ8X8SB8zUbmmaIsp0rMTPuLuWSHwuLMN906vRwPR9VxmiA" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
