import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore.js';
import Logo from '../common/Logo.jsx';

const PRIMARY = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Colecciones' },
  { to: '/shop?filter=new', label: 'New Arrivals' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/about', label: 'About' },
];

const SECONDARY = [
  { to: '/shop?cat=tees', label: 'Tees' },
  { to: '/shop?cat=hoodies', label: 'Hoodies' },
  { to: '/shop?cat=pants', label: 'Pants' },
  { to: '/shop?cat=accessories', label: 'Accesorios' },
];

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.04 * i, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

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
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-bg text-text overflow-y-auto"
        >
          <div className="px-5 pt-4 pb-12 min-h-full flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between h-14">
              <Logo size="md" />
              <button
                onClick={close}
                aria-label="Cerrar menú"
                className="-mr-1 p-2 rounded-sm hover:bg-white/5"
              >
                <X size={24} />
              </button>
            </div>

            {/* Primary links — huge */}
            <nav className="mt-12 flex-1" aria-label="Principal">
              <ul className="space-y-3">
                {PRIMARY.map((link, i) => (
                  <motion.li
                    key={link.label}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={itemVariants}
                  >
                    <Link
                      to={link.to}
                      onClick={close}
                      className="group flex items-center justify-between font-display text-[clamp(2.5rem,12vw,5rem)] leading-none uppercase border-b border-line py-3"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        size={28}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Secondary links */}
              <div className="mt-10 grid grid-cols-2 gap-y-3 gap-x-6">
                {SECONDARY.map((link, i) => (
                  <motion.div
                    key={link.label}
                    custom={i + PRIMARY.length}
                    initial="hidden"
                    animate="show"
                    variants={itemVariants}
                  >
                    <Link
                      to={link.to}
                      onClick={close}
                      className="text-sm tracking-[0.18em] uppercase text-muted hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-12 pt-6 border-t border-line space-y-4"
            >
              <p className="text-xs tracking-[0.18em] uppercase text-soft">
                Drops cada viernes
              </p>
              <div className="flex items-center gap-4 text-muted">
                <a href="#" aria-label="Instagram" className="hover:text-text transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
