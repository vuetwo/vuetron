const electron = require('electron');

// initialize Vuetron server w/ sockets
const { server } = require('./vuetron-server');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname);
}

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, icon: './cpu.png' })
  const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');
  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:3000`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/index.html`);
  }

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
