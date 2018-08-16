// Module to control application life.
const electron = require('electron');
var path = require('path');

var e_app = electron.app;

// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// Quit when all windows are closed.
e_app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
      e_app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
e_app.on('ready', function () {

  // Create the browser window.
  mainWindow = new BrowserWindow(
      {
          width: 1400, height: 900,
          contentSecurityPolicy: `
            script-src 'self';
            unsafe-eval 'disable';`,
          icon: path.join(__dirname, 'assets/icons/png/64x64.png')
      });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});