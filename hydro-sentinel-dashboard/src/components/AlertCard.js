// src/components/AlertCard.js
import React from 'react';

/**
 * Renders a customizable alert card for warnings or critical issues.
 * @param {string} type - 'warning' or 'danger' for styling.
 * @param {string} title - The main alert title (e.g., 'HEAVY METAL DETECTED').
 * @param {string} message - The main alert description.
 * @param {string} location - The location and timestamp of the alert.
 */
const AlertCard = ({ type, title, message, location }) => {
  const icon = title.includes("HEAVY METAL") ? '⚠️' : 
               title.includes("TDS") ? '❗️' : '🚨';

  return (
    <div className={`alert-card ${type}`}>
      <div className="content">
        <h3>
          <span className="title-icon">{icon}</span>
          {title}
        </h3>
        <p>{message}</p>
        <p className="location">Location: {location}</p>
      </div>
      <button className="close-btn">×</button>
    </div>
  );
};

export default AlertCard;