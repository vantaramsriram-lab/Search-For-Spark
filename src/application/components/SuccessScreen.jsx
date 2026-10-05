import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MaskText from '../../components/MaskText';
import Button from '../../components/Button';

const EASE = [0.22, 1, 0.36, 1];

export default function SuccessScreen({ applicationId }) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no big deal */
    }
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-5 py-24 text-center">
      {/* signal line */}
      <svg viewBox="0 0 560 60" fill="none" aria-hidden="true" className="w-full max-w-xl mb-10">
        <motion.path
          d="M 0 30 H 200 L 230 14 H 330 L 360 30 H 560"
          stroke="rgba(139,147,165,0.4)"
          strokeWidth="1"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="200" cy="30" r="4" fill="#1557FF"
          initial={reduce ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
        />
        <motion.circle
          cx="360" cy="30" r="4"
          stroke="#3D78FF" strokeWidth="1"
          initial={reduce ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 16 }}
        />
        <motion.circle
          r="3" fill="#F5F5F2"
          initial={reduce ? { cx: 560, opacity: 0 } : { cx: 0, cy: 30, opacity: 0 }}
          animate={reduce ? { opacity: 0 } : { cx: 560, cy: 30, opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.2, duration: 1.0, ease: 'easeInOut' }}
        />
      </svg>

      <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,7vw,5.5rem)]">
        <MaskText delay={0.5} lines={['APPLICATION', 'RECEIVED.']} />
      </h1>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        className="mt-6 space-y-1"
      >
        <p className="text-mute">Your signal has been received.</p>
        <p className="text-mute">Welcome to the search.</p>
        <p className="mono-tag mt-3 text-dim">SPARK will get back to you with the next steps.</p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
        className="mt-10 border border-line bg-panel px-8 py-6 flex flex-col items-center gap-3"
      >
        <span className="mono-tag text-dim">APPLICATION ID</span>
        <span className="font-mono text-2xl sm:text-3xl tracking-[0.18em] text-voltbright">{applicationId}</span>
        <button
          onClick={copyId}
          className="mono-tag text-mute hover:text-paper transition-colors underline underline-offset-4"
          data-cursor="hover"
        >
          {copied ? 'COPIED ✓' : 'COPY'}
        </button>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
        className="mt-10"
      >
        <Button to="/">
          BACK TO SPARK <span aria-hidden="true">↗</span>
        </Button>
      </motion.div>
    </div>
  );
}
