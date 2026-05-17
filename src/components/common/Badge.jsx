import { clsx } from 'clsx';

const tones = {
  default: 'bg-text/10 text-text',
  accent:  'bg-accent text-black',
  alert:   'bg-accent-2 text-white',
  dark:    'bg-black text-white border border-line',
};

export default function Badge({ children, tone = 'default', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-1 text-[10px] tracking-[0.18em] uppercase font-display leading-none',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
