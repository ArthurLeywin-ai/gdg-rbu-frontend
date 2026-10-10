# GDG RBU Frontend — Content Specification

**Document Version:** 1.1.1  
**Status:** Ready for Implementation Planning  
**Author:** Senior Frontend Architect & UI/UX Engineer  
**Workspace:** `GDG RBU frontend assignment`  
**Agreed Architecture Stack:** Vite + React + TypeScript + Vanilla CSS

---

## 1. Page Structure & Implementation Constraints

### 1.1 Page Structure
The landing page follows a single-page architecture composed of 6 sequential sections:

```
1. Navigation Bar (Brand Emblem + 6 Nav Pills + Profile Chip)
2. Hero Section (Display Title + Tagline + Dual CTAs + Capsule Badge + Decorative Hero Graphic)
3. Upcoming Event Section (Overview Card + Notched Event Ticket Stub)
4. Team Introduction Section (Lead Copy + 2 Feature Highlights + Framed Team Photo)
5. FAQs Section (Accordion Container: 1 Expanded + 4 Collapsed Items)
6. Footer & Contact Section (Brand Header + Address Pill + Email Pill + Social Links + Geometric Strip)
```

### 1.2 Strict Implementation Constraints
* **Native Component Reconstruction:** All layout sections, cards, text, buttons, ticket stubs, and accordion components must be natively implemented using semantic HTML, TypeScript React components, and modular Vanilla CSS.
* **No Screenshot Backgrounds:** Full-page or section reference mockups ([`image 2.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%202.png), [`image 6.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%206.png), [`image 7.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%207.png)) must **never** be used as page backgrounds, image slices, or content substitutes. They serve strictly as visual design contracts.
* **Approved Standalone Assets Only:** Only verified individual assets ([`figma images/gdg logo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/gdg%20logo.png), [`figma images/image 123.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%20123.png), and the extracted [`figma images/team-photo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/team-photo.png)) are imported directly into the application.

---

## 2. Visible Copy Specification

### 2.1 Navigation Bar
* **Brand Emblem:** GDG Bracket Icon ([`gdg logo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/gdg%20logo.png)) *(Observed)*
* **Navigation Labels (Pill Buttons):**
  1. `Home` *(Observed)*
  2. `Team` *(Observed)*
  3. `Events` *(Observed)*
  4. `Gallery` *(Observed)*
  5. `Portfolio` *(Observed)*
  6. `More` *(Observed)*
* **User Profile Chip:**
  * Portrait Avatar *(Observed visual element)*
  * User Name: `Saptanshu Wanjari` *(Observed text)*
  * Dropdown indicator: Down chevron `⌵` *(Observed)*

### 2.2 Hero Section
* **Main Heading (Display 8-Bit Font):**
  * `GOOGLE DEVELOPER GROUPS, RBU` *(Observed, uppercase)*
* **Tagline / Subtitle (Monospace):**
  * `Empowering students with cutting-edge tech skills, community, and resources for a future in technology` *(Observed)*
* **Call-to-Action Buttons:**
  * Primary Button: `LEARN MORE` *(Observed, uppercase)*
  * Secondary Button: `PROFILE` *(Observed, uppercase)*
* **Identity Badge:**
  * `GDG • RBU` *(Observed, capsule pill)*
* **Hero Graphic (Decorative & Non-Interactive):**
  * Asymmetric black silhouette polygon container *(Observed)*
  * White capsule element styled with a magnifying glass icon `🔍` and placeholder text `gdgr` in monospace *(Observed)*
  * **Specification:** Decorative and non-interactive. Recreate its visual appearance faithfully without presenting a nonfunctional search field as an active form control.

### 2.3 Upcoming Event Section
* **Section Heading:**
  * `Upcoming Event` *(Observed, display font, centered)*
* **Left Card (Overview Card):**
  * Card Label: `GDG ORIENTATION` *(Observed)*
  * Status Badge: `UPCOMING` *(Observed pill)*
  * Card Title: `GDG ORIENTATION` *(Observed, bold)*
  * Description *(Observed text with trailing ellipsis)*:
    `Google Developer Groups (GDG) – Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networkin...`
  * Action Icon: Circular button with arrow `↗` *(Observed)*
* **Right Card (Ticket Stub):**
  * Ticket Heading: `New Event` *(Observed, display font)*
  * Perforation divider: Dotted horizontal line *(Observed)*
  * Metadata Label: `DATE & TIME` *(Observed)*
  * Date String: `Oct 7, 2026` *(Observed reference date — Sample/Unverified)*
  * Time String: `3:00 PM` *(Observed reference time — Sample/Unverified)*
  * Button CTA: `Register Now` *(Observed, solid capsule)*

### 2.4 Team Introduction Section
* **Section Heading:**
  * `Meet the Google Developer Group Team` *(Observed, display font)*
* **Lead Paragraph:**
  * `Google Developer Groups (GDG) are open and volunteer-run communities for developers interested in Google technologies. Our team focuses on learning, networking, and collaboration through events and hands-on sessions.` *(Observed)*
* **Feature Bullet 1:**
  * Icon: Checkmark in circle `✓` *(Observed)*
  * Title: `Passionate Community Leaders` *(Observed, bold)*
  * Description: `Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together.` *(Observed)*
* **Feature Bullet 2:**
  * Icon: Checkmark in circle `✓` *(Observed)*
  * Title: `Empowering Developers` *(Observed, bold)*
  * Description: `We host meetups and codelabs to help developers stay current with modern tools and best practices.` *(Observed)*
* **Media Asset:**
  * Standalone team photograph ([`figma images/team-photo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/team-photo.png)) framed in the right column *(Observed)*

