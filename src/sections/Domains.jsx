import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import MaskText from '../components/MaskText';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import DomainMotif from '../components/DomainMotif';
import { useSelection } from '../context/SelectionContext';
import { DOMAINS, MAX_DOMAINS } from '../utils/constants';

function DomainCard({ domain, index }) {
  const { selected, toggleDomain } = useSelection();
  const isSelected = selected.includes(domain.id);
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => toggleDomain(domain.id)}
        aria-pressed={isSelected}
        data-cursor="hover"
        className={`group relative w-full text-left border-t border-line px-2 sm:px-6 py-6 sm:py-8 transition-all duration-300 ease-engineered hover:bg-panel hover:-translate-y-[2px] ${
          isSelected ? 'bg-panel2' : ''
        }`}
      >
        {/* selected accent bar */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 h-full w-[2px] bg-volt origin-top transition-transform duration-500 ease-engineered ${
            isSelected ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <span className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[56px_1fr_auto_auto] items-center gap-4 sm:gap-8">
          <span
            className={`font-mono text-sm transition-colors duration-300 ${
              isSelected ? 'text-voltbright' : 'text-dim group-hover:text-mute'
            }`}
          >
            {domain.num}
          </span>

          <span className="min-w-0">
            <span
              className={`block font-display font-semibold uppercase tracking-tight text-xl sm:text-3xl transition-all duration-300 ease-engineered group-hover:translate-x-1.5 ${
                isSelected ? 'text-voltbright' : 'text-paper'
              }`}
            >
              {domain.name}
            </span>
            <span className="mt-1 block mono-tag">{domain.desc}</span>
          </span>

          <DomainMotif
            motif={domain.motif}
            className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors duration-300 ${
              isSelected ? 'text-voltbright' : 'text-dim group-hover:text-paper'
            }`}
          />

          <span className="flex items-center gap-3 justify-self-end">
            <span className="mono-tag hidden md:block text-dim">{isSelected ? 'SELECTED' : 'SELECT'}</span>
            <span
              aria-hidden="true"
              className={`relative w-5 h-5 border transition-colors duration-300 ${
                isSelected ? 'border-volt bg-volt/15' : 'border-line group-hover:border-mute'
              }`}
            >
              <span
                className={`absolute inset-[5px] bg-volt transition-transform duration-300 ease-engineered ${
                  isSelected ? 'scale-100' : 'scale-0'
                }`}
              />
            </span>
          </span>
        </span>
      </button>
    </motion.li>
  );
}

export default function Domains() {
  const { selected, limitWarning, clearWarning } = useSelection();

  return (
    <section id="domains" className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-24 sm:py-36">
        <SectionLabel index="03" label="CHOOSE YOUR DOMAIN" />

        <div className="mt-14 sm:mt-20 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-[clamp(2.6rem,7vw,6.5rem)]">
            <MaskText inView lines={['PICK YOUR', <>BATTLEFIELD<span className="text-voltbright">.</span></>]} />
          </h2>
          <Reveal className="pb-2">
            <p className="mono-tag mb-3">You can choose up to 2 domains.</p>
            <p className="font-mono text-2xl sm:text-3xl text-paper" aria-live="polite">
              <span className={selected.length > 0 ? 'text-voltbright' : ''}>{selected.length}</span>
              <span className="text-dim"> / {MAX_DOMAINS} SELECTED</span>
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 sm:mt-16 border-b border-line">
          {DOMAINS.map((d, i) => (
            <DomainCard key={d.id} domain={d} index={i} />
          ))}
        </ul>

        <div className="mt-6 min-h-[24px]" aria-live="polite">
          <AnimatePresence>
            {limitWarning && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mono-tag text-alert"
              >
                // You can choose up to 2 domains.
                <button onClick={clearWarning} className="ml-3 underline underline-offset-4 hover:text-paper transition-colors">
                  dismiss
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-6">
          <Button to="/apply">
            {selected.length > 0 ? 'CONTINUE WITH YOUR PICKS' : 'APPLY NOW'} <span aria-hidden="true">↗</span>
          </Button>
          <span className="mono-tag text-dim">Pick up to two. Your move.</span>
        </Reveal>
      </div>
    </section>
  );
}
