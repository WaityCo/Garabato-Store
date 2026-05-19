import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { looks } from '../data/looks.js';
import { getProductById } from '../data/products.js';
import { formatPrice } from '../components/common/Price.jsx';

export default function LookbookPage() {
  return (
    <>
      <section className="px-5 lg:px-12 pt-24 lg:pt-28 pb-8 border-b border-line">
        <p className="text-xs tracking-[0.3em] uppercase text-soft mb-3">
          Editorial · SS/26
        </p>
        <h1 className="font-display uppercase text-5xl lg:text-8xl leading-[0.92]">
          Lookbook.
        </h1>
      </section>

      <section className="px-5 lg:px-12 py-12 lg:py-20 space-y-20 lg:space-y-32">
        {looks.map((look, i) => {
          const reverse = i % 2 === 1;
          const items = look.productIds.map(getProductById).filter(Boolean);

          return (
            <motion.article
              key={look.id}
              id={look.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-16 items-stretch ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={look.image}
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 text-white text-xs tracking-[0.24em] uppercase mix-blend-difference">
                  Look {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-6 lg:py-12">
                <h2 className="font-display text-5xl lg:text-7xl uppercase leading-[0.95]">
                  {look.title}.
                </h2>
                <p className="text-muted max-w-md text-balance">
                  Piezas seleccionadas para este look. Combina o lleva sueltas —
                  todas funcionan por separado.
                </p>
                <ul className="divide-y divide-line border-y border-line">
                  {items.map((p) => (
                    <li key={p.id} className="py-3 flex items-center gap-4">
                      <Link
                        to={`/product/${p.slug}`}
                        className="w-14 h-16 bg-surface overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={p.images?.[0]?.src}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${p.slug}`} className="text-sm font-medium hover:text-muted">
                          {p.name}
                        </Link>
                        <p className="text-xs text-soft tabular-nums mt-0.5">{formatPrice(p.price)}</p>
                      </div>
                      <Link
                        to={`/product/${p.slug}`}
                        aria-label="Ver producto"
                        className="p-2 border border-line hover:border-text"
                      >
                        <Plus size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </section>
    </>
  );
}
