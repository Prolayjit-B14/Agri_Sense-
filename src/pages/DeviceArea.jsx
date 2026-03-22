import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Radio, Cpu, CheckCircle2, XCircle, Signal, Wifi,
  Activity, Settings, Info, Smartphone, Battery,
  Zap, Database, Search, RefreshCw, Sprout, 
  Camera, Archive, AlertTriangle, AlertCircle,
  MoreVertical, Power, Play, Sliders, ShieldCheck
} from 'lucide-react';

const DeviceArea = () => {
  const { sensorData } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // 📡 DYNAMIC NODE DATA
  const initialNodes = [
    { 
      id: 'soil-01', name: 'Soil Node Alpha', type: 'Sensor', model: 'ESP32-S3',
      status: sensorData?.soil?.moisture > 0 ? 'Online' : 'Offline', 
      battery: 88, signal: -62, latency: '24ms', lastSeen: '2m ago',
      icon: Sprout, color: '#10b981'
    },
    { 
      id: 'cam-01', name: 'Vision Node S1', type: 'Camera', model: 'ESP32-CAM',
      status: 'Online', battery: 94, signal: -42, latency: '120ms', lastSeen: 'Just now',
      icon: Camera, color: '#3b82f6'
    },
    { 
      id: 'stor-01', name: 'Storage Vault', type: 'Hub', model: 'ESP32-C3',
      status: sensorData?.storage?.temp > 0 ? 'Online' : 'Offline', 
      battery: 76, signal: -108, latency: '850ms', lastSeen: '5m ago',
      icon: Archive, color: '#ef4444'
    },
    { 
      id: 'relay-01', name: 'Control Relay', type: 'Switch', model: 'ESP32-WROOM',
      status: 'Standby', battery: 100, signal: -58, latency: '18ms', lastSeen: '12m ago',
      icon: Zap, color: '#f59e0b'
    },
  ];

  const nodes = useMemo(() => initialNodes, [sensorData]);

  // 📊 CLUSTER METRICS
  const stats = {
    total: nodes.length,
    online: nodes.filter(n => n.status === 'Online').length,
    offline: nodes.filter(n => n.status === 'Offline').length,
    standby: nodes.filter(n => n.status === 'Standby').length,
    health: Math.round((nodes.filter(n => n.status !== 'Offline').length / nodes.length) * 100)
  };

  const CARD_STYLE = {
    background: 'white',
    borderRadius: '24px',
    padding: '1.25rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9',
    position: 'relative',
    overflow: 'hidden'
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(`Discovery Complete: ${nodes.length} nodes verified.`);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container" style={{ padding: '1.25rem', background: '#f8fafc' }}>
      
      {/* 🚀 1. CLUSTER OVERVIEW */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...CARD_STYLE, background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.6, letterSpacing: '0.1em' }}>CLUSTER INFRASTRUCTURE</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Node Matrix Alpha</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{stats.health}%</h2>
            <p style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.6 }}>SYSTEM HEALTH</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { label: 'Total', val: stats.total, color: 'white' },
            { label: 'Online', val: stats.online, color: '#10b981' },
            { label: 'Offline', val: stats.offline, color: '#ef4444' },
            { label: 'Idle', val: stats.standby, color: '#f59e0b' }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
               <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: s.color }}>{s.val}</h3>
               <p style={{ fontSize: '0.55rem', fontWeight: 800, opacity: 0.6 }}>{s.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 📡 2. NODE LISTING */}
      <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Database size={16} color="var(--primary)" /> ACTIVE NODES LIST
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2rem' }}
      >
        {nodes.map((node, i) => (
          <motion.div 
            key={node.id} 
            variants={itemVariants} 
            style={{ 
              ...CARD_STYLE, 
              border: node.status === 'Offline' ? '1px solid #fecaca' : '1px solid #f1f5f9',
              boxShadow: node.status === 'Offline' ? '0 10px 25px rgba(239, 68, 68, 0.05)' : '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '45px', height: '45px', borderRadius: '14px', 
                  background: `${node.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {(() => {
                    const NodeIcon = node.icon;
                    return <NodeIcon size={22} color={node.color} />;
                  })()}
                </div>
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#1e293b' }}>{node.name}</h4>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: node.status === 'Online' ? '#10b981' : node.status === 'Standby' ? '#f59e0b' : '#ef4444' }}></div>
                   </div>
                   <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8' }}>{node.model} • {node.type.toUpperCase()}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', margin: 0 }}>LATENCY</p>
                 <p style={{ fontSize: '0.75rem', fontWeight: 900, color: node.latency.includes('ms') && parseInt(node.latency) > 500 ? '#ef4444' : '#1e293b' }}>{node.latency}</p>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '12px', marginBottom: '15px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px', borderRadius: '12px' }}>
                  <Signal size={12} color="#3b82f6" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>{node.signal} dBm</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px', borderRadius: '12px' }}>
                  <Battery size={12} color="#10b981" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>{node.battery}%</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px', borderRadius: '12px' }}>
                  <RefreshCw size={12} color="#94a3b8" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b' }}>Seen: {node.lastSeen}</span>
               </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
               <button style={{ ...actionBtnStyle }} onClick={() => alert(`Pinging ${node.name}...`)}><RefreshCw size={14} /> Ping</button>
               <button style={{ ...actionBtnStyle }} onClick={() => alert(`Restarting ${node.name}...`)}><Power size={14} /> Restart</button>
               <button style={{ ...actionBtnStyle }} onClick={() => alert(`Configuring ${node.name}...`)}><Sliders size={14} /> Config</button>
            </div>

            {/* Warning integration */}
            {node.status === 'Offline' && (
              <div style={{ 
                position: 'absolute', top: 0, right: 0, 
                background: '#ef4444', color: 'white', 
                padding: '2px 8px', borderBottomLeftRadius: '10px',
                fontSize: '0.55rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <AlertCircle size={10} /> CONNECTION LOST
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* 🔍 3. SCAN BUTTON */}
      <motion.div style={{ position: 'relative' }}>
          <motion.button 
            onClick={handleScan}
            disabled={isScanning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary" 
            style={{ 
              width: '100%', height: '56px', borderRadius: '16px', 
              background: isScanning ? '#cbd5e1' : 'linear-gradient(135deg, var(--primary), #065f46)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              border: 'none', color: 'white', fontWeight: 900, cursor: isScanning ? 'not-allowed' : 'pointer'
            }}
          >
            <motion.div
              animate={isScanning ? { rotate: 360 } : {}}
              transition={isScanning ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
            >
              <Search size={20} />
            </motion.div>
            {isScanning ? 'SCANNING INFRASTRUCTURE...' : 'DISCOVER NEW NODES'}
          </motion.button>
          
          <AnimatePresence>
            {scanResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ 
                  marginTop: '15px', background: '#ecfdf5', border: '1px solid #bbf7d0', 
                  color: '#065f46', padding: '12px', borderRadius: '12px', textAlign: 'center',
                  fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                <ShieldCheck size={16} /> {scanResult}
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>

      <div style={{ height: '40px' }}></div>
      <style>{`
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .node-pulse { animation: pulse 2s infinite; }
      `}</style>
    </div>
  );
};

const actionBtnStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '8px',
  fontSize: '0.65rem',
  fontWeight: 800,
  color: '#475569',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  cursor: 'pointer',
  transition: '0.2s'
};

export default DeviceArea;
