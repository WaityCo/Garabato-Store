import HeroSection from '../components/home/HeroSection.jsx';
import PromoCountdown from '../components/home/PromoCountdown.jsx';
import NewArrivals from '../components/home/NewArrivals.jsx';
import CategoryTiles from '../components/home/CategoryTiles.jsx';
import EditorialStrip from '../components/home/EditorialStrip.jsx';
import LookbookTeaser from '../components/home/LookbookTeaser.jsx';
import ValueProps from '../components/home/ValueProps.jsx';
import { getFeatured, products } from '../data/products.js';

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <HeroSection />
      <ValueProps />
      <NewArrivals products={featured.length ? featured : products} />
      <PromoCountdown />
      <CategoryTiles />
      <EditorialStrip />
      <LookbookTeaser />
    </>
  );
}
