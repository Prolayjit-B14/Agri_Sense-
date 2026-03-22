import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Sun, Zap, Activity, Clock, Battery, ChevronRight
} from 'lucide-react';

const SolarMonitoring = () => {
  const navigate = useNavigate();
  const { sensorData, lastGlobalUpdate } = useApp();
  const solar = sensorData?.solar || {};

  // 🛡️ Strict value guard
  const val = (v) => (v !== null && v !== undefined && v !== 0 ? v : null);
  const steer = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n.toFixed(1);
  };

  const lux  = val(solar.lightIntensity);
  const power = steer(solar.power);
  const voltage = steer(solar.voltage);
  const current = steer(solar.current);
  const hrs  = val(solar.exposureDuration);
  const kwhToday = steer(solar.kwhToday);

  // Solar Status
  const solarStatus = !lux ? '--'
    : lux > 1000 ? 'High Sunlight'
    : lux > 500  ? 'Moderate'
    : 'Low Light';

  const statusColor = !lux ? '#94a3b8'
    : lux > 1000 ? '#10b981'
    : lux > 500  ? '#f59e0b'
    : '#ef4444';

  const condColor = (ok, status) => {
    if (status === '--' || status === 'Offline') return '#e2e8f0';
    return ok ? '#10b981' : '#f59e0b';
  };

  // Condition list
  const conditions = [
    { label: 'Sunlight', status: !!lux ? 'Online' : 'Offline', ok: !!lux },
    { label: 'Efficiency', status: !!voltage ? 'Online' : 'Offline', ok: !!voltage },
    { label: 'Capacity', status: !!lux ? 'Online' : 'Offline', ok: !!lux },
    { label: 'System', status: !!lux ? 'Online' : 'Offline', ok: !!lux },
  ];

  const telemetry = [
    { label: 'Power OUT', value: power, unit: 'W', icon: Zap, color: '#f59e0b', bg: '#fffbeb', active: !!power },
    { label: 'Voltage', value: voltage, unit: 'V', icon: Activity, color: '#10b981', bg: '#f0fdf4', active: !!voltage },
    { label: 'Daily Yield', value: kwhToday, unit: 'kWh', icon: Battery, color: '#0ea5e9', bg: '#f0f9ff', active: !!kwhToday },
    { label: 'Peak Sun', value: hrs, unit: 'h', icon: Clock, color: '#8b5cf6', bg: '#f5f3ff', active: !!hrs },
  ];

  return (
    <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.25rem', paddingBottom: '80px' }}>


      {/* ─── 0. HERO CARD (VIBRANT FOCAL) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
          borderRadius: '32px', padding: '2rem 1.5rem', marginBottom: '2.5rem',
          color: 'white', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(217, 119, 6, 0.3)'
        }}
      >
        {/* Decorative Glass Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '180px', height: '180px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        {/* 1. Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.85, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Energy Intelligence
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, lineHeight: 1.1 }}>{solarStatus}</h3>
          </div>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Sun size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* 2. Focal Metric Row */}
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>{power || '--'}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, opacity: 0.9 }}>W</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, opacity: 0.9, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Current System Output
          </p>
        </div>

        {/* 3. Summary Row */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', 
          paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.15)',
          position: 'relative', zIndex: 1
        }}>
          {[
            { l: 'Voltage', v: voltage ? `${voltage}V` : 'Offline' },
            { l: 'Current', v: current ? `${current}A` : 'Offline' },
            { l: 'Today', v: kwhToday ? `${kwhToday}kWh` : 'Offline' },
            { l: 'Sun Hr', v: hrs ? `${hrs}h` : 'Offline' }
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '0.55rem', fontWeight: 900, opacity: 0.7, margin: 0, textTransform: 'uppercase' }}>{s.l}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 950, margin: 0 }}>{s.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── TELEMETRY GRID (2x2) ──────────── */}
      <h3 style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
        Panel Performance
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2.5rem' }}>
        {telemetry.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'white', borderRadius: '24px', padding: '1.25rem',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {(() => {
                  const Icon = t.icon;
                  return <Icon size={18} color={t.color} />;
                })()}
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{t.label}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '1.7rem', fontWeight: 950, color: t.value ? '#1e293b' : '#e2e8f0' }}>{t.value || '--'}</span>
              {t.unit && <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>{t.unit}</span>}
            </div>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, color: t.value ? '#10B981' : '#cbd5e1', margin: '14px 0 0 0', textTransform: 'uppercase' }}>
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

      {/* ─── CTA (Scrollable) ──────────── */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/analytics')}
        style={{
          width: '100%', padding: '1rem', borderRadius: '100px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white', border: 'none',
          fontSize: '0.9rem', fontWeight: 950,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 24px -4px rgba(217,119,6,0.35)', cursor: 'pointer',
          marginTop: '1.5rem'
        }}
      >
        View Solar Analytics <ChevronRight size={16} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default SolarMonitoring;
