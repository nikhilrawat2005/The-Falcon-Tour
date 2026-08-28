# The Falcon Tour

A premium travel agency website — 210+ static pages covering destinations, curated packages, activities, and long-form travel guides, backed by Firebase for authentication and reviews.

🔗 Live: [thefalcontour.com](https://thefalcontour.com)

---

## Overview

The Falcon Tour is a fully static, multi-page travel website (no build step required) offering:

- **Curated trip packages** across 15+ regions (Europe, Japan, USA, Thailand, Vietnam, Bali, Kerala, Ladakh, Kashmir, Bhutan, Almaty, Sri Lanka, New Zealand, Australia, Singapore, Dubai & more)
- **Destination guides** for individual countries/cities
- **Bookable activities** (scuba diving, desert safari, jet ski, cable car, ATV ride, etc.)
- **Long-form travel blogs** with region-specific guides, itineraries, budgets, and FAQs
- **Smart search** across destinations & activities from the homepage
- **User auth + reviews**, powered by Firebase (Auth + Firestore)
- **Trip inquiry / "Plan My Trip"** modal for lead capture
- **Admin dashboard** protected by Firebase Auth — for managing logins, inquiries, and reviews
- **Interactive flight map** showing all destinations on a Leaflet.js world map

---

## Project Structure

```
thefalcontour/
├── index.html                  # Homepage — hero, smart search, package carousels, reviews, blog teasers
├── reviews.html                # Full reviews page
├── admin.html                  # Internal admin dashboard (Firebase Auth protected)
├── 404.html                    # Custom 404 error page
├── robots.txt                  # Crawl rules
├── sitemap.xml                 # Full URL sitemap
├── .htaccess                   # Apache/Hostinger security & caching rules
├── firestore.rules             # Firebase Firestore security rules
│
├── packages/                   # 77 pages — individual package detail pages, grouped by region
├── destinations/               # 10 pages — destination overview pages + index
├── activities/                 # 11 pages — individual activity pages + index
├── blogs/                      # 113 pages — long-form guides, organized by country/region
│   ├── europe/ austria/ switzerland/ greece/ iceland/ italy/ france/ spain/
│   ├── czech-republic/ netherlands/ singapore/ dubai/
│   ├── usa/ japan/ australia/ new-zealand/
│   └── index.html
├── why-us/                     # About / trust page
│
└── assets/
    ├── css/
    │   ├── journal.css         # Main site stylesheet (header, hero, cards, carousels, search, etc.)
    │   ├── home.css            # Homepage-specific overrides
    │   ├── package-detail.css  # Package & activity detail page styles
    │   └── motion.css          # Animation utilities (used in packages, blogs, activities)
    ├── js/
    │   ├── firebase-config.js  # Firebase project config (Auth + Firestore + user menu)
    │   ├── journal.js          # Shared site behavior (navbar, burger menu, scroll)
    │   ├── flight-map.js       # Interactive Leaflet.js world map
    │   ├── custom-cursor.js    # Custom cursor effect
    │   └── motion/             # Component-level JS (navbar, listing, package-detail, footer, etc.)
    └── images/                 # All site imagery organized by destination folder
```

---

## Page Count

| Section | Pages |
|---|---|
| Blogs | 113 |
| Packages | 77 |
| Activities | 11 |
| Destinations | 10 |
| Home / Reviews / Why Us / Admin / 404 | 5 |
| **Total** | **216** |

---

## Key Features & How They Work

### Smart Search (Homepage)
A single search field (`#smartSearchInput`) matches against both destinations and activities, showing a live dropdown of results. Supports fuzzy matching on country names, destinations, and package types.

### Auto-Scrolling Package Carousels
Each region's package row (`.carousel-row`) displays cards horizontally with scroll-snap. Cards are grouped by region (Dubai, Europe, Japan, Thailand, etc.) with prev/next navigation buttons.

### Interactive Flight Map
A Leaflet.js powered world map (`assets/js/flight-map.js`) shows all destinations the agency covers, with clickable markers linking to destination pages.

### Reviews System
Reviews are fetched from Firestore and rendered in the homepage reviews showcase and the full `reviews.html` page. Signed-in users can submit reviews; admins can approve or delete them from the admin panel.

### Admin Dashboard
`admin.html` is protected by Firebase Auth — only emails listed in `ADMIN_EMAILS` inside `firebase-config.js` can access it. It shows:
- Registered users (Logins tab)
- Trip inquiry submissions (Inquiries tab)
- User reviews with approve/delete controls (Reviews tab)

### Trip Inquiry
The "Plan My Trip" button opens a modal capturing name, email, phone, destination, travel dates, number of travellers, and message — saved to Firestore `submissions` collection.

---

## Firebase Setup

Uses Firebase Authentication (Google Sign-In) and Firestore. Config lives in `assets/js/firebase-config.js`.

Admin emails are defined in:
```js
window.ADMIN_EMAILS = ['nikhil2005114@gmail.com', 'manishrawat2636@gmail.com', 'thefalcontour@gmail.com'];
```

Firestore security rules are in `firestore.rules` — deploy these via Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## SEO

- `sitemap.xml` lists every public page.
- `robots.txt` allows crawling of all pages except `admin.html` and internal config files.
- Each page has full Open Graph, Twitter Card, and JSON-LD structured data.
- Whenever new pages are added, update `sitemap.xml` accordingly.

---

## Deployment (Hostinger)

This is a **pure static site** — no build/bundle step required.

1. Upload the full project to `public_html/` on Hostinger via File Manager or FTP
2. `.htaccess` handles HTTPS redirect, security headers, and long-term caching automatically
3. Make sure `assets/images/` is fully uploaded — especially the `almaty/` folder

**Do NOT upload to server:**
- `skills-lock.json` (AI tool file, already blocked in `.htaccess`)
- `README.md` (developer docs)

---

## Development Notes

- No frameworks — plain HTML/CSS/JS throughout. Any page can be edited directly.
- Shared styling lives in `assets/css/journal.css` — keep new component styles there for consistency.
- Homepage is `index.html` (~218 KB) — it contains all package carousel rows inline for performance.
- All CSS variables (colors, spacing, typography) are defined at the top of `journal.css` in `:root`.
