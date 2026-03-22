import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Sprout, Droplets, 
  Brain, Menu, X, 
  Map, Settings as SettingsIcon, FileText,
  Activity, Radio, DollarSign, CloudRain,
  Archive, Info, User,
  Bell, LogOut, Microscope, Sun, Camera, ShieldAlert,
  ChevronRight, Database, Monitor
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { logout, user, isSidebarOpen, setIsSidebarOpen } = useApp();
  const location = useLocation();

  const sidebarGroups = [
    {
      title: 'CORE PLATFORM',
      links: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics Hub', path: '/analytics', icon: Activity },
        { name: 'Alerts Center', path: '/alerts', icon: Bell },
        { name: 'Visual Monitoring', path: '/camera', icon: Camera },
      ]
    },
    {
      title: 'MONITORING MODULES',
      links: [
        { name: 'Soil Monitoring', path: '/soil-monitoring', icon: Sprout },
        { name: 'Irrigation Control', path: '/irrigation', icon: Droplets },
        { name: 'Storage Monitoring', path: '/storage-hub', icon: Archive },
        { name: 'Weather Monitoring', path: '/weather', icon: CloudRain },
        { name: 'Solar Monitoring', path: '/solar-monitoring', icon: Sun },
      ]
    },
    {
      title: 'INTELLIGENCE & ADVISORY',
      links: [
        { name: 'Soil Intelligence', path: '/soil-intelligence', icon: Microscope },
        { name: 'Crop Advisory', path: '/crop-advisory', icon: Brain },
        { name: 'Pest Advisory', path: '/pest-advisory', icon: ShieldAlert },
        { name: 'Market Intelligence', path: '/market-insights', icon: DollarSign },
      ]
    },
    {
      title: 'SYSTEM & ENGINEERING',
      links: [
        { name: 'Device Management', path: '/device-area', icon: Radio },
        { name: 'Geospatial Tracking', path: '/map-view', icon: Map },
        { name: 'Data Archive', path: '/data-logs', icon: Database },
        { name: 'System Reports', path: '/reports', icon: FileText },
      ]
    }
  ];

  return (
    <>
      {/* 🌑 OVERLAY */}
      <div style={{ 
        position: 'fixed', inset: 0, zIndex: 10001,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
        opacity: isSidebarOpen ? 1 : 0,
        pointerEvents: isSidebarOpen ? 'all' : 'none',
        transition: 'opacity 0.4s ease'
      }} onClick={() => setIsSidebarOpen(false)}></div>

      {/* 📂 SIDEBAR DRAWER */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '285px', zIndex: 10002,
        background: 'white',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '20px 0 50px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Header Section */}
        <div style={{ padding: '40px 24px', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
             <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)' }}>
                <img src={user?.avatar || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=200"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User" />
             </div>
             <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 950, margin: 0 }}>{user?.name || 'Guest Farmer'}</h4>
                <p style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Access</p>
             </div>
             <button onClick={() => setIsSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
               <X size={24} />
             </button>
          </div>
        </div>

        {/* Links Navigation */}
        <div style={{ padding: '20px 10px', overflowY: 'auto', flex: 1 }} className="no-scrollbar">
          {sidebarGroups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', padding: '0 15px', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{group.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {group.links.map((link, li) => {
                  const NavIcon = link.icon;
                  return (
                    <NavLink key={li} to={link.path} onClick={() => setIsSidebarOpen(false)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 15px', borderRadius: '12px',
                        background: location.pathname === link.path ? 'rgba(22, 163, 74, 0.08)' : 'transparent',
                        color: location.pathname === link.path ? '#10B981' : '#475569',
                        textDecoration: 'none', transition: '0.3s', fontWeight: 800, fontSize: '0.85rem'
                      }}
                    >
                      <NavIcon size={20} strokeWidth={location.pathname === link.path ? 2.5 : 2} />
                      <span>{link.name}</span>
                      {location.pathname === link.path && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Actions */}
        <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <NavLink to="/settings" onClick={() => setIsSidebarOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#64748b', textDecoration: 'none', fontWeight: 800, fontSize: '0.85rem' }}>
              <SettingsIcon size={20} /> Settings & Logs
           </NavLink>
           <button onClick={logout} style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#fee2e2', color: '#ef4444', border: 'none', fontWeight: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <LogOut size={18} /> Logout
           </button>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Sidebar;
