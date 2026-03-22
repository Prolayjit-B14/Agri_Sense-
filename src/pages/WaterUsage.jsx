import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, Droplets, Waves, 
  TrendingUp, BarChart, Brain, 
  Target, Info, ChevronRight, Zap,
  LineChart as LineChartIcon, Sprout
} from 'lucide-react';

const WaterUsage = () => {
  const { sensorData } = useApp();

  // Derived Logic: Efficiency = crop yield / water used (Simplified simulation)
  const efficiency = sensorData?.water?.level > 0 ? Math.min(98, sensorData?.water?.level + 15) : 0;

  return (
    <div className="page-container animate-fade-in" style={{ padding: '0 1.25rem' }}>
      {/* 🔝 1. HEADER */}
      <header style={{ paddingTop: '20px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Waves size={28} color="var(--info)" /> Water System
        </h2>
        <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>Precision Resource Analytics</p>
      </header>

      {/* 💧 2. USAGE CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '2.5rem' }}>
         <div className="premium-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', border: 'none', color: 'white' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.8, letterSpacing: '0.1em' }}>CURRENT LEVEL</p>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px' }}>{sensorData?.water?.level || 0}%</h4>
         </div>
         <div className="premium-card" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>TOTAL LOAD</p>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-main)' }}>{sensorData?.water?.totalUsage || 0}L</h4>
         </div>
      </div>

      {/* 📊 3. DYNAMIC EFFICIENCY */}
      <h3 className="section-title"><Target size={18} /> Water Efficiency Logic</h3>
      <div className="premium-card" style={{ marginBottom: '2.5rem', padding: '1.5rem', textAlign: 'center' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Supply Utilization</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)' }}>{efficiency}%</span>
         </div>
         <div style={{ width: '100%', height: '12px', background: 'var(--bg-main)', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: `${efficiency}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
         </div>
         <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', marginTop: '20px', lineHeight: 1.5 }}>
            <Info size={14} style={{ display: 'inline', marginRight: '6px' }} />
            System is operating at **High Precision Sync**. Flow rate matched to soil evapotranspiration model.
         </p>
      </div>

      {/* 📊 4. USAGE PATTERNS */}
      <h3 className="section-title"><BarChart size={18} /> Forensic Consumption</h3>
      <div className="premium-card" style={{ height: '220px', marginBottom: '3rem', padding: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px', gap: '8px' }}>
            {[60, 85, 45, 95, 70, 110, 80].map((h, i) => (
               <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--info)', borderRadius: '6px', opacity: 0.3 + (i * 0.1) }}></div>
            ))}
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', fontWeight: 900, marginTop: '15px', color: 'var(--text-muted)' }}>
            <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default WaterUsage;
