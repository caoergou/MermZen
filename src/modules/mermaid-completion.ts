/**
 * Mermaid 智能补全模块
 * 提供基于上下文的代码补全，包括：
 * - 图表类型补全
 * - 图表特定关键字补全
 * - 已定义节点/参与者的引用补全
 * - Frontmatter 和指令补全
 * - 特殊上下文触发（箭头、连线等）
 * - 中英文双语支持
 */

import { Completion, CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import { state } from './store';

// ============ 类型定义 ============

type Lang = 'zh' | 'en';

interface I18nText {
  zh: string;
  en: string;
}

interface MermaidCompletion extends Completion {
  diagramTypes?: string[];
}

interface CompletionCache {
  docLength: number;
  docHash: string;
  diagramType: DiagramType;
  definedNodes: Set<string>;
  definedParticipants: Set<string>;
  definedClasses: Set<string>;
}

// ============ 双语文本定义 ============

const I18N = {
  // 图表类型
  graphTD: { zh: '流程图 (从上到下)', en: 'Flowchart (top to bottom)' },
  graphLR: { zh: '流程图 (从左到右)', en: 'Flowchart (left to right)' },
  graphBT: { zh: '流程图 (从下到上)', en: 'Flowchart (bottom to top)' },
  graphRL: { zh: '流程图 (从右到左)', en: 'Flowchart (right to left)' },
  flowchartTD: { zh: '新版流程图 (从上到下)', en: 'New flowchart (top to bottom)' },
  flowchartLR: { zh: '新版流程图 (从左到右)', en: 'New flowchart (left to right)' },
  flowchartTB: { zh: '新版流程图 (从上到下)', en: 'New flowchart (top to bottom)' },
  sequenceDiagram: { zh: '时序图 - 展示对象间的交互顺序', en: 'Sequence diagram - Show interaction order' },
  classDiagram: { zh: '类图 - 展示类的结构和关系', en: 'Class diagram - Show class structure' },
  classDiagramV2: { zh: '类图 v2', en: 'Class diagram v2' },
  erDiagram: { zh: 'ER 图 - 展示实体关系', en: 'ER diagram - Show entity relationships' },
  stateDiagramV2: { zh: '状态图 v2 - 展示状态转换', en: 'State diagram v2 - Show state transitions' },
  stateDiagram: { zh: '状态图', en: 'State diagram' },
  gantt: { zh: '甘特图 - 项目进度时间线', en: 'Gantt chart - Project timeline' },
  pie: { zh: '饼图 - 展示占比分布', en: 'Pie chart - Show distribution' },
  pieShowData: { zh: '饼图 (显示数据)', en: 'Pie chart (show data)' },
  mindmap: { zh: '思维导图 - 展示层级结构', en: 'Mindmap - Show hierarchy' },
  gitGraph: { zh: 'Git 图 - 展示分支和提交', en: 'Git graph - Show branches and commits' },
  timeline: { zh: '时间线 - 展示事件序列', en: 'Timeline - Show event sequence' },
  journey: { zh: '用户旅程图 - 展示用户体验', en: 'User journey - Show user experience' },
  architecture: { zh: '架构图 - 展示系统架构', en: 'Architecture diagram - Show system architecture' },
  blockBeta: { zh: '块图 - 展示方块布局', en: 'Block diagram - Show block layout' },
  quadrantChart: { zh: '四象限图 - 展示优先级矩阵', en: 'Quadrant chart - Show priority matrix' },
  xychart: { zh: 'XY 图表 - 柱状图和折线图', en: 'XY chart - Bar and line charts' },
  requirementDiagram: { zh: '需求图 - 展示需求追溯', en: 'Requirement diagram - Show requirements' },
  c4Context: { zh: 'C4 架构图 - 系统上下文', en: 'C4 architecture - System context' },

  // 流程图关键字
  subgraph: { zh: '定义子图', en: 'Define subgraph' },
  end: { zh: '结束块', en: 'End block' },
  directionTB: { zh: '方向: 从上到下', en: 'Direction: top to bottom' },
  directionBT: { zh: '方向: 从下到上', en: 'Direction: bottom to top' },
  directionLR: { zh: '方向: 从左到右', en: 'Direction: left to right' },
  directionRL: { zh: '方向: 从右到左', en: 'Direction: right to left' },
  classDef: { zh: '定义样式类', en: 'Define style class' },
  classApply: { zh: '应用样式类到节点', en: 'Apply style class to node' },
  linkStyle: { zh: '链接样式', en: 'Link style' },
  style: { zh: '节点样式', en: 'Node style' },
  click: { zh: '点击事件', en: 'Click event' },
  comment: { zh: '添加注释', en: 'Add comment' },

  // 箭头类型
  arrowSolid: { zh: '实线箭头', en: 'Solid arrow' },
  arrowSolidNoTip: { zh: '实线无箭头', en: 'Solid line (no arrow)' },
  arrowDotted: { zh: '虚线箭头', en: 'Dotted arrow' },
  arrowDottedNoTip: { zh: '虚线无箭头', en: 'Dotted line (no arrow)' },
  arrowThick: { zh: '粗线箭头', en: 'Thick arrow' },
  arrowThickNoTip: { zh: '粗线无箭头', en: 'Thick line (no arrow)' },
  arrowLabeled: { zh: '带标签的箭头', en: 'Labeled arrow' },
  arrowLabeledLine: { zh: '带标签的连线', en: 'Labeled line' },
  arrowDottedLabeled: { zh: '带标签的虚线箭头', en: 'Labeled dotted arrow' },

  // 时序图关键字
  participant: { zh: '定义参与者', en: 'Define participant' },
  actor: { zh: '定义角色 (使用角色图标)', en: 'Define actor (with icon)' },
  box: { zh: '定义参与者分组', en: 'Define participant group' },
  loop: { zh: '循环', en: 'Loop' },
  alt: { zh: '条件分支', en: 'Alternative' },
  altElse: { zh: '否则分支', en: 'Else branch' },
  opt: { zh: '可选', en: 'Optional' },
  par: { zh: '并行', en: 'Parallel' },
  parAnd: { zh: '并行分支', en: 'Parallel branch' },
  critical: { zh: '关键区域', en: 'Critical region' },
  break: { zh: '中断', en: 'Break' },
  noteOver: { zh: '注释覆盖参与者', en: 'Note over participants' },
  noteLeft: { zh: '左侧注释', en: 'Note on left' },
  noteRight: { zh: '右侧注释', en: 'Note on right' },
  activate: { zh: '激活生命线', en: 'Activate lifeline' },
  deactivate: { zh: '停用生命线', en: 'Deactivate lifeline' },
  autonumber: { zh: '自动编号', en: 'Auto numbering' },
  rect: { zh: '背景色块', en: 'Background rect' },

  // 时序图箭头
  seqRequest: { zh: '实线箭头 (请求)', en: 'Solid arrow (request)' },
  seqResponse: { zh: '虚线箭头 (响应)', en: 'Dotted arrow (response)' },
  seqFail: { zh: '实线叉号 (失败)', en: 'Solid cross (failure)' },
  seqFailDotted: { zh: '虚线叉号', en: 'Dotted cross' },
  seqAsync: { zh: '实线开放箭头 (异步)', en: 'Solid open arrow (async)' },
  seqAsyncDotted: { zh: '虚线开放箭头', en: 'Dotted open arrow' },

  // 类图关键字
  class: { zh: '定义类', en: 'Define class' },
  interface: { zh: '定义接口', en: 'Define interface' },
  abstract: { zh: '抽象类', en: 'Abstract class' },
  enum: { zh: '枚举', en: 'Enumeration' },
  namespace: { zh: '命名空间', en: 'Namespace' },
  annotation: { zh: '注解', en: 'Annotation' },
  interfaceMark: { zh: '接口标记', en: 'Interface marker' },
  abstractMark: { zh: '抽象标记', en: 'Abstract marker' },
  enumMark: { zh: '枚举标记', en: 'Enum marker' },
  serviceMark: { zh: '服务标记', en: 'Service marker' },
  visibilityPublic: { zh: 'public 公开', en: 'public' },
  visibilityPrivate: { zh: 'private 私有', en: 'private' },
  visibilityProtected: { zh: 'protected 受保护', en: 'protected' },
  visibilityPackage: { zh: 'package/internal 内部', en: 'package/internal' },
  noteClass: { zh: '注释', en: 'Note' },

  // 类图关系
  inheritance: { zh: '继承关系', en: 'Inheritance' },
  composition: { zh: '组合关系', en: 'Composition' },
  aggregation: { zh: '聚合关系', en: 'Aggregation' },
  association: { zh: '关联关系', en: 'Association' },
  link: { zh: '链接关系', en: 'Link' },
  dependency: { zh: '依赖关系', en: 'Dependency' },
  dottedLink: { zh: '虚线链接', en: 'Dotted link' },
  realization: { zh: '实现关系', en: 'Realization' },

  // ER 图
  oneToOne: { zh: '一对一', en: 'One to one' },
  oneToMany: { zh: '一对零或多', en: 'One to zero or many' },
  oneToManyRequired: { zh: '一对多', en: 'One to many' },
  manyToMany: { zh: '多对多', en: 'Many to many' },
  manyToOne: { zh: '多对一', en: 'Many to one' },
  pk: { zh: '主键', en: 'Primary key' },
  fk: { zh: '外键', en: 'Foreign key' },
  uk: { zh: '唯一键', en: 'Unique key' },

  // 甘特图
  title: { zh: '标题', en: 'Title' },
  dateFormat: { zh: '日期格式', en: 'Date format' },
  axisFormat: { zh: '坐标轴格式', en: 'Axis format' },
  section: { zh: '分组', en: 'Section' },
  excludes: { zh: '排除日期 (如周末)', en: 'Exclude dates (e.g. weekends)' },
  includes: { zh: '包含特定日期', en: 'Include specific dates' },
  todayMarker: { zh: '今天标记线', en: 'Today marker line' },
  taskDone: { zh: '已完成任务', en: 'Completed task' },
  taskActive: { zh: '进行中任务', en: 'Active task' },
  taskCrit: { zh: '关键任务', en: 'Critical task' },
  taskMilestone: { zh: '里程碑', en: 'Milestone' },

  // 状态图
  stateDefine: { zh: '定义状态', en: 'Define state' },
  stateNote: { zh: '注释', en: 'Note' },
  fork: { zh: '分叉', en: 'Fork' },
  join: { zh: '合并', en: 'Join' },
  choice: { zh: '选择点', en: 'Choice' },
  concurrent: { zh: '并发状态', en: 'Concurrent state' },
  startEnd: { zh: '初始/结束状态', en: 'Start/End state' },

  // Git 图
  commit: { zh: '提交', en: 'Commit' },
  branch: { zh: '创建分支', en: 'Create branch' },
  checkout: { zh: '切换分支', en: 'Checkout branch' },
  merge: { zh: '合并分支', en: 'Merge branch' },
  cherryPick: { zh: '摘取提交', en: 'Cherry-pick commit' },
  reset: { zh: '重置', en: 'Reset' },
  revert: { zh: '撤销', en: 'Revert' },
  tag: { zh: '标签', en: 'Tag' },
  gitOption: { zh: '设置选项', en: 'Set option' },
  normalCommit: { zh: '普通提交', en: 'Normal commit' },
  reverseCommit: { zh: '反向提交', en: 'Reverse commit' },
  highlightCommit: { zh: '高亮提交', en: 'Highlight commit' },

  // 思维导图
  root: { zh: '根节点', en: 'Root node' },
  roundedRect: { zh: '圆角矩形节点', en: 'Rounded rectangle node' },
  rectNode: { zh: '矩形节点', en: 'Rectangle node' },
  circleNode: { zh: '圆形节点', en: 'Circle node' },
  hexagonNode: { zh: '六边形节点', en: 'Hexagon node' },
  stadiumNode: { zh: '体育场形节点', en: 'Stadium node' },

  // 饼图
  showData: { zh: '显示数据', en: 'Show data' },

  // 架构图
  service: { zh: '服务', en: 'Service' },
  database: { zh: '数据库', en: 'Database' },
  queue: { zh: '队列', en: 'Queue' },
  group: { zh: '分组', en: 'Group' },
  junction: { zh: '连接点', en: 'Junction' },
  icon: { zh: '图标', en: 'Icon' },
  label: { zh: '标签', en: 'Label' },
  input: { zh: '输入', en: 'Input' },
  output: { zh: '输出', en: 'Output' },

  // 块图
  block: { zh: '块', en: 'Block' },
  columns: { zh: '列数', en: 'Columns' },
  space: { zh: '空白', en: 'Space' },

  // 引用
  definedNode: { zh: '已定义节点', en: 'Defined node' },
  definedParticipant: { zh: '已定义参与者', en: 'Defined participant' },
  definedClass: { zh: '已定义类', en: 'Defined class' },

  // Frontmatter
  frontmatter: { zh: 'Frontmatter 配置块', en: 'Frontmatter config block' },
  initDirective: { zh: '初始化指令', en: 'Init directive' },
};

// 获取当前语言的文本
function t(key: keyof typeof I18N): string {
  const lang = state.currentLang as Lang;
  return I18N[key]?.[lang] || I18N[key]?.zh || '';
}

// ============ 缓存实例 ============

let cache: CompletionCache = {
  docLength: -1,
  docHash: '',
  diagramType: 'unknown',
  definedNodes: new Set(),
  definedParticipants: new Set(),
  definedClasses: new Set(),
};

// ============ 补全项工厂函数 ============

function createDiagramTypeCompletions(): MermaidCompletion[] {
  return [
    { label: 'graph TD', type: 'type', info: t('graphTD'), detail: 'Flowchart', boost: 90 },
    { label: 'graph LR', type: 'type', info: t('graphLR'), detail: 'Flowchart', boost: 89 },
    { label: 'graph BT', type: 'type', info: t('graphBT'), detail: 'Flowchart', boost: 88 },
    { label: 'graph RL', type: 'type', info: t('graphRL'), detail: 'Flowchart', boost: 87 },
    { label: 'flowchart TD', type: 'type', info: t('flowchartTD'), detail: 'Flowchart', boost: 86 },
    { label: 'flowchart LR', type: 'type', info: t('flowchartLR'), detail: 'Flowchart', boost: 85 },
    { label: 'flowchart TB', type: 'type', info: t('flowchartTB'), detail: 'Flowchart', boost: 84 },
    { label: 'sequenceDiagram', type: 'type', info: t('sequenceDiagram'), detail: 'Sequence', boost: 80 },
    { label: 'classDiagram', type: 'type', info: t('classDiagram'), detail: 'Class', boost: 78 },
    { label: 'classDiagram-v2', type: 'type', info: t('classDiagramV2'), detail: 'Class', boost: 77 },
    { label: 'erDiagram', type: 'type', info: t('erDiagram'), detail: 'ER', boost: 76 },
    { label: 'stateDiagram-v2', type: 'type', info: t('stateDiagramV2'), detail: 'State', boost: 74 },
    { label: 'stateDiagram', type: 'type', info: t('stateDiagram'), detail: 'State', boost: 73 },
    { label: 'gantt', type: 'type', info: t('gantt'), detail: 'Gantt', boost: 72 },
    { label: 'pie', type: 'type', info: t('pie'), detail: 'Pie', boost: 70 },
    { label: 'pie showData', type: 'type', info: t('pieShowData'), detail: 'Pie', boost: 69 },
    { label: 'mindmap', type: 'type', info: t('mindmap'), detail: 'Mindmap', boost: 68 },
    { label: 'gitGraph', type: 'type', info: t('gitGraph'), detail: 'Git', boost: 66 },
    { label: 'timeline', type: 'type', info: t('timeline'), detail: 'Timeline', boost: 64 },
    { label: 'journey', type: 'type', info: t('journey'), detail: 'Journey', boost: 62 },
    { label: 'architecture-beta', type: 'type', info: t('architecture'), detail: 'Architecture', boost: 60 },
    { label: 'block-beta', type: 'type', info: t('blockBeta'), detail: 'Block', boost: 58 },
    { label: 'quadrantChart', type: 'type', info: t('quadrantChart'), detail: 'Quadrant', boost: 56 },
    { label: 'xychart-beta', type: 'type', info: t('xychart'), detail: 'XYChart', boost: 54 },
    { label: 'requirementDiagram', type: 'type', info: t('requirementDiagram'), detail: 'Requirement', boost: 52 },
    { label: 'C4Context', type: 'type', info: t('c4Context'), detail: 'C4', boost: 50 },
  ];
}

function createFlowchartKeywords(): MermaidCompletion[] {
  return [
    { label: 'subgraph', type: 'keyword', info: t('subgraph'), apply: 'subgraph Title\n    \nend', boost: 95 },
    { label: 'end', type: 'keyword', info: t('end'), boost: 94 },
    { label: 'direction TB', type: 'keyword', info: t('directionTB'), boost: 80 },
    { label: 'direction BT', type: 'keyword', info: t('directionBT'), boost: 79 },
    { label: 'direction LR', type: 'keyword', info: t('directionLR'), boost: 78 },
    { label: 'direction RL', type: 'keyword', info: t('directionRL'), boost: 77 },
    { label: 'classDef', type: 'keyword', info: t('classDef'), apply: 'classDef className fill:#f9f,stroke:#333,stroke-width:2px;', boost: 70 },
    { label: 'class', type: 'keyword', info: t('classApply'), apply: 'class nodeId className;', boost: 69 },
    { label: 'linkStyle', type: 'keyword', info: t('linkStyle'), apply: 'linkStyle 0 stroke:#f66,stroke-width:2px;', boost: 68 },
    { label: 'style', type: 'keyword', info: t('style'), apply: 'style nodeId fill:#f9f,stroke:#333;', boost: 67 },
    { label: 'click', type: 'keyword', info: t('click'), apply: 'click nodeId "https://example.com"', boost: 60 },
    { label: '%%', type: 'comment', info: t('comment'), apply: '%% ', boost: 40 },
  ];
}

function createFlowchartArrows(): MermaidCompletion[] {
  return [
    { label: '-->', type: 'operator', info: t('arrowSolid'), boost: 99 },
    { label: '---', type: 'operator', info: t('arrowSolidNoTip'), boost: 98 },
    { label: '-.->', type: 'operator', info: t('arrowDotted'), boost: 97 },
    { label: '-.-', type: 'operator', info: t('arrowDottedNoTip'), boost: 96 },
    { label: '==>', type: 'operator', info: t('arrowThick'), boost: 95 },
    { label: '===', type: 'operator', info: t('arrowThickNoTip'), boost: 94 },
    { label: '-->|text|', type: 'operator', info: t('arrowLabeled'), apply: '-->| |', boost: 93 },
    { label: '---|text|', type: 'operator', info: t('arrowLabeledLine'), apply: '---| |', boost: 92 },
    { label: '-.->|text|', type: 'operator', info: t('arrowDottedLabeled'), apply: '-.->| |', boost: 91 },
  ];
}

function createSequenceKeywords(): MermaidCompletion[] {
  return [
    { label: 'participant', type: 'keyword', info: t('participant'), apply: 'participant Name', boost: 99 },
    { label: 'actor', type: 'keyword', info: t('actor'), apply: 'actor Name', boost: 98 },
    { label: 'box', type: 'keyword', info: t('box'), apply: 'box GroupName\n    participant A\nend', boost: 55 },
    { label: 'end', type: 'keyword', info: t('end'), boost: 94 },
    { label: 'loop', type: 'keyword', info: t('loop'), apply: 'loop Title\n    \nend', boost: 78 },
    { label: 'alt', type: 'keyword', info: t('alt'), apply: 'alt 条件1\n    \nelse 条件2\n    \nend', boost: 77 },
    { label: 'else', type: 'keyword', info: t('altElse'), boost: 76 },
    { label: 'opt', type: 'keyword', info: t('opt'), apply: 'opt Description\n    \nend', boost: 75 },
    { label: 'par', type: 'keyword', info: t('par'), apply: 'par Action1\n    \nand Action2\n    \nend', boost: 74 },
    { label: 'and', type: 'keyword', info: t('parAnd'), boost: 73 },
    { label: 'critical', type: 'keyword', info: t('critical'), apply: 'critical Title\n    \noption Option\n    \nend', boost: 72 },
    { label: 'break', type: 'keyword', info: t('break'), apply: 'break Description\n    \nend', boost: 71 },
    { label: 'Note over', type: 'keyword', info: t('noteOver'), apply: 'Note over A,B: Note text', boost: 65 },
    { label: 'Note left of', type: 'keyword', info: t('noteLeft'), apply: 'Note left of A: Note text', boost: 64 },
    { label: 'Note right of', type: 'keyword', info: t('noteRight'), apply: 'Note right of A: Note text', boost: 63 },
    { label: 'activate', type: 'keyword', info: t('activate'), apply: 'activate A', boost: 60 },
    { label: 'deactivate', type: 'keyword', info: t('deactivate'), apply: 'deactivate A', boost: 59 },
    { label: 'autonumber', type: 'keyword', info: t('autonumber'), boost: 58 },
    { label: 'rect', type: 'keyword', info: t('rect'), apply: 'rect rgb(200, 220, 240)\n    \nend', boost: 56 },
  ];
}

function createSequenceArrows(): MermaidCompletion[] {
  return [
    { label: '->>', type: 'operator', info: t('seqRequest'), boost: 99 },
    { label: '-->>', type: 'operator', info: t('seqResponse'), boost: 98 },
    { label: '-x', type: 'operator', info: t('seqFail'), boost: 97 },
    { label: '--x', type: 'operator', info: t('seqFailDotted'), boost: 96 },
    { label: '-)', type: 'operator', info: t('seqAsync'), boost: 95 },
    { label: '--)', type: 'operator', info: t('seqAsyncDotted'), boost: 94 },
  ];
}

function createClassKeywords(): MermaidCompletion[] {
  return [
    { label: 'class', type: 'keyword', info: t('class'), apply: 'class ClassName {\n    +attribute: Type\n    +method()\n}', boost: 99 },
    { label: 'interface', type: 'keyword', info: t('interface'), apply: 'class InterfaceName {\n    <<interface>>\n    +method()\n}', boost: 98 },
    { label: 'abstract', type: 'keyword', info: t('abstract'), boost: 97 },
    { label: 'enum', type: 'keyword', info: t('enum'), apply: 'class EnumName {\n    <<enumeration>>\n    VALUE1\n    VALUE2\n}', boost: 96 },
    { label: 'namespace', type: 'keyword', info: t('namespace'), apply: 'namespace NamespaceName {\n    \n}', boost: 95 },
    { label: 'annotation', type: 'keyword', info: t('annotation'), boost: 94 },
    { label: '<<interface>>', type: 'text', info: t('interfaceMark'), boost: 88 },
    { label: '<<abstract>>', type: 'text', info: t('abstractMark'), boost: 87 },
    { label: '<<enumeration>>', type: 'text', info: t('enumMark'), boost: 86 },
    { label: '<<service>>', type: 'text', info: t('serviceMark'), boost: 85 },
    { label: '+', type: 'property', info: t('visibilityPublic'), boost: 75 },
    { label: '-', type: 'property', info: t('visibilityPrivate'), boost: 74 },
    { label: '#', type: 'property', info: t('visibilityProtected'), boost: 73 },
    { label: '~', type: 'property', info: t('visibilityPackage'), boost: 72 },
    { label: 'note', type: 'keyword', info: t('noteClass'), apply: 'note for ClassName "Note text"', boost: 55 },
  ];
}

function createClassRelations(): MermaidCompletion[] {
  return [
    { label: '<|--', type: 'operator', info: t('inheritance'), boost: 99 },
    { label: '*--', type: 'operator', info: t('composition'), boost: 98 },
    { label: 'o--', type: 'operator', info: t('aggregation'), boost: 97 },
    { label: '-->', type: 'operator', info: t('association'), boost: 96 },
    { label: '--', type: 'operator', info: t('link'), boost: 95 },
    { label: '..>', type: 'operator', info: t('dependency'), boost: 94 },
    { label: '..', type: 'operator', info: t('dottedLink'), boost: 93 },
    { label: '<|..', type: 'operator', info: t('realization'), boost: 92 },
    { label: '|>', type: 'operator', info: t('realization'), boost: 91 },
  ];
}

function createErKeywords(): MermaidCompletion[] {
  return [
    { label: '||--||', type: 'operator', info: t('oneToOne'), boost: 99 },
    { label: '||--o{', type: 'operator', info: t('oneToMany'), boost: 98 },
    { label: '||--|{', type: 'operator', info: t('oneToManyRequired'), boost: 97 },
    { label: 'o|--o{', type: 'operator', info: t('manyToMany'), boost: 96 },
    { label: 'o|--|{', type: 'operator', info: t('manyToMany'), boost: 95 },
    { label: '}|--|{', type: 'operator', info: t('manyToMany'), boost: 94 },
    { label: '}o--o{', type: 'operator', info: t('manyToMany'), boost: 93 },
    { label: '}o--||', type: 'operator', info: t('manyToOne'), boost: 92 },
    { label: 'PK', type: 'property', info: t('pk'), boost: 80 },
    { label: 'FK', type: 'property', info: t('fk'), boost: 79 },
    { label: 'UK', type: 'property', info: t('uk'), boost: 78 },
  ];
}

function createGanttKeywords(): MermaidCompletion[] {
  return [
    { label: 'title', type: 'keyword', info: t('title'), apply: 'title Project Title', boost: 99 },
    { label: 'dateFormat', type: 'keyword', info: t('dateFormat'), apply: 'dateFormat YYYY-MM-DD', boost: 98 },
    { label: 'axisFormat', type: 'keyword', info: t('axisFormat'), apply: 'axisFormat %Y-%m', boost: 97 },
    { label: 'section', type: 'keyword', info: t('section'), apply: 'section Section Name\n    ', boost: 96 },
    { label: 'excludes', type: 'keyword', info: t('excludes'), apply: 'excludes weekends', boost: 75 },
    { label: 'includes', type: 'keyword', info: t('includes'), boost: 74 },
    { label: 'todayMarker', type: 'keyword', info: t('todayMarker'), apply: 'todayMarker stroke-width:2px,stroke:#f00', boost: 73 },
    { label: 'done', type: 'property', info: t('taskDone'), boost: 70 },
    { label: 'active', type: 'property', info: t('taskActive'), boost: 69 },
    { label: 'crit', type: 'property', info: t('taskCrit'), boost: 68 },
    { label: 'milestone', type: 'property', info: t('taskMilestone'), boost: 67 },
  ];
}

function createStateKeywords(): MermaidCompletion[] {
  return [
    { label: 'state', type: 'keyword', info: t('stateDefine'), apply: 'state StateName', boost: 99 },
    { label: 'note', type: 'keyword', info: t('stateNote'), apply: 'note right of State: Note text', boost: 95 },
    { label: 'fork', type: 'keyword', info: t('fork'), boost: 90 },
    { label: 'join', type: 'keyword', info: t('join'), boost: 89 },
    { label: 'choice', type: 'keyword', info: t('choice'), boost: 88 },
    { label: 'concurrent', type: 'keyword', info: t('concurrent'), boost: 87 },
    { label: 'direction TB', type: 'keyword', info: t('directionTB'), boost: 80 },
    { label: 'direction LR', type: 'keyword', info: t('directionLR'), boost: 79 },
    { label: 'direction RL', type: 'keyword', info: t('directionRL'), boost: 78 },
    { label: 'direction BT', type: 'keyword', info: t('directionBT'), boost: 77 },
    { label: '[*]', type: 'text', info: t('startEnd'), boost: 70 },
  ];
}

function createGitKeywords(): MermaidCompletion[] {
  return [
    { label: 'commit', type: 'keyword', info: t('commit'), boost: 99 },
    { label: 'branch', type: 'keyword', info: t('branch'), apply: 'branch branchName', boost: 98 },
    { label: 'checkout', type: 'keyword', info: t('checkout'), apply: 'checkout branchName', boost: 97 },
    { label: 'merge', type: 'keyword', info: t('merge'), apply: 'merge branchName', boost: 96 },
    { label: 'cherry-pick', type: 'keyword', info: t('cherryPick'), apply: 'cherry-pick id:"commitId"', boost: 95 },
    { label: 'reset', type: 'keyword', info: t('reset'), apply: 'reset branchName', boost: 94 },
    { label: 'revert', type: 'keyword', info: t('revert'), boost: 93 },
    { label: 'tag', type: 'keyword', info: t('tag'), apply: 'tag: "v1.0.0"', boost: 92 },
    { label: 'option', type: 'keyword', info: t('gitOption'), boost: 91 },
    { label: 'NORMAL', type: 'constant', info: t('normalCommit'), boost: 85 },
    { label: 'REVERSE', type: 'constant', info: t('reverseCommit'), boost: 84 },
    { label: 'HIGHLIGHT', type: 'constant', info: t('highlightCommit'), boost: 83 },
  ];
}

function createMindmapKeywords(): MermaidCompletion[] {
  return [
    { label: 'root', type: 'keyword', info: t('root'), apply: 'root((Root))\n  ', boost: 99 },
    { label: '(text)', type: 'snippet', info: t('roundedRect'), boost: 85 },
    { label: '[text]', type: 'snippet', info: t('rectNode'), boost: 84 },
    { label: '((text))', type: 'snippet', info: t('circleNode'), boost: 83 },
    { label: '{{text}}', type: 'snippet', info: t('hexagonNode'), boost: 82 },
    { label: '([text])', type: 'snippet', info: t('stadiumNode'), boost: 81 },
    { label: '[[text]]', type: 'snippet', info: t('stadiumNode'), boost: 80 },
  ];
}

function createPieKeywords(): MermaidCompletion[] {
  return [
    { label: 'title', type: 'keyword', info: t('title'), apply: 'title Pie Chart Title', boost: 99 },
    { label: 'showData', type: 'property', info: t('showData'), boost: 90 },
  ];
}

function createTimelineKeywords(): MermaidCompletion[] {
  return [
    { label: 'title', type: 'keyword', info: t('title'), apply: 'title Timeline Title', boost: 99 },
    { label: 'section', type: 'keyword', info: t('section'), apply: 'section Section Name\n    ', boost: 95 },
  ];
}

function createJourneyKeywords(): MermaidCompletion[] {
  return [
    { label: 'title', type: 'keyword', info: t('title'), apply: 'title Journey Title', boost: 99 },
    { label: 'section', type: 'keyword', info: t('section'), apply: 'section Section Name\n    ', boost: 95 },
  ];
}

function createArchitectureKeywords(): MermaidCompletion[] {
  return [
    { label: 'service', type: 'keyword', info: t('service'), apply: 'service name(icon)[label]', boost: 99 },
    { label: 'database', type: 'keyword', info: t('database'), boost: 98 },
    { label: 'queue', type: 'keyword', info: t('queue'), boost: 97 },
    { label: 'group', type: 'keyword', info: t('group'), boost: 96 },
    { label: 'junction', type: 'keyword', info: t('junction'), boost: 95 },
    { label: 'icon', type: 'keyword', info: t('icon'), boost: 94 },
    { label: 'label', type: 'keyword', info: t('label'), boost: 93 },
    { label: 'in', type: 'keyword', info: t('input'), boost: 92 },
    { label: 'out', type: 'keyword', info: t('output'), boost: 91 },
  ];
}

function createBlockKeywords(): MermaidCompletion[] {
  return [
    { label: 'block', type: 'keyword', info: t('block'), boost: 99 },
    { label: 'columns', type: 'keyword', info: t('columns'), boost: 98 },
    { label: 'space', type: 'keyword', info: t('space'), boost: 97 },
  ];
}

function createFrontmatterOptions(): MermaidCompletion[] {
  return [
    { label: '---', type: 'keyword', info: t('frontmatter'), apply: '---\nconfig:\n  theme: default\n---\n', boost: 99 },
  ];
}

function createDirectiveOptions(): MermaidCompletion[] {
  return [
    { label: '%%{init: {...}}%%', type: 'keyword', info: t('initDirective'), apply: '%%{init: {"theme": "default"}}%%', boost: 90 },
  ];
}

// ============ 图表类型检测 ============

type DiagramType =
  | 'flowchart' | 'sequence' | 'class' | 'er' | 'state'
  | 'gantt' | 'pie' | 'mindmap' | 'git' | 'timeline'
  | 'journey' | 'architecture' | 'block' | 'unknown';

const DIAGRAM_PATTERNS: [RegExp, DiagramType][] = [
  [/^(flowchart|graph)\s/i, 'flowchart'],
  [/^sequenceDiagram/i, 'sequence'],
  [/^classDiagram/i, 'class'],
  [/^erDiagram/i, 'er'],
  [/^stateDiagram/i, 'state'],
  [/^gantt/i, 'gantt'],
  [/^pie/i, 'pie'],
  [/^mindmap/i, 'mindmap'],
  [/^gitGraph/i, 'git'],
  [/^timeline/i, 'timeline'],
  [/^journey/i, 'journey'],
  [/^architecture/i, 'architecture'],
  [/^block-beta/i, 'block'],
];

// ============ 缓存更新函数 ============

function updateCache(doc: string): void {
  const docHash = `${doc.length}:${doc.split('\n')[0]?.slice(0, 50) || ''}`;

  if (cache.docHash === docHash) return;

  cache.docHash = docHash;
  cache.diagramType = detectDiagramType(doc);

  cache.definedNodes.clear();
  cache.definedParticipants.clear();
  cache.definedClasses.clear();

  if (cache.diagramType === 'flowchart') {
    extractFlowchartNodes(doc).forEach(n => cache.definedNodes.add(n));
  } else if (cache.diagramType === 'sequence') {
    extractSequenceParticipants(doc).forEach(p => cache.definedParticipants.add(p));
  } else if (cache.diagramType === 'class') {
    extractClassNames(doc).forEach(c => cache.definedClasses.add(c));
  }
}

function detectDiagramType(code: string): DiagramType {
  const firstLine = code.trim().split('\n')[0] || '';
  for (const [pattern, type] of DIAGRAM_PATTERNS) {
    if (pattern.test(firstLine)) {
      return type;
    }
  }
  return 'unknown';
}

// ============ 已定义元素提取 ============

function extractFlowchartNodes(code: string): string[] {
  const nodes = new Set<string>();
  const nodePattern = /\b([A-Za-z_][A-Za-z0-9_]*)\s*[\[\(\{\<\/\\]/g;
  const keywords = new Set(['subgraph', 'end', 'classDef', 'class', 'style', 'linkStyle', 'click', 'direction']);
  let match;
  while ((match = nodePattern.exec(code)) !== null) {
    if (!keywords.has(match[1])) {
      nodes.add(match[1]);
    }
  }
  return Array.from(nodes);
}

function extractSequenceParticipants(code: string): string[] {
  const participants = new Set<string>();
  const participantPattern = /^(?:participant|actor)\s+(?:\w+\s+as\s+)?(\w+)/gm;
  let match;
  while ((match = participantPattern.exec(code)) !== null) {
    participants.add(match[1]);
  }
  if (participants.size === 0) {
    const msgPattern = /(\w+)\s*[-]{1,2}>/g;
    while ((match = msgPattern.exec(code)) !== null) {
      participants.add(match[1]);
    }
  }
  return Array.from(participants);
}

function extractClassNames(code: string): string[] {
  const classes = new Set<string>();
  const classPattern = /\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/g;
  let match;
  while ((match = classPattern.exec(code)) !== null) {
    classes.add(match[1]);
  }
  return Array.from(classes);
}

// ============ 上下文分析 ============

interface ContextInfo {
  isStartOfDocument: boolean;
  isAfterDash: boolean;
  isAfterLessThan: boolean;
  beforeCursor: string;
  pos: number;
  docLength: number;
}

function analyzeContext(context: CompletionContext): ContextInfo {
  const pos = context.pos;
  const doc = context.state.doc;
  const docLength = doc.length;

  if (pos < 0 || pos > docLength) {
    return {
      isStartOfDocument: false,
      isAfterDash: false,
      isAfterLessThan: false,
      beforeCursor: '',
      pos: 0,
      docLength,
    };
  }

  const line = doc.lineAt(pos);
  const beforeCursor = line.text.slice(0, pos - line.from);

  const docText = doc.toString();
  const beforePos = docText.slice(0, pos);
  const significantContent = beforePos
    .replace(/%%[^\n]*/g, '')
    .replace(/---[\s\S]*?---/g, '')
    .trim();

  return {
    isStartOfDocument: significantContent.length === 0,
    isAfterDash: /--$/.test(beforeCursor),
    isAfterLessThan: /<$/.test(beforeCursor) || /\|$/.test(beforeCursor),
    beforeCursor,
    pos,
    docLength,
  };
}

// ============ 特殊上下文补全 ============

function getSpecialContextCompletions(
  context: CompletionContext,
  diagramType: DiagramType,
  ctxInfo: ContextInfo
): CompletionResult | null {
  const pos = ctxInfo.pos;
  const beforeCursor = ctxInfo.beforeCursor;

  if (pos < 0) return null;

  if (diagramType === 'flowchart' && ctxInfo.isAfterDash) {
    if (pos < 2) return null;
    return {
      from: pos - 2,
      options: createFlowchartArrows(),
      validFor: /^[-\-=\.>]+$/,
    };
  }

  if (diagramType === 'sequence') {
    if (/-$/.test(beforeCursor) && !/->|--$/.test(beforeCursor)) {
      if (pos < 1) return null;
      return {
        from: pos - 1,
        options: createSequenceArrows(),
        validFor: /^[-x>]+$/,
      };
    }
  }

  if (diagramType === 'class' && ctxInfo.isAfterLessThan) {
    if (pos < 1) return null;
    return {
      from: pos - 1,
      options: createClassRelations().filter(r => r.label.startsWith('<') || r.label.startsWith('|')),
      validFor: /^[<\|\-*]+$/,
    };
  }

  if (diagramType === 'class' && ctxInfo.isAfterDash) {
    if (pos < 2) return null;
    return {
      from: pos - 2,
      options: createClassRelations().filter(r => r.label.includes('--')),
      validFor: /^[-\*o<>]+$/,
    };
  }

  if (diagramType === 'er' && /\|\|$/.test(beforeCursor)) {
    if (pos < 2) return null;
    return {
      from: pos - 2,
      options: createErKeywords().filter(k => k.label.startsWith('||')),
      validFor: /^[\|\-\{\}o]+$/,
    };
  }

  return null;
}

// ============ 主补全函数 ============

export function mermaidCompletion(context: CompletionContext): CompletionResult | null {
  const doc = context.state.doc;
  const docText = doc.toString();

  const pos = context.pos;
  if (pos < 0 || pos > doc.length) {
    return null;
  }

  updateCache(docText);

  const word = context.matchBefore(/\w*/);
  if (!word) return null;

  const ctxInfo = analyzeContext(context);

  if (ctxInfo.isStartOfDocument) {
    return {
      from: word.from,
      options: [...createDiagramTypeCompletions(), ...createFrontmatterOptions(), ...createDirectiveOptions()],
      validFor: /^\w*$/,
    };
  }

  const specialCompletions = getSpecialContextCompletions(context, cache.diagramType, ctxInfo);
  if (specialCompletions) return specialCompletions;

  if (word.from === word.to && !context.explicit) {
    return null;
  }

  const options = getKeywordCompletions(cache.diagramType, docText, word.text);

  if (options.length === 0) return null;

  return {
    from: word.from,
    options,
    validFor: /^\w*$/,
  };
}

function getKeywordCompletions(diagramType: DiagramType, doc: string, word: string): MermaidCompletion[] {
  const options: MermaidCompletion[] = [];

  switch (diagramType) {
    case 'flowchart':
      options.push(...createFlowchartKeywords());
      cache.definedNodes.forEach(node => {
        if (node.toLowerCase().includes(word.toLowerCase())) {
          options.push({ label: node, type: 'variable', info: t('definedNode'), boost: 100 });
        }
      });
      break;

    case 'sequence':
      options.push(...createSequenceKeywords());
      cache.definedParticipants.forEach(p => {
        if (p.toLowerCase().includes(word.toLowerCase())) {
          options.push({ label: p, type: 'variable', info: t('definedParticipant'), boost: 100 });
        }
      });
      break;

    case 'class':
      options.push(...createClassKeywords());
      cache.definedClasses.forEach(c => {
        if (c.toLowerCase().includes(word.toLowerCase())) {
          options.push({ label: c, type: 'class', info: t('definedClass'), boost: 100 });
        }
      });
      break;

    case 'er':
      options.push(...createErKeywords());
      break;

    case 'state':
      options.push(...createStateKeywords());
      break;

    case 'gantt':
      options.push(...createGanttKeywords());
      break;

    case 'pie':
      options.push(...createPieKeywords());
      break;

    case 'mindmap':
      options.push(...createMindmapKeywords());
      break;

    case 'git':
      options.push(...createGitKeywords());
      break;

    case 'timeline':
      options.push(...createTimelineKeywords());
      break;

    case 'journey':
      options.push(...createJourneyKeywords());
      break;

    case 'architecture':
      options.push(...createArchitectureKeywords());
      break;

    case 'block':
      options.push(...createBlockKeywords());
      break;

    default:
      options.push(...createDiagramTypeCompletions(), ...createFrontmatterOptions());
  }

  if (word) {
    const lowerWord = word.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(lowerWord));
  }

  return options;
}
