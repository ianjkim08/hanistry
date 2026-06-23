"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { AmbienceToggle } from "@/components/atlas/ambience-toggle";
import { HistoricalMap } from "@/components/atlas/historical-map";
import { InfoSidebar } from "@/components/atlas/info-sidebar";
import { TimelineSlider } from "@/components/atlas/timeline-slider";
import { eras } from "@/data/history";

export function AtlasShell() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(eras[1].states[0].id);
  const activeEra = eras[activeIndex];

  const changeEra = (index: number) => {
    const nextEra = eras[index];
    setActiveIndex(index);
    setSelectedStateId(nextEra.states[0]?.id ?? null);
  };

  return (
    <main className="mx-auto max-w-[1600px] px-3 py-5 sm:px-5 lg:px-7">
      <header className="mb-5 grid gap-4 border-b border-line pb-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="atlas-kicker">Interactive historical atlas</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl leading-tight tracking-[-0.025em] text-paper sm:text-4xl">
            Korean history in place and time.
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <AmbienceToggle />
          <Link href={`/eras/${activeEra.slug}`} className="atlas-button atlas-button-secondary h-10 min-h-10 px-3">
            <CalendarDays size={16} strokeWidth={1.6} /> Era detail
          </Link>
        </div>
      </header>

      <TimelineSlider activeIndex={activeIndex} onChange={changeEra} />

      <section className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <HistoricalMap era={activeEra} selectedStateId={selectedStateId} onSelectState={setSelectedStateId} />
        <InfoSidebar era={activeEra} selectedStateId={selectedStateId} onSelectState={setSelectedStateId} />
      </section>
    </main>
  );
}
