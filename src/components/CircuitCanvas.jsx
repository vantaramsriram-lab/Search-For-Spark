import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Ambient node field — small drifting nodes with proximity links.
 * Nodes near the pointer brighten and lean toward it, very slightly.
 * Static single frame under prefers-reduced-motion.
 */
export default function CircuitCanvas({ className = '', density = 26000, interactive = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let nodes = [];
    let w = 0;
    let h = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(12, Math.min(56, Math.round((w * h) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.3 + 0.7,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const LINK = 110;
    const MOUSE_R = 150;

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.09;
            ctx.strokeStyle = `rgba(139,147,165,${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        let glow = 0;
        if (interactive) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MOUSE_R && d > 0.001) {
            glow = 1 - d / MOUSE_R;
            n.x += (dx / d) * glow * 0.22;
            n.y += (dy / d) * glow * 0.22;
          }
        }
        const pulse = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t / 1400 + n.ph);
        const base = 0.18 + pulse * 0.14 + glow * 0.5;
        if (glow > 0.05) {
          ctx.fillStyle = `rgba(61,120,255,${(glow * 0.55).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 2.2 * glow, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(245,245,242,${Math.min(0.75, base).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (t) => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -4) n.x = w + 4;
        if (n.x > w + 4) n.x = -4;
        if (n.y < -4) n.y = h + 4;
        if (n.y > h + 4) n.y = -4;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    };

    setup();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(step);
      if (interactive) {
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('mouseout', onLeave, { passive: true });
      }
      document.addEventListener('visibilitychange', onVisibility);
    }

    const onResize = () => {
      setup();
      if (reduce) draw(0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce, density, interactive]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
