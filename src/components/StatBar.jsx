import React from "react";
import { Circle } from "lucide-react";

const stats = [
  { title: "Total Circulars Processed", value: "24", tone: "text-sky-600" },
  { title: "Active Open MAPs", value: "12", tone: "text-amber-500" },
  { title: "Overdue Tasks", value: "2", tone: "text-red-500" },
  { title: "Compliance Score", value: "94.2%", tone: "text-emerald-500" }
];

export default function StatBar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.title} className="rounded-2xl border border-surface bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">{s.title}</p>
            <Circle className={`h-4 w-4 ${s.tone}`} />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-semibold">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
