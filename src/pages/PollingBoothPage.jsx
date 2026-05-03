import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Search, LocateFixed, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockPollingStations } from '../data/electionData';
import './SharedPages.css';

export default function PollingBoothPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const filtered = mockPollingStations.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert('Unable to get your location. Please enable location services.')
      );
    }
  };

  const getDirectionsUrl = (station) =>
    `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;

  return (
    <div className="page shared-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">{t('booth.title')}</h1>
          <p className="section-subtitle">{t('booth.subtitle')}</p>
        </motion.div>

        <div className="booth-layout">
          {/* Search + List */}
          <div className="booth-sidebar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" className="input search-input" value={search}
                onChange={e => setSearch(e.target.value)} placeholder={t('booth.searchPlaceholder')} />
            </div>
            <button className="btn btn-secondary" onClick={handleLocate} style={{ width: '100%' }}>
              <LocateFixed size={16} /> {t('booth.useMyLocation')}
            </button>
            <div className="booth-list">
              {filtered.map(station => (
                <motion.div key={station.id}
                  className={`booth-item ${selectedStation?.id === station.id ? 'active' : ''}`}
                  onClick={() => setSelectedStation(station)}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.01 }}>
                  <div className="booth-item-header">
                    <MapPin size={16} className="booth-pin" />
                    <div>
                      <h4>{station.name}</h4>
                      <span className="badge badge-info">Booth #{station.boothNo}</span>
                    </div>
                  </div>
                  <p className="booth-address">{station.address}</p>
                  <div className="booth-meta">
                    <span><Navigation size={12} /> {station.distance}</span>
                    <span><Clock size={12} /> {station.timings}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map / Detail */}
          <div className="booth-map-area">
            {selectedStation ? (
              <motion.div className="booth-detail card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="booth-detail-map">
                  <iframe title="Polling Station Map"
                    src={`https://maps.google.com/maps?q=${selectedStation.lat},${selectedStation.lng}&z=15&output=embed`}
                    width="100%" height="300" style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <div className="booth-detail-info">
                  <h3>{selectedStation.name}</h3>
                  <div className="badge badge-info" style={{ marginBottom: 'var(--space-3)' }}>Booth #{selectedStation.boothNo}</div>
                  <div className="booth-detail-row"><MapPin size={16} /><span>{selectedStation.address}</span></div>
                  <div className="booth-detail-row"><Clock size={16} /><span>{selectedStation.timings}</span></div>
                  <div className="booth-detail-row"><Navigation size={16} /><span>{selectedStation.distance} away</span></div>
                  <a href={getDirectionsUrl(selectedStation)} target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                    {t('booth.getDirections')} <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="booth-placeholder">
                <MapPin size={48} />
                <p>Select a polling station to see details and directions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
