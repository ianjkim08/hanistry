"use client";

import { eras } from "@/data/history";
import { formatYear } from "@/lib/utils";

type TimelineSliderProps = {
  activeIndex: number;
  onChange: (index: number) => void;
};

export function TimelineSlider({ activeIndex, onChange }: TimelineSliderProps) {
  const activeEra = eras[activeIndex];

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.06] p-4 shadow-glow">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-jade/80">Timeline</p>
          <h2 className="mt-1 font-display text-2xl text-white">{activeEra.name}</h2>
        </div>
        <p className="text-right text-sm text-white/60">{activeEra.years}</p>
      </div>
      <input
        aria-label="Select historical era"
        type="range"
        min={0}
        max={eras.length - 1}
        value={activeIndex}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-jade"
      />
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/45 sm:grid-cols-4 lg:grid-cols-7">
        {eras.map((era, index) => (
          <button
            key={era.id}
            type="button"
            onClick={() => onChange(index)}
            className={`rounded-md border px-2 py-2 text-left transition ${
              activeIndex === index
                ? "border-jade/50 bg-jade/10 text-white"
                : "border-white/10 bg-black/10 hover:border-white/25 hover:text-white/80"
            }`}
          >
            <span className="block truncate">{era.name}</span>
            <span className="mt-1 block text-[11px] text-white/40">
              {formatYear(era.startYear)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
