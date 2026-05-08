import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Crown, MapPinned } from "lucide-react";
import { eras, getEraBySlug } from "@/data/history";

export function generateStaticParams() {
  return eras.map((era) => ({ slug: era.slug }));
}

export default function EraDetailPage({ params }: { params: { slug: string } }) {
  const era = getEraBySlug(params.slug);
  if (!era) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/atlas" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
        <ArrowLeft size={16} />
        Back to atlas
      </Link>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-jade/80">{era.years}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-white sm:text-6xl">{era.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">{era.summary}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.05] p-5">
          <MapPinned size={22} className="text-jade" />
          <p className="mt-4 text-sm text-white/45">Map Data</p>
          <p className="mt-2 text-sm leading-6 text-white/68">
            Borders are approximate placeholders. Add production GeoJSON in `public/geojson` and connect it to the atlas loader.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {era.states.map((state) => (
          <article key={state.id} className="rounded-md border border-white/10 bg-ink/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm" style={{ color: state.color }}>
                  {state.period}
                </p>
                <h2 className="mt-2 font-display text-3xl text-white">{state.name}</h2>
              </div>
              <Crown size={22} style={{ color: state.color }} />
            </div>
            <p className="mt-3 text-sm text-white/45">Capital: {state.capital}</p>
            <p className="mt-4 text-sm leading-6 text-white/65">{state.description}</p>
            <div className="mt-5 grid gap-3">
              {[...state.events, ...state.achievements].slice(0, 5).map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/62">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
