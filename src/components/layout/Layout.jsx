import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import CartDrawer from './CartDrawer.jsx';
import GradualBlur from '../common/GradualBlur.jsx';
import EmailPopup from '../common/EmailPopup.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <EmailPopup />

      {/* Soft fade behind the floating BubbleMenu — sits above content, below the bubbles (zIndex 99) */}
      <GradualBlur
        target="page"
        position="top"
        height="8rem"
        strength={2.5}
        divCount={6}
        curve="ease-out"
        exponential
        opacity={1}
        zIndex={-50}
      />
    </div>
  );
}
