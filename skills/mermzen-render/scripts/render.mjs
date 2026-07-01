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

let puppeteer;
try {
  puppeteer = await import('puppeteer');
} catch {
  try {
    const { createRequire } = await import('module');
    const { execSync } = await import('child_process');
    const globalDir = execSync('npm root -g', { encoding: 'utf-8' }).trim();
    const require = createRequire(globalDir + '/');
    puppeteer = require('puppeteer');
  } catch {
    console.error('Error: puppeteer is required. Install it with: npm install puppeteer');
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; };

const code = get('--code') || (get('--file') ? readFileSync(resolve(get('--file')), 'utf-8').trim() : null);
if (!code) { console.error('Error: provide --code or --file'); process.exit(1); }

const format = (get('--format') || 'svg').toLowerCase();
const output = resolve(get('--output') || `mermzen-output.${format}`);
const bg = get('--bg') || 'transparent';
const width = parseInt(get('--width') || '1400', 10);
const height = parseInt(get('--height') || '900', 10);
const BASE = get('--base-url') || 'https://eric.run.place/MermZen';

// Encode for embed.html (v2 JSON + deflate + base64url)
const payload = JSON.stringify({ v: 2, c: code, ...(bg !== 'transparent' && { bg }) });
const compressed = deflateSync(Buffer.from(payload, 'utf-8'));
const encoded = compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
const url = `${BASE}/embed.html?export=1#${encoded}`;

mkdirSync(dirname(output), { recursive: true });

const launch = puppeteer.default?.launch ?? puppeteer.launch;
const browser = await launch.call(puppeteer.default ?? puppeteer, { headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2 });

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
  const el = await page.$('#diagram svg');
  if (!el) throw new Error('SVG element not found');
  await el.screenshot({ path: output, type: 'png' });
}

await browser.close();
console.log(`Done: ${output}`);
