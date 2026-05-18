import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Heart, Share2, Check, ChevronRight, RotateCcw, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductBySlug, getProductById, getRelated } from '../data/products.js';
import { useCartStore } from '../store/cartStore.js';
import { useUIStore } from '../store/uiStore.js';
import { looks } from '../data/looks.js';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import Badge from '../components/common/Badge.jsx';
import Price from '../components/common/Price.jsx';
import ProductGallery from '../components/product/ProductGallery.jsx';
import ColorSelector from '../components/product/ColorSelector.jsx';
import SizeSelector from '../components/product/SizeSelector.jsx';
import QuantitySelector from '../components/product/QuantitySelector.jsx';
import AccordionGroup from '../components/product/AccordionGroup.jsx';
import RelatedProducts from '../components/product/RelatedProducts.jsx';
import ShopTheLook from '../components/product/ShopTheLook.jsx';
import StickyMobileBar from '../components/product/StickyMobileBar.jsx';

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) return <Navigate to="/shop" replace />;

  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const images = useMemo(() => {
    if (product.variantImages && product.variantImages[color]) {
      return product.variantImages[color];
    }
    return product.images;
  }, [product, color]);

  const related = getRelated(product, 4);
  const look = looks.find((l) => l.productIds.includes(product.id));
  const lookProducts = look
    ? look.productIds.map(getProductById).filter(Boolean)
    : [];

  const handleAdd = () => {
    if (!size && product.sizes?.length > 1) {
      // Subtle prompt: scroll to size selector
      const el = document.getElementById('size-selector');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    addItem(product, { color, size: size || product.sizes?.[0], qty });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 700);
  };

  return (
    <>
      <div className="px-5 lg:px-12 pt-6 lg:pt-10">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: product.category, to: `/shop?cat=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="px-5 lg:px-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-16 py-6 lg:py-10">
        {/* Gallery */}
        <div>
          <ProductGallery images={images} name={product.name} />
        </div>

        {/* Sticky info panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:pr-2 hide-scrollbar pb-24 lg:pb-0">
          {/* Badges */}
          {!!product.badges?.length && (
            <div className="flex gap-1.5 mb-4">
              {product.badges.map((b) => (
                <Badge key={b} tone={b === 'drop' ? 'accent' : b === 'edición limitada' ? 'alert' : 'dark'}>
                  {b}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl lg:text-5xl uppercase leading-[0.95]">
            {product.name}
          </h1>
          <p className="mt-2 text-xs tracking-[0.18em] uppercase text-soft">
            {product.collection}
          </p>

          <div className="mt-4">
            <Price amount={product.price} compareAt={product.compareAtPrice} size="lg" />
          </div>

          {/* Color */}
          {product.colors?.length > 1 && (
            <div className="mt-6">
              <ColorSelector colors={product.colors} value={color} onChange={setColor} />
            </div>
          )}

          {/* Size */}
          {product.sizes?.length > 0 && (
            <div className="mt-6" id="size-selector">
              <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
              <button className="mt-3 text-xs text-muted hover:text-text underline underline-offset-2">
                Guía de tallas
              </button>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <span className="block text-xs tracking-[0.2em] uppercase text-soft mb-2">
              Cantidad
            </span>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex flex-col gap-3 mt-6">
            <button
              onClick={handleAdd}
              className="relative w-full px-7 py-4 bg-accent text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-text transition-colors overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check size={16} /> Añadido
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    Añadir al carrito · <Price amount={product.price * qty} size="sm" className="!inline-flex" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button className="w-full px-7 py-4 bg-text text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-accent transition-colors">
              Comprar ahora
            </button>
          </div>

          {/* Secondary actions */}
          <div className="hidden lg:flex items-center gap-3 mt-4 text-xs text-soft">
            <button className="inline-flex items-center gap-1.5 hover:text-text">
              <Heart size={14} /> Favoritos
            </button>
            <span className="w-px h-3 bg-line" />
            <button className="inline-flex items-center gap-1.5 hover:text-text">
              <Share2 size={14} /> Compartir
            </button>
          </div>

          {/* Description */}
          <p className="mt-8 text-sm text-muted leading-relaxed text-pretty">
            {product.description}
          </p>

          {/* Trust strip */}
          <ul className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <li className="flex items-center gap-2 text-muted">
              <Truck size={14} className="text-accent" /> Envío gratis $250k+
            </li>
            <li className="flex items-center gap-2 text-muted">
              <RotateCcw size={14} className="text-accent" /> Cambios 30 días
            </li>
          </ul>

          {/* Accordions */}
          <div className="mt-8">
            <AccordionGroup
              items={[
                {
                  title: 'Detalles',
                  body: (
                    <ul className="list-disc pl-5 space-y-1.5">
                      {product.details?.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  ),
                },
                {
                  title: 'Guía de tallas',
                  body: (
                    <p>
                      Las medidas son referenciales. Si tu talla habitual es ambigua,
                      escríbenos a <a className="underline" href="#">hola@garabato.co</a> y te ayudamos.
                    </p>
                  ),
                },
                {
                  title: 'Envíos y devoluciones',
                  body: (
                    <p>
                      Envío gratis sobre $250.000 a toda Colombia (2–4 días hábiles).
                      Cambios sin costo durante 30 días.
                    </p>
                  ),
                },
                {
                  title: 'Cuidado',
                  body: (
                    <p>
                      Lavar al revés, en frío. No usar secadora. No planchar sobre prints.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </aside>
      </div>

      {/* Shop the look */}
      {look && lookProducts.length > 0 && (
        <ShopTheLook look={look} products={lookProducts.slice(0, 4)} />
      )}

      {/* Related */}
      <RelatedProducts products={related} />

      {/* Mobile sticky bar */}
      <StickyMobileBar price={product.price * qty} compareAt={product.compareAtPrice ? product.compareAtPrice * qty : null} onAdd={handleAdd} />
    </>
  );
}
