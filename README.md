# Hanistry

Hanistry is a modern full-stack Korean history atlas built with Next.js, React, Tailwind CSS, TypeScript, Mapbox GL JS, Supabase/PostgreSQL hooks, and Framer Motion.

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add a Mapbox public token to `NEXT_PUBLIC_MAPBOX_TOKEN` for the live map. Without it, Hanistry renders a polished fallback atlas so the UI can still be explored.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy with the default Next.js build command.

## GeoJSON Data

Place production GeoJSON files in `public/geojson`. The app currently uses seeded approximate shapes from `data/history.ts`; `public/geojson/historical-korea.sample.geojson` shows the expected format. Replace the mock features with scholar-reviewed data as the project matures.
