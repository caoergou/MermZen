---
name: mermzen-render
description: >
  Render Mermaid diagrams to SVG or PNG with MermZen's hand-drawn style, CJK font support,
  and multiple themes. Use when asked to generate, render, or export a Mermaid diagram as
  an image file. Triggers: "render diagram", "mermaid to svg", "mermaid to png",
  "generate diagram", "draw flowchart", "draw sequence diagram", "export diagram".
compatibility: Requires Node.js 18+ and a local Puppeteer install (npm install puppeteer)
---

# MermZen Render

Render Mermaid code into high-quality SVG or PNG via MermZen's online rendering engine.
No need to clone any repository — the script uses the deployed MermZen instance at
`https://eric.run.place/MermZen/embed.html` as the rendering backend.

## Prerequisites

The render script requires **Node.js 18+** and **Puppeteer**, installed locally
(not globally — a global install won't be found by this script's module
resolution):

```bash
npm install puppeteer
```

Run this from your project directory (or anywhere that's an ancestor
directory of wherever this skill is installed) — Node resolves `puppeteer`
by walking up from the script's location, so a local install anywhere above
it in the directory tree works.

## Usage

```bash
node scripts/render.mjs --code "graph TD; A-->B-->C" --output diagram.svg
```

### From a .mmd file

```bash
node scripts/render.mjs --file diagram.mmd --output output.png --format png
```

### Workflow: render, then look at the result

Syntax-valid Mermaid can still render into something visually broken —
clipped labels, a cramped layout, or the wrong orientation. After rendering,
view the output image before reporting success. If rendering fails outright,
check [references/syntax-guide.md](references/syntax-guide.md) for the likely
cause, apply one targeted fix, and retry once before reporting the error to
the user.

### Parameters

| Parameter    | Default               | Description                                            |
|--------------|-----------------------|--------------------------------------------------------|
| `--code`     | —                     | Inline Mermaid code (mutually exclusive with `--file`) |
| `--file`     | —                     | Path to a `.mmd` file containing Mermaid code          |
| `--output`   | `./mermzen-output.<fmt>` | Output file path                                    |
| `--format`   | `svg`                 | `svg` or `png`                                         |
| `--theme`    | (mermaid default)     | `default`, `dark`, `forest`, `neutral`, `base`         |
| `--look`     | `handDrawn`           | `handDrawn` or `classic`                               |
| `--font`     | `kalam`               | `kalam` or `caveat` (CJK auto-uses Xiaolai SC)        |
| `--font-size`| `16`                  | Font size in pixels                                    |
| `--bg`       | `transparent`         | CSS color, `transparent`, or `grid`                    |
| `--scale`    | `2`                   | Device scale factor for PNG (higher = sharper)         |
| `--width`    | `1400`                | Minimum PNG canvas width (px); grows to fit large diagrams |
| `--height`   | `900`                 | Minimum PNG canvas height (px); grows to fit large diagrams |
| `--base-url` | `https://eric.run.place/MermZen` | Override the MermZen instance URL         |

`--width`/`--height`/`--scale` only affect PNG output — SVG always exports at
its natural vector size. Diagrams always render at their true 1:1 size (never
shrunk to fit a small canvas), so PNG resolution reflects the diagram's real
size regardless of `--width`/`--height`; they only set a *minimum* canvas,
useful for adding extra padding around a small diagram.

Run `node scripts/render.mjs --help` for the full usage info.

### Themes, fonts, and styles

- **Hand-drawn** is the default look — set `--look classic` for standard lines
- **Kalam** font for Latin text, **Xiaolai SC** for CJK — automatic, no config needed
- 5 color themes: `default`, `dark`, `forest`, `neutral`, `base`

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

## References

- [references/style-guide.md](references/style-guide.md) — supported diagram
  types, node-count thresholds, direction/layout choices, and styling tips
  for making diagrams look good
- [references/syntax-guide.md](references/syntax-guide.md) — reserved words,
  quoting rules, and other syntax pitfalls that break rendering; read this
  first if a render fails

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Cannot find module 'puppeteer'` | Run `npm install puppeteer` (local, not global — see Prerequisites) |
| Render hangs / times out with no error | Usually a Mermaid syntax error (e.g. a reserved word, unquoted special character) — check [references/syntax-guide.md](references/syntax-guide.md) |
| Timeout / blank output | Check network connectivity (the script fetches from eric.run.place) |
| CJK text clipped | Re-run — font CDN may have been slow on first load |
