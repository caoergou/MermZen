/**
 * Blog 构建脚本：将 blog/zh/posts/*.md 和 blog/en/posts/*.md
 * 转换为 HTML，注入模板，并在每个代码示例后嵌入 iframe 预览。
 * 同时自动更新 index.html 中的文章列表。
 * 用法：npx tsx scripts/build-blog.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const MERMZEN_BASE = 'https://eric.run.place/MermZen/';

interface FrontMeta { [key: string]: string }
interface ParseResult { meta: FrontMeta; body: string }
interface PostInfo { slug: string; title: string; description: string; date: string; }

// 解析 frontmatter（--- key: value --- 格式）
function parseFrontmatter(content: string): ParseResult {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { meta: {}, body: content };
  const meta: FrontMeta = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key) meta[key.trim()] = rest.join(':').trim();
  });
  return { meta, body: content.slice(match[0].length) };
}

// 将 marked 生成的 HTML 里的 "try-in-editor" 链接前插入 iframe 预览
// 匹配 <a href="https://eric.run.place/MermZen/#HASH" ... class="try-in-editor">
function injectIframePreviews(html: string, lang: string): string {
  // embed.html 相对于 blog/zh/ 或 blog/en/ 的路径
  const embedPath = '../../embed.html';
  const MERMZEN_HASH_RE = /href="https:\/\/eric\.run\.place\/MermZen\/#([^"]+)"/;

  return html.replace(
    /<a\s[^>]*class="try-in-editor"[^>]*>[\s\S]*?<\/a>/g,
    match => {
      const hashMatch = match.match(MERMZEN_HASH_RE);
      if (!hashMatch) return match;
      const hash = hashMatch[1];
      const iframeLabel = lang === 'zh' ? '图表预览（手绘风格）' : 'Diagram preview (hand-drawn)';
      const iframe = `<div class="diagram-preview">\n  <iframe\n    src="${embedPath}#${hash}"\n    title="${iframeLabel}"\n    loading="lazy"\n    scrolling="no"\n  ></iframe>\n</div>\n`;
      return iframe + match;
    }
  );
}

// 将模板中的占位符替换为实际内容
function applyTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\$(\w+)\$/g, (_, key) => vars[key] ?? '');
}

// 生成文章列表 HTML
function generatePostListHTML(posts: PostInfo[], lang: string): string {
  const lines: string[] = [];
  for (const post of posts) {
    lines.push(`      <li>`);
    lines.push(`        <a href="${post.slug}.html">${post.title}</a>`);
    lines.push(`        <span class="post-date">${post.date}</span>`);
    lines.push(`        <p>${post.description}</p>`);
    lines.push(`      </li>`);
  }
  return lines.join('\n');
}

// 更新 index.html 中的文章列表
function updateIndexHTML(posts: PostInfo[], lang: string): void {
  const indexPath = path.join(ROOT, 'blog', lang, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn(`  ⚠ index.html not found: ${indexPath}`);
    return;
  }

  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  const postListHTML = generatePostListHTML(posts, lang);

  // 使用标记注释来定位要替换的区域
  const startMarker = '<!-- POST_LIST_START -->';
  const endMarker = '<!-- POST_LIST_END -->';

  if (indexContent.includes(startMarker) && indexContent.includes(endMarker)) {
    const startIndex = indexContent.indexOf(startMarker) + startMarker.length;
    const endIndex = indexContent.indexOf(endMarker);
    indexContent = indexContent.slice(0, startIndex) + '\n' + postListHTML + '\n    ' + indexContent.slice(endIndex);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`  ✓ [${lang}] Updated index.html with ${posts.length} posts`);
  } else {
    console.warn(`  ⚠ [${lang}] index.html missing <!-- POST_LIST_START/END --> markers`);
  }
}

// 构建单个语言的所有文章
function buildLang(lang: string): PostInfo[] {
  const postsDir = path.join(ROOT, 'blog', lang, 'posts');
  const outDir = path.join(ROOT, 'blog', lang);
  const templateFile = path.join(ROOT, 'blog', `_template-${lang}.html`);

  if (!fs.existsSync(postsDir)) {
    console.warn(`  ⚠ posts dir not found: ${postsDir}`);
    return [];
  }
  if (!fs.existsSync(templateFile)) {
    console.warn(`  ⚠ template not found: ${templateFile}`);
    return [];
  }

  const template = fs.readFileSync(templateFile, 'utf-8');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts: PostInfo[] = [];

  for (const file of files) {
    const slug = file.replace('.md', '');
    const source = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { meta, body } = parseFrontmatter(source);

    // 收集文章信息
    posts.push({
      slug,
      title: meta.title || slug,
      description: meta.description || '',
      date: meta.date || '',
    });

    // 转换 Markdown → HTML（marked 默认会直接透传原始 HTML 标签）
    let bodyHTML = marked.parse(body, { gfm: true, breaks: false });

    // 在每个示例后注入 iframe 预览
    bodyHTML = injectIframePreviews(bodyHTML, lang);

    const outHTML = applyTemplate(template, {
      title: meta.title || slug,
      description: meta.description || '',
      date: meta.date || '',
      slug,
      body: bodyHTML,
    });

    const outPath = path.join(outDir, `${slug}.html`);
    fs.writeFileSync(outPath, outHTML, 'utf-8');
    console.log(`  ✓ [${lang}] ${slug}.html`);
  }

  // 按日期排序（新日期在前）
  posts.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title, lang);
    return b.date.localeCompare(a.date);
  });

  return posts;
}

console.log('Building blog posts...');
const zhPosts = buildLang('zh');
const enPosts = buildLang('en');

// 更新 index.html 文章列表
console.log('\nUpdating index files...');
updateIndexHTML(zhPosts, 'zh');
updateIndexHTML(enPosts, 'en');

console.log('\nDone! Blog HTML files generated.');
