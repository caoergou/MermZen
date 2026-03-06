import mermaid from 'mermaid';
import { inflate, inflateRaw } from 'pako';

function decodeCode(encoded: string): string {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4 !== 0) encoded += '=';
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  try {
    return new TextDecoder().decode(inflate(bytes));
  } catch (e1) {
    try {
      return new TextDecoder().decode(inflateRaw(bytes));
    } catch (e2) {
      return new TextDecoder().decode(bytes);
    }
  }
}

const hash = location.hash.slice(1);
const params = new URLSearchParams(location.search);
const encoded = hash || params.get('code');

if (!encoded) {
  const errEl = document.getElementById('error');
  if (errEl) { errEl.style.display = ''; errEl.textContent = 'No diagram code found in URL.'; }
} else {
  try {
    const decoded = decodeCode(encoded);
    let code = decoded;
    let theme = params.get('theme') || 'default';
    let look = params.get('look') || 'handDrawn';
    let fontFamily = 'Kalam';
    let fontSize = 16;
    let bg = 'transparent';

    try {
      const obj = JSON.parse(decoded);
      if (obj && obj.v === 2) {
        code = obj.c;
        if (obj.t) theme = obj.t;
        if (obj.hd === false) look = 'classic';
        if (obj.hdf) {
          const fonts: Record<string, string> = { kalam: 'Kalam', caveat: 'Caveat', virgil: 'Virgil' };
          fontFamily = fonts[obj.hdf] || 'Kalam';
        }
        if (obj.hds) {
          const sizes: Record<string, number> = { small: 14, medium: 16, large: 18 };
          fontSize = sizes[obj.hds] || 16;
        }
        if (obj.bg) bg = obj.bg;
      }
    } catch (e) {}

    if (bg !== 'transparent') document.body.style.background = bg;

    mermaid.initialize({
      startOnLoad: false,
      theme: theme as any,
      look: look as any,
      handDrawnSeed: 42,
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: `${fontFamily}, "Xiaolai SC", cursive`,
        fontSize: `${fontSize}px`,
      },
    });

    const el = document.getElementById('diagram');
    if (el) {
      mermaid.render('mermaid-svg', code).then(function(result) {
        el.innerHTML = result.svg;

        let scale = 1, posX = 0, posY = 0, isDragging = false, startX = 0, startY = 0;

        function updateTransform() {
          el.style.transform = 'translate(' + posX + 'px, ' + posY + 'px) scale(' + scale + ')';
        }

        const container = document.getElementById('container');
        if (container) {
          container.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            scale *= delta;
            scale = Math.max(0.1, Math.min(scale, 10));
            updateTransform();
          });
        }

        el.addEventListener('mousedown', function(e) {
          isDragging = true;
          startX = e.clientX - posX;
          startY = e.clientY - posY;
        });

        document.addEventListener('mousemove', function(e) {
          if (!isDragging) return;
          posX = e.clientX - startX;
          posY = e.clientY - startY;
          updateTransform();
        });

        document.addEventListener('mouseup', function() {
          isDragging = false;
        });
      }).catch(function(err: Error) {
        const errEl = document.getElementById('error');
        if (errEl) { errEl.style.display = ''; errEl.textContent = 'Render error: ' + err.message; }
      });
    }
  } catch (e: any) {
    const errEl = document.getElementById('error');
    if (errEl) { errEl.style.display = ''; errEl.textContent = 'Decode error: ' + e.message; }
  }
}
