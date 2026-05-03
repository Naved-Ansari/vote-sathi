import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { electionPhases } from '../data/electionData';
import { getDaysUntil } from '../utils/validators';
import { generateCalendarUrl } from '../services/calendarService';
import './SharedPages.css';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function TimelinePage() {
  const { t } = useLanguage();

  return (
    <div className="page shared-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">{t('timeline.title')}</h1>
          <p className="section-subtitle">{t('timeline.subtitle')}</p>
        </motion.div>

        <div className="timeline">
          {electionPhases.map((phase, i) => {
            const days = getDaysUntil(phase.date);
            const isCompleted = phase.status === 'completed';
            const isUpcoming = !isCompleted;
            const calUrl = generateCalendarUrl({
              title: `🗳️ ${phase.title}`, description: phase.description,
              startDate: phase.date, location: 'India'
            });

            return (
              <motion.div key={phase.id} className={`timeline-item ${isCompleted ? 'completed' : 'upcoming'}`}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <div className="timeline-marker">
                  {isCompleted ? <CheckCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className="timeline-connector" />
                <div className="timeline-card card">
                  <div className="timeline-card-header">
                    <div>
                      <h3>{phase.title}</h3>
                      <p className="timeline-date">
                        {new Date(phase.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`badge ${isCompleted ? 'badge-success' : 'badge-info'}`}>
                      {isCompleted ? t('timeline.completed') : `${Math.max(0, days)} ${t('timeline.daysLeft')}`}
                    </span>
                  </div>
                  <p className="timeline-desc">{phase.description}</p>
                  {isUpcoming && (
                    <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <Calendar size={14} /> {t('timeline.addToCalendar')}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
