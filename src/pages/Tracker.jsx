import { useState } from "react";
import { SUBJECTS, STATUSES } from "../data.js";
import useStored from "../useStored.js";

export default function Tracker() {
  const [subjectKey, setSubjectKey] = useState(SUBJECTS[0].key);
  const [status, setStatus] = useStored("c10-status", {});
  const [overCol, setOverCol] = useState(null);
  const [dragId, setDragId] = useState(null);

  const subject = SUBJECTS.find((s) => s.key === subjectKey);
  const get = (id) => status[id] || "todo";
  const move = (id, to) => setStatus((p) => ({ ...p, [id]: to }));
  const doneCount = subject.chapters.filter((c) => get(c.id) === "done").length;
  const pct = Math.round((doneCount / subject.chapters.length) * 100);

  return (
    <div className="page wide">
      <div className="page-head">
        <h1>Syllabus board</h1>
        <p>Drag a chapter into the column that matches where you are. On a phone, use the dropdown on the card.</p>
      </div>

      <div className="tabs">
        {SUBJECTS.map((s) => (
          <button key={s.key} className={s.key === subjectKey ? "tab on" : "tab"} onClick={() => setSubjectKey(s.key)}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="bar-row">
        <div className="bar"><div style={{ width: pct + "%" }} /></div>
        <span>{doneCount}/{subject.chapters.length} completed</span>
      </div>

      <div className="board">
        {STATUSES.map((col) => {
          const items = subject.chapters.filter((c) => get(c.id) === col.key);
          return (
            <section
              key={col.key}
              className={`col ${col.key} ${overCol === col.key ? "over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.key); }}
              onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOverCol(null); }}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain") || dragId;
                if (id) move(id, col.key);
                setOverCol(null); setDragId(null);
              }}
            >
              <h2><span className={`dot ${col.key}`} /> {col.label} <b>{items.length}</b></h2>
              <div className="cards">
                {items.length === 0 && <p className="empty">Drop chapters here</p>}
                {items.map((c) => (
                  <article
                    key={c.id}
                    className={`card ${dragId === c.id ? "dragging" : ""}`}
                    draggable
                    onDragStart={(e) => { e.dataTransfer.setData("text/plain", c.id); e.dataTransfer.effectAllowed = "move"; setDragId(c.id); }}
                    onDragEnd={() => { setDragId(null); setOverCol(null); }}
                  >
                    <div>
                      <strong>{c.title}</strong>
                      {c.tag && <small>{c.tag}</small>}
                    </div>
                    <select aria-label={`Move ${c.title}`} value={col.key} onChange={(e) => move(c.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
