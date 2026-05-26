import React from "react";
import { motion } from "framer-motion";

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
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-surface bg-gradient-to-br from-surface/80 to-base/40 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">{s.title}</p>
            <span className={`inline-block h-3 w-3 rounded-full ${s.tone}`} />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-semibold">{s.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
