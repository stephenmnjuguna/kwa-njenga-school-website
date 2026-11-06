# Kwanjenga Primary and Junior School website

This is the source code for the responsive Kwanjenga Primary and Junior School website.

## Languages and tools

- TypeScript
- React
- HTML
- CSS
- Tailwind CSS
- Vite
- Lucide React icons

## Main files

- `src/App.tsx` — page sections, navigation, forms, map, admissions flow, and source links
- `src/index.css` — colors, typography, responsive layout, motion, and component styling
- `index.html` — page title and sharing metadata
- `public/kwanjenga-campus.jpg` — campus image used as the hero poster and mobile fallback
- `public/kwanjenga-hero.mp4` — lightweight hero background motion video

## Running the website

From the workspace root:

```bash
pnpm --filter @workspace/school-website run dev
```

For a production build:

```bash
pnpm --filter @workspace/school-website run build
```

## Personalizing the site

The quickest edits are in `src/App.tsx`. Replace the sample school copy, event details, admissions wording, and contact information there. Replace the media files in `public/` with school-approved photos or video when they are available.

The map currently uses a publicly listed approximate coordinate for Kwa Njenga Primary School in Embakasi South. Confirm the official school gate and update the `destination` and iframe query in `src/App.tsx` before publishing.

## Public sources used for context

The community story section links to public reporting and location references:

- Kenya News Agency: https://www.kenyanews.go.ke/kwa-njenga-primary-school-receives-us-funded-facelift/
- Safaricom Foundation: https://www.safaricomfoundation.org/project/construction-of-latrines-at-kwa-njenga-primary-school-mukuru-2/
- Public location reference: https://data.afro.co.ke/schools/kwa-njenga/

These sources are linked for context and transparency. They are not presented as official school statements. Replace them with approved school history, official records, and school-owned photographs when available.