import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dog, Bird, Clock, 
  TrendingUp, BarChart, Brain, 
  History, Camera, ChevronRight, AlertCircle
} from 'lucide-react';

const AnimalDetection = () => {
  const logs = [
    { time: '09:30 AM', detail: 'Bird detected near Section B', icon: Bird, color: '#0ea5e9' },
    { time: '08:15 AM', detail: 'Stray animal detected near Gate', icon: Dog, color: '#ef4444' },
    { time: '06:45 AM', detail: 'Bird cluster detected in rice zone', icon: Bird, color: '#0ea5e9' },
  ];

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 📄 2. LOGS */}
      <h3 className="section-title">📄 Recent Events</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2.5rem' }}>
        {logs.map((log, i) => (
          <div key={i} className="premium-card animate-slide-up" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
               <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: `${log.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {(() => {
                     const LogIcon = log.icon;
                     return <LogIcon size={22} color={log.color} />;
                   })()}
                </div>
               <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>{log.time}</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '2px' }}>{log.detail}</p>
               </div>
               <Camera size={18} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>

      {/* 📊 3. CHARTS */}
      <h3 className="section-title">📊 Activity Frequency</h3>
      <div className="premium-card" style={{ height: '180px', marginBottom: '2.5rem', padding: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '110px', gap: '5px' }}>
            {[4, 8, 15, 12, 18, 10, 5].map((h, i) => (
               <div key={i} style={{ width: '30px', height: `${h * 5}%`, background: 'var(--primary)', opacity: 0.1 + (i * 0.1), borderRadius: '4px' }}></div>
            ))}
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', fontWeight: 900, marginTop: '15px', color: 'var(--text-muted)' }}>
            <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
         </div>
      </div>

      {/* 🤖 4. AI INSIGHT */}
      <h3 className="section-title">🤖 AI Detection Tips</h3>
      <div className="premium-card" style={{ border: '2px solid var(--primary)', background: 'var(--primary-ultra)', marginBottom: '3rem' }}>
         <div style={{ display: 'flex', gap: '15px' }}>
            <Brain size={24} color="var(--primary)" />
            <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>
               Bird activity is high in the morning (06:00 - 09:00). Consider activating automated repellents during this window.
            </p>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default AnimalDetection;
