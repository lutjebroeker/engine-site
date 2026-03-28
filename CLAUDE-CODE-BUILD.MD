# ENGINE ECOSYSTEM — Claude Code Build Document

> This is the single source of truth for Claude Code.
> It contains everything needed to build the Execution Engine landing page.
> Read this entire document before writing any code.

---

## 0. REPO STRUCTURE & SETUP

### GitHub organization

Archive the old repos first:
```bash
# On GitHub: Settings → Archive for each:
# - lutjebroeker/execution-engine (old landing page)
# - lutjebroeker/flow-year-coach (React app)
```

New multi-repo structure — one repo per deployable unit:

```
lutjebroeker/
├── engine-site          ← THIS IS WHAT WE'RE BUILDING NOW
│   Astro landing page + scorecard
│   Deploys to: Vercel (execution-engine.com)
│
├── engine-app           ← LATER (Phase 2)
│   Flow Year Coach rebranded to Execution Engine App
│   Vite + React + Supabase + Stripe
│   Deploys to: Vercel (app.execution-engine.com)
│
├── engine-infra         ← LATER (Phase 1 of master plan)
│   Docker Compose, n8n workflows, system prompts
│   Client onboarding scripts, Supabase schema
│   Per-client VPS deployment
│
├── engine-intelligence  ← LATER (Phase 3)
│   Intelligence Engine n8n workflows
│   RSS collectors, Ollama scoring, hype filter
│
└── engine-docs          ← LATER (when needed)
    Internal documentation, onboarding playbooks
```

### This session: build `engine-site`

```bash
# Create the repo
mkdir engine-site && cd engine-site
git init

# Astro setup
npm create astro@latest . -- --template minimal --typescript strict
npx astro add tailwind

# Additional dependencies
npm install @fontsource/playfair-display @fontsource/inter @fontsource-variable/jetbrains-mono

# Git
git add -A
git commit -m "Initial Astro + Tailwind setup"
git remote add origin git@github.com:lutjebroeker/engine-site.git
git push -u origin main
```

---

## 1. PROJECT CONTEXT (what Claude Code needs to understand)

### What is the Execution Engine?

A done-for-you AI accountability system for professionals who know what to do but don't execute consistently. It runs on a dedicated server (managed by us), communicates via Telegram or Slack, and measures execution with a weekly score.

### Who is the target client?

**Thomas (38).** Operations Manager at a mid-size tech company. Runs a team of 8. Calendar is wall-to-wall meetings. Every day is reactive. Knows he should work ON the business (strategy, process improvement) but spends 90% working IN the business (putting out fires).

What he says: "I'm always busy but never productive."
What he wants: A system that forces strategic work into his week and measures it objectively.
What he does NOT want: Another app. A course. Generic advice. Anything he has to build himself.

### What is this landing page for?

**Validation.** We're testing demand before building the full product. The landing page must:
1. Capture interest via a scorecard assessment (Priestley method)
2. Pre-sell 12 founding member spots at €997 (Hormozi Grand Slam Offer)
3. Establish the Execution Engine brand
4. Pass the Priestley 30/150 test: can we get 30 people to signal interest and 150 to consume our content?

### Business model (for context, not for the page)

```
€0          Execution Score Assessment (scorecard — lead magnet)
€0/mo       Execution Engine App — free tier (later, separate repo)
€19/mo      Execution Engine App — Pro (later)
€997        Founding member price (now — what the landing page sells)
€2,497      Full price (post-validation)
€97-197/mo  Add-on engines (Intelligence, Personal — later)
€50/mo      Managed hosting (later)
```

---

## 2. BRAND GUIDELINES

### Identity

**Name:** Execution Engine
**Tagline:** From knowing to doing.
**One-liner:** "12 weeks to go from 'always busy, never strategic' to 85%+ execution on the work that actually moves the needle."
**Tone:** Calm, direct, authoritative. Harvard Business Review meets a straight-talking advisor. Facts over feelings. Measurement over motivation.

### Color palette

