import { useState } from "react";
import { SUBJECTS, TASKS, STATUSES } from "../data.js";
import useStored from "../useStored.js";

export default function Checklist() {
  const [subjectKey, setSubjectKey] = useState(SUBJECTS[0].key);
  const [checks, setChecks] = useStored("c10-checks", {});
  const [status] = useStored("c10-status", {});
  const [open, setOpen] = useState({});

  const subject = SUBJECTS.find((s) => s.key === subjectKey);
  const isOn = (id, t) => !!checks[id]?.[t];
  const toggle = (id, t) =>
    setChecks((p) => ({ ...p, [id]: { ...p[id], [t]: !p[id]?.[t] } }));
  const count = (id) => TASKS.filter((t) => isOn(id, t)).length;

  const total = subject.chapters.length * TASKS.length;
  const finished = subject.chapters.reduce((n, c) => n + count(c.id), 0);
  const pct = Math.round((finished / total) * 100);

  return (
    <div className="page">
      <div className="page-head">
        <h1>Chapter checklist</h1>
        <p>Five jobs for every chapter. Tick them as you go.</p>
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
        <span>{pct}% of {subject.name}</span>
      </div>

      <div className="chapters">
        {subject.chapters.map((c) => {
          const n = count(c.id);
          const st = status[c.id] || "todo";
          const isOpen = open[c.id] ?? false;
          return (
            <div key={c.id} className={`chapter ${n === TASKS.length ? "full" : ""}`}>
              <button className="chapter-head" aria-expanded={isOpen} onClick={() => setOpen((p) => ({ ...p, [c.id]: !isOpen }))}>
                <span className={`dot ${st}`} title={STATUSES.find((s) => s.key === st).label} />
                <span className="title">
                  {c.title}
                  {c.tag && <small>{c.tag}</small>}
                </span>
                <span className="count">{n}/{TASKS.length}</span>
                <span className={`chev ${isOpen ? "up" : ""}`} aria-hidden>▾</span>
              </button>
              <div className="mini-bar"><div style={{ width: (n / TASKS.length) * 100 + "%" }} /></div>
              {isOpen && (
                <ul className="tasks">
                  {TASKS.map((t) => (
                    <li key={t}>
                      <label>
                        <input type="checkbox" checked={isOn(c.id, t)} onChange={() => toggle(c.id, t)} />
                        <span>{t}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
