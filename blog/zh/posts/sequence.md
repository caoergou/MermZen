

# 如何用 Mermaid 画时序图

<span class="post-meta">2026-03-04 · MermZen 教程

时序图（Sequence Diagram）描述多个参与者之间**按时间顺序**发生的消息交互。与流程图不同，时序图的核心问题是：**谁在什么时候向谁发送了什么**。适合展示 API 调用链路、用户与系统的交互、微服务通信等场景。

## 声明图表与参与者

```
sequenceDiagram
    participant 用户
    participant 服务器
    participant 数据库
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShedTVjzr2I4h_GxO79OuhU9nrsCUmbrhWe-6p7smAwA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `sequenceDiagram` 声明图表类型
- `participant 名称` 显式声明参与者，**控制左右排列顺序**
- 若不声明，在消息中使用的名称会自动创建参与者（按出现顺序排列）
- 使用 `actor 名称` 可以将参与者渲染为小人图标（适合表示真实用户）

**为参与者设置别名**，使代码简洁：

```
sequenceDiagram
    participant U as 用户
    participant S as 服务器
    U->>S: 发送请求
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShVCFxGKF51NWPOvYjiEXDJJ7Nqf3adfCpzNXgKVDde3sgq0UnvZPfNnQ-GL99mcbmwA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 消息箭头类型

Mermaid 提供六种消息样式，覆盖请求、响应、异步等场景：

```
sequenceDiagram
    A->>B: 实线带开放箭头（同步请求）
    B-->>A: 虚线带开放箭头（同步响应）
    A->B: 实线无箭头
    A-->B: 虚线无箭头
    A-xB: 实线带叉（失败/丢弃）
    A--xB: 虚线带叉
    A-)B: 实线带异步箭头（非阻塞）
    A--)B: 虚线带异步箭头
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAAkddOzsnK4Wn6-Y937X_6Y5lT_c0PJuy7_m6tU-XbHm_p-PphJ5na5e-WL_92cam93s6wVqcdIF6HK0UXsychUfP08m9T3dNgekBWgO35dn0BRC1UBmwFMQwdKkKFKf1d4JMX7LxxZal-k92LHq6pxlhPFgpwkX9MHFNVM81AV0Gd-jLufNeztj9dOE8JGM0UYxBUg8A" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 常见使用场景 |
|------|------------|
| `A->>B: 消息` | 同步调用、HTTP 请求 |
| `B-->>A: 消息` | 返回值、HTTP 响应 |
| `A-)B: 消息` | 异步消息、事件发布 |
| `A-xB: 消息` | 失败的调用、丢弃的消息 |

## 备注（Note）

在参与者旁边添加说明文字：

```
sequenceDiagram
    participant A
    participant B
    Note right of A: 这是 A 的备注
    Note over A,B: 横跨多个参与者的备注
    A->>B: 消息
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwSBUcMESewiF9-SapCUWZ6RolCfpqCo5XCi_0zn81Yr-Co8HxWy9Ml7c82r0Coyy9LLVJw1HGyUni2YtWL7SueLpn1ZMeqp_1NT3b0vWhoRdXhqGtnB1K5reNZ43oA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 控制结构

### 循环（loop）

```
sequenceDiagram
    loop 每隔 30 秒
        客户端->>服务器: 心跳检测
        服务器-->>客户端: pong
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgpz8_AKFZ-v7X86aomBsoPB8-SSwMAg8XbfoWcf256vX69rZPZvT-7Rr4dOZK6wUnu5vfrF987PFDc-2dsPVwuV1gYrhGq0UCvLz0sGKUvNSAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 条件分支（alt / else）

```
sequenceDiagram
    客户端->>服务器: POST /login
    alt 验证通过
        服务器-->>客户端: 200 OK + Token
    else 密码错误
        服务器-->>客户端: 401 Unauthorized
    else 账号被锁定
        服务器-->>客户端: 403 Forbidden
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgqfrFj3r2P589XpdO7tnc3qfdi18OnOFlUKAf3CIgn5OfnpmHlhZYk6JwstVPS_WN75smPVifztYEATgenSBBsANs1IwMjBQ8PdW0FYIyc9OhZiRmlOcqvB0fdvzBY0vp8x8sX49QUNMDAwVQvMSS0sy8osyq1JTEMa82LLsaf_2F4tWv5zS-HTdLCJMMlZwyy9KykxJgbkmLwUA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 可选操作（opt）

