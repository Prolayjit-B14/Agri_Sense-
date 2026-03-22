import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  User, Mail, MapPin, Phone, 
  Shield, CheckCircle2, ChevronRight,
  Camera, Edit3, Image as ImageIcon,
  Zap, Activity, Award, Bell, 
  Cpu, MessageSquare, Brain, 
  Sun, Moon, MousePointer2, Settings2,
  Lock, Terminal, Heart, AlertCircle
} from 'lucide-react';

const Profile = () => {
  const { 
    user, farmInfo, updateProfile, 
    isDarkMode, toggleTheme, farmHealthScore,
    profileMeta, updateProfileMeta 
  } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...farmInfo, name: user?.name || 'Alexander' });
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('agrisense_photo') || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=200');

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem('agrisense_photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container" style={{ padding: '0', background: '#f8fafc' }}>
      
      {/* 🔝 1. HERO IDENTITY HEADER */}
      <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f8fafc 0%, transparent 70%)' }} />
        
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
             <div style={{ width: '90px', height: '90px', borderRadius: '24px', border: '4px solid white', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <img src={profilePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
             <label style={{ 
               position: 'absolute', bottom: '-8px', right: '-8px', 
               width: '32px', height: '32px', borderRadius: '50%', 
               background: 'var(--primary)', color: 'white', 
               display: 'flex', alignItems: 'center', justifyContent: 'center', 
               cursor: 'pointer', border: '3px solid white' 
             }}>
                <Camera size={14} />
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
             </label>
          </div>
          <div style={{ flex: 1, paddingBottom: '5px' }}>
             <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e293b', marginBottom: '4px' }}>{formData.name}</h2>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#064e3b', color: 'white', padding: '4px 10px', borderRadius: '10px' }}>
                <Shield size={12} />
                <span style={{ fontSize: '0.65rem', fontWeight: 900 }}>{profileMeta.role}</span>
             </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        
        {/* 🏢 2. SYSTEM PROFILE (IDENTITY) */}
        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <User size={16} color="var(--primary)" /> SYSTEM PROFILE
        </h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ ...CARD_STYLE, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
               <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', margin: 0 }}>AUTHORITY STATUS</p>
               <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b' }}>{profileMeta.accessLevel}</h4>
            </div>
            <button 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              style={{ padding: '8px 16px', background: isEditing ? 'var(--primary)' : '#f1f5f9', border: 'none', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 900, color: isEditing ? 'white' : '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isEditing ? <CheckCircle2 size={14} /> : <Edit3 size={14} />}
              {isEditing ? 'SYNC' : 'EDIT'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { label: 'System Owner', value: formData.name, key: 'name' },
              { label: 'Field Coordinates', value: formData.location, key: 'location' },
              { label: 'Comm Link', value: formData.phone, key: 'phone' }
            ].map((field, i) => (
              <div key={i}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{field.label}</p>
                {isEditing ? (
                  <input 
                    value={field.value} 
                    onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                    style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '5px 0', fontSize: '0.9rem', fontWeight: 800, outline: 'none', background: 'transparent' }}
                  />
                ) : (
                  <p style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b' }}>{field.value}</p>
                )}
              </div>
            ))}
          </div>

          <div style={{ mt: '1rem', pt: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '20px' }}>
             <div>
                <p style={{ fontSize: '0.55rem', fontWeight: 800, color: '#94a3b8' }}>NODES MANAGED</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b' }}>{profileMeta.nodesManaged} Active</p>
             </div>
             <div>
                <p style={{ fontSize: '0.55rem', fontWeight: 800, color: '#94a3b8' }}>LAST LOGIN</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b' }}>{profileMeta.lastLogin}</p>
             </div>
          </div>
        </motion.div>

        {/* 📊 3. SYSTEM ACTIVITY LOGS */}
        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Terminal size={16} color="var(--primary)" /> SYSTEM ACTIVITY LOGS
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
           <div style={{ ...CARD_STYLE, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                 <MousePointer2 size={14} color="#3b82f6" />
                 <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8' }}>COMMANDS</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{profileMeta.commandsIssued.toLocaleString()}</h3>
              <p style={{ fontSize: '0.55rem', fontWeight: 700, color: '#10b981' }}>+12% THIS WEEK</p>
           </div>
           <div style={{ ...CARD_STYLE, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                 <Shield size={14} color="#10b981" />
                 <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8' }}>ALERTS RESOLVED</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{profileMeta.alertsResolved}</h3>
              <p style={{ fontSize: '0.55rem', fontWeight: 700, color: '#10b981' }}>98% EFFICIENCY</p>
           </div>
        </div>

        {/* ⚙️ 4. PERSONALIZATION ENGINE */}
        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Settings2 size={16} color="var(--primary)" /> PERSONALIZATION ENGINE
        </h3>
        <div style={{ ...CARD_STYLE, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
           
           {/* Theme Toggle */}
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isDarkMode ? <Moon size={18} color="#3b82f6" /> : <Sun size={18} color="#f59e0b" />}
                 </div>
                 <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900 }}>Interface Mode</h4>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Switch Between Light & Dark</p>
                 </div>
              </div>
              <button 
                onClick={toggleTheme}
                style={{ width: '50px', height: '26px', borderRadius: '15px', background: isDarkMode ? 'var(--primary)' : '#cbd5e1', border: 'none', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
              >
                 <motion.div 
                  animate={{ x: isDarkMode ? 24 : 2 }}
                  style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} 
                 />
              </button>
           </div>

           {/* Notifications */}
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={18} color="#ef4444" />
                 </div>
                 <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900 }}>Push Notifications</h4>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Real-time System Alerts</p>
                 </div>
              </div>
              <button 
                onClick={() => updateProfileMeta({ notifications: { ...profileMeta.notifications, push: !profileMeta.notifications.push } })}
                style={{ width: '50px', height: '26px', borderRadius: '15px', background: profileMeta.notifications.push ? 'var(--primary)' : '#cbd5e1', border: 'none', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
              >
                 <motion.div 
                  animate={{ x: profileMeta.notifications.push ? 24 : 2 }}
                  style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} 
                 />
              </button>
           </div>

           {/* AI Sensitivity */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brain size={18} color="#8b5cf6" />
                 </div>
                 <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900 }}>AI Sensory Level</h4>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Fine-tune system intelligence</p>
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '14px' }}>
                 {['Low', 'Balanced', 'High'].map(lv => (
                   <button 
                    key={lv} 
                    onClick={() => updateProfileMeta({ aiSensitivity: lv })}
                    style={{ 
                      padding: '8px', borderRadius: '10px', border: 'none', 
                      background: profileMeta.aiSensitivity === lv ? 'white' : 'transparent',
                      color: profileMeta.aiSensitivity === lv ? 'var(--primary)' : '#64748b',
                      fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                      boxShadow: profileMeta.aiSensitivity === lv ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                    }}
                   >
                     {lv}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* 💊 5. SYSTEM SNAPSHOT */}
        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Heart size={16} color="#ef4444" /> SYSTEM VITAL SIGNS
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
           {[
             { label: 'NODES', val: '11/12', color: '#10b981', icon: Cpu },
             { label: 'ALERTS', val: '2', color: '#f59e0b', icon: AlertCircle },
             { label: 'HEALTH', val: `${farmHealthScore}%`, color: '#3b82f6', icon: Activity }
           ].map((v, i) => (
             <div key={i} style={{ ...CARD_STYLE, padding: '1rem', textAlign: 'center' }}>
                {(() => {
                  const VitalIcon = v.icon;
                  return <VitalIcon size={16} color={v.color} style={{ margin: '0 auto 8px' }} />;
                })()}
                <p style={{ fontSize: '0.5rem', fontWeight: 800, color: '#94a3b8' }}>{v.label}</p>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 950, color: v.color }}>{v.val}</h4>
             </div>
           ))}
        </div>

      </div>

      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default Profile;
