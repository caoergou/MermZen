---
name: mermzen-render
description: >
  Render Mermaid diagrams to SVG or PNG using MermZen's local Playwright pipeline.
  Supports hand-drawn style, multiple themes, CJK fonts, and transparent/grid backgrounds.
when_to_use: >
  When the user asks to generate, render, or export a Mermaid diagram as an image file
  (SVG or PNG). Also when creating diagrams for documentation, blog posts, README files,
  or presentations. Triggers: "render diagram", "mermaid to svg", "mermaid to png",
  "generate diagram", "draw flowchart", "draw sequence diagram".
argument-hint: "[--code <mermaid> | --file <path>] [--output <path>] [--format svg|png] [--theme <theme>]"
allowed-tools:
  - Bash(npx tsx *)
  - Bash(npm run build)
  - Bash(ls *)
  - Read
---

# MermZen Render

Render Mermaid code into high-quality SVG or PNG via MermZen's Playwright-based pipeline.

## Prerequisites

The render script lives in the MermZen project. Before first use:

```bash
cd ${CLAUDE_PROJECT_DIR}
npm install
npx playwright install chromium
npm run build  # builds dist/ needed by Vite preview
```

> The script auto-detects whether Vite preview is running. If not, it spawns one
> automatically and tears it down after rendering.

## Usage

### From inline code

```bash
npx tsx ${CLAUDE_SKILL_DIR}/../../scripts/render-diagram.ts \
  --code "graph TD; A-->B-->C" \
  --output /path/to/output.svg
```

### From a .mmd file

```bash
npx tsx ${CLAUDE_SKILL_DIR}/../../scripts/render-diagram.ts \
  --file diagram.mmd \
  --output output.png \
  --format png
```

### Full parameter reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--code` | string | — | Mermaid code (mutually exclusive with `--file`) |
| `--file` | path | — | Path to a `.mmd` file containing Mermaid code |
| `--output` | path | `./mermzen-output.<fmt>` | Output file path |
| `--format` | `svg` \| `png` | `svg` | Output format |
| `--theme` | string | `hand-drawn` | Diagram theme (see below) |
| `--font` | string | `kalam` | Handwriting font family |
| `--bg` | string | `transparent` | Background: CSS color, `transparent`, or `grid` |
| `--width` | number | `1200` | PNG viewport width in px |
| `--height` | number | `900` | PNG viewport height in px |
| `--port` | number | `8766` | Vite preview server port |

### Available themes

`hand-drawn` (default), `default`, `dark`, `forest`, `neutral`, `base`

### Available fonts

- `kalam` — Latin handwriting (default); auto-falls back to Xiaolai SC for CJK
- `caveat` — Alternative Latin handwriting

### CJK support

Chinese, Japanese, and Korean text is fully supported. The renderer uses Xiaolai SC
as the CJK handwriting font. No extra configuration is needed — just include CJK
characters in your Mermaid code.

## Workflow

```
1. Check prerequisites (npm install, dist/ exists)
2. Call render-diagram.ts with desired parameters
   ├── Auto-detects Vite preview on --port
   ├── Spawns server if not running
   ├── Renders via Playwright + embed.html
   └── Kills server if it was auto-spawned
3. Output file is written to --output path
```

## Examples

### Hand-drawn flowchart (SVG)

```bash
npx tsx scripts/render-diagram.ts \
  --code "graph TD
    A([Start]) --> B[Process Data]
    B --> C{Valid?}
    C -->|Yes| D[Save]
    C -->|No| E[Retry]
    E --> B
    D --> F([Done])" \
  --output flowchart.svg \
  --theme hand-drawn
```

### Sequence diagram with grid background (PNG)

```bash
npx tsx scripts/render-diagram.ts \
  --code "sequenceDiagram
    Alice->>Bob: Hello
    Bob-->>Alice: Hi!" \
  --output seq.png \
  --format png \
  --bg grid \
  --width 1000 --height 600
```

### Chinese content

```bash
npx tsx scripts/render-diagram.ts \
  --code "graph TD
    A([开始]) --> B[处理数据]
    B --> C([结束])" \
  --output chinese.svg
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `dist/ 目录不存在` | Project not built | Run `npm run build` |
| Timeout waiting for server | Port conflict or incomplete build | Check `dist/`, try different `--port` |
| CJK font rendering issues | Font not loaded in time | For SVGs, run `scripts/embed-cjk-font.py` to embed font subsets |
| Blank PNG | Render timeout | Increase wait time in script |
