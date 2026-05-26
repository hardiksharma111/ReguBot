import React from "react";
import { Sun, Moon, Bell, User } from "lucide-react";

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
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="relative">
            <Bell className="h-5 w-5 text-muted" />
            <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-base" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-surface bg-surface px-3 py-1">
            <User className="h-4 w-4 text-muted" />
            <div className="text-sm font-medium">Compliance Officer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
