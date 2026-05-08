import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, Layers3 } from "lucide-react";
import { eras } from "@/data/history";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(120deg,rgba(98,210,162,.16),rgba(110,168,254,.08)_45%,rgba(217,115,165,.12)),url('/geojson/map-texture.svg')]" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-jade/85">Korean Historical Atlas</p>
            <h1 className="mt-5 font-display text-6xl leading-[0.96] text-white sm:text-7xl lg:text-8xl">
              Hanistry
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Move through Korean history with a living map: kingdoms, capitals, regional borders, cultural achievements, and events arranged across time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/atlas"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-jade px-5 text-sm font-semibold text-ink transition hover:bg-paper"
              >
                Open Atlas
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center rounded-md border border-white/12 bg-white/[0.06] px-5 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:text-white"
              >
                Methodology
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Globe2, label: "Mapbox atlas", value: "Geographic exploration" },
              { icon: Layers3, label: "Era layers", value: `${eras.length} seeded eras` },
              { icon: BookOpen, label: "Academic briefs", value: "Events and culture" }
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-ink/60 p-4 backdrop-blur-xl">
                <item.icon size={20} className="text-jade" />
                <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-sm text-white/50">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-jade/80">Timeline</p>
            <h2 className="mt-3 font-display text-4xl text-white">Featured Eras</h2>
          </div>
          <Link href="/atlas" className="hidden text-sm text-white/60 transition hover:text-white sm:block">
            Explore all eras
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {eras.slice(0, 4).map((era) => (
            <Link
              key={era.id}
              href={`/eras/${era.slug}`}
              className="rounded-md border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-jade/35 hover:bg-white/[0.08]"
            >
              <p className="text-sm text-jade">{era.years}</p>
              <h3 className="mt-3 font-display text-2xl text-white">{era.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{era.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
