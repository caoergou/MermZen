# MermZen

[![Deploy to GitHub Pages](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml/badge.svg)](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoergou/mermzen)](https://github.com/caoergou/mermzen/stargazers)

**MermZen** 是简洁无广告的在线 Mermaid 图表编辑器，名称取自 **Mermaid**（图表语法）与 **Zen**（专注），无需登录、无需安装，打开即用。

**在线体验：[MermZen](https://eric.run.place/MermZen/)**

[English](README.md)

---

## 主要功能

- 实时预览，输入后 300ms 自动渲染
- 支持 11 种图表类型：流程图、时序图、类图、甘特图、饼图、思维导图、ER 图、状态图、架构图、Git 图、块图
- 一键导出 SVG 或 PNG（PNG 以 2 倍分辨率渲染，适合高清场景）
- 支持复制 PNG 到剪贴板，方便粘贴到文档或聊天工具
- 分享链接功能，图表内容编码在 URL 中，无需后端
- 手绘风格模式，让图表看起来更自然
- 5 种 Mermaid 主题，支持深色/浅色 UI 切换
- 预览区支持缩放、平移，可开启棋盘格背景方便查看透明图
- 语法错误提示精确到行号，方便快速定位问题
- 内置示例模板与交互式引导教程，上手零门槛
- 预览区支持右键上下文菜单，快速下载或复制 PNG/SVG

---

## 快捷键

| 操作 | 快捷键 |
| --- | --- |
| 保存（选格式） | `Ctrl+S` |
| 复制 PNG | `Ctrl+Shift+C` |
| 格式化代码 | `Ctrl+Shift+F` |
| 命令面板 | `Ctrl+K` |
| 文件/编辑/视图/帮助菜单 | `Alt+F/E/V/H` |
| 切换预览背景 | `Alt+1/2/3/4` |

## 本地运行

无需构建与包管理器，用静态服务器即可：

```bash
python3 -m http.server
# 访问 http://localhost:8000
```

或直接在浏览器中打开 `index.html`。