### 2.5 FAQs Section
* **Section Heading:**
  * `FAQs` *(Observed, display font, centered)*
* **Questions & Answers:** See detailed breakdown in **Section 3 (FAQ Specification)** below.

### 2.6 Footer & Contact Section
* **Brand Header:**
  * Emblem: GDG Bracket Icon ([`gdg logo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/gdg%20logo.png)) *(Observed)*
  * Title: `Google Developer Groups` *(Observed, display font)*
  * Subtitle: `On Campus • Ramdeobaba University` *(Observed)*
* **Divider:** Dashed line `----------------------------` *(Observed)*
* **Address Card (Blue Pill Container):**
  * Icon: Location Pin `📍` *(Observed)*
  * Line 1: `Ramdeobaba University` *(Observed, bold)*
  * Line 2: `Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013` *(Observed)*
* **Email Card (Yellow Pill Container):**
  * Icon: Mail envelope `✉` *(Observed)*
  * Address: `gdsc@rknec.edu` *(Observed reference email — Unverified)*
* **Social Media Card (Purple Container):**
  * Label: `Follow Us:` *(Observed)*
  * Platforms: Instagram (`📷`), LinkedIn (`in`), X / Twitter (`𝕏`) *(Observed icons)*
* **Bottom Baseline:**
  * Decorative geometric footer strip ([`figma images/image 123.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%20123.png)) *(Observed)*

---

## 3. FAQ Specification (Observed vs. Cautious Drafts)

The reference mockup displays Question 1 in an expanded state with visible answer copy. Questions 2–5 are collapsed with question headers only. 

To maintain strict truthfulness without inventing unverified procedures, team tracks, office hours, or Google agreements, the drafts below use cautious, accurate wording:

| # | Question Header *(Observed)* | State in Reference | Content Source | Content Copy |
| :- | :--- | :--- | :--- | :--- |
| **1** | **What is GDG RBU?** | Expanded | **Observed from Reference** | *“GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.”* |
| **2** | **How to join GDG?** | Collapsed | **Cautious Proposed Draft** | *“Information regarding student membership and onboarding is shared during chapter orientation sessions and official announcements. Check back for upcoming registration details.”* |
| **3** | **What does a GDG Lead do?** | Collapsed | **Cautious Proposed Draft** | *“A GDG Lead coordinates campus chapter activities, facilitates technical workshops, and helps organize events for the student developer community.”* |
| **4** | **How is GDG related to Google?** | Collapsed | **Approved Cautious Draft** | *“GDG communities bring students and developers together to learn, share knowledge, and explore developer technologies. Check the chapter’s official information for details about its specific program.”* |
| **5** | **How to reach us?** | Collapsed | **Cautious Proposed Draft** | *“You can get in touch with the GDG RBU student community using the contact details and social media channels listed below once verified.”* |

