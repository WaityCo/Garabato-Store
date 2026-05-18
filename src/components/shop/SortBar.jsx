import { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useUIStore } from '../../store/uiStore.js';
import { SORT_OPTIONS } from '../../hooks/useProductFilters.js';

export default function SortBar({ sort, setSort, resultCount, activeCount }) {
  const openFilters = useUIStore((s) => s.openFilters);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const current = SORT_OPTIONS.find((o) => o.id === sort);

  return (
    <div className="flex items-center justify-between gap-3 py-4 border-y border-line">
      <div className="flex items-center gap-3 lg:gap-5">
        <button
          onClick={openFilters}
          className="lg:hidden inline-flex items-center gap-2 px-3 py-2 border border-line text-xs tracking-[0.18em] uppercase hover:border-text"
        >
          <SlidersHorizontal size={14} />
          Filtros {activeCount > 0 && <span className="text-accent">({activeCount})</span>}
        </button>
        <span className="text-xs tracking-[0.18em] uppercase text-soft tabular-nums">
          {resultCount} productos
        </span>
      </div>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 px-3 py-2 border border-line text-xs tracking-[0.18em] uppercase hover:border-text"
        >
          {current?.label || 'Ordenar'}
          <ChevronDown size={14} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
        {open && (
          <ul className="absolute right-0 mt-1 w-56 bg-bg border border-line z-20">
            {SORT_OPTIONS.map((o) => (
              <li key={o.id}>
                <button
                  onClick={() => {
                    setSort(o.id);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs tracking-[0.14em] uppercase hover:bg-black/5"
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
