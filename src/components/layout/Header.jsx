import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore.js';
import { useCartCount } from '../../store/cartStore.js';
import Logo from '../common/Logo.jsx';
import BubbleMenu from './BubbleMenu.jsx';

const ITEMS = [
  {
    label: 'home',
    to: '/',
    ariaLabel: 'Inicio',
    rotation: -8,
    hoverStyles: { bgColor: '#e7ff3f', textColor: '#0b0b0b' },
  },
  {
    label: 'shop',
    to: '/shop',
    ariaLabel: 'Tienda',
    rotation: 8,
    hoverStyles: { bgColor: '#0b0b0b', textColor: '#e7ff3f' },
  },
  {
    label: 'collections',
    to: '/collections',
    ariaLabel: 'Colecciones',
    rotation: 8,
    hoverStyles: { bgColor: '#d64242', textColor: '#ffffff' },
  },
  {
    label: 'new arrivals',
    to: '/shop?filter=new',
    ariaLabel: 'New Arrivals',
    rotation: 8,
    hoverStyles: { bgColor: '#e7ff3f', textColor: '#0b0b0b' },
  },
  {
    label: 'lookbook',
    to: '/lookbook',
    ariaLabel: 'Lookbook',
    rotation: 8,
    hoverStyles: { bgColor: '#f3f3f3', textColor: '#0b0b0b' },
  },
  {
    label: 'about',
    to: '/about',
    ariaLabel: 'About',
    rotation: -8,
    hoverStyles: { bgColor: '#0b0b0b', textColor: '#e7ff3f' },
  },
];

export default function Header() {
  const openCart = useUIStore((s) => s.openCart);
  const cartCount = useCartCount();

  return (
    <BubbleMenu
      useFixedPosition
      menuBg="#ffffff"
      menuContentColor="#0b0b0b"
      items={ITEMS}
      logoTo="/"
      logo={<Logo size="md" className="text-black" />}
      menuAriaLabel="Abrir menú"
      rightSlot={
        <button
          type="button"
          onClick={openCart}
          aria-label="Carrito"
          className="bubble cart-bubble"
          style={{ background: '#ffffff', color: '#0b0b0b' }}
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
                className="cart-count"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      }
    />
  );
}