---

## 4. Unverified Information & Reference Disclaimers

The following data points are observed in the Figma mockup but have **not** been confirmed as live production data. They must remain explicitly flagged as unverified reference data:

1. **Event Date & Time (`Oct 7, 2026` at `3:00 PM`):**
   * *Status:* Unverified reference-only sample data from the Figma canvas.
   * *Rule:* Must **not** be presented as a verified current or live event without explicit owner confirmation.
2. **Event Registration Destination:**
   * *Status:* No verified destination URL (e.g., Google Form, Bevy community portal) has been provided.
   * *Rule:* Visual design must be fully preserved. If no verified URL is provided, the button must present a **truthful unavailable state** (e.g., an informative notice indicating registration is currently pending). A successful registration must **never** be simulated or faked.
3. **Official Social Media URLs (Instagram, LinkedIn, X):**
   * *Status:* Unverified. No official URLs or handles were provided in the project folder.
   * *Rule:* Do not use `href="#"` jump links. Keep links inert (`aria-disabled="true"`) or await verified URLs from the project owner.
4. **Contact Email Address (`gdsc@rknec.edu`):**
   * *Status:* Unverified legacy domain (`rknec.edu`).
   * *Rule:* Display the observed text visually, but keep the email link inert or pending confirmation rather than assuming it is active.
5. **Profile Destination & Identity (`Saptanshu Wanjari`):**
   * *Status:* Visual element from reference canvas; unverified user session or auth endpoint.
   * *Rule:* Preserved visually. Interactive menus or simulated account destinations must not be invented.
6. **Hero Graphic (`gdgr`):**
   * *Status:* Purely decorative visual element.
   * *Rule:* Recreate its visual appearance faithfully as a decorative, non-interactive graphic (e.g., using `aria-hidden="true"` or a non-interactive styled container). Do not present a nonfunctional search field as a working control or attach active form behaviors.

---

## 5. Interaction Inventory

All interactive elements and their implementation statuses are audited below. Any interaction awaiting owner confirmation is explicitly marked as **Proposed** or **Pending Confirmation**:

