import React from "react";
import { ArchiveBox, List, Settings, CheckSquare } from "lucide-react";

export default function Sidebar({ status = "Prototype Mode" }) {
  return (
    <aside className="w-72 border-r border-surface bg-surface min-h-screen px-4 py-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-lg bg-brand flex items-center justify-center text-white font-bold">RB</div>
        <div>
          <div className="text-sm font-semibold">ReguBot</div>
          <div className="mt-1 text-xs text-muted">Agentic Compliance</div>
        </div>
      </div>

      <div className="mt-6 px-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-base/50 px-3 py-1 text-xs font-semibold text-muted">
          {status}
        </div>
      </div>

      <nav className="mt-8 px-2">
        <ul className="space-y-1 text-sm">
          <li className="rounded-md px-3 py-2 hover:bg-base/60 cursor-pointer flex items-center gap-3">
            <List className="h-4 w-4 text-muted" /> Dashboard
          </li>
          <li className="rounded-md px-3 py-2 hover:bg-base/60 cursor-pointer flex items-center gap-3">
            <ArchiveBox className="h-4 w-4 text-muted" /> Active Circulars
          </li>
          <li className="rounded-md px-3 py-2 hover:bg-base/60 cursor-pointer flex items-center gap-3">
            <CheckSquare className="h-4 w-4 text-muted" /> AI Evidence Validator
          </li>
          <li className="rounded-md px-3 py-2 hover:bg-base/60 cursor-pointer flex items-center gap-3">
            <Settings className="h-4 w-4 text-muted" /> Settings
          </li>
        </ul>
      </nav>

      <div className="mt-auto px-2 pt-6">
        <div className="text-xs text-muted">ReguBot • Demo</div>
      </div>
    </aside>
  );
}
