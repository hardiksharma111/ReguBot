import React from "react";
import KanbanCard from "./KanbanCard";

const COLUMNS = ["Pending", "In Progress", "Awaiting Validation", "Completed"];

export default function KanbanBoard({ cards, onOpen, onMove, filters, setFilters }) {
  const departments = ["KYC", "IT", "Lending", "Legal", "Operations"];
  const regulators = ["RBI", "SEBI"];
  const priorities = ["High", "Medium", "Low"];

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted">Filter:</span>
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setFilters((f) => ({ ...f, department: f.department === d ? null : d }))}
              className={`rounded-full px-3 py-1 text-sm font-medium ${filters.department === d ? 'bg-brand text-white' : 'bg-base/60 text-ink'}`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {regulators.map((r) => (
            <button
              key={r}
              onClick={() => setFilters((f) => ({ ...f, regulator: f.regulator === r ? null : r }))}
              className={`rounded-full px-3 py-1 text-sm font-medium ${filters.regulator === r ? 'bg-brand text-white' : 'bg-base/60 text-ink'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setFilters((f) => ({ ...f, priority: f.priority === p ? null : p }))}
              className={`rounded-full px-3 py-1 text-sm font-medium ${filters.priority === p ? 'bg-brand text-white' : 'bg-base/60 text-ink'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col} className="rounded-2xl border border-surface bg-base/70 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.12em] text-muted">{col}</p>
              <span className="rounded-full bg-ink/10 px-2 py-1 text-xs font-semibold text-ink">{cards.filter(c=>c.stage===col).length}</span>
            </div>
            <div className="mt-3 space-y-3">
              {cards.filter((c) => c.stage === col).map((card) => (
                <KanbanCard key={card.id} card={card} onOpen={onOpen} onMove={onMove} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
