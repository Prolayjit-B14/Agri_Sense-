import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MASTER_CONFIG } from '../config';
import { 
  Sprout, Shield, Lock, Mail, 
  ArrowRight, Leaf, Zap, CheckCircle2 
} from 'lucide-react';

const LoginV3 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, farmInfo } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      alert(`Invalid Credentials. Use provided credentials or continue as Guest.`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container" style={{ 
      background: 'linear-gradient(135deg, #064e3b, #065f46, #0f172a)', 
      display: 'flex', flexDirection: 'column', padding: '2rem', justifyContent: 'center', minHeight: '100vh' 
    }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand Logo Section */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            width: '94px', height: '94px', borderRadius: '30px', background: 'rgba(255,255,255,0.1)', 
            margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <Leaf size={48} color="var(--primary-light)" fill="var(--primary-light)" />
          </div>
          <h1 style={{ color: 'white', fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
            <span className="gradient-text" style={{ WebkitTextFillColor: 'white' }}>
              {(farmInfo?.projectName || MASTER_CONFIG.PROJECT_NAME).slice(0, 4)}
            </span>
            <span style={{ color: 'var(--primary-light)' }}>
              {(farmInfo?.projectName || MASTER_CONFIG.PROJECT_NAME).slice(4)}
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontWeight: 600, marginTop: '8px', letterSpacing: '0.02em' }}>
            {farmInfo?.tagline || MASTER_CONFIG.TAGLINE}
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.form 
          variants={itemVariants} 
          onSubmit={handleLogin} 
          className="premium-card" 
          style={{ padding: '2.5rem 2rem', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>Security Identifier</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '16px' }} />
              <input 
                type="email" 
                placeholder={MASTER_CONFIG.LOGIN_EMAIL || "Email Address"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', height: '58px', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', paddingLeft: '48px', color: 'white', fontSize: '1rem', fontWeight: 600, outline: 'none' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '4px' }}>Master Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '16px' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', height: '58px', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', paddingLeft: '48px', color: 'white', fontSize: '1rem', fontWeight: 600, outline: 'none' }} 
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary"
            style={{ width: '100%', height: '64px', borderRadius: '20px', fontSize: '1.2rem', background: 'linear-gradient(135deg, var(--primary-light), var(--primary))', border: 'none', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)', marginBottom: '1.25rem' }}
          >
            START HARVESTING <ArrowRight size={22} style={{ marginLeft: '8px' }} />
          </motion.button>

          <motion.button 
            whileHover={{ background: 'rgba(255,255,255,0.05)' }}
            type="button"
            onClick={() => { if (login('guest', 'guest')) navigate('/dashboard'); }}
            style={{ width: '100%', height: '58px', borderRadius: '20px', fontSize: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}
          >
            CONTINUE AS GUEST
          </motion.button>

          <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.05em' }}>
            SECURED END-TO-END • {MASTER_CONFIG.PROJECT_NAME} HUB
          </p>
        </motion.form>

        {/* Footer Info */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: '3.5rem', opacity: 0.4 }}>
          <p style={{ color: 'white', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>VERSION {farmInfo?.version || "2.0.0"} • {MASTER_CONFIG.FOOTER_CREDIT}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginV3;
