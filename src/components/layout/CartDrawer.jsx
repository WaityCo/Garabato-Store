import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore.js';
import { useCartStore, useCartSubtotal } from '../../store/cartStore.js';
import { formatPrice } from '../common/Price.jsx';
import { COLORS } from '../../data/products.js';

const FREE_SHIPPING_THRESHOLD = 250000;

export default function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartSubtotal();

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-label="Carrito"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 right-0 h-full w-full sm:max-w-md bg-bg border-l border-line text-text flex flex-col"
          >
            <header className="flex items-center justify-between px-5 py-5 border-b border-line">
              <h2 className="font-display text-2xl uppercase">Carrito</h2>
              <button
                onClick={close}
                aria-label="Cerrar carrito"
                className="p-1.5 rounded-sm hover:bg-white/5"
              >
                <X size={22} />
              </button>
            </header>

            {/* Free shipping bar */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-b border-line">
                <p className="text-xs text-muted">
                  {remainingForFree > 0 ? (
                    <>Te faltan <span className="text-text font-medium">{formatPrice(remainingForFree)}</span> para envío gratis.</>
                  ) : (
                    <span className="text-accent">¡Envío gratis desbloqueado!</span>
                  )}
                </p>
                <div className="mt-2 h-1 bg-line overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-4">
                  <ShoppingBag size={40} className="text-soft" />
                  <p className="text-muted">Tu carrito está vacío.</p>
                  <Link
                    to="/shop"
                    onClick={close}
                    className="px-6 py-3 bg-accent text-black font-display tracking-[0.16em] uppercase text-xs hover:bg-text transition-colors"
                  >
                    Ver tienda
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {items.map((it) => (
                    <li key={it.key} className="px-5 py-4 flex gap-4">
                      <Link
                        to={`/product/${it.slug}`}
                        onClick={close}
                        className="w-20 h-24 bg-surface flex-shrink-0 overflow-hidden"
                      >
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${it.slug}`}
                            onClick={close}
                            className="text-sm font-medium hover:text-muted"
                          >
                            {it.name}
                          </Link>
                          <button
                            onClick={() => removeItem(it.key)}
                            aria-label="Quitar"
                            className="text-soft hover:text-text"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-soft mt-1">
                          {[COLORS[it.color]?.name, it.size].filter(Boolean).join(' · ')}
                        </p>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-line">
                            <button
                              onClick={() => updateQty(it.key, it.qty - 1)}
                              aria-label="Restar"
                              className="px-2 py-1.5 hover:bg-white/5"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm tabular-nums">{it.qty}</span>
                            <button
                              onClick={() => updateQty(it.key, it.qty + 1)}
                              aria-label="Sumar"
                              className="px-2 py-1.5 hover:bg-white/5"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm tabular-nums">
                            {formatPrice(it.price * it.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="px-5 py-5 border-t border-line space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="tabular-nums font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[11px] text-soft">
                  Envío e impuestos calculados al pagar.
                </p>
                <button
                  onClick={() => alert('Checkout (mock).')}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-text transition-colors"
                >
                  Pagar ahora <ArrowRight size={16} />
                </button>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
