import { dom } from '../dom';
import { pz, MIN_SCALE, MAX_SCALE } from '../store';

// ── 缩放和平移逻辑 ──────────────────────────────────────────────────────

/**
 * 应用当前的变换（缩放和平移）到预览元素
 */
export function applyTransform() {
  dom.preview.style.transform = 'translate(' + pz.tx + 'px,' + pz.ty + 'px) scale(' + pz.scale + ')';
  dom.zoomLabel.textContent = Math.round(pz.scale * 100) + '%';
}

/**
 * 缩放到指定比例，并以指定点为中心（默认为视口中心）
 * @param {number} newScale - 新的缩放比例
 * @param {number} [cx] - 中心点 X 坐标
 * @param {number} [cy] - 中心点 Y 坐标
 */
export function zoomTo(newScale, cx?: number, cy?: number) {
  newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
  if (cx === undefined) {
    cx = dom.previewViewport.clientWidth / 2;
    cy = dom.previewViewport.clientHeight / 2;
  }
  pz.tx = cx - (cx - pz.tx) * (newScale / pz.scale);
  pz.ty = cy - (cy - pz.ty) * (newScale / pz.scale);
  pz.scale = newScale;
  applyTransform();
}

/**
 * 重置视图到初始状态
 */
export function resetView() {
  pz.scale = 1; pz.tx = 0; pz.ty = 0;
  applyTransform();
}

const ZOOM_STEP = 1.25;

/**
 * 绑定预览区缩放按钮、拖拽平移与滚轮缩放
 */
export function initZoom() {
  applyTransform();

  if (dom.btnZoomIn) dom.btnZoomIn.addEventListener('click', () => zoomTo(pz.scale * ZOOM_STEP));
  if (dom.btnZoomOut) dom.btnZoomOut.addEventListener('click', () => zoomTo(pz.scale / ZOOM_STEP));
  if (dom.btnZoomReset) dom.btnZoomReset.addEventListener('click', resetView);

  const vp = dom.previewViewport;
  if (!vp) return;

  // 跟踪所有活动指针（鼠标 / 单指 / 多指），以支持触摸拖拽与双指捏合缩放
  const pointers = new Map<number, { x: number; y: number }>();
  // 捏合状态
  let pinching = false;
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let pinchStartTx = 0;
  let pinchStartTy = 0;
  let pinchMidX = 0;
  let pinchMidY = 0;
  // 双击轻点复位：仅当上一次是「轻点」（按下到抬起位移小、时长短）时才计入
  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;
  let downTime = 0;
  let downX = 0;
  let downY = 0;
  let movedDuringTap = false;

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  function beginPan(x: number, y: number) {
    pz.dragging = true;
    pz.startX = x;
    pz.startY = y;
    pz.startTx = pz.tx;
    pz.startTy = pz.ty;
  }

  function beginPinch() {
    const pts = [...pointers.values()];
    const rect = vp.getBoundingClientRect();
    pinching = true;
    pz.dragging = false;
    pinchStartDist = dist(pts[0], pts[1]) || 1;
    pinchStartScale = pz.scale;
    pinchStartTx = pz.tx;
    pinchStartTy = pz.ty;
    pinchMidX = (pts[0].x + pts[1].x) / 2 - rect.left;
    pinchMidY = (pts[0].y + pts[1].y) / 2 - rect.top;
  }

  vp.addEventListener('pointerdown', e => {
    if ((e.target as HTMLElement | SVGElement | null)?.closest('.floating-zoom')) return;
    // 鼠标只响应左键；触摸 / 笔不受限
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    vp.setPointerCapture(e.pointerId);

    if (pointers.size === 1) {
      const now = e.timeStamp;
      // 与上一次「轻点」在 300ms 内且位置相近 → 双击复位
      if (now - lastTapTime < 300 && Math.hypot(e.clientX - lastTapX, e.clientY - lastTapY) < 30) {
        resetView();
        lastTapTime = 0;
        pz.dragging = false;
        return;
      }
      // 记录本次按下，供抬起时判断是否构成「轻点」
      downTime = now;
      downX = e.clientX;
      downY = e.clientY;
      movedDuringTap = false;
      beginPan(e.clientX, e.clientY);
    } else if (pointers.size === 2) {
      beginPinch();
    }
  });

  vp.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pinching && pointers.size >= 2) {
      const pts = [...pointers.values()];
      const rect = vp.getBoundingClientRect();
      const newDist = dist(pts[0], pts[1]);
      const midX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const midY = (pts[0].y + pts[1].y) / 2 - rect.top;
      let newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchStartScale * (newDist / pinchStartDist)));
      // 保持捏合起点处的图内容锚定在当前两指中点下方
      pz.tx = midX - ((pinchMidX - pinchStartTx) / pinchStartScale) * newScale;
      pz.ty = midY - ((pinchMidY - pinchStartTy) / pinchStartScale) * newScale;
      pz.scale = newScale;
      applyTransform();
    } else if (pz.dragging) {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) movedDuringTap = true;
      pz.tx = pz.startTx + (e.clientX - pz.startX);
      pz.ty = pz.startTy + (e.clientY - pz.startY);
      applyTransform();
    }
  });

  function endPointer(e: PointerEvent) {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    try { vp.releasePointerCapture(e.pointerId); } catch {}

    if (pointers.size < 2) pinching = false;
    if (pointers.size === 1) {
      // 还剩一指，从它继续平移，避免跳变
      const p = [...pointers.values()][0];
      beginPan(p.x, p.y);
    } else if (pointers.size === 0) {
      pz.dragging = false;
      // 判定「轻点」：未发生捏合、位移小、时长短 → 记录用于双击检测
      if (!movedDuringTap && e.timeStamp - downTime < 250) {
        lastTapTime = e.timeStamp;
        lastTapX = e.clientX;
        lastTapY = e.clientY;
      } else {
        lastTapTime = 0;
      }
    }
  }

  vp.addEventListener('pointerup', endPointer);
  vp.addEventListener('pointercancel', endPointer);

  vp.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = vp.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY > 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
    zoomTo(pz.scale * factor, cx, cy);
  }, { passive: false });
}
