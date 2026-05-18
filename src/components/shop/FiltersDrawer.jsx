import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore.js';
import FiltersPanel from './FiltersPanel.jsx';

export default function FiltersDrawer({ state, setters, activeCount, resultCount }) {
  const open = useUIStore((s) => s.filtersOpen);
  const close = useUIStore((s) => s.closeFilters);

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
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            onClick={close}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 left-0 h-full w-full sm:max-w-sm bg-bg border-r border-line flex flex-col"
            role="dialog"
            aria-label="Filtros"
          >
            <header className="flex items-center justify-between px-5 py-5 border-b border-line">
              <h2 className="font-display text-2xl uppercase">Filtros</h2>
              <button onClick={close} aria-label="Cerrar" className="p-1.5 rounded-sm hover:bg-black/5">
                <X size={22} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-2">
              <FiltersPanel state={state} setters={setters} activeCount={activeCount} />
            </div>
            <footer className="border-t border-line px-5 py-4">
              <button
                onClick={close}
                className="w-full px-6 py-4 bg-black text-white font-display tracking-[0.16em] uppercase text-sm hover:bg-accent-2 transition-colors"
              >
                Ver {resultCount} productos
              </button>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