```css
:root {
  /* Background & Surface */
  --bg-primary:       #FDFBF7;    /* warm cream — main bg */
  --bg-secondary:     #F5F0E8;    /* warm sand — cards, alt sections */
  --bg-dark:          #1C1917;    /* rich charcoal — dark sections */
  --bg-dark-soft:     #292524;    /* softer charcoal — dark cards */

  /* Text */
  --text-primary:     #1C1917;    /* near-black */
  --text-secondary:   #57534E;    /* warm gray */
  --text-tertiary:    #A8A29E;    /* light warm gray */
  --text-inverse:     #FDFBF7;    /* cream on dark bg */

  /* Accent — Forest Green */
  --accent:           #2D5A3D;    /* deep forest — buttons, links */
  --accent-hover:     #1E3F2B;    /* darker forest */
  --accent-light:     #E8F0EB;    /* mint wash */
  --accent-muted:     #4A7C5C;    /* sage */

  /* Accent — Amber */
  --amber:            #B45309;    /* rich amber — highlights */
  --amber-light:      #FEF3C7;    /* pale gold */
  --amber-warm:       #D97706;    /* warm amber */

  /* Borders */
  --border:           #E7E5E4;    /* subtle */
  --border-strong:    #D6D3D1;    /* emphasized */
}
```

### Typography

```
Headings:  "Playfair Display", serif — weight 700 (h1), 600 (h2-h3)
Body:      "Inter", sans-serif — weight 400 (body), 500 (emphasis), 600 (labels)
Monospace: "JetBrains Mono", monospace — weight 500 (stats, numbers)

Scale (desktop → mobile):
  h1: 3.5rem → 2.25rem    (line-height: 1.15, tracking: -0.02em)
  h2: 2.5rem → 1.75rem    (line-height: 1.2)
  h3: 1.75rem → 1.375rem
  body: 1.125rem → 1rem   (line-height: 1.7)
  small: 0.875rem
```

### Design principles

1. **Whitespace is authority.** Generous padding. Let content breathe.
2. **Data as design element.** Numbers in large monospace type, accent colors.
3. **No stock photos.** Abstract shapes, subtle grain, or nothing.
4. **Borders over shadows.** Thin borders (1px), flat surfaces.
5. **Minimal motion.** Subtle fade-in on scroll only. No parallax, no bounce.
6. **Dark sections for emphasis.** Charcoal bg for offer stack and final CTA.
7. **Mobile-first.** Thomas reads LinkedIn on his phone and clicks through.

### UI components

```
Primary button:
  bg: --accent, text: white, rounded-md, py-3.5 px-7
  hover: bg --accent-hover, translateY(-1px)

Secondary button:
  bg: transparent, border 1px --accent, text --accent
  hover: bg --accent-light

Cards:
  bg: white or --bg-secondary, border 1px --border, rounded-lg, p-8

Badges:
  bg: --accent-light, text: --accent, text-xs, font-semibold
  uppercase, tracking-wide, rounded, px-3 py-1

Stats:
  font-mono, text-4xl to text-6xl, --accent or --amber
```

### Copy rules

- Second person ("you"), never "our clients" or "users"
- Short paragraphs (2-3 sentences max)
- No exclamation marks. Period.
- No emoji in body copy
- No buzzwords: revolutionary, game-changing, cutting-edge, leverage, synergy
- Power words: measured, consistent, confronts, systematic, proven
- Data > adjectives. "85% execution rate" beats "dramatically improved"

---

