import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

/** Subtle magnetic pull (2–4px) on fine pointers only. */
function useMagnetic(reduce) {
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-4, Math.min(4, dx * 0.12)));
    y.set(Math.max(-4, Math.min(4, dy * 0.18)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { x, y, onMove, onLeave };
}

const cornerBase = 'absolute w-[7px] h-[7px] transition-transform duration-300 ease-engineered pointer-events-none';

export default function Button({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  children,
}) {
  const reduce = useReducedMotion();
  const { x, y, onMove, onLeave } = useMagnetic(reduce);

  const palette =
    variant === 'primary'
      ? 'bg-volt text-paper hover:bg-voltbright border border-volt hover:border-voltbright'
      : 'bg-transparent text-paper border border-line hover:border-volt/70';

  const cornerColor = variant === 'primary' ? 'border-paper/70' : 'border-voltbright';

  const inner = (
    <motion.span
      style={reduce ? undefined : { x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest2 transition-colors duration-300 ${palette} ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      }`}
      data-cursor="cta"
    >
      {/* corner brackets */}
      <span aria-hidden="true" className={`${cornerBase} -top-px -left-px border-t border-l ${cornerColor} group-hover:-translate-x-1 group-hover:-translate-y-1`} />
      <span aria-hidden="true" className={`${cornerBase} -top-px -right-px border-t border-r ${cornerColor} group-hover:translate-x-1 group-hover:-translate-y-1`} />
      <span aria-hidden="true" className={`${cornerBase} -bottom-px -left-px border-b border-l ${cornerColor} group-hover:-translate-x-1 group-hover:translate-y-1`} />
      <span aria-hidden="true" className={`${cornerBase} -bottom-px -right-px border-b border-r ${cornerColor} group-hover:translate-x-1 group-hover:translate-y-1`} />
      <span className="relative">{children}</span>
    </motion.span>
  );

  const handlers = { onMouseMove: onMove, onMouseLeave: onLeave };

  if (to) {
    return (
      <Link to={to} {...handlers} className={`inline-block ${className}`}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...handlers} className={`inline-block ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...handlers} className={`inline-block ${className}`}>
      {inner}
    </button>
  );
}
