import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import MobileMenu from './MobileMenu.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header overlay={isHome} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
    </div>
  );
}
