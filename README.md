# The Falcon Tour 🦅🌍

[![Website](https://img.shields.io/badge/Live-thefalcontour.com-D4AF37?style=for-the-badge&logo=google-chrome&logoColor=white)](https://thefalcontour.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-0A0A0A?style=for-the-badge)](LICENSE)

> A modern, ultra-fast, premium travel agency website featuring **171 static pages** covering global destinations, curated itineraries, bookable activities, long-form travel journals, and custom motion design — backed by Firebase for client authentication, review moderation, and trip inquiries.

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Page & Content Breakdown](#-page--content-breakdown)
- [Firebase Integration & Security](#-firebase-integration--security)
- [Admin Dashboard](#-admin-dashboard)
- [SEO & Web Performance](#-seo--web-performance)
- [Design System & Motion Architecture](#-design-system--motion-architecture)
- [Deployment Guide](#-deployment-guide)
- [Maintenance & Development Guidelines](#-maintenance--development-guidelines)

---

## 🌟 Overview

**The Falcon Tour** is an independent, high-performance static multi-page travel portal engineered for luxury travelers, adventure seekers, and family vacationers. The project requires **zero build steps** (no Webpack/Vite/Babel compilation needed) while providing rich dynamic features through modular vanilla JavaScript and Firebase backend services.

### Highlights:
- **Global Coverage**: Over 18+ international and domestic travel sectors (Europe, Japan, USA, Australia, New Zealand, Dubai, Singapore, Bali, Almaty, Thailand, Sri Lanka, Turkey, and more).
- **Zero Build Overhead**: Instant preview, direct file editing, and direct deployment to any Apache/cPanel/Hostinger hosting environment.
- **Enterprise-Grade SEO**: Structured Schema.org microdata (WebPage, BreadcrumbList, Product, Article), Open Graph tags, canonical links, and dynamic sitemap.
- **Client Lead Generation**: Interactive "Plan My Trip" inquiry modal with instant Firestore capture and admin alert mechanism.

---

## 🚀 Key Features

### 1. Smart Omnibox Search
- Located directly in the homepage hero (`#smartSearchInput`).
- Real-time client-side autocomplete matching destination names, countries, trip categories, and adventure activities.
- Instant keyboard navigation and click-through results.

### 2. Auto-Scrolling Region Carousels
- Responsive CSS scroll-snap horizontal carousels (`.carousel-row`) for curated packages.
- Smooth arrow button controllers and touch/swipe optimization for mobile users.
- Cards feature price tags, duration badges, rating stars, and instant CTA links.

### 3. Interactive Flight & World Map
- Built with **Leaflet.js** (`assets/js/flight-map.js`).
- Highlights destinations worldwide with custom branded map pins, tooltips, and deep links to package and destination guides.

### 4. Verified User Reviews System
- Integrated with Firebase Authentication (Google Sign-In).
- Signed-in travelers can submit reviews with star ratings and feedback.
- Reviews default to a `pending` state until verified and published via the Admin Panel.
- Displayed dynamically on `index.html` and dedicated `reviews.html`.

### 5. Lead Capture & Trip Inquiry
- Comprehensive "Plan My Trip" modal.
- Gathers full customer requirements: Traveler Name, Email, Phone/WhatsApp, Destination, Departure Dates, Number of Travelers, and Notes.
- Directly stored in Firestore `submissions` collection for the sales team.

### 6. Protected Admin Dashboard (`admin.html`)
- Gated behind client-side and server-side Firebase security rules.
- Whitelist restricted to authorized administrator emails.
- Live tabs for:
  - **Logins**: View registered Google users and account timestamps.
  - **Trip Inquiries**: Real-time listing of customer quote inquiries with direct phone/email contact links.
  - **Reviews**: Live moderation panel to approve or delete customer submissions.

---

## 🛠️ Architecture & Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Core Frontend** | HTML5, Modern CSS3, ES6+ Vanilla JS | High-speed, semantic, accessible markup without framework bloat |
| **Styling & Tokens** | CSS Variables, Clamp-based Fluid Typography | Unified typography scale, color tokens (`--amber`, `--ink`, `--cream`), responsive spacing |
| **Animations & Motion** | GSAP (GreenSock), Motion modules | Scroll-triggered reveals, card tilts, custom cursor, counter animations |
| **Interactive Map** | Leaflet.js | Lightweight, interactive vector world map showing travel destinations |
| **Backend as a Service** | Google Firebase v10 (Compat) | Firebase Authentication (Google OAuth) + Cloud Firestore NoSQL Database |
| **Server & Caching** | Apache (`.htaccess`) | HSTS, security headers, Gzip/Brotli compression, 301 redirects, 1-year asset caching |
| **Typography** | Google Fonts | `Fraunces` (Editorial Serif), `Manrope` (Clean Sans), `JetBrains Mono` (Data/Badges) |

---

## 📂 Project Directory Structure

```text
The-Falcon-Tour/
├── index.html                  # Main homepage (Hero, Smart Search, Package Carousels, Reviews)
├── reviews.html                # Public reviews showcase & review submission
├── admin.html                  # Restricted admin portal (Auth, Inquiries, Review Moderation)
├── privacy-policy.html         # Legal: Privacy policy & data protection
├── terms-and-conditions.html   # Legal: Booking conditions, cancellations & terms
├── 404.html                    # Custom branded 404 error page
├── sitemap.xml                 # XML sitemap for Google/Bing webmaster crawlers
├── robots.txt                  # Search engine crawling rules & exclusions
├── .htaccess                   # Apache server rules, HSTS, gzip, 301 legacy redirects
├── firestore.rules             # Cloud Firestore read/write/delete authorization policies
│
├── packages/                   # 77 pages — Curated travel package itineraries
│   ├── index.html              # Main package directory listing
│   ├── package-*.html          # 70 detailed tour package itineraries
│   └── trip-*.html             # 6 specialized theme tours (Adventure, Luxury, Honeymoon, etc.)
│
├── destinations/               # 10 pages — Deep country & regional guides
│   ├── index.html              # All destinations directory
│   ├── destination-europe.html
│   ├── destination-japan.html
│   ├── destination-dubai.html
│   └── ...                     # (Azerbaijan, Malaysia, New Zealand, Phu Quoc, Singapore, etc.)
│
├── activities/                 # 11 pages — Destination experiences & adventure activities
│   ├── index.html              # Activities index
│   ├── activity-scuba-diving.html
│   ├── activity-desert-safari.html
│   ├── activity-skyline-luge.html
│   └── ...                     # (ATV, Cable Car, Jet Ski, Dune Buggy, Snorkeling, etc.)
│
├── blogs/                      # 66 pages — Long-form travel guides, budgets & FAQs
│   ├── index.html              # Travel journal index & category overview
│   ├── australia/              # 10 blog guides (Sydney, Melbourne, Great Barrier Reef, etc.)
│   ├── japan/                  # 12 blog guides (Tokyo, Kyoto, Cherry Blossom, JR Pass, etc.)
│   ├── new-zealand/            # 10 blog guides (Queenstown, Milford Sound, South Island, etc.)
│   ├── usa/                    # 14 blog guides (NYC, West Coast, National Parks, Hawaii, etc.)
│   └── ...                     # Additional country guides (Austria, Switzerland, France, Italy, etc.)
│
├── why-us/                     # 1 page — Trust, company values, falcon guarantee
│   └── index.html
│
└── assets/
    ├── css/
    │   ├── journal.css         # Primary global stylesheet & design token system
    │   ├── home.css            # Homepage carousel & hero layout overrides
    │   ├── package-detail.css  # Itinerary timeline & booking bar styles
    │   └── motion.css          # Keyframe animations, reveal classes & transitions
    ├── js/
    │   ├── firebase-config.js  # Firebase app init, user menu injection, admin whitelist
    │   ├── journal.js          # Main UI controller (Header scroll, hamburger nav, search, modals)
    │   ├── flight-map.js       # Leaflet.js interactive world map engine
    │   ├── custom-cursor.js    # Bespoke cursor trail & hover effect
    │   └── motion/             # Granular micro-interaction modules:
    │       ├── blog-article.js    # Article reading progress & scroll cues
    │       ├── buttons.js         # Magnetic & ripple button interactions
    │       ├── chrome-fx.js       # Navbar glassmorphism & backdrop filters
    │       ├── counters.js        # Number stat counters on scroll
    │       ├── footer.js          # Footer reveal animations
    │       ├── gsap-init.js       # GSAP & ScrollTrigger setup
    │       ├── images.js          # Lazy load parallax & image zoom
    │       ├── listing.js         # Package filter animations
    │       ├── navbar.js          # Mobile drawer toggle & focus trap
    │       ├── package-detail.js  # Sticky booking sidebar controller
    │       └── reveal-tilt.js     # 3D perspective hover cards
    └── images/                 # Optimized static imagery (.webp, .jpg, .png) organized by region
```

---

## 📊 Page & Content Breakdown

| Directory / Area | HTML Page Count | Description |
|---|:---:|---|
| **Root Pages** | **6** | `index.html`, `admin.html`, `reviews.html`, `privacy-policy.html`, `terms-and-conditions.html`, `404.html` |
| **Packages (`packages/`)** | **77** | 1 Directory Index + 70 Package details + 6 Theme trips |
| **Destinations (`destinations/`)** | **10** | 1 Directory Index + 9 Regional landing pages |
| **Activities (`activities/`)** | **11** | 1 Directory Index + 10 Adventure activity guides |
| **Blogs & Guides (`blogs/`)** | **66** | 1 Directory Index + 65 Destination guides across 18 countries |
| **Why Choose Us (`why-us/`)** | **1** | Company trust signals, traveler testimonials, operator credentials |
| **Total HTML Pages** | **171** | Fully linked, valid, SEO-optimized static web pages |

---

## 🔒 Firebase Integration & Security

### 1. Configuration & SDK
Client configuration is stored in `assets/js/firebase-config.js` and loaded via Firebase v10 Compat CDN scripts:
- `firebase-app-compat.js`
- `firebase-auth-compat.js`
- `firebase-firestore-compat.js`

### 2. Administrator Whitelist
Superadmin access is validated on both client-side UI and Firestore database rules:
```javascript
window.ADMIN_EMAILS = [
  'nikhil2005114@gmail.com',
  'manishrawat2636@gmail.com',
  'thefalcontour@gmail.com'
];
```

### 3. Firestore Collections & Security Rules (`firestore.rules`)
```text
service cloud.firestore {
  match /databases/{database}/documents {
    // USERS: Profile records
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    // SUBMISSIONS: Trip inquiry lead capture
    match /submissions/{subId} {
      allow create: if true;               // Public can send inquiry
      allow read, update, delete: if isAdmin(); // Admin-only viewing
    }
    // REVIEWS: Customer reviews
    match /reviews/{reviewId} {
      allow create: if request.auth != null && request.resource.data.status == 'pending';
      allow read: if true;
      allow update, delete: if isAdmin();
    }
  }
}
```

To deploy rules updates via Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## 🛡️ Admin Dashboard

The Admin Portal (`admin.html`) provides a dark-themed, centralized back-office control panel:
1. **Logins Screen**: Automatic security handshake checking authenticated Google credentials against `ADMIN_EMAILS`. Unauthorized visitors are redirected to the homepage.
2. **Logins Tab**: Displays full registered customer list, avatars, email identifiers, and signup dates.
3. **Trip Inquiries Tab**: Real-time accordion listing all booking inquiries received via the "Plan My Trip" modal, with quick action links to call/WhatsApp or email travelers.
4. **Reviews Tab**: Moderation queue allowing admins to approve pending reviews for public display or remove spam entries.

---

## ⚡ SEO & Web Performance

- **Structured Data (JSON-LD)**: Rich schema tags for `WebPage`, `BreadcrumbList`, and `TravelAgency` across all pages.
- **Canonical URLs**: Explicit self-referencing canonical tags on all 171 HTML files to prevent duplicate content penalties.
- **Search Engine Directives**:
  - `robots.txt`: Blocks search bots from indexing `/admin.html`, `*.json`, `skills-lock.json`, and `.agents/`.
  - `admin.html`: Explicitly tagged with `<meta name="robots" content="noindex, nofollow">`.
- **Sitemap**: Maintained at `sitemap.xml` with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`.
- **Browser Caching & Compression**:
  - `.htaccess` enforces 1-year immutable caching for static assets (`.jpg`, `.webp`, `.png`, `.css`, `.js`).
  - Gzip / Brotli compression configured via `mod_deflate`.
  - Full 301 redirect map preserving SEO equity from legacy URL routes.

---

## 🎨 Design System & Motion Architecture

The UI is built on an editorial, luxury travel aesthetic:

### Color Palette (CSS Variables in `:root`)
- `--ink`: `#0A0A0A` (Deep Obsidian Black)
- `--charcoal`: `#1C1C1C` (Dark Surface Container)
- `--cream`: `#F5F5F4` (Clean Warm Editorial Background)
- `--amber`: `#D4AF37` (Rich Gold / Accent Brand Color)
- `--amber-2`: `#E4C462` (Gold Hover Glow)
- `--text-dark`: `#1B1F23` (High-contrast typography)

### Motion Modules (`assets/js/motion/`)
- Non-blocking, standalone modules loaded conditionally.
- Includes 3D tilt on package cards, smooth sticky navigation states, counter roll-ups, and custom cursor animations that automatically deactivate on touch devices.

---

## 🚢 Deployment Guide

### Deploying to Hostinger / cPanel / Apache

Because **The Falcon Tour** is 100% static HTML/CSS/JS:

1. **Connect via FTP / SFTP or File Manager**:
   - Use FileZilla, Cyberduck, or Hostinger's browser-based File Manager.
2. **Upload to Web Root**:
   - Upload the entire project directory contents directly into `public_html/`.
3. **Verify Configuration**:
   - Confirm `.htaccess` is uploaded (ensure hidden dotfiles are visible in your FTP client).
   - Ensure the `assets/images/` directory structure is preserved completely.
4. **Files to Exclude from Production Upload**:
   - `.git/` & `.gitignore`
   - `.vscode/`
   - `.agents/`
   - `README.md`
   - `skills-lock.json`
   - `problems*.txt`

---

## 💻 Maintenance & Development Guidelines

1. **Adding a New Package**:
   - Copy a template package (e.g., `packages/package-best-of-almaty.html`).
   - Update itinerary days, inclusions, pricing, title, meta tags, and schema markup.
   - Add a card link into `index.html` carousel row and `packages/index.html`.
   - Add URL to `sitemap.xml`.

2. **Adding a New Blog Guide**:
   - Place inside the appropriate `blogs/<country>/` folder.
   - Update `blogs/index.html` with a card preview.
   - Register the new URL in `sitemap.xml`.

3. **Styling Edits**:
   - Maintain global tokens in `assets/css/journal.css`.
   - Avoid hardcoding colors or arbitrary pixel spacings; use defined tokens (`--amber`, `--space-md`, `--radius-card`).

---

## 📄 License & Ownership

© **The Falcon Tour**. All rights reserved.  
Unauthorized duplication, distribution, or commercial use of brand assets, itineraries, and design assets is strictly prohibited.
