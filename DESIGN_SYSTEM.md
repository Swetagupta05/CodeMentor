# CODEMENTOR — REFINED PROFESSIONAL UI SPECIFICATION
## Editorial Developer Education Platform & Design System
**Version:** 4.0.0 — Editorial Design Language, Signature Green Blade Auth & Dedicated Internal Learning Pages  
**Product Category:** Engineering Education, Coding Practice & Placement Preparation SaaS  
**Tagline:** *"Learn. Practise. Build. Get Hired."*  
**Visual Inspiration:** Editorial Journal (Serif Typographic Elegance) • Linear (Precision) • Raycast (Dark Surfaces) • GitHub (Developer Data) • Vercel (Minimal Hierarchy)

---

## 1. Visual Direction & Design Philosophy

The design marries a **scholarly, editorial elegance** with **disciplined, high-precision developer engineering**:
- **Deep Emerald Green Palette:** `#003D30`, `#075B45`, `#087653`, `#146B50`, `#05271F` evoking prestigious institutional libraries and modern dev tools.
- **Warm Ivory and Cream Surfaces:** `#F7F2E7`, `#EFE7D7`, `#E6D5B7` providing human warmth, organic contrast, and restful readability without blinding pure-white glare.
- **Muted Gold & Champagne Highlights:** `#D6A94F` and `#E7C77E` applied with discipline to active states, lit seams, milestone badges, and section anchors.
- **Editorial Typography Pairing:** High-contrast display serifs (*Playfair Display* & *Cormorant Garamond*) for heroic titles and major headers, paired with *Manrope* and *Inter* for crisp user interface controls and *JetBrains Mono* for code and asymptotic complexities.
- **Signature Diagonal Green Blade Animation:** A sweeping skewed diagonal overlay (`transform: skewX(-10deg) translateX(...)`) with dual illuminated seam edges separating form inputs and welcome panels during Sign In and Sign Up transitions with zero page-fade cuts.
- **Dedicated Internal Environments:** Dedicated standalone pages for Course Curriculums (`view-course-detail`), Interactive Lesson Readers (`view-lesson-detail`), and Curated Technical Resources (`view-resource-detail`).
- **Complete End-to-End Surface:** 20 production screens and dedicated internal environments spanning student learning, deep interview preparation, portfolio building, public marketing, and authentication.

---

## 2. Global Layout Shell Architecture

The desktop application layout uses a strict three-region CSS Grid:

```css
.app-shell {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  grid-template-rows: 72px minmax(0, 1fr);
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  background-color: #101815;
}
```

### 2.1 Fixed Left Sidebar
- **Width:** `248px` fixed.
- **Height:** `100dvh` (Full viewport height).
- **Position:** Grid column 1, rows 1 / 3.
- **Background:** `#121C18` with opaque surface (content never scrolls behind).
- **Three Internal Regions:**
  1. **Logo Header (`sidebar-logo`):** 72px height, 36px minimal geometric CodeMentor mark in jade-to-mint (`#367D69` to `#77D0B8`), 19px Manrope 700 brand title, and "IT PREP HUB" subtitle.
  2. **Navigation Area (`sidebar-navigation`):** Scrollable internally if content overflows (`overflow-y: auto`). 38px height items with 14px typography organized into six logical sections:
     - **LEARNING:** Dashboard, Learning Paths, Courses & Resources
     - **PRACTICE:** DSA Practice, Interview Preparation, Coding Challenges
     - **BUILD:** Projects
     - **MY PROGRESS:** Progress & Analytics, Bookmarks
     - **ACCOUNT:** Student Profile, Settings
     - **PUBLIC PORTAL:** Landing Page, Sign In / Register
  3. **Anchored Bottom Profile Card (`sidebar-profile`):** Permanently anchored at the bottom with a solid `#121C18` background and `#223129` separator. Displays 36px student portrait avatar, 13.5px student name (`Sweta Gupta`), and 12px email. Clicking switches straight to the Student Profile view. **Never scrolls away.**

