import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero — placeholder while we build sections */}
      <section className="relative min-h-[88svh] flex items-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a1a1a_0%,#0b0b0b_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative px-5 lg:px-12 pb-16 lg:pb-24 w-full">
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-xs lg:text-sm tracking-[0.3em] uppercase text-muted"
          >
            SS/26 · Drop 04
          </motion.p>
          <motion.h1
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
            className="mt-4 font-display uppercase leading-[0.88] tracking-[-0.005em] text-[clamp(3.5rem,14vw,12rem)] text-text"
          >
            Marca tu<br />trazo.
          </motion.h1>
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-text transition-colors"
            >
              Ver colección <ArrowRight size={16} />
            </Link>
            <Link
              to="/lookbook"
              className="inline-flex items-center gap-2 px-7 py-4 border border-line text-text font-display tracking-[0.16em] uppercase text-sm hover:bg-white/5 transition-colors"
            >
              Lookbook
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-5 lg:px-12 py-20">
        <h2 className="font-display text-3xl lg:text-5xl uppercase mb-4">Próximamente</h2>
        <p className="text-muted max-w-prose">
          Más secciones aterrizando pronto: drops, categorías, lookbook, product detail.
          Cada commit que hagamos sube automáticamente a Vercel.
        </p>
      </section>
    </>
  );
}
