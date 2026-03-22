import React from 'react';
import { useApp } from '../context/AppContext';
import { MASTER_CONFIG } from '../config';
import { 
  Map as MapIcon, MapPin, 
  Satellite, Navigation, Layers, Compass,
  Activity, Radio, Camera, Shield, Droplets
} from 'lucide-react';

const MapView = () => {
  const { sensorData, farmInfo } = useApp();

  const devices = [
    { id: 1, name: 'Soil Node 1', top: '25%', left: '42%', icon: Droplets, color: '#0ea5e9' },
    { id: 2, name: 'Silo Node 3', top: '65%', left: '78%', icon: Radio, color: '#8b5cf6' },
    { id: 3, name: 'Cam Node 1', top: '45%', left: '15%', icon: Camera, color: '#f59e0b' },
    { id: 4, name: 'Relay 01 (Pump)', top: '15%', left: '70%', icon: Activity, color: '#ef4444' },
    { id: 5, name: 'Soil Node 2', top: '80%', left: '30%', icon: Droplets, color: '#10b981' },
    { id: 6, name: 'Pest Unit 04', top: '50%', left: '55%', icon: Shield, color: '#ec4899' },
  ];

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 🗺 1. THE GIS ENGINE (Live OpenStreetMap) */}
      <div className="premium-card" style={{ 
        padding: '0', height: '480px', position: 'relative', overflow: 'hidden', 
        borderRadius: '32px', border: '3px solid white', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.12)', background: '#cbd5e1' 
      }}>
         {/* Live OpenStreetMap Layer */}
         <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${MASTER_CONFIG.MAP_LNG-0.01},${MASTER_CONFIG.MAP_LAT-0.01},${MASTER_CONFIG.MAP_LNG+0.01},${MASTER_CONFIG.MAP_LAT+0.01}&layer=mapnik&marker=${MASTER_CONFIG.MAP_LAT},${MASTER_CONFIG.MAP_LNG}`}
            style={{ border: 'none', filter: 'grayscale(0.3) contrast(1.1) brightness(0.9)' }}
         />

         {/* GRID OVERLAY */}
         <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

         {/* 🔴 DYNAMIC MARKERS */}
         {devices.map((dev) => (
            <div key={dev.id} style={{ position: 'absolute', top: dev.top, left: dev.left, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: '0.4s' }}>
                <div style={{ padding: '4px 10px', background: 'rgba(15, 23, 42, 0.9)', color: 'white', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 900, marginBottom: '4px', whiteSpace: 'nowrap', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                   {dev.name.toUpperCase()}
                </div>
                <div style={{ position: 'relative' }}>
                   {/* PULSE EFFECT */}
                   <div className="animate-ping" style={{ position: 'absolute', inset: '-6px', background: dev.color, borderRadius: '50%', opacity: 0.4 }}></div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', position: 'relative' }}>
                       {(() => {
                         const DevIcon = dev.icon;
                         return <DevIcon size={18} color={dev.color} strokeWidth={3} />;
                       })()}
                    </div>
                </div>
            </div>
         ))}

         {/* 🧭 MAP CONTROLS */}
         <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="premium-card" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}><Satellite size={20} /></button>
            <button className="premium-card" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}><Layers size={20} /></button>
            <button className="premium-card" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}><Compass size={20} /></button>
         </div>

         <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(15, 23, 42, 0.8)', padding: '10px 16px', borderRadius: '14px', color: 'white', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, opacity: 0.6 }}>{MASTER_CONFIG.FARM_NAME.toUpperCase()} CENTER</p>
            <p style={{ fontSize: '0.85rem', fontWeight: 900 }}>22.975°N, 88.434°E</p>
         </div>
      </div>

      {/* 📊 2. FLEET STATUS */}
      <h3 className="section-title"><Activity size={18} /> Fleet Inventory</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '3rem' }}>
         {[
           { label: 'Active', val: '6', color: '#10b981' },
           { label: 'Offline', val: '0', color: '#94a3b8' },
           { label: 'Signal', val: 'Excel', color: '#0ea5e9' }
         ].map((s, i) => (
           <div key={i} className="premium-card" style={{ padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)' }}>{s.label}</p>
              <h4 style={{ fontSize: '1rem', fontWeight: 900, color: s.color }}>{s.val}</h4>
           </div>
         ))}
      </div>

      <div style={{ height: '40px' }}></div>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default MapView;
