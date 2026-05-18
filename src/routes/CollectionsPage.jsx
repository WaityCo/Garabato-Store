import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '../data/collections.js';
import { products } from '../data/products.js';

export default function CollectionsPage() {
  return (
    <>
      <section className="px-5 lg:px-12 pt-16 pb-8 lg:pt-24 border-b border-line">
        <p className="text-xs tracking-[0.3em] uppercase text-soft mb-3">
          Archivo
        </p>
        <h1 className="font-display uppercase text-5xl lg:text-8xl leading-[0.92]">
          Colecciones.
        </h1>
        <p className="mt-6 max-w-prose text-muted text-balance">
          Cada colección nace de una idea distinta: orígenes, mente, taller,
          esenciales. Explora el archivo completo y elige tu lenguaje.
        </p>
      </section>

      <section className="px-5 lg:px-12 py-12 lg:py-16 space-y-12 lg:space-y-20">
        {collections.map((col, i) => {
          const count = products.filter((p) => p.collection === col.handle).length;
          const reverse = i % 2 === 1;
          return (
            <motion.article
              key={col.handle}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-stretch ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={col.cover}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 lg:py-8">
                <span className="text-xs tracking-[0.24em] uppercase text-soft">
                  Colección 0{i + 1} · {count} piezas
                </span>
                <h2 className="font-display text-5xl lg:text-7xl uppercase leading-[0.95] text-balance">
                  {col.name}
                </h2>
                <p className="text-text/85 text-balance">{col.subtitle}</p>
                <p className="text-muted text-sm max-w-md leading-relaxed">
                  {col.description}
                </p>
                <Link
                  to={`/collections/${col.handle}`}
                  className="self-start group inline-flex items-center gap-2 px-7 py-3.5 border border-line text-text font-display tracking-[0.16em] uppercase text-sm hover:bg-black/5 hover:border-text transition-colors"
                >
                  Explorar
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </section>
    </>
  );
}
