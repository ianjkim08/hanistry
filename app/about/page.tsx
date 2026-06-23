import Link from "next/link";
import { ArrowRight, Database, Map, Scale } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 xl:px-16">
      <header className="grid gap-10 border-b border-line pb-16 md:grid-cols-12 md:pb-24">
        <div className="md:col-span-8">
          <p className="atlas-kicker">About Hanistry</p>
          <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.98] tracking-[-0.045em] text-paper sm:text-6xl lg:text-7xl">A map is an argument about history.</h1>
        </div>
        <p className="max-w-md self-end text-base leading-7 text-muted md:col-span-4">Hanistry is a foundation for exploring Korean history through changing territory, political centers, and curated context.</p>
      </header>

      <section className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <h2 className="font-display text-4xl tracking-[-0.03em] text-paper md:col-span-4">What this atlas contains</h2>
        <div className="space-y-8 md:col-span-7 md:col-start-6">
          <p className="text-lg leading-8 text-muted">The current release covers Gojoseon, the Three Kingdoms, Unified Silla, Goryeo, Joseon, Japanese occupation, and modern North and South Korea.</p>
          <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            <Method icon={Map} title="Spatial" text="Era-specific GeoJSON connects historical regions to the interactive map." />
            <Method icon={Database} title="Structured" text="Shared data records power the atlas, timeline, and era pages." />
            <Method icon={Scale} title="Provisional" text="Boundaries are approximate and should be replaced with sourced research." />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl tracking-[-0.03em] text-paper">A foundation for deeper scholarship.</h2>
          <p className="mt-6 text-base leading-8 text-muted">Production use should connect peer-reviewed geometry, citations, source metadata, and editorial workflows. The existing Mapbox, GeoJSON, and Supabase seams are designed to support that work without changing the reader experience.</p>
          <Link href="/atlas" className="mt-9 inline-flex items-center gap-3 border-b border-accent pb-2 text-sm font-medium text-paper hover:text-accent">Open the atlas <ArrowRight size={16} strokeWidth={1.6} /></Link>
        </div>
      </section>
    </main>
  );
}

function Method({ icon: Icon, title, text }: { icon: typeof Map; title: string; text: string }) {
  return <div><Icon size={22} strokeWidth={1.4} className="text-accent" /><h3 className="mt-5 text-sm font-semibold text-paper">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>;
}
