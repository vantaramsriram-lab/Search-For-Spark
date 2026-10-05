import SectionLabel from '../components/SectionLabel';
import MaskText from '../components/MaskText';
import Reveal from '../components/Reveal';

const PILLARS = [
  { name: 'LOGIC.', note: 'How you break a problem down.' },
  { name: 'CURIOSITY.', note: 'What you can’t stop wondering about.' },
  { name: 'EXECUTION.', note: 'Finishing > planning. Ship something.' },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-24 sm:py-36">
        <SectionLabel index="01" label="THE SEARCH" />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-12 lg:gap-8">

          {/* LEFT SIDE — POSTER + STATEMENT */}
          <div className="lg:col-span-8 grid lg:grid-cols-5 gap-8 items-center">

            {/* poster */}
            <div className="lg:col-span-2 flex justify-center">
              <Reveal>
                <div className="relative w-full max-w-[300px] overflow-hidden border border-line bg-panel">
                  <img
                    src="/poster.jpeg"
                    alt="SPARK Recruitment Poster"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Reveal>
            </div>

            {/* statement */}
            <div className="lg:col-span-3">
              <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,5.2rem)]">

                <MaskText
                  inView
                  lines={[
                    <>WE AREN’T</>,
                    <>LOOKING FOR</>,
                    <span key="p" className="outline-text">
                      PERFECT.
                    </span>,
                  ]}
                />

                <span className="block h-[0.6em]" aria-hidden="true" />

                <MaskText
                  inView
                  delay={0.25}
                  lines={[
                    <>WE’RE LOOKING</>,
                    <>
                      FOR <span className="text-voltbright">POTENTIAL.</span>
                    </>,
                  ]}
                />

              </h2>
            </div>

          </div>

          {/* RIGHT SIDE — BODY */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            <Reveal>
              <p className="text-mute leading-relaxed text-sm sm:text-base">
                Zero prior experience is needed. SPARK is looking for students
                who are curious, willing to learn, able to think logically —
                and willing to execute.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-l-2 border-volt bg-panel px-5 py-4">
                <p className="font-display font-semibold uppercase tracking-tight text-paper">
                  No experience? That’s fine.
                </p>

                <p className="mt-1.5 text-sm text-mute">
                  Beginner resources will be provided to level the playing field.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ul>
                {PILLARS.map((p, i) => (
                  <li
                    key={p.name}
                    className="group flex items-baseline justify-between gap-4 border-t border-line py-4 last:border-b"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="mono-tag text-dim">
                        0{i + 1}
                      </span>

                      <span className="font-display font-semibold uppercase tracking-tight text-lg text-paper group-hover:text-voltbright transition-colors duration-300">
                        {p.name}
                      </span>
                    </span>

                    <span className="mono-tag text-dim text-right">
                      {p.note}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
