import { AnimatePresence, motion } from 'framer-motion';

export default function TextareaField({ id, label, value, onChange, error, placeholder, required = true }) {
  return (
    <div>
      <label htmlFor={id} className="mono-tag block mb-2">
        {label} {required && <span className="text-voltbright">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={7}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-panel border p-4 sm:p-5 text-base sm:text-lg leading-relaxed text-paper placeholder:text-dim/70 focus:outline-none transition-colors duration-300 resize-y min-h-[180px] ${
            error ? 'border-alert' : 'border-line focus:border-voltbright'
          }`}
        />
        <span aria-hidden="true" className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-voltbright pointer-events-none" />
        <span aria-hidden="true" className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-voltbright pointer-events-none" />
        <span aria-hidden="true" className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-voltbright pointer-events-none" />
        <span aria-hidden="true" className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-voltbright pointer-events-none" />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 font-mono text-[11px] tracking-wider text-alert"
          >
            // {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
