import React from "react";

export default function Header({ theme, setTheme }) {
  return (
    <header className="border-b border-surface bg-base/0 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h2 className="text-xl font-semibold">Dashboard / Kanban</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-surface bg-surface px-3 py-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div className="relative text-ink/60 text-lg">🔔
            <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-base" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-surface bg-surface px-3 py-1">
            <div className="text-sm font-medium">Compliance Officer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
