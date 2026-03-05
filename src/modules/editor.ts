import { basicSetup, EditorView } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { linter, lintGutter, setDiagnostics } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mermaid as mermaidLang } from "codemirror-lang-mermaid";
import { oneDark } from "@codemirror/theme-one-dark";
import { LanguageSupport } from "@codemirror/language";
import mermaid from 'mermaid';
import { state } from './store';
import { dom } from './dom';
import { formatMermaidCode } from './formatter';
import { mermaidExtHighlight } from './mermaid-highlight-ext';

// 语言支持 Compartment，用于动态切换
const languageCompartment = new Compartment();

let currentDiagnostics = [];
let lintTimer = null;

/**
 * 获取编辑器当前代码
 */
export function getCode() {
  return state.editorView ? state.editorView.state.doc.toString() : '';
}

/**
 * 清除所有诊断信息（错误提示）
 */
export function clearDiagnostics() {
  if (!state.editorView) return;
  currentDiagnostics = [];
  state.editorView.dispatch(setDiagnostics(state.editorView.state, []));
}

function extractLineFromError(err) {
  const msg = err.message || String(err);
  const lineMatch = msg.match(/line\s+(\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  if (err.hash && err.hash.line != null) return err.hash.line + 1;
  return null;
}

/**
 * 从错误对象推送诊断信息到编辑器
 */
export function pushDiagnosticFromError(msg, errObj) {
  if (!state.editorView) return;
  const lineNum = errObj ? extractLineFromError(errObj) : null;
  const lineMatchFallback = typeof msg === 'string' ? msg.match(/line\s+(\d+)/i) : null;
  const line = lineNum || (lineMatchFallback ? parseInt(lineMatchFallback[1], 10) : null);
  let from = 0, to = 1;
  if (line) {
    try {
      const docLine = state.editorView.state.doc.line(line);
      from = docLine.from;
      to = docLine.to || docLine.from + 1;
    } catch (e) { /* line out of range */ }
  } else {
    try {
      const firstLine = state.editorView.state.doc.line(1);
      from = firstLine.from;
      to = firstLine.to;
    } catch (e) {}
  }
  const diag = [{ from, to, severity: 'error' as const, message: typeof msg === 'string' ? msg : String(msg) }];
  currentDiagnostics = diag;
  state.editorView.dispatch(setDiagnostics(state.editorView.state, diag));
}

/**
 * 滚动到指定行
 */
export function scrollToLine(lineNum) {
  if (!state.editorView) return;
  try {
    const line = state.editorView.state.doc.line(lineNum);
    state.editorView.dispatch({
      selection: { anchor: line.from, head: line.to },
      scrollIntoView: true,
    });
    state.editorView.focus();
  } catch (e) { /* line out of range */ }
}

/**
 * 安排 Lint 检查（防抖）
 */
export function scheduleLint() {
  clearTimeout(lintTimer);
  lintTimer = setTimeout(async () => {
    const code = getCode().trim();
    if (!code) { clearDiagnostics(); return; }
    try {
      await mermaid.parse(code);
      clearDiagnostics();
    } catch (err) {
      const msg = err.message || String(err);
      pushDiagnosticFromError(msg, err);
    }
  }, 200);
}

function buildEditorTheme(dark) {
  return EditorView.theme({
    '&': {
      height: '100%',
      fontSize: '13.5px',
      fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
    },
    '.cm-scroller': { overflow: 'auto', lineHeight: '1.65' },
    '.cm-content': { padding: '16px' },
    '.cm-focused': { outline: 'none' },
    '.cm-gutters': {
      background: dark ? '#0a0a18' : '#1a1a2e',
      borderRight: '1px solid ' + (dark ? '#1a1a30' : '#2a2a40'),
      color: '#555',
    },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 8px 0 4px', minWidth: '28px' },
    '.cm-activeLine': { background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.04)' },
    '.cm-activeLineGutter': { background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.06)' },
    '.cm-selectionBackground, ::selection': { background: '#3a5a8a !important' },
  }, { dark: true });
}

/**
 * 检测图表类型是否需要扩展高亮
 */
function needsExtHighlight(code) {
  const firstLine = code.trim().split('\n')[0];
  return /^(classDiagram|erDiagram|stateDiagram|gitGraph|timeline|xychart|architecture|block)/i.test(firstLine);
}

/**
 * 获取当前应使用的语言支持
 */
function getLanguageSupport(code) {
  if (needsExtHighlight(code)) {
    return new LanguageSupport(mermaidExtHighlight());
  }
  return mermaidLang();
}

/**
 * 创建编辑器实例
 * @param {string} initialCode - 初始代码
 * @param {(doc: string) => void} onDocChange - 文档变更回调
 */
export function createEditor(initialCode, onDocChange) {
  // 只在需要时添加扩展，减少初始化时间
  const extensions = [
    basicSetup,
    languageCompartment.of(getLanguageSupport(initialCode)),
    oneDark,
    buildEditorTheme(true),
    lintGutter(),
    linter(() => currentDiagnostics, { delay: 0 }),
    keymap.of([{
      key: 'Tab',
      run(view) {
        view.dispatch(view.state.replaceSelection('  '));
        return true;
      }
    }]),
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        const code = update.state.doc.toString();

        // 动态切换语言支持
        const currentLang = getLanguageSupport(code);
        update.view.dispatch({
          effects: languageCompartment.reconfigure(currentLang)
        });

        onDocChange(code);
      }
    }),
  ];

  // 延迟创建编辑器实例，让浏览器先处理其他任务
  setTimeout(() => {
    state.editorView = new EditorView({
      state: EditorState.create({ doc: initialCode, extensions }),
      parent: dom.editorContainer,
    });
  }, 50);
}

/**
 * 格式化当前代码
 */
export function formatCode() {
  if (!state.editorView) return;
  const code = state.editorView.state.doc.toString();
  const formatted = formatMermaidCode(code);
  if (formatted === code) return;
  const cursor = state.editorView.state.selection.main.head;
  state.editorView.dispatch({
    changes: { from: 0, to: state.editorView.state.doc.length, insert: formatted },
    selection: { anchor: Math.min(cursor, formatted.length) },
  });
}
