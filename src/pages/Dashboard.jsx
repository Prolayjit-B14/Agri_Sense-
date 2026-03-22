import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, Droplets, CloudRain, Archive, 
  Wind, Sun, Zap, TrendingUp, AlertTriangle, 
  CheckCircle2, Camera, Info, Power, Settings as SettingsIcon,
  Play, Pause, RefreshCw, MapPin, Clock, 
  Thermometer, Droplet, Gauge, Activity, Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// 🌿 1. ICON SYSTEM (CONSISTENT STROKE)
const IconBox = ({ icon: Icon, color, size = 18, background = 'rgba(255,255,255,0.8)' }) => (
  <div style={{ 
    width: '36px', height: '36px', borderRadius: '12px', background,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color, boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
  }}>
    <Icon size={size} strokeWidth={2.2} />
  </div>
);

// 🧠 2. SYSTEM INSIGHT CARD (ACTIONABLE)
const SystemInsightCard = ({ healthScore, recommendations, status }) => {
  const isWarning = healthScore < 70;
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white',
        borderRadius: '24px', padding: '1.5rem', marginBottom: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9',
        position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
        <div style={{ padding: '6px 12px', borderRadius: '10px', background: isWarning ? '#FEF2F2' : '#F0FDF4', color: isWarning ? '#EF4444' : '#10B981', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
          System Status: {isWarning ? 'WARNING' : 'STABLE'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: status.soil === 'Warning' ? '#EF4444' : '#10B981' }} />
          <span>Soil moisture below optimal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: status.water === 'Offline' ? '#94A3B8' : '#10B981' }} />
          <span>Irrigation offline</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: status.weather === 'Stable' ? '#10B981' : '#F59E0B' }} />
          <span>Weather stable</span>
        </div>
      </div>
    </motion.section>
  );
};

