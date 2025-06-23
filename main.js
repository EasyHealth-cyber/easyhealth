const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  const indexPath = path.join(__dirname, 'EasyHealth_frontend', 'dist', 'index.html');
  console.log('🧭 Loading:', indexPath);

  win.loadFile(indexPath);

  // Open DevTools to debug blank screen
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
