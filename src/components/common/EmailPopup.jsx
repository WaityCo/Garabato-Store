import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

const STORAGE_KEY = 'garabato_popup_v1';
const SHOW_DELAY_MS = 1400;

export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // sessionStorage unavailable — show anyway
    }
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function persistDismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  function handleClose() {
    persistDismiss();
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Correo no válido');
      return;
    }
    setError('');
    setSubmitted(true);
    persistDismiss();
    setTimeout(() => setOpen(false), 2400);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Suscríbete para un 10% de descuento"
            initial={{ y: 32, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="garabato-glass relative w-full max-w-[680px]"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-20 w-9 h-9 inline-flex items-center justify-center rounded-full bg-black text-white border border-black/10 hover:bg-accent-2 hover:scale-105 transition-all"
            >
              <X size={16} />
            </button>

            <div className="relative z-[2] grid grid-cols-1 sm:grid-cols-[1.15fr_1fr] gap-0 min-h-[460px]">
              {/* Left — copy + form */}
              <div className="relative flex flex-col justify-between p-7 sm:p-8 lg:p-10">
                <div>
                  <p className="text-[11px] tracking-[0.32em] uppercase text-black/55 font-medium">
                    Garabato · Club
                  </p>

                  <h2 className="mt-4 font-display uppercase leading-[0.88] text-balance text-black text-[clamp(2.25rem,6vw,3.4rem)]">
                    ¿Quieres un <span className="text-accent-2">10%</span> de descuento?
                  </h2>

                  <p className="mt-4 max-w-sm text-sm lg:text-[15px] text-black/65 leading-relaxed">
                    Date de alta para acceso anticipado a los drops del viernes,
                    descuentos exclusivos e info privilegiada.
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="mt-7 space-y-3">
                    <label
                      htmlFor="garabato-email"
                      className="block text-[11px] tracking-[0.28em] uppercase text-black/55 font-medium"
                    >
                      ¿Dónde te enviamos tu código?
                    </label>
                    <div className="garabato-glass-input">
                      <input
                        id="garabato-email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full bg-transparent px-4 py-3.5 text-sm text-black placeholder:text-black/35 focus:outline-none"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-accent-2 tracking-wide">{error}</p>
                    )}

                    <button
                      type="submit"
                      className="group mt-2 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-accent-2 text-white font-display tracking-[0.18em] uppercase text-sm shadow-[0_8px_24px_-8px_rgba(214,66,66,0.55)] hover:bg-black hover:text-white transition-colors"
                    >
                      Conseguir descuento
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-[10px] tracking-[0.18em] uppercase text-black/40 pt-1">
                      Sin spam. Puedes salir cuando quieras.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-7 space-y-3"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-3 border border-black bg-black text-white">
                      <span className="inline-flex w-7 h-7 items-center justify-center bg-accent text-black">
                        <Check size={16} />
                      </span>
                      <span className="text-sm">¡Listo! Revisa tu correo.</span>
                    </div>
                    <p className="text-xs text-black/55">
                      Te mandamos el código −10% para tu próxima orden.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Right — graphic */}
              <div className="relative hidden sm:block overflow-hidden">
                <div className="garabato-popup-art absolute inset-0" />

                {/* Hand-drawn squiggle — single, organic */}
                <svg
                  viewBox="0 0 240 240"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full text-white/30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M-5 180 C40 130, 90 175, 130 110 S210 140, 250 70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Stamp / badge */}
                <motion.div
                  initial={{ rotate: -6, scale: 0.94, opacity: 0 }}
                  animate={{ rotate: -6, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-6 z-10"
                >
                  <div className="relative bg-accent-2 text-white border-[3px] border-black px-7 py-8 shadow-[10px_10px_0_0_rgba(0,0,0,0.9)]">
                    <p className="font-display uppercase text-[11px] tracking-[0.32em] text-white/85">
                      Cupón
                    </p>
                    <p className="font-display leading-[0.85] text-[clamp(3.5rem,9vw,6rem)] mt-1">
                      −10<span className="text-[0.5em] align-top">%</span>
                    </p>
                    <p className="font-display uppercase tracking-[0.24em] text-[11px] mt-2 text-white/80">
                      Primera orden
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
