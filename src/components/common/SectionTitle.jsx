import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function SectionTitle({
  eyebrow,
  title,
  cta,
  ctaTo,
  ctaOnClick,
  align = 'between',
  className,
}) {
  return (
    <header
      className={clsx(
        'mb-8 lg:mb-12 flex flex-wrap gap-4',
        align === 'between' ? 'items-end justify-between' : 'flex-col items-start',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <span className="text-xs tracking-[0.24em] uppercase text-soft">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display uppercase text-4xl lg:text-6xl leading-[0.95] tracking-[-0.005em] text-balance">
          {title}
        </h2>
      </div>
      {cta && (ctaTo ? (
        <Link
          to={ctaTo}
          className="group inline-flex items-center gap-1.5 text-xs lg:text-sm tracking-[0.18em] uppercase border-b border-line hover:border-text pb-1 transition-colors"
        >
          {cta}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      ) : (
        <button
          type="button"
          onClick={ctaOnClick}
          className="group inline-flex items-center gap-1.5 text-xs lg:text-sm tracking-[0.18em] uppercase border-b border-line hover:border-text pb-1 transition-colors"
        >
          {cta}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      ))}
    </header>
  );
}
