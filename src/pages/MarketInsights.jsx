import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, BarChart2, DollarSign, 
  Brain, Globe, Info, 
  ChevronRight, Tag, Activity,
  ArrowUpRight, ArrowDownRight,
  ShoppingCart, Briefcase, BarChart
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MarketInsights = () => {
  const { sensorData } = useApp();
  const market = sensorData?.market || { price: '--', commodities: [] };

  const priceData = [
    { name: 'JAN', price: 2100 },
    { name: 'FEB', price: 2300 },
    { name: 'MAR', price: 2200 },
    { name: 'APR', price: 2800 },
    { name: 'MAY', price: 3100 },
    { name: 'JUN', price: 2950 },
  ];

  const commodities = market.commodities.length > 0 ? market.commodities : [
    { name: 'Waiting for API...', price: '--', trend: 'stable', type: 'none' }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ padding: '0 1.25rem' }}>
      {/* 🔝 1. HEADER */}
      <header style={{ paddingTop: '20px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={28} color="var(--primary)" /> Market Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>Global Commodity Analysis Hub</p>
        </div>
        <div className="animate-pulse" style={{ background: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900 }}>LIVE TICKER</div>
      </header>

      {/* 📊 2. INTERACTIVE PRICE HUB */}
      <div className="premium-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div>
               <h4 style={{ fontSize: '1rem', fontWeight: 900 }}>National Benchmark Index</h4>
               <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Wheat & Grains Synthesis</p>
            </div>
            <div style={{ textAlign: 'right' }}>
               <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>₹2,950.40</h4>
               <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  <ArrowUpRight size={14} /> +14.2%
               </p>
            </div>
         </div>

         <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={priceData}>
                  <defs>
                     <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="price" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 🏷️ 3. LIVE COMMODITY GRID */}
      <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={18} /> Live Local Prices</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem' }}>
         {commodities.map((c, i) => (
            <div key={i} className="premium-card animate-slide-up" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animationDelay: `${i * 0.1}s` }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <ShoppingCart size={20} color="var(--text-muted)" />
                  </div>
                  <div>
                     <h5 style={{ fontSize: '0.9rem', fontWeight: 900 }}>{c.name}</h5>
                     <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>Mandis Selection</p>
                  </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: 900 }}>{c.price} <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>/qtl</span></h5>
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: c.type === 'up' ? '#10b981' : '#ef4444' }}>{c.trend}</span>
               </div>
            </div>
         ))}
      </div>

      {/* 🤖 4. AI MARKET INTELLIGENCE */}
      <div className="premium-card" style={{ border: 'none', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.1, borderRadius: '50%' }}></div>
         <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Brain size={24} color="var(--primary)" />
            </div>
            <div>
               <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>Export demand is rising. Hold stocks for high-value peak in April.</p>
               <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '4px' }}>AI Confidence Level: 92%</p>
            </div>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default MarketInsights;
