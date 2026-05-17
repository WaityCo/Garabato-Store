import { clsx } from 'clsx';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products = [], columns = 4, className }) {
  const colMap = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };
  return (
    <div className={clsx('grid gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-14', colMap[columns], className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} eager={i < 4} />
      ))}
    </div>
  );
}
