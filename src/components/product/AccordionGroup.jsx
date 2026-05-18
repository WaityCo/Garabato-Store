import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';

export default function AccordionGroup({ items = [] }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <li key={item.title} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenIdx(open ? -1 : i)}
              className="w-full flex items-center justify-between py-4 text-left"
              aria-expanded={open}
            >
              <span className="text-sm tracking-[0.14em] uppercase font-medium">
                {item.title}
              </span>
              {open ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <div
              className={clsx(
                'grid overflow-hidden transition-[grid-template-rows] duration-300',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-5 text-sm text-muted space-y-2 leading-relaxed">
                  {item.body}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
