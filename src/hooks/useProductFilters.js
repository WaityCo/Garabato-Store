import { useMemo, useState } from 'react';

export const SORT_OPTIONS = [
  { id: 'featured',   label: 'Destacado' },
  { id: 'newest',     label: 'Más nuevos' },
  { id: 'price-asc',  label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'best',       label: 'Más vendidos' },
];

export function useProductFilters(products, initial = {}) {
  const [categories, setCategories] = useState(initial.categories || []);
  const [colors, setColors] = useState(initial.colors || []);
  const [sizes, setSizes] = useState(initial.sizes || []);
  const [priceMax, setPriceMax] = useState(initial.priceMax || null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sort, setSort] = useState(initial.sort || 'featured');

  const toggle = (setter, list) => (value) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const reset = () => {
    setCategories([]);
    setColors([]);
    setSizes([]);
    setPriceMax(null);
    setOnlyInStock(false);
    setSort('featured');
  };

  const filtered = useMemo(() => {
    let out = products;
    if (categories.length) out = out.filter((p) => categories.includes(p.category));
    if (colors.length) out = out.filter((p) => (p.colors || []).some((c) => colors.includes(c)));
    if (sizes.length) out = out.filter((p) => (p.sizes || []).some((s) => sizes.includes(s)));
    if (priceMax != null) out = out.filter((p) => p.price <= priceMax);
    if (onlyInStock) out = out.filter((p) => (p.stock ?? 0) > 0);

    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    else if (sort === 'newest') out = [...out].sort((a, b) => (a.badges?.includes('nuevo') ? -1 : 1));
    else if (sort === 'best') out = [...out].sort((a, b) => (b.stock || 0) - (a.stock || 0));
    else if (sort === 'featured') out = [...out].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return out;
  }, [products, categories, colors, sizes, priceMax, onlyInStock, sort]);

  return {
    state: { categories, colors, sizes, priceMax, onlyInStock, sort },
    setters: {
      toggleCategory: toggle(setCategories, categories),
      toggleColor:    toggle(setColors, colors),
      toggleSize:     toggle(setSizes, sizes),
      setPriceMax,
      setOnlyInStock,
      setSort,
      reset,
    },
    filtered,
    activeCount:
      categories.length +
      colors.length +
      sizes.length +
      (priceMax ? 1 : 0) +
      (onlyInStock ? 1 : 0),
  };
}
