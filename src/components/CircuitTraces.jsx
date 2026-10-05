import { motion, useReducedMotion } from 'framer-motion';

const TRACE = 'rgba(139,147,165,0.28)';
const TRACE_BLUE = 'rgba(21,87,255,0.55)';

const PATHS = [
  { d: 'M 40 96 H 250 L 320 166 V 340', c: TRACE, delay: 0.15 },
  { d: 'M 700 150 H 520 L 450 220 H 330', c: TRACE, delay: 0.3 },
  { d: 'M 60 620 H 240 L 320 540 V 420', c: TRACE, delay: 0.45 },
  { d: 'M 690 560 H 540 L 470 490', c: TRACE, delay: 0.55 },
  { d: 'M 360 700 V 560 L 430 490 H 560', c: TRACE_BLUE, delay: 0.7 },
];

const NODES = [
  { x: 40, y: 96, delay: 0.5 },
  { x: 320, y: 340, delay: 0.6 },
  { x: 700, y: 150, delay: 0.65 },
  { x: 330, y: 220, delay: 0.75 },
  { x: 60, y: 620, delay: 0.8 },
  { x: 320, y: 420, delay: 0.85 },
  { x: 690, y: 560, delay: 0.9 },
  { x: 360, y: 700, delay: 1.0 },
  { x: 560, y: 490, blue: true, delay: 1.05 },
];

/** Circuit traces that draw themselves in. `trigger`: 'mount' | 'view' */
export default function CircuitTraces({ trigger = 'mount', className = '' }) {
  const reduce = useReducedMotion();
  const anim = trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-80px' } };

  return (
    <motion.svg
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden="true"
      className={className}
      initial={reduce ? false : 'hidden'}
      {...(reduce ? {} : anim)}
    >
      {PATHS.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke={p.c}
          strokeWidth="1"
          initial={reduce ? false : 'hidden'}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, delay: p.delay, ease: 'easeInOut' } },
          }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r="3"
          fill={n.blue ? '#1557FF' : 'transparent'}
          stroke={n.blue ? '#3D78FF' : TRACE}
          strokeWidth="1"
          initial={reduce ? false : 'hidden'}
          variants={{
            hidden: { scale: 0, opacity: 0, transformOrigin: `${n.x}px ${n.y}px` },
            show: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: n.delay } },
          }}
        />
      ))}
    </motion.svg>
  );
}
