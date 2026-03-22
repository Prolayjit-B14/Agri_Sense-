import mqtt from 'mqtt';
import { MASTER_CONFIG } from '../config';

/**
 * Agri Sense v6.0.0 MQTT Real-Time Linkage Service
 */

const MQTT_CONFIG = {
  host: MASTER_CONFIG.MQTT_BROKER,
  port: MASTER_CONFIG.MQTT_WSS_PORT,
  protocol: 'wss',
  path: '/mqtt'
};

class MqttService {
  constructor() {
    this.client = null;
  }

  connect(onMessageCallback, onStatusCallback) {
    // 🔗 Sync callbacks
    this.onMessage = onMessageCallback;
    this.onStatus = onStatusCallback;

    if (this.client && this.client.connected) {
      console.log("MQTT: Already connected. Callbacks synced.");
      if (this.onStatus) this.onStatus('connected');
      return;
    }
    
    console.log("MQTT: Initializing Field Connection...");
    
    // Connect with Reconnection Strategy
    this.client = mqtt.connect(`wss://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}`, {
      reconnectPeriod: 5000,
      connectTimeout: 30 * 1000,
      keepalive: 60
    });

    this.client.on('connect', () => {
      console.log("MQTT: Connected to Agri Sense Cloud Broker ✅");
      if (this.onStatus) this.onStatus('connected');
      this.client.subscribe('agrisense/field_a/sensors');
      this.client.subscribe('agrisense/field_a/camera');
    });

    this.client.on('reconnect', () => {
      console.log("MQTT: Attempting Reconnection... 🔄");
      if (this.onStatus) this.onStatus('reconnecting');
    });

    this.client.on('offline', () => {
      console.log("MQTT: Broker Offline ⚠️");
      if (this.onStatus) this.onStatus('offline');
    });

    this.client.on('close', () => {
      if (this.onStatus) this.onStatus('closed');
    });

    this.client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        if (this.onMessage) this.onMessage(topic, payload);
      } catch (e) {
        console.error("MQTT JSON Parse Error:", e);
      }
    });

    this.client.on('error', (err) => {
      console.error("MQTT Connection Error:", err);
      if (this.onStatus) this.onStatus('error');
    });
  }

  // Publish Commands (e.g. Turn Pump ON)
  publishCommand(action) {
    if (this.client) {
      const topic = 'agrisense/field_a/commands';
      const message = JSON.stringify(action);
      this.client.publish(topic, message);
      console.log(`MQTT: Command Published to ${topic}:`, action);
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end();
    }
  }
}

const mqttService = new MqttService();
export default mqttService;
