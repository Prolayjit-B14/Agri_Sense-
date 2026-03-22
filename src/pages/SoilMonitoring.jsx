import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Droplets, Thermometer, FlaskConical, 
  Activity, ChevronRight, Sprout, Info
} from 'lucide-react';

const SoilMonitoring = () => {
  const { sensorData, lastGlobalUpdate } = useApp();
  const navigate = useNavigate();

  // 🛡️ Data Guard Utility
  const val = (v) => (v !== null && v !== undefined && v !== 0 && v !== '--' ? v : null);
  const steer = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n.toFixed(1);
  };

  const soil = sensorData?.soil || {};
  const moisture = steer(soil.moisture);
  const temp = steer(soil.temp);
  const ph = steer(soil.ph);
  const npk = soil.npk || {};

  // 🎨 Status Logic
  const getStatus = (type, v) => {
    const n = parseFloat(v);
    if (isNaN(n)) return { status: '--', color: '#94A3B8' };
    if (type === 'moisture') return n < 35 ? { status: 'Low', color: '#EF4444' } : n > 65 ? { status: 'High', color: '#F59E0B' } : { status: 'Optimal', color: '#16A34A' };
    if (type === 'ph') return n < 6 ? { status: 'Acidic', color: '#F59E0B' } : n > 7.5 ? { status: 'Alkaline', color: '#EF4444' } : { status: 'Neutral', color: '#16A34A' };
    if (type === 'temp') return n < 18 ? { status: 'Cool', color: '#0EA5E9' } : n > 32 ? { status: 'Warm', color: '#EF4444' } : { status: 'Normal', color: '#16A34A' };
    return { status: 'Active', color: '#16A34A' };
  };

  const sensors = [
    { 
      id: 'moisture', label: 'Soil Moisture', value: moisture, unit: '%', icon: Droplets, 
      color: '#0EA5E9', bg: '#F0F9FF', range: 'Optimal: 35-65%' 
    },
    { 
      id: 'temp', label: 'Soil Temp', value: temp, unit: '°C', icon: Thermometer, 
      color: '#EF4444', bg: '#FEF2F2', range: 'Optimal: 18-32°C' 
    },
    { 
      id: 'ph', label: 'pH Level', value: ph, unit: 'pH', icon: Activity, 
      color: '#8B5CF6', bg: '#F5F3FF', range: 'Optimal: 6.0-7.5' 
    },
    { 
      id: 'npk', label: 'NPK Balance', 
      value: val(npk.n) ? `N ${Number(npk.n).toFixed(1)} | P ${Number(npk.p).toFixed(1)} | K ${Number(npk.k).toFixed(1)}` : null, 
      unit: '', icon: FlaskConical, color: '#16A34A', bg: '#F0FDF4', range: 'Balanced Mix' 
    }
  ];

  const conditions = [
    { label: 'Moisture', ...getStatus('moisture', moisture) },
    { label: 'pH Level', ...getStatus('ph', ph) },
    { label: 'Temperature', ...getStatus('temp', temp) },
    { label: 'Nutrients', ...getStatus('npk', val(npk.n)) }
  ];

  // 🎭 Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="soil-monitoring-page" style={{ 
      background: '#F8FAFC', 
      minHeight: '100%', 
      paddingTop: '20px',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingBottom: '80px' // spacing to clear bottom navbar at end of scroll
    }}>
      
      {/* ─── 0. HERO CARD (VIBRANT FOCAL) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #16A34A 0%, #10B981 100%)', 
          borderRadius: '32px', padding: '2rem 1.5rem', marginBottom: '2.5rem',
          color: 'white', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(22, 163, 74, 0.3)'
        }}
      >
        {/* Decorative Glass Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '180px', height: '180px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        {/* 1. Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.85, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Field Intelligence
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, lineHeight: 1.1 }}>Field Vitality</h3>
          </div>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Sprout size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* 2. Focal Metric Row */}
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>{moisture || '--'}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, opacity: 0.9 }}>%</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, opacity: 0.9, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Average Soil Moisture
          </p>
        </div>

        {/* 3. Summary Row */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', 
          paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.15)',
          position: 'relative', zIndex: 1
        }}>
          {[
            { l: 'Moisture', v: moisture ? `${moisture}%` : '--' },
            { l: 'pH Level', v: ph ? ph : '--' },
            { l: 'Soil Temp', v: temp ? `${temp}°C` : '--' },
            { l: 'Nutr.', v: val(npk.n) ? 'Online' : '--' }
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '0.55rem', fontWeight: 900, opacity: 0.7, margin: 0, textTransform: 'uppercase' }}>{s.l}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 950, margin: 0 }}>{s.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── 3. PRIMARY SENSOR GRID (2x2) ─── */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2.5rem' }}
      >
        {sensors.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div 
              key={s.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: 'white', borderRadius: '24px', padding: '1.25rem', 
                border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.color} strokeWidth={2} />
                </div>
                <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {s.label}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ 
                  fontSize: s.id === 'npk' && s.value ? '0.9rem' : '1.7rem', 
                  fontWeight: 950, color: s.value ? '#0F172A' : '#E2E8F0',
                  lineHeight: 1.1
                }}>
                  {s.value || '--'}
                </span>
                {s.unit && <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>{s.unit}</span>}
              </div>

              <p style={{ fontSize: '0.55rem', fontWeight: 800, color: '#CBD5E1', margin: '14px 0 0 0', textTransform: 'uppercase' }}>{s.range}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ─── 8. CONDITION SUMMARY (SYSTEMIC LIST) ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
          Condition Summary
        </h3>
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', padding: '4pt', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {[
            { label: 'Moisture', ...getStatus('moisture', moisture) },
            { label: 'pH Level', ...getStatus('ph', ph) },
            { label: 'Temperature', ...getStatus('temp', temp) },
            { label: 'Nutrients', ...getStatus('npk', val(npk.n)) }
          ].map((c, i, arr) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '1.15rem 1.25rem',
              borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none' 
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569' }}>{c.label}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 950, color: c.color }}>
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* ─── 10. CTA BUTTON (Scrollable - at the end) ─── */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/analytics')}
        style={{
          width: '100%', padding: '1.1rem',
          borderRadius: '100px', // Pill style
          background: 'linear-gradient(135deg, #16A34A, #15803D)',
          color: 'white', border: 'none',
          fontSize: '0.9rem', fontWeight: 950,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          boxShadow: '0 8px 24px -4px rgba(22, 163, 74, 0.35)',
          cursor: 'pointer', letterSpacing: '0.01em',
          marginTop: '1rem'
        }}
      >
        View Deep Soil Analytics <ChevronRight size={18} strokeWidth={3} />
      </motion.button>

    </div>
  );
};

export default SoilMonitoring;
