/**
 * 使用 Playwright 渲染 Mermaid 手绘风格图表，导出 SVG 文件到 assets/
 * 用法：npx tsx scripts/generate-preview-svgs.ts
 * 依赖：Vite preview 服务需在 8766 端口运行（npm run build 后 npx vite preview --port 8766）
 *       pip3 install fonttools brotli  （用于 CJK 字体子集嵌入）
 */

import { chromium } from '@playwright/test';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DiagramDef {
  name: string;
  code: string;
  embedFont: boolean;
}

// 使用与 embed.html 一致的编码方式（v2 JSON + deflate + base64url）
function encodeForEmbed(code: string): string {
  const payload = JSON.stringify({ v: 2, c: code });
  const compressed = zlib.deflateSync(Buffer.from(payload, 'utf-8'));
  return compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

// 生成后调用 Python 脚本为含 CJK 字符的 SVG 嵌入字体子集
function embedCjkFont(svgPath: string): void {
  const script = path.join(__dirname, 'embed-cjk-font.py');
  try {
    execFileSync('python3', [script, svgPath], { stdio: 'inherit' });
  } catch (e: any) {
    console.warn(`  ⚠ Font embedding failed (non-fatal): ${e.message}`);
  }
}

const BASE_URL = 'http://localhost:8766/MermZen';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// ── 中文图表（用于 README.zh.md）───────────────────────────────────────────
const ZH_DIAGRAMS: DiagramDef[] = [
  {
    name: 'preview-flowchart',
    embedFont: true,
    code: `graph TD
    A([开始]) --> B[用户输入账号 / 密码]
    B --> C{账号是否存在?}
    C -->|否| D[提示账号不存在]
    D --> B
    C -->|是| E{密码是否正确?}
    E -->|否| F[记录失败次数]
    F --> G{失败次数 ≥ 3?}
    G -->|是| H[锁定账号 30 分钟]
    G -->|否| B
    E -->|是| I[生成 Session Token]
    I --> J[跳转首页]
    J --> K([结束])`,
  },
  {
    name: 'preview-sequence',
    embedFont: true,
    code: `sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant API as API服务器
    participant Redis
    participant MySQL

    User->>Browser: 填写账号密码并登录
    Browser->>API: POST /api/login

    API->>Redis: GET login_fail:username
    Redis-->>API: 失败次数 (0)

    API->>MySQL: SELECT user WHERE username=?
    MySQL-->>API: 用户记录

    alt 密码验证通过
        API->>Redis: SET session:token 7d
        API-->>Browser: 200 OK + Token
        Browser-->>User: 跳转首页
    else 密码错误
        API->>Redis: INCR login_fail:username
        API-->>Browser: 401 Unauthorized
        Browser-->>User: 显示错误提示
    end`,
  },
  {
    name: 'preview-class',
    embedFont: true,
    code: `classDiagram
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
    OrderItem "*..*" --> "1" Product : 引用`,
  },
];

// ── 英文图表（用于 README.md）──────────────────────────────────────────────
const EN_DIAGRAMS: DiagramDef[] = [
  {
    name: 'preview-flowchart-en',
    embedFont: false,
    code: `graph TD
    A([Start]) --> B[Enter username / password]
    B --> C{Account exists?}
    C -->|No| D[Account not found]
    D --> B
    C -->|Yes| E{Password correct?}
    E -->|No| F[Record failure count]
    F --> G{Failures >= 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to home]
    J --> K([End])`,
  },
  {
    name: 'preview-sequence-en',
    embedFont: false,
    code: `sequenceDiagram
    participant User
    participant Browser
    participant API as API Server
    participant Redis
    participant MySQL

    User->>Browser: Enter credentials & login
    Browser->>API: POST /api/login

    API->>Redis: GET login_fail:username
    Redis-->>API: Failure count (0)

    API->>MySQL: SELECT user WHERE username=?
    MySQL-->>API: User record

    alt Password correct
        API->>Redis: SET session:token 7d
        API-->>Browser: 200 OK + Token
        Browser-->>User: Redirect to home
    else Wrong password
        API->>Redis: INCR login_fail:username
        API-->>Browser: 401 Unauthorized
        Browser-->>User: Show error
    end`,
  },
  {
    name: 'preview-class-en',
    embedFont: false,
    code: `classDiagram
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
    User "1" --> "0..*" Order : places
    Order "1" *-- "1..*" OrderItem : contains
    OrderItem "*..*" --> "1" Product : references`,
  },
];

async function generateSVGs(): Promise<void> {
  if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const browser = await chromium.launch();

  const allDiagrams = [...ZH_DIAGRAMS, ...EN_DIAGRAMS];

  for (const { name, code, embedFont } of allDiagrams) {
    console.log(`\nRendering ${name}...`);

    // 每个图表使用独立 page，避免同域哈希跳转不重载页面的问题
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    const encoded = encodeForEmbed(code);
    const url = `${BASE_URL}/embed.html#${encoded}`;

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    try {
      await page.waitForSelector('#diagram svg', { timeout: 30000 });
      await page.waitForTimeout(800);
    } catch {
      console.error(`  ✗ Timeout waiting for SVG: ${name}`);
      await page.close();
      continue;
    }

    const svgContent = await page.evaluate(() => {
      const svgEl = document.querySelector('#diagram svg');
      if (!svgEl) return null;
      svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgEl.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      return svgEl.outerHTML;
    });

    if (!svgContent) {
      console.error(`  ✗ No SVG found for ${name}`);
      await page.close();
      continue;
    }

    const outPath = path.join(ASSETS_DIR, `${name}.svg`);
    fs.writeFileSync(outPath, svgContent, 'utf-8');
    console.log(`  ✓ Saved ${name}.svg`);
    await page.close();

    if (embedFont) {
      embedCjkFont(outPath);
    }
  }

  await browser.close();
  console.log('\nAll SVGs generated.');
}

generateSVGs().catch(e => {
  console.error(e);
  process.exit(1);
});
