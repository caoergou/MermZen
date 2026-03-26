/**
 * 生成 PNG 预览图用于 README
 * 依赖：Vite preview 服务需在 8766 端口运行
 *
 * 用法：
 * npx tsx scripts/generate-preview-pngs.ts [port]
 *
 * 参数：
 *   port  - 服务端口，默认 8766
 */
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const port = args.find(a => !a.startsWith('--')) ? parseInt(args.find(a => !a.startsWith('--'))!, 10) : 8766;

interface DiagramDef {
  name: string;
  width: number;
  height: number;
  code: string;
  bg?: string; // 'grid' | custom color, defaults to transparent
}

function encodeForEmbed(code: string, bg?: string): string {
  const payload: { v: number; c: string; bg?: string } = { v: 2, c: code };
  if (bg && bg !== 'transparent') payload.bg = bg;
  const compressed = zlib.deflateSync(Buffer.from(JSON.stringify(payload), 'utf-8'));
  return compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

const BASE_URL = `http://localhost:${port}`;
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

const DIAGRAMS: DiagramDef[] = [
  {
    name: 'preview-flowchart',
    width: 800,
    height: 1000,
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
    name: 'preview-flowchart-en',
    width: 800,
    height: 1000,
    code: `graph TD
    A([Start]) --> B[User enters credentials]
    B --> C{Account exists?}
    C -->|No| D[Show error]
    D --> B
    C -->|Yes| E{Password valid?}
    E -->|No| F[Increment fail count]
    F --> G{Fails >= 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to dashboard]
    J --> K([End])`,
  },
  {
    name: 'preview-architecture',
    width: 900,
    height: 800,
    code: `graph TD
    subgraph 客户端层
        A[用户端 Web]
        B[管理后台]
        C[移动APP]
    end

    subgraph 接入层
        D[CDN 静态资源]
        E[API 网关]
        F[WAF 防火墙]
    end

    subgraph 业务服务层
        G[用户服务]
        H[订单服务]
        I[支付服务]
        J[商品服务]
        K[消息服务]
    end

    subgraph 数据层
        L[(MySQL 主库)]
        M[(MySQL 从库)]
        N[(Redis 缓存)]
        O[(MongoDB 日志)]
        P[(Elasticsearch 搜索)]
    end

    A & B & C --> D
    D --> E
    E --> F
    F --> G & H & I & J & K
    G & H & I & J --> L
    L --> M
    G & H & J --> N
    K --> O
    J --> P`,
  },
  {
    name: 'preview-architecture-en',
    width: 900,
    height: 800,
    code: `graph TD
    subgraph Client Layer
        A[User Web]
        B[Admin Dashboard]
        C[Mobile APP]
    end

    subgraph Edge Layer
        D[CDN Static]
        E[API Gateway]
        F[WAF Firewall]
    end

    subgraph Service Layer
        G[User Service]
        H[Order Service]
        I[Payment Service]
        J[Product Service]
        K[Message Service]
    end

    subgraph Data Layer
        L[(MySQL Master)]
        M[(MySQL Slave)]
        N[(Redis Cache)]
        O[(MongoDB Logs)]
        P[(Elasticsearch Search)]
    end

    A & B & C --> D
    D --> E
    E --> F
    F --> G & H & I & J & K
    G & H & I & J --> L
    L --> M
    G & H & J --> N
    K --> O
    J --> P`,
  },
  {
    name: 'preview-sequence',
    width: 1200,
    height: 800,
    bg: 'grid',
    code: `sequenceDiagram
    actor 用户
    participant 浏览器
    participant API服务器
    participant Redis缓存
    participant MySQL

    用户->>浏览器: 填写账号密码并点击登录
    浏览器->>API服务器: POST /api/login
    API服务器->>Redis缓存: GET login_fail:username
    Redis缓存-->>API服务器: 失败次数 (0)
    API服务器->>MySQL: SELECT user WHERE username=?
    MySQL-->>API服务器: 用户记录
    alt 密码验证通过
        API服务器->>Redis缓存: SET session:token 7d
        API服务器-->>浏览器: 200 OK + Token
        浏览器-->>用户: 跳转首页
    else 密码错误
        API服务器->>Redis缓存: INCR login_fail:username
        API服务器-->>浏览器: 401 Unauthorized
        浏览器-->>用户: 显示错误提示
    end`,
  },
  {
    name: 'preview-sequence-en',
    width: 1200,
    height: 800,
    bg: 'grid',
    code: `sequenceDiagram
    actor User
    participant Browser
    participant API
    participant Redis
    participant MySQL

    User->>Browser: Enter credentials and click login
    Browser->>API: POST /api/login
    API->>Redis: GET login_fail:username
    Redis-->>API: Fail count (0)
    API->>MySQL: SELECT user WHERE username=?
    MySQL-->>API: User record
    alt Password valid
        API->>Redis: SET session:token 7d
        API-->>Browser: 200 OK + Token
        Browser-->>User: Redirect to dashboard
    else Password invalid
        API->>Redis: INCR login_fail:username
        API-->>Browser: 401 Unauthorized
        Browser-->>User: Show error message
    end`,
  },
];

async function generatePNGs(): Promise<void> {
  if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const { name, code, width, height, bg } of DIAGRAMS) {
    console.log(`\nRendering ${name}.png...`);

    // Use deviceScaleFactor: 2 for high-DPI screenshots
    const context = await browser.newContext({
      viewport: { width: 1400, height: 1200 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    const encoded = encodeForEmbed(code, bg);
    const url = `${BASE_URL}/MermZen/embed.html#${encoded}`;

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    try {
      // Wait for SVG to be rendered
      await page.waitForSelector('#diagram svg', { timeout: 10000 });
      // Enable hand-drawn style with correct project fonts (Xiaolai SC for Chinese, Kalam for English)
      await page.evaluate(() => {
        // @ts-ignore
        if (window.mermaid) {
          // @ts-ignore
          window.mermaid.setConfig({
            theme: 'default',
            handDrawn: true,
            themeVariables: {
              fontFamily: '"Kalam", "Xiaolai SC", cursive'
            }
          });
        }
        // Add custom font style to enforce correct fonts
        const style = document.createElement('style');
        style.textContent = `
          * {
            font-family: 'Kalam', 'Xiaolai SC', cursive !important;
          }
        `;
        document.head.appendChild(style);
      });
    // Wait for all fonts to load completely (especially Chinese fonts)
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Explicitly load Chinese fonts with fallbacks
      try { await document.fonts.load('16px "Xiaolai SC"'); } catch (e) {}
      try { await document.fonts.load('16px "Noto Sans CJK SC"'); } catch (e) {}
      try { await document.fonts.load('16px "Noto Sans CJK TC"'); } catch (e) {}
      // Extra wait for custom handwritten fonts to be applied
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
    } catch {
      console.error(`  ✗ Timeout waiting for SVG: ${name}`);
      await page.close();
      await context.close();
      continue;
    }

    // Get SVG element
    const svgElement = await page.$('#diagram svg');
    if (!svgElement) {
      console.error(`  ✗ No SVG found for ${name}`);
      await page.close();
      await context.close();
      continue;
    }

    // Get SVG bounding box and scroll into view
    const svgBox = await svgElement.boundingBox();
    if (!svgBox) {
      console.error(`  ✗ Could not get SVG bounding box for ${name}`);
      await page.close();
      await context.close();
      continue;
    }

    // Add padding around the SVG
    const padding = 20;
    const svgWidth = Math.ceil(svgBox.width) + padding * 2;
    const svgHeight = Math.ceil(svgBox.height) + padding * 2;

    // Set viewport to fit the SVG with padding
    await page.setViewportSize({
      width: Math.min(svgWidth, 2400),
      height: Math.min(svgHeight, 1600)
    });

    // Scroll SVG into center view
    await page.evaluate(() => {
      const svg = document.querySelector('#diagram svg');
      if (svg) {
        svg.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
      }
    });

    // Wait for stabilization
    await page.waitForTimeout(500);

    const outPath = path.join(ASSETS_DIR, `${name}.png`);

    // Take screenshot of the SVG element
    await svgElement.screenshot({
      path: outPath,
      type: 'png'
    });

    console.log(`  ✓ Saved ${name}.png (${svgWidth}x${svgHeight})`);

    await page.close();
    await context.close();
  }

  await browser.close();
  console.log('\n✓ All PNG previews generated');
}

generatePNGs().catch(console.error);
