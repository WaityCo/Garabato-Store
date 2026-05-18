import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { clsx } from 'clsx';

export default function ProductGallery({ images = [], name }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images.length) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      {/* Mobile — swipe carousel */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden bg-surface">
          <div
            className="flex transition-transform duration-500 ease-out touch-pan-y"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="flex-shrink-0 w-full aspect-[4/5]">
                <img
                  src={img.src}
                  alt={img.alt || `${name} ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-bg/70 backdrop-blur-sm text-text text-[11px] tracking-[0.18em] uppercase px-2.5 py-1.5">
            {index + 1} / {images.length}
          </div>
          {/* Nav buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-bg/70 backdrop-blur-sm text-text hover:bg-bg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-bg/70 backdrop-blur-sm text-text hover:bg-bg"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        {/* Dots */}
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Imagen ${i + 1}`}
                className={clsx(
                  'h-0.5 transition-all',
                  i === index ? 'w-6 bg-text' : 'w-3 bg-line'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop — editorial mosaic */}
      <div className="hidden lg:grid grid-cols-2 gap-2">
        {images.slice(0, 8).map((img, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setIndex(i);
              setLightbox(true);
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className={clsx(
              'group relative overflow-hidden bg-surface aspect-[4/5]',
              i === 0 && 'col-span-2 aspect-[4/4]'
            )}
          >
            <img
              src={img.src}
              alt={img.alt || `${name} ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.02]"
              loading={i < 2 ? 'eager' : 'lazy'}
            />
            <span className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand size={14} />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <img
              src={images[index].src}
              alt={images[index].alt || name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-5 right-5 text-white text-sm tracking-[0.2em] uppercase"
              aria-label="Cerrar"
            >
              Cerrar
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
