import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sprout, Droplets, Archive, CloudRain, Sun, 
  ExternalLink 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, Tooltip, BarChart, Bar, Cell
} from 'recharts';

// 🎨 DESIGN SYSTEM CONSTANTS
const COLORS = {
  soil: '#16A34A',
  water: '#0EA5E9',
  energy: '#F59E0B',
  env: '#EF4444',
  advanced: '#8B5CF6',
  bg: '#F8FAFC',
  card: '#FFFFFF'
};

const AnalyticsHub = () => {
  const { sensorData, sensorHistory } = useApp();
  const [activeTab, setActiveTab] = useState('Soil');
  const navigate = useNavigate();
  
  // ─── DATA PREPROCESSING ──────────────────────────────────────────────────
  
  const chartData = useMemo(() => {
    if (!sensorHistory || sensorHistory.length === 0) return [];
    return sensorHistory.filter(h => h && h.time).map(h => ({
      time: h.time,
      moisture: Number(h.soil?.moisture || 0).toFixed(1),
      soilTemp: Number(h.soil?.temp || 0).toFixed(1),
      ph: Number(h.soil?.ph || 0).toFixed(1),
      n: h.soil?.npk?.n || 0,
      p: h.soil?.npk?.p || 0,
      k: h.soil?.npk?.k || 0,
      flow: Number(h.water?.flowRate || 0).toFixed(1),
      usage: Number(h.water?.totalUsage || 0).toFixed(1),
      level: Number(h.water?.tankLevel || 0).toFixed(1),
      temp: Number(h.weather?.temp || 0).toFixed(1),
      humidity: Number(h.weather?.humidity || 0).toFixed(1),
      solar: Number((h.weather?.lightIntensity || 0)).toFixed(0),
      rain: h.weather?.isRaining ? 100 : 0,
      power: Number(h.solar?.power || 0).toFixed(1),
      gas: Number(h.storage?.mq135 || 0).toFixed(1),
      mq135: Number(h.storage?.mq135 || 0).toFixed(1),
      storageTemp: Number(h.storage?.temp || 0).toFixed(1),
      storageHumid: Number(h.storage?.humidity || 0).toFixed(1),
    }));
  }, [sensorHistory]);

  const TabButton = ({ id, label, icon: Icon, color }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '12px 18px', borderRadius: '16px', border: 'none',
        display: 'flex', alignItems: 'center', gap: '8px',
        background: activeTab === id ? color : 'white',
        color: activeTab === id ? 'white' : '#64748B',
        fontWeight: 800, fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer',
        boxShadow: activeTab === id ? `0 8px 16px ${color}30` : '0 2px 8px rgba(0,0,0,0.02)',
        transition: 'none'
      }}
    >
      <Icon size={14} strokeWidth={2.5} />
      {label}
    </button>
  );

  const getDomain = (key) => {
    const domains = {
      moisture: [0, 100], level: [0, 100], storageHumid: [0, 100], humidity: [0, 100],
      soilTemp: [10, 50], temp: [10, 50], storageTemp: [0, 40],
      ph: [0, 14], n: [0, 250], p: [0, 150], k: [0, 300],
      flow: [0, 60], usage: [0, 1000],
      solar: [0, 2000], power: [0, 3000], rain: [0, 100],
      gas: [0, 100], mq135: [0, 100]
    };
    return domains[key] || ['auto', 'auto'];
  };

  const ChartCard = ({ title, type = 'line', data, dataKey, color, unit = '', insight, barData }) => (
    <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px 0' }}>{insight || "Live Field Sensor Streaming..."}</p>
        <h4 style={{ fontSize: '1rem', fontWeight: 950, color: '#1E293B', margin: 0 }}>{title}</h4>
      </div>

      <div style={{ height: '180px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis hide dataKey="time" />
              <YAxis hide domain={getDomain(dataKey)} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={3} 
                fill={`url(#grad-${dataKey})`}
                isAnimationActive={false}
                dot={false}
              />
              <Tooltip 
                isAnimationActive={false}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '0.7rem', fontWeight: 800 }} 
                itemStyle={{ color: color }}
                labelStyle={{ display: 'none' }}
                cursor={false}
              />
            </AreaChart>
          ) : (
            <BarChart data={barData || data || []} barGap={0}>
              <XAxis hide />
              <YAxis hide domain={getDomain(dataKey)} />
              <Bar 
                dataKey={dataKey || 'val'} 
                fill={color} 
                radius={[6, 6, 0, 0]} 
                isAnimationActive={false}
                barSize={30}
              >
                {(barData || data || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={0.8} fill={entry?.color || color} />
                ))}
              </Bar>
              <Tooltip 
                isAnimationActive={false}
                cursor={false} 
                contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '0.7rem', fontWeight: 800 }} 
                labelStyle={{ display: 'none' }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F8FAFC' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 950, color: '#1E293B' }}>
            {data && data.length > 0 ? (data[data.length-1]?.[dataKey] || '--') : '--'}
          </span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>{unit}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase' }}>Live</span>
        </div>
      </div>
    </div>
  );

  const MonitorLink = ({ path, label }) => (
    <button
      onClick={() => navigate(path)}
      style={{
        width: '100%', padding: '1rem', borderRadius: '18px',
        background: '#F1F5F9', border: '1px dashed #CBD5E1', 
        color: '#475569', fontSize: '0.8rem', fontWeight: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        marginBottom: '2rem', cursor: 'pointer'
      }}
    >
      Open {label} Monitor <ExternalLink size={14} />
    </button>
  );

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', padding: '1.25rem', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '1.5rem', padding: '4px 0' }} className="no-scrollbar">
        <TabButton id="Soil" label="Soil" icon={Sprout} color={COLORS.soil} />
        <TabButton id="Weather" label="Weather" icon={CloudRain} color={COLORS.env} />
        <TabButton id="Storage" label="Storage" icon={Archive} color={COLORS.advanced} />
        <TabButton id="Irrigation" label="Irrigation" icon={Droplets} color={COLORS.water} />
        <TabButton id="Solar" label="Solar" icon={Sun} color={COLORS.energy} />
      </div>

      <div>
        {activeTab === 'Soil' && (
          <div key="Soil">
            <ChartCard title="Soil Moisture Trend" data={chartData} dataKey="moisture" color={COLORS.soil} unit="%" insight="Moisture optimal for root absorption" />
            <ChartCard title="Soil Temperature Trend" data={chartData} dataKey="soilTemp" color="#EF4444" unit="°C" insight="Soil temp stable at root level" />
            <ChartCard title="NPK Nutrient Balance" type="bar" color={COLORS.soil} unit="" insight="Nitrogen levels slightly dominant" 
              data={[{val: sensorData?.soil?.npk?.n || 0}]} dataKey="val" 
              barData={[
                { name: 'N', val: sensorData?.soil?.npk?.n || 0, color: '#10B981' },
                { name: 'P', val: sensorData?.soil?.npk?.p || 0, color: '#3B82F6' },
                { name: 'K', val: sensorData?.soil?.npk?.k || 0, color: '#F59E0B' }
              ]}
            />
            <ChartCard title="pH Stability" data={chartData} dataKey="ph" color="#8B5CF6" unit="pH" insight="Field acidity in neutral range" />
            <MonitorLink path="/soil-monitoring" label="Soil" />
          </div>
        )}

        {activeTab === 'Irrigation' && (
          <div key="Irrigation">
            <ChartCard title="Water Flow Rate" data={chartData} dataKey="flow" color={COLORS.water} unit="L/m" insight="Current pump output velocity" />
            <ChartCard title="Daily Water Usage" type="bar" data={chartData.slice(-12)} dataKey="usage" color="#2563EB" unit="L" insight="Water conservation active" />
            <ChartCard title="Tank Level" data={chartData} dataKey="level" color={COLORS.water} unit="%" insight="Main reservoir capacity" />
            <MonitorLink path="/irrigation" label="Irrigation" />
          </div>
        )}

        {activeTab === 'Solar' && (
          <div key="Solar">
            <ChartCard title="Solar Intensity" data={chartData} dataKey="solar" color={COLORS.energy} unit="lx" insight="Lux levels optimal for charging" />
            <ChartCard title="Energy Generation" type="bar" data={chartData.slice(-12)} dataKey="power" color="#EAB308" unit="W" insight="PV panel conversion at 94%" />
            <ChartCard title="System Efficiency" data={chartData} dataKey="power" color={COLORS.energy} unit="W" insight="Generation vs Load balancing" />
            <MonitorLink path="/solar-monitoring" label="Solar" />
          </div>
        )}

        {activeTab === 'Weather' && (
          <div key="Weather">
            <ChartCard title="Air Temperature" data={chartData} dataKey="temp" color={COLORS.env} unit="°C" insight="Ambient temperature following forecast" />
            <ChartCard title="Humidity Trend" data={chartData} dataKey="humidity" color={COLORS.water} unit="%" insight="Inverse relation to temp shift" />
            <ChartCard title="Solar Intensity (LDR)" data={chartData} dataKey="solar" color={COLORS.energy} unit=" lx" insight="Direct LDR photon measurement" />
            <ChartCard title="Rainfall Detection" data={chartData} dataKey="rain" color={COLORS.water} unit="%" insight="Rain sensor binary state" />
            <MonitorLink path="/weather" label="Weather" />
          </div>
        )}

        {activeTab === 'Storage' && (
          <div key="Storage">
            <ChartCard title="Storage Temperature" data={chartData} dataKey="storageTemp" color={COLORS.env} unit="°C" insight="Cool storage maintained" />
            <ChartCard title="Humidity Trend" data={chartData} dataKey="storageHumid" color={COLORS.water} unit="%" insight="Preventing crop dehydration" />
            <ChartCard title="Gas Concentration" type="bar" data={chartData.slice(-12)} dataKey="gas" color={COLORS.advanced} unit=" ppm" insight="Silo gas levels monitored by MQ135" />
            <ChartCard title="Gas Composition" data={chartData} dataKey="mq135" color="#F97316" unit="ppm" insight="Ethylene/CO2 levels monitoring" />
            <MonitorLink path="/storage-hub" label="Storage" />
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AnalyticsHub;
