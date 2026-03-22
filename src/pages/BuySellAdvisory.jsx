import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, TrendingUp, BarChart, 
  Brain, Calendar, Info, 
  TrendingDown, Globe, Tag
} from 'lucide-react';

const BuySellAdvisory = () => {
  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 📈 2. PRICE CHART */}
      <h3 className="section-title">📈 Rice Price Trend</h3>
      <div className="premium-card animate-slide-up" style={{ height: '220px', marginBottom: '2.5rem', padding: '1.5rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>National Market (2 Weeks)</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#10b981' }}>+8.2% ↑</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '130px' }}>
            {[30, 35, 32, 40, 45, 48, 55, 60, 58, 62, 70, 75].map((h, i) => (
               <div key={i} style={{ width: '10px', height: `${h}%`, background: 'var(--secondary)', borderRadius: '4px', opacity: 0.5 }}></div>
            ))}
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontWeight: 700, marginTop: '10px', color: 'var(--text-muted)' }}>
            <span>01 MAR</span><span>07 MAR</span><span>14 MAR</span>
         </div>
      </div>

      {/* 🤖 3. AI ADVICE */}
      <h3 className="section-title">🤖 AI Market Strategy</h3>
      <div className="premium-card" style={{ border: '2px solid var(--primary)', background: 'var(--primary-ultra)', padding: '2rem', marginBottom: '3rem' }}>
         <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)' }}>
               <Brain size={32} color="var(--primary)" />
            </div>
            <div>
               <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>Peak Strategy Identified</h4>
               <p style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '5px' }}>
                  Sell in next 3 days. Prices are at a seasonal peak before new harvest supply hits the market.
               </p>
            </div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '2rem' }}>
         <div className="premium-card" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)' }}>BUY INDEX</p>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ef4444' }}>LOW</h4>
         </div>
         <div className="premium-card" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)' }}>SELL INDEX</p>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>CRITICAL</h4>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default BuySellAdvisory;
