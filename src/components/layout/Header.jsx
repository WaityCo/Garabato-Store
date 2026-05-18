import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore.js';
import { useCartCount } from '../../store/cartStore.js';
import { useHeaderScroll } from '../../hooks/useHeaderScroll.js';
import Logo from '../common/Logo.jsx';

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Colecciones' },
  { to: '/shop?filter=new', label: 'New Arrivals' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/about', label: 'About' },
];

export default function Header({ overlay = false }) {
  const scrolled = useHeaderScroll(40);
  const openCart = useUIStore((s) => s.openCart);
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);
  const openSearch = useUIStore((s) => s.openSearch);
  const cartCount = useCartCount();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const solid = !overlay || !isHome || scrolled;

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 transition-all duration-300',
        solid
          ? 'bg-bg/85 backdrop-blur-md border-b border-line/70 text-text'
          : 'bg-transparent text-white'
      )}
    >
      <div className="px-4 lg:px-8 h-14 lg:h-16 grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-4">
        {/* Left — mobile menu / desktop logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={openMobileMenu}
            aria-label="Abrir menú"
            className="-ml-1 p-1.5 rounded-sm hover:bg-white/5"
          >
            <Menu size={22} />
          </button>
        </div>
        <Link to="/" className="hidden lg:flex items-center" aria-label="Garabato — Inicio">
          <Logo size="md" />
        </Link>

        {/* Center — links (desktop) / logo (mobile) */}
        <nav className="hidden lg:flex items-center justify-center gap-8" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                clsx(
                  'group relative text-[13px] tracking-[0.16em] uppercase font-medium transition-colors',
                  isActive ? 'text-current' : 'text-current/80 hover:text-current'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    aria-hidden
                    className={clsx(
                      'absolute -bottom-1 left-0 right-0 h-px origin-left transition-transform duration-300 bg-current',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="flex lg:hidden items-center justify-center" aria-label="Garabato — Inicio">
          <Logo size="sm" />
        </Link>

        {/* Right — actions */}
        <div className="flex items-center justify-end gap-1 lg:gap-2">
          <button
            onClick={openSearch}
            aria-label="Buscar"
            className="hidden lg:inline-flex p-2 rounded-sm hover:bg-white/5 transition-colors"
          >
            <Search size={20} />
          </button>
          <Link
            to="/account"
            aria-label="Cuenta"
            className="hidden lg:inline-flex p-2 rounded-sm hover:bg-white/5 transition-colors"
          >
            <User size={20} />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Favoritos"
            className="hidden lg:inline-flex p-2 rounded-sm hover:bg-white/5 transition-colors"
          >
            <Heart size={20} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Carrito"
            className="relative p-2 rounded-sm hover:bg-white/5 transition-colors"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
