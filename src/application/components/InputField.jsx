import { AnimatePresence, motion } from 'framer-motion';

export default function InputField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  hint,
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mono-tag block mb-1">
        {label} <span className="text-voltbright">*</span>
      </label>
      <div className="relative group">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-transparent border-b py-3 text-base sm:text-lg text-paper placeholder:text-dim/70 focus:outline-none transition-colors duration-300 ${
            error ? 'border-alert' : 'border-line focus:border-voltbright'
          }`}
        />
        {/* focus corner ticks */}
        <span aria-hidden="true" className="absolute -bottom-px left-0 w-2 h-2 border-b border-l border-voltbright opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <span aria-hidden="true" className="absolute -bottom-px right-0 w-2 h-2 border-b border-r border-voltbright opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      {hint && !error && <p className="mt-2 mono-tag text-dim">{hint}</p>}
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