## 3. TAILWIND CONFIG

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:           '#FDFBF7',
        sand:            '#F5F0E8',
        charcoal:        '#1C1917',
        'charcoal-soft': '#292524',
        forest:          '#2D5A3D',
        'forest-dark':   '#1E3F2B',
        'forest-light':  '#E8F0EB',
        sage:            '#4A7C5C',
        amber:           '#B45309',
        'amber-light':   '#FEF3C7',
        'amber-warm':    '#D97706',
        'warm-gray':     '#57534E',
        'light-gray':    '#A8A29E',
        'ee-border':     '#E7E5E4',
        'ee-border-strong': '#D6D3D1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display':        ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading':        ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-mobile': ['1.75rem', { lineHeight: '1.25' }],
        'subheading':     ['1.75rem', { lineHeight: '1.3' }],
      },
      maxWidth: {
        'narrow':  '680px',
        'content': '960px',
        'wide':    '1200px',
      },
      spacing: {
        'section': '6rem',
        'section-mobile': '3.5rem',
      },
    },
  },
}
```

---

## 4. PROJECT STRUCTURE

```
engine-site/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── og-image.png              # 1200×630, generate with brand colors
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       # <html>, <head>, fonts, meta, global styles
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── DreamState.astro
│   │   ├── HowItWorks.astro
│   │   ├── OfferStack.astro
│   │   ├── Guarantee.astro
│   │   ├── SocialProof.astro
│   │   ├── BuildInPublic.astro
│   │   ├── FAQ.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   ├── ui/
│   │   │   ├── Button.astro       # Primary/secondary variants
│   │   │   ├── SectionLabel.astro # "THE PROBLEM" style uppercase label
│   │   │   ├── StatCard.astro     # Monospace number + description
│   │   │   └── FAQItem.astro      # <details>/<summary> accordion
│   │   └── icons/
│   │       └── Arrow.astro        # → arrow for CTAs
│   ├── pages/
│   │   └── index.astro            # Assembles all sections
│   ├── styles/
│   │   └── global.css             # @tailwind imports + custom utilities
│   └── config.ts                  # Editable content: spots remaining, URLs
└── vercel.json                    # (if needed for redirects)
```

### src/config.ts — editable settings

```typescript
export const config = {
  founding: {
    totalSpots: 12,
    spotsRemaining: 12,  // UPDATE THIS MANUALLY AS SPOTS FILL
    price: '€997',
    regularPrice: '€2,497',
  },
  urls: {
    scorecard: '#',           // TODO: ScoreApp URL when ready
    bookCall: '#',            // TODO: Calendly/Cal.com URL
    linkedin: 'https://www.linkedin.com/in/jellespek/',
  },
  meta: {
    title: 'Execution Engine — From knowing to doing.',
    description: 'A done-for-you AI accountability system that measures what you do vs. what you said. 12 weeks. 85%+ execution rate. Founding members: €997.',
    ogImage: '/og-image.png',
    url: 'https://execution-engine.com',
  },
}
```

---

## 5. PAGE SECTIONS — EXACT COPY & LAYOUT

Build these as Astro components, in this order on the page.

### 5.1 Hero

```
Background: cream (bg-primary)
Layout: centered, max-w-content, generous vertical padding (py-24 md:py-32)

┌─────────────────────────────────────────────────────┐
│                                                       │
│  [BADGE] FOUNDING COHORT — {spotsRemaining} SPOTS     │
│          (amber-light bg, amber text, uppercase)      │
│                                                       │
│  [H1] Finally follow through on the                   │
│       work that actually matters.                     │
│       (Playfair Display, display size)                │
│                                                       │
│  [P] For professionals who know what to do —          │
│      but end every week wondering why they didn't.    │
│      (Inter, text-secondary, max-w-narrow)            │
│                                                       │
│  [BUTTON PRIMARY] Take the Execution Score            │
│                   Assessment →                        │
│                                                       │
│  [SMALL] Free. 2 minutes. No email required to start. │
│                                                       │
│  ┌───────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │ 85%+      │  │ < 48 hours    │  │ 5 min/day    │  │
│  │ target    │  │ from call to  │  │ is all it    │  │
│  │ exec rate │  │ system live   │  │ takes        │  │
│  └───────────┘  └───────────────┘  └──────────────┘  │
│  (font-mono, text-accent for number, text-sm desc)    │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 5.2 Problem

```
Background: cream
Layout: centered, max-w-narrow, py-section

[SECTION LABEL] THE PROBLEM
[H2] You plan the week perfectly. Then the week happens.

[P] Monday morning. Fresh start. You write down your three strategic
priorities for the week. The ones that actually move the needle — the
hiring plan, the process overhaul, the partner proposal.

[P] By Wednesday, none of them happened. Your calendar was hijacked
by three 'urgent' requests that turned out to be someone else's poor
planning. You spent two hours in a meeting that could have been an email.

[P] You've read the books. Atomic Habits, Deep Work, The 7 Habits.
You know the theory better than most. But theory doesn't block your
calendar. Theory doesn't send you a message at 5pm asking: what did
you actually do today?

[P] The gap between what you know and what you do is the most expensive
gap in your career. Not because you're lazy. Because you don't have a
system that makes execution unavoidable.
```

