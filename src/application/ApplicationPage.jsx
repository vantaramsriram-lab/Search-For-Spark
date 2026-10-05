import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import ProgressIndicator from './components/ProgressIndicator';
import SuccessScreen from './components/SuccessScreen';
import StepIdentity from './steps/StepIdentity';
import StepAcademics from './steps/StepAcademics';
import StepDomains from './steps/StepDomains';
import StepExperience from './steps/StepExperience';
import { useSelection } from '../context/SelectionContext';
import { STEP_META } from '../utils/constants';
import { validateIdentity, validateAcademics, validateDomains, validateExperience } from '../utils/validators';

const EASE = [0.22, 1, 0.36, 1];

const STEP_TITLES = {
  1: 'IDENTITY',
  2: 'ACADEMICS',
  3: 'DOMAIN',
  4: 'WHY SPARK?',
};

export default function ApplicationPage() {
  const reduce = useReducedMotion();
  const { selected, limitWarning, clearWarning } = useSelection();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [fields, setFields] = useState({
    name: '',
    scholar: '',
    whatsapp: '',
    email: '',
    branch: '',
    link: '',
    interest: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState(null);

  // auto-dismiss the domain limit notice
  useEffect(() => {
    if (!limitWarning) return;
    const t = setTimeout(clearWarning, 3200);
    return () => clearTimeout(t);
  }, [limitWarning, clearWarning]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step, doneId]);

  const setField = useCallback((key, value) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const validateStep = (n) => {
    switch (n) {
      case 1:
        return validateIdentity(fields);
      case 2:
        return validateAcademics(fields);
      case 3:
        return validateDomains(selected);
      case 4:
        return validateExperience(fields);
      default:
        return {};
    }
  };

  const goTo = (n, dir) => {
    setDirection(dir);
    setStep(n);
    setServerError(null);
  };

  const onNext = () => {
    const errs = validateStep(step);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    goTo(step + 1, 1);
  };

  const onBack = () => goTo(step - 1, -1);

  const onSubmit = async () => {
    // re-validate everything server-mirror style before transmitting
    const all = {
      ...validateIdentity(fields),
      ...validateAcademics(fields),
      ...validateDomains(selected),
      ...validateExperience(fields),
    };
    setErrors(all);
    if (Object.values(all).some(Boolean)) {
      const firstBad = [1, 2, 3, 4].find((n) => {
        const e = validateStep(n);
        return Object.values(e).some(Boolean);
      });
      if (firstBad && firstBad !== step) goTo(firstBad, -1);
      return;
    }

    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, domains: selected }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) {
        setDoneId(data.applicationId);
      } else if (res.status === 409) {
        setServerError(data.error || 'An application has already been submitted using these details.');
      } else if (res.status === 422) {
        setErrors(data.errors || {});
        setServerError('Check the highlighted fields.');
      } else {
        setServerError('Something went wrong on our end. Try again in a minute.');
      }
    } catch {
      setServerError('Network error — check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepBody = {
    1: <StepIdentity fields={fields} setField={setField} errors={errors} />,
    2: <StepAcademics fields={fields} setField={setField} errors={errors} />,
    3: <StepDomains errors={errors} />,
    4: <StepExperience fields={fields} setField={setField} errors={errors} />,
  }[step];

  return (
    <div className="min-h-[100svh] flex flex-col bg-ink">
      {/* top bar */}
      <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-4 min-w-0" data-cursor="hover" aria-label="Back to SPARK home">
            <Logo className="h-8 sm:h-9 w-auto" />
            <span className="mono-tag hidden sm:block whitespace-nowrap">APPLICATION // 01</span>
          </Link>
          <ProgressIndicator step={doneId ? 4 : step} />
        </div>
        {/* progress fill */}
        <div className="h-[2px] bg-linefaint" aria-hidden="true">
          <motion.div
            className="h-full bg-volt"
            initial={false}
            animate={{ width: `${((doneId ? 4 : step) / 4) * 100}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          />
        </div>
      </header>

      {doneId ? (
        <SuccessScreen applicationId={doneId} />
      ) : (
        <main className="flex-1 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16 grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <ol className="space-y-1">
              {STEP_META.map((s, i) => {
                const n = i + 1;
                const state = n === step ? 'current' : n < step ? 'done' : 'todo';
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => state === 'done' && goTo(n, -1)}
                      disabled={state !== 'done'}
                      className={`w-full text-left flex items-baseline gap-4 px-4 py-3 border-l transition-colors duration-300 ${
                        state === 'current'
                          ? 'border-volt bg-panel text-paper'
                          : state === 'done'
                            ? 'border-line text-mute hover:text-paper hover:bg-panel/60'
                            : 'border-linefaint text-dim'
                      }`}
                    >
                      <span className={`font-mono text-[11px] ${state === 'current' ? 'text-voltbright' : ''}`}>{s.num}</span>
                      <span className="font-display font-semibold uppercase tracking-tight text-sm">{s.title}</span>
                      {state === 'done' && <span className="ml-auto mono-tag text-voltbright">✓</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-12 px-4 space-y-2">
              <p className="mono-tag text-dim">No experience? That’s fine.</p>
              <p className="mono-tag text-dim">We care about how you think.</p>
            </div>
          </aside>

          {/* step content */}
          <section className="lg:col-span-9 lg:col-start-4 max-w-3xl w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 46 * direction }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -46 * direction }}
                transition={{ duration: 0.38, ease: EASE }}
              >
                <div className="flex items-baseline gap-5 mb-10 sm:mb-12">
                  <span className="mono-tag-blue">0{step}</span>
                  <h1 className="font-display font-bold uppercase tracking-tight text-3xl sm:text-5xl">
                    {STEP_TITLES[step]}
                  </h1>
                </div>

                <AnimatePresence>
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-8 border border-alert/60 bg-alert/10 px-5 py-4"
                      role="alert"
                    >
                      <p className="font-mono text-[11px] sm:text-xs tracking-wider text-alert">// {serverError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step < 4) onNext();
                    else onSubmit();
                  }}
                >
                  {stepBody}

                  <div className="mt-12 flex items-center justify-between gap-4">
                    {step > 1 ? (
                      <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
                        <span aria-hidden="true">←</span> BACK
                      </Button>
                    ) : (
                      <Link to="/" className="mono-tag text-dim hover:text-paper transition-colors">
                        ← EXIT
                      </Link>
                    )}

                    {step < 4 ? (
                      <Button type="submit">
                        CONTINUE <span aria-hidden="true">→</span>
                      </Button>
                    ) : (
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'TRANSMITTING…' : <>SUBMIT APPLICATION <span aria-hidden="true">↗</span></>}
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </section>
        </main>
      )}
    </div>
  );
}
