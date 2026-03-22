import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, LineChart, Cpu, Camera, Bell, User } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SoilMonitoring from './pages/SoilMonitoring';
import IrrigationControl from './pages/IrrigationControl';
import Detection from './pages/Detection';
import Profile from './pages/Profile';
import SoilIntelligence from './pages/SoilIntelligence';
import CropRecommendation from './pages/CropRecommendation';
import MarketInsights from './pages/MarketInsights';
import Reports from './pages/Reports';
import StorageMonitoring from './pages/StorageMonitoring';
import MapView from './pages/MapView';
import Alerts from './pages/Alerts';
import PestAdvisory from './pages/PestAdvisory';
import WeatherScreen from './pages/WeatherScreen';
import DeviceArea from './pages/DeviceArea';
import BuySellAdvisory from './pages/BuySellAdvisory';
import WaterUsage from './pages/WaterUsage';
import AnalyticsHub from './pages/AnalyticsHub';
import DaylightAnalysis from './pages/DaylightAnalysis';
import SolarMonitoring from './pages/SolarMonitoring';
import AnimalDetection from './pages/AnimalDetection';
import Settings from './pages/Settings';
import DataLogs from './pages/DataLogs';

const getPageTitle = (path) => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics Hub',
    '/soil-monitoring': 'Soil Monitoring',
    '/soil-intelligence': 'Soil Intelligence',
    '/crop-advisory': 'Crop Advisory',
    '/pest-advisory': 'Pest Advisory',
    '/buy-sell-advisory': 'Market Advisory',
    '/irrigation': 'Irrigation Control',
    '/solar-monitoring': 'Solar Monitoring',
    '/storage-hub': 'Storage Monitoring',
    '/camera': 'Visual Monitoring',
    '/animal-detection': 'Animal Detection',
    '/device-area': 'Device Management',
    '/map-view': 'Geospatial Tracking'
  };
  return titles[path] || 'Agri Sense';
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    style={{ height: '100%', width: '100%' }}
  >
    {children}
  </motion.div>
);

/// 📱 Bottom Navigation Component (Agri Sense v6.0.0)
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'Home', path: '/dashboard', icon: LayoutGrid },
    { id: 'Analytics', path: '/analytics', icon: LineChart },
    { id: 'Devices', path: '/device-area', icon: Cpu }, // Changed path to /device-area to match existing route
    { id: 'Camera', path: '/camera', icon: Camera },
    { id: 'Alerts', path: '/alerts', icon: Bell },
  ];

  return (
    <nav style={{ 
      position: 'fixed', bottom: 0, left: 0, right: 0, 
      background: 'rgba(255, 255, 255, 0.9)', 
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid #f1f5f9',
      height: '75px', display: 'flex', justifyContent: 'space-around', 
      alignItems: 'center', padding: '0 10px', zIndex: 1000, // Corrected zLines to zIndex
      boxShadow: '0 -10px 30px rgba(0,0,0,0.03)'
    }}>
      {tabs.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <motion.button
            key={item.path}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(item.path)}
            style={{
              background: 'transparent', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              color: isActive ? '#10B981' : '#94A3B8', padding: '8px 0',
              flex: 1, cursor: 'pointer', transition: '0.3s'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="navTab"
                  style={{
                    position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%', background: '#10B981'
                  }}
                />
              )}
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: isActive ? 900 : 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {item.id}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const titles = {
    '/dashboard': 'Agri Sense',
    '/analytics': 'Analytics Hub',
    '/irrigation': 'Irrigation Control',
    '/weather': 'Weather Monitor',
    '/storage-hub': 'Storage Hub',
    '/soil-monitoring': 'Soil Monitoring',
    '/solar-monitoring': 'Solar Monitor',
    '/market-insights': 'Market Analysis',
    '/device-area': 'Devices & IoT', // Updated path to match existing route
    '/camera': 'Live Vision',
    '/alerts': 'System Alerts',
    '/profile': 'Farmer Profile',
    '/settings': 'Settings'
  };

  return (
    <div style={{ 
      paddingBottom: '85px', minHeight: '100vh', background: '#F8FAFC',
      maxWidth: '100vw', overflowX: 'hidden', position: 'relative'
    }}>
      <TopBar title={titles[location.pathname] || 'Agri Sense'} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
      <Sidebar />
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let backHandler;
    try {
      if (CapApp && CapApp.addListener) {
        backHandler = CapApp.addListener('backButton', () => {
          if (location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/') {
            CapApp.exitApp();
          } else {
            navigate(-1);
          }
        });
      }
    } catch (e) {
      console.warn("Capacitor App plugin not available:", e);
    }
    
    return () => {
      if (backHandler) {
        backHandler.then(h => h.remove()).catch(err => console.error(err));
      }
    };
  }, [location, navigate]);

  return (
    <div id="root-layout">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Route */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          
          {/* Private Routes */}
          <Route path="/dashboard" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Dashboard /></PageWrapper></MainLayout>} />
          <Route path="/analytics" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><AnalyticsHub /></PageWrapper></MainLayout>} />
          <Route path="/soil-monitoring" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><SoilMonitoring /></PageWrapper></MainLayout>} />
          <Route path="/soil-intelligence" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><SoilIntelligence /></PageWrapper></MainLayout>} />
          <Route path="/crop-advisory" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><CropRecommendation /></PageWrapper></MainLayout>} />
          <Route path="/pest-advisory" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><PestAdvisory /></PageWrapper></MainLayout>} />
          <Route path="/buy-sell-advisory" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><BuySellAdvisory /></PageWrapper></MainLayout>} />
          <Route path="/irrigation" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><IrrigationControl /></PageWrapper></MainLayout>} />
          <Route path="/solar-monitoring" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><SolarMonitoring /></PageWrapper></MainLayout>} />
          <Route path="/storage-hub" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><StorageMonitoring /></PageWrapper></MainLayout>} />
          <Route path="/camera" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Detection /></PageWrapper></MainLayout>} />
          <Route path="/animal-detection" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><AnimalDetection /></PageWrapper></MainLayout>} />
          <Route path="/device-area" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><DeviceArea /></PageWrapper></MainLayout>} />
          <Route path="/map-view" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><MapView /></PageWrapper></MainLayout>} />
          <Route path="/market-insights" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><MarketInsights /></PageWrapper></MainLayout>} />
          <Route path="/alerts" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Alerts /></PageWrapper></MainLayout>} />
          <Route path="/data-logs" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><DataLogs /></PageWrapper></MainLayout>} />
          <Route path="/reports" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Reports /></PageWrapper></MainLayout>} />
          <Route path="/profile" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Profile /></PageWrapper></MainLayout>} />
          <Route path="/settings" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><Settings /></PageWrapper></MainLayout>} />
          <Route path="/weather" element={<MainLayout user={user} pathname={location.pathname}><PageWrapper><WeatherScreen /></PageWrapper></MainLayout>} />
          
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
