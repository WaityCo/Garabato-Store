import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialStrip() {
  return (
    <section className="bg-black text-white">
      <div className="grid lg:grid-cols-2">
        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] overflow-hidden"
        >
          <img
            src="/products/basicas/verde/verde-4.jpg"
            alt="Editorial Garabato"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center gap-6"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/60">
            Editorial · SS/26
          </span>
          <h2 className="font-display text-5xl lg:text-7xl uppercase leading-[0.92] text-balance">
            Hecho a mano.<br />Marcado por accidente.
          </h2>
          <p className="text-white/70 max-w-md text-balance">
            Cada drop nace de un cuaderno, una mancha, un trazo no planeado.
            Garabato es la ropa que queda cuando dejas de intentar hacer algo perfecto.
          </p>
          <Link
            to="/about"
            className="self-start group inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-white font-display tracking-[0.16em] uppercase text-sm hover:bg-white hover:text-black transition-colors"
          >
            Sobre Garabato
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
