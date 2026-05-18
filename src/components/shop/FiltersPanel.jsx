import { clsx } from 'clsx';
import FilterGroup from './FilterGroup.jsx';
import { COLORS, SIZES } from '../../data/products.js';
import { CATEGORIES } from '../../data/collections.js';

const PRICE_BUCKETS = [
  { label: 'Hasta $100.000', value: 100_000 },
  { label: 'Hasta $200.000', value: 200_000 },
  { label: 'Hasta $300.000', value: 300_000 },
  { label: 'Todos los precios', value: null },
];

export default function FiltersPanel({ state, setters, activeCount }) {
  const { categories, colors, sizes, priceMax, onlyInStock } = state;
  const { toggleCategory, toggleColor, toggleSize, setPriceMax, setOnlyInStock, reset } = setters;

  return (
    <div className="text-text">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-xl uppercase">Filtros</h3>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="text-xs underline text-muted hover:text-text"
          >
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup title="Categoría">
        <ul className="space-y-2">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <label className="flex items-center gap-3 cursor-pointer text-sm hover:text-text text-muted">
                <input
                  type="checkbox"
                  className="accent-accent w-4 h-4"
                  checked={categories.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                {c.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Color">
        <ul className="flex flex-wrap gap-2">
          {Object.entries(COLORS).map(([key, c]) => {
            const active = colors.includes(key);
            return (
              <li key={key}>
                <button
                  onClick={() => toggleColor(key)}
                  aria-pressed={active}
                  className={clsx(
                    'flex items-center gap-2 pl-1.5 pr-3 py-1.5 text-xs border transition-colors',
                    active ? 'border-text bg-text/5' : 'border-line hover:border-text'
                  )}
                  title={c.name}
                >
                  <span
                    className="block w-4 h-4 rounded-full border border-line"
                    style={{ background: c.hex }}
                  />
                  {c.name}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Talla">
        <ul className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = sizes.includes(s);
            return (
              <li key={s}>
                <button
                  onClick={() => toggleSize(s)}
                  aria-pressed={active}
                  className={clsx(
                    'min-w-[44px] px-3 py-2 text-xs border tabular-nums',
                    active ? 'bg-text text-black border-text' : 'border-line hover:border-text'
                  )}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Precio">
        <ul className="space-y-2">
          {PRICE_BUCKETS.map((p) => (
            <li key={p.label}>
              <label className="flex items-center gap-3 cursor-pointer text-sm hover:text-text text-muted">
                <input
                  type="radio"
                  name="price"
                  className="accent-accent w-4 h-4"
                  checked={priceMax === p.value}
                  onChange={() => setPriceMax(p.value)}
                />
                {p.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Disponibilidad" defaultOpen={false}>
        <label className="flex items-center gap-3 cursor-pointer text-sm text-muted hover:text-text">
          <input
            type="checkbox"
            className="accent-accent w-4 h-4"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          Solo en stock
        </label>
      </FilterGroup>
    </div>
  );
}
