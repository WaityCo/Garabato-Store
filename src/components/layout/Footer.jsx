import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import Marquee from '../common/Marquee.jsx';

const COLUMNS = [
  {
    title: 'Tienda',
    links: [
      { to: '/shop', label: 'Todo' },
      { to: '/shop?cat=tees', label: 'Tees' },
      { to: '/shop?cat=hoodies', label: 'Hoodies' },
      { to: '/shop?cat=pants', label: 'Pants' },
      { to: '/shop?cat=accessories', label: 'Accesorios' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { to: '/help/shipping', label: 'Envíos' },
      { to: '/help/returns', label: 'Cambios y devoluciones' },
      { to: '/help/sizes', label: 'Guía de tallas' },
      { to: '/help/care', label: 'Cuidado de prendas' },
      { to: '/help/contact', label: 'Contacto' },
    ],
  },
  {
    title: 'Marca',
    links: [
      { to: '/about', label: 'Sobre Garabato' },
      { to: '/lookbook', label: 'Lookbook' },
      { to: '/collections', label: 'Colecciones' },
      { to: '/press', label: 'Prensa' },
      { to: '/careers', label: 'Trabaja con nosotros' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/legal/terms', label: 'Términos' },
      { to: '/legal/privacy', label: 'Privacidad' },
      { to: '/legal/cookies', label: 'Cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-line mt-24">
      {/* Newsletter strip */}
      <section className="border-b border-line">
        <div className="px-5 lg:px-12 py-14 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div>
            <h3 className="font-display text-4xl lg:text-6xl uppercase leading-[0.95] text-balance">
              Únete al<br />Movimiento.
            </h3>
            <p className="mt-4 text-muted max-w-md text-sm">
              Suscríbete para enterarte de drops, restocks y campañas antes que nadie.
              Cero spam. Solo lo que importa.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              alert(`Gracias, ${f.get('email')}`);
              e.currentTarget.reset();
            }}
            className="flex items-end gap-3"
          >
            <label className="flex-1">
              <span className="block text-xs tracking-[0.18em] uppercase text-soft mb-2">
                E-mail
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@correo.com"
                className="w-full bg-transparent border-0 border-b border-line focus:border-accent outline-none py-2 text-sm placeholder:text-soft transition-colors"
              />
            </label>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-display tracking-[0.16em] uppercase text-sm hover:bg-accent-2 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      {/* Link columns */}
      <section className="px-5 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs tracking-[0.2em] uppercase text-soft mb-4 font-medium font-sans">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Bottom row */}
      <section className="px-5 lg:px-12 pb-8 flex flex-wrap items-center justify-between gap-4 text-xs text-soft">
        <p>© {new Date().getFullYear()} Garabato. Hecho con cuidado.</p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-text transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-text transition-colors">
            <Youtube size={18} />
          </a>
        </div>
      </section>

      {/* Wordmark watermark */}
      <div aria-hidden className="overflow-hidden select-none px-5 lg:px-12 py-8 flex justify-center">
        <img
          src="/logo-wordmark-black.svg"
          alt=""
          draggable="false"
          className="w-full max-w-[520px] h-auto opacity-[0.18]"
        />
      </div>

      {/* Marquee */}
      <div className="border-t border-line py-3 bg-black">
        <Marquee
          items={['STREETWEAR', 'GARABATO', 'SS/26', 'DROP 04', 'MADE WITH CARE']}
          speed={50}
        />
      </div>
    </footer>
  );
}
