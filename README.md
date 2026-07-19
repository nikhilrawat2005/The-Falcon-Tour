# The Falcon Tour

An elegant, premium travel and tour agency website — 200+ static pages covering destinations, curated packages, activities, and travel guides, backed by Firebase for auth and reviews.

🔗 Live: [thefalcontour.com](https://thefalcontour.com)

---

## Overview

The Falcon Tour is a fully static, multi-page travel website (no build step required) offering:

- **Curated trip packages** across 15+ regions (Europe, Japan, USA, Thailand, Vietnam, Bali, Kerala, Ladakh, Kashmir, Bhutan, Almaty, Sri Lanka, New Zealand, Australia, Asia & Dubai)
- **Destination guides** for individual countries/cities
- **Bookable activities** (scuba diving, desert safari, jet ski, etc.)
- **Long-form travel blogs** with region-specific guides, itineraries, budgets, and FAQs
- **Smart search** across destinations & activities from the homepage
- **User auth + reviews**, powered by Firebase (Auth + Firestore)
- **Trip inquiry / "Plan My Trip"** modal for lead capture

## Project Structure

```
thefalcontour/
├── index.html                  # Homepage — hero, smart search, package carousels, reviews, blog teasers
├── reviews.html                 # Full reviews page
├── admin.html                   # Internal admin page (excluded from sitemap/robots)
├── robots.txt                   # Crawl rules
├── sitemap.xml                  # Full URL sitemap (auto-generated list of all public pages)
├── packages.pdf                 # Downloadable brochure
├── add_homepage_rows.py         # Helper script for scaffolding new homepage package rows
│
├── packages/                    # 77 pages — individual package detail pages, grouped by region
├── destinations/                # 10 pages — destination overview pages + index
├── activities/                  # 11 pages — individual activity pages + index
├── blogs/                       # 109 pages — long-form guides, organized by country/region
│   ├── europe/ austria/ switzerland/ greece/ iceland/ italy/ france/ spain/
│   ├── czech-republic/ netherlands/
│   ├── usa/ japan/ australia/ new-zealand/
│   └── index.html
├── why-us/                      # About / trust page
│
└── assets/
    ├── css/
    │   ├── journal.css          # Main site stylesheet (header, hero, cards, carousels, search, etc.)
    │   ├── home.css              # Homepage-specific overrides
    │   ├── package-detail.css    # Package detail page styles
    │   └── motion.css            # Reduced-motion / animation utilities
    ├── js/
    │   ├── firebase-config.js    # Firebase project config (auth + Firestore)
    │   ├── journal.js            # Shared site behavior
    │   ├── related.js            # "Related content" logic
    │   └── motion/               # Motion/animation library
    └── images/                  # All site imagery, organized by destination
```

## Page Count

| Section | Pages |
|---|---|
| Blogs | 109 |
| Packages | 77 |
| Activities | 11 |
| Destinations | 10 |
| Home / Reviews / Why Us / Admin | 4 |
| **Total** | **211** |

210 of these are listed in `sitemap.xml` (`admin.html` is intentionally excluded and blocked in `robots.txt`).

## Key Features & How They Work

### Smart Search (Homepage)
A single search field (`#smartSearchInput`) matches against both destinations and activities, showing a live dropdown (`#smartSearchDropdown`) of results. Logic lives inline in `index.html` (see the `SMART SEARCH` section).

### Auto-Scrolling Package Carousels
Each region's package row (`.carousel-row`) auto-scrolls continuously right-to-left, pausing on hover/touch. Cards are cloned at runtime to create a seamless loop — rows with very few cards are auto-padded with extra clones so the loop always has enough width to scroll smoothly.

### Reviews
Reviews are fetched from Firestore and rendered into the homepage reviews showcase (`#reviewsShowcaseGrid`) and the full `reviews.html` page. Users can sign in (via the auth modal) and submit their own review.

### Trip Inquiry
The "Plan My Trip" button opens an inquiry modal that captures lead details for the sales team.

## Firebase Setup

This project uses Firebase for authentication and storing reviews. Configuration lives in `assets/js/firebase-config.js`. Make sure a valid Firebase project (Auth + Firestore enabled) is connected before deploying — without it, review submission will show a config warning.

## SEO

- `sitemap.xml` lists every public page for search engines.
- `robots.txt` allows crawling of all pages except `admin.html` and internal JSON/config files.
- Whenever new pages are added (a new package, blog, or destination page), remember to add the corresponding `<url>` entry to `sitemap.xml`.

## Deployment

This is a static site — no build/bundle step is required. Upload the contents of `thefalcontour/` to any static host (Netlify, Vercel, Firebase Hosting, S3 + CloudFront, etc.) and ensure `firebase-config.js` points to your live Firebase project.

## Development Notes

- No frameworks — plain HTML/CSS/JS throughout, so any page can be edited directly.
- Shared styling lives in `assets/css/journal.css`; keep new component styles there for consistency with the rest of the site.
- `add_homepage_rows.py` can help scaffold new package carousel rows on the homepage if you're adding a new region.