### 5.3 Dream State

```
Background: sand (bg-secondary)
Layout: centered, max-w-narrow, py-section

[SECTION LABEL] THE OUTCOME
[H2] What changes when execution becomes measurable.

[P] You end every Friday knowing exactly what you executed and what
you didn't. Not a feeling — a number. Your execution score is right
there: 87%.

[P] Your manager notices. Deadlines hit. Projects move. That strategic
initiative you've been 'planning to start' for six months? It's in
week 8. On track.

[P] The compounding effect is the real prize. One consistent quarter
changes how people see you. Two consistent quarters changes your
career trajectory.
```

### 5.4 How It Works

```
Background: cream
Layout: max-w-content, 3-column grid (stack on mobile), py-section

[SECTION LABEL] HOW IT WORKS
[H2] Three steps. We build it. You use it.

Card 1:
  [MONO NUMBER] 01  (text-4xl, text-forest)
  [H4] We configure your system
  [P] In a 60-minute onboarding call, we map your goals, schedule,
  and patterns. Within 48 hours, your personal accountability system
  is live on a dedicated server — configured for you, owned by you.

Card 2:
  [MONO NUMBER] 02
  [H4] Your system checks in daily
  [P] Every morning: your top 3 priorities, aligned to your 12-week
  goals. Every evening: a simple check — did you do what you said?
  No feelings. Just facts. Via Telegram or Slack.

Card 3:
  [MONO NUMBER] 03
  [H4] You see the truth, weekly
  [P] Every Sunday: an AI-generated execution report. What you
  executed. What you didn't. Patterns detected. Your execution
  score. The number doesn't lie.
```

### 5.5 Offer Stack

```
Background: charcoal (bg-dark) — THIS IS THE CLIMAX OF THE PAGE
Layout: max-w-content, py-section, light text

[SECTION LABEL] THE OFFER  (text-tertiary on dark)
[H2] Everything you need to execute consistently for 12 weeks.
     (text-cream/inverse)

Offer table (use a clean card-based layout, not a literal <table>):

  ┌─────────────────────────────────────────────────────────┐
  │  Done-for-you setup on your dedicated server            │
  │  Configured to your goals, schedule, and patterns       │
  │                                                  €1,500 │
  ├─────────────────────────────────────────────────────────┤
  │  Keystone Extraction — AI analyzes your notes and       │
  │  values to build your personal operating system  €500   │
  ├─────────────────────────────────────────────────────────┤
  │  Daily AI check-ins via Telegram or Slack               │
  │  Morning priorities + evening accountability     €600   │
  ├─────────────────────────────────────────────────────────┤
  │  Weekly execution reports with AI pattern        €400   │
  │  analysis                                               │
  ├─────────────────────────────────────────────────────────┤
  │  1× 60-min goal planning session                 €300   │
  ├─────────────────────────────────────────────────────────┤
  │  2× 30-min training sessions (week 1 + week 4)  €300   │
  ├─────────────────────────────────────────────────────────┤
  │  Lifetime system access — you own the server,           │
  │  the data, everything                              —    │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  Total value                           €3,600           │
  │  Regular price (Q3 2026)               €2,497           │
  │                                                         │
  │  ┌───────────────────────────────────────────────┐      │
  │  │  FOUNDING MEMBER PRICE              €997      │      │
  │  │  ({spotsRemaining} of 12 spots remaining)     │      │
  │  │  Locked in permanently.                       │      │
  │  └───────────────────────────────────────────────┘      │
  │  (this inner box: amber border or amber-warm bg accent) │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

[P] Your founding member rate is locked in forever. When the system
launches publicly, the price goes to €2,497. No upsells. No hidden fees.

[BUTTON AMBER on dark] Apply for a Founding Spot →

[SMALL] {spotsRemaining} of 12 spots remaining.
```

