import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';

export default function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase text-text"
        aria-expanded={open}
      >
        {title}
        {open ? <Minus size={14} /> : <Plus size={14} />}
      </button>
      <div
        className={clsx(
          'grid overflow-hidden transition-[grid-template-rows] duration-300',
          open ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
