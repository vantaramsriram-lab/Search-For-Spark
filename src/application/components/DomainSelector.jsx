import { AnimatePresence, motion } from 'framer-motion';
import DomainMotif from '../../components/DomainMotif';
import { useSelection } from '../../context/SelectionContext';
import { DOMAINS, MAX_DOMAINS } from '../../utils/constants';

export default function DomainSelector({ error }) {
  const { selected, toggleDomain, limitWarning } = useSelection();

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <p className="mono-tag">
          CHOOSE DOMAIN(S) (UP TO {MAX_DOMAINS} DOMAINS) <span className="text-voltbright">*</span>
        </p>
        <p className="font-mono text-sm text-paper" aria-live="polite">
          <span className={selected.length ? 'text-voltbright' : ''}>{selected.length}</span>
          <span className="text-dim"> / {MAX_DOMAINS} SELECTED</span>
        </p>
      </div>

      <div className="border-b border-line">
        {DOMAINS.map((d) => {
          const active = selected.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggleDomain(d.id)}
              aria-pressed={active}
              data-cursor="hover"
              className={`group relative w-full text-left border-t border-line px-3 sm:px-5 py-4 sm:py-5 transition-all duration-300 hover:bg-panel hover:-translate-y-px ${
                active ? 'bg-panel2' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-full w-[2px] bg-volt origin-top transition-transform duration-300 ${
                  active ? 'scale-y-100' : 'scale-y-0'
                }`}
              />
              <span className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4">
                <span className={`font-mono text-xs ${active ? 'text-voltbright' : 'text-dim'}`}>{d.num}</span>
                <span className="min-w-0">
                  <span
                    className={`block font-display font-semibold uppercase tracking-tight text-base sm:text-xl transition-colors ${
                      active ? 'text-voltbright' : 'text-paper'
                    }`}
                  >
                    {d.name}
                  </span>
                  <span className="block mono-tag mt-0.5">{d.desc}</span>
                </span>
                <DomainMotif motif={d.motif} className={`w-6 h-6 ${active ? 'text-voltbright' : 'text-dim'}`} />
                <span
                  aria-hidden="true"
                  className={`relative w-[18px] h-[18px] border ${active ? 'border-volt bg-volt/15' : 'border-line'}`}
                >
                  <span className={`absolute inset-[4px] bg-volt transition-transform duration-300 ${active ? 'scale-100' : 'scale-0'}`} />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 min-h-[22px]" aria-live="polite">
        <AnimatePresence>
          {limitWarning && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] tracking-wider text-alert"
            >
              // You can choose up to 2 domains.
            </motion.p>
          )}
          {!limitWarning && error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] tracking-wider text-alert"
            >
              // {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
