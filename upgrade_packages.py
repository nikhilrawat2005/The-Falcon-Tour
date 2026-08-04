"""
upgrade_packages.py
Mass-upgrades all 76 package detail pages to the Dark-Gold luxury design system.
Run from: The Falcon Tour NEW/

Changes applied to every package page:
1. Important Note box  -> dark gold bg + cream text (remove old rgba(217,164,65,.07) bg)
2. Fraunces -> Playfair Display in any inline modal headings
3. pkg-section-subtitle inline text-mute color -> cream-2
4. pkg-section-alt / pkg-section-base: already handled by package-detail.css
5. Gallery section h2 color upgrade (eyebrow stays gold)
6. CTA banner h2 em color fix
7. Footer inline style already dark – no change needed
"""

import os, glob, re

PKG_DIR = os.path.join(os.path.dirname(__file__), "packages")


def upgrade(html):
    changed = False

    # ── 1. Important Note box: dark version ──────────────────────────────────
    # Old: background:rgba(217,164,65,.07);border:1px solid rgba(217,164,65,.25)
    # New: background:rgba(212,175,55,.06);border:1px solid rgba(212,175,55,.22) + cream text
    old_box = (
        "background:rgba(217,164,65,.07);border:1px solid rgba(217,164,65,.25);"
        "border-radius:6px;"
    )
    new_box = (
        "background:rgba(10,10,10,0.55);border:1px solid rgba(212,175,55,.22);"
        "border-radius:6px;backdrop-filter:blur(8px);"
    )
    if old_box in html:
        html = html.replace(old_box, new_box)
        changed = True

    # Also fix the label inside Important Note (was gold, keep gold — good)
    # Fix the body text color: color:var(--text-mute) -> color:rgba(245,245,244,.72)
    # Only inside the important note context (inline style on <p>)
    old_note_p = (
        'style="margin:0;font-size:13.5px;color:var(--text-mute);line-height:1.75;"'
    )
    new_note_p = (
        'style="margin:0;font-size:13.5px;color:rgba(245,245,244,.72);line-height:1.75;"'
    )
    if old_note_p in html:
        html = html.replace(old_note_p, new_note_p)
        changed = True

    # ── 2. Fraunces -> Playfair Display in any inline style ──────────────────
    # (modals, headings with inline font-family)
    html_new = re.sub(
        r"font-family:'Fraunces',serif",
        "font-family:'Playfair Display',serif",
        html,
    )
    if html_new != html:
        html = html_new
        changed = True

    # ── 3. pkg-section-subtitle inline color fix ─────────────────────────────
    # Some pages hardcode color:var(--text-mute) on subtitle — override to cream
    html_new = html.replace(
        'class="pkg-section-subtitle"',
        'class="pkg-section-subtitle" style="color:rgba(245,245,244,.65);"',
    )
    # Avoid duplicating if already set
    html_new = html_new.replace(
        'style="color:rgba(245,245,244,.65);" style="color:rgba(245,245,244,.65);"',
        'style="color:rgba(245,245,244,.65);"',
    )
    if html_new != html:
        html = html_new
        changed = True

    # ── 4. Gallery section heading: add cream color override if missing ───────
    # <h2>Gallery of Highlights</h2>  ->  wrapped in span with class
    html_new = re.sub(
        r'<h2>Gallery of Highlights</h2>',
        '<h2 style="color:var(--cream);">Gallery of Highlights</h2>',
        html,
    )
    if html_new != html:
        html = html_new
        changed = True

    # ── 5. CTA banner p text: ensure cream ───────────────────────────────────
    old_cta_p = (
        'class="pkg-cta-banner"'
    )
    # Already styled via .pkg-cta-banner in package-detail.css — skip

    # ── 6. overview-strip: add dark bg if missing ────────────────────────────
    html_new = html.replace(
        '<section class="overview-strip">',
        '<section class="overview-strip" style="background:var(--ink-2);border-top:1px solid rgba(212,175,55,.12);border-bottom:1px solid rgba(212,175,55,.12);">',
    )
    # Avoid double-applying
    html_new = html_new.replace(
        'style="background:var(--ink-2);border-top:1px solid rgba(212,175,55,.12);border-bottom:1px solid rgba(212,175,55,.12);" style="background:var(--ink-2)',
        'style="background:var(--ink-2)',
    )
    if html_new != html:
        html = html_new
        changed = True

    # ── 7. overview-pill labels: lighten for dark bg ─────────────────────────
    html_new = html.replace(
        'class="op-label"',
        'class="op-label" style="color:rgba(245,245,244,.5);"',
    )
    html_new = html_new.replace(
        'style="color:rgba(245,245,244,.5);" style="color:rgba(245,245,244,.5);"',
        'style="color:rgba(245,245,244,.5);"',
    )
    if html_new != html:
        html = html_new
        changed = True

    html_new = html.replace(
        'class="op-value"',
        'class="op-value" style="color:var(--cream);font-weight:600;"',
    )
    html_new = html_new.replace(
        'style="color:var(--cream);font-weight:600;" style="color:var(--cream);font-weight:600;"',
        'style="color:var(--cream);font-weight:600;"',
    )
    if html_new != html:
        html = html_new
        changed = True

    return html


# ── Runner ──────────────────────────────────────────────────────────────────
files = [f for f in glob.glob(os.path.join(PKG_DIR, "*.html")) if "index.html" not in f]
updated = 0
skipped = 0

for fp in files:
    with open(fp, "r", encoding="utf-8") as f:
        original = f.read()

    upgraded = upgrade(original)

    if upgraded != original:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(upgraded)
        updated += 1
        print(f"  OK {os.path.basename(fp)}")
    else:
        skipped += 1

print(f"\nDone. Updated: {updated} | Already clean: {skipped}")
