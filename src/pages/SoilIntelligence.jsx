import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Microscope, Star, CheckCircle2, 
  Brain, TrendingUp, Info, 
  Target, Layers
} from 'lucide-react';

const SoilIntelligence = () => {
  const { sensorData } = useApp();

  return (
    <div className="page-container animate-fade-in" style={{ padding: '0 1.25rem' }}>
      {/* 🔝 1. HEADER */}
      <header style={{ paddingTop: '20px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>🧪 Soil Intelligence</h2>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>AI Forensic Analysis</p>
      </header>

      {/* 🌱 2. SOIL TYPE CARD */}
      <div className="premium-card" style={{ marginBottom: '2rem', padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: 'none' }}>
         <Layers size={48} color="#92400e" style={{ margin: '0 auto 15px' }} />
         <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350f' }}>🌱 Loamy Soil</h3>
         <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e', opacity: 0.8 }}>Optimal for most agricultural crops</p>
      </div>

      {/* 📈 3. QUALITY SCORE */}
      <div className="premium-card" style={{ marginBottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '12px solid #e2e8f0', borderTopColor: 'var(--primary)' }}></div>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
               <p style={{ fontSize: '1.5rem', fontWeight: 900 }}>82</p>
               <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)' }}>OUT OF 100</p>
            </div>
         </div>
         <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginTop: '20px' }}>Quality Score</h4>
         <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginTop: '5px' }}>High Fertility Zone</p>
      </div>

      {/* 📊 4. CHARTS */}
      <h3 className="section-title">📈 Nutritional Depth</h3>
      <div className="premium-card" style={{ marginBottom: '2.5rem', padding: '1.5rem' }}>
         <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100px', justifyContent: 'space-around' }}>
            {[40, 70, 90, 60, 80].map((h, i) => (
               <div key={i} style={{ width: '30px', height: `${h}%`, background: 'var(--primary)', borderRadius: '4px', opacity: 0.5 }}></div>
            ))}
         </div>
      </div>

      {/* 🤖 5. AI TIPS */}
      <h3 className="section-title">🤖 AI Intelligence Tips</h3>
      <div className="premium-card" style={{ border: '2px dashed var(--primary)', background: 'var(--primary-ultra)', marginBottom: '3rem' }}>
         <div style={{ display: 'flex', gap: '15px' }}>
            <Brain size={24} color="var(--primary)" />
            <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>Add organic compost to improve fertility. Avoid heavy chemical fertilizers for next 30 days.</p>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default SoilIntelligence;
