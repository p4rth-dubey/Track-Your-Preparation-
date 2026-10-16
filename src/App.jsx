import { NavLink, Link, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Tracker from "./pages/Tracker.jsx";
import Checklist from "./pages/Checklist.jsx";
import Background from "./Background.jsx";

export default function App() {
  return (
    <div className="shell">
      <Background />
      <header className="nav">
        <Link to="/" className="brand"><i /> Class 10 Planner</Link>
        <nav>
          <NavLink to="/tracker">Syllabus board</NavLink>
          <NavLink to="/checklist">Chapter checklist</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/checklist" element={<Checklist />} />
        </Routes>
      </main>
      <footer className="footer">Made by Parth</footer>
    </div>
  );
}
