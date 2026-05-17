import { clsx } from 'clsx';

export default function Logo({ className, size = 'md' }) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 font-display tracking-[0.04em] uppercase leading-none',
        sizes[size],
        className
      )}
      aria-label="Garabato"
    >
      <svg
        viewBox="0 0 24 24"
        width="0.9em"
        height="0.9em"
        aria-hidden="true"
        className="-translate-y-[0.05em]"
      >
        <path
          d="M2 18 C5 10, 9 14, 12 8 S18 14, 22 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      Garabato
    </span>
  );
}
