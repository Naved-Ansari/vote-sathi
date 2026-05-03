import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { faqData } from '../data/faqData';
import './SharedPages.css';

export default function FAQPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);

  const categories = Object.entries(t('faq.categories'));

  const filtered = faqData.filter(f => {
    const q = lang === 'hi' ? (f.questionHi || f.question) : f.question;
    const a = lang === 'hi' ? (f.answerHi || f.answer) : f.answer;
    const matchesSearch = q.toLowerCase().includes(search.toLowerCase()) || a.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page shared-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">{t('faq.title')}</h1>
          <p className="section-subtitle">{t('faq.subtitle')}</p>
        </motion.div>

        <div className="faq-search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" className="input search-input" value={search}
            onChange={e => setSearch(e.target.value)} placeholder={t('faq.searchPlaceholder')} />
        </div>

        <div className="faq-categories">
          {categories.map(([key, label]) => (
            <button key={key} className={`btn btn-sm ${activeCategory === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(key)}>{label}</button>
          ))}
        </div>

        <div className="faq-list">
          {filtered.map((faq, i) => {
            const isOpen = openId === faq.id;
            const question = lang === 'hi' ? (faq.questionHi || faq.question) : faq.question;
            const answer = lang === 'hi' ? (faq.answerHi || faq.answer) : faq.answer;
            return (
              <motion.div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <button className="faq-question" onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen} aria-controls={`faq-answer-${faq.id}`}>
                  <span>{question}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div id={`faq-answer-${faq.id}`} className="faq-answer"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
