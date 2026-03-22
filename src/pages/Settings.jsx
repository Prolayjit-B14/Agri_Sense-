import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings as SettingsIcon, Bell, Shield, 
  RefreshCw, Globe, Moon, Sun, 
  Info, Cpu, Terminal, CheckCircle2,
  ChevronRight, LogOut, Code
} from 'lucide-react';

const SettingsV4_0 = () => {
  const { logout, isDarkMode, toggleTheme, farmInfo, updateBranding } = useApp();

  const sections = [
    {
      title: 'Notifications',
      items: [
        { name: 'Push Notifications', type: 'toggle', enabled: true },
        { name: 'Critical Alerts', type: 'toggle', enabled: true },
      ]
    },
    {
      title: 'Connectivity',
      items: [
        { name: 'Gateway Refresh Rate', value: '5s', icon: RefreshCw },
        { name: 'MQTT Protocol', value: 'v3.1.1', icon: Terminal },
      ]
    },
    {
      title: 'Preference',
      items: [
        { name: 'Unit System', value: 'Metric', icon: Globe },
      ]
    }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ padding: '1.25rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>System & Meta Configuration</p>
      </header>

      {/* 💎 1. DIGITAL BRANDING HUD (In-App Editor) */}
      <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>App Identity (Live Override)</h3>
      <div className="premium-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
         <div style={{ display: 'grid', gap: '15px' }}>
            <div>
               <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '6px' }}>MASTER PROJECT NAME</p>
               <input 
                  type="text" 
                  value={farmInfo.projectName} 
                  onChange={(e) => updateBranding({ projectName: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', fontWeight: 800, color: 'var(--text-main)' }} 
               />
            </div>
            <div>
               <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '6px' }}>FARM / CLIENT NAME</p>
               <input 
                  type="text" 
                  value={farmInfo.name} 
                  onChange={(e) => updateBranding({ name: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', fontWeight: 800, color: 'var(--text-main)' }} 
               />
            </div>
            <div style={{ marginTop: '5px', padding: '8px', background: 'var(--primary-ultra)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Shield size={14} color="var(--primary)" />
               <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--primary)' }}>Identity changes are saved instantly to local storage.</span>
            </div>
         </div>
      </div>

      {/* Theme Toggle */}
      <div className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-ultra)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDarkMode ? <Moon size={20} color="var(--primary)" /> : <Sun size={20} color="var(--primary)" />}
          </div>
          <span style={{ fontWeight: 800 }}>Dark Interstellar Mode</span>
        </div>
        <button 
          onClick={toggleTheme}
          style={{ width: '50px', height: '26px', borderRadius: '13px', background: isDarkMode ? 'var(--primary)' : '#cbd5e1', border: 'none', position: 'relative', cursor: 'pointer' }}
        >
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: isDarkMode ? '27px' : '3px', transition: '0.3s' }} />
        </button>
      </div>

      {/* Grouped Sections */}
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</h3>
          <div className="premium-card" style={{ padding: '0.5rem' }}>
            {section.items.map((item, ii) => (
              <div key={ii} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '12px 1rem', borderBottom: ii === section.items.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.03)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon && (() => {
                    const ItemIcon = item.icon;
                    return <ItemIcon size={18} color="var(--text-muted)" />;
                  })()}
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</span>
                </div>
                {item.type === 'toggle' ? (
                  <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: 'var(--primary)', position: 'relative' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', right: '3px' }} />
                  </div>
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* DEVELOPER & VERSION - STRICTLY HERE */}
      <div className="premium-card" style={{ 
        background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: 'none', 
        color: 'white', marginTop: '3rem', padding: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
          <Code size={24} color="var(--primary-light)" />
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.6, textTransform: 'uppercase' }}>Engineering Lead</p>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 900 }}>SemiColo</h4>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.8 }}>Build Version:</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary-light)' }}>v{farmInfo.version} MASTER PRO</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.8 }}>Relase Date:</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>19 Mar 2026</span>
        </div>
        <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', fontWeight: 700, opacity: 0.4, textAlign: 'center' }}>
           © 2026 Semicoclco AgriSolutions. All logic active.
        </div>
      </div>

      <button 
        onClick={logout}
        style={{ width: '100%', height: '56px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '16px', fontWeight: 900, marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
      >
        <LogOut size={20} /> Logout
      </button>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default SettingsV4_0;
