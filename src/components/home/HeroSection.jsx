import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import TextPressure from '../common/TextPressure.jsx';

const HERO_IMG = '/products/basicas/negra/negra-1.jpg';
const HERO_IMG_2 = '/products/basicas/verde/verde-1.jpg';

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.05 * i, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-44px)] flex flex-col text-white overflow-hidden">
      {/* Background image — full bleed */}
      <div aria-hidden className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* Top eyebrow row */}
      <div className="relative flex-1 grid grid-rows-[auto_1fr_auto] px-5 lg:px-12 pt-24 lg:pt-28 pb-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between gap-4 text-xs tracking-[0.24em] uppercase"
        >
          <span>SS/26 · Drop 04</span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            En vivo
          </span>
        </motion.div>

        {/* Big claim */}
        <div className="flex flex-col justify-end gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="select-none w-full max-w-[20rem] sm:max-w-[26rem] lg:max-w-[34rem]"
            aria-label="Marca tu trazo."
          >
            <div className="w-full" style={{ height: 'clamp(3rem, 8vw, 7rem)' }}>
              <TextPressure
                text="MARCA TU"
                textColor="#ffffff"
                italic={false}
                weight
                width
                flex={false}
                minFontSize={48}
                textAlign="left"
              />
            </div>
            <div className="w-full -mt-2 lg:-mt-3" style={{ height: 'clamp(3rem, 8vw, 7rem)' }}>
              <TextPressure
                text="TRAZO."
                textColor="#e8dccb"
                italic
                weight
                width
                flex={false}
                minFontSize={48}
                textAlign="left"
              />
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="max-w-md text-base lg:text-lg text-white/80 text-balance"
          >
            Streetwear contemporáneo. Gramajes pesados, cortes con carácter,
            prints hechos a mano. Drops cada viernes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-black font-display tracking-[0.16em] uppercase text-sm hover:bg-white transition-colors"
            >
              Comprar ahora <ArrowRight size={16} />
            </Link>
            <Link
              to="/lookbook"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/40 text-white font-display tracking-[0.16em] uppercase text-sm hover:bg-white/10 transition-colors"
            >
              Lookbook
            </Link>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={8}
          className="hidden md:flex items-center justify-between gap-4 text-xs tracking-[0.24em] uppercase text-white/70"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowDown size={14} />
            Scroll
          </span>
          <span>Colombia · 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
