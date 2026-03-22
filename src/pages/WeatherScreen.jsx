import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Sun, Cloud, CloudRain, Wind, 
  Thermometer, Droplets, Sunrise, Sunset, 
  Gauge, CloudLightning, Activity, ChevronRight
} from 'lucide-react';

const WeatherScreen = () => {
  const navigate = useNavigate();
  const { sensorData, apiWeather, lastGlobalUpdate } = useApp();
  
  // 🛰️ Hybrid Data Extraction
  const apiData = apiWeather || {};
  const fieldData = sensorData?.weather || {};
  
  // 🧩 Comparison Logic
  const apiTemp = parseFloat(apiData.temp);
  const fieldTemp = parseFloat(fieldData.temp);
  const tempDiff = (!isNaN(fieldTemp) && !isNaN(apiTemp)) ? (fieldTemp - apiTemp).toFixed(1) : null;

  // 🛡️ Data Integrity Guards
  const isApiAvailable = apiData.temp && apiData.temp !== 0;
  const isSensorAvailable = fieldData.temp && fieldData.temp !== 0;

  const val = (v) => (v !== null && v !== undefined && v !== 0 ? v : null);
  
  const steer = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n.toFixed(1);
  };

  const getConditionIcon = (cond) => {
    const c = cond?.toLowerCase() || '';
    if (c.includes('rain')) return <CloudRain size={48} color="white" />;
    if (c.includes('cloud')) return <Cloud size={48} color="white" />;
    return <Sun size={48} color="white" />;
  };

  return (
    <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.25rem', paddingBottom: '80px' }}>
      
      {/* ─── 0. HERO CARD (VIBRANT FOCAL) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
          borderRadius: '32px', padding: '2rem 1.5rem', marginBottom: '2.5rem',
          color: 'white', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(5, 150, 105, 0.3)'
        }}
      >
        {/* Decorative Glass Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '180px', height: '180px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        {/* 1. Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.85, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Field Synergy
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, lineHeight: 1.1 }}>{isApiAvailable ? (apiData.condition || 'Clear Sky') : 'Offline'}</h3>
          </div>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Cloud size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* 2. Focal Metric Row */}
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>{isApiAvailable ? steer(apiData.temp) : '--'}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, opacity: 0.9 }}>°C</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, opacity: 0.9, margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Local Forecast Temperature
          </p>
        </div>

        {/* 3. Summary Row */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 10px', 
          paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.15)',
          position: 'relative', zIndex: 1
        }}>
          {[
            { l: 'Humidity', v: (isApiAvailable && apiData.humidity) ? `${apiData.humidity}%` : '--' },
            { l: 'Wind', v: (isApiAvailable && apiData.windSpeed) ? `${apiData.windSpeed}k/h` : '--' },
            { l: 'Air Quality', v: (isApiAvailable && apiData.aqi) ? (['--', 'Good', 'Fair', 'Mod', 'Poor', 'Severe'][apiData.aqi] || '--') : '--' },
            { l: 'Sunrise', v: (isApiAvailable && apiData.sunrise) ? apiData.sunrise : '--' },
            { l: 'Sunset', v: (isApiAvailable && apiData.sunset) ? apiData.sunset : '--' },
            { l: 'Feels Like', v: (isApiAvailable && apiData.feelsLike) ? `${steer(apiData.feelsLike)}°C` : '--' }
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '0.55rem', fontWeight: 900, opacity: 0.7, margin: 0, textTransform: 'uppercase' }}>{s.l}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 950, margin: 0 }}>{s.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 📡 2. SENSOR WEATHER SECTION (LOCAL DATA) */}
      <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
        Field Sensor Data
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '2.5rem' }}>
         <motion.div 
           whileTap={{ scale: 0.98 }}
           style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
         >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Thermometer size={18} color="#ef4444" />
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Temp</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
               <span style={{ fontSize: '1.7rem', fontWeight: 950, color: isSensorAvailable ? '#1e293b' : '#e2e8f0' }}>{isSensorAvailable ? steer(fieldData.temp) : '--'}</span>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>°C</span>
            </div>
            <p style={{ fontSize: '0.6rem', fontWeight: 900, color: isSensorAvailable ? '#10B981' : '#cbd5e1', margin: '14px 0 0 0', textTransform: 'uppercase' }}>
            </p>
         </motion.div>

         <motion.div 
           whileTap={{ scale: 0.98 }}
           style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
         >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={18} color="#3b82f6" />
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Humidity</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
               <span style={{ fontSize: '1.7rem', fontWeight: 950, color: isSensorAvailable ? '#1e293b' : '#e2e8f0' }}>{isSensorAvailable ? steer(fieldData.humidity) : '--'}</span>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>%</span>
            </div>
         </motion.div>

         {/* 💡 LDR Solar Intensity */}
         <motion.div 
           whileTap={{ scale: 0.98 }}
           style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
         >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sun size={18} color="#f59e0b" />
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Solar Intensity</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
               <span style={{ fontSize: '1.7rem', fontWeight: 950, color: isSensorAvailable ? '#1e293b' : '#e2e8f0' }}>{isSensorAvailable ? steer(fieldData.lightIntensity) : '--'}</span>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>LUX</span>
            </div>
            <p style={{ fontSize: '0.55rem', fontWeight: 900, color: '#10B981', marginTop: '8px', textTransform: 'uppercase' }}></p>
         </motion.div>

         {/* 🌧️ Rain Sensor (Restored) */}
         <motion.div 
           whileTap={{ scale: 0.98 }}
           style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
         >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloudRain size={18} color="#0ea5e9" />
              </div>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Rainfall</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
               <span style={{ fontSize: '1.7rem', fontWeight: 950, color: val(fieldData.rainLevel) ? '#1e293b' : '#e2e8f0' }}>
                 {val(fieldData.rainLevel) ? steer(fieldData.rainLevel) : '--'}
               </span>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>%</span>
            </div>
            <p style={{ fontSize: '0.55rem', fontWeight: 900, color: '#3B82F6', marginTop: '8px', textTransform: 'uppercase' }}></p>
         </motion.div>
      </div>

      {/* 💡 3. OPTIONAL COMPARISON (SMART UX) */}
      {!!isApiAvailable && !!isSensorAvailable && tempDiff !== null && (
        <div style={{ 
          background: '#f8fafc', borderRadius: '16px', padding: '12px 16px', 
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
          border: '1px dashed #e2e8f0'
        }}>
          <CloudLightning size={14} color="#10b981" />
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', margin: 0 }}>
            Field temp is <span style={{ color: '#10b981', fontWeight: 900 }}>{parseFloat(tempDiff) > 0 ? `+${tempDiff}` : tempDiff}°C</span> {parseFloat(tempDiff) > 0 ? 'higher' : 'lower'} than forecast
          </p>
        </div>
      )}

      {/* ─── 1. ATMOSPHERIC DETAILS (PRIMARY GRID) ─── */}
      <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
        Atmospheric Conditions
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2.5rem' }}>
          {[
            { label: 'Wind Speed', val: apiData.windSpeed, unit: 'km/h', icon: Wind, color: '#6366F1', bg: '#EEF2FF' },
            { label: 'Pressure', val: apiData.pressure, unit: 'hPa', icon: Gauge, color: '#8B5CF6', bg: '#F5F3FF' },
            { label: 'Visibility', val: '10', unit: 'km', icon: Activity, color: '#10B981', bg: '#F0FDF4' },
            { label: 'Feels Like', val: steer(apiData.feelsLike), unit: '°C', icon: Sun, color: '#F59E0B', bg: '#FFFBEB' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Icon size={18} color={item.color} />
                  </div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.label}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                   <span style={{ fontSize: '1.7rem', fontWeight: 950, color: isApiAvailable ? '#1E293B' : '#E2E8F0' }}>{isApiAvailable ? item.val : '--'}</span>
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', marginLeft: '2px' }}>{item.unit}</span>
                </div>
              </div>
            );
          })}
      </div>

      {/* ─── 2. CONDITION SUMMARY (SYSTEMIC LIST) ─── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '4px' }}>
          Condition Summary
        </h3>
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', padding: '4pt', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          {[
            { label: 'Forecast Context', status: apiData.condition || '--', color: '#10B981' },
            { label: 'Visibility', status: 'Optimal', color: '#10B981' },
            { label: 'UV Index', status: 'Moderate', color: '#F59E0B' },
            { label: 'Field Delta', status: tempDiff ? `${tempDiff}°C` : '--', color: parseFloat(tempDiff) > 0 ? '#10B981' : '#3B82F6' }
          ].map((c, i, arr) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '1.15rem 1.25rem',
              borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none' 
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569' }}>{c.label}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 950, color: c.color }}>
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA (Scrollable) ──────────── */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/analytics')}
        style={{
          width: '100%', padding: '1.1rem',
          borderRadius: '100px',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          color: 'white', border: 'none',
          fontSize: '0.9rem', fontWeight: 950,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 24px -4px rgba(5,150,105,0.35)', cursor: 'pointer',
          marginTop: '1.5rem'
        }}
      >
        View Weather Analytics <ChevronRight size={16} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default WeatherScreen;
