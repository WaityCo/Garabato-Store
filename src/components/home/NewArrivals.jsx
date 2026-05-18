import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle.jsx';
import ProductGrid from '../shop/ProductGrid.jsx';

export default function NewArrivals({ products }) {
  return (
    <section className="px-5 lg:px-12 py-20 lg:py-28">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle
          eyebrow="Lo más nuevo"
          title="New Arrivals."
          cta="Ver todo"
          ctaTo="/shop"
        />
      </motion.div>
      <ProductGrid products={products?.slice(0, 8) || []} columns={4} />
    </section>
  );
}
