import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPinned } from "lucide-react";
import { eras, getEraBySlug } from "@/data/history";

export function generateStaticParams() { return eras.map((era) => ({ slug: era.slug })); }

export default function EraDetailPage({ params }: { params: { slug: string } }) {
  const era = getEraBySlug(params.slug);
  if (!era) notFound();

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 md:py-20 lg:px-12 xl:px-16">
      <Link href="/atlas" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"><ArrowLeft size={16} strokeWidth={1.6} /> Back to atlas</Link>
      <header className="mt-10 grid gap-10 border-b border-line pb-14 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-8">
          <p className="font-mono text-xs text-accent">{era.years}</p>
          <h1 className="mt-4 max-w-[14ch] font-display text-5xl leading-[0.95] tracking-[-0.045em] text-paper sm:text-6xl lg:text-7xl">{era.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{era.summary}</p>
        </div>
        <aside className="self-end border-l border-accent pl-5 md:col-span-3 md:col-start-10">
          <MapPinned size={21} strokeWidth={1.4} className="text-accent" />
          <p className="mt-4 text-sm font-medium text-paper">Map note</p>
          <p className="mt-2 text-sm leading-6 text-muted">Boundaries are approximate placeholders prepared for sourced GeoJSON.</p>
        </aside>
      </header>

      <section className="py-12 md:py-20">
        <div className="space-y-16">
          {era.states.map((state) => (
            <article key={state.id} className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="font-mono text-xs" style={{ color: state.color }}>{state.period}</p>
                <h2 className="mt-3 font-display text-4xl tracking-[-0.025em] text-paper">{state.name}</h2>
                <p className="mt-3 text-sm text-muted">Capital: {state.capital}</p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="text-base leading-7 text-muted">{state.description}</p>
                <div className="mt-8 grid gap-8 border-t border-line pt-7 sm:grid-cols-2">
                  <EraList title="Major events" items={state.events} />
                  <EraList title="Cultural achievements" items={state.achievements} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function EraList({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="text-sm font-semibold text-paper">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="border-l border-accent/55 pl-3 text-sm leading-5 text-muted">{item}</li>)}</ul></div>;
}
