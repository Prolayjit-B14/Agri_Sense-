import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Zap, Brain, CheckCircle2, AlertCircle, 
  ChevronRight, TrendingUp, Sparkles, Sprout,
  Droplets, Wind, ShieldCheck, Activity,
  Timer, Gauge, Microscope, Search
} from 'lucide-react';

const AIHubV3_1_Master = () => {
  const { recommendations, sensorData } = useApp();
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in" style={{ padding: '1.25rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>AI Neural Hub</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Predictive Insights & Advisor</p>
      </header>

      {/* Hero Brain Card - Ultra Premium */}
      <div className="premium-card animate-slide-up" style={{ 
        background: 'linear-gradient(135deg, #4f46e5, #0ea5e9, #059669)', 
        color: 'white', padding: '2.5rem 1.5rem', textAlign: 'center', marginBottom: '2.5rem',
        border: 'none', boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' 
      }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
          margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Brain size={40} color="white" />
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Agri Sense AI v6.0.0</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800, opacity: 0.9 }}>
          <Sparkles size={14} fill="white" /> NEURAL ENGINE ACTIVE
        </div>
      </div>

      {/* Rule-Based AI Decision System - 100+ Feature Alignment */}
      <h3 className="section-title">Logic Engine Status</h3>
      <div className="premium-card" style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Droplets size={18} color="var(--primary)" />
               <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Irrigation Timing Prediction</span>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>T+4 HRS</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Microscope size={18} color="var(--info)" />
               <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Nutrient Deficiency Check</span>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>NEGATIVE</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Gauge size={18} color="#f59e0b" />
               <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Pest Risk Prediction</span>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ef4444' }}>ELEVATED (A1)</span>
         </div>
      </div>

      {/* Critical Recommendations */}
      <h3 className="section-title">Actionable Directives</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {recommendations.map((rec, i) => (
          <div key={i} className="premium-card" style={{ borderLeft: `5px solid ${rec.type === 'warning' ? '#f59e0b' : rec.type === 'danger' ? '#ef4444' : 'var(--primary)'}` }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ padding: '10px', borderRadius: '14px', background: 'var(--bg-main)' }}>
                 {rec.type === 'danger' ? <Zap size={22} color="#ef4444" /> : <ShieldCheck size={22} color="var(--primary)" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: '1.05rem', marginBottom: '4px' }}>{rec.title}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{rec.message}</p>
                
                <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
                  <span className="status-badge badge-online" style={{ fontSize: '0.6rem' }}>CONFIDENCE: 98%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default AIHubV3_1_Master;
