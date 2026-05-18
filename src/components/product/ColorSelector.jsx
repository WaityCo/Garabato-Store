import { clsx } from 'clsx';
import { COLORS } from '../../data/products.js';

export default function ColorSelector({ colors = [], value, onChange }) {
  return (
    <fieldset>
      <legend className="text-xs tracking-[0.2em] uppercase text-soft mb-2">
        Color · <span className="text-text">{COLORS[value]?.name}</span>
      </legend>
      <ul className="flex flex-wrap gap-3">
        {colors.map((c) => {
          const active = value === c;
          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => onChange(c)}
                aria-pressed={active}
                aria-label={COLORS[c]?.name}
                className={clsx(
                  'relative w-9 h-9 rounded-full border transition-colors',
                  active ? 'border-text ring-2 ring-text ring-offset-2 ring-offset-bg' : 'border-line hover:border-text'
                )}
                style={{ background: COLORS[c]?.hex }}
              />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