```
sequenceDiagram
    服务器->>客户端: 返回数据
    opt 开启了通知
        服务器->>推送服务: 发送通知
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgmdzep92LXw6c4Wund3TdYuedWx_vnq9lcKL_VOezp73bOqGZ73rwOryC0oUnu5peDph_ZNdbS8bZj2fvxQsjm7Gs74VLxsaISJWCk_7JwJ5SMpT81IA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 并行操作（par）

```
sequenceDiagram
    par 同时执行
        服务器->>邮件服务: 发送邮件
    and
        服务器->>短信服务: 发送短信
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEIoWnE3qeTd_2rHP5i4U9YEEQeDan92nXwqczV-ja2b1sWvdk9zaIiJXC0_6JLxsaIWJg5Yl5KVi1PZ-_9sn-hajaIGJg5al5KQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：HTTP 登录接口调用链

```
sequenceDiagram
    actor 用户
    participant 浏览器
    participant API服务器
    participant Redis缓存
    participant MySQL

    用户->>浏览器: 填写账号密码并点击登录
    浏览器->>API服务器: POST /api/login {username, password}

    API服务器->>Redis缓存: GET login_fail:{username}
    Redis缓存-->>API服务器: 失败次数 (0)

    API服务器->>MySQL: SELECT * FROM users WHERE username=?
    MySQL-->>API服务器: 用户记录

    alt 密码验证通过
        API服务器->>API服务器: 生成 JWT Token (HS256)
        API服务器->>Redis缓存: SET session:{token} 7d
        API服务器-->>浏览器: 200 OK {token, user}
        浏览器->>浏览器: 存入 localStorage
        浏览器-->>用户: 跳转首页
    else 密码错误
        API服务器->>Redis缓存: INCR login_fail:{username}
        API服务器-->>浏览器: 401 {error: "密码错误"}
        浏览器-->>用户: 显示错误提示
    end
```
<a href="https://caoergou.github.io/mermzen/#jZJtSxtBEMff-ykGX2lRTKVWOFARez5VjeYOfFmWZA1Hz7v09kQkHFRBDaJEUEtSChrwCR8aS9Wg1vbT7N3mW7jZxXA2p-29OnbmN_-Z_wzBn-awlcTvDJR20GwT8A8lXduBYPvYz1XEQwY5rpE0Mshywb_Ks6McLR43RPonR_xvG3StFBVM4JRBgl9b9LzQEBtf0KbGmsSzFG3v7a3LKEBLp3SlyC4Pab5CyyvB3iK9uQ6WbujqXVC8o_c7gqwDHA53osBkXNOhA2WMDtNOGxZk5wh2LDSL23gXhMzbTsqT6mGOlwn1rMCQqoPgP8wgw1TqRTxBhlLbGxqg-z_Y5YF_VvJ3LqAl1hopJkxQQFPH1AEdXsFgIj4ONREC08NqQoVHwZ4-gYv8Ri1pIPt-UfNFbtN0QdpWPVln5cXq56_sz6oIRbTxd7VdP7cJo9M66PZHbEHLsNbZ9bb1OfqJYxp3jGBCDNtSsm4N96A7FY0-3XhnLAbx9yChNjG5V-fCiw5fyXmBLh_wFSWRqfH7RWkcgXBGOqQAq_xk92fVwy_V0pXIxCbBj05tF1m5_F9TjkwMJF44jH9M-ib2GrLYcWxHgeawdrP3cvd-4Xewfytz_fwm_5czWKkH" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `sequenceDiagram` | 声明时序图 |
| `participant A` | 声明参与者 |
| `participant A as 别名` | 带别名的参与者 |
| `actor A` | 小人图标参与者 |
| `A->>B: msg` | 实线带箭头 |
| `B-->>A: msg` | 虚线带箭头 |
| `A-)B: msg` | 异步消息 |
| `Note over A,B: text` | 横跨备注 |
| `loop 条件 ... end` | 循环块 |
| `alt/else/end` | 条件分支 |
| `opt 条件 ... end` | 可选操作 |
| `par/and/end` | 并行操作 |

