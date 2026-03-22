import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Bug, Sliders, 
  BarChart2, Activity, Brain, 
  AlertTriangle, CheckCircle2, Info
} from 'lucide-react';

const PestAdvisory = () => {
  const { sensorData } = useApp();
  const humidity = sensorData?.weather?.humidity || 0;
  const riskLevel = humidity > 75 ? 'CRITICAL' : (humidity > 50 ? 'HIGH' : (humidity === 0 ? 'WAITING' : 'STABLE'));
  const riskColor = riskLevel === 'CRITICAL' ? '#ef4444' : (riskLevel === 'HIGH' ? '#f59e0b' : (riskLevel === 'WAITING' ? '#94a3b8' : '#10b981'));

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 🐛 2. PEST LIST */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '2rem' }}>
         <div className="premium-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <Bug size={32} color={riskLevel === 'CRITICAL' ? '#ef4444' : '#f59e0b'} style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 900 }}>Aphid Node</h4>
            <div style={{ display: 'inline-block', height: '6px', width: '40px', background: riskColor, borderRadius: '3px', marginTop: '10px' }}></div>
         </div>
         <div className="premium-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <Bug size={32} color={riskLevel === 'CRITICAL' ? '#991b1b' : '#ef4444'} style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 900 }}>Caterpillar Stream</h4>
            <div style={{ display: 'inline-block', height: '6px', width: '60px', background: riskColor, borderRadius: '3px', marginTop: '10px' }}></div>
         </div>
      </div>

      {/* 🛡️ 3. TREATMENT CARDS */}
      <h3 className="section-title">🛡️ Pest Advisory</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2.5rem' }}>
         <div className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${riskColor}`, background: humidity > 75 ? '#fef2f2' : '#ecfdf5' }}>
            <div>
               <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#065f46' }}>Neural Bio-Control</h4>
               <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#065f46', opacity: 0.7 }}>SOP: Integrated Pest Management</p>
            </div>
            <CheckCircle2 color="var(--primary)" size={24} />
         </div>
         <div className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '6px solid #94a3b8', opacity: 0.6 }}>
            <div>
               <h4 style={{ fontSize: '1rem', fontWeight: 900 }}>Chemical Synthesis</h4>
               <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>SOP: Avoidance Protocol</p>
            </div>
            <AlertTriangle size={24} />
         </div>
      </div>

      {/* 📊 4. CHARTS */}
      <h3 className="section-title">📊 Biospheric Risk Analysis</h3>
      <div className="section-grid" style={{ marginBottom: '3rem' }}>
         <div className="premium-card" style={{ padding: '1.25rem', height: '140px', display: 'flex', flexWrap: 'wrap', gap: '4px', overflow: 'hidden' }}>
            <p style={{ width: '100%', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '10px' }}>ACTIVITY NODES</p>
            {Array.from({length: 20}).map((_, i) => (
               <div key={i} style={{ width: '18px', height: '18px', background: i < (humidity / 5) ? riskColor : '#10b981', borderRadius: '4px', opacity: 0.3 + (i * 0.02) }}></div>
            ))}
         </div>
         <div className="premium-card" style={{ padding: '1.25rem', textAlign: 'center', background: `linear-gradient(135deg, ${riskColor}, #1e293b)`, border: 'none', color: 'white' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.7, marginBottom: '10px' }}>DYNAMIC RISK</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{riskLevel}</h3>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.8, marginTop: '8px' }}>Based on {humidity}% RH</p>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default PestAdvisory;
