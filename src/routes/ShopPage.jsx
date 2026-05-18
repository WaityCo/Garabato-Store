import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { products } from '../data/products.js';
import { useProductFilters } from '../hooks/useProductFilters.js';
import FiltersPanel from '../components/shop/FiltersPanel.jsx';
import FiltersDrawer from '../components/shop/FiltersDrawer.jsx';
import SortBar from '../components/shop/SortBar.jsx';
import ProductGrid from '../components/shop/ProductGrid.jsx';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const filterParam = searchParams.get('filter');

  const initial = useMemo(
    () => ({
      categories: catParam ? [catParam] : [],
      sort: filterParam === 'new' ? 'newest' : 'featured',
    }),
    [catParam, filterParam]
  );

  const { state, setters, filtered, activeCount } = useProductFilters(products, initial);

  return (
    <>
      {/* Page header */}
      <section className="px-5 lg:px-12 pt-16 pb-8 lg:pt-24 lg:pb-12 border-b border-line">
        <p className="text-xs tracking-[0.3em] uppercase text-soft mb-3">
          Catálogo
        </p>
        <h1 className="font-display uppercase text-5xl lg:text-8xl leading-[0.92]">
          {catParam === 'tees'
            ? 'Tees.'
            : catParam === 'hoodies'
            ? 'Hoodies.'
            : catParam === 'pants'
            ? 'Pants.'
            : catParam === 'accessories'
            ? 'Accesorios.'
            : 'Todo.'}
        </h1>
      </section>

      <div className="px-5 lg:px-12 grid lg:grid-cols-[260px_1fr] gap-x-10 gap-y-4 py-6 lg:py-10">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100svh-7rem)] overflow-y-auto pr-2 hide-scrollbar">
          <FiltersPanel state={state} setters={setters} activeCount={activeCount} />
        </aside>

        {/* Right column — sort + grid */}
        <div>
          <SortBar
            sort={state.sort}
            setSort={setters.setSort}
            resultCount={filtered.length}
            activeCount={activeCount}
          />
          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-3xl uppercase">Nada por aquí.</p>
                <p className="text-soft mt-2 text-sm">Prueba quitando filtros.</p>
                <button
                  onClick={setters.reset}
                  className="mt-6 px-6 py-3 border border-line text-xs tracking-[0.18em] uppercase hover:border-text"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <ProductGrid products={filtered} columns={4} />
            )}
          </div>
        </div>
      </div>

      <FiltersDrawer
        state={state}
        setters={setters}
        activeCount={activeCount}
        resultCount={filtered.length}
      />
    </>
  );
}