## 下一步

了解时序图后，继续学习 [Mermaid 甘特图](gantt.html)，用于展示项目任务与时间线安排。





# Mermaid Sequence Diagram Tutorial

<span class="post-meta">2026-03-04 · MermZen Tutorials

A Sequence Diagram shows how multiple participants exchange messages over time. Unlike flowcharts, the key question is: **who sends what to whom, and when**. It's ideal for API call chains, user-system interactions, and microservice communication.

## Declaring Participants

```
sequenceDiagram
    participant User
    participant Server
    participant Database
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShdDi1CIMweDUojIswi6JJYlJicWpAA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `sequenceDiagram` declares the diagram type
- `participant name` explicitly declares a participant and **controls left-to-right order**
- Undeclared names used in messages are created automatically (in order of appearance)
- Use `actor name` to render a participant as a stick figure (real people)

**Aliases** keep code concise when display names are long:

```
sequenceDiagram
    participant U as User
    participant S as API Server
    U->>S: Send request
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShVCFxGKF0OLUIgyZYJCMY4CnQnBqURlUPlTXzi7YCiiSl6JQBDK5uAQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Message Arrow Types

Mermaid provides six arrow styles covering sync, async, and error scenarios:

```
sequenceDiagram
    A->>B: Solid open arrow (sync call)
    B-->>A: Dashed open arrow (sync response)
    A->B: Solid, no arrow
    A-->B: Dashed, no arrow
    A-xB: Solid with cross (failure/discard)
    A-)B: Solid async arrow (non-blocking)
    A--)B: Dashed async arrow
```
<a href="https://caoergou.github.io/mermzen/#bc5BDoJADAXQvafoEhKJexYkEG7gCepQYeLYYitBby8ZGGKi3f6X32_0mIgdtR57xfsBlquLqmpKOEvwHchIDKgqM2T2ZgcOQ8ija4oF1iW0aAP9kUo2ChvlqTWVHoFllVsSo7XmJ3vtU2b_HMCpmEF2RR8mpVPnzaF26UW-Y4wTtjksXFyCuJvnPtFot-lf-AM" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| Syntax | Common use |
|--------|-----------|
| `A->>B: msg` | Synchronous call, HTTP request |
| `B-->>A: msg` | Return value, HTTP response |
| `A-)B: msg` | Async message, event publish |
| `A-xB: msg` | Failed call, dropped message |

## Notes

Add annotations beside participants:

```
sequenceDiagram
    participant A
    participant B
    Note right of A: Annotation for A
    Note over A,B: Spans multiple participants
    A->>B: Message
```
<a href="https://caoergou.github.io/mermzen/#ZYwxCsNADAT7vGIfEH_AheFMWqfJC4SRLwJbupzkvD_HkSKQ7XaZHefXybryTShXOi5oKVRDVimkgfS3zH25WzCq5GfANqQRSdWCQkyxWf3-OmVvbv06j3g0geM495Cy86_VO56GaWrYwu6U-QM" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Control Structures

### Loop

```
sequenceDiagram
    loop Every 30 seconds
        Client->>Server: heartbeat ping
        Server-->>Client: pong
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgpz8_AIF17LUokoFYwOF4tTk_LyUYrAMCDjnZKbmleja2QWnFgHVWClkpCYWlSSlJpYoFGTmpcPVQaR1gQohOqwUCvKh0ql5KQA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Conditional (alt / else)

```
sequenceDiagram
    Client->>Server: POST /login
    alt Credentials valid
        Server-->>Client: 200 OK + Token
    else Wrong password
        Server-->>Client: 401 Unauthorized
    else Account locked
        Server-->>Client: 403 Forbidden
    end
```
<a href="https://caoergou.github.io/mermzen/#fc4_C8JADAXw3U-RXYr1z9ShIIqLQ4VWnONdqEfjRXPXCn56a4u49a1570cCPVvyhvYOa8X7DPrs2JGPSZ6XpB1pBqeirGDBUjs_FJAj7JRs33LIATpkZ4fLN-Mq6fcjlMEqTaE4whwqaWgkiAPBRcXX8MAQXqJTwCZdwtljG2-i7k32T2yNkdZHYDENTRNrOIhenbW_F7z9AA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Optional (opt)

```
sequenceDiagram
    Server->>Client: Return data
    opt Notifications enabled
        Server->>PushService: Send push notification
    end
