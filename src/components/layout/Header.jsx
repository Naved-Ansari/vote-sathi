import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Menu, X, Sun, Moon, Globe, Contrast } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/assistant', label: t('nav.assistant') },
    { to: '/eligibility', label: t('nav.eligibility') },
    { to: '/register', label: t('nav.register') },
    { to: '/booth', label: t('nav.booth') },
    { to: '/timeline', label: t('nav.timeline') },
    { to: '/faq', label: t('nav.faq') },
  ];

  return (
    <header className="header" role="banner">
      <div className="header-inner container">
        <Link to="/" className="header-logo" aria-label="Vote Sathi Home">
          <div className="logo-icon"><Vote size={24} /></div>
          <span className="logo-text">{t('app.name')}</span>
        </Link>

        <nav className="header-nav desktop-nav" role="navigation" aria-label="Main navigation">
          {links.map(link => (
            <Link key={link.to} to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="btn-icon header-action-btn" onClick={toggleLang}
            aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`} title={lang === 'en' ? 'हिंदी' : 'English'}>
            <Globe size={18} />
            <span className="lang-label">{lang === 'en' ? 'हि' : 'EN'}</span>
          </button>
          <button className="btn-icon header-action-btn" onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="btn-icon header-action-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            role="navigation" aria-label="Mobile navigation">
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
