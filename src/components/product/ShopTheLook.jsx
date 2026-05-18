import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '../common/Price.jsx';

export default function ShopTheLook({ look, products = [] }) {
  if (!look || !products.length) return null;
  return (
    <section className="bg-black text-white">
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] overflow-hidden"
        >
          <img
            src={look.image}
            alt={look.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Products */}
        <div className="px-6 lg:px-12 py-12 lg:py-16 flex flex-col">
          <span className="text-xs tracking-[0.24em] uppercase text-white/60">
            Shop the look
          </span>
          <h2 className="mt-2 font-display text-4xl lg:text-6xl uppercase leading-[0.95]">
            {look.title}
          </h2>

          <ul className="mt-8 divide-y divide-white/15">
            {products.map((p) => (
              <li key={p.id} className="py-3 flex items-center gap-4">
                <Link to={`/product/${p.slug}`} className="w-16 h-20 bg-white/5 overflow-hidden flex-shrink-0">
                  <img
                    src={p.images?.[0]?.src}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${p.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-white/60 mt-0.5 tabular-nums">
                    {formatPrice(p.price)}
                  </p>
                </div>
                <Link
                  to={`/product/${p.slug}`}
                  aria-label="Ver producto"
                  className="p-2 border border-white/30 hover:border-white"
                >
                  <Plus size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
