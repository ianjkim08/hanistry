"use client";

import { motion } from "framer-motion";
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
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-jade/80">Interactive Historical Atlas</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-white sm:text-6xl">
            Explore Korean history through borders, capitals, and time.
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <AmbienceToggle />
          <a
            href={`/eras/${activeEra.slug}`}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white/75 transition hover:border-jade/40 hover:text-white"
          >
            <CalendarDays size={16} />
            Era Detail
          </a>
        </div>
      </section>

      <TimelineSlider activeIndex={activeIndex} onChange={changeEra} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <motion.div
          key={activeEra.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <HistoricalMap era={activeEra} selectedStateId={selectedStateId} onSelectState={setSelectedStateId} />
        </motion.div>
        <InfoSidebar era={activeEra} selectedStateId={selectedStateId} onSelectState={setSelectedStateId} />
      </section>
    </main>
  );
}
