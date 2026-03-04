/**
 * Mermaid 语法高亮扩展
 * 为 codemirror-lang-mermaid 未覆盖的图表类型添加基础关键字高亮
 * 支持：classDiagram, erDiagram, stateDiagram, gitGraph, timeline, xychart, architecture, block-beta
 */

import { StreamLanguage } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

/**
 * 创建简单的 Mermaid 扩展语法高亮器
 */
function createMermaidExtHighlighter() {
  return {
    startState() {
      return { diagramType: null, inString: false };
    },

    token(stream, state) {
      // 跳过空白
      if (stream.eatSpace()) return null;

      // 注释（行首 %%）
      if (stream.match(/^%%/)) {
        stream.skipToEnd();
        return "comment";
      }

      // 检测图表类型（第一行，非注释）
      if (!state.diagramType && stream.sol()) {
        if (stream.match(/classDiagram/)) {
          state.diagramType = 'class';
          return "keyword";
        }
        if (stream.match(/erDiagram/)) {
          state.diagramType = 'er';
          return "keyword";
        }
        if (stream.match(/stateDiagram(-v2)?/)) {
          state.diagramType = 'state';
          return "keyword";
        }
        if (stream.match(/gitGraph/)) {
          state.diagramType = 'git';
          return "keyword";
        }
        if (stream.match(/timeline/)) {
          state.diagramType = 'timeline';
          return "keyword";
        }
        if (stream.match(/xychart(-beta)?/)) {
          state.diagramType = 'xychart';
          return "keyword";
        }
        if (stream.match(/architecture(-beta)?/)) {
          state.diagramType = 'architecture';
          return "keyword";
        }
        if (stream.match(/block(-beta)?/)) {
          state.diagramType = 'block';
          return "keyword";
        }
      }

      // classDiagram 关键字
      if (state.diagramType === 'class') {
        if (stream.match(/^(class|interface|enum|abstract|namespace|annotation)/)) return "keyword";
        if (stream.match(/^(public|private|protected|internal|static|abstract|final)/)) return "modifier";
        if (stream.match(/^(\+|-|#|~)/)) return "operator";
        if (stream.match(/^(<\|--|<\|\.\.|\*--|o--|<--|\.\.|--|>|<|\|>)/)) return "operator";
        if (stream.match(/^(implements|extends|aggregation|composition|association|dependency)/)) return "keyword";
        if (stream.match(/^(<<|>>)/)) return "meta";
      }

      // erDiagram 关键字
      if (state.diagramType === 'er') {
        if (stream.match(/^(\|\|--|o\|--|\}\|--|\|\{--|\|o--|\}o--|\|\|\.\.|\}\}\.\.|\|o\.\.|\}o\.\.)/)) return "operator";
        if (stream.match(/^(one|zero or one|zero or more|one or more|only one)/)) return "keyword";
        if (stream.match(/^(PK|FK|UK)/)) return "modifier";
      }

      // stateDiagram 关键字
      if (state.diagramType === 'state') {
        if (stream.match(/^(state|direction|note|fork|join|choice|concurrent)/)) return "keyword";
        if (stream.match(/^(\[\*\])/)) return "operator";
        if (stream.match(/^(-->|--)/)) return "operator";
        if (stream.match(/^(TB|BT|LR|RL)/)) return "keyword";
      }

      // gitGraph 关键字
      if (state.diagramType === 'git') {
        if (stream.match(/^(commit|branch|checkout|merge|cherry-pick|reset|revert|tag)/)) return "keyword";
        if (stream.match(/^(id|msg|tag|type)/)) return "property";
        if (stream.match(/^(NORMAL|REVERSE|HIGHLIGHT)/)) return "keyword";
      }

      // timeline 关键字
      if (state.diagramType === 'timeline') {
        if (stream.match(/^(title|section)/)) return "keyword";
      }

      // xychart 关键字
      if (state.diagramType === 'xychart') {
        if (stream.match(/^(title|x-axis|y-axis|line|bar)/)) return "keyword";
        if (stream.match(/^\[.*?\]/)) return "bracket";
      }

      // architecture 关键字
      if (state.diagramType === 'architecture') {
        if (stream.match(/^(service|database|queue|group|junction)/)) return "keyword";
        if (stream.match(/^(icon|label|in|out)/)) return "property";
      }

      // block 关键字
      if (state.diagramType === 'block') {
        if (stream.match(/^(block|columns|space)/)) return "keyword";
      }

      // 通用：字符串
      if (stream.match(/^"([^"\\]|\\.)*"/)) return "string";
      if (stream.match(/^'([^'\\]|\\.)*'/)) return "string";
      if (stream.match(/^`([^`\\]|\\.)*`/)) return "string";

      // 通用：数字
      if (stream.match(/^-?\d+(\.\d+)?/)) return "number";

      // 通用：冒号（属性分隔符）
      if (stream.match(/^:/)) return "punctuation";

      // 通用：方向关键字
      if (stream.match(/^(TB|BT|LR|RL)/)) return "keyword";

      // 默认：跳过当前字符
      stream.next();
      return null;
    },

    languageData: {
      commentTokens: { line: "%%" }
    }
  };
}

/**
 * 导出扩展语法高亮 Language
 */
export function mermaidExtHighlight() {
  return StreamLanguage.define(createMermaidExtHighlighter());
}
