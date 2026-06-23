"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Landmark, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Era, HistoricalState } from "@/data/history";

type InfoSidebarProps = { era: Era; selectedStateId: string | null; onSelectState: (stateId: string) => void };

export function InfoSidebar({ era, selectedStateId, onSelectState }: InfoSidebarProps) {
  const [query, setQuery] = useState("");
  const filteredStates = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return era.states;
    return era.states.filter((state) => [state.name, state.capital, state.description, ...state.events, ...state.achievements].join(" ").toLowerCase().includes(normalized));
  }, [era.states, query]);
  const selectedState = era.states.find((state) => state.id === selectedStateId) ?? filteredStates[0] ?? era.states[0];

  return (
    <aside className="flex min-h-[42rem] min-w-0 flex-col border border-line bg-surface xl:h-[calc(100dvh-7rem)] xl:min-h-[42rem] xl:overflow-hidden">
      <label className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Search size={16} strokeWidth={1.6} className="text-muted" />
        <span className="sr-only">Search historical regions</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search regions and events" className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-muted/60" />
      </label>

      <div className="flex gap-px overflow-x-auto border-b border-line bg-line p-px xl:flex-wrap">
        {filteredStates.map((state) => <StateButton key={state.id} state={state} selected={state.id === selectedState.id} onClick={() => onSelectState(state.id)} />)}
        {filteredStates.length === 0 ? <p className="w-full bg-surface px-4 py-5 text-sm text-muted">No regions match this search.</p> : null}
      </div>

      {selectedState ? (
        <AnimatePresence mode="wait">
          <motion.div key={`${era.id}-${selectedState.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">Selected region</p>
                <h3 className="mt-2 font-display text-4xl leading-none text-paper">{selectedState.name}</h3>
              </div>
              <Landmark size={22} strokeWidth={1.4} style={{ color: selectedState.color }} />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-line py-4 text-sm">
              <div><dt className="text-xs text-muted">Capital</dt><dd className="mt-1 text-paper">{selectedState.capital}</dd></div>
              <div><dt className="text-xs text-muted">Period</dt><dd className="mt-1 text-paper">{selectedState.period}</dd></div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-muted">{selectedState.description}</p>
            <InfoSection title="Major events" items={selectedState.events} />
            <InfoSection title="Cultural achievements" items={selectedState.achievements} />
            <p className="mt-7 border-t border-line pt-4 text-xs leading-5 text-muted/75">Territorial boundaries are approximate and intended as a foundation for source-verified GeoJSON.</p>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </aside>
  );
}

function StateButton({ state, selected, onClick }: { state: HistoricalState; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`min-w-[10rem] flex-1 bg-surface px-4 py-3 text-left transition-colors ${selected ? "text-accent" : "text-muted hover:bg-paper/[0.04] hover:text-paper"}`}><span className="block text-sm font-medium">{state.name}</span><span className="mt-1 block truncate text-xs opacity-70">{state.capital}</span></button>;
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return <section className="mt-7"><h4 className="text-sm font-medium text-paper">{title}</h4><ul className="mt-3 space-y-3">{items.map((item) => <li key={item} className="border-l border-accent/55 pl-3 text-sm leading-5 text-muted">{item}</li>)}</ul></section>;
}
