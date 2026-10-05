import Reveal from '../components/Reveal';
import MaskText from '../components/MaskText';
import Button from '../components/Button';
import CircuitTraces from '../components/CircuitTraces';

export default function CtaBand() {
  return (
    <section id="apply-cta" className="relative border-t border-line bg-panel overflow-hidden">
      <CircuitTraces trigger="view" className="absolute -left-40 top-1/2 -translate-y-1/2 w-[560px] opacity-40 hidden md:block" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-28 sm:py-40 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight text-[clamp(3.4rem,11vw,10rem)]">
            <MaskText inView lines={['READY?']} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-4 font-display font-semibold uppercase tracking-tight text-xl sm:text-3xl text-mute">
              Your move<span className="text-voltbright">.</span>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
          <Button to="/apply">
            APPLY NOW <span aria-hidden="true">↗</span>
          </Button>
          <p className="mono-tag text-dim text-left lg:text-right">
            Zero experience needed.
            <br />
            We care about how you think.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
