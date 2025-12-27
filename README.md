# Hydro-Sentinel
A web-based application that is a comprehensive IoT solution that enables **efficient monitoring** of both **water consumption patterns** and **water quality parameters**

---

## Features
- A flow sensor monitors the speed and pressure of water flow, helping track consumption, identify leaks, and ensure optimal water distribution.
- A TDS (Total Dissolved Solids) sensor assesses water quality by measuring the concentration of dissolved minerals, salts, and impurities.

---

##  Installation Guide

### **Frontend Setup**
```bash
cd hydro-sentinel-dashboard
npm install
npm start
```
Backend Setup
```
connected those 2 sensors with ESP 32
change WIFI ID & Password
setup.begin(26500)
```

## How to Use
1. Start the Application

Run the frontend and backend servers.

Open the frontend in your browser.

2.Check real time changes on Dashboard and blinking notification of leaks and TDS anamoly .

3. Can change the threshold values of flow and TDSon settings page .


🛠️ Tech Stack

Frontend: Html , CSS, React.js
Backend: C for controlling ESP 32
Visualization: currently hard codded by CSS
Tools: VS Code , Arduino IDE , Firebase

## File structure

```
hydro-sentinel-dashboard/
│── node_modules/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── AlertCard.js
│   │   ├── DashboardContent.js
│   │   ├── Header.js
│   │   ├── MetricCard.js
│   │   ├── SensorData.js
│   │   ├── Sidebar.js
│   │   └── SystemMonitorCard.js
│   │
│   ├── pages/
│   │   ├── AlertsPage.js
│   │   ├── ConsumptionPage.js
│   │   ├── QualityMonitorPage.js
│   │   └── SettingsPage.js
│   │
│   ├── styles/
│   │   └── App.css
│   │
│   ├── App.js
│   ├── firebase-config.js
│   └── index.js
│
├── package.json
├── package-lock.json
└── README.md

### Folder Overview
- `public/` – Static HTML entry point  
- `src/components/` – Reusable UI components  
- `src/pages/` – Application pages/routes  
- `src/styles/` – Global and component styles  
- `firebase-config.js` – Firebase configuration  
- `App.js` – Main application component  
- `index.js` – Application entry point  
 ```

### Contributing

Feel free to submit issues or pull requests to improve the system.
