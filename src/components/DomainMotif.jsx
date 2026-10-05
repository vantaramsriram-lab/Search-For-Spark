/** Minimal technical line motifs — one per domain. */
export default function DomainMotif({ motif, className = '' }) {
  const common = {
    viewBox: '0 0 28 28',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'square',
    'aria-hidden': true,
    className,
  };

  switch (motif) {
    case 'code':
      return (
        <svg {...common}>
          <path d="M9 8 4 14 9 20" />
          <path d="M19 8 24 14 19 20" />
          <path d="M16 5 12 23" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...common}>
          <circle cx="6" cy="7" r="2" />
          <circle cx="22" cy="7" r="2" />
          <circle cx="14" cy="14" r="2.6" />
          <circle cx="6" cy="21" r="2" />
          <circle cx="22" cy="21" r="2" />
          <path d="M7.6 8.4 12 12.2 M20.4 8.4 16 12.2 M7.6 19.6 12 15.8 M20.4 19.6 16 15.8" />
        </svg>
      );
    case 'chip':
      return (
        <svg {...common}>
          <rect x="8" y="8" width="12" height="12" />
          <rect x="12" y="12" width="4" height="4" />
          <path d="M11 8 V4 M17 8 V4 M11 24 V20 M17 24 V20 M8 11 H4 M8 17 H4 M24 11 H20 M24 17 H20" />
        </svg>
      );
    case 'pen':
      return (
        <svg {...common}>
          <path d="M4 21 C 10 7, 18 7, 24 21" />
          <circle cx="4" cy="21" r="1.8" />
          <circle cx="24" cy="21" r="1.8" />
          <path d="M4 21 V17 M24 21 V17 M4 17 H10 M24 17 H18" />
          <circle cx="14" cy="10.5" r="1.8" />
        </svg>
      );
    case 'signal':
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="2.4" />
          <path d="M8.5 8.5 a 7.8 7.8 0 0 0 0 11" />
          <path d="M19.5 8.5 a 7.8 7.8 0 0 1 0 11" />
          <path d="M5.5 5.5 a 12 12 0 0 0 0 13" />
          <path d="M22.5 5.5 a 12 12 0 0 1 0 13" />
        </svg>
      );
    default:
      return null;
  }
}
