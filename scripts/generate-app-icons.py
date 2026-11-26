"""Tony OS app symbols inside a shared, neutral clear icon mask.

Reference: Apple's current Clear app-icon appearance. These are original generic
symbols, not copied Apple app artwork. App content and utility controls do not
use these launcher tiles. No filters, raster assets, or external dependencies.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "public" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

MASK = "M50 2H71C89 2 98 11 98 29V71C98 89 89 98 71 98H29C11 98 2 89 2 71V29C2 11 11 2 29 2Z"
DEFS = '''<defs>
  <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#76767b" stop-opacity=".63"/><stop offset="1" stop-color="#4c4c51" stop-opacity=".63"/></linearGradient>
  <linearGradient id="rim" x1="0" y1="0" x2=".5" y2="1"><stop stop-color="#fff" stop-opacity=".8"/><stop offset=".45" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".45"/></linearGradient>
  <linearGradient id="symbol" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f3f3f5" stop-opacity=".95"/></linearGradient>
</defs>'''

symbols = {
  "home": '<path d="M21 47 46 25Q50 21 54 25L79 47Q81 49 79 52L76 55 71 51V72Q71 77 66 77H57V58H43V77H34Q29 77 29 72V51L24 55 21 52Q19 49 21 47Z"/>',
  "folder": '<path d="M22 34Q22 28 28 28H42L49 36H73Q79 36 79 42V66Q79 73 72 73H28Q22 73 22 67Z" opacity=".6"/><path d="M21 42Q21 37 27 37H44L50 43H74Q80 43 80 49V70Q80 76 74 76H27Q21 76 21 70Z"/>',
  "book": '<path d="M21 28Q36 25 47 32V76Q35 69 21 72Z"/><path d="M53 32Q64 25 79 28V72Q65 69 53 76Z"/><path d="M47 32H53V76H47Z" opacity=".56"/>',
  "capture": '<path d="M29 23H57L70 36V70Q70 77 63 77H29Q23 77 23 70V30Q23 23 29 23Z" opacity=".75"/><path d="M56 23V34Q56 38 60 38H70" fill="none" stroke="#fff" stroke-width="2"/><path d="m44 62 27-27q3-3 6 0l3 3q3 3 0 6L53 71 41 74Z"/><path d="m67 39 8 8" fill="none" stroke="#55555b" stroke-opacity=".45" stroke-width="2"/>',
  "send": '<path d="m23 43 52-20q4-1 3 3L61 79q-1 3-4 0L45 58 24 48q-5-3-1-5Z"/><path d="M45 58 68 33" fill="none" stroke="#6b6b70" stroke-opacity=".55" stroke-width="2.6" stroke-linecap="round"/>',
  "search": '<circle cx="44" cy="44" r="21" fill="none" stroke="url(#symbol)" stroke-width="7"/><path d="m60 60 16 16" fill="none" stroke="url(#symbol)" stroke-width="8" stroke-linecap="round"/>',
  "globe": '<circle cx="50" cy="50" r="28" fill="none" stroke="url(#symbol)" stroke-width="4.5"/><ellipse cx="50" cy="50" rx="13" ry="28" fill="none" stroke="url(#symbol)" stroke-width="3.4"/><path d="M23 50H77M28 36H72M28 64H72" fill="none" stroke="url(#symbol)" stroke-width="3.4"/>',
  "play": '<path d="M34 33H66Q75 33 78 45L83 65Q85 75 77 77Q73 78 70 73L61 63H39L30 73Q27 78 23 77Q15 75 17 65L22 45Q25 33 34 33Z"/><path d="M35 42V56M28 49H42" fill="none" stroke="#65656b" stroke-opacity=".76" stroke-width="4" stroke-linecap="round"/><circle cx="64" cy="45" r="3" fill="#65656b" fill-opacity=".76"/><circle cx="72" cy="53" r="3" fill="#65656b" fill-opacity=".76"/>',
  "person": '<circle cx="50" cy="36" r="13"/><path d="M25 71Q25 54 50 54T75 71V75Q75 78 71 78H29Q25 78 25 75Z"/>',
  "mail": '<rect x="21" y="30" width="58" height="43" rx="7"/><path d="m23 34 23 19q4 4 8 0l23-19M23 69l17-16M77 69 60 53" fill="none" stroke="#68686e" stroke-opacity=".7" stroke-width="2.8" stroke-linejoin="round"/>',
  "desktop": '<rect x="23" y="23" width="23" height="23" rx="6"/><rect x="54" y="23" width="23" height="23" rx="6" opacity=".85"/><rect x="23" y="54" width="23" height="23" rx="6" opacity=".85"/><rect x="54" y="54" width="23" height="23" rx="6"/>',
  "settings": '<path d="M45 23H55L58 31 65 35 74 34 79 43 73 50 74 58 79 65 73 74 64 72 57 77 54 84H44L41 77 33 73 24 74 19 65 25 58 24 50 19 43 25 34 34 35 41 31Z" transform="translate(2 -4) scale(.96)"/><circle cx="50" cy="48" r="13" fill="#65656b" fill-opacity=".84"/><circle cx="50" cy="48" r="7.5" fill="url(#symbol)"/>'
}

for name, symbol in symbols.items():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
{DEFS}
<path d="{MASK}" fill="url(#tile)" stroke="url(#rim)" stroke-width="1.25"/>
<g fill="url(#symbol)">{symbol}</g>
</svg>
'''
    (OUT / f"{name}.svg").write_text(svg)

print(f"Generated {len(symbols)} neutral clear app icons in {OUT}")
