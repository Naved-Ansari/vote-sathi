import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { checkEligibility, validateAge } from '../utils/validators';
import './SharedPages.css';

export default function EligibilityPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ age: '', isCitizen: null, isResident: null, isDisqualified: null });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    const ageResult = validateAge(form.age);
    if (!ageResult.valid) { setError(ageResult.error); return; }
    if (form.isCitizen === null || form.isResident === null || form.isDisqualified === null) {
      setError('Please answer all questions'); return;
    }
    setError('');
    setResult(checkEligibility({ age: ageResult.value, isCitizen: form.isCitizen, isResident: form.isResident, isDisqualified: form.isDisqualified }));
  };

  const BoolBtn = ({ value, current, onChange, yesLabel, noLabel }) => (
    <div className="bool-btns">
      <button className={`btn btn-sm ${current === true ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onChange(true)}>{yesLabel || t('chat.yes')}</button>
      <button className={`btn btn-sm ${current === false ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onChange(false)}>{noLabel || t('chat.no')}</button>
    </div>
  );

  return (
    <div className="page shared-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">{t('eligibility.title')}</h1>
          <p className="section-subtitle">{t('eligibility.subtitle')}</p>
        </motion.div>
        <motion.div className="form-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="input-group">
            <label className="input-label">{t('eligibility.ageLabel')}</label>
            <input type="number" className="input" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
              placeholder={t('eligibility.agePlaceholder')} min="1" max="150" />
          </div>
          <div className="input-group">
            <label className="input-label">{t('eligibility.citizenLabel')}</label>
            <BoolBtn current={form.isCitizen} onChange={v => setForm({ ...form, isCitizen: v })} />
          </div>
          <div className="input-group">
            <label className="input-label">{t('eligibility.residenceLabel')}</label>
            <BoolBtn current={form.isResident} onChange={v => setForm({ ...form, isResident: v })} />
          </div>
          <div className="input-group">
            <label className="input-label">{t('eligibility.disqualifiedLabel')}</label>
            <BoolBtn current={form.isDisqualified} onChange={v => setForm({ ...form, isDisqualified: v })} />
          </div>
          {error && <p className="form-error"><AlertTriangle size={14} /> {error}</p>}
          <button className="btn btn-primary btn-lg" onClick={handleCheck} style={{ width: '100%' }}>
            {t('eligibility.checkBtn')}
          </button>
          {result && (
            <motion.div className={`result-banner ${result.eligible ? 'result-success' : 'result-fail'}`}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              {result.eligible ? <CheckCircle size={24} /> : <XCircle size={24} />}
              <div>
                <strong>{result.eligible ? t('eligibility.eligible') : t('eligibility.notEligible')}</strong>
                {result.reason === 'age' && <p>You'll be eligible around: {result.futureDate}</p>}
                {result.reason === 'citizenship' && <p>Only Indian citizens can vote in Indian elections.</p>}
                {result.reason === 'residence' && <p>You must be a resident of the constituency to vote there.</p>}
                {result.reason === 'disqualified' && <p>Court-disqualified individuals cannot vote.</p>}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
