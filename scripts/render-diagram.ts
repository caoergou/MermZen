/**
 * 通用 Mermaid 图表渲染脚本，供 AI Agent (mermzen-render Skill) 调用
 *
 * 用法：
 *   npx tsx scripts/render-diagram.ts --code "graph TD; A-->B" --output out.svg
 *   npx tsx scripts/render-diagram.ts --file diagram.mmd --output out.png --format png
 *
 * 参数：
 *   --code    <string>  Mermaid 代码（与 --file 二选一）
 *   --file    <path>    包含 Mermaid 代码的文件路径
 *   --output  <path>    输出文件路径（默认：./mermzen-output.<format>）
 *   --format  svg|png   输出格式（默认：svg）
 *   --theme   default|hand-drawn|dark|forest|neutral|base  主题（默认：hand-drawn）
 *   --font    kalam|caveat|default  手绘字体（默认：kalam）
 *   --bg      <color>|transparent|grid  背景色（默认：transparent）
 *   --width   <number>  PNG 宽度，单位 px（默认：1200）
 *   --height  <number>  PNG 高度，单位 px（默认：900）
 *   --port    <number>  Vite preview 服务端口（默认：8766）
 */

import { chromium } from '@playwright/test';
import { execFileSync, spawn } from 'child_process';
import fs from 'fs';
import net from 'net';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

// ── 参数解析 ────────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      result[key] = argv[i + 1] ?? 'true';
      i++;
    }
  }
  return result;
}

const rawArgs = parseArgs(process.argv.slice(2));

const port = parseInt(rawArgs.port ?? '8766', 10);
const format = (rawArgs.format ?? 'svg').toLowerCase() as 'svg' | 'png';
const theme = rawArgs.theme ?? 'hand-drawn';
const font = rawArgs.font ?? 'kalam';
const bg = rawArgs.bg ?? 'transparent';
const width = parseInt(rawArgs.width ?? '1200', 10);
const height = parseInt(rawArgs.height ?? '900', 10);
const outputPath = rawArgs.output ?? path.join(process.cwd(), `mermzen-output.${format}`);

// 读取 Mermaid 代码
let code: string;
if (rawArgs.file) {
  const filePath = path.resolve(rawArgs.file);
  if (!fs.existsSync(filePath)) {
    console.error(`错误：文件不存在：${filePath}`);
    process.exit(1);
  }
  code = fs.readFileSync(filePath, 'utf-8').trim();
} else if (rawArgs.code) {
  code = rawArgs.code;
} else {
  console.error('错误：请通过 --code 或 --file 提供 Mermaid 代码');
  process.exit(1);
}

// ── URL 编码（与 embed.html 保持一致：v2 JSON + deflate + base64url）────────

function encodeForEmbed(mermaidCode: string, bgColor?: string): string {
  const payload: { v: number; c: string; bg?: string } = { v: 2, c: mermaidCode };
  if (bgColor && bgColor !== 'transparent') payload.bg = bgColor;
  const compressed = zlib.deflateSync(Buffer.from(JSON.stringify(payload), 'utf-8'));
  return compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

// ── 服务检测与自启动 ─────────────────────────────────────────────────────────

async function isPortOpen(p: number): Promise<boolean> {
  return new Promise(resolve => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => { socket.destroy(); resolve(true); });
    socket.on('error', () => resolve(false));
    socket.on('timeout', () => { socket.destroy(); resolve(false); });
    socket.connect(p, 'localhost');
  });
}

async function waitForPort(p: number, retries = 30, interval = 500): Promise<void> {
  for (let i = 0; i < retries; i++) {
    if (await isPortOpen(p)) return;
    await new Promise(r => setTimeout(r, interval));
  }
  throw new Error(`等待服务启动超时（端口 ${p}）`);
}

