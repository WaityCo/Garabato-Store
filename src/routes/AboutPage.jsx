import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VALUES = [
  {
    title: 'Hecho con intención',
    body: 'Cada pieza se piensa, se patrona y se cose con tiempo. No producimos en masa: drops pequeños, controlados, sin restocks innecesarios.',
  },
  {
    title: 'Materiales pesados',
    body: 'Trabajamos con gramajes altos, algodones peinados, denim japonés. Buscamos prendas que se sientan y se vean reales.',
  },
  {
    title: 'Local primero',
    body: 'Toda la producción es colombiana. Talleres con los que llevamos años trabajando, condiciones dignas, trazabilidad real.',
  },
];

const TIMELINE = [
  { year: '2024', body: 'Primer cuaderno. Primer trazo. La marca todavía no se llamaba Garabato.' },
  { year: '2025', body: 'Drop 01 — Origen. Vendido en 48 horas. Sin redes, sin estrategia, todo voz a voz.' },
  { year: '2026', body: 'SS/26 Raz Mental. Cuatro colecciones activas, taller propio, primer punto físico.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative aspect-[16/9] lg:aspect-[16/7] overflow-hidden text-white">
        <img
          src="/products/basicas/crema/crema-2.jpg"
          alt="Garabato"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/85" />
        <div className="relative h-full flex flex-col justify-end px-5 lg:px-12 pb-10 lg:pb-16">
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-white/70"
          >
            Sobre Garabato
          </motion.p>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-display text-6xl lg:text-9xl uppercase leading-[0.9] text-balance"
          >
            Nada es<br />perfecto.
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-5 lg:px-12 py-16 lg:py-28 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-start">
        <p className="text-xs tracking-[0.3em] uppercase text-soft">Manifiesto</p>
        <div className="space-y-6 text-balance">
          <p className="font-display uppercase text-3xl lg:text-5xl leading-[0.98]">
            Garabato es la prenda<br />que queda cuando<br />dejas de intentar.
          </p>
          <p className="text-muted leading-relaxed max-w-prose">
            Empezamos en un cuaderno de bocetos lleno de manchas. Una línea
            descontrolada se convirtió en logo, una idea en colección. Hoy
            seguimos pensando la marca igual: con calma, con intención, con
            espacio para el error.
          </p>
          <p className="text-muted leading-relaxed max-w-prose">
            No queremos hacer cien camisetas iguales. Queremos hacer pocas
            piezas que valga la pena tener. Que duren. Que cuenten algo.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface px-5 lg:px-12 py-16 lg:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-soft mb-6">Cómo trabajamos</p>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="block text-xs tracking-[0.2em] uppercase text-soft mb-3 tabular-nums">
                0{i + 1}
              </span>
              <h3 className="font-display text-3xl uppercase mb-3 leading-tight">
                {v.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 lg:px-12 py-16 lg:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-soft mb-8">Historia</p>
        <ul className="divide-y divide-line border-y border-line">
          {TIMELINE.map((t) => (
            <motion.li
              key={t.year}
              initial={{ x: -12, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] gap-6 py-6"
            >
              <span className="font-display text-4xl lg:text-5xl text-accent tabular-nums leading-none">
                {t.year}
              </span>
              <p className="text-muted text-balance max-w-prose self-center">
                {t.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="px-5 lg:px-12 py-20 lg:py-28 text-center">
        <h2 className="font-display text-5xl lg:text-8xl uppercase leading-[0.92] text-balance">
          Marca tu trazo.
        </h2>
        <p className="mt-4 text-muted max-w-md mx-auto">
          La pieza correcta llega cuando dejas de buscarla.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-text transition-colors"
        >
          Ver tienda <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
