import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import DataStateWrapper from '../components/DataStateWrapper';
import { 
  Sun, Clock, Activity, 
  Zap, Info, CloudSun,
  Timer, Database, RefreshCw,
  Lightbulb, ShieldCheck
} from 'lucide-react';

const SolarMonitoring = () => {
  const { sensorData, isDataLoading } = useApp();
  
  const lastUpdate = sensorData?.lastGlobalUpdate || new Date().toLocaleTimeString();

  const sensorCards = [
    { 
      title: 'Light Intensity', 
      value: sensorData?.solar?.lightIntensity || 0, 
      unit: 'Lux', 
      icon: Sun, 
      color: '#f59e0b',
      status: 'Active'
    },
    { 
      title: 'Exposure Duration', 
      value: sensorData?.solar?.exposureDuration || 0, 
      unit: 'hrs', 
      icon: Clock, 
      color: '#0ea5e9',
      status: 'Tracking'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 📡 LIVE DATA HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pulse-dot"></div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.05em' }}>SOLAR TELEMETRY HUB</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.6 }}>
            <Timer size={12} />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>{lastUpdate}</span>
         </div>
      </div>

      <DataStateWrapper isLoading={isDataLoading} hasData={!!sensorData}>
        {/* 📊 SOLAR SENSOR MATRIX */}
        <h3 className="section-title"><Lightbulb size={18} /> Solar Monitoring</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '3rem' }}
        >
          {sensorCards.map((card, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="premium-card" 
              style={{ padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ padding: '8px', background: `${card.color}15`, borderRadius: '10px' }}>
                     {(() => {
                       const CardIcon = card.icon;
                       return <CardIcon size={18} color={card.color} />;
                     })()}
                  </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.6 }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: card.color }}></div>
                    <span style={{ fontSize: '0.5rem', fontWeight: 900 }}>{card.status}</span>
                 </div>
              </div>

              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{card.title}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                 <h4 style={{ fontSize: '1.6rem', fontWeight: 900 }}>{card.value || '--'}</h4>
                 <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>{card.unit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </DataStateWrapper>

      {/* 🏁 INFO FOOTER */}
      <div className="premium-card" style={{ background: 'var(--bg-main)', border: '1px solid rgba(0,0,0,0.05)', padding: '1.25rem' }}>
         <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <ShieldCheck size={28} color="var(--primary)" />
            <div>
               <p style={{ fontSize: '0.75rem', fontWeight: 900 }}>Solar Exposure Monitoring</p>
               <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>Real-time LDR sensor data from Field node.</p>
            </div>
         </div>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default SolarMonitoring;
