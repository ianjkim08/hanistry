<div align="center">

# Hanistry

### An Interactive Historical Atlas of Korea

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox_GL_JS-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Explore Korean history through changing borders, kingdoms, capitals, and timelines.**

Built to make centuries of Korean history geographically understandable and visually engaging.

<a href="https://hanistry.vercel.app/">
  <img src="https://img.shields.io/badge/View_Live_Atlas-62D2A2?style=for-the-badge&logo=vercel&logoColor=071013" alt="View Live Atlas"/>
</a>

[Features](#features) · [Historical Coverage](#historical-coverage) · [Architecture](#architecture) · [Getting Started](#getting-started)

</div>

---

## The Idea

Korean history is often presented as a sequence of dynasties, rulers, wars, and dates. But history also unfolds across geography: capitals move, kingdoms expand and collapse, political centers shift, and borders change over time.

**Hanistry turns Korean history into an interactive map experience.**

Users can move through major historical eras with a timeline slider, explore territorial regions directly on the map, and learn about the events and cultural achievements that shaped the Korean peninsula.

---

## Features

**Interactive Historical Map** — Explore Korean history on a Mapbox-powered atlas with selectable territories and era-specific map layers.

**Timeline Navigation** — Move from Gojoseon through modern North and South Korea using a visual historical timeline.

**Clickable Kingdoms and Regions** — Select historical states such as Goguryeo, Baekje, Silla, Goryeo, and Joseon to view capitals, descriptions, events, and cultural achievements.

**Era Detail Pages** — Open dedicated pages for each supported historical era with structured background information.

**Searchable Historical Sidebar** — Search kingdoms, capitals, events, and achievements while navigating the atlas.

**Animated Interface** — Smooth transitions powered by Framer Motion create a polished exploratory experience.

**Responsive Dark UI** — A modern academic-inspired interface designed for desktop and mobile use.

**Mapbox Fallback Atlas** — If Mapbox is unavailable or fails to load, Hanistry displays a built-in interactive map instead of a blank panel.

**GeoJSON-Ready Design** — Historical territory layers can be upgraded using researched GeoJSON datasets created from scholarly sources.

---

## Historical Coverage

| Era | Time Period | Featured States / Regions |
|------|-------------|----------------------------|
| Gojoseon | c. 2333-108 BCE | Gojoseon |
| Three Kingdoms Period | 57 BCE-668 CE | Goguryeo, Baekje, Silla |
| Unified Silla | 668-935 | Unified Silla, Balhae |
| Goryeo Dynasty | 918-1392 | Goryeo |
| Joseon Dynasty | 1392-1897 | Joseon |
| Japanese Occupation | 1910-1945 | Korea under Japanese rule |
| Modern Korea | 1948-present | Republic of Korea, Democratic People's Republic of Korea |

---

## Historical Data Notice

The current application includes seeded historical information and initial approximate territorial shapes for demonstrating the mapping experience.

Historical borders are complex and may be disputed or uncertain, particularly for early Korean states and long periods of territorial change. Future versions of Hanistry are intended to introduce source-cited GeoJSON layers representing more specific historical snapshots, such as:

- Three Kingdoms, c. 400 CE
- Three Kingdoms, c. 500 CE
- Late Three Kingdoms, c. 660 CE
- Goryeo during major territorial transitions
- Joseon administrative and international boundaries

Hanistry treats historical geography as an evolving, research-backed visualization rather than a claim of absolute border precision.

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                      Next.js Application                     │
│                                                              │
│  ┌──────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │ Landing Page │  │ Interactive     │  │ Era Detail     │   │
│  │              │  │ Atlas           │  │ Pages          │   │
│  └──────────────┘  └─────────┬───────┘  └────────────────┘   │
│                              │                               │
│  ┌──────────────┐  ┌─────────┴───────┐  ┌────────────────┐   │
│  │ Timeline     │  │ Historical Map  │  │ Information    │   │
│  │ Slider       │  │ Component       │  │ Sidebar        │   │
│  └──────────────┘  └─────────┬───────┘  └────────────────┘   │
└──────────────────────────────┼───────────────────────────────┘
                               │
             ┌─────────────────┴──────────────────┐
             │                                    │
      ┌──────┴───────┐                    ┌───────┴─────────┐
      │ Mapbox GL JS │                    │ Historical Data │
      │ Map Rendering│                    │ + GeoJSON Layers│
      └──────────────┘                    └───────┬─────────┘
                                                  │
                                          ┌───────┴────────┐
                                          │ Supabase /     │
                                          │ PostgreSQL     │
                                          └────────────────┘
```

- **Framework:** Next.js App Router with React and TypeScript
- **Styling:** Tailwind CSS with a custom dark historical-atlas theme
- **Maps:** Mapbox GL JS with interactive GeoJSON territorial layers
- **Animation:** Framer Motion for timeline and interface transitions
- **Data:** Seeded historical content with Supabase/PostgreSQL-ready architecture
- **Deployment:** Vercel

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Maps | Mapbox GL JS, GeoJSON |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data Layer | Supabase / PostgreSQL-ready |
| Deployment | Vercel |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ianjkim08/hanistry.git
cd hanistry

# Install dependencies
npm install

# Create local environment configuration
cp .env.example .env.local

# Start the development server
npm run dev
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

A Mapbox public token enables the live map experience. Without one, Hanistry displays its built-in interactive fallback atlas.

---

## Project Structure

```text
hanistry/
├── app/
│   ├── about/
│   │   └── page.tsx               # About and methodology page
│   ├── atlas/
│   │   └── page.tsx               # Interactive atlas route
│   ├── eras/
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic era detail pages
│   ├── globals.css                # Theme and Mapbox styles
│   ├── layout.tsx                 # Shared application layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── atlas/
│   │   ├── ambience-toggle.tsx    # Optional ambience control
│   │   ├── atlas-shell.tsx        # Main atlas experience
│   │   ├── historical-map.tsx     # Mapbox and fallback rendering
│   │   ├── info-sidebar.tsx       # Region details and search
│   │   └── timeline-slider.tsx    # Historical timeline navigation
│   └── layout/
│       └── site-header.tsx        # Navigation header
├── data/
│   └── history.ts                 # Eras, states, events, and seed geometry
├── lib/
│   ├── supabase.ts                # Supabase configuration
│   └── utils.ts                   # Shared utilities
├── public/
│   └── geojson/                   # Historical boundary datasets
└── README.md
```

---

## Historical Map Data

Hanistry currently includes approximate seeded geometries for the initial prototype. More accurate historical boundaries can be introduced as GeoJSON files inside:

```text
public/geojson/
```

Recommended organization:

```text
public/geojson/
├── gojoseon.geojson
├── three-kingdoms-400.geojson
├── three-kingdoms-500.geojson
├── three-kingdoms-660.geojson
├── unified-silla.geojson
├── goryeo.geojson
├── joseon.geojson
└── modern-korea.geojson
```

Each historical region should include metadata that connects it to the application:

```json
{
  "type": "Feature",
  "properties": {
    "eraId": "three-kingdoms",
    "stateId": "goguryeo",
    "name": "Goguryeo",
    "capital": "Pyongyang",
    "color": "#6ea8fe",
    "year": 500,
    "confidence": "approximate",
    "source": "Historical source citation"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": []
  }
}
```

QGIS can be used to georeference academic historical maps, trace territorial borders, validate polygon geometry, and export web-ready GeoJSON layers.

---

## Deployment

Hanistry is ready to deploy on Vercel.

1. Import the repository into Vercel.
2. Add the required environment variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy after adding or modifying environment variables.
4. If your Mapbox token uses URL restrictions, allow your Vercel production and preview domains.

---

## Scripts

```bash
npm run dev        # Start local development server
npm run build      # Create an optimized production build
npm run start      # Serve the production build
npm run lint       # Run lint validation
npm run typecheck  # Validate TypeScript types
```

---

## Roadmap

- Source-cited historical boundary datasets
- Timeline snapshots within individual historical eras
- City, fortress, palace, and battlefield markers
- Historical bibliography and citation support
- Supabase-backed content management
- Compare mode between two historical periods
- Korean language localization
- Curated AI-assisted historical summaries grounded in sources

---

## Contributing

Contributions are welcome, especially in the following areas:

- Historically sourced GeoJSON boundary layers
- Map accuracy improvements
- Korean terminology review
- Historical citations and bibliography support
- Accessibility and responsive interface improvements

For significant historical data contributions, please open an issue first and include the sources used to construct or verify the proposed map layer.

---

## License

This project is licensed under the MIT License.

</div>
