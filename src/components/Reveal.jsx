import { motion, useReducedMotion } from 'framer-motion';

/** Scroll-reveal wrapper — one-shot, engineered easing. */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className = '',
  as = 'div',
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
