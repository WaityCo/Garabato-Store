import { clsx } from 'clsx';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function formatPrice(amount) {
  return formatter.format(amount).replace('COP', '$').trim();
}

export default function Price({ amount, compareAt, className, size = 'md' }) {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };
  return (
    <div className={clsx('inline-flex items-baseline gap-2 font-sans tabular-nums', sizes[size], className)}>
      <span className={clsx(compareAt ? 'text-accent-2' : 'text-current')}>
        {formatPrice(amount)}
      </span>
      {compareAt && (
        <span className="line-through text-soft text-[0.85em]">
          {formatPrice(compareAt)}
        </span>
      )}
    </div>
  );
}
