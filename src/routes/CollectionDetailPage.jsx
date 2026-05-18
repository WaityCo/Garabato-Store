import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getCollection } from '../data/collections.js';
import { getByCollection } from '../data/products.js';
import { useProductFilters } from '../hooks/useProductFilters.js';
import SortBar from '../components/shop/SortBar.jsx';
import ProductGrid from '../components/shop/ProductGrid.jsx';
import FiltersPanel from '../components/shop/FiltersPanel.jsx';
import FiltersDrawer from '../components/shop/FiltersDrawer.jsx';

export default function CollectionDetailPage() {
  const { handle } = useParams();
  const collection = getCollection(handle);
  const collectionProducts = getByCollection(handle);

  if (!collection) return <Navigate to="/collections" replace />;

  const { state, setters, filtered, activeCount } = useProductFilters(collectionProducts);

  return (
    <>
      {/* Editorial cover */}
      <section className="relative aspect-[16/8] lg:aspect-[16/6] overflow-hidden text-white">
        <img
          src={collection.cover}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        <div className="relative h-full flex flex-col justify-end px-5 lg:px-12 pb-8 lg:pb-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 self-start text-xs tracking-[0.18em] uppercase text-white/70 hover:text-white mb-3"
          >
            <ArrowLeft size={14} /> Todas las colecciones
          </Link>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase text-6xl lg:text-9xl leading-[0.9]"
          >
            {collection.name}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm lg:text-base text-white/80">
            {collection.subtitle}
          </p>
        </div>
      </section>

      <div className="px-5 lg:px-12 grid lg:grid-cols-[260px_1fr] gap-x-10 gap-y-4 py-10">
        <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100svh-7rem)] overflow-y-auto pr-2 hide-scrollbar">
          <FiltersPanel state={state} setters={setters} activeCount={activeCount} />
        </aside>

        <div>
          <SortBar
            sort={state.sort}
            setSort={setters.setSort}
            resultCount={filtered.length}
            activeCount={activeCount}
          />
          <div className="mt-8">
            <ProductGrid products={filtered} columns={4} />
          </div>
        </div>
      </div>

      <FiltersDrawer state={state} setters={setters} activeCount={activeCount} resultCount={filtered.length} />
    </>
  );
}
