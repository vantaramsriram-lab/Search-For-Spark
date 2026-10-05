import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsDesktop } from '../hooks/useIsDesktop';

/**
 * Minimal engineered cursor — desktop / fine pointers only.
 * dot: instant · ring: spring · cta targets tint the ring blue.
 */
export default function CustomCursor() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const enabled = desktop && !reduce;

  const [mode, setMode] = useState('default'); // default | hover | cta
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 380, damping: 30, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 380, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('cursor-live');

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      if (t.closest('[data-cursor="cta"]')) setMode('cta');
      else if (t.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'))
        setMode('hover');
      else setMode('default');
    };
    const onLeaveDoc = () => setVisible(false);
    const onEnterDoc = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onEnterDoc);
    return () => {
      document.documentElement.classList.remove('cursor-live');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onEnterDoc);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const ringScale = mode === 'hover' ? 1.6 : mode === 'cta' ? 1.9 : 1;
  const ringColor = mode === 'cta' ? 'rgba(61,120,255,0.9)' : 'rgba(245,245,242,0.35)';
  const dotColor = mode === 'cta' ? '#3D78FF' : '#F5F5F2';

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="fixed top-0 left-0 z-[90] pointer-events-none w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px]"
        style={{ x: mx, y: my, opacity: visible ? 1 : 0 }}
      >
        <span className="block w-full h-full rounded-full" style={{ background: dotColor }} />
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="fixed top-0 left-0 z-[90] pointer-events-none w-7 h-7 -ml-3.5 -mt-3.5"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
      >
        <motion.span
          className="block w-full h-full rounded-full border"
          animate={{ scale: ringScale, borderColor: ringColor }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.span>
    </>
  );
}
