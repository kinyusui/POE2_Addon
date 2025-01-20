const { app, BrowserWindow } = require('electron');

const sampleSite = 'https://google.com';

type ElectronBrowserWindow = Electron.CrossProcessExports.BrowserWindow;

class WindowsHandler {
  mainWindow?: ElectronBrowserWindow;
  constructor() {
  }

  getDefaultPage = () => {
    return new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false, // Keep this false for better security
      },
    });
  }

  setMainWindow = () => {
    this.mainWindow = this.getDefaultPage();
    this.mainWindow.on('closed', () => {
      WINDOWS_HANDLER.cleanUp();
    });
  }

  cleanUp = () => {
    delete this.mainWindow;
  }

  loadSite = () => {
    // const filePath = "../localAssets/index.html";
    // console.log(filePath);
      // Set Content Security Policy
    // const contentSecurityPolicy = `
    //   default-src 'self';
    //   script-src 'self';
    //   style-src 'self';
    // `;
    // this.mainWindow?.webContents.session.setPreloads([contentSecurityPolicy]);
    // this.mainWindow?.loadFile(filePath);
    this.mainWindow?.loadURL(sampleSite);

    this.mainWindow?.webContents.openDevTools();
  }

  initDefault = () => {
    this.setMainWindow();
    this.loadSite();
  }
}

const WINDOWS_HANDLER = new WindowsHandler();

app.on('ready', () => {
  WINDOWS_HANDLER.initDefault();
});

app.on('window-all-closed', () => {
  const platformNotMac = process.platform !== 'darwin';
  if (platformNotMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (!WINDOWS_HANDLER.mainWindow) {  
    WINDOWS_HANDLER.initDefault();
  }
});
