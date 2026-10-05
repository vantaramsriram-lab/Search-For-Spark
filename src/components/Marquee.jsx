export default function Marquee({ items, className = '' }) {
  const row = (hidden) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="mono-tag px-6 sm:px-10 whitespace-nowrap">{item}</span>
          <span aria-hidden="true" className="text-volt text-[10px]">✕</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden border-y border-line py-3 ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
