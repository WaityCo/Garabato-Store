import { clsx } from 'clsx';

export default function SizeSelector({ sizes = [], value, onChange, soldOut = [] }) {
  return (
    <fieldset>
      <legend className="text-xs tracking-[0.2em] uppercase text-soft mb-2">
        Talla
      </legend>
      <ul className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const disabled = soldOut.includes(s);
          const active = value === s;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => !disabled && onChange(s)}
                disabled={disabled}
                aria-pressed={active}
                className={clsx(
                  'relative min-w-[52px] px-4 py-3 text-xs tabular-nums border transition-colors',
                  active && 'bg-text text-black border-text',
                  !active && !disabled && 'border-line hover:border-text',
                  disabled && 'border-line text-soft cursor-not-allowed line-through opacity-60'
                )}
              >
                {s}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