```
<a href="https://caoergou.github.io/mermzen/#VYwxEoMwEAP7vOI-wAdc0JCayYQXHLZIbgbOYJ_zfowrok5aSRlHgXo8hT-JtwdVTUg_pK7vh1Wg5ugNK0kpsHErxN1ojCaLeDaJmgnK84rQ6N_Fq-TvZcTD1VQD7TUhva3bqJIT" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Parallel (par)

```
sequenceDiagram
    par Execute in parallel
        Server->>EmailService: Send email
    and
        Server->>SMSService: Send SMS
    end
```
<a href="https://caoergou.github.io/mermzen/#K04tLE3NS051yUxML0rM5VIAgoLEIgXXitTk0pJUhcw8EDcxJyc1BywHAsGpRWWpRbp2dq65iZk5IF5mcqoVUDgvRSEVJARWmZiXgqkj2DcYVT1QAKwKyAYA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: HTTP Login Flow

```
sequenceDiagram
    actor User
    participant Browser
    participant APIServer
    participant Redis
    participant MySQL

    User->>Browser: Fill in credentials and submit
    Browser->>APIServer: POST /api/login {username, password}

    APIServer->>Redis: GET login_fail:{username}
    Redis-->>APIServer: Fail count (0)

    APIServer->>MySQL: SELECT * FROM users WHERE username=?
    MySQL-->>APIServer: User record

    alt Password valid
        APIServer->>APIServer: Generate JWT Token (HS256)
        APIServer->>Redis: SET session:{token} 7d
        APIServer-->>Browser: 200 OK {token, user}
        Browser->>Browser: Store in localStorage
        Browser-->>User: Redirect to dashboard
    else Wrong password
        APIServer->>Redis: INCR login_fail:{username}
        APIServer-->>Browser: 401 {error: "Invalid password"}
        Browser-->>User: Show error message
    end
```
<a href="https://caoergou.github.io/mermzen/#fZJbT8JAEIXf_RUnPonRiMZL0kSNYlG8gbSERzO2I25cdnF3kRjS_-52waqA9qm7Pd-cOTO1_DZmlfGFoIGh4Rr8Q5nTBj3LJhxHZJzIxIiUw7nRk1X3Z51WwuZ9xZcu58Iu3d59JA-3a-G69Nk-OZlXjtAUUkIoZIZzVk6QtCCVw46fhsIFZK71VOUbodNOUuzQSOxIPfD8dOwlioa85Z2tnWiTFzPHCvIFQnsRLuMUAXt8JiGjii0CEETbv-2aXodMj32YjXptuXBIGCGJb-NGik00u-07lGUt-ldxN8aXxfFpYIN-waMcDQxnvvWZAUmHzjwM3kmKPFwvev8occmKDTnGdT9Fql9ZYeMq2Ts4rK0k5-NI_DgsWyu0iqaupAocrfL6ubi9eh3tG8z0WyFfUSHfK6v0if_LuNy01BnJ8kQDXgI80QvysjU_CwenkZN9edJkZi2xtIy-0WpQbfq_cK37RvefZf8dcL--iykbo_37ekuF-VeO68XfrScveoIAYuin-hWTVf4J" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Description |
|--------|-------------|
| `sequenceDiagram` | Declare diagram type |
| `participant A` | Declare participant |
| `participant A as alias` | Participant with alias |
| `actor A` | Stick-figure participant |
| `A->>B: msg` | Solid arrow |
| `B-->>A: msg` | Dashed arrow |
| `A-)B: msg` | Async arrow |
| `Note over A,B: text` | Spanning note |
| `loop cond ... end` | Loop block |
| `alt/else/end` | Conditional branch |
| `opt cond ... end` | Optional block |
| `par/and/end` | Parallel block |

## Next Up

After sequence diagrams, learn [Mermaid Gantt Charts](gantt.html) to visualize project timelines and task dependencies.



---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://caoergou.github.io/mermzen/)，然后将代码粘贴进去。