### 2.2 Fixed Top Application Header (Navbar Redesign)
- **Height:** `72px` fixed.
- **Position:** Grid column 2, row 1.
- **Background:** `#121C18` with bottom border `#2A3931`.
- **Padding:** `0 32px` with vertical centering (`items-center`).
- **Components & Dimensional Specifications:**
  - **Breadcrumbs:** `13.5px` Inter, `#75857B` to active `#F1F5F2` indicator.
  - **Global Search Input:** Responsive width (`380px–440px`), `42px` height, `13.5px` text, `#17231D` background, `Ctrl K` shortcut.
  - **Notification Control:** `40px × 40px` rounded button with `19px` bell icon and unread indicator dot.
  - **Learning Streak Counter:** `40px` height, `13.5px` text with `18px` flame icon (`🔥 18 Days`).
  - **Profile Avatar:** `38px × 38px` rounded avatar with `#2B6555` border.
- **Never scrolls away or disappears during page navigation.**

### 2.3 Independently Scrollable Main Content Area
- **Position:** Grid column 2, row 2.
- **Height:** `calc(100dvh - 72px)`.
- **Overflow:** `overflow-y: auto; overflow-x: hidden;`.
- **Background:** `#101815`.
- **Padding:** `24px 32px 48px`.
- **Max Width:** `1400px` centered.
- **This is the ONLY scrolling area in the application.**

---

## 3. Strict 9-Level Typography Scale

All typography across all 17 screens strictly adheres to this mathematical hierarchy without arbitrary font sizes or sub-12px micro-text:

| Level | Class | Font Family | Size | Weight | Line Height | Role |
|---|---|---|---|---|---|---|
| **Display** | `.cm-display` | `Manrope` | 40px | 750 | 1.15 | Hero headings on Landing & Public views |
| **Page Title** | `.cm-page-title` | `Manrope` | 28px | 700 | 1.25 | Primary screen headings across all views |
| **Section Title** | `.cm-section-title` | `Manrope` | 19px | 700 | 1.35 | Section headers inside cards and views |
| **Card Title** | `.cm-card-title` | `Inter` | 16px | 600 | 1.40 | Component headings & roadmap items |
| **Body** | `.cm-body` | `Inter` | 14px | 400–500 | 1.50 | Standard interface copy, lists, table rows |
| **Navigation** | `.cm-nav-item` | `Inter` | 14px | 500 | 1.00 | Sidebar links, tabs, navbar breadcrumbs |
| **Supporting** | `.cm-supporting` | `Inter` | 13px | 400 | 1.45 | Helper descriptions, timestamps, subheadings |
| **Metadata** | `.cm-metadata` | `JetBrains Mono` | 12px | 500 | 1.40 | Badges, code snippets, tags, company labels |
| **Statistics** | `.cm-stat-num` | `Manrope` | 30px | 750 | 1.10 | Metric counters (`tabular-nums`) |

```css
/* Typography Scale CSS */
.cm-display {
  font-family: var(--cm-font-display);
  font-size: 40px;
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--cm-text-primary);
}

.cm-page-title {
  font-family: var(--cm-font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--cm-text-primary);
}

.cm-section-title {
  font-family: var(--cm-font-display);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: var(--cm-text-primary);
}

.cm-card-title {
  font-family: var(--cm-font-sans);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--cm-text-primary);
}

.cm-body {
  font-family: var(--cm-font-sans);
  font-size: 14px;
  line-height: 1.5;
  color: var(--cm-text-secondary);
}

.cm-supporting {
  font-family: var(--cm-font-sans);
  font-size: 13px;
  line-height: 1.45;
  color: var(--cm-text-muted);
}

.cm-metadata {
  font-family: var(--cm-font-mono);
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.cm-stat-num {
  font-family: var(--cm-font-display);
  font-size: 30px;
  font-weight: 750;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

.cm-stat-label {
  font-family: var(--cm-font-sans);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--cm-text-muted);
}
```

