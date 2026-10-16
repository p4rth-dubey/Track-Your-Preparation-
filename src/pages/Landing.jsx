import { useRef } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS, TASKS } from "../data.js";
import useStored from "../useStored.js";

const FAQ = [
  ["Do I need an account?", "No. Everything is saved in your browser on this device, so it opens instantly and stays private."],
  ["What do the three columns mean?", "Completed is for chapters you've finished, Partially done is for ones in progress, and Not started is everything else. Drag a chapter to change it any time."],
  ["What's inside each chapter checklist?", "Five jobs: Lectures, NCERT, Notes, CBQs and PYQs, and Revision. Tick them as you finish each one."],
  ["Will my progress disappear?", "It stays until you clear your browser data or switch to a different browser or device."],
];

export default function Landing() {
  const [status] = useStored("c10-status", {});
  const [checks] = useStored("c10-checks", {});
  const card = useRef(null);

  const all = SUBJECTS.flatMap((s) => s.chapters);
  const stats = SUBJECTS.map((s) => {
    const done = s.chapters.filter((c) => status[c.id] === "done").length;
    const ticks = s.chapters.reduce((n, c) => n + TASKS.filter((t) => checks[c.id]?.[t]).length, 0);
    return { ...s, done, pct: Math.round((ticks / (s.chapters.length * TASKS.length)) * 100) };
  });
  const marquee = [...all, ...all].map((c) => c.title);

  const tilt = (e) => {
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };
  const untilt = () => (card.current.style.transform = "");

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-text">
          <span className="pill">CBSE Class 10 · Maths, Science, SST, English</span>
          <h1>Know exactly where every chapter stands.</h1>
          <p>
            Sort the whole syllabus by drag and drop, then track the five jobs inside each chapter.
            Always one glance from knowing what to study next.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/tracker">Open syllabus board</Link>
            <Link className="btn" to="/checklist">Open checklist</Link>
          </div>
        </div>

        <div className="tilt-wrap" onMouseMove={tilt} onMouseLeave={untilt}>
          <div className="tilt glass" ref={card}>
            <div className="tilt-head"><span>Your progress</span><b>{all.filter((c) => status[c.id] === "done").length}/{all.length} chapters done</b></div>
            {stats.map((s) => (
              <div key={s.key} className="row">
                <div className="row-top"><span>{s.name}</span><em>{s.pct}%</em></div>
                <div className="bar"><div style={{ width: s.pct + "%" }} /></div>
                <small>{s.done} of {s.chapters.length} chapters completed</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div>{marquee.map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>

      <section className="nums">
        <div><b>{all.length}</b><span>chapters</span></div>
        <div><b>4</b><span>subjects</span></div>
        <div><b>{TASKS.length}</b><span>jobs per chapter</span></div>
        <div><b>0</b><span>accounts needed</span></div>
      </section>

      <section className="sec">
        <h2>Three steps, no setup.</h2>
        <div className="steps">
          {[
            ["Sort your syllabus", "Drag each chapter into Completed, Partially done or Not started."],
            ["Open a chapter", "Pick any chapter in the checklist to see its five jobs."],
            ["Tick as you go", "Lectures, NCERT, Notes, CBQs and PYQs, then Revision. Watch the bars fill."],
          ].map(([t, d], i) => (
            <div className="glass step" key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="sec">
        <h2>Two pages, one plan.</h2>
        <div className="two">
          <Link to="/tracker" className="glass panel">
            <h3>Syllabus board</h3>
            <p>Every chapter of every subject on a three-column board you can rearrange with a drag.</p>
            <div className="legend"><i className="dot done" />Completed <i className="dot partial" />Partially done <i className="dot todo" />Not started</div>
          </Link>
          <Link to="/checklist" className="glass panel">
            <h3>Chapter checklist</h3>
            <p>A five-point checklist for each chapter, with progress bars per chapter and per subject.</p>
            <div className="chips">{TASKS.map((t) => <span key={t}>{t}</span>)}</div>
          </Link>
        </div>
      </section>

      <section className="sec narrow">
        <h2>Questions, answered.</h2>
        {FAQ.map(([q, a]) => (
          <details key={q} className="glass faq"><summary>{q}</summary><p>{a}</p></details>
        ))}
      </section>

      <section className="cta glass">
        <h2>Your exam date is fixed. Your plan should be too.</h2>
        <Link className="btn primary" to="/tracker">Start sorting chapters</Link>
      </section>
    </div>
  );
}
