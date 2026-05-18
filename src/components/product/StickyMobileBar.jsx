import { formatPrice } from '../common/Price.jsx';

export default function StickyMobileBar({ price, compareAt, onAdd, disabled }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg/95 backdrop-blur-md border-t border-line">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-soft tracking-[0.16em] uppercase">
            Total
          </span>
          <span className="text-base font-medium tabular-nums">
            {formatPrice(price)}
            {compareAt && (
              <span className="ml-2 text-xs text-soft line-through">
                {formatPrice(compareAt)}
              </span>
            )}
          </span>
        </div>
        <button
          onClick={onAdd}
          disabled={disabled}
          className="flex-1 px-6 py-3.5 bg-black text-white font-display tracking-[0.16em] uppercase text-sm hover:bg-accent-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