---

## 4. Refined Color System & Proportion Rules

To avoid monochromatic green fatigue or looking like a generic template, the design balances dark forest structural depth with warm ivory content surfaces and muted champagne-gold highlights:

```css
/* Deep Emerald & Forest Surfaces */
--cm-bg-app:           #05271F;  /* Deep dark forest canvas */
--cm-bg-sidebar:       #021B15;  /* Anchored navigation sidebar */
--cm-bg-header:        #021B15;  /* Fixed 72px top application bar */
--cm-card:             #093327;  /* Standard dark forest card surfaces */
--cm-card-elevated:    #0C3C2E;  /* Elevated cards, active pills, dropdowns */
--cm-green-deep:       #003D30;  /* Deep emerald banner background */
--cm-green-rich:       #094D3B;  /* Emerald highlights and borders */
--cm-green-primary:    #075B45;  /* Primary brand emerald */

/* Warm Ivory & Cream Contrast Surfaces */
--cm-ivory:            #F7F2E7;  /* High-contrast content card background (.cm-card-ivory) */
--cm-cream:            #EFE7D7;  /* Soft cream secondary tags and pill fills */
--cm-cream-border:     #E6D5B7;  /* Ivory card structural borders */
--cm-dark-text:        #18251F;  /* Primary text on ivory/cream surfaces */
--cm-ivory-muted:      #556E62;  /* Subtitles & metadata on ivory surfaces */

/* Muted Champagne Gold & Jade Accents */
--cm-gold-muted:       #D6A94F;  /* Editorial display emphasis, active states, lit blade seam */
--cm-gold-soft:        #E7C77E;  /* Secondary champagne highlights & streak counters */
--cm-jade-accent:      #2B7861;  /* Balanced secondary accents (not neon mint) */
--cm-jade-light:       #63A982;  /* Tertiary badges & labels */

/* High-Contrast Typography */
--cm-text-primary:     #F7F2E7;  /* Primary cream/ivory text on dark surfaces */
--cm-text-secondary:   #B7C8BE;  /* Secondary calm green text */
--cm-text-muted:       #82958A;  /* Subtle captions & metadata */
--cm-text-disabled:    #4D6658;

/* Structural Borders */
--cm-border:           #184D3F;  /* Refined dark emerald borders */
--cm-border-subtle:    #113D32;  /* Inset separators */
--cm-border-gold:      #D6A94F;  /* Highlight and focus borders */

/* Status Indicators */
--cm-success:          #63A982;  /* Easy / Solved / Passed */
--cm-warning:          #E7C77E;  /* Medium / Streaks / Alerts */
--cm-error:            #DF8585;  /* Hard / Urgent deadlines */
```

### Color Proportion Discipline
1. **Never use `#087653` as the background of every card.** Large saturated green cards are forbidden.
2. **Deep emerald (`#003D30` / `#05271F` / `#093327`)** forms the grounding structural base.
3. **Warm Ivory (`#F7F2E7`)** is introduced selectively on 1-2 highlight cards per view (e.g., Target Placement Profile, Flagship Project, Curated Study Guides, Core Metrics) to create authentic editorial contrast.
4. **Muted Gold (`#D6A94F`)** replaces neon mint as the primary luxury accent for active states, key milestones, and illuminated seams.


---

## 5. Full-Width GitHub-Style Learning Activity Contribution Graph
### Refined Understated Developer Heatmap

The **Learning Activity contribution graph** adheres to an understated, elegant, GitHub-inspired green heatmap design:

- **Muted Emerald Card Background:** `#1B2822` with subtle structural border (`#2A3931`) and rounded corners (`var(--cm-radius-lg)`).
- **Five-Level Green Contribution Scale:**
  - `Level 0 (--cm-heat-0)`: `#223129` (No activity, border `#2A3931`)
  - `Level 1 (--cm-heat-1)`: `#254D3E` (Low activity: 1-2 contributions)
  - `Level 2 (--cm-heat-2)`: `#33765B` (Moderate activity: 3-4 contributions)
  - `Level 3 (--cm-heat-3)`: `#4B9F79` (High activity: 5-6 contributions)
  - `Level 4 (--cm-heat-4)`: `#77D0B8` (Very high activity: 7+ contributions, soft mint/jade)
