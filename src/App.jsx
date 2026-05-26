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
      <div className="flex">
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

// keep old content removed

  {
    title: "Regulatory Monitoring",
    desc:
      "Scheduled scanners watch RBI and SEBI portals, normalize new circulars, and route them into the pipeline.",
    tags: ["RBI", "SEBI", "Playwright", "PDF"]
  },
  {
    title: "MAP Generation",
    desc:
      "Agentic interpretation extracts actionable obligations with department tags, priority, and suggested deadlines.",
    tags: ["Claude", "JSON", "Routing"]
  },
  {
    title: "Compliance Dashboard",
    desc:
      "Kanban board with live SLAs, evidence uploads, and audit-ready status histories.",
    tags: ["Kanban", "Filters", "Exports"]
  },
  {
    title: "Evidence Validation",
    desc:
      "AI validation scores submissions and flags gaps with reviewer notes before sign-off.",
    tags: ["OCR", "Verdicts", "Override"]
  },
  {
    title: "Notifications",
    desc:
      "Department-aware WhatsApp and email digests with escalation reminders.",
    tags: ["WhatsApp", "SendGrid", "Alerts"]
  }
];

const stats = [
  { label: "Median time to action", value: "1h 48m" },
  { label: "Active MAPs", value: "312" },
  { label: "Overdue tasks", value: "6" },
  { label: "Monthly compliance rate", value: "97.4%" }
];

const flow = [
  {
    step: "Monitor",
    detail: "Detect new circulars with dedupe and source tagging.",
    timing: "0-30 min"
  },
  {
    step: "Interpret",
    detail: "Extract MAPs, deadlines, and department ownership.",
    timing: "< 2 min"
  },
  {
    step: "Route",
    detail: "Broadcast digests and populate the Kanban board.",
    timing: "Instant"
  },
  {
    step: "Validate",
    detail: "Evidence review with AI verdicts and overrides.",
    timing: "< 30 sec"
  }
];

const testimonials = [
  {
    name: "Compliance Officer",
    quote:
      "ReguBot converts a 40-page circular into a department-ready plan before the morning meeting."
  },
  {
    name: "Operations Lead",
    quote:
      "Every MAP comes with proof trails. Audits move from panic to confidence."
  },
  {
    name: "Risk Head",
    quote:
      "We see regulatory exposure shrink from weeks to hours with zero follow-up emails."
  }
];

