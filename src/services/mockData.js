/**
 * Agri Sense v6.0.0 Master Forensic Data Service
 * Aligned with SENSOR → DATA → PROCESSING → DECISION → ACTION pipeline
 */

export const CATEGORIES = {
  SOIL: 'Soil Monitoring',
  NUTRIENT: 'Nutrient Analysis',
  WEATHER: 'Weather & Environment',
  DETECTION: 'Pest & Security',
  STORAGE: 'Food Freshness',
  WATER: 'Water System',
};

export const DEVICE_IDS = {
  SOIL_NODE: 'ESP32_SOIL_01',
  CAM_NODE: 'ESP32_CAM_01',
  STORAGE_NODE: 'ESP32_STORAGE_01',
  RELAY_NODE: 'ESP32_RELAY_01',
};

// 🔄 PERSISTENT STATE FOR SMOOTH WALK
let currentData = {
  soil: { moisture: 45, ph: 6.5, temp: 26, n: 140, p: 70, k: 180 },
  storage: { temp: 6.2, humidity: 42, ethylene: 0.05, mq135: 1.2, aqi: 45 },
  weather: { temp: 28, humidity: 65, pressure: 1012, windSpeed: 5.2, uvIndex: 4, rainfall: 0.5 },
  water: { level: 82, tankLevel: 75, flowRate: 12.5 },
  solar: { lightIntensity: 850, exposureDuration: 5.4 }
};

const smoothWalk = (val, min, max, delta = 1.0) => {
  const change = (Math.random() - 0.5) * delta;
  let next = val + change;
  return Math.min(max, Math.max(min, next));
};

