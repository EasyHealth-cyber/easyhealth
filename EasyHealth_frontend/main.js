import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
const path = require('path');

const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  icon: path.join(__dirname, 'public', 'favicon.ico'),
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
