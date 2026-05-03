import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Building2, FileText, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { requiredDocuments } from '../data/electionData';
import './SharedPages.css';

export default function RegistrationPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('online');
  const steps = t(`registration.steps${activeTab === 'online' ? 'Online' : 'Offline'}`);
  const docCategories = [
    { key: 'identity', icon: <FileText size={18} />, title: 'Identity Proof (any one)', items: requiredDocuments.identity },
    { key: 'address', icon: <Building2 size={18} />, title: 'Address Proof (any one)', items: requiredDocuments.address },
    { key: 'photo', icon: <FileText size={18} />, title: 'Photograph', items: requiredDocuments.photo },
  ];

  return (
    <div className="page shared-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">{t('registration.title')}</h1>
          <p className="section-subtitle">{t('registration.subtitle')}</p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button className={`tab-btn ${activeTab === 'online' ? 'active' : ''}`} onClick={() => setActiveTab('online')}>
            <Monitor size={18} /> {t('registration.onlineTitle')}
          </button>
          <button className={`tab-btn ${activeTab === 'offline' ? 'active' : ''}`} onClick={() => setActiveTab('offline')}>
            <Building2 size={18} /> {t('registration.offlineTitle')}
          </button>
        </div>

        {/* Steps */}
        <motion.div className="steps-card" key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} className="step-row">
              <div className="step-number">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
          {activeTab === 'online' && (
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
              Go to ECI Portal <ExternalLink size={14} />
            </a>
          )}
        </motion.div>

        {/* Documents */}
        <motion.div className="docs-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="section-title" style={{ fontSize: 'var(--font-size-xl)' }}>{t('registration.documentsTitle')}</h2>
          <div className="docs-grid">
            {docCategories.map((cat) => (
              <div key={cat.key} className="doc-card card">
                <div className="doc-header">{cat.icon}<h4>{cat.title}</h4></div>
                <ul className="doc-list">
                  {cat.items.map((item, i) => (
                    <li key={i}><CheckCircle size={14} className="check-icon" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="important-note">⚠️ {t('registration.importantDates') || 'Qualifying dates: January 1, April 1, July 1, and October 1.'}</p>
        </motion.div>
      </div>
    </div>
  );
}
