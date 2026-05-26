import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatBar from "./components/StatBar";
import KanbanBoard from "./components/KanbanBoard";
import TaskPanel from "./components/TaskPanel";
import mock from "./data/mockData";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("regubot-theme");
      return stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("regubot-theme", theme); } catch {}
  }, [theme]);

  const [cards, setCards] = useState(mock.cards);
  const [filters, setFilters] = useState({ department: null, regulator: null, priority: null });
  const [activeTask, setActiveTask] = useState(null);

  const moveCard = (id, stage) => setCards((c) => c.map((x) => x.id === id ? { ...x, stage } : x));
  const updateCard = (id, patch) => setCards((c) => c.map((x) => x.id === id ? { ...x, ...patch } : x));

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      if (filters.department && card.department !== filters.department) return false;
      if (filters.regulator && card.source.split("/")[0] !== filters.regulator) return false;
      if (filters.priority && card.priority !== filters.priority) return false;
      return true;
    });
  }, [cards, filters]);

  return (
    <div className="min-h-screen bg-base text-ink transition-colors">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/20 to-teal-200/10 blur-3xl" />
        <div className="absolute -bottom-56 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-200/10 to-blue-300/10 blur-3xl" />
      </div>
      <div className="flex relative">
        <Sidebar status="Pre-Development / Prototype Mode" />
        <div className="flex-1">
          <Header theme={theme} setTheme={setTheme} />
          <main className="p-6">
            <div className="mx-auto max-w-7xl">
              <StatBar />
              <section className="mt-6">
                <KanbanBoard
                  cards={filtered}
                  onOpen={(c) => setActiveTask(c)}
                  onMove={moveCard}
                  filters={filters}
                  setFilters={setFilters}
                />
              </section>
            </div>
          </main>
        </div>
      </div>

      <TaskPanel
        task={activeTask}
        onClose={() => setActiveTask(null)}
        onUpdate={(id, patch) => updateCard(id, patch)}
      />
    </div>
  );
}