const themeKey = "regubot-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(themeKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(themeKey, theme);
  }, [theme]);

  const surfaceStyle = useMemo(
    () => ({
      "--grid-bg":
        theme === "dark"
          ? "linear-gradient(transparent 39px, rgba(255,255,255,0.06) 40px), linear-gradient(90deg, transparent 39px, rgba(255,255,255,0.06) 40px)"
          : "linear-gradient(transparent 39px, rgba(0,0,0,0.06) 40px), linear-gradient(90deg, transparent 39px, rgba(0,0,0,0.06) 40px)"
    }),
    [theme]
  );

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden px-6 pt-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hero-linear text-white shadow-glow">
              RB
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">ReguBot</p>
              <p className="text-lg font-semibold">Agentic Compliance Engine</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a className="transition hover:text-ink" href="#modules">Modules</a>
            <a className="transition hover:text-ink" href="#flow">Flow</a>
            <a className="transition hover:text-ink" href="#dashboard">Dashboard</a>
            <a className="transition hover:text-ink" href="#impact">Impact</a>
          </nav>
          <button
            className="rounded-full border border-surface bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-soft transition hover:-translate-y-0.5"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
        </div>

        <section className="mx-auto mt-14 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-surface bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted shadow-soft">
              RBI + SEBI Compliance
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Close the compliance gap in hours, not weeks.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              ReguBot is an agentic regulatory engine that monitors new circulars,
              turns them into Measurable Action Points, and orchestrates every
              department toward proof-backed compliance.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-hero-linear px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
                Launch prototype
              </button>
              <button className="rounded-full border border-surface bg-surface px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5">
                View dashboard
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-surface bg-surface p-4 shadow-soft"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col gap-6">
            <div className="rounded-3xl bg-hero-linear p-[1px] shadow-glow">
              <div className="rounded-[22px] bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Live circular pulse
                </p>
                <div className="mt-4 grid gap-4">
                  {["RBI/2026-27/14", "SEBI/HO/2026/09", "RBI/2026-27/16"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl border border-surface bg-base/60 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{item}</p>
                          <p className="text-xs text-muted">
                            {index === 0
                              ? "KYC refresh guidelines"
                              : index === 1
                              ? "Market conduct reporting"
                              : "Digital lending security"}
                          </p>
                        </div>
                        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-base">
                          New
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-surface bg-surface p-5 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">MAP status</p>
                <p className="mt-3 text-3xl font-semibold text-ink">89% done</p>
                <p className="mt-2 text-sm text-muted">
                  Validation queue under 30 minutes with AI review.
                </p>
              </div>
              <div className="rounded-2xl border border-surface bg-surface p-5 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Overdue risk</p>
                <p className="mt-3 text-3xl font-semibold text-ink">-62%</p>
                <p className="mt-2 text-sm text-muted">
                  Automated reminders and escalation prevent slippage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main className="px-6">
        <section
          id="modules"
          className="mx-auto mt-24 grid w-full max-w-6xl gap-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Modules</p>
            <h2 className="font-display text-3xl font-semibold">
              Five engines. One compliance brain.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-3xl border border-surface bg-surface p-6 shadow-soft transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-ink">{module.title}</h3>
                <p className="mt-3 text-sm text-muted">{module.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-surface px-3 py-1 text-xs font-semibold text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="flow"
          className="mx-auto mt-24 grid w-full max-w-6xl gap-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Flow</p>
            <h2 className="font-display text-3xl font-semibold">
              From circular to compliance in a single timeline.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {flow.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-surface bg-surface p-6 shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {item.step}
                </p>
                <p className="mt-3 text-sm text-muted">{item.detail}</p>
                <p className="mt-4 text-lg font-semibold text-ink">{item.timing}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="dashboard"
          className="mx-auto mt-24 grid w-full max-w-6xl gap-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Dashboard</p>
            <h2 className="font-display text-3xl font-semibold">
              A living command center for every MAP.
            </h2>
          </div>
          <div
            className="grid-surface rounded-[32px] border border-surface bg-surface/80 p-6 shadow-soft"
            style={surfaceStyle}
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {["Pending", "In Progress", "Awaiting Validation"].map((column) => (
                <div
                  key={column}
                  className="rounded-3xl border border-surface bg-base/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {column}
                    </p>
                    <span className="rounded-full bg-ink px-2 py-1 text-xs font-semibold text-base">
                      {column === "Pending"
                        ? "12"
                        : column === "In Progress"
                        ? "7"
                        : "3"}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[1, 2].map((card) => (
                      <div
                        key={`${column}-${card}`}
                        className="rounded-2xl border border-surface bg-surface px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-ink">
                          {column === "Pending"
                            ? "KYC refresh checklist"
                            : column === "In Progress"
                            ? "Digital lending disclosures"
                            : "Evidence review"}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          RBI Circular | IT | Due in 2 days
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Evidence validation
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  4 tasks awaiting AI verdict
                </p>
              </div>
              <button className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-base">
                Review queue
              </button>
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="mx-auto mt-24 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-[32px] border border-surface bg-surface p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Impact</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Compliance proof that reads like a story.
            </h2>
            <p className="mt-4 text-sm text-muted">
              Every MAP, every upload, every validation, and every escalation is
              preserved in an export-ready audit log. Show regulators a complete,
              timestamped path from circular to completion.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-surface bg-base/70 p-4"
                >
                  <p className="text-sm text-muted">"{item.quote}"</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-surface bg-surface p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Digest preview</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                Weekly regulatory pulse
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>RBI circulars: 3 new actions for KYC and IT.</li>
                <li>SEBI updates: market conduct disclosure MAPs created.</li>
                <li>Deadline reminders: 5 items due within 48 hours.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-surface bg-hero-linear p-6 text-white shadow-glow">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Launch kit</p>
              <h3 className="mt-3 text-2xl font-semibold">
                Demo-ready in days, not quarters.
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Built for fast pilots with modular integrations and audit-first
                data capture.
              </p>
              <button className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink">
                Request pilot
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 pb-12 pt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[32px] border border-surface bg-surface/80 p-8 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">ReguBot</p>
            <p className="mt-2 text-lg font-semibold text-ink">
              Agentic Regulatory Compliance Engine
            </p>
            <p className="mt-2 text-sm text-muted">
              Built to eliminate the compliance gap across Indian financial
              institutions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-surface bg-base/70 px-5 py-2 text-sm font-semibold text-ink">
              Schedule walkthrough
            </button>
            <button className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-base">
              Contact team
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
