import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskPanel({ task, onClose, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const [verdict, setVerdict] = useState(null);

  useEffect(()=>{
    if(!task){ setUploading(false); setVerdict(null); }
  },[task]);

  const handleUpload = ()=>{
    setUploading(true);
    setVerdict(null);
    setTimeout(()=>{
      setUploading(false);
      // simulate AI verdict
      setVerdict({ status: 'Approved', notes: 'Evidence sufficiently covers the stated requirement.' });
      onUpdate && onUpdate(task.id, { stage: 'Awaiting Validation' });
    }, 2000);
  }

  return (
    <AnimatePresence>
      {task && (
        <motion.aside initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="fixed right-0 top-0 z-50 h-full w-96 border-l border-surface bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-xs text-muted">{task.source} • {task.department} • Priority: {task.priority}</p>
            </div>
            <button onClick={onClose} className="text-muted">Close</button>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase text-muted">Source snippet</p>
            <pre className="mt-2 max-h-28 overflow-auto rounded-md border border-surface bg-base/60 p-3 text-xs">"...{task.title.slice(0,120)}..."</pre>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase text-muted">Evidence upload</p>
            <div className="mt-2 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-surface/60 p-4">
              <div className="text-sm text-muted">Drag & drop files here</div>
              <button onClick={handleUpload} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Browse Files</button>
              {uploading && <div className="mt-2 text-sm text-muted">Analyzing Document via AI...</div>}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase text-muted">AI Validation Verdict</p>
            <div className="mt-2 rounded-md border border-surface bg-base/60 p-3">
              {uploading && <div className="text-sm text-muted">Waiting for analysis...</div>}
              {!uploading && !verdict && <div className="text-sm text-muted">No analysis yet. Upload a file to run AI validation.</div>}
              {!uploading && verdict && (
                <div>
                  <div className={`text-sm font-semibold ${verdict.status==='Approved'?'text-emerald-600':verdict.status==='Rejected'?'text-red-600':'text-amber-600'}`}>Status: {verdict.status}</div>
                  <div className="mt-2 text-sm text-muted">{verdict.notes}</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={()=>onUpdate && onUpdate(task.id, { stage: 'Completed' })} className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">Human Approve</button>
                    <button onClick={()=>onUpdate && onUpdate(task.id, { stage: 'Awaiting Validation' })} className="rounded-full border border-surface px-3 py-1 text-sm font-medium">Override</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
