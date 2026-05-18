import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumbs" className="text-xs tracking-[0.16em] uppercase text-soft flex items-center flex-wrap gap-1">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1">
            {item.to && !last ? (
              <Link to={item.to} className="hover:text-text transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={last ? 'text-text' : ''}>{item.label}</span>
            )}
            {!last && <ChevronRight size={12} className="text-line" />}
          </span>
        );
      })}
    </nav>
  );
}
