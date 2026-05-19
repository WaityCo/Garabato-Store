import { useEffect, useState } from 'react';
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

// AnnouncementBar height in px (matches its py-2.5 + marquee + border).
const ANNOUNCEMENT_HEIGHT = 44;
const BASE_TOP = 20; // matches BubbleMenu.css default top (1.25em)

function useBubbleMenuTop() {
  const [top, setTop] = useState(ANNOUNCEMENT_HEIGHT + BASE_TOP);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y >= ANNOUNCEMENT_HEIGHT) setTop(BASE_TOP);
      else setTop(ANNOUNCEMENT_HEIGHT - y + BASE_TOP);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return top;
}

export default function Header() {
  const openCart = useUIStore((s) => s.openCart);
  const cartCount = useCartCount();
  const top = useBubbleMenuTop();

  return (
    <BubbleMenu
      useFixedPosition
      menuBg="#ffffff"
      menuContentColor="#0b0b0b"
      items={ITEMS}
      logoTo="/"
      logo={<Logo size="md" variant="black" />}
      menuAriaLabel="Abrir menú"
      style={{ top: `${top}px`, transition: 'top 0.15s linear' }}
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
