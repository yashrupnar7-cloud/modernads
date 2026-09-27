# Modern Ads website

Responsive React + TypeScript + Vite website for Modern Ads. Styling uses maintainable CSS without a UI framework.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Deploy to Vercel

Import this project in Vercel. Vercel detects Vite automatically. The included `vercel.json` routes extensionless page paths back to the app. Build command: `npm run build`; output directory: `dist`.

## Before production

- Set your production domain in `public/sitemap.xml` and `public/robots.txt`. Canonical and Open Graph URLs are generated from the current browser origin.
- Connect the contact form to a secure server-side endpoint or form service. Validate input again on the server, add abuse prevention, and keep all credentials server-side. The current form validates required fields locally, sends nothing, and directs visitors to email.
- No environment variables are currently required. A server-side form integration may require a private endpoint URL and credentials configured only in the backend/Vercel server environment, never in client-exposed variables.
- Review the starter privacy and terms copy for the actual operating jurisdiction and data practices before launch.

## Structure

- `src/main.tsx` — site shell, page content, reusable navigation, forms, and case study component.
- `src/style.css` — responsive styles, focus states, reduced-motion behavior.
- `public/` — favicon, robots.txt, and sitemap.xml.
- `index.html` — base SEO and social metadata.
