import { Link } from 'react-router-dom';
import { Vote, ExternalLink, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon"><Vote size={20} /></div>
              <span>{t('app.name')}</span>
            </div>
            <p className="footer-about">{t('footer.about')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.quickLinks')}</h4>
            <Link to="/assistant">{t('nav.assistant')}</Link>
            <Link to="/eligibility">{t('nav.eligibility')}</Link>
            <Link to="/register">{t('nav.register')}</Link>
            <Link to="/booth">{t('nav.booth')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('footer.resources')}</h4>
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer">
              {t('footer.eciPortal')} <ExternalLink size={12} />
            </a>
            <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer">
              Electoral Search <ExternalLink size={12} />
            </a>
            <span className="footer-helpline"><Phone size={14} /> {t('footer.voterHelpline')}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
          <p className="footer-copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
