import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TILES = [
  {
    label: 'Crema',
    to: '/product/basica-garabato?color=cream',
    image: '/products/basicas/crema/crema-3.jpg',
    eyebrow: 'Color 01',
  },
  {
    label: 'Blanco',
    to: '/product/basica-garabato?color=white',
    image: '/products/basicas/blanca/blanca-3.jpg',
    eyebrow: 'Color 02',
  },
  {
    label: 'Verde',
    to: '/product/basica-garabato?color=green',
    image: '/products/basicas/verde/verde-3.jpg',
    eyebrow: 'Color 03',
  },
  {
    label: 'Negro',
    to: '/product/basica-garabato?color=black',
    image: '/products/basicas/negra/negra-3.jpg',
    eyebrow: 'Color 04',
  },
];

export default function CategoryTiles() {
  return (
    <section className="px-5 lg:px-12 pt-4 pb-20 lg:pb-28">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {TILES.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <Link
              to={t.to}
              className="group relative aspect-[3/4] block overflow-hidden bg-surface"
            >
              <img
                src={t.image}
                alt={t.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-between text-white">
                <span className="text-[11px] tracking-[0.24em] uppercase text-white/70">
                  {t.eyebrow}
                </span>
                <div className="flex items-end justify-between gap-2">
                  <h3 className="font-display text-3xl lg:text-5xl uppercase leading-none">
                    {t.label}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