### 5.6 Guarantee

```
Background: cream
Layout: centered, max-w-narrow, py-section

[H3] The 30-day execution guarantee.

[P] Use the system for 30 days. If you don't execute more of your
strategic priorities than you did the month before — measured by your
own execution score — full refund. No questions.

[P] I can offer this because the system works. I use it myself, every day.

[SMALL] The only requirement: respond to your daily check-ins. The
system can't help you if you don't show up.
```

### 5.7 Social Proof

```
Background: sand (bg-secondary)
Layout: max-w-content, py-section

[SECTION LABEL] RESULTS
[H2] I built this for myself first.

Three cards side by side (stack on mobile):

Card 1: "Execution Score Trajectory"
  Large monospace number: 34% → 82%
  [SMALL] "8 weeks. Same person. Different system."
  (Use accent-green for the 82%)

Card 2: "Daily Check-in"
  A styled mock of a Telegram conversation:
  ┌────────────────────────────────────────┐
  │ 🔔 17:00                               │
  │                                        │
  │ [BOT] You committed to 3 priorities    │
  │ today:                                 │
  │ 1. Finish partner proposal             │
  │ 2. Review hiring pipeline              │
  │ 3. Block Friday for strategy           │
  │                                        │
  │ What did you actually do?              │
  │                                        │
  │ [USER] Did 1 and 3. Pipeline got       │
  │ pushed by an escalation.               │
  │                                        │
  │ [BOT] Noted. Pipeline pushed 3 times   │
  │ in 4 weeks. Pattern or priority issue? │
  └────────────────────────────────────────┘
  [SMALL] "This is what 5pm accountability looks like."

Card 3: "Weekly Review Excerpt"
  Styled as a quote/report snippet:
  "Week 6 execution score: 78%. Up from 71% last week.
  Pattern detected: Tuesday and Wednesday consistently low —
  back-to-back meetings block deep work. Recommendation:
  protect Tuesday morning as a non-negotiable focus block."
  [SMALL] "AI-generated. Based on real check-in data."

NOTE: Replace these with real client data once pilots complete.
```

### 5.8 Build in Public

```
Background: cream
Layout: centered, max-w-narrow, py-section

[SECTION LABEL] TRANSPARENCY
[H3] We show our work.

[P] The Execution Engine is a system I built for myself — because I
had the same problem you do. I'm now opening it to 12 founding
members who want the same results.

[P] I share weekly updates on what I'm building, what's working, and
what I'm learning. No polished marketing. Just process.

[LINK] Follow the build on LinkedIn →  (links to config.urls.linkedin)
```

### 5.9 FAQ

```
Background: cream
Layout: max-w-narrow, py-section
Use native <details>/<summary> elements styled to match brand.

Items:

Q: "How much of my time does this actually require?"
A: "5 minutes per day. You respond to two messages — your morning
priorities and your evening check-in. That's it."

Q: "Is this just a chatbot?"
A: "No. It's a configured AI accountability system running on your own
dedicated server. It knows your goals, tracks your patterns, and
generates weekly analysis. It also won't let you BS your way through
a check-in."

Q: "What if I already use Todoist / Notion / a planner?"
A: "Those are input tools — they capture what you want to do. This is
output infrastructure — it measures what you actually did. They work
together."

Q: "What happens after 12 weeks?"
A: "The system keeps running. Your server, your data. Start a new
12-week cycle, add modules, or continue with managed hosting
(€50/month) for maintenance."

Q: "I'm not technical. Do I need to manage a server?"
A: "No. You interact with a Telegram or Slack bot. I handle everything
technical. You'll never see a terminal, a dashboard, or a config file."

Q: "What's the founding member benefit?"
A: "You lock in €997 permanently (regular price: €2,497). Direct
access to me for feedback. And you help shape the system with your input."

Q: "What if it doesn't work for me?"
A: "30-day guarantee. Full refund if your execution doesn't measurably
improve. Only condition: respond to your daily check-ins."
```

### 5.10 Final CTA

