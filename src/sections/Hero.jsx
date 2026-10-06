import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../components/Logo';
import MaskText from '../components/MaskText';
import Button from '../components/Button';
import CircuitCanvas from '../components/CircuitCanvas';
import CircuitTraces from '../components/CircuitTraces';

const EASE = [0.22, 1, 0.36, 1];

function Fade({ delay, children, className = '', y = 14 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const exploreDomains = () => {
    document.getElementById('domains')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden" aria-label="Search for Spark">
      {/* layered background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-tech"
        style={{ maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 78%)' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.4 }}
      >
        <CircuitCanvas className="w-full h-full" />
      </motion.div>
      <CircuitTraces trigger="mount" className="absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] max-w-[70vw] opacity-70 hidden sm:block" />

      {/* corner system labels */}
      <Fade delay={0.1} className="absolute top-20 sm:top-24 left-5 sm:left-8 lg:left-12">
        <span className="mono-tag flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-volt" aria-hidden="true" />
          SPARK // TALENT HUNT 2026
        </span>
      </Fade>
      {/* <Fade delay={0.2} className="absolute top-20 sm:top-24 right-5 sm:right-8 lg:right-12 text-right">
        <span className="mono-tag text-dim">FIRST-YEAR BATCH // OPEN CALL</span>
      </Fade> */}
      <Fade delay={0.35} className="absolute bottom-6 left-5 sm:left-8 lg:left-12 hidden md:block">
        <span className="mono-tag text-dim">SYS // RECRUIT.PROTOCOL_v1</span>
      </Fade>
      <Fade delay={0.35} className="absolute bottom-6 right-5 sm:right-8 lg:right-12 hidden md:block">
        <span className="mono-tag text-dim">23.2599° N, 77.4126° E</span>
      </Fade>

      {/* content */}
      <div className="relative flex-1 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col justify-center pt-28 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-8">
            <h1 className="font-display font-bold uppercase leading-[0.88] tracking-[-0.03em] text-[clamp(3.4rem,13.5vw,11.5rem)]">
              <MaskText
                delay={0.35}
                lines={['SEARCH', <span key="for" className="outline-text">FOR</span>, <>SPARK<span className="text-voltbright">.</span></>]}
              />
            </h1>

            <Fade delay={0.75} className="mt-8 sm:mt-10 max-w-xl">
              <p className="font-display font-semibold uppercase tracking-tight text-lg sm:text-2xl text-paper">
                Ready to build, create &amp; lead?
              </p>
              <p className="mt-3 text-sm sm:text-base text-mute leading-relaxed">
                SPARK is looking for the sharpest minds in the first-year batch.
              </p>
            </Fade>

            <Fade delay={0.9} className="mt-9 flex flex-wrap items-center gap-5">
              <Button to="/apply">
                APPLY NOW <span aria-hidden="true">↗</span>
              </Button>
              <Button variant="ghost" onClick={exploreDomains}>
                EXPLORE DOMAINS <span aria-hidden="true">↓</span>
              </Button>
            </Fade>
          </div>

          {/* logo plate */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <Fade delay={0.25} y={0} className="relative">
              <div className="relative p-6 sm:p-8 border border-line bg-panel/60">
                <span aria-hidden="true" className="absolute -top-px -left-px w-3 h-3 border-t border-l border-volt" />
                <span aria-hidden="true" className="absolute -top-px -right-px w-3 h-3 border-t border-r border-volt" />
                <span aria-hidden="true" className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-volt" />
                <span aria-hidden="true" className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-volt" />
                <Logo className="w-44 sm:w-56 lg:w-64 h-auto" />
                <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                  <span className="mono-tag">PROGRAMMING |</span>
                  <span className="mono-tag text-voltbright"> AUTOMATION |</span>
                  <span className="mono-tag"> KNOWLEDGE</span>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <Fade delay={1.05} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="mono-tag text-dim">SCROLL</span>
        <motion.span
          aria-hidden="true"
          className="block w-px h-8 bg-gradient-to-b from-volt to-transparent"
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] }}
          style={{ originY: 0 }}
        />
      </Fade>
    </section>
  );
}
