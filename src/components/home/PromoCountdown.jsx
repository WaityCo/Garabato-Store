import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown.js';

// Drops every Friday — calculate next Friday 20:00 local time
function getNextDropDate() {
  const now = new Date();
  const result = new Date(now);
  const day = now.getDay(); // 0=Sun ... 5=Fri
  let daysUntilFriday = (5 - day + 7) % 7;
  if (daysUntilFriday === 0 && now.getHours() >= 20) daysUntilFriday = 7;
  result.setDate(now.getDate() + daysUntilFriday);
  result.setHours(20, 0, 0, 0);
  return result;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

export default function PromoCountdown() {
  const target = getNextDropDate();
  const { days, hours, minutes, seconds } = useCountdown(target);

  const cells = [
    { v: days, l: 'días' },
    { v: hours, l: 'horas' },
    { v: minutes, l: 'min' },
    { v: seconds, l: 'seg' },
  ];

  return (
    <section className="bg-accent text-black">
      <div className="px-5 lg:px-12 py-10 lg:py-14 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase font-medium">
            Próximo drop · Viernes 8 PM
          </p>
          <h2 className="mt-3 font-display text-4xl lg:text-7xl uppercase leading-[0.95] text-balance">
            Drop 05 — Raz Mental.
          </h2>
          <p className="mt-4 max-w-xl text-sm lg:text-base text-black/75">
            Cuatro piezas nuevas. Unidades limitadas. Sin restock.
          </p>
          <Link
            to="/shop?filter=new"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 bg-black text-accent font-display tracking-[0.16em] uppercase text-sm hover:bg-bg transition-colors"
          >
            Avísame cuando salga
          </Link>
        </motion.div>

        <motion.ul
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-4 gap-1.5 lg:gap-3"
        >
          {cells.map(({ v, l }) => (
            <li
              key={l}
              className="bg-black text-accent p-3 lg:p-5 flex flex-col items-center justify-center text-center"
            >
              <span className="font-display text-4xl lg:text-7xl leading-none tabular-nums">
                {pad(v)}
              </span>
              <span className="mt-2 text-[10px] lg:text-xs tracking-[0.24em] uppercase text-white/60">
                {l}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
