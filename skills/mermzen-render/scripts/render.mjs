#!/usr/bin/env node
/**
 * MermZen CLI — render Mermaid diagrams via MermZen's online embed page.
 * Only dependency: puppeteer. No need to clone the MermZen repository.
 *
 * Usage:
 *   node render.mjs --code "graph TD; A-->B" --output out.svg
 *   node render.mjs --file diagram.mmd --output out.png --format png
 */

import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { deflateSync } from 'zlib';

// Resolved as a normal ESM import: works when `npm install puppeteer` was run
// anywhere from the current directory up to an ancestor (including a project
// root that contains this skill, e.g. after `npx skills add`).
let puppeteer;
try {
  puppeteer = await import('puppeteer');
} catch {
  console.error('Error: puppeteer is required. Install it with: npm install puppeteer');
  process.exit(1);
}

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; };

if (args.includes('--help') || args.includes('-h')) {
  console.log(`MermZen CLI — render Mermaid diagrams with hand-drawn style

Usage: node render.mjs --code "graph TD; A-->B" --output out.svg

Options:
  --code <string>      Mermaid code (mutually exclusive with --file)
  --file <path>        Path to a .mmd file
  --output <path>      Output file path (default: ./mermzen-output.<format>)
  --format <fmt>       svg or png (default: svg)
  --theme <name>       default, dark, forest, neutral, base
  --look <style>       handDrawn or classic (default: handDrawn)
  --font <name>        kalam, caveat (default: kalam; CJK auto-uses Xiaolai SC)
  --font-size <px>     Font size in pixels (default: 16)
  --bg <color>         transparent, grid, or any CSS color (default: transparent)
  --scale <n>          Device scale factor for PNG (default: 2)
  --width <px>         Minimum PNG canvas width; grows to fit large diagrams (default: 1400)
  --height <px>        Minimum PNG canvas height; grows to fit large diagrams (default: 900)
  --base-url <url>     MermZen instance URL (default: https://eric.run.place/MermZen)

Notes:
  --width/--height/--scale only affect PNG output; SVG always exports at its
  natural vector size. Diagrams always render at 1:1 scale (never shrunk to
  fit), so PNG resolution matches the diagram's true size regardless of
  --width/--height.`);
  process.exit(0);
}

const code = get('--code') || (get('--file') ? readFileSync(resolve(get('--file')), 'utf-8').trim() : null);
if (!code) { console.error('Error: provide --code or --file'); process.exit(1); }

const format = (get('--format') || 'svg').toLowerCase();
const output = resolve(get('--output') || `mermzen-output.${format}`);
const bg = get('--bg') || 'transparent';
const theme = get('--theme');
const look = get('--look');
const font = get('--font');
const fontSize = get('--font-size');
const scale = parseInt(get('--scale') || '2', 10);
const width = parseInt(get('--width') || '1400', 10);
const height = parseInt(get('--height') || '900', 10);
const BASE = get('--base-url') || 'https://eric.run.place/MermZen';

// Encode for embed.html (v2 JSON + deflate + base64url)
const payload = JSON.stringify({ v: 2, c: code, ...(bg !== 'transparent' && { bg }) });
const compressed = deflateSync(Buffer.from(payload, 'utf-8'));
const encoded = compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

// Build URL with query params for style overrides
const params = new URLSearchParams({ export: '1' });
if (theme) params.set('theme', theme);
if (look) params.set('look', look);
if (font) params.set('font', font);
if (fontSize) params.set('fontSize', fontSize);
const url = `${BASE}/embed.html?${params}#${encoded}`;

mkdirSync(dirname(output), { recursive: true });

const launch = puppeteer.default?.launch ?? puppeteer.launch;
const browser = await launch.call(puppeteer.default ?? puppeteer, { headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: scale });

console.log(`Rendering ${format.toUpperCase()}...`);
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForSelector('#diagram svg', { timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1500));

if (format === 'svg') {
  const svg = await page.evaluate(() => {
    const el = document.querySelector('#diagram svg');
    if (!el) return null;
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    el.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    return el.outerHTML;
  });
  if (!svg) throw new Error('SVG element not found');
  writeFileSync(output, svg, 'utf-8');
} else {
  // embed.html renders at natural 1:1 scale in export mode (no shrink-to-fit),
  // but grow the viewport to the diagram's real size anyway so large diagrams
  // never get clipped by the initial --width/--height viewport.
  const natural = await page.evaluate(() => {
    const svg = document.querySelector('#diagram svg');
    if (!svg) return null;
    return {
      w: parseFloat(svg.style.width) || svg.getBoundingClientRect().width,
      h: parseFloat(svg.style.height) || svg.getBoundingClientRect().height,
    };
  });
  if (natural) {
    const pad = 32;
    const neededWidth = Math.ceil(natural.w) + pad * 2;
    const neededHeight = Math.ceil(natural.h) + pad * 2;
    if (neededWidth > width || neededHeight > height) {
      await page.setViewport({
        width: Math.max(width, neededWidth),
        height: Math.max(height, neededHeight),
        deviceScaleFactor: scale,
      });
      await new Promise(r => setTimeout(r, 200));
    }
  }

  const el = await page.$('#diagram svg');
  if (!el) throw new Error('SVG element not found');
  await el.screenshot({ path: output, type: 'png' });
}

await browser.close();
console.log(`Done: ${output}`);
