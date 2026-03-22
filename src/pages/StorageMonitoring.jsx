import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Thermometer, Droplets, Wind, Gauge,
  AlertTriangle, Activity, Camera, ChevronRight
} from 'lucide-react';

// 🛡️ Local Safety Intelligence (Based on MQ135 & Temp)
const getSafetyStatus = (gas, temp) => {
  const g = parseFloat(gas) || 0;
  const t = parseFloat(temp) || 0;
  
  if (!gas && !temp) return { text: 'OFFLINE', color: '#94A3B8', score: '--', ok: false };
  
  // Scoring formula: 100 base, -10 for every ppm above 20, -5 for every degree above 30
  let score = 100;
  if (g > 20) score -= (g - 20) * 2;
  if (t > 30) score -= (t - 30) * 3;
  score = Math.max(0, Math.min(100, score));

  if (score > 80) return { text: 'OPTIMAL', color: '#10B981', score, ok: true };
  if (score > 50) return { text: 'STABLE', color: '#F59E0B', score, ok: true };
  return { text: 'WARNING', color: '#EF4444', score, ok: false };
};

const StorageMonitoring = () => {
  const navigate = useNavigate();
  const { sensorData } = useApp();
  const storage = sensorData?.storage || {};

  // 🛡️ Strict guard
  const val = (v) => (v !== null && v !== undefined && v !== 0 ? v : null);
  const steer = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n.toFixed(1);
  };

  const temp = steer(storage.temp);
  const humidity = steer(storage.humidity);
  const gas = steer(storage.mq135); 
  const safety = getSafetyStatus(gas, temp);

  // ─── Condition Logic (RESTORED & REAL) ──────
  const conditions = [
    { label: 'Storage Temp', status: !temp ? '--' : parseFloat(temp) > 35 ? 'Warning' : 'Normal', ok: temp && parseFloat(temp) <= 35 },
    { label: 'Silo Humidity', status: !humidity ? '--' : parseFloat(humidity) > 70 ? 'High' : 'Stable', ok: humidity && parseFloat(humidity) <= 70 },
    { label: 'Gas Conc.', status: !gas ? '--' : parseFloat(gas) > 40 ? 'High' : 'Low', ok: gas && parseFloat(gas) <= 40 },
    { label: 'Overall Safety', status: safety.text, ok: safety.ok }
  ];

  // ─── Alerts (conditional) ───────────────────
  const alerts = [
    { show: gas && parseFloat(gas) > 50, text: 'High gas concentration — ventilation recommended', icon: Wind },
    { show: humidity && parseFloat(humidity) > 70, text: 'High humidity — spoilage risk elevated', icon: Droplets },
    { show: safety.score < 50, text: 'Storage safety score critical — check silo sensors', icon: AlertTriangle },
  ].filter(a => a.show);

  // ─── Helper: Status Color ───────────────────
  const condColor = (ok, status) => {
    if (status === '--' || status === 'Offline') return '#e2e8f0';
    return ok ? '#10b981' : '#f59e0b';
  };

  return (
    <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.25rem', paddingBottom: '80px' }}>


      {/* ─── 0. HERO CARD (VIBRANT FOCAL) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', 
          borderRadius: '32px', padding: '2rem 1.5rem', marginBottom: '2.5rem',
          color: 'white', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(124, 58, 237, 0.3)'
        }}
      >
        {/* Decorative Glass Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '180px', height: '180px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        {/* 1. Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.85, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Silo Intelligence
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, lineHeight: 1.1 }}>Storage Safety</h3>
          </div>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Activity size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* 2. Focal Metric Row */}
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>{safety.score || '--'}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, opacity: 0.9 }}>/100</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, opacity: 0.9, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Storage Safety Score
          </p>
        </div>

        {/* 3. Summary Row */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', 
          paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.15)',
          position: 'relative', zIndex: 1
        }}>
          {[
            { l: 'Temp', v: temp ? `${temp}°C` : '--' },
            { l: 'Humid.', v: humidity ? `${humidity}%` : '--' },
            { l: 'Gas', v: gas ? `${gas}ppm` : '--' },
            { l: 'Status', v: safety.text || '--' }
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '0.55rem', fontWeight: 900, opacity: 0.7, margin: 0, textTransform: 'uppercase' }}>{s.l}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 950, margin: 0 }}>{s.v}</p>
            </div>
          ))}
        </div>
      </motion.div>


      {/* ─── 1. ENVIRONMENT SENSORS (PRIMARY GRID) ─── */}
      <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
        Storage Telemetry
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2.5rem' }}>
        {[
          { label: 'Temperature', value: temp, unit: '°C', icon: Thermometer, color: '#ef4444', bg: '#fff1f2' },
          { label: 'Humidity', value: humidity, unit: '%', icon: Droplets, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Safety Index', value: safety.score, unit: '%', icon: Activity, color: safety.color, bg: '#f8fafc', extra: safety.text },
          { label: 'Gas Level', value: gas, unit: 'ppm', icon: Wind, color: '#8b5cf6', bg: '#f5f3ff' },
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'white', borderRadius: '24px', padding: '1.25rem',
              border: '1px solid #F1F5F9',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <t.icon size={18} color={t.color} />
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{t.label}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '1.7rem', fontWeight: 950, color: t.value ? '#1E293B' : '#E2E8F0' }}>
                {t.value || '--'}
              </span>
              {t.unit && <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>{t.unit}</span>}
            </div>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, margin: '14px 0 0 0', textTransform: 'uppercase' }}>
            </p>
          </motion.div>
        ))}
      </div>
 
      {/* ─── 2. CONDITION SUMMARY (SYSTEMIC LIST) ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
          Condition Summary
        </h3>
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', padding: '4pt', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {conditions.map((c, i) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '1.15rem 1.25rem',
              borderBottom: i < conditions.length - 1 ? '1px solid #F8FAFC' : 'none' 
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569' }}>{c.label}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 950, color: condColor(c.ok, c.status) }}>
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ALERTS ───────────────────────────── */}
      <AnimatePresence>
        {alerts.map((alert, i) => {
          const AlertIcon = alert.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: '#FFF7ED', border: '1px solid #FED7AA',
                borderRadius: '20px', padding: '1.15rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: '10px'
              }}
            >
              <AlertIcon size={16} color="#F97316" />
              <p style={{ fontSize: '0.8rem', fontWeight: 900, color: '#C2410C', margin: 0 }}>{alert.text}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
 
      {/* ─── CTA (Scrollable) ──────────── */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/analytics')}
        style={{
          width: '100%', padding: '1.1rem', borderRadius: '100px',
          background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
          color: 'white', border: 'none',
          fontSize: '0.9rem', fontWeight: 950,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 24px -4px rgba(139,92,246,0.35)', cursor: 'pointer',
          marginTop: '1.5rem'
        }}
      >
        View Storage Analytics <ChevronRight size={16} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default StorageMonitoring;
