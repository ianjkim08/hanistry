"use client";

import { eras } from "@/data/history";
import { formatYear } from "@/lib/utils";

type TimelineSliderProps = { activeIndex: number; onChange: (index: number) => void };

export function TimelineSlider({ activeIndex, onChange }: TimelineSliderProps) {
  const activeEra = eras[activeIndex];

  return (
    <section aria-label="Historical timeline" className="border border-line bg-surface">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">Timeline</p>
          <h2 className="mt-1 font-display text-2xl text-paper">{activeEra.name}</h2>
        </div>
        <p className="font-mono text-xs text-muted">{activeEra.years}</p>
      </div>
      <div className="border-y border-line px-4 py-4">
        <input aria-label="Select historical era" type="range" min={0} max={eras.length - 1} value={activeIndex} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none bg-paper/10" />
      </div>
      <div className="flex snap-x overflow-x-auto">
        {eras.map((era, index) => (
          <button key={era.id} type="button" onClick={() => onChange(index)} aria-pressed={activeIndex === index} className={`min-w-[9.5rem] snap-start border-r border-line px-4 py-3 text-left transition-colors last:border-r-0 sm:min-w-0 sm:flex-1 ${activeIndex === index ? "bg-accent text-ink" : "bg-transparent text-muted hover:bg-paper/[0.04] hover:text-paper"}`}>
            <span className="block truncate text-xs font-medium">{era.name}</span>
            <span className={`mt-1 block font-mono text-[0.65rem] ${activeIndex === index ? "text-ink/65" : "text-muted/70"}`}>{formatYear(era.startYear)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
