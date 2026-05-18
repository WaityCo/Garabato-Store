import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Marquee from '../common/Marquee.jsx';
import { looks } from '../../data/looks.js';

export default function LookbookTeaser() {
  return (
    <section className="bg-bg">
      <div className="border-y border-line py-3">
        <Marquee
          items={['LOOKBOOK SS/26', 'EDITORIAL', 'GARABATO', 'SHOP THE LOOK']}
          speed={45}
        />
      </div>

      <div className="px-5 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {looks.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                to={`/lookbook#${look.id}`}
                className="group block relative aspect-[3/4] overflow-hidden bg-surface"
              >
                <img
                  src={look.image}
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] tracking-[0.24em] uppercase text-white/70 block">
                    Look {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl uppercase leading-none mt-1">
                    {look.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
