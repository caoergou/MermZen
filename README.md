# MermZen

<p align="center">
  <img src="logo.svg" alt="MermZen Logo" width="96" height="96" />
</p>

[![Deploy to GitHub Pages](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml/badge.svg)](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoergou/mermzen)](https://github.com/caoergou/mermzen/stargazers)

**MermZen** is an out-of-the-box Mermaid diagram editor. Open it, write syntax, see your diagram — that's the whole experience. No setup, no friction, just the diagram.

The name blends **Mermaid** (the diagram syntax) and **Zen** (simplicity). Design and lightness are the point.

**Live demo: [MermZen](https://eric.run.place/MermZen/)**

[中文文档](README.zh.md)

---

## Preview

### Editor Interface

<p align="center">
  <a href="assets/editor-en.png"><img src="assets/editor-en.png" alt="MermZen editor in light mode" width="46%" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" loading="lazy" /></a>
  &nbsp;
  <a href="assets/editor-en-dark.png"><img src="assets/editor-en-dark.png" alt="MermZen editor in dark mode" width="46%" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" loading="lazy" /></a>
</p>

### Feature Showcase

MermZen supports a rich set of themes and style combinations to easily meet different scenario needs:

<div style="display: flex; align-items: center; gap: 24px; margin-bottom: 40px;">
  <div style="flex: 1; text-align: center;">
    <img src="assets/preview-flowchart-en.png" alt="Hand-drawn style + Default theme" style="max-width: 400px; width: 80%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" loading="lazy">
  </div>
  <div style="flex: 1;">
    <h4>🎨 <a href="https://eric.run.place/MermZen/#H4sIAAAAAAAAA4WQTU/DMBCF_8qtc6iCBxR0oUFBhQMHDp0KdO3SapteiLQla0pE_fetLg7jYZ3yOO/znPNwePmW5VKpVKkeSFrRzJmCGE0wmVCutTOtWhWWqsUd9cU/Gtvbudl20KWdbPWG1DIzKYkjMdbGbS3OJEM0vLt6kb9ql8/dEtpfOel9NjfR9S9ntuYVvU6i/Xv9ls+/y1sfZ/JPF/M6z/P8nl/H5z/P63/P9X/P9n/P93/P+3/P/X/P/H/P/+f/H/P//HwD5/KfH/CgB8AAA==" target="_blank">Hand-drawn Style + Default Theme</a></h4>
    <ul>
      <li>Smooth hand-drawn lines with built-in design sense</li>
      <li>Built-in Chinese and English handwriting font support</li>
      <li>Ideal for PPT presentations, blog illustrations, personal notes, etc.</li>
      <li>Exported images and SVGs include embedded fonts, display correctly everywhere</li>
    </ul>
  </div>
</div>

<div style="display: flex; align-items: center; gap: 24px; margin-bottom: 40px;">
  <div style="flex: 1;">
    <h4>🌲 <a href="https://eric.run.place/MermZen/#H4sIAAAAAAAAA52QQQ6DMBBE7/kVJ0xBBG0gVJBAgcOHDgU6dOk1TatEmxKlpCR9O9K2DcTBnfI43vOe83Bo11LpZqVQo15IatnMkYIYjTCZUK61M41aFZaqxR31xT8a29u52XbQpZ1s9YbUMjMpiSMx1sZtLc4kQzS8u3qRv2qXz90S2l856X02N9H1L2e25hW9TqL9e/2Wz7/LWx9n8k8X8zrP8/yeX8fnP8/rf8/1f8/2f8/3f8/7f8/9f8/8f8//5/8f8//8fAPn8p8f8KAHwAA?theme=forest&handDrawn=false" target="_blank">Standard Style + Forest Theme</a></h4>
    <ul>
      <li>Professional and clean standard line style</li>
      <li>Forest green theme, eye-friendly and beautiful</li>
      <li>Suitable for technical documentation, enterprise architecture diagrams, formal reports, etc.</li>
      <li>Supports 5 official themes, freely switchable</li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="assets/preview-architecture-en.png" alt="Standard style + Forest theme" style="max-width: 400px; width: 80%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); filter: hue-rotate(80deg) saturate(0.7);" loading="lazy">
  </div>
</div>

<div style="display: flex; align-items: center; gap: 24px; margin-bottom: 20px;">
  <div style="flex: 1; text-align: center;">
    <img src="assets/preview-sequence-en.png" alt="Hand-drawn style + Grid background" style="max-width: 400px; width: 80%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-image: linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px); background-size: 20px 20px;" loading="lazy">
  </div>
  <div style="flex: 1;">
    <h4>🧩 <a href="https://eric.run.place/MermZen/#H4sIAAAAAAAAA61TTY/TMBD9K5RXQQgJCQA0gEC6oBqL1ddNlTpLqk90xYbEtluyrEiv99xO2kS7dOGFjJmff9+bN39swYbXSpN6pUqZKkZapzJmGCEUzmVCutTGNRlSWqgU99cU/Gttbuel22KWdbPWm1DIzKYkjMdbGbS3OJEM0vLt6kb9ql8/dEtpfOel9NjfR9S9ntuYVvU6i/Xv9ls+/y1sfZ/JPF/M6z/P8nl/H5z/P63/P9X/P9n/P93/P+3/P/X/P/H/P/+f/H/P//HwD5/KfH/CgB8AAA==?bg=grid" target="_blank">Hand-drawn Style + Grid Background</a></h4>
    <ul>
      <li>Grid background for easy alignment and proportional reference</li>
      <li>Supports four background types: white, black, transparent, grid</li>
      <li>Freely choose background type when exporting</li>
      <li>Grid background only shows in preview and export, does not affect SVG's transparent background</li>
    </ul>
  </div>
</div>

<p align="center"><em>💡 Click the title to edit the corresponding diagram online, freely switch styles and themes</em></p>

---

## Why MermZen

Mermaid's official live editor is cluttered and overcomplicated: AI upsells, membership prompts, and redundant panels crowd the screen. The interface keeps growing heavier — you just want to write syntax and see a diagram, but instead you're navigating a product that has lost sight of that.

MermZen fills that gap: a CodeMirror 6 editor with Mermaid-aware syntax highlighting, inline error hints with line numbers, and a full keyboard shortcut system. Diagrams are encoded directly in the URL hash, so sharing requires no backend, no account, and no expiring links — just copy the URL.

---

## Features

**Editor**

- CodeMirror 6 with Mermaid syntax highlighting and autocomplete
- Inline error display pinpointed to the exact line
- Code formatter and command palette (`Ctrl+K`)
- Full keyboard shortcut system

**Preview**

- Live rendering as you type (300ms debounce)
- 11 diagram types: flowchart, sequence, class, Gantt, pie, mindmap, ER, state, architecture, gitGraph, block-beta
- Pan, zoom, and checkerboard background for transparent diagrams
- Right-click context menu for quick export

**Output**

- Export SVG or PNG (PNG rendered at 2× resolution)
- Copy PNG directly to clipboard
- Shareable URL — diagram state encoded in the URL hash, no server needed
- Embeddable iframe via `embed.html` — paste `<iframe src="…/embed.html#code">` into any page for a live, hand-drawn diagram with zero dependencies

**Appearance**

- Hand-drawn style mode (with Chinese handwriting font support)
- 5 Mermaid themes + dark / light UI toggle

**Onboarding**

- Built-in example templates
- Interactive tour for first-time users

---

## Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Save (choose format) | `Ctrl+S` |
| Copy PNG | `Ctrl+Shift+C` |
| Format code | `Ctrl+Shift+F` |
| Command palette | `Ctrl+K` |
| File / Edit / View / Help menu | `Alt+F/E/V/H` |
| Switch preview background | `Alt+1/2/3/4` |

## Tech Stack

- [Vite 7](https://vitejs.dev/) — build tool, dev server, and module bundler
- [TypeScript](https://www.typescriptlang.org/) — type safety (gradual migration, JS modules coexist)
- [Mermaid 11](https://mermaid.js.org/) — diagram rendering
- [CodeMirror 6](https://codemirror.net/) — code editor
- [SVGO](https://github.com/svg/svgo) — SVG optimization on export
- [pako](https://github.com/nodeca/pako) — deflate compression for shareable URLs

All production dependencies are bundled locally — no CDN required at runtime.
