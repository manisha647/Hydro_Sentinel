// src/components/Sidebar.js (UPDATED CODE)
import React from 'react';
// Using generic icons from a placeholder for demonstration
const DashboardIcon = () => '📊';
const ConsumptionIcon = () => '📈';
const QualityIcon = () => '🧪';
const AlertsIcon = () => '🔔';
const SettingsIcon = () => '⚙️';

/**
 * Renders the navigation sidebar with links and user profile.
 * @param {string} activePage - The currently active page name ('Dashboard', 'Consumption', etc.).
 * @param {function} onNavigate - Function to set the new active page.
 */
const Sidebar = ({ activePage, onNavigate }) => { // <-- ACCEPT PROPS
  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'Consumption', icon: ConsumptionIcon }, // <-- MATCHES PAGE NAME
    { name: 'Quality Monitor', icon: QualityIcon },
    { name: 'Alerts', icon: AlertsIcon },
    { name: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-logo">
          <span className='logo-icon'>💧</span>
          <h3>HydroSentinel</h3>
          <p style={{fontSize: '10px', color: '#999', margin: '0 0 0 5px'}}>IoT Water Intelligence</p>
        </div>
        <nav>
          <h4>NAVIGATION</h4>
          {navItems.map(item => (
            <div
              key={item.name}
              className={`nav-item ${item.name === activePage ? 'active' : ''}`} // <-- CONDITIONAL ACTIVE CLASS
              onClick={() => onNavigate(item.name)} // <-- NEW CLICK HANDLER
            >
              <item.icon />
              {item.name}
            </div>
          ))}
        </nav>
      </div>
      <div className="user-profile">
        <div className="user-avatar">U</div>
        <div className="user-details">
          <p>Water Manager</p>
          <p>System Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;