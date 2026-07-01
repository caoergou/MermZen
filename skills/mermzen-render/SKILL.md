---
name: mermzen-render
description: >
  Render Mermaid diagrams to SVG or PNG with MermZen's hand-drawn style, CJK font support,
  and multiple themes. Use when asked to generate, render, or export a Mermaid diagram as
  an image file. Triggers: "render diagram", "mermaid to svg", "mermaid to png",
  "generate diagram", "draw flowchart", "draw sequence diagram", "export diagram".
compatibility: Requires Node.js 18+ and Puppeteer (auto-installed on first run via npx)
allowed-tools: Bash(node *) Bash(npx *)
---

# MermZen Render

Render Mermaid code into high-quality SVG or PNG via MermZen's online rendering engine.
No need to clone any repository — the script uses the deployed MermZen instance at
`https://eric.run.place/MermZen/embed.html` as the rendering backend.

## Prerequisites

The render script requires **Node.js 18+** and **Puppeteer**. Install Puppeteer if not
already available:

```bash
npm install -g puppeteer
```

## Usage

```bash
node scripts/render.mjs --code "graph TD; A-->B-->C" --output diagram.svg
```

### From a .mmd file

```bash
node scripts/render.mjs --file diagram.mmd --output output.png --format png
```

### Parameters

| Parameter  | Default               | Description                                          |
|------------|-----------------------|------------------------------------------------------|
| `--code`   | —                     | Inline Mermaid code (mutually exclusive with `--file`) |
| `--file`   | —                     | Path to a `.mmd` file containing Mermaid code        |
| `--output` | `./mermzen-output.<fmt>` | Output file path                                  |
| `--format` | `svg`                 | `svg` or `png`                                       |
| `--bg`     | `transparent`         | CSS color, `transparent`, or `grid`                  |
| `--width`  | `1400`                | PNG viewport width (px)                              |
| `--height` | `900`                 | PNG viewport height (px)                             |
| `--base-url` | `https://eric.run.place/MermZen` | Override the MermZen instance URL       |

### Available themes and fonts

The MermZen instance renders with **hand-drawn style** by default, using:
- **Kalam** font for Latin text
- **Xiaolai SC** font for CJK (Chinese/Japanese/Korean) — automatic, no config needed

### Examples

#### Hand-drawn flowchart (SVG)

```bash
node scripts/render.mjs \
  --code "graph TD
    A([Start]) --> B[Process]
    B --> C{Valid?}
    C -->|Yes| D[Save]
    C -->|No| E[Retry]
    E --> B
    D --> F([Done])" \
  --output flowchart.svg
```

#### Chinese content (PNG)

```bash
node scripts/render.mjs \
  --code "graph TD
    A([开始]) --> B[处理数据]
    B --> C([结束])" \
  --output chinese.png \
  --format png
```

#### Grid background

```bash
node scripts/render.mjs \
  --code "sequenceDiagram
    Alice->>Bob: Hello
    Bob-->>Alice: Hi!" \
  --output seq.png \
  --format png \
  --bg grid
```

## How it works

1. Encodes the Mermaid code using deflate + base64url (matching MermZen's URL format)
2. Opens MermZen's online `embed.html` via Puppeteer with `?export=1` to hide UI chrome
3. Waits for Mermaid to render and fonts to load
4. Extracts the SVG from the DOM or takes a PNG screenshot
5. Writes the result to the output file

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Cannot find module 'puppeteer'` | Run `npm install -g puppeteer` |
| Timeout / blank output | Check network connectivity (the script fetches from eric.run.place) |
| CJK text clipped | Re-run — font CDN may have been slow on first load |
