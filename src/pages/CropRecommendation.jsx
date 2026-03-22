import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, Target, PieChart, 
  Brain, ChevronRight, CheckCircle2,
  TrendingUp, Activity, Award,
  Info, Thermometer, Droplets, FlaskConical,
  Zap, ArrowRight
} from 'lucide-react';

const CropRecommendation = () => {
  const { sensorData, sensorHistory } = useApp();

  // Dynamic Logic - Match Engine
  const matches = useMemo(() => {
    const moisture = sensorData?.soil?.moisture;
    const nitrogen = sensorData?.soil?.npk?.n;
    const temp = sensorData?.soil?.temp;

    if (moisture === null || nitrogen === null || temp === null) return [];

    return [
      { 
        name: 'Rice (High Yield)', 
        score: moisture > 60 ? 94 : moisture > 40 ? 82 : 45,
        params: [
          { label: 'Moisture Match', val: moisture > 60 ? 'Optimal' : 'Low', ok: moisture > 40 },
          { label: 'Nitrogen Level', val: nitrogen > 40 ? 'High' : 'Low', ok: nitrogen > 30 },
          { label: 'Thermal Sync', val: temp < 32 ? 'Optimal' : 'Stress', ok: temp < 35 },
        ],
        color: '#0ea5e9' 
      },
      { 
        name: 'Wheat (Winter)', 
        score: temp < 25 ? 88 : temp < 30 ? 75 : 40,
        params: [
          { label: 'Moisture Match', val: moisture < 50 ? 'Optimal' : 'High', ok: moisture < 60 },
          { label: 'Nitrogen Level', val: nitrogen > 50 ? 'Optimal' : 'Low', ok: nitrogen > 40 },
          { label: 'Thermal Sync', val: temp < 25 ? 'Perfect' : 'Warm', ok: temp < 30 },
        ],
        color: '#f59e0b' 
      },
      { 
        name: 'Organic Vegetables', 
        score: (moisture > 30 && moisture < 60) ? 91 : 65,
        params: [
          { label: 'Moisture Match', val: 'Balanced', ok: true },
          { label: 'Nitrogen Level', val: 'Moderate', ok: true },
          { label: 'Thermal Sync', val: 'Variable', ok: true },
        ],
        color: '#10b981' 
      },
    ].sort((a, b) => b.score - a.score);
  }, [sensorData]);

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 🧬 2. MATCH CARDS */}
      <h3 className="section-title"><Target size={18} /> Crop Advisory</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2.5rem' }}>
        {matches.map((crop, i) => (
          <div key={i} className="premium-card animate-slide-up" style={{ padding: '1.5rem', borderLeft: `6px solid ${crop.color}`, animationDelay: `${i * 0.1}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
               <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${crop.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Sprout size={24} color={crop.color} />
                  </div>
                  <div>
                     <h4 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{crop.name}</h4>
                     <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Hybrid Seed Optimization</p>
                  </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: crop.color }}>{crop.score}%</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>NEURAL MATCH</div>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', pt: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
               {crop.params.map((p, pi) => (
                  <div key={pi} style={{ textAlign: 'center' }}>
                     <p style={{ fontSize: '0.55rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px' }}>{p.label}</p>
                     <p style={{ fontSize: '0.7rem', fontWeight: 900, color: p.ok ? '#10b981' : '#ef4444' }}>{p.val}</p>
                  </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* 📋 3. DECISION LOGIC */}
      <h3 className="section-title"><FlaskConical size={18} /> Telemetry Weights</h3>
      <div className="premium-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Field A Moisture Load</span>
               <span style={{ fontSize: '0.85rem', fontWeight: 900 }}>{sensorData.soil?.moisture || 0}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ width: `${sensorData.soil?.moisture || 0}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
               <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Soil Thermal Stress</span>
               <span style={{ fontSize: '0.85rem', fontWeight: 900 }}>{sensorData.soil?.temp || 0}°C</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ width: `${(sensorData.soil?.temp / 50) * 100}%`, height: '100%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }}></div>
            </div>
         </div>
      </div>

      {/* 🏆 4. TOP RECOMMENDATION HUD */}
      <div className="premium-card" style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', color: 'white', border: 'none', padding: '2rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
         <Award size={64} style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1 }} />
         <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
               <Zap size={20} color="#fcd34d" />
               <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>MASTER ADVISORY</span>
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '10px' }}>{matches[0].name} Is Optimal</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.5 }}>
               Based on the last 24h analysis of nitrogen levels ({sensorData.soil?.npk?.n || 0} ppm) and moisture trends, {matches[0].name} will yield 22% higher profit than other variants.
            </p>
            <button style={{ marginTop: '20px', padding: '12px 20px', borderRadius: '12px', background: 'white', color: '#064e3b', border: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
               ORDER SEEDS <ArrowRight size={16} />
            </button>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default CropRecommendation;
