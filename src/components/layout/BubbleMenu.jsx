import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'home',
    to: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#e7ff3f', textColor: '#0b0b0b' },
  },
  {
    label: 'shop',
    to: '/shop',
    ariaLabel: 'Shop',
    rotation: 8,
    hoverStyles: { bgColor: '#0b0b0b', textColor: '#e7ff3f' },
  },
  {
    label: 'collections',
    to: '/collections',
    ariaLabel: 'Collections',
    rotation: 8,
    hoverStyles: { bgColor: '#d64242', textColor: '#ffffff' },
  },
  {
    label: 'lookbook',
    to: '/lookbook',
    ariaLabel: 'Lookbook',
    rotation: 8,
    hoverStyles: { bgColor: '#f3f3f3', textColor: '#0b0b0b' },
  },
  {
    label: 'about',
    to: '/about',
    ariaLabel: 'About',
    rotation: -8,
    hoverStyles: { bgColor: '#e7ff3f', textColor: '#0b0b0b' },
  },
];

export default function BubbleMenu({
  logo,
  logoTo = '/',
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  rightSlot,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const setOpen = (next) => {
    setIsMenuOpen(next);
    if (next) setShowOverlay(true);
    onMenuClick?.(next);
  };

  const handleToggle = () => setOpen(!isMenuOpen);

  // Close on route change
  useEffect(() => {
    if (isMenuOpen) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out',
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? item.rotation ?? 0 : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  const handleItemClick = (e, item) => {
    if (item.to) {
      e.preventDefault();
      setOpen(false);
      // Defer navigation so the close animation can run briefly
      setTimeout(() => navigate(item.to), 80);
    }
  };

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <Link
          to={logoTo}
          className="bubble logo-bubble"
          aria-label="Logo"
          style={{ background: menuBg, color: menuContentColor }}
        >
          <span className="logo-content">
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
          </span>
        </Link>

        <div className="right-cluster">
          {rightSlot}
          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            aria-expanded={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </div>
      </nav>
      {showOverlay && (
        <>
          <div className="bubble-menu-backdrop" aria-hidden="true" />
          <div
            ref={overlayRef}
            className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
            aria-hidden={!isMenuOpen}
          >
            <ul className="pill-list" role="menu" aria-label="Menu links">
              {menuItems.map((item, idx) => {
                const isExternal = !item.to && item.href;
                const commonProps = {
                  role: 'menuitem',
                  'aria-label': item.ariaLabel || item.label,
                  className: 'pill-link',
                  style: {
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': menuBg,
                    '--pill-color': menuContentColor,
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                    '--hover-color': item.hoverStyles?.textColor || menuContentColor,
                  },
                  ref: (el) => {
                    if (el) bubblesRef.current[idx] = el;
                  },
                  onClick: (e) => handleItemClick(e, item),
                  children: (
                    <span
                      className="pill-label"
                      ref={(el) => {
                        if (el) labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  ),
                };
                return (
                  <li key={idx} role="none" className="pill-col">
                    {isExternal ? (
                      <a href={item.href} {...commonProps} />
                    ) : (
                      <Link to={item.to || '#'} {...commonProps} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
