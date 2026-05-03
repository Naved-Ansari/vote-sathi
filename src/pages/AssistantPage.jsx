import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, RotateCcw, MapPin, FileText, Calendar, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { indianStates, requiredDocuments, votingDayChecklist } from '../data/electionData';
import { validateAge } from '../utils/validators';
import './AssistantPage.css';

const STEPS = ['firstTime', 'age', 'state', 'registered', 'voterId'];

export default function AssistantPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({});
  const [ageInput, setAgeInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const chatContainerRef = useRef(null);

  const addBot = useCallback((text, opts = null, type = 'bot') => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text, options: opts, type, ts: new Date() }]);
      setIsTyping(false);
    }, 600);
  }, []);

  const addUser = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text, ts: new Date() }]);
  };

  useEffect(() => { 
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const hasStarted = useRef(false);

  // Start conversation
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    addBot(t('chat.welcome'));
    setTimeout(() => addBot(t('chat.askFirstTime'), [
      { label: t('chat.yes'), value: 'yes' },
      { label: t('chat.no'), value: 'no' }
    ]), 1200);
  }, [addBot, t]);

  const handleOption = (step, value, label) => {
    addUser(label);
    const newProfile = { ...profile };

    if (step === 'firstTime') {
      newProfile.isFirstTime = value === 'yes';
      setProfile(newProfile);
      setTimeout(() => {
        addBot(value === 'yes' ? t('chat.welcomeFirstTime') : t('chat.welcomeBack'));
        setTimeout(() => addBot(t('chat.askAge'), null, 'age-input'), 800);
      }, 400);
      setCurrentStep(1);
    } else if (step === 'registered') {
      newProfile.isRegistered = value;
      setProfile(newProfile);
      setCurrentStep(4);
      if (value === 'yes') {
        setTimeout(() => addBot(t('chat.askVoterId'), [
          { label: t('chat.yes'), value: 'yes' },
          { label: t('chat.no'), value: 'no' }
        ]), 400);
      } else {
        setTimeout(() => showResult({ ...newProfile, isRegistered: value }), 400);
      }
    } else if (step === 'voterId') {
      newProfile.hasVoterId = value === 'yes';
      setProfile(newProfile);
      setTimeout(() => showResult(newProfile), 400);
    }
  };

  const handleAgeSubmit = () => {
    const { valid, value, error } = validateAge(ageInput);
    if (!valid) { addBot(error); return; }
    addUser(`${value}`);
    const newProfile = { ...profile, age: value };
    setProfile(newProfile);
    setAgeInput('');
    setCurrentStep(2);

    if (value < 18) {
      setTimeout(() => {
        const yearsLeft = 18 - value;
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + yearsLeft);
        addBot(t('chat.notEligibleMsg'), null, 'not-eligible');
        setTimeout(() => setIsComplete(true), 500);
      }, 400);
      return;
    }

    setTimeout(() => {
      addBot(value === 18 ? t('chat.newlyEligible') : t('chat.eligibleMsg'));
      setTimeout(() => addBot(t('chat.askState'), null, 'state-select'), 800);
    }, 400);
  };

  const handleStateSelect = (state) => {
    addUser(state);
    setProfile(prev => ({ ...prev, state }));
    setCurrentStep(3);
    setTimeout(() => addBot(t('chat.askRegistered'), [
      { label: t('chat.yes'), value: 'yes' },
      { label: t('chat.no'), value: 'no' },
      { label: t('chat.dontKnow'), value: 'dontknow' }
    ]), 400);
  };

  const showResult = (p) => {
    addBot(t('chat.resultTitle'), null, 'result');
    setIsComplete(true);
    setProfile(p);
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentStep(0);
    setProfile({});
    setIsComplete(false);
    setAgeInput('');
    setTimeout(() => {
      addBot(t('chat.welcome'));
      setTimeout(() => addBot(t('chat.askFirstTime'), [
        { label: t('chat.yes'), value: 'yes' },
        { label: t('chat.no'), value: 'no' }
      ]), 1200);
    }, 200);
  };

  const progressPct = Math.min((currentStep / STEPS.length) * 100, 100);

  return (
    <div className="page assistant-page">
      <div className="container">
        <div className="assistant-layout">
          {/* Sidebar */}
          <aside className="assistant-sidebar">
            <h3>Your Progress</h3>
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progressPct}%` }} /></div>
            <p className="progress-text">{t('chat.step')} {Math.min(currentStep + 1, STEPS.length)} {t('chat.of')} {STEPS.length}</p>
            <div className="sidebar-steps">
              {['First-time?', 'Age', 'State', 'Registered?', 'Voter ID'].map((s, i) => (
                <div key={i} className={`sidebar-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
                  <div className="step-dot">{i < currentStep ? <CheckCircle size={14} /> : i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            {isComplete && (
              <button className="btn btn-secondary" onClick={handleRestart} style={{ marginTop: 'auto' }}>
                <RotateCcw size={16} /> {t('chat.restart')}
              </button>
            )}
          </aside>

          {/* Chat Area */}
          <main className="chat-area" role="log" aria-label="Chat conversation" aria-live="polite">
            <div className="chat-messages" ref={chatContainerRef}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div key={msg.id} className={`chat-msg chat-msg-${msg.sender}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="msg-avatar">
                      {msg.sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className="msg-content">
                      {msg.type === 'not-eligible' ? (
                        <div className="msg-card msg-card-warning">
                          <AlertCircle size={20} />
                          <div><strong>{t('chat.notEligibleTitle')}</strong><p>{msg.text}</p></div>
                        </div>
                      ) : msg.type === 'result' ? (
                        <ResultCard profile={profile} t={t} />
                      ) : (
                        <div className="msg-bubble"><p>{msg.text}</p></div>
                      )}
                      {msg.options && !isComplete && (
                        <div className="msg-options">
                          {msg.options.map((opt, i) => (
                            <button key={i} className="btn btn-secondary btn-sm"
                              onClick={() => handleOption(STEPS[currentStep], opt.value, opt.label)}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                      {msg.type === 'age-input' && !isComplete && currentStep === 1 && (
                        <div className="msg-input-row">
                          <input type="number" className="input" value={ageInput}
                            onChange={e => setAgeInput(e.target.value)} placeholder={t('chat.typeAge')}
                            min="1" max="150" onKeyDown={e => e.key === 'Enter' && handleAgeSubmit()}
                            aria-label="Enter your age" />
                          <button className="btn btn-primary btn-sm" onClick={handleAgeSubmit}><Send size={16} /></button>
                        </div>
                      )}
                      {msg.type === 'state-select' && !isComplete && currentStep === 2 && (
                        <div className="msg-state-grid">
                          {indianStates.map(s => (
                            <button key={s} className="btn btn-secondary btn-sm" onClick={() => handleStateSelect(s)}>{s}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="chat-msg chat-msg-bot">
                  <div className="msg-avatar"><Bot size={18} /></div>
                  <div className="msg-content"><div className="typing-indicator"><span /><span /><span /></div></div>
                </div>
              )}
              {/* chat end padding removed */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ profile, t }) {
  const isRegistered = profile.isRegistered === 'yes';
  return (
    <div className="result-card">
      <h3 className="text-gradient">{t('chat.resultTitle')}</h3>
      <div className="result-summary">
        <div className="result-item"><span>Age:</span><strong>{profile.age}</strong></div>
        <div className="result-item"><span>State:</span><strong>{profile.state}</strong></div>
        <div className="result-item"><span>Status:</span>
          <span className={`badge ${isRegistered ? 'badge-success' : 'badge-warning'}`}>
            {isRegistered ? 'Registered' : 'Not Registered'}
          </span>
        </div>
      </div>
      {!isRegistered ? (
        <div className="result-section">
          <h4><FileText size={16} /> {t('chat.nextSteps')}</h4>
          <div className="result-actions">
            <Link to="/register" className="btn btn-primary"><FileText size={16} /> Registration Guide <ArrowRight size={14} /></Link>
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              ECI Portal <ArrowRight size={14} />
            </a>
          </div>
        </div>
      ) : (
        <div className="result-section">
          <h4><CheckCircle size={16} /> {t('chat.votingDayTips')}</h4>
          <ul className="result-checklist">
            {votingDayChecklist.slice(0, 5).map(item => (
              <li key={item.id}><CheckCircle size={14} className="check-icon" /> {item.text}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="result-links">
        <Link to="/booth" className="btn btn-accent btn-sm"><MapPin size={14} /> Find Booth</Link>
        <Link to="/timeline" className="btn btn-secondary btn-sm"><Calendar size={14} /> Timeline</Link>
      </div>
    </div>
  );
}
