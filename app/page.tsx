import Link from "next/link";
import { ArrowRight, BookOpenText, Map, MoveRight } from "lucide-react";
import { eras } from "@/data/history";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="atlas-hero relative border-b border-line">
        <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-[1500px] grid-cols-1 lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 lg:col-span-6 lg:px-12 xl:px-16">
            <p className="atlas-kicker">An interactive atlas of Korean history</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(3.5rem,7.2vw,7.25rem)] leading-[0.88] tracking-[-0.055em] text-paper">
              History belongs on a map.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Trace kingdoms, capitals, and cultural change across the Korean peninsula.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/atlas" className="atlas-button atlas-button-primary">
                Open the atlas <ArrowRight size={17} strokeWidth={1.7} />
              </Link>
              <Link href="/about" className="atlas-button atlas-button-secondary">
                Read the method
              </Link>
            </div>
          </div>

          <div className="relative min-h-[27rem] overflow-hidden border-t border-line lg:col-span-6 lg:min-h-full lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-[url('/geojson/map-texture.svg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(210,173,99,.09),transparent_32%),linear-gradient(90deg,rgba(15,23,22,.18),transparent_35%),linear-gradient(180deg,transparent_55%,rgba(15,23,22,.58))]" />
            <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between border-t border-white/30 pt-4 text-xs text-white/75 sm:left-8 sm:right-8">
              <span>Korean Peninsula</span>
              <span>33°-48° N</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="max-w-4xl font-display text-4xl leading-[1.02] tracking-[-0.035em] text-paper sm:text-5xl lg:text-6xl">
            Seven eras, one continuous landscape.
          </h2>
          <div className="mt-12 overflow-x-auto pb-4">
            <div className="flex min-w-max border-y border-line">
              {eras.map((era) => (
                <Link
                  key={era.id}
                  href={`/eras/${era.slug}`}
                  className="group flex w-64 shrink-0 flex-col justify-between border-r border-line px-5 py-6 transition-colors first:border-l hover:bg-paper/[0.04] sm:w-72"
                >
                  <span className="font-mono text-xs text-accent">{era.years}</span>
                  <span className="mt-14 flex items-end justify-between gap-4 font-display text-2xl text-paper">
                    {era.name}
                    <MoveRight size={18} strokeWidth={1.5} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 sm:px-8 md:grid-cols-12 lg:px-12 xl:px-16">
          <div className="md:col-span-5">
            <Map size={28} strokeWidth={1.4} className="text-accent" />
            <h2 className="mt-8 max-w-md font-display text-4xl leading-tight tracking-[-0.03em] text-paper sm:text-5xl">
              Geography as historical evidence.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Hanistry aligns approximate territorial layers with concise historical context. Select an era, inspect a region, and follow the relationship between place and political change.
            </p>
            <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <BookOpenText size={22} strokeWidth={1.5} className="text-accent" />
                <h3 className="mt-5 text-base font-medium text-paper">Curated context</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Events, capitals, and cultural achievements stay close to the map.</p>
              </div>
              <div>
                <Map size={22} strokeWidth={1.5} className="text-accent" />
                <h3 className="mt-5 text-base font-medium text-paper">Layered geography</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Mapbox and GeoJSON provide a durable base for richer sourced boundaries.</p>
              </div>
            </div>
            <Link href="/atlas" className="mt-12 inline-flex items-center gap-3 border-b border-accent pb-2 text-sm font-medium text-paper transition-colors hover:text-accent">
              Begin exploring <ArrowRight size={16} strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