// 🌡 3. QUICK SUMMARY STRIP
const QuickSummaryStrip = ({ sensorData }) => {
  const stats = [
    { icon: Thermometer, value: sensorData?.weather?.temp ? `${Number(sensorData.weather.temp).toFixed(1)}°C` : '--', color: '#EF4444' },
    { icon: Droplet, value: sensorData?.weather?.humidity ? `${Number(sensorData.weather.humidity).toFixed(1)}%` : '--', color: '#0EA5E9' },
    { icon: Wind, value: sensorData?.weather?.windSpeed ? `${Number(sensorData.weather.windSpeed).toFixed(1)} km/h` : '--', color: '#64748B' },
    { icon: Sun, value: sensorData?.weather?.lightIntensity > 500 ? 'High' : 'Normal', color: '#F59E0B' },
  ];

  return (
    <div style={{ 
      display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 0 20px 0',
      scrollbarWidth: 'none', msOverflowStyle: 'none'
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{ 
          background: 'white', padding: '8px 12px', borderRadius: '14px',
          display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9'
        }}>
          <stat.icon size={14} color={stat.color} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

// 🟦 4. SYSTEM OVERVIEW CARD (L/R SPLIT)
const SystemOverviewCard = ({ score, status }) => {
  const isWarning = score < 70;
  
  const systems = [
    { label: 'Soil', val: status.soil, color: status.soil === 'Warning' ? '#EF4444' : '#10B981' },
    { label: 'Water', val: status.water, color: status.water === 'Offline' ? '#94A3B8' : '#10B981' },
    { label: 'Weather', val: status.weather, color: '#10B981' },
    { label: 'Storage', val: status.storage, color: status.storage === 'Offline' ? '#94A3B8' : '#10B981' },
    { label: 'Hardware', val: status.hw, color: status.hw === 'Syncing' ? '#F59E0B' : '#10B981' },
  ];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
       <h3 style={{ fontSize: '0.75rem', fontWeight: 950, color: '#94A3B8', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Overview</h3>
       <div style={{ 
         background: 'white', borderRadius: '24px', padding: '1.5rem',
         display: 'flex', gap: '20px', alignItems: 'stretch', boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
         border: '1px solid #f1f5f9'
       }}>
         {/* Left Side: Score */}
         <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #f1f5f9', paddingRight: '15px' }}>
           <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>STATUS</div>
           <div style={{ fontSize: '1.1rem', fontWeight: 950, color: isWarning ? '#EF4444' : '#10B981', marginBottom: '10px' }}>{isWarning ? 'WARNING' : 'STABLE'}</div>
           <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>Score: <span style={{ color: '#1e293b', fontWeight: 950 }}>{score} / 100</span></div>
         </div>
         
         {/* Right Side: Indicators */}
         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
           {systems.map((s, i) => (
             <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>{s.label}:</span>
               <span style={{ fontSize: '0.75rem', fontWeight: 950, color: s.color }}>{s.val}</span>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};

// 📊 5. SENSOR GRID CARD
const SensorCard = ({ title, value, icon: Icon, color, status, onClick }) => {
  const isConnected = status === 'CONNECTED';
  
  return (
    <motion.div 
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{ 
        background: 'white', borderRadius: '24px', padding: '1.25rem',
        border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          width: '42px', height: '42px', borderRadius: '14px', 
          background: `${color}10`, display: 'flex', alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Icon size={20} color={color} strokeWidth={2.5} />
        </div>
        <div style={{ 
          fontSize: '0.55rem', fontWeight: 900, padding: '4px 8px', borderRadius: '6px',
          background: isConnected ? '#ECFDF5' : '#FEF2F2',
          color: isConnected ? '#10B981' : '#EF4444',
          textTransform: 'uppercase', letterSpacing: '0.04em'
        }}>
          {status}
        </div>
      </div>
      <h4 style={{ margin: 0, fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>{title}</h4>
      <div style={{ fontSize: '1.3rem', fontWeight: 950, color: '#1E293B', marginTop: '4px' }}>
        {value}
      </div>
    </motion.div>
  );
};

// 📱 MAIN DASHBOARD COMPONENT
const Dashboard = () => {
  const { 
    sensorData, farmHealthScore, recommendations,
    toggleActuator, actuators, ACTUATORS, mqttStatus,
    apiWeather, user
  } = useApp();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const isPumpActive = actuators ? actuators[ACTUATORS?.PUMP] : false;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' });

  // Guard for real data
  const val = (v) => (v !== null && v !== undefined && v !== 0 && v !== '--' ? v : null);

  return (
    <div style={{ 
      padding: '1.25rem', paddingBottom: '30px', 
      maxWidth: '100vw', overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      {/* 🌅 ELITE PREMIUM GREETING (CARDLESS) */}
      <section style={{ marginBottom: '2rem', padding: '0 4pt' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#64748B', margin: 0, lineHeight: 1.2 }}>
              {(() => {
                const hour = currentTime.getHours();
                if (hour < 12) return 'Good Morning,';
                if (hour < 17) return 'Good Afternoon,';
                if (hour < 21) return 'Good Evening,';
                return 'Good Night,';
              })()}
            </h1>
            <h2 style={{ fontSize: '2rem', fontWeight: 950, color: '#10B981', margin: '4px 0 12px 0', letterSpacing: '-0.04em' }}>
              {user?.name || 'Guest Farmer'}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 800 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                 <MapPin size={14} color="#10B981" /> Kalyani • Field A-1
              </span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currentTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toLowerCase().replace(' ', '')}
                <Clock size={14} style={{ marginLeft: '4px' }} /> 
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/:(?=[^:]*$)/, '.')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 SYSTEM INSIGHT CARD */}
      <SystemInsightCard 
        healthScore={farmHealthScore} 
        recommendations={recommendations} 
        status={{
          soil: (sensorData.soil?.moisture === null) ? 'Offline' : (sensorData.soil.healthIndex > 70 ? 'Stable' : 'Warning'),
          water: (sensorData.water?.level === null) ? 'Offline' : (sensorData.water.level > 20 ? 'Stable' : 'Low'),
          weather: 'Stable'
        }}
      />

      {/* 📊 SYSTEM OVERVIEW */}
      <SystemOverviewCard 
        score={farmHealthScore} 
        status={{ 
          soil: (sensorData.soil?.moisture === null) ? 'Offline' : (sensorData.soil.healthIndex > 70 ? 'Good' : 'Warning'), 
          water: (sensorData.water?.level === null) ? 'Offline' : (sensorData.water.level > 20 ? 'Good' : 'Warning'), 
          weather: 'Stable', 
          storage: (sensorData.storage?.temp === null) ? 'Offline' : 'Good',
          hw: mqttStatus === 'connected' ? 'Good' : 'Syncing'
        }} 
      />

      {/* 📊 SENSOR GRID (CORE) */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
        gap: '0.85rem', marginBottom: '1.5rem',
        width: '100%'
      }}>
        <SensorCard 
          title="Soil" value={val(sensorData?.soil?.moisture) ? `${Number(sensorData.soil.moisture).toFixed(1)}%` : '--'} 
          icon={Sprout} color="#16A34A" status={val(sensorData?.soil?.moisture) ? "CONNECTED" : "OFFLINE"} 
          onClick={() => navigate('/soil-monitoring')}
        />
        <SensorCard 
          title="Irrigation" value={val(sensorData?.water?.level) ? `${Number(sensorData.water.level).toFixed(1)}%` : '--'} 
          icon={Droplets} color="#0EA5E9" status={val(sensorData?.water?.level) ? "CONNECTED" : "OFFLINE"} 
          onClick={() => navigate('/irrigation')}
        />
        <SensorCard 
          title="Storage" value={val(sensorData?.storage?.temp) ? `${Number(sensorData.storage.temp).toFixed(1)}°C` : '--'} 
          icon={Archive} color="#D946EF" status={val(sensorData?.storage?.temp) ? "CONNECTED" : "OFFLINE"} 
          onClick={() => navigate('/storage-hub')}
        />
        <SensorCard 
          title="Weather" 
          value={val(sensorData?.weather?.temp) ? `${Number(sensorData.weather.temp).toFixed(1)}°C` : '--'} 
          icon={CloudRain} color="#F59E0B" status={val(sensorData?.weather?.temp) ? "CONNECTED" : "OFFLINE"} 
          onClick={() => navigate('/weather')}
        />
        <SensorCard 
          title="Solar" value={val(sensorData?.solar?.power) ? `${Number(sensorData.solar.power).toFixed(1)} W` : '--'} 
          icon={Sun} color="#FBBF24" status={val(sensorData?.solar?.power) ? "CONNECTED" : "OFFLINE"} 
          onClick={() => navigate('/solar-monitoring')}
        />
        <SensorCard 
          title="Market" value="Live" 
          icon={Activity} color="#10B981" status="CONNECTED" 
          onClick={() => navigate('/market-insights')}
        />
      </div>

      {/* 📷 LIVE VISION CARD */}
      <section style={{ 
        background: '#0F172A', borderRadius: '24px', padding: '1.5rem', 
        marginBottom: '1.5rem', color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={18} color="#94A3B8" />
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, letterSpacing: '0.02em' }}>Live Vision</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 900 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#64748B' }} />
            OFFLINE
          </div>
        </div>
        <div style={{ 
          height: '140px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '12px', border: '1px dashed rgba(255,255,255,0.1)'
        }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8' }}>No Camera Connected</p>
          <button style={{ 
            background: 'white', color: '#0F172A', border: 'none', padding: '8px 16px',
            borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800
          }}>Tap to setup camera</button>
        </div>
      </section>

      {/* 🎛 ACTIVE CONTROLS */}
      <section style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#1E293B', marginBottom: '1.5rem' }}>Active Controls</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <IconBox icon={Power} color={isPumpActive ? '#10B981' : '#64748B'} background={isPumpActive ? '#ECFDF5' : '#F8FAFC'} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B' }}>Irrigation Pump</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: isPumpActive ? '#10B981' : '#64748B' }}>
                Status: {isPumpActive ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
          <div 
            onClick={() => toggleActuator(ACTUATORS.PUMP)}
            style={{ 
              width: '52px', height: '28px', background: isPumpActive ? '#10B981' : '#E2E8F0',
              borderRadius: '20px', padding: '3px', cursor: 'pointer', transition: '0.3s'
            }}
          >
            <motion.div 
              animate={{ x: isPumpActive ? 24 : 0 }}
              style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <IconBox icon={SettingsIcon} color="#64748B" background="#F8FAFC" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B' }}>System Mode</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#16A34A' }}>AUTOMATED MODE</div>
            </div>
          </div>
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '10px', padding: '4px' }}>
            <button style={{ padding: '6px 12px', borderRadius: '7px', border: 'none', background: 'white', color: '#16A34A', fontSize: '0.65rem', fontWeight: 900, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>AUTO</button>
            <button style={{ padding: '6px 12px', borderRadius: '7px', border: 'none', background: 'transparent', color: '#64748B', fontSize: '0.65rem', fontWeight: 900 }}>MANUAL</button>
          </div>
        </div>
      </section>

      {/* 🧾 FOOTER */}
      <footer style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          System Online • v6.2.0 Elite • Last Sync: 2s ago
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
