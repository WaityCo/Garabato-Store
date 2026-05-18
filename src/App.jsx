import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './routes/HomePage.jsx';
import ShopPage from './routes/ShopPage.jsx';
import ProductPage from './routes/ProductPage.jsx';
import CollectionsPage from './routes/CollectionsPage.jsx';
import CollectionDetailPage from './routes/CollectionDetailPage.jsx';
import LookbookPage from './routes/LookbookPage.jsx';
import AboutPage from './routes/AboutPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:handle" element={<CollectionDetailPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