- **Zero Amber/Gold Cells:** Golden-yellow and amber levels are completely removed from the heatmap in favor of calm, cohesive GitHub green tones.
- **Warm White Typography:** `#F1F5F2` for titles, metric figures, and tooltip headings; `#A8B5AD` for supporting descriptions; `#75857B` for axis labels.
- **Full-Width Responsive 52-Week Grid:** 52 weekly columns $\times$ 7 weekday rows with aspect-ratio 1:1 square cells and 4px gap spanning 100% of the content card.
- **Labels & Metas:** Dynamic month labels above aligned with week columns; weekday labels (Mon, Wed, Fri) aligned to 7 rows.
- **Total Contributions Counter:** Tabular 20px counter (`1,248 contributions`).
- **Date Range Selectors:** Segmented pill toggle (`Last 12 Months`, `2026`, `2025`) with active state (`#1B2822`, `#77D0B8`, border `#2B6555`).
- **Five-Step Less → More Legend:** Swatches matching the exact 5 green levels (`#223129` → `#254D3E` → `#33765B` → `#4B9F79` → `#77D0B8`).
- **Sub-Footer Summary:** Current Streak (`18 Days`, `#77D0B8`), Longest Streak (`42 Days`, `#F1F5F2`), and Yearly Consistency (`89.4%`, `#77D0B8`).

---

## 6. Complete 20-Screen UI & Component Inventory

