import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Calendar, Globe, Shield, Wifi, UserCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LandingPage.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function LandingPage() {
  const { t } = useLanguage();

  const quickActions = [
    { to: '/eligibility', icon: <CheckCircle size={28} />, title: t('actions.checkEligibility'), desc: t('actions.checkEligibilityDesc'), color: 'green' },
    { to: '/register', icon: <UserCheck size={28} />, title: t('actions.registerVote'), desc: t('actions.registerVoteDesc'), color: 'orange' },
    { to: '/booth', icon: <MapPin size={28} />, title: t('actions.findBooth'), desc: t('actions.findBoothDesc'), color: 'blue' },
    { to: '/timeline', icon: <Calendar size={28} />, title: t('actions.viewTimeline'), desc: t('actions.viewTimelineDesc'), color: 'purple' },
  ];

  const features = [
    { icon: <UserCheck size={24} />, title: t('features.personalGuidance'), desc: t('features.personalGuidanceDesc') },
    { icon: <MapPin size={24} />, title: t('features.boothLocator'), desc: t('features.boothLocatorDesc') },
    { icon: <Calendar size={24} />, title: t('features.smartReminders'), desc: t('features.smartRemindersDesc') },
    { icon: <Globe size={24} />, title: t('features.multiLanguage'), desc: t('features.multiLanguageDesc') },
    { icon: <Shield size={24} />, title: t('features.securePrivate'), desc: t('features.securePrivateDesc') },
    { icon: <Wifi size={24} />, title: t('features.offlineAccess'), desc: t('features.offlineAccessDesc') },
  ];

  const stats = [
    { value: '97 Cr+', label: t('stats.registeredVoters') },
    { value: '10.5 L+', label: t('stats.pollingStations') },
    { value: '543', label: t('stats.constituencies') },
    { value: '65.79%', label: t('stats.turnout2024') },
  ];

  return (
    <div className="page landing-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container hero-content">
          <motion.div className="hero-text" initial="hidden" animate="visible" variants={stagger}>
            <motion.div className="hero-badge" variants={fadeUp}>
              <span className="badge badge-info">🇮🇳 {t('app.tagline')}</span>
            </motion.div>
            <motion.h1 className="hero-title" variants={fadeUp}>{t('hero.title')}</motion.h1>
            <motion.p className="hero-subtitle" variants={fadeUp}>{t('hero.subtitle')}</motion.p>
            <motion.div className="hero-buttons" variants={fadeUp}>
              <Link to="/assistant" className="btn btn-primary btn-lg">
                {t('hero.cta')} <ArrowRight size={18} />
              </Link>
              <Link to="/eligibility" className="btn btn-secondary btn-lg">{t('hero.ctaSecondary')}</Link>
            </motion.div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="hero-card-stack">
              <div className="hero-float-card hfc-1">
                <CheckCircle size={20} className="hfc-icon green" /> <span>Eligibility Verified ✓</span>
              </div>
              <div className="hero-float-card hfc-2">
                <MapPin size={20} className="hfc-icon blue" /> <span>Booth #145 — 0.8 km</span>
              </div>
              <div className="hero-float-card hfc-3">
                <Calendar size={20} className="hfc-icon orange" /> <span>Polling: May 10, 2025</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {stats.map((s, i) => (
              <motion.div key={i} className="stat-card" variants={fadeUp}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section">
        <div className="container">
          <motion.div className="text-center" style={{ marginBottom: 'var(--space-10)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title" style={{ display: 'inline-block' }}>{t('features.title')}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>{t('features.subtitle')}</p>
          </motion.div>
          <motion.div className="actions-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {quickActions.map((a, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link to={a.to} className={`action-card action-card-${a.color}`}>
                  <div className="action-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className="action-arrow"><ArrowRight size={16} /></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section features-section">
        <div className="container">
          <motion.div className="features-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {features.map((f, i) => (
              <motion.div key={i} className="feature-card" variants={fadeUp}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="cta-title">Ready to Make Your Vote Count?</motion.h2>
            <motion.p variants={fadeUp} className="cta-subtitle">Start with our smart assistant for personalized guidance</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/assistant" className="btn btn-primary btn-lg">
                {t('hero.cta')} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
