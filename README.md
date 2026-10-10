# GDG RBU — Frontend Assignment

Frontend web application for Google Developer Groups On Campus — Ramdeobaba University (GDG RBU), built with a modern Neo-Brutalist design language and interactive 3D elements.

---

## Tech Stack

* **Framework & Tooling:** React 19, Vite, TypeScript
* **Styling:** Vanilla CSS with custom Neo-Brutalist design tokens (high-contrast borders, bold typography, hard shadows)
* **3D Visuals:** Three.js for interactive canvas rendering
* **Icons & Assets:** Optimized SVG & PNG assets

---

## Current Status & Implemented Features

### 1. Navigation & Branding
* Fixed-position responsive navbar with GDG logo and navigation links.
* Responsive desktop and mobile "Join Us" CTA triggers.
* Favicon corrected with 1:1 square canvas, centered artwork, and transparent padding (`/favicon.png`).

### 2. Neo-Brutalist Hero Section
* Dynamic headline, subtext, and call-to-action buttons.
* Three.js interactive 3D hero canvas integration.

### 3. "Join Us" Notification & Alert Interactions
* **Neo-Brutalist Styling:** `#FFEB60` background, `3px solid #000000` border, `8px` border radius, and `4px 4px 0 #000000` hard shadow.
* **Responsive Layout:** Dynamic width with flexible text wrapping, tested across mobile (375px, 390px, 430px) and desktop viewports.
* **Dismissal Methods:**
  * Click-outside-to-dismiss (with pointer-down capture and a 150ms guard against opening clicks).
  * Accessible ✕ button.
  * 4.5-second automatic dismissal timer.
* **Animation 1 — Column Assembly Entrance:**
  * Alert visibly assembles across 10 vertical columns progressing from left to right.
  * Thin dashed grid lines (`1.5px dashed rgba(0, 0, 0, 0.45)`) visible between columns during assembly.
  * Inner content reveals in synchronization via `clip-path: inset(0 100% 0 0)` to `clip-path: inset(0 0% 0 0)`.
  * Grid lines vanish at assembly completion, resolving into the finished neo-brutalist alert.
* **Animation 2 — Upward Square-Shatter Exit:**
  * All dismissal methods (✕ button, outside-click, 4.5s auto-dismiss) route through the same shatter exit pipeline.
  * Notification divides into 78 small square tiles (~20px each).
  * Tiles exhibit an initial visible fracture before erupting upward off-screen with varied speeds and slight horizontal variation.
  * Temporary DOM elements and animation states are cleanly garbage-collected upon completion (850ms).

---

## Verification Status

| Feature / Subsystem | Verification Method | Status |
|---|---|---|
| Production Build | `npm run build` | Verified (Pass, 0 errors) |
| Favicon Proportions & Assets | Headless Browser / Live Inspection | Verified |
| Neo-Brutalist Toast Styling & Mobile Wrap | Headless Browser (375px–1280px) | Verified |
| Outside-Click Dismissal & ✕ Button | Live Browser CDP Interaction | Verified |
| 4.5-Second Auto-Dismiss | Live Browser CDP Timer Test | Verified |
| Animation 1 (Column Assembly Entrance) | Live Browser CDP & Frame Inspection | Verified |
| Animation 2 (Upward Square-Shatter Exit) | Live Browser CDP & Frame Inspection | Verified |
| Animation 3 (Directional Cursor) | Not implemented yet | Planned |
| Animation 4 (Interactive 3D Sponge Grid) | Not implemented yet | Planned |

---

## Next Steps

1. **Animation 3:** Directional cursor tracking.
2. **Animation 4:** Interactive 3D sponge grid effect.
3. Content sections expansion (About, Events, Team, Contact).

---

## Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
