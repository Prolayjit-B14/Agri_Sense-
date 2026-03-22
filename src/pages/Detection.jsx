import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Camera, Maximize, Save, 
  Play, Radio, Settings,
  Activity, Shield, Bell,
  ChevronLeft, Smartphone,
  Target, Info, RefreshCw,
  Bug, Bird, Dog, Zap,
  Circle, Square, Scan, 
  Timer, Cpu, Wifi, Video,
  Volume2, VolumeX, Eye, EyeOff,
  AlertTriangle, Flame, Wind,
  ChevronRight, Clock, Box
} from 'lucide-react';

const Detection = () => {
  const { recommendations } = useApp();
  const [isAiOn, setIsAiOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [activeDetections, setActiveDetections] = useState([
    { id: 1, type: 'Locust', confidence: 94, x: '20%', y: '30%', w: '120px', h: '120px', severity: 'High' },
    { id: 2, type: 'Pigeon', confidence: 88, x: '60%', y: '45%', w: '80px', h: '80px', severity: 'Med' }
  ]);
  const [timeline, setTimeline] = useState([
    { id: 1, event: 'Locust Cluster Identified', time: '17:18:45', category: 'Pest', icon: Bug, color: '#ef4444' },
    { id: 2, event: 'Bird Intrusion Detected', time: '17:16:12', category: 'Animal', icon: Bird, color: '#f59e0b' },
    { id: 3, event: 'Stray Dog Near Perimeter', time: '17:10:05', category: 'Security', icon: Dog, color: '#3b82f6' },
  ]);

  const CARD_STYLE = {
    background: 'white',
    borderRadius: '24px',
    padding: '1.25rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9',
    position: 'relative',
    overflow: 'hidden'
  };

  const actionControls = [
    { label: 'REPELLENT', icon: Wind, color: '#3b82f6', action: 'Activating Sonic Repellent...' },
    { label: 'ALARM', icon: Bell, color: '#ef4444', action: 'Triggering Perimeter Alarm...' },
    { label: 'AUTO SPRAY', icon: Flame, color: '#10b981', action: 'Initializing Targeted Spray...' }
  ];

  return (
    <div className="page-container" style={{ padding: '1.25rem', background: '#f8fafc' }}>
      
      {/* 📹 1. NEURAL MONITORING & LIVE FEED */}
      <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', background: '#000', marginBottom: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: '2px solid #1e293b' }}>
        
        {/* Placeholder for Camera Feed (Visual Simulation) */}
        <div style={{ height: '350px', position: 'relative' }}>
           <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
           />
           
           {/* 🎯 AI SCANNING LINE */}
           <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }} 
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', zIndex: 10, boxShadow: '0 0 15px var(--primary)' }}
           />

           {/* 🧬 AI BBOX OVERLAYS */}
           <AnimatePresence>
             {isAiOn && activeDetections.map((det) => (
                <motion.div 
                  key={det.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ 
                    position: 'absolute', left: det.x, top: det.y, width: det.w, height: det.h, 
                    border: `2px solid ${det.severity === 'High' ? '#ef4444' : '#f59e0b'}`, 
                    borderRadius: '8px', zIndex: 15,
                    boxShadow: `0 0 20px ${det.severity === 'High' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`
                  }}
                >
                  <div style={{ position: 'absolute', top: '-24px', left: 0, background: det.severity === 'High' ? '#ef4444' : '#f59e0b', color: 'white', fontSize: '0.6rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                    {det.type.toUpperCase()} {det.confidence}%
                  </div>
                  {/* Target Corners */}
                  <div style={{ position: 'absolute', top: -2, left: -2, width: '10px', height: '10px', borderTop: '2px solid white', borderLeft: '2px solid white' }} />
                  <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', borderTop: '2px solid white', borderRight: '2px solid white' }} />
                  <div style={{ position: 'absolute', bottom: -2, left: -2, width: '10px', height: '10px', borderBottom: '2px solid white', borderLeft: '2px solid white' }} />
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: '10px', height: '10px', borderBottom: '2px solid white', borderRight: '2px solid white' }} />
                </motion.div>
             ))}
           </AnimatePresence>

           {/* 🛠️ NEURAL MONITORING INTERFACE */}
           <div style={{ position: 'absolute', inset: 0, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 20 }}>
              
              {/* TOP INTERFACE BAR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div> LIVE REC
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', color: '#10b981', padding: '4px 10px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 900, border: '1px solid rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(4px)' }}>
                       {isAiOn ? 'NEURAL ENGINE: ACTIVE' : 'NEURAL ENGINE: IDLE'}
                    </div>
                 </div>
                 <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.8)', fontSize: '0.6rem', fontWeight: 800 }}>
                    <p>FPS: 24.2</p>
                    <p>LATENCY: 12ms</p>
                    <p>BUF: 0.1s</p>
                 </div>
              </div>

              {/* STREAM CONTROLS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setIsRecording(!isRecording)} style={{ ...controlBtnStyle, color: isRecording ? '#ef4444' : 'white' }}><Video size={16} /></button>
                    <button onClick={() => setIsAudioOn(!isAudioOn)} style={{ ...controlBtnStyle }} >{isAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
                    <button onClick={() => setIsAiOn(!isAiOn)} style={{ ...controlBtnStyle, color: isAiOn ? '#10b981' : 'white' }}>{isAiOn ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                 </div>
                 <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                    <p style={{ fontSize: '0.5rem', fontWeight: 800, color: '#94a3b8', margin: 0 }}>UAV-LINK STATUS</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <Wifi size={12} color="#10b981" />
                       <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white' }}>SIGNAL OPTIMAL</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>

      {/* 📊 2. ACTION CONTROLS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '2rem' }}>
         {actionControls.map((ctrl, i) => (
           <motion.button 
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert(ctrl.action)}
            style={{ 
              background: 'white', border: `1px solid ${ctrl.color}30`, borderRadius: '18px', 
              padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              boxShadow: `0 4px 15px ${ctrl.color}10`
            }}
           >
              {(() => {
                const CtrlIcon = ctrl.icon;
                return <CtrlIcon size={20} color={ctrl.color} />;
              })()}
              <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#1e293b' }}>{ctrl.label}</span>
           </motion.button>
         ))}
      </div>

      {/* 📉 3. SMART STATS */}
      <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
         <Activity size={16} color="var(--primary)" /> DETECTION TELEMETRY
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2rem' }}>
         <div style={{ ...CARD_STYLE }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
               <Bug size={18} color="#ef4444" />
               <span style={{ background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '6px', fontSize: '0.5rem', fontWeight: 900 }}>CRITICAL</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>12</h3>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800 }}>PEST CLUSTERS</p>
         </div>
         <div style={{ ...CARD_STYLE }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
               <Target size={18} color="#10b981" />
               <span style={{ background: '#dcfce7', color: '#10b981', padding: '2px 8px', borderRadius: '6px', fontSize: '0.5rem', fontWeight: 900 }}>STABLE</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>98.4%</h3>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800 }}>AI ACCURACY</p>
         </div>
      </div>

      {/* 📅 4. RECENT EVENTS TIMELINE */}
      <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
         <Clock size={16} color="var(--primary)" /> RECENT DETECTION LOGS
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
         {timeline.map((item) => (
           <motion.div 
            key={item.id} 
            whileHover={{ x: 5 }}
            style={{ ...CARD_STYLE, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}
           >
               <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const TimelineIcon = item.icon;
                    return <TimelineIcon size={20} color={item.color} />;
                  })()}
               </div>
              <div style={{ flex: 1 }}>
                 <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b' }}>{item.event}</h4>
                 <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>{item.category} • {item.time}</p>
              </div>
              <ChevronRight size={18} color="#cbd5e1" />
           </motion.div>
         ))}
      </div>

      <style>{`
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.4; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

const controlBtnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
  transition: '0.2s'
};

export default Detection;
