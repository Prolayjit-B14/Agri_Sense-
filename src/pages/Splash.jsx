import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Leaf } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const { farmInfo } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Extract the split name for styling (e.g., Agri + Sense)
  const name = farmInfo?.projectName || "Agri Sense";
  const mainPart = name.slice(0, 4);
  const subPart = name.slice(4);

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'linear-gradient(135deg, #064e3b, #0f172a)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="animate-pulse" style={{ 
        width: '120px', height: '120px', borderRadius: '35px', background: 'rgba(255,255,255,0.1)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        marginBottom: '2rem'
      }}>
        <Leaf size={60} color="#10b981" fill="#10b981" />
      </div>
      <h1 className="animate-slide-up" style={{ color: 'white', fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
        {mainPart}<span style={{ color: '#10b981' }}>{subPart}</span>
      </h1>
      <p className="animate-fade-in" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
        {(farmInfo?.tagline || "Smart Agriculture").toUpperCase()}
      </p>

      <div style={{ position: 'absolute', bottom: '50px', left: 0, right: 0, textAlign: 'center' }}>
         <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 auto', borderRadius: '2px', overflow: 'hidden' }}>
            <div className="loading-bar" style={{ height: '100%', width: '0%', background: '#10b981' }}></div>
         </div>
      </div>

      <style>{`
        .loading-bar { animation: load 2.5s linear forwards; }
        @keyframes load { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default Splash;
