export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-jade/80">About Hanistry</p>
      <h1 className="mt-4 font-display text-5xl text-white">A focused atlas for Korean history.</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-white/68">
        <p>
          Hanistry is designed as a production-ready foundation for an academic historical map platform. The current data is intentionally seeded and approximate, with clean seams for adding peer-reviewed GeoJSON, citations, and database-backed editorial workflows.
        </p>
        <p>
          The first release focuses on Korean history: Gojoseon, the Three Kingdoms, Unified Silla, Goryeo, Joseon, Japanese occupation, and modern North/South Korea.
        </p>
        <p>
          For production use, replace the mock geometries in `data/history.ts` or load equivalent files from `public/geojson`, then store source metadata and long-form entries in Supabase/PostgreSQL.
        </p>
      </div>
    </main>
  );
}
