// src/components/SystemMonitorCard.js
import React from 'react';

/**
 * Renders the Live System Monitor card, showing real-time Flow Rate and Pressure.
 * @param {object} monitorData - Data containing flow, pressure, location, and status.
 */
const SystemMonitorCard = ({ monitorData }) => {
  const { flow, pressure, location, status } = monitorData;
  const statusClass = status.toLowerCase(); // 'normal'

  return (
    <div className="system-monitor-card-container">
      <div className="monitor-header">
        <span role="img" aria-label="live">📡</span>
        Live System Monitor
        <span className={`monitor-status ${statusClass}`}>{status}</span>
      </div>

      <div className="monitor-metrics-row">
        {/* Flow Rate Metric */}
        <div className="monitor-metric">
          <p className="metric-title">FLOW RATE</p>
          <p className="metric-value">
            {flow.value} <span className="metric-unit">{flow.unit}</span>
          </p>
          <p className="metric-subtext">Current flow</p>
        </div>

        {/* Pressure Metric */}
        <div className="monitor-metric">
          <p className="metric-title">PRESSURE</p>
          <p className="metric-value">
            {pressure.value} <span className="metric-unit">{pressure.unit}</span>
          </p>
          <p className="metric-subtext">System pressure</p>
        </div>
      </div>

      <div className="monitor-footer">
        <div className="monitor-location">
          <p className="footer-label">LOCATION</p>
          <p className="footer-value">{location}</p>
        </div>
        <div className="monitor-status-detail">
          <p className="footer-label">STATUS</p>
          <p className={`footer-value status-${statusClass}`}>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitorCard;