import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './routes/HomePage.jsx';
import ShopPage from './routes/ShopPage.jsx';
import ProductPage from './routes/ProductPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
