import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

const LINKS = [
  { label: 'ABOUT', target: 'about' },
  { label: 'DOMAINS', target: 'domains' },
  { label: 'OPPORTUNITY', target: 'opportunity' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goToSection = (target) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: target } });
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const goToApply = () => {
    setOpen(false);
    navigate('/apply');
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
          scrolled ? 'bg-ink/80 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-16 sm:h-[72px] flex items-center justify-between" aria-label="Primary">
          <Link to="/" className="flex items-center gap-3" data-cursor="hover" aria-label="SPARK home">
            <Logo className="h-9 sm:h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <button
                key={l.target}
                onClick={() => goToSection(l.target)}
                className="group relative font-mono text-base uppercase tracking-widest2 text-mute hover:text-paper transition-colors duration-300"
                data-cursor="hover"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-volt scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-engineered" />
              </button>
            ))}
            <button
              onClick={() => goToSection('apply-cta')}
              className="group relative font-mono text-[11px] uppercase tracking-widest2 text-mute hover:text-paper transition-colors duration-300"
              data-cursor="hover"
            >
              APPLY
              <span className="absolute -bottom-1.5 left-0 h-px w-full bg-volt scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-engineered" />
            </button>
          </div>

          <div className="hidden md:block">
            <Button to="/apply" variant="primary" className="!inline-block">
              APPLY NOW <span aria-hidden="true">↗</span>
            </Button>
          </div>

          {/* hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-end justify-center gap-[7px]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-cursor="hover"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4.5, width: '24px' } : { rotate: 0, y: 0, width: '24px' }}
              className="block h-px bg-paper origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5, width: '24px' } : { rotate: 0, y: 0, width: '14px' }}
              className="block h-px bg-paper origin-center"
            />
          </button>
        </nav>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-ink/95 backdrop-blur-lg flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[...LINKS, { label: 'APPLY', target: '__apply' }].map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => (l.target === '__apply' ? goToApply() : goToSection(l.target))}
                    className="font-display font-bold text-4xl uppercase tracking-tight text-paper hover:text-voltbright transition-colors py-3 flex items-baseline gap-4"
                  >
                    <span className="mono-tag-blue">0{i + 1}</span>
                    {l.label}
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-8 pb-10 flex items-center justify-between"
            >
              <span className="mono-tag">SPARK // TALENT HUNT 2026</span>
              <span className="mono-tag text-voltbright flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt pulse-dot" /> SYSTEM ONLINE
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
