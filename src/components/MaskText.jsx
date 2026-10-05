import { motion, useReducedMotion } from 'framer-motion';

/**
 * Line-mask reveal: each line slides up from behind an overflow mask.
 * `lines` — array of nodes (strings or JSX).
 */
export default function MaskText({ lines, className = '', delay = 0, stagger = 0.09, duration = 0.8, inView = false }) {
  const reduce = useReducedMotion();
  const viewport = inView ? { once: true, margin: '-60px' } : undefined;

  const lineProps = inView
    ? { whileInView: 'show', viewport }
    : { animate: 'show' };

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden={typeof line === 'string' ? undefined : undefined}>
          <motion.span
            className="block will-change-transform"
            initial={reduce ? false : 'hidden'}
            variants={{
              hidden: { y: '112%' },
              show: { y: '0%', transition: { duration, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] } },
            }}
            {...lineProps}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
