export const DEFAULT_CODE = `graph TD
    A[浏览商品 Browse] --> B[加入购物车 Cart]
    B --> C{已登录? Login?}
    C -->|否 No| D[登录 Sign in]
    C -->|是 Yes| E[提交订单 Order]
    D --> E
    E --> F[在线支付 Pay]
    F --> G[商家发货 Ship]`;

export const EXAMPLES_ZH = [
  { label: '流程图', code: 'graph TD\n    A[浏览商品] --> B[加入购物车]\n    B --> C{已登录?}\n    C -->|否| D[登录 / 注册]\n    C -->|是| E[提交订单]\n    D --> E\n    E --> F[在线支付]\n    F --> G{支付成功?}\n    G -->|是| H[商家发货]\n    G -->|否| E\n    H --> I[确认收货]' },
  { label: '时序图', code: 'sequenceDiagram\n    participant 顾客\n    participant 小程序\n    participant 后厨\n    顾客->>小程序: 扫码下单\n    小程序->>后厨: 推送订单\n    后厨-->>小程序: 已接单\n    小程序-->>顾客: 预计 15 分钟\n    后厨->>小程序: 出餐完成\n    小程序-->>顾客: 取餐通知' },
  { label: '类图', code: 'classDiagram\n    class User["用户"] {\n        +String 昵称\n        +String 手机号\n        +下单()\n    }\n    class Order["订单"] {\n        +String 订单号\n        +Date 创建时间\n        +计算总价()\n    }\n    User "1" --> "*" Order : 拥有' },
  { label: '甘特图', code: 'gantt\n    title 产品上线计划\n    dateFormat YYYY-MM-DD\n    section 需求阶段\n    需求调研: 2026-06-01, 5d\n    需求评审: 2026-06-06, 2d\n    section 研发阶段\n    UI 设计: 2026-06-08, 5d\n    前后端开发: 2026-06-13, 10d\n    section 上线\n    联调测试: 2026-06-23, 5d\n    正式发布: 2026-06-28, 1d' },
  { label: '饼图', code: 'pie title 一天的时间分配\n    "工作" : 8\n    "睡眠" : 7\n    "娱乐" : 3\n    "通勤" : 2\n    "其他" : 4' },
  { label: '思维导图', code: 'mindmap\n  root((前端学习路线))\n    基础\n      HTML\n      CSS\n      JavaScript\n    框架\n      Vue\n      React\n    工程化\n      Vite\n      TypeScript' },
  { label: 'ER 图', code: 'erDiagram\n    USER ||--o{ ORDER : 下单\n    ORDER ||--|{ ITEM : 包含\n    PRODUCT ||--o{ ITEM : 对应' },
  { label: '状态图', code: 'stateDiagram-v2\n    [*] --> 待支付\n    待支付 --> 已支付 : 用户付款\n    待支付 --> 已取消 : 超时取消\n    已支付 --> 已发货 : 商家发货\n    已发货 --> 已完成 : 确认收货\n    已完成 --> [*]\n    已取消 --> [*]' },
  { label: '架构图', code: 'architecture-beta\n    group api(cloud)[Cloud API]\n\n    service gateway(internet)[Gateway] in api\n    service worker(server)[Worker] in api\n    service app(server)[App Server] in api\n    service db(database)[Database] in api\n    service cache(database)[Cache] in api\n\n    gateway:B -- T:worker\n    worker:B -- T:app\n    app:B -- T:db\n    app:R -- L:cache' },
  { label: 'Git 图', code: 'gitGraph\n    commit id: "初始化"\n    branch dev\n    checkout dev\n    commit id: "开发新功能"\n    checkout main\n    merge dev\n    commit id: "发布 v1.0"' },
  { label: '块图', code: 'block-beta\n    columns 3\n    A["移动端"] B["Web 端"] C["小程序"]\n    space:3\n    D["API 网关"]:3\n    space:3\n    E["用户服务"] F["订单服务"] G["支付服务"]\n    space:3\n    db[("数据库")]:3\n\n    A --> D\n    B --> D\n    C --> D\n    D --> E\n    D --> F\n    D --> G\n    E --> db\n    F --> db\n    G --> db' },
];

export const EXAMPLES_EN = [
  { label: 'Flowchart', code: 'graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Success]\n    B -->|No| D[Failure]\n    C --> E[End]\n    D --> E' },
  { label: 'Sequence', code: 'sequenceDiagram\n    participant User\n    participant Server\n    User->>Server: Request\n    Server-->>User: Response' },
  { label: 'Class', code: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +fetch()\n    }\n    Animal <|-- Dog' },
  { label: 'Gantt', code: 'gantt\n    title Project Plan\n    dateFormat YYYY-MM-DD\n    section Phase 1\n    Design: 2024-01-01, 7d\n    Dev: 2024-01-08, 14d\n    section Phase 2\n    Test: 2024-01-22, 7d' },
  { label: 'Pie', code: 'pie title Distribution\n    "A" : 40\n    "B" : 30\n    "C" : 20\n    "D" : 10' },
  { label: 'Mindmap', code: 'mindmap\n  root((Core))\n    Branch 1\n      Node 1\n      Node 2\n    Branch 2\n      Node 3' },
  { label: 'ER Diagram', code: 'erDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    PRODUCT ||--o{ LINE-ITEM : includes' },
  { label: 'State', code: 'stateDiagram-v2\n    [*] --> Idle\n    Idle --> Running : Start\n    Running --> Paused : Pause\n    Paused --> Running : Resume\n    Running --> [*] : Stop' },
  { label: 'Architecture', code: 'architecture-beta\n    group api(cloud)[Cloud API]\n\n    service gateway(internet)[Gateway] in api\n    service worker(server)[Worker] in api\n    service app(server)[App Server] in api\n    service db(database)[Database] in api\n    service cache(database)[Cache] in api\n\n    gateway:B -- T:worker\n    worker:B -- T:app\n    app:B -- T:db\n    app:R -- L:cache' },
  { label: 'Git Graph', code: 'gitGraph\n    commit id: "Init"\n    commit id: "Setup CI"\n    branch develop\n    checkout develop\n    commit id: "Add auth"\n    commit id: "Add API"\n    checkout main\n    merge develop\n    commit id: "Release v1.0" tag: "v1.0.0"\n    branch feature\n    checkout feature\n    commit id: "Add tests"\n    checkout develop\n    merge feature\n    checkout main\n    merge develop' },
  { label: 'Block', code: 'block-beta\n    columns 3\n    A["Mobile App"] B["Web App"] C["Admin Console"]\n    space:3\n    D["API Gateway"]:3\n    space:3\n    E["Auth Service"] F["User Service"] G["Data Service"]\n    space:3\n    db[("Database")]:3\n\n    A --> D\n    B --> D\n    C --> D\n    D --> E\n    D --> F\n    D --> G\n    E --> db\n    F --> db\n    G --> db' },
];
