import { state } from './store';
import { dom } from './dom';
import { updateEditorStatus } from './utils';
import { STRINGS, applyI18n } from './i18n';

const TOUR_TARGETS = [
  { target: '.panel--editor',      placement: 'right'  },
  { target: '.example-dropdown',   placement: 'bottom' },
  { target: '.panel--preview',     placement: 'left'   },
  { target: '.menubar',            placement: 'bottom' },
  { target: '.btn-cmdk',           placement: 'bottom' },
];

function setCurtains(rect, pad) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const t = rect.top - pad, l = rect.left - pad;
  const r = rect.right + pad, b = rect.bottom + pad;
  dom.tourCurtainTop.style.cssText    = 'top:0;left:0;right:0;height:' + Math.max(0, t) + 'px';
  dom.tourCurtainBottom.style.cssText = 'top:' + Math.min(vh, b) + 'px;left:0;right:0;bottom:0';
  dom.tourCurtainLeft.style.cssText   = 'top:' + Math.max(0, t) + 'px;left:0;width:' + Math.max(0, l) + 'px;height:' + (Math.min(vh, b) - Math.max(0, t)) + 'px';
  dom.tourCurtainRight.style.cssText  = 'top:' + Math.max(0, t) + 'px;left:' + Math.min(vw, r) + 'px;right:0;height:' + (Math.min(vh, b) - Math.max(0, t)) + 'px';
}

function showLangPicker() {
  dom.tourCurtainTop.style.cssText    = 'top:0;left:0;right:0;bottom:0';
  dom.tourCurtainBottom.style.cssText = '';
  dom.tourCurtainLeft.style.cssText   = '';
  dom.tourCurtainRight.style.cssText  = '';
  dom.tourHighlight.style.cssText     = 'display:none';

  const vw = window.innerWidth, vh = window.innerHeight;
  const ttW = 320;
  dom.tourTooltip.style.width = ttW + 'px';
  dom.tourTooltip.style.top  = (vh / 2 - 110) + 'px';
  dom.tourTooltip.style.left = (vw / 2 - ttW / 2) + 'px';

  dom.tourTooltip.classList.remove('animating');
  void dom.tourTooltip.offsetWidth;
  dom.tourTooltip.classList.add('animating');

  dom.tourStepEl.textContent = '';
  dom.tourTitleEl.textContent = STRINGS[state.currentLang].tourLangTitle;
  dom.tourBodyEl.innerHTML =
    '<div style="margin-bottom:12px;opacity:0.85;font-size:13px;line-height:1.6">' + STRINGS[state.currentLang].tourLangBody + '</div>' +
    '<div style="display:flex;gap:8px;justify-content:center">' +
    '<button class="tour-btn primary lang-pick" data-lang="zh" style="font-size:13px;padding:7px 20px">中文</button>' +
    '<button class="tour-btn primary lang-pick" data-lang="en" style="font-size:13px;padding:7px 20px">English</button>' +
    '</div>';

  dom.tourTooltip.querySelectorAll('.lang-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as 'zh' | 'en' | null;
      if (lang) state.currentLang = lang;
      localStorage.setItem('mermzen-lang', state.currentLang);
      applyI18n();
      updateEditorStatus();
      state.tourStep = 0;
      dom.tourHighlight.style.display = '';
      showTourStep(state.tourStep);
    });
  });

  dom.tourDotsEl.innerHTML = '';
  TOUR_TARGETS.forEach(() => {
    const dot = document.createElement('div');
    dot.className = 'tour-dot';
    dom.tourDotsEl.appendChild(dot);
  });

  dom.tourNext.style.display = 'none';
  dom.tourSkip.textContent = STRINGS[state.currentLang].tourSkip;
}

function showTourStep(idx) {
  const step = TOUR_TARGETS[idx];
  const s = STRINGS[state.currentLang].tourSteps[idx];
  const targetEl = document.querySelector(step.target);
  if (!targetEl) { nextTourStep(); return; }

  const rect = targetEl.getBoundingClientRect();
  const pad = 6;
  setCurtains(rect, pad);

  dom.tourHighlight.style.top    = (rect.top - pad) + 'px';
  dom.tourHighlight.style.left   = (rect.left - pad) + 'px';
  dom.tourHighlight.style.width  = (rect.width + pad * 2) + 'px';
  dom.tourHighlight.style.height = (rect.height + pad * 2) + 'px';
  dom.tourHighlight.style.display = '';

  dom.tourStepEl.textContent  = (idx + 1) + ' / ' + TOUR_TARGETS.length;
  dom.tourTitleEl.textContent = s.title;
  dom.tourBodyEl.textContent  = s.body;
  dom.tourNext.style.display  = '';
  dom.tourNext.textContent    = idx === TOUR_TARGETS.length - 1
    ? STRINGS[state.currentLang].tourDone
    : STRINGS[state.currentLang].tourNext;
  dom.tourSkip.textContent    = STRINGS[state.currentLang].tourSkip;

  dom.tourDotsEl.innerHTML = '';
  TOUR_TARGETS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tour-dot' + (i === idx ? ' active' : '');
    dom.tourDotsEl.appendChild(dot);
  });

  dom.tourTooltip.classList.remove('animating');
  void dom.tourTooltip.offsetWidth;
  dom.tourTooltip.classList.add('animating');

  const ttW = 290, ttH = 170, margin = 14;
  const vw = window.innerWidth, vh = window.innerHeight;
  let top, left;

  if (step.placement === 'right') {
    left = rect.right + margin;
    top  = rect.top + rect.height / 2 - ttH / 2;
    if (left + ttW > vw - 8) left = rect.left - ttW - margin;
  } else if (step.placement === 'left') {
    left = rect.left - ttW - margin;
    top  = rect.top + rect.height / 2 - ttH / 2;
    if (left < 8) left = rect.right + margin;
  } else {
    top  = rect.bottom + margin;
    left = rect.left + rect.width / 2 - ttW / 2;
    if (top + ttH > vh - 8) top = rect.top - ttH - margin;
  }

  top  = Math.max(8, Math.min(top,  vh - ttH - 8));
  left = Math.max(8, Math.min(left, vw - ttW - 8));

  dom.tourTooltip.style.top   = top + 'px';
  dom.tourTooltip.style.left  = left + 'px';
  dom.tourTooltip.style.width = ttW + 'px';
}

export function startTour() {
  state.tourActive = true;
  state.tourStep = 0;
  dom.tourOverlay.style.display = 'block';
  showLangPicker();
}

export function closeTour() {
  state.tourActive = false;
  dom.tourOverlay.style.display = 'none';
  localStorage.setItem('mermzen-tour-seen', '1');
}

function nextTourStep() {
  if (state.tourStep < TOUR_TARGETS.length - 1) {
    state.tourStep++;
    showTourStep(state.tourStep);
  } else {
    closeTour();
  }
}

// ── Tour event bindings ─────────────────────────────────────────────
dom.tourNext.addEventListener('click', nextTourStep);
dom.tourSkip.addEventListener('click', closeTour);
