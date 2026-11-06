# Design and implementation blueprint — Kwa Njenga School

## Product intent

A high-quality, authentic, responsive and accessible institutional website, representing Pre-Primary (ECDE), Lower/Upper Primary, and Junior School. It should be an original design inspired by strong editorial school websites, not a clone of The Banda School, Beechwood Park or George Heriot's.

**Public naming proposal** (subject to school approval): **Kwa Njenga — Pre-Primary, Primary & Junior School**. Signage identifies Kwa Njenga Primary School and distinguishes pre-school, lower primary, middle/upper primary and junior secondary. Kenyan curriculum documents use:
- Pre-Primary: PP1–PP2.
- Lower Primary: Grades 1–3.
- Upper Primary: Grades 4–6.
- Junior School: Grades 7–9.

Sources: https://www.education.go.ke/sites/default/files/2023-01/Guidelines%20for%20Implementation%20of%20Junior%20Secondary%20Education%2017th%20Jan-compressed.pdf and https://kicd.ac.ke/cbc-materials/

## Proposed routes

| Route | Page | Content |
|---|---|---|
| `/` | Home | Genuine campus hero, introduction, three pathways, verified highlights, school-life preview, visitor action |
| `/about` | Our School | School history, vision/mission/values, leadership, community partnerships — only after verification |
| `/learning` | Our Learning | Curriculum overview and four stage pathways |
| `/learning/ecde` | Pre-Primary | PP1 & PP2, learning through play, school-owned classroom imagery |
| `/learning/primary` | Primary | Lower (1–3) and Upper (4–6) subsections |
| `/learning/junior-school` | Junior School | Grades 7–9, authentic activities, subject/curriculum info |
| `/school-life` | School Life | Approved galleries, co-curricular activities and student work without identifying records |
| `/news` | News & Events | Real, dated notices; never sample fictional events |
| `/contact` | Contact & Visit | Approved address, map, phone, contact channel; working form if implemented |
| `/privacy` | Privacy Notice | School-approved policy before collecting enquiry data |

Optional `news/:slug` detail routes if the school has actual stories to publish. Future parent portal is a **separate scoped project**, not presumed required for launch.

## Design direction

- **Audience:** parents and guardians, teachers, community partners, prospective partners, returning pupils.
- **Personality:** authentic, welcoming, inspiring, confident, contemporary.
- **Colours (provisional):** deep royal blue `#154B91`, warm gold `#E5B94D`, paper `#F8F7F2`, ink `#152A3B`, sky `#E6F1FC`. Replace only after school management approves real branding. Use CSS design tokens in `src/index.css` rather than hard-coded gradients everywhere.
- **Typography:** one readable sans family for UI and one refined editorial display family for section headings; limit weights and font downloads.
- **Hero:** genuine school video only with approval; otherwise approved still photograph. 8–15-second muted footage with poster image, play/pause control, `prefers-reduced-motion` support and mobile poster fallback. Never label a generated scene as real campus footage.
- **Motion:** restrained fade/reveal, scroll-linked progress only if meaningful, accessible transitions, responsive interactions. Do not sacrifice loading or navigation for animation.
- **Navigation:** a shared layout and per-page routes, breadcrumb where helpful, accessible responsive menu.

## Architectural decision

Keep React + Vite + TypeScript + Tailwind CSS 4 and Wouter initially. The current workspace already has these dependencies; migrating to Next.js would introduce unproven complexity for a mostly static public school site. Split the massive `src/App.tsx` into `src/components/layout`, `src/components/sections`, `src/pages`, `src/content` and `src/lib`. Use real `<a href>` links for navigation when possible. Add a content layer in structured data or Markdown; introduce a CMS only when staff require regular publishing.

## Initial technical increments

1. **Safety & content** — eliminate fake success responses, invented facts and unrelated social links; provide transparent placeholders only inside development mode. Confirm source image use/approvals.
2. **Architecture** — split components, add routes, shared layout, scroll restoration, page-title metadata and a custom 404.
3. **Design system** — approved colour tokens, typography scale, spacing, button styles, image treatment, accessible focus states.
4. **School pages** — build home and four curriculum pages first; later complete about, school life, news and contact.
5. **Functional features** — add one working school-controlled contact channel; prevent misuse/spam; handle submissions with truthful status and privacy notice.
6. **QA/deployment** — automate typecheck, production build and Playwright browser tests; manually verify real device/mobile, forms, privacy and assets before a controlled staging launch.

## Release quality gates

- WCAG 2.2 AA principles; keyboard focus management, appropriate contrast, meaningful headings, alt text, and reduced motion.
- All public claims and institutional branding approved by administration.
- Approved photographic/media sources and consents recorded.
- No fake forms or broken interactions.
- Load speed targets (illustrative): LCP <= 2.5s, CLS <= 0.1, INP <= 200ms at the 75th percentile when sufficient field data exists.
- Playwright smoke checks: navigation, mobile menu, key page routes, contact flow, and privacy link.
- Public release only after stakeholder review.
