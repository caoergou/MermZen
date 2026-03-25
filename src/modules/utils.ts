import { dom } from './dom';
import { state } from './store';

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function extractErrorLine(err: unknown): number | null {
  const msg = (err as { message?: string })?.message || String(err);
  const lineMatch = msg.match(/line\s+(\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  if ((err as { hash?: { line?: number } })?.hash?.line != null) {
    return (err as { hash: { line: number } }).hash.line + 1;
  }
  return null;
}

export function getFriendlyHint(msg: string, lang: 'zh' | 'en'): string {
  const lower = msg.toLowerCase();
  if (lang === 'zh') {
    if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return '代码可能不完整，请检查是否有未闭合的括号或缺少 end 关键字';
    if (/unknown diagram type/i.test(msg)) return '未知的图表类型，支持的类型包括：graph, sequenceDiagram, classDiagram, gantt, pie, mindmap 等';
    if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return '箭头语法错误，常见格式：-->, ---, ===>, -.->，请检查连接线格式';
    if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return '存在未闭合的引号、括号或代码块';
    if (/participant/i.test(msg)) return '时序图参与者声明有误，格式：participant 名称';
    if (/subgraph/i.test(msg)) return 'subgraph 块语法有误，确保每个 subgraph 都有对应的 end';
    return '请检查语法是否正确，可参考示例下拉菜单中的模板';
  }
  if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return 'Code appears incomplete. Check for unclosed brackets or missing "end" keywords.';
  if (/unknown diagram type/i.test(msg)) return 'Unknown diagram type. Supported types: graph, sequenceDiagram, classDiagram, gantt, pie, mindmap, etc.';
  if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return 'Arrow syntax error. Common formats: -->, ---, ===>, -.->';
  if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return 'Unterminated string, bracket, or code block detected.';
  if (/participant/i.test(msg)) return 'Participant declaration error. Format: participant Name';
  if (/subgraph/i.test(msg)) return 'Subgraph syntax error. Each subgraph needs a matching "end".';
  return 'Check your syntax. See Help for example templates.';
}

export function showToast(message: string): void {
  dom.toast.textContent = message;
  dom.toast.classList.add('show');
  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => { dom.toast.classList.remove('show'); }, 2200);
}

export function updateEditorStatus(): void {
  const val = state.editorView ? state.editorView.state.doc.toString() : '';
  const lines = val ? val.split('\n').length : 0;
  dom.editorStatus.textContent = state.currentLang === 'zh'
    ? lines + ' 行 · ' + val.length + ' 字符'
    : lines + ' lines · ' + val.length + ' chars';
}

export function setRenderStatus(s: string, text: string): void {
  dom.renderStatus.textContent = text || '';
  dom.renderStatus.className = 'render-status' + (s ? ' visible ' + s : '');
}

export function btnSuccess(btn: HTMLElement): void {
  btn.classList.add('success');
  setTimeout(() => { btn.classList.remove('success'); }, 1200);
}

export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function openHelp(): void {
  if (dom.helpModal) dom.helpModal.classList.add('open');
}

export function closeHelp(): void {
  if (dom.helpModal) dom.helpModal.classList.remove('open');
}
