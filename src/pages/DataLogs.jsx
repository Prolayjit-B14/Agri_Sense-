import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line,
  AreaChart, Area
} from 'recharts';
import { 
  Database, Download, Filter, 
  Calendar, Activity, Terminal,
  ShieldCheck, RefreshCw, Trash2
} from 'lucide-react';

const DataLogs = () => {
  const { sensorHistory } = useApp();
  const [logs, setLogs] = useState([]);
  const logEndRef = useRef(null);

  // 🛰️ Real-Time Event Streamer (Connected to Master Payload)
  useEffect(() => {
    if (sensorData && (sensorData.soil?.moisture !== null || sensorData.weather?.temp !== null)) {
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `[${timestamp}] MQTT_PACKET_RCV <- agrisense/field_a/sensors (Master Payload Verified)`;
      setLogs(prev => [...prev.slice(-100), newLog]);
    }
  }, [sensorData]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>

      {/* 💻 1. LIVE LOG STREAM (CONSOLE) */}
      <h3 className="section-title"><Terminal size={18} /> Forensic Log Stream</h3>
      <div className="premium-card" style={{ 
        background: '#0f172a', border: '1px solid #1e293b', padding: '1.25rem', marginBottom: '2.5rem',
        height: '220px', display: 'flex', flexDirection: 'column'
      }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#475569', letterSpacing: '0.1em' }}>SERIAL-MONITOR-01</span>
         </div>
         <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.7rem', color: '#10b981', lineHeight: 1.6 }}>
            {logs.map((log, i) => (
               <div key={i} className="animate-fade-in">{' > '} {log}</div>
            ))}
            <div ref={logEndRef} />
         </div>
      </div>

      {/* 📊 2. CORRELATION HUB */}
      <h3 className="section-title"><Activity size={18} /> Telemetry Correlation</h3>
      <div className="premium-card" style={{ marginBottom: '2.5rem', padding: '1.25rem' }}>
         <div style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={sensorHistory.slice(-20)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="time" hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="soil.moisture" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={3} />
                  <Area type="monotone" dataKey="soil.temp" stroke="var(--danger)" fill="var(--danger)" fillOpacity={0.1} strokeWidth={3} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 📊 3. EXPORT / ACTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
         <button className="btn-primary" style={{ height: '56px' }}>
            <Download size={20} /> CSV DUMP
         </button>
         <button className="btn-actuator off" style={{ height: '56px' }}>
            <RefreshCw size={20} /> RE-SYNC
         </button>
      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default DataLogs;
