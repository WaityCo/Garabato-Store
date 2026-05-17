import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import Badge from '../common/Badge.jsx';
import Price from '../common/Price.jsx';
import { COLORS } from '../../data/products.js';

export default function ProductCard({ product, eager = false, className }) {
  const [hovered, setHovered] = useState(false);
  const [favorite, setFavorite] = useState(false);

  if (!product) return null;

  const primary = product.images?.[0]?.src;
  const secondary = product.images?.[1]?.src || primary;

  return (
    <article
      className={clsx('group relative flex flex-col', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-surface"
        aria-label={product.name}
      >
        {/* Image stack */}
        <img
          src={primary}
          alt={product.images?.[0]?.alt || product.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
        />
        {secondary && (
          <img
            src={secondary}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? 'scale(1.02)' : 'scale(1.06)' }}
          />
        )}

        {/* Top-left badges */}
        {!!product.badges?.length && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badges.map((b) => (
              <Badge key={b} tone={b === 'drop' ? 'accent' : b === 'edición limitada' ? 'alert' : 'dark'}>
                {b}
              </Badge>
            ))}
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFavorite((f) => !f);
          }}
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-bg/40 backdrop-blur-sm hover:bg-bg/70 text-text transition-colors"
        >
          <Heart
            size={16}
            className={clsx(favorite && 'fill-accent-2 text-accent-2 stroke-accent-2')}
          />
        </button>

        {/* Quick CTA on hover (desktop) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="quick"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="hidden md:flex absolute bottom-3 left-3 right-3 z-10"
            >
              <span className="flex-1 bg-text text-black text-xs tracking-[0.18em] uppercase font-display text-center py-3 inline-flex items-center justify-center gap-1.5">
                Ver producto <Plus size={14} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Meta */}
      <div className="mt-3 lg:mt-4 flex flex-col gap-1">
        <Link
          to={`/product/${product.slug}`}
          className="text-[13px] lg:text-sm font-medium text-text hover:text-muted transition-colors leading-tight"
        >
          {product.name}
        </Link>
        <Price amount={product.price} compareAt={product.compareAtPrice} size="sm" />
        {!!product.colors?.length && (
          <div className="mt-1.5 flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c}
                title={COLORS[c]?.name}
                className="block w-3 h-3 rounded-full border border-line"
                style={{ background: COLORS[c]?.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-soft">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
