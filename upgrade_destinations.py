"""
upgrade_destinations.py
Upgrades all 9 destination detail pages to the Dark-Gold luxury design system.
Run from: The Falcon Tour NEW/
"""

import os, re, glob

DEST_DIR = os.path.join(os.path.dirname(__file__), "destinations")

# ── 1. Per-page metadata ──────────────────────────────────────────────────────
PAGES = {
    "destination-dubai.html": {
        "eyebrow": "UAE · 8 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Dubai%20tour%20package",
        "cta_dest": "Dubai",
    },
    "destination-turkey.html": {
        "eyebrow": "Turkey · 10 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Turkey%20tour%20package",
        "cta_dest": "Turkey",
    },
    "destination-singapore.html": {
        "eyebrow": "Singapore · 5 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Singapore%20tour%20package",
        "cta_dest": "Singapore",
    },
    "destination-sri-lanka.html": {
        "eyebrow": "Sri Lanka · 7 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Sri%20Lanka%20tour%20package",
        "cta_dest": "Sri Lanka",
    },
    "destination-new-zealand.html": {
        "eyebrow": "New Zealand · 12 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20New%20Zealand%20tour%20package",
        "cta_dest": "New Zealand",
    },
    "destination-azerbaijan.html": {
        "eyebrow": "Azerbaijan · 6 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20an%20Azerbaijan%20tour%20package",
        "cta_dest": "Azerbaijan",
    },
    "destination-malaysia.html": {
        "eyebrow": "Malaysia · 6 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Malaysia%20tour%20package",
        "cta_dest": "Malaysia",
    },
    "destination-europe.html": {
        "eyebrow": "Europe · 14 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Europe%20tour%20package",
        "cta_dest": "Europe",
    },
    "destination-phu-quoc.html": {
        "eyebrow": "Vietnam · 5 Days",
        "wa_text": "Hi!%20I%20am%20interested%20in%20a%20Phu%20Quoc%20tour%20package",
        "cta_dest": "Phu Quoc",
    },
}

# ── 2. Upgrade the dp-hero section ────────────────────────────────────────────
def upgrade_hero(html, eyebrow):
    """
    Insert an eyebrow + WhatsApp scroll-hint into the dp-hero content block.
    Before the <h1> inside .dp-hero-content, inject the eyebrow div.
    Also upgrade .dp-stats divs into glassmorphic pill style via a wrapper class.
    """
    # Add eyebrow before the <h1> in dp-hero-content
    eyebrow_tag = f'<div class="eyebrow dp-eyebrow">{eyebrow}</div>\n'
    html = re.sub(
        r'(<div class="dp-hero-content[^"]*"[^>]*>)\s*(<div class="crumb")',
        lambda m: m.group(1) + "\n" + eyebrow_tag + m.group(2),
        html,
        count=1,
    )

    # Wrap the dp-stats in a new dp-stats-bar wrapper for pill styling
    html = html.replace(
        '<div class="dp-stats">',
        '<div class="dp-stats-bar"><div class="dp-stats">',
        1,
    )
    # Close it after </div> that closes dp-stats
    # Find the first </div> after dp-stats and add the closing wrapper
    html = re.sub(
        r'(</div>\s*</div>\s*</section>\s*<section class="dp-body")',
        r'</div></div></section><section class="dp-body"',
        html,
        count=1,
    )
    return html


# ── 3. Upgrade body sections (dark backgrounds, gold borders) ─────────────────
def upgrade_body_sections(html):
    """
    Wrap dp-body with a dark background inline style.
    Upgrade review-card, itin-day, dp-highlights, dp-overview to dark theme.
    """
    # dp-body section — dark background
    html = html.replace(
        '<section class="dp-body">',
        '<section class="dp-body dp-body-dark">',
        1,
    )

    # review-card — dark
    html = html.replace(
        'class="review-card reveal"',
        'class="review-card review-card-dark reveal"',
    )
    html = html.replace(
        'class="review-card"',
        'class="review-card review-card-dark"',
    )

    # dp-highlights li — dark
    html = html.replace(
        'class="dp-highlights"',
        'class="dp-highlights dp-highlights-dark"',
    )

    # dp-overview h2 — add class
    html = html.replace(
        '<div class="dp-overview reveal">',
        '<div class="dp-overview dp-overview-dark reveal">',
    )

    # itin-day — dark
    html = html.replace(
        'class="itin-day reveal"',
        'class="itin-day itin-day-dark reveal"',
    )

    # sb-list — dark upgrade
    html = html.replace(
        'class="sb-list reveal"',
        'class="sb-list sb-list-dark reveal"',
    )
    html = html.replace(
        'class="sb-list"',
        'class="sb-list sb-list-dark"',
    )

    return html


# ── 4. Upgrade sidebar CTA ────────────────────────────────────────────────────
def upgrade_sidebar(html, wa_text):
    """
    Add a WhatsApp CTA button to the sidebar booking card, below the Enquire Now button.
    """
    wa_btn = (
        f'\n<a class="btn btn-primary" style="width:100%;justify-content:center;margin-top:10px;" '
        f'href="https://wa.me/918679343402?text={wa_text}">Inquire via WhatsApp 📱</a>'
    )
    html = re.sub(
        r'(<a class="btn btn-primary magnetic"[^>]*>Enquire Now.*?</a>)',
        lambda m: m.group(1) + wa_btn,
        html,
        count=1,
    )
    return html


# ── 5. Upgrade CTA section ────────────────────────────────────────────────────
def upgrade_cta(html, wa_text, dest_name):
    """
    Add a WhatsApp button beside the existing Plan My Trip CTA button.
    """
    wa_btn = (
        f' <a class="btn btn-outline magnetic" '
        f'href="https://wa.me/918679343402?text={wa_text}" '
        f'style="border-color:rgba(243,238,225,0.4);color:var(--cream);">WhatsApp Us 📱</a>'
    )
    html = re.sub(
        r'(<a class="btn btn-primary magnetic" href="../index\.html#contact">Plan My Trip →</a>)',
        lambda m: m.group(1) + wa_btn,
        html,
        count=1,
    )
    return html


# ── 6. Main runner ────────────────────────────────────────────────────────────
updated = []
skipped = []

for filename, meta in PAGES.items():
    filepath = os.path.join(DEST_DIR, filename)
    if not os.path.exists(filepath):
        skipped.append(filename)
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    html = upgrade_hero(html, meta["eyebrow"])
    html = upgrade_body_sections(html)
    html = upgrade_sidebar(html, meta["wa_text"])
    html = upgrade_cta(html, meta["wa_text"], meta["cta_dest"])

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

    updated.append(filename)
    print(f"  OK {filename}")

print(f"\nDone. Updated: {len(updated)} | Skipped: {len(skipped)}")
if skipped:
    print("  Skipped:", skipped)
