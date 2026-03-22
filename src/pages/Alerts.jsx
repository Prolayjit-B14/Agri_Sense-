import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2, AlertTriangle, ShieldAlert,
  Droplets, Wind, Bug, Waves, Sprout, Bell, Microscope
} from 'lucide-react';

const Alerts = () => {
  const { recommendations, sensorData } = useApp();
  const [filter, setFilter] = useState('All');
  const [dismissed, setDismissed] = useState([]);

  // Severity helpers
  const sev = (type) => type === 'danger' ? 0 : type === 'warning' ? 1 : 2;
  const sevColor = (type) => type === 'danger' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#10b981';
  const sevBg   = (type) => type === 'danger' ? '#fef2f2' : type === 'warning' ? '#fffbeb' : '#f0fdf4';
  const sevBorder = (type) => type === 'danger' ? '#fecaca' : type === 'warning' ? '#fde68a' : '#bbf7d0';
  const sevLabel = (type) => type === 'danger' ? 'Critical' : type === 'warning' ? 'Warning' : 'Info';

  const catIcon = (cat) => {
    const m = {
      'Soil Monitoring': Sprout, 'Nutrient Analysis': Microscope,
      'Weather & Environment': Wind, 'Pest & Security': Bug,
      'Food Freshness': Bell, 'Water System': Waves,
    };
    return m[cat] || AlertTriangle;
  };

  const catTag = (cat) => {
    const m = {
      'Soil Monitoring': 'Soil', 'Nutrient Analysis': 'NPK',
      'Weather & Environment': 'Weather', 'Pest & Security': 'Security',
      'Food Freshness': 'Storage', 'Water System': 'Water',
    };
    return m[cat] || 'System';
  };

  const allAlerts = [...(recommendations || [])]
    .filter(a => !dismissed.includes(a.id))
    .sort((a, b) => sev(a.type) - sev(b.type));

  const critical = allAlerts.filter(a => a.type === 'danger');
  const warnings = allAlerts.filter(a => a.type === 'warning');

  const filtered = filter === 'Critical' ? critical
    : filter === 'Warnings' ? warnings
    : allAlerts;

  const counts = { All: allAlerts.length, Critical: critical.length, Warnings: warnings.length };

  return (
    <div className="page-container" style={{ background: '#fcfdfe', minHeight: '100vh', paddingBottom: '3rem' }}>

      {/* ─── COMPACT HEADER ────────────────── */}
      <div style={{ paddingTop: '0.5rem', paddingBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b', margin: 0, letterSpacing: '-0.03em' }}>
          Alerts Center
        </h2>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {allAlerts.length > 0 ? `${allAlerts.length} active alert${allAlerts.length > 1 ? 's' : ''}` : 'All systems normal'}
        </p>
      </div>

      {/* ─── FILTER TABS WITH BADGES ────────── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {['All', 'Critical', 'Warnings'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '12px', border: 'none',
              background: filter === f ? '#1e293b' : 'white',
              color: filter === f ? 'white' : '#64748b',
              fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer',
              border: filter === f ? 'none' : '1px solid #f1f5f9',
              transition: 'all 0.2s ease'
            }}
          >
            {f}
            {counts[f] > 0 && (
              <span style={{
                fontSize: '0.6rem', fontWeight: 950,
                background: filter === f ? 'rgba(255,255,255,0.2)' : f === 'Critical' ? '#fef2f2' : '#fffbeb',
                color: filter === f ? 'white' : f === 'Critical' ? '#ef4444' : '#f59e0b',
                padding: '2px 6px', borderRadius: '6px', lineHeight: 1.4
              }}>
                {counts[f]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── ALERT LIST ────────────────────── */}
      <AnimatePresence initial={false}>
        {filtered.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filtered.map((alert, i) => {
              const Icon = catIcon(alert.category);
              const color = sevColor(alert.type);
              const tag = catTag(alert.category);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '14px 0',
                    borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
                  }}
                >
                  {/* Severity dot + icon */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '12px',
                      background: sevBg(alert.type), border: `1px solid ${sevBorder(alert.type)}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon size={17} color={color} />
                    </div>
                    {/* Severity dot */}
                    <div style={{
                      position: 'absolute', top: -3, right: -3,
                      width: '9px', height: '9px', borderRadius: '50%',
                      background: color, border: '2px solid white',
                      boxShadow: `0 0 6px ${color}80`
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 950, color: '#1e293b', margin: 0, lineHeight: 1.3 }}>
                        {alert.title}
                      </h4>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px', marginTop: '2px' }}>
                        Live
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                      {alert.message}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: 900, textTransform: 'uppercase',
                        color: color, background: sevBg(alert.type),
                        padding: '2px 7px', borderRadius: '5px'
                      }}>
                        {sevLabel(alert.type)}
                      </span>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: 900, textTransform: 'uppercase',
                        color: '#94a3b8', background: '#f1f5f9',
                        padding: '2px 7px', borderRadius: '5px'
                      }}>
                        {tag}
                      </span>
                      <button
                        onClick={() => setDismissed(d => [...d, alert.id])}
                        style={{ marginLeft: 'auto', fontSize: '0.6rem', fontWeight: 900, color: '#cbd5e1', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ─── COMPACT EMPTY STATE ──────── */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '2.5rem 1rem', textAlign: 'center'
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '18px',
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <CheckCircle2 size={24} color="#10b981" />
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 950, color: '#1e293b', margin: '0 0 4px 0' }}>
              No active alerts
            </p>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', margin: 0, maxWidth: '220px', lineHeight: 1.5 }}>
              All systems operating within safe limits
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Alerts;