| Component / Trigger | Visual Reference | Expected Interaction | Proposed Implementation Strategy | Status |
| :--- | :--- | :--- | :--- | :--- |
| **GDG Logo (Navbar & Footer)** | [`gdg logo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/gdg%20logo.png) | Return to top of page. | Anchor link `<a href="#hero">` with smooth scroll behavior. | **Proposed** |
| **Nav Pill: `Home`** | Blue pill | Jump to top/hero section. | Smooth scroll anchor to `#hero`. | **Proposed** |
| **Nav Pill: `Team`** | Red pill | Jump to team section. | Smooth scroll anchor to `#team`. | **Proposed** |
| **Nav Pill: `Events`** | Yellow pill | Jump to upcoming event section. | Smooth scroll anchor to `#events`. | **Proposed** |
| **Nav Pills: `Gallery` & `Portfolio`** | Green & Purple pills | Distinct destinations (not present on page). | Do not map to unrelated sections or invent dummy pages. Keep inert (`role="link"` with pending status) pending owner clarification. | **Pending Confirmation** |
| **Nav Pill: `More`** | Light blue pill | Unknown action/menu. | Do not invent a dropdown or destination; keep visually identical but inert pending owner clarification. | **Pending Confirmation** |
| **Profile Chip** | Avatar + Name + Chevron | User profile trigger. | Preserve visual appearance. Do not invent profile menus, sign-out actions, or modals; remains unimplemented pending confirmation. | **Pending Confirmation** |
| **Hero Button: `LEARN MORE`** | White neo-brutalist button | Learn about community. | Smooth scroll anchor to `#team` or `#events`. | **Proposed** |
| **Hero Button: `PROFILE`** | White neo-brutalist button | View profile / chapter info. | Smooth scroll anchor to `#team`. | **Proposed** |
| **Hero Graphic (`gdgr`)** | Decorative shape with icon & text | Non-interactive visual element. | Recreate visual appearance faithfully as a decorative element without presenting a nonfunctional search field as an active input control. | **Confirmed (Decorative Only)** |
| **Event Card Arrow Button (`↗`)** | Yellow circular button | Event synopsis link. | Visual CTA icon; keep inert pending confirmation of an event detail view. | **Pending Confirmation** |
| **Ticket Button: `Register Now`** | Solid black capsule | Event registration. | If a verified URL is provided, open externally (`target="_blank"`). If no URL is provided, render in a truthful unavailable state (informative disabled status); **never** simulate registration success. | **Pending Confirmation** |
| **FAQ Accordion Headers** | 5 question cards | Toggle expand/collapse. | Standard WAI-ARIA accordion (`aria-expanded`, single or multi-expandable). Card 1 expanded by default per reference. | **Proposed** |
| **Social Media Icon Buttons** | 3 square buttons | Social channel navigation. | Do not use `href="#"`. Keep inert or open verified URLs in a new tab if provided. | **Pending Confirmation** |

---

## 6. Asset Inventory

| Asset Path | Format & Dimensions | Intended Role | Verification Status |
| :--- | :--- | :--- | :--- |
| [`figma images/gdg logo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/gdg%20logo.png) | PNG, 706 × 372 px | Primary brand emblem for Navbar and Footer Card. | **Verified Original Asset** |
| [`figma images/image 123.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%20123.png) | PNG, 2118 × 200 px | Horizontal decorative geometric baseline banner. | **Verified Original Asset** |
| [`figma images/team-photo.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/team-photo.png) | PNG, 618 × 853 px | Standalone team photograph for Team Introduction. | **Verified Extracted Asset (Phase 1C)** |
| [`figma images/image 2.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%202.png) | PNG, 1443 × 2530 px | Master Figma reference mockup (Page top through Team). | **Design Reference Only (Never Use as Background)** |
| [`figma images/image 6.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%206.png) | PNG, 1443 × 1019 px | Footer & Contact card design reference mockup. | **Design Reference Only (Never Use as Background)** |
| [`figma images/image 7.png`](file:///c:/Users/maana/Downloads/GDG%20RBU%20frontend%20assignment/figma%20images/image%207.png) | PNG, 1443 × 1050 px | FAQs accordion design reference mockup. | **Design Reference Only (Never Use as Background)** |

---

## 7. Decisions Requiring Project Owner Approval

The following items must be formally decided or confirmed by the project owner:

- [ ] **1. Approval of Remaining Cautious FAQ Drafts (Questions 2, 3, and 5):** Confirm adoption of the cautious, truthful drafts for *"How to join GDG?"*, *"What does a GDG Lead do?"*, and *"How to reach us?"* (FAQ 4 is approved).
- [ ] **2. Navigation Mapping for `Gallery`, `Portfolio`, and `More`:** Confirm whether these pills should remain inert visual placeholders on this single-page prototype, or if specific destinations are desired.
- [ ] **3. Event Date Confirmation:** Confirm whether `Oct 7, 2026` at `3:00 PM` should be displayed verbatim as mockup reference text with a sample disclaimer, or replaced with updated event data.
- [ ] **4. "Register Now" Destination URL or Unavailable State:** Confirm whether a live registration URL is available, or approve rendering the button with an informative, truthful unavailable state (no fake success modal).
- [ ] **5. Official Social Media and Email Destinations:** Provide live URLs for Instagram, LinkedIn, and X, as well as confirmation on `gdsc@rknec.edu`, or approve keeping them in an inert state (no `href="#"` dummy links).
- [ ] **6. Profile Chip Behavior:** Confirm that the `Saptanshu Wanjari` profile chip will remain a purely visual presentation component without interactive menus.
