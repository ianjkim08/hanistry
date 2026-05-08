"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Landmark, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Era, HistoricalState } from "@/data/history";

type InfoSidebarProps = {
  era: Era;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
};

export function InfoSidebar({ era, selectedStateId, onSelectState }: InfoSidebarProps) {
  const [query, setQuery] = useState("");

  const filteredStates = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return era.states;
    return era.states.filter((state) =>
      [state.name, state.capital, state.description, ...state.events, ...state.achievements]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [era.states, query]);

  const selectedState =
    era.states.find((state) => state.id === selectedStateId) ?? filteredStates[0] ?? era.states[0];

  return (
    <aside className="flex min-h-[32rem] flex-col rounded-md border border-white/10 bg-ink/70 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2">
        <Search size={16} className="text-white/45" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search kingdoms, events, culture"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>

      <div className="mt-4 grid gap-2">
        {filteredStates.map((state) => (
          <StateButton
            key={state.id}
            state={state}
            selected={state.id === selectedState.id}
            onClick={() => onSelectState(state.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${era.id}-${selectedState.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-5 flex-1 rounded-md border border-white/10 bg-white/[0.05] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-jade/80">Selected Region</p>
              <h3 className="mt-2 font-display text-3xl text-white">{selectedState.name}</h3>
            </div>
            <span className="rounded-md border border-white/10 p-2" style={{ color: selectedState.color }}>
              <Landmark size={20} />
            </span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-white/40">Capital</dt>
              <dd className="text-white/85">{selectedState.capital}</dd>
            </div>
            <div>
              <dt className="text-white/40">Time Period</dt>
              <dd className="text-white/85">{selectedState.period}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-white/68">{selectedState.description}</p>

          <Section title="Major Events" items={selectedState.events} />
          <Section title="Cultural Achievements" items={selectedState.achievements} />

          <div className="mt-5 rounded-md border border-jade/20 bg-jade/10 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-jade">
              <Sparkles size={16} />
              AI summary placeholder
            </div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Connect a summarization API here to generate source-aware historical briefs from curated records.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function StateButton({
  state,
  selected,
  onClick
}: {
  state: HistoricalState;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border p-3 text-left transition ${
        selected
          ? "border-jade/40 bg-jade/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: state.color }} />
        {state.name}
      </span>
      <span className="mt-1 block text-xs text-white/45">{state.capital}</span>
    </button>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-medium text-white">{title}</h4>
      <div className="mt-2 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-white/10 bg-black/15 px-3 py-2 text-sm text-white/65">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