// ── 主流程 ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // 确保输出目录存在
  const outDir = path.dirname(path.resolve(outputPath));
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 检查 dist/ 是否存在（Vite preview 需要先 build）
  const distDir = path.join(PROJECT_ROOT, 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('错误：dist/ 目录不存在，请先运行 npm run build');
    process.exit(1);
  }

  // 检测 Vite preview 服务是否已在运行
  const serverAlreadyRunning = await isPortOpen(port);
  let serverProcess: ReturnType<typeof spawn> | null = null;

  if (!serverAlreadyRunning) {
    console.log(`启动 Vite preview 服务（端口 ${port}）...`);
    serverProcess = spawn('npx', ['vite', 'preview', '--port', String(port)], {
      cwd: PROJECT_ROOT,
      stdio: 'ignore',
      detached: false,
    });
    try {
      await waitForPort(port);
      console.log('服务已就绪');
    } catch (e) {
      serverProcess.kill();
      throw e;
    }
  } else {
    console.log(`检测到服务已在端口 ${port} 运行`);
  }

  const BASE_URL = `http://localhost:${port}/MermZen`;
  const encoded = encodeForEmbed(code, bg);
  const url = `${BASE_URL}/embed.html#${encoded}`;

  const browser = await chromium.launch();

  try {
    if (format === 'svg') {
      await renderSVG(browser, url, outputPath);
    } else {
      await renderPNG(browser, url, outputPath, width, height, theme, font);
    }
  } finally {
    await browser.close();
    // 如果是我们自己启动的服务，渲染完成后清理
    if (serverProcess) {
      serverProcess.kill();
      console.log('Vite preview 服务已关闭');
    }
  }
}

// ── SVG 渲染 ─────────────────────────────────────────────────────────────────

async function renderSVG(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  url: string,
  outPath: string,
): Promise<void> {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  console.log(`渲染 SVG：${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForSelector('#diagram svg', { timeout: 30000 });
  await page.waitForTimeout(800);

  const svgContent = await page.evaluate(() => {
    const el = document.querySelector('#diagram svg');
    if (!el) return null;
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    el.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    return el.outerHTML;
  });

  if (!svgContent) throw new Error('未找到 SVG 元素');

  fs.writeFileSync(outPath, svgContent, 'utf-8');
  console.log(`✓ SVG 已保存：${outPath}`);
  await page.close();
}

// ── PNG 渲染 ─────────────────────────────────────────────────────────────────

async function renderPNG(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  url: string,
  outPath: string,
  vpWidth: number,
  vpHeight: number,
  mermaidTheme: string,
  fontFamily: string,
): Promise<void> {
  const context = await browser.newContext({
    viewport: { width: vpWidth, height: vpHeight },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`渲染 PNG：${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('#diagram svg', { timeout: 30000 });

  // 注入字体和主题覆盖
  await page.evaluate(
    ({ theme: t, font: f }) => {
      // @ts-ignore
      if (window.mermaid) {
        // @ts-ignore
        window.mermaid.setConfig({
          theme: t === 'hand-drawn' ? 'default' : t,
          handDrawn: t === 'hand-drawn',
          themeVariables: { fontFamily: `'${f}', cursive` },
        });
      }
      const style = document.createElement('style');
      style.textContent = `* { font-family: '${f}', cursive !important; }`;
      document.head.appendChild(style);
    },
    { theme: mermaidTheme, font: fontFamily },
  );

  // 等待字体加载完成
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  const svgEl = await page.$('#diagram svg');
  if (!svgEl) throw new Error('未找到 SVG 元素');

  const box = await svgEl.boundingBox();
  if (!box) throw new Error('无法获取 SVG 边界');

  const padding = 20;
  await page.setViewportSize({
    width: Math.min(Math.ceil(box.width) + padding * 2, 3000),
    height: Math.min(Math.ceil(box.height) + padding * 2, 2000),
  });

  await page.evaluate(() => {
    document.querySelector('#diagram svg')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(300);

  await svgEl.screenshot({ path: outPath, type: 'png' });
  console.log(`✓ PNG 已保存：${outPath}`);

  await page.close();
  await context.close();
}

// ── 入口 ─────────────────────────────────────────────────────────────────────

main().catch(e => {
  console.error('渲染失败：', e.message ?? e);
  process.exit(1);
});