```
Background: charcoal (bg-dark)
Layout: centered, max-w-content, py-section-lg

[H2] Stop planning. Start executing.
     (Playfair, cream text, display size)

[P] 12 founding spots. €997. 30-day guarantee.
    (text-tertiary on dark)

[BUTTON AMBER LARGE] Take the Execution Score Assessment →

[P] Or book a 20-minute call to see if it's the right fit.
    (text-tertiary, with underlined link to bookCall URL)

[DIVIDER — thin line, border-charcoal-soft]

[FOUNDER NOTE — italic, text-tertiary, text-sm, max-w-narrow]
"I built this because I was you. Full calendar, zero strategic output.
The system changed that for me. I want to see if it does the same
for you. — Jelle"
```

### 5.11 Footer

```
Background: charcoal (bg-dark), minimal
Layout: flex between, max-w-content, py-8

Left:  "© 2026 Execution Engine"  (text-tertiary)
Right: "LinkedIn" icon/link  (text-tertiary, hover text-cream)

Nothing else. No newsletter. No social grid.
```

---

## 6. IMPLEMENTATION INSTRUCTIONS

### Build order

1. **Setup:** Astro + Tailwind + fonts + global styles + BaseLayout
2. **Build reusable UI components:** Button, SectionLabel, StatCard, FAQItem
3. **Build page sections top to bottom:** Hero → Problem → DreamState → HowItWorks → OfferStack → Guarantee → SocialProof → BuildInPublic → FAQ → FinalCTA → Footer
4. **Wire up config.ts** for spots remaining, URLs, meta
5. **Scroll animations:** IntersectionObserver, fade-in + translateY
6. **Test mobile** at 390px width
7. **Deploy to Vercel**

### Technical rules

- **No JS frameworks.** Pure Astro components + vanilla JS where needed.
- **<details>/<summary>** for FAQ accordion. Style with Tailwind.
- **Scroll animations:** IntersectionObserver in a small inline <script>. Sections start with `opacity-0 translate-y-4` and transition to `opacity-100 translate-y-0`. Duration 600ms, ease-out. Each section triggers independently.
- **Fonts:** Import via `@fontsource` packages (already in npm install). Import in BaseLayout.
- **All CTA buttons** link to `config.urls.scorecard`. Use `data-cta="scorecard"` attribute for easy future swap.
- **"Book a call" links** use `config.urls.bookCall`.
- **The {spotsRemaining} number** reads from `config.ts`. One place to update.
- **og-image.png:** Generate a simple 1200×630 image with cream bg, "Execution Engine" in Playfair Display, tagline in Inter, forest green accent. Can be a static SVG rendered to PNG.
- **No cookies, no tracking scripts for now.** Add Plausible later.

### Quality bar

- Lighthouse score: 95+ on Performance, 100 on Accessibility
- All text passes WCAG AA contrast (forest green on cream: 7.2:1 — passes AAA)
- Proper heading hierarchy: one h1, h2 per section, h3/h4 within
- Works beautifully at 390px, 768px, and 1440px
- Page load: under 1 second on 3G
- Total JS: under 5KB (only scroll animations + FAQ toggle)

---

## 7. WHAT NOT TO BUILD

- ❌ Scorecard quiz (use ScoreApp externally for now — just link to it)
- ❌ Payment processing (founding members pay via Stripe link or manual invoice)
- ❌ Blog or content pages (later)
- ❌ App integration (separate repo)
- ❌ Analytics dashboard (Plausible later)
- ❌ Email capture form (scorecard handles this)
- ❌ Animations beyond scroll fade-in
- ❌ Dark mode toggle (the page is light mode only)

---

## 8. DEPLOYMENT

```bash
# Vercel CLI
npm i -g vercel
vercel

# Or connect GitHub repo to Vercel dashboard:
# 1. Go to vercel.com/new
# 2. Import lutjebroeker/engine-site
# 3. Framework preset: Astro
# 4. Deploy

# Custom domain (when ready):
# Add execution-engine.com in Vercel dashboard
# Update DNS records
```

---

*This document is complete. Build the site exactly as specified. Start with setup, then reusable components, then sections top to bottom. Test on mobile. Deploy to Vercel. Done.*
