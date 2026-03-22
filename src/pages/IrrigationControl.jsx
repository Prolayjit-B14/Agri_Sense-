import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Droplets, Waves, Zap, Info, CheckCircle,
  XCircle, AlertTriangle, ChevronRight, Clock
} from 'lucide-react';

const IrrigationControl = () => {
  const navigate = useNavigate();
  const { sensorData, actuators, toggleActuator, ACTUATORS } = useApp();

  // 🛡️ Strict value guard
  const val = (v) => (v !== null && v !== undefined && v !== 0 ? v : null);
  const steer = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n.toFixed(1);
  };

  const moisture = steer(sensorData?.soil?.moisture);
  const waterLevel = steer(sensorData?.water?.level);
  const pumpOn = actuators?.[ACTUATORS?.PUMP] ?? false;

  const moistureStatus = !moisture ? 'Offline' : moisture < 35 ? 'Low' : 'Optimal';
  const waterStatus = !waterLevel ? 'Offline' : waterLevel < 30 ? 'Low' : 'Stable';

  return (
    <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.25rem', paddingBottom: '80px' }}>


      {/* ─── 0. HERO CARD (VIBRANT FOCAL) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
          borderRadius: '32px', padding: '2rem 1.5rem', marginBottom: '2.5rem',
          color: 'white', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.3)'
        }}
      >
        {/* Decorative Glass Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '180px', height: '180px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        {/* 1. Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.85, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Resource Management
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, lineHeight: 1.1 }}>Pump Intelligence</h3>
          </div>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Droplets size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* 2. Focal Metric Row */}
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>{waterLevel || '--'}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, opacity: 0.9 }}>%</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, opacity: 0.9, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Primary Water Resource
          </p>
        </div>

        {/* 3. Summary Row */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', 
          paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.15)',
          position: 'relative', zIndex: 1
        }}>
          {[
            { l: 'Pump', v: (moisture || waterLevel) ? (pumpOn ? 'ON' : 'OFF') : 'OFF' },
            { l: 'Resource', v: waterLevel ? `${waterLevel}%` : '0%' },
            { l: 'Flow', v: steer(sensorData?.water?.flowRate) || '0.0' },
            { l: 'Usage', v: steer(sensorData?.water?.totalUsage) || '0.0' }
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '0.55rem', fontWeight: 900, opacity: 0.7, margin: 0, textTransform: 'uppercase' }}>{s.l}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 950, margin: 0 }}>{String(s.v).toUpperCase()}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. PRIMARY RESOURCE GRID (2x2) ─── */}
      <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
        Resource Performance
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2.5rem' }}>
        {/* Soil Moisture */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets size={18} color="#3B82F6" />
            </div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Soil Moisture</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '1.7rem', fontWeight: 950, color: moisture ? '#1E293B' : '#E2E8F0' }}>{moisture || '--'}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>%</span>
          </div>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, margin: '14px 0 0 0', textTransform: 'uppercase' }}>
          </p>
        </div>

        {/* Water Level */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Waves size={18} color="#0EA5E9" />
            </div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Water Level</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '1.7rem', fontWeight: 950, color: waterLevel ? '#1E293B' : '#E2E8F0' }}>{waterLevel || '--'}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>%</span>
          </div>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, margin: '14px 0 0 0', color: '#cbd5e1', textTransform: 'uppercase' }}>
          </p>
        </div>
      </div>

      {/* ─── 2. PUMP CONTROL CENTER ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
          Remote System Control
        </h3>
        <motion.div 
          whileTap={{ scale: 0.99 }}
          onClick={() => toggleActuator(ACTUATORS?.PUMP)}
          style={{ 
            background: pumpOn ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : 'white', 
            borderRadius: '28px', padding: '1.5rem',
            border: pumpOn ? 'none' : '1px solid #F1F5F9',
            boxShadow: pumpOn ? '0 12px 30px -10px rgba(37, 99, 235, 0.4)' : '0 4px 12px rgba(0,0,0,0.02)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '52px', height: '52px', borderRadius: '16px', 
              background: pumpOn ? 'rgba(255,255,255,0.2)' : '#EFF6FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Zap size={24} color={pumpOn ? 'white' : '#3B82F6'} strokeWidth={2.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 950, color: pumpOn ? 'white' : '#1E293B', margin: 0 }}>Irrigation Pump</h4>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: pumpOn ? 'rgba(255,255,255,0.8)' : '#64748B', margin: '2px 0 0 0' }}>
                {pumpOn ? 'SYSTEM ACTIVE' : 'SYSTEM READY'}
              </p>
            </div>
          </div>
          <div style={{ 
            width: '64px', height: '32px', borderRadius: '100px', 
            background: pumpOn ? 'rgba(255,255,255,0.3)' : '#F1F5F9',
            position: 'relative', padding: '4px'
          }}>
            <motion.div 
              animate={{ x: pumpOn ? 32 : 0 }}
              style={{ 
                width: '24px', height: '24px', borderRadius: '50%', 
                background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── 8. CONDITION SUMMARY (SYSTEMIC LIST) ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
          Condition Summary
        </h3>
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', padding: '4pt', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {[
            { label: 'Pump Status', status: pumpOn ? 'Running' : 'Standby', color: pumpOn ? '#3B82F6' : '#94A3B8' },
            { label: 'Resource Level', status: waterStatus, color: waterStatus === 'Stable' ? '#10B981' : '#F59E0B' },
            { label: 'Field Moisture', status: moistureStatus, color: moistureStatus === 'Optimal' ? '#10B981' : '#F59E0B' },
            { label: 'System Health', status: 'Excellent', color: '#10B981' }
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


      {/* ─── QUICK SYSTEM INFO ─────────────── */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '1rem 1.25rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} color="#64748B" />
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', margin: 0 }}>Sync Status</p>
          <p style={{ fontSize: '0.75rem', fontWeight: 950, color: '#1e293b', margin: 0 }}>Just Now</p>
        </div>
        <div style={{ width: '1px', height: '24px', background: '#f1f5f9' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={14} color="#3B82F6" />
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', margin: 0 }}>Network</p>
          <p style={{ fontSize: '0.75rem', fontWeight: 950, color: '#3B82F6', margin: 0 }}>Secure</p>
        </div>
      </div>

      {/* ─── CTA (BLUE CRISP) ──────────── */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/analytics')}
        style={{
          width: '100%', padding: '1rem', borderRadius: '100px',
          background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
          color: 'white', border: 'none',
          fontSize: '0.9rem', fontWeight: 950,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 24px -4px rgba(37,99,235,0.35)', cursor: 'pointer',
          marginTop: '1.5rem'
        }}
      >
        View Irrigation Analytics <ChevronRight size={16} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default IrrigationControl;
