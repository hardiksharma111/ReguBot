import React, { useState } from "react";
import { motion } from "framer-motion";

const deptColors = {
  KYC: "bg-indigo-100 text-indigo-700",
  IT: "bg-emerald-100 text-emerald-700",
  Lending: "bg-rose-100 text-rose-700",
  Legal: "bg-yellow-100 text-yellow-800",
  Operations: "bg-sky-100 text-sky-700"
};

export default function KanbanCard({ card, onOpen, onMove }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-surface bg-surface/90 p-3 shadow-md group"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-base/50 px-2 py-0.5 text-xs font-medium">{card.source.split("/")[0]}</span>
              <span className="text-xs text-muted">{card.source.split("/")[2] || card.source.split("/")[1]}</span>
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-ink cursor-pointer" onClick={() => onOpen(card)}>{card.title}</h3>
          <p className="mt-1 text-xs text-muted">{card.department} • Due: <span className={`${card.countdown.status==='red'?'text-red-500':card.countdown.status==='amber'?'text-amber-500':'text-muted'}`}>{card.countdown.text}</span></p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${deptColors[card.department] || 'bg-base/50'}`}>{card.department}</span>
          </div>

          <div className="flex items-center gap-2">
            <select onChange={(e)=>onMove(card.id, e.target.value)} value={card.stage} className="rounded-md border border-surface bg-base/50 px-2 py-1 text-sm">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Awaiting Validation</option>
              <option>Completed</option>
            </select>
            <button onClick={()=>setOpen(o=>!o)} className="p-1 text-muted">•••</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
