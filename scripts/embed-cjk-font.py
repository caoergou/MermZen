#!/usr/bin/env python3
"""
为 SVG 中的中文字符嵌入 Noto Sans CJK SC 字体子集。
只提取 SVG 实际用到的汉字，生成精简 WOFF2 并嵌入 @font-face。
用法: python3 scripts/embed-cjk-font.py <svg_file> [<svg_file> ...]
"""

import re
import sys
import base64
import subprocess
import tempfile
from pathlib import Path

# 按优先级尝试 CJK 字体（本地 / CI / macOS）
FONT_CANDIDATES = [
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
    '/usr/share/fonts/noto-cjk/NotoSansCJKsc-Regular.otf',
    '/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf',
    '/System/Library/Fonts/PingFang.ttc',
]


def find_font():
    for f in FONT_CANDIDATES:
        if Path(f).exists():
            return f
    return None


def extract_cjk_chars(svg_content):
    """提取 SVG 文本节点中所有 CJK 字符（去重）"""
    raw_texts = re.findall(r'>([^<>]+)<', svg_content)
    chars = set()
    for text in raw_texts:
        for ch in text:
            cp = ord(ch)
            if (0x4E00 <= cp <= 0x9FFF    # CJK 统一汉字
                    or 0x3400 <= cp <= 0x4DBF   # 扩展 A
                    or 0x3000 <= cp <= 0x303F   # CJK 符号和标点
                    or 0xFF00 <= cp <= 0xFFEF): # 全角符号
                chars.add(ch)
    return chars


def embed_font(svg_path: str) -> bool:
    font_path = find_font()
    if not font_path:
        print(f'  ⚠  No CJK font found — skipping {svg_path}')
        return False

    svg_content = Path(svg_path).read_text(encoding='utf-8')
    cjk_chars = extract_cjk_chars(svg_content)

    if not cjk_chars:
        print(f'  ℹ  No CJK chars in {Path(svg_path).name}')
        return True

    print(f'  {len(cjk_chars)} unique CJK chars: {"".join(sorted(cjk_chars))}')

    # 构建 Unicode 范围字符串，同时保留 ASCII 和常用标点
    unicodes = ','.join(f'U+{ord(c):04X}' for c in cjk_chars)
    unicodes += ',U+0020-007E'   # ASCII 可打印字符（拉丁 fallback）
    unicodes += ',U+00B7,U+2026' # 间隔号、省略号

    with tempfile.NamedTemporaryFile(suffix='.woff2', delete=False) as tmp:
        woff2_path = tmp.name

    succeeded = False
    # TTC 文件需要指定字体索引：SC=2 (JP=0, KR=1, SC=2, TC=3, HK=4)
    font_numbers = ['2', '0'] if font_path.endswith('.ttc') else ['']
    for fn in font_numbers:
        cmd = [
            'pyftsubset', font_path,
            f'--unicodes={unicodes}',
            '--flavor=woff2',
            f'--output-file={woff2_path}',
            '--layout-features=*',
        ]
        if fn:
            cmd.append(f'--font-number={fn}')

        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0 and Path(woff2_path).stat().st_size > 100:
            succeeded = True
            break

    if not succeeded:
        print(f'  ✗  pyftsubset failed for {svg_path}')
        Path(woff2_path).unlink(missing_ok=True)
        return False

    woff2_data = Path(woff2_path).read_bytes()
    b64 = base64.b64encode(woff2_data).decode('ascii')
    size_kb = len(woff2_data) / 1024
    print(f'  ✓  Embedded {size_kb:.1f} KB WOFF2 subset')
    Path(woff2_path).unlink(missing_ok=True)

    # 构造 @font-face 规则
    font_face = (
        '\n@font-face {'
        '\n  font-family: "NotoSansCJK";'
        f'\n  src: url("data:font/woff2;base64,{b64}") format("woff2");'
        '\n  font-weight: normal; font-style: normal;'
        '\n}'
    )

    # 先把 NotoSansCJK 插入已有 font-family（sans-serif 之前），再插入 @font-face
    # 用 ,sans-serif 为锚点，避免误匹配 @font-face 内部的 font-family 声明
    def inject_before_sansserif(m):
        full = m.group(0)
        if 'NotoSansCJK' in full:
            return full
        return m.group(1) + ',"NotoSansCJK",sans-serif' + m.group(2)

    svg_content = re.sub(
        r'(font-family:[^;{}]*?),\s*sans-serif\b([\s;{}])',
        inject_before_sansserif,
        svg_content,
    )
    svg_content = svg_content.replace(
        '#mermaid-svg{font-family:',
        font_face + '\n#mermaid-svg{font-family:',
        1,
    )

    Path(svg_path).write_text(svg_content, encoding='utf-8')
    return True


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 embed-cjk-font.py <svg_file> [...]')
        sys.exit(1)
    for p in sys.argv[1:]:
        print(f'Processing {p}')
        embed_font(p)
    print('Done.')
