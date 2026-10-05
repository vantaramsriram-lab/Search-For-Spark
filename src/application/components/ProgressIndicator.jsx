import { motion, useReducedMotion } from 'framer-motion';
import { STEP_META } from '../../utils/constants';

export default function ProgressIndicator({ step }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <div className="flex gap-1.5 w-28 sm:w-44" aria-hidden="true">
        {STEP_META.map((s, i) => (
          <span key={s.key} className="relative h-[3px] flex-1 bg-line overflow-hidden">
            <motion.span
              className="absolute inset-0 bg-volt origin-left"
              initial={false}
              animate={{ scaleX: step > i + 1 ? 1 : step === i + 1 ? 1 : 0, opacity: step === i + 1 ? 1 : step > i + 1 ? 0.45 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        ))}
      </div>
      <p className="font-mono text-[11px] sm:text-xs tracking-widest2 text-mute" aria-live="polite">
        <span className="text-paper">0{step}</span> / 04
      </p>
    </div>
  );
}
