import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from '../firebase-config';

import Header from './Header';
import AlertCard from './AlertCard';
import MetricCard from './MetricCard';
import SystemMonitorCard from './SystemMonitorCard';

const DB_PATH = "SensorData";

const DashboardContent = () => {
  // --- Live sensor data ---
  const [liveMetrics, setLiveMetrics] = useState({
    flow_rate_lpm: 0.0,
    tds_ppm: 0,
    total_liters: 0.0,  
    timestamp: 'N/A'
  });

  // --- Leak detection state ---
  const [isLeakDetected, setIsLeakDetected] = useState(false);
  const [leakTimestamp, setLeakTimestamp] = useState(null);
  const [tdsTimestamp, setTdsTimestamp] = useState(null);

  // --- Fetch data from Firebase ---
  useEffect(() => {
    const sensorRef = ref(database, DB_PATH);

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const flowRate = parseFloat(data.Flow_L_per_min || 0);
      const tdsValue = parseFloat(data.TDS_ppm || 0);
      const volume = parseFloat(data.Volume_mL || 0);
      const now = new Date().toLocaleString();

      setLiveMetrics({
        flow_rate_lpm: flowRate.toFixed(2),
        tds_ppm: Math.round(tdsValue),
        total_liters: volume.toFixed(1),
        timestamp: now,
      });

      // --- Leak detection logic ---
      if (flowRate >= 0.1 && flowRate <= 0.5) {
        if (!isLeakDetected) setLeakTimestamp(now); // set timestamp when leak first detected
        setIsLeakDetected(true);
      } else {
        setIsLeakDetected(false);
      }

      // --- TDS alert timestamp ---
      if (tdsValue > 100) {
        if (!tdsTimestamp) setTdsTimestamp(now); // set only once when it first triggers
      } else {
        setTdsTimestamp(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- TDS logic (only for water quality) ---
  const tdsValue = liveMetrics.tds_ppm;
  const isTdsSafe = tdsValue < 100 && tdsValue > 0;
  const tdsStatus = isTdsSafe ? 'NORMAL' : 'WARNING';
  const shouldBlinkTds = tdsValue > 100;

  // --- Flow logic (for leak detection / system monitor) ---
  const flowRate = liveMetrics.flow_rate_lpm;
  const isFlowSafe = flowRate > 0.5 || flowRate === 0;
  const flowStatus = isFlowSafe ? 'NORMAL' : 'WARNING'; // ✅ only system monitor uses this

  // --- Data for child components ---
  const systemMonitorData = {
    flow: { value: flowRate, unit: 'L/min' },
    pressure: { value: '45.8', unit: 'PSI' },
    location: 'bathroom',
    status: flowStatus // ✅ this shows "WARNING" when flow between 0–0.5 L/min
  };

  const waterQualityData = {
    status: tdsStatus, // ✅ only depends on TDS
    metric: 'TDS (Total Dissolved Solids)',
    value: `${tdsValue} ppm`
  };

  const topMetricsData = [
    { title: 'FLOW RATE', value: flowRate, unit: 'L/min', type: 'flow-rate', icon: '💧', subText: 'Current flow' },
    { title: 'PRESSURE', value: '45.8', unit: 'PSI', type: 'pressure', icon: '📏', subText: 'System pressure' },
    { title: 'TOTAL USAGE', value: liveMetrics.total_liters, unit: 'mL', type: 'total-usage', icon: '📈', subText: 'Total volume' },
    { title: 'LEAK DETECTION', value: isLeakDetected ? '1' : '0', unit: 'alerts', type: 'leak-detection', icon: '🚨', isAlert: isLeakDetected }
  ];

  // --- ALERTS SECTION ---
  const alertsData = [
    {
      id: 1,
      type: 'warning',
      title: 'HEAVY METAL DETECTED',
      message: 'Lead concentration approaching EPA limit - immediate investigation recommended',
      timestamp: '1/10/2025, 6:10:00 PM'
    },
    {
      id: 2,
      type: 'warning',
      title: 'TDS ANOMALY',
      message: 'TDS level exceeded safe threshold - water quality degradation detected',
      timestamp: tdsTimestamp
    },
    {
      id: 3,
      type: 'danger',
      title: 'LEAK DETECTED',
      message: 'Flow rate between 0.1 – 0.5 L/min detected — possible leak',
      timestamp: leakTimestamp
    }
  ];

  return (
    <>
      <Header />

      {/* --- Alerts Section --- */}
      <section className="alerts">
        {alertsData.map((alert, index) => {
          const isTdsAlert = alert.title === "TDS ANOMALY";
          const isLeakAlert = alert.title === "LEAK DETECTED";
          const shouldBlink = (isTdsAlert && shouldBlinkTds) || (isLeakAlert && isLeakDetected);

          const showTime = (isTdsAlert && tdsTimestamp) || (isLeakAlert && leakTimestamp);

          return (
            <div key={index} className={shouldBlink ? "blink-alert" : ""}>
              <AlertCard
                type={alert.type}
                title={alert.title}
                message={alert.message}
                location={
                  showTime
                    ? `bathroom • ${showTime}`
                    : "bathroom • No recent alert"
                }
              />
            </div>
          );
        })}
      </section>

      {/* --- System Monitor & Water Quality --- */}
      <section className="live-monitor-row">
        <SystemMonitorCard monitorData={systemMonitorData} />
        <div className={`water-quality-card ${shouldBlinkTds ? "blink-alert" : ""}`}>
          <p className="quality-title">
            <span role="img" aria-label="water-quality">🚰</span> Water Quality
          </p>
          <div className={`quality-status-box ${waterQualityData.status.toLowerCase()}`}>
            {waterQualityData.status}
          </div>
          <p className="quality-metric">{waterQualityData.metric}</p>
          <p className="quality-value">{waterQualityData.value}</p>
          <p style={{ fontSize: '0.7em', marginTop: '10px' }}>Last Updated: {liveMetrics.timestamp}</p>
        </div>
      </section>

      {/* --- Top Metrics --- */}
      <div className="metric-row top-metrics">
        {topMetricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            type={metric.type}
            icon={metric.icon}
            subText={metric.subText}
            isAlert={metric.isAlert}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardContent;
