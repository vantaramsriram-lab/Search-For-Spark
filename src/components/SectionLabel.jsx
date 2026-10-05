import { motion, useReducedMotion } from 'framer-motion';

export default function SectionLabel({ index, label, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 ${className}`}
      aria-label={`Section ${index}: ${label}`}
    >
      <span className="mono-tag-blue">{index}</span>
      <span className="mono-tag text-dim">//</span>
      <span className="mono-tag">{label}</span>
      <motion.span
        aria-hidden="true"
        className="h-px flex-1 bg-line"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
