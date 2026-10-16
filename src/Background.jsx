import { useEffect, useRef } from "react";

// Aurora glow (CSS) + a 3D particle field and perspective grid (canvas, no libraries)
export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, dpr, raf, t = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const pts = Array.from({ length: 120 }, () => ({
      x: Math.random() * 4 - 2, y: Math.random() * 3 - 1.5, z: Math.random() * 4 - 2, h: Math.random(),
    }));
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    };
    const onMove = (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; };

    const project = (x, y, z, ry, rx) => {
      let X = x * Math.cos(ry) - z * Math.sin(ry), Z = x * Math.sin(ry) + z * Math.cos(ry);
      let Y = y * Math.cos(rx) - Z * Math.sin(rx); Z = y * Math.sin(rx) + Z * Math.cos(rx);
      const k = (Math.min(w, h) * 0.9) / (Z + 4);
      return { sx: w / 2 + X * k, sy: h / 2 + Y * k, k, z: Z };
    };

    const draw = () => {
      t += still ? 0 : 0.0025;
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      const ry = t + mouse.x * 0.8, rx = 0.25 + mouse.y * 0.4;
      ctx.clearRect(0, 0, w, h);

      // floor grid
      ctx.lineWidth = dpr * 0.8;
      for (let i = -5; i <= 5; i++) {
        for (const [a, b] of [[[i, 1.6, -5], [i, 1.6, 5]], [[-5, 1.6, i], [5, 1.6, i]]]) {
          const p = project(...a, ry * 0.5, rx), q = project(...b, ry * 0.5, rx);
          if (p.z < -3.5 || q.z < -3.5) continue;
          ctx.strokeStyle = "rgba(120,200,255,0.07)";
          ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(q.sx, q.sy); ctx.stroke();
        }
      }

      // particles + links
      const P = pts.map((p) => ({ ...project(p.x, p.y, p.z, ry, rx), h: p.h }));
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].sx - P[j].sx, dy = P[i].sy - P[j].sy, d = Math.hypot(dx, dy);
          if (d < 130 * dpr) {
            ctx.strokeStyle = `rgba(100,255,210,${(1 - d / (130 * dpr)) * 0.16})`;
            ctx.beginPath(); ctx.moveTo(P[i].sx, P[i].sy); ctx.lineTo(P[j].sx, P[j].sy); ctx.stroke();
          }
        }
      }
      for (const p of P) {
        const r = Math.max(0.6, p.k * 0.006) * dpr, a = Math.min(1, Math.max(0.15, (p.z + 2.5) / 4));
        ctx.fillStyle = `hsla(${160 + p.h * 140},90%,70%,${a})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, 7); ctx.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    addEventListener("resize", resize); addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div className="bg" aria-hidden>
      <div className="aurora a1" /><div className="aurora a2" /><div className="aurora a3" />
      <canvas ref={ref} />
      <div className="vignette" />
    </div>
  );
}
