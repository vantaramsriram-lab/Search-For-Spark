import { AnimatePresence, motion } from 'framer-motion';
import { BRANCHES } from '../../utils/constants';

export default function BranchSelector({ value, onChange, error }) {
  return (
    <div role="radiogroup" aria-label="Branch">
      <p className="mono-tag mb-3">
        BRANCH <span className="text-voltbright">*</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {BRANCHES.map((b) => {
          const active = value === b;
          return (
            <label key={b} className="relative cursor-pointer" data-cursor="hover">
              <input
                type="radio"
                name="branch"
                value={b}
                checked={active}
                onChange={() => onChange(b)}
                className="peer sr-only"
              />
              <span
                className={`flex items-center justify-between gap-2 border px-4 py-3.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-voltbright ${
                  active
                    ? 'border-volt bg-volt/10 text-voltbright'
                    : 'border-line text-mute hover:border-mute hover:text-paper'
                }`}
              >
                {b}
                <span aria-hidden="true" className={`w-1.5 h-1.5 transition-colors ${active ? 'bg-volt' : 'bg-line'}`} />
              </span>
            </label>
          );
        })}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 font-mono text-[11px] tracking-wider text-alert"
          >
            // {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
