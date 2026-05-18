import SectionTitle from '../common/SectionTitle.jsx';
import ProductGrid from '../shop/ProductGrid.jsx';

export default function RelatedProducts({ products = [] }) {
  if (!products.length) return null;
  return (
    <section className="px-5 lg:px-12 py-16 lg:py-24">
      <SectionTitle eyebrow="Combina con" title="También te puede gustar." cta="Ver todo" ctaTo="/shop" />
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