| # | Screen / View Name | Identifier / Trigger | Key Functionality & Layout |
|---|---|---|---|
| 1 | **Dashboard** | `view-dashboard` | Daily greeting (`.cm-page-title`), 4 metric cards (`.cm-stat-num`), active roadmaps with one-click course navigation, today's goals toggler, 5-pillar placement gauge, **Full-Width GitHub-Style Learning Activity Contribution Graph** (52 cols $\times$ 7 rows), upcoming workshops & placement deadlines. |
| 2 | **Learning Paths** | `view-learning-paths` | 4 Structured career tracks (Full Stack, Java Backend, Frontend, DSA Mastery) with hours, module count, completion percentage, and direct links to dedicated Course Detail environments. |
| 3 | **Dedicated Course Detail** | `view-course-detail` (`openCourseDetail(id)`) | Standalone academic learning environment with emerald course hero, breadcrumbs, learning outcomes grid, expandable curriculum accordion (`.cm-module-card`), progress bar, and lesson launcher. |
| 4 | **Interactive Lesson Reader** | `view-lesson-detail` (`openLessonDetail(cId, mId, lId)`) | Editorial longform lesson environment with structured objectives, runnable code snippets with copy button, practical takeaways, and "Mark as Completed" progress tracker. |
| 5 | **DSA Practice Hub** | `view-dsa` | Topic filter chips (Arrays, Strings, Trees, DP, etc.), search query bar, difficulty selector, curriculum jump shortcut, and full problems table with company tags and acceptance rates. |
| 6 | **Coding Workspace** | `openProblemModal(id)` | Monaco-like IDE modal with language picker (Java 17, Python 3.12, C++ 20), editable code textarea with line numbers gutter, and test execution runner with benchmark feedback. |
| 7 | **Interview Preparation** | `view-interview-prep` | Interactive topic tabs (Java, Algorithms, System Design, SQL, OS) with question progression and frequency badges. |
| 8 | **Interview Question Details** | `toggleAnswerExplanation()` | Collapsible deep architectural answers, key talking points checklist, and "Mark as Mastered" action. |
| 9 | **Courses & Curated Resources** | `view-resources` | Curated library of 6 deep-dive guides: Time & Space Complexity, Microservices, SQL Top 100, Java 17 Docs, Spring Boot 3 Docs, and System Design Primer. |
| 10 | **Dedicated Technical Resource Detail** | `view-resource-detail` (`openResourceDetail(id)`) | Editorial longform reading layout with Table of Contents, CodeMentor internal summary vs Official Documentation distinctions, code snippets, and bookmark toggles. |
| 11 | **Real-World Projects** | `view-projects` | Production-grade portfolio projects (Distributed KV Store, Real-Time Code Editor, Microservices) with tech stack tags and difficulty. |
| 12 | **Project Details** | `openProjectModal(id)` | Project specifications modal detailing architectural objectives, hours estimate, and milestone checklist. |
| 13 | **Progress & Analytics** | `view-analytics` | Weekly study hours bar graph, placement readiness metrics, topic mastery breakdown, and velocity stats. |
| 14 | **Bookmarks** | `view-bookmarks` | Quick-access catalog of saved problems, system design cheat sheets, and interview review cards. |
| 15 | **Student Profile** | `view-profile` | Complete portfolio showcase: Verified Student ID, 4 career metrics, verified skill mastery bars, earned badges, linked GitHub / LeetCode profiles, and ATS resume score. |
| 16 | **Settings** | `view-settings` | Target dream companies editor, graduation batch preferences, and notification controls. |
| 17 | **Public Landing Page** | `view-landing` | High-impact SaaS marketing hero with tagline *"Learn. Practise. Build. Get Hired."*, live placement counters, 4 core value pillars, company logos, and "Launch Student App" CTA. |
| 18 | **Green Blade Sign In Experience** | `view-auth` (`authSetMode('signin')`) | Dual-panel warm ivory stage (`#F7F2E7`) with the signature **sweeping diagonal emerald blade** (`#auth-blade` / `.cm-auth-blade`), lit seam highlights, social auth, working validation, and forgot password flow. |
| 19 | **Green Blade Sign Up Experience** | `view-auth` (`authSetMode('signup')`) | Continuous 850ms cubic-bezier transition of the diagonal blade across the stage revealing the registration form without a single full-screen cut or fade. |
| 20 | **Forgot Password Modal** | `openForgotPasswordModal()` | Warm ivory & emerald modal dialog with security recovery badge, email input, and secure reset dispatch. |

---

## 7. Responsive Breakpoint Matrix

| Viewport | Target Device | Layout Behavior |
|---|---|---|
| **$\ge$ 1025px** | Desktop / Workstation | Standard 3-region grid shell (`248px` sidebar + `72px` top header + independent scrollable content). |
| **769px – 1024px** | Laptop / Small Desktop | Fluid content area, responsive search width down to 260px, metric cards collapse from 4 columns to 2. |
| **$\le$ 768px** | Tablet / Mobile | Sidebar translates off-canvas (`-248px`), top header displays mobile hamburger toggle, drawer slides out with backdrop on toggle. |
| **$\le$ 480px** | Mobile Phones (390px) | Single column cards, full width action buttons, horizontal scroll for tables, navbar compact spacing. |

---

## 8. Verification & Audit Results

- **Grid Stability:** Layout uses CSS Grid `.app-shell` (`248px` / `72px` / `calc(100dvh - 72px)`).
- **Scroll Containment:** The page window (`body`, `html`) has `overflow: hidden;`. The ONLY scrolling element is `#main-content-scroll`.
- **Navbar Ergonomics:** Header has exact `72px` height with vertically centered `36px` brand icon, `19px` Manrope 700 brand name, `13.5px` breadcrumbs, `420px` search field, `40px` notification button, `40px` streak counter, and `38px` avatar.
- **Typography Scale:** Clean 9-level scale implemented across all 17 screens; 0 instances of text below 12px.
- **Anchored Profile:** Profile card is fixed at the bottom of the sidebar with high z-index and independent from navigation scrolling.
- **Interactive Routing:** Instant zero-latency switching between all 17 screens and interactive modals.
