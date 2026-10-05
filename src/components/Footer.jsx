import Logo from './Logo';
import Reveal from './Reveal';
import MaskText from './MaskText';

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-panel">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Logo className="h-28 sm:h-36 w-auto" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mono-tag mt-6">PROGRAMMING × ROBOTICS × TECHNOLOGY</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:text-right flex flex-col items-start lg:items-end justify-between gap-10">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-6xl">
              <MaskText inView lines={['SEARCH', <>FOR <span className="text-voltbright">SPARK.</span></>]} />
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-10">
              <span className="mono-tag">© 2026 SPARK</span>
              <span className="mono-tag text-voltbright flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt pulse-dot" aria-hidden="true" />
                SYSTEM ONLINE
              </span>
              <span className="mono-tag text-dim">23.2599° N, 77.4126° E</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
