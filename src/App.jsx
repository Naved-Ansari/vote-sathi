import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy loading pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));
const EligibilityPage = lazy(() => import('./pages/EligibilityPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const PollingBoothPage = lazy(() => import('./pages/PollingBoothPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

// Fallback loader
const PageLoader = () => (
  <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div className="typing-indicator"><span /><span /><span /></div>
  </div>
);
const PrototypeBanner = () => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
    background: '#c62828', color: '#fff', textAlign: 'center',
    padding: '6px 12px', fontSize: '12px', fontWeight: 'bold',
    letterSpacing: '0.5px'
  }}>
    ⚠️ PROTOTYPE DEMONSTRATION: This is not an official government application. For official information, please visit voters.eci.gov.in.
  </div>
);

export default function App() {
  return (
    <>
      <PrototypeBanner />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div style={{ paddingTop: '28px' }}>
        <Header />
      </div>
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/booth" element={<PollingBoothPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
