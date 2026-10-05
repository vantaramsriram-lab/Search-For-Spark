import SectionLabel from '../components/SectionLabel';
import MaskText from '../components/MaskText';
import Reveal from '../components/Reveal';

const ROWS = [
  {
    num: '01',
    title: 'DIRECT INDUCTIONS',
    desc: '15–20 student representatives will be recruited through this challenge.',
  },
  {
    num: '02',
    title: 'REAL EXPERIENCE',
    desc: 'Solve live problem statements, collaborate across disciplines, and pitch your ideas.',
  },
  {
    num: '03',
    title: 'CHOOSE YOUR DOMAIN',
    desc: 'Pick up to 2 domains to compete in.',
  },
];

const VERBS = [
  { title: 'LIVE PROBLEMS', desc: 'Solve actual problem statements.' },
  { title: 'COLLABORATE', desc: 'Work across disciplines.' },
  { title: 'PITCH', desc: 'Turn ideas into something people can understand.' },
];

export default function Opportunity() {
  return (
    <section id="opportunity" className="relative border-t border-line bg-panel">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-24 sm:py-36">
        <SectionLabel index="02" label="WHAT’S AT STAKE" />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,4.6rem)]">
              <MaskText inView lines={['WHAT’S IN IT', 'FOR YOU?']} />
            </h2>
          </div>

          {/* the number */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="relative border border-line bg-ink px-7 py-8 sm:px-10 sm:py-10">
                <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-10 bg-volt" />
                <p className="font-display font-bold tracking-[-0.03em] leading-none text-[clamp(4.5rem,10vw,8.5rem)] text-paper">
                  15<span className="text-voltbright">–</span>20
                </p>
                <p className="mt-4 font-display font-semibold uppercase tracking-tight text-paper">
                  Student representatives
                </p>
                <p className="mt-1.5 mono-tag">Direct inductions through the talent hunt.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* editorial rows */}
        <div className="mt-16 sm:mt-24 border-b border-line">
          {ROWS.map((row, i) => (
            <Reveal key={row.num} delay={i * 0.08} y={18}>
              <div className="group relative grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline border-t border-line py-7 sm:py-9 px-1 sm:px-4 transition-colors duration-300 hover:bg-ink/60">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[2px] bg-volt scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-engineered" />
                <span className="sm:col-span-2 mono-tag text-dim group-hover:text-voltbright transition-colors duration-300">
                  {row.num}
                </span>
                <h3 className="sm:col-span-5 font-display font-semibold uppercase tracking-tight text-2xl sm:text-4xl text-paper transition-transform duration-300 ease-engineered group-hover:translate-x-1.5">
                  {row.title}
                </h3>
                <p className="sm:col-span-5 text-sm sm:text-base text-mute leading-relaxed">{row.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* verbs */}
        <div className="mt-16 sm:mt-24 grid sm:grid-cols-3 gap-10 sm:gap-8">
          {VERBS.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="group relative pt-5 border-t border-line">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 text-volt text-[10px] leading-none">+</span>
                <span aria-hidden="true" className="absolute top-0 left-0 h-px w-0 bg-volt group-hover:w-full transition-all duration-700 ease-engineered" />
                <h4 className="font-display font-semibold uppercase tracking-tight text-xl sm:text-2xl text-paper">
                  {v.title}
                </h4>
                <p className="mt-2 text-sm text-mute">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