export const generateMockSensorData = () => {
  // Update with Smooth Walk
  currentData.soil.moisture = smoothWalk(currentData.soil.moisture, 25, 85, 2);
  currentData.soil.ph = smoothWalk(currentData.soil.ph, 5.5, 7.5, 0.1);
  currentData.soil.temp = smoothWalk(currentData.soil.temp, 22, 34, 0.5);
  currentData.soil.n = Math.round(smoothWalk(currentData.soil.n, 100, 200, 1));
  currentData.soil.p = Math.round(smoothWalk(currentData.soil.p, 40, 100, 1));
  currentData.soil.k = Math.round(smoothWalk(currentData.soil.k, 120, 220, 1));

  currentData.storage.temp = smoothWalk(currentData.storage.temp, 2, 12, 0.2);
  currentData.storage.mq135 = smoothWalk(parseFloat(currentData.storage.mq135), 0.5, 8.0, 0.1).toFixed(2);
  currentData.storage.ethylene = smoothWalk(parseFloat(currentData.storage.ethylene), 0, 0.5, 0.01).toFixed(2);

  currentData.weather.temp = smoothWalk(currentData.weather.temp, 20, 38, 0.3);
  currentData.weather.humidity = smoothWalk(currentData.weather.humidity, 40, 95, 1);
  currentData.weather.pressure = Math.round(smoothWalk(currentData.weather.pressure, 1000, 1025, 0.5));
  currentData.weather.windSpeed = smoothWalk(currentData.weather.windSpeed, 0, 25, 0.5);

  currentData.water.level = smoothWalk(currentData.water.level, 0, 100, 0.5);
  currentData.water.tankLevel = smoothWalk(currentData.water.tankLevel, 10, 100, 0.3);
  currentData.water.flowRate = smoothWalk(currentData.water.flowRate, 0, 40, 1.5);

  currentData.storage.aqi = Math.round(smoothWalk(currentData.storage.aqi, 20, 150, 2));

  currentData.solar.lightIntensity = Math.round(smoothWalk(currentData.solar.lightIntensity, 0, 2000, 50));
  currentData.solar.exposureDuration = smoothWalk(currentData.solar.exposureDuration, 0, 12, 0.1);

  // 🧪 Soil Health Score Calculation (Moisture + pH + NPK balance) / 3
  const phScore = currentData.soil.ph >= 6 && currentData.soil.ph <= 7.2 ? 100 : 70;
  const npkScore = (currentData.soil.n > 130 && currentData.soil.p > 60 && currentData.soil.k > 150) ? 100 : 80;
  const healthScore = Math.round((currentData.soil.moisture + phScore + npkScore) / 3);

  return {
    raw: {
      soilMoisture: Math.round(4095 - (currentData.soil.moisture * 40)), // Reverse map for demo
      storageGas: Math.round(currentData.storage.mq135 * 100)
    },
    soil: {
      moisture: Math.round(currentData.soil.moisture),
      ph: currentData.soil.ph.toFixed(1),
      temp: currentData.soil.temp.toFixed(1),
      npk: {
        n: currentData.soil.n,
        p: currentData.soil.p,
        k: currentData.soil.k,
      },
      healthIndex: healthScore,
      type: 'Loamy (High Density)'
    },
    camera: {
      lastPest: 'None Detected',
      feedStatus: 'online',
      threatLevel: 'Safe'
    },
    storage: {
      ...currentData.storage,
      freshnessScore: currentData.storage.mq135 < 3 ? 98 : 75
    },
    weather: {
      ...currentData.weather,
      temp: currentData.weather.temp.toFixed(1),
      humidity: Math.round(currentData.weather.humidity),
      windSpeed: currentData.weather.windSpeed.toFixed(1),
      pressure: currentData.weather.pressure,
      isRaining: currentData.weather.humidity > 85,
      lightIntensity: Math.round(currentData.solar.lightIntensity),
      rainLevel: currentData.weather.humidity > 85 ? 100 : 0,
      suitability: 'Optimal',
      sunrise: '05:42 AM',
      sunset: '06:14 PM'
    },
    water: {
      ...currentData.water,
      level: Math.round(currentData.water.level),
      tankLevel: Math.round(currentData.water.tankLevel),
      flowRate: currentData.water.flowRate.toFixed(1),
      totalUsage: 485,
    },
    solar: {
      ...currentData.solar,
      lightIntensity: currentData.solar.lightIntensity,
      exposureDuration: currentData.solar.exposureDuration.toFixed(1)
    },
    lastGlobalUpdate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
};

export const getAIv2Recommendations = (data) => {
  const recommendations = [];
  const { soil, weather, storage, water } = data;

  // 1. IRRIGATION (TECHNICAL)
  if (soil?.moisture !== null && soil?.moisture < 35) {
    recommendations.push({ 
      id: 'r1', title: 'Hydration Deficiency', 
      message: `Soil moisture critical at ${soil.moisture}%. Activating pump sync for root zone recovery.`, 
      type: 'danger', 
      category: CATEGORIES.WATER
    });
  }

  // 2. NUTRIENT CHECK (NPK)
  if (soil?.npk?.n !== null && soil?.npk?.n < 40) {
    recommendations.push({ 
      id: 'r2', title: 'Nitrogen Depletion', 
      message: 'Low nitrogen levels detected. Consider urea or compost top-dressing.', 
      type: 'warning',
      category: CATEGORIES.NUTRIENT
    });
  }

  // 3. WEATHER RISK
  if (weather?.humidity > 80 && weather?.temp > 28) {
    recommendations.push({ 
      id: 'r5', title: 'Fungal Risk: CRITICAL', 
      message: 'High heat & humidity detected. Monitor for blight or powdery mildew.', 
      type: 'danger',
      category: CATEGORIES.DETECTION
    });
  }

  // Priority Sort
  return (recommendations || []).sort((a, b) => {
    const p = { 'danger': 0, 'warning': 1, 'info': 2 };
    return p[a.type] - p[b.type];
  });
};

export const ACTUATORS = {
  PUMP: 'Irrigation Pump',
  VALVE: 'Solenoid Valve',
  BUZZER: 'Ultrasonic Repellent',
  SPRAYER: 'Pest Sprayer',
};

export const MOCK_USERS = [
  { email: 'farmer1@test.com', password: '123456', name: 'Semicoclco' }
];

export const MOCK_MARKET_V2 = [
  { crop: 'Basmati Rice', price: '₹3,250', trend: 'up', change: '+3.2%', market: 'Delhi' },
  { crop: 'Wheat (Grade A)', price: '₹2,480', trend: 'down', change: '-1.5%', market: 'UP' },
];
