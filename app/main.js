// Module to control application life.
const electron = require('electron');
const Store = require('./main/classes/Store/_store.js');

let path = require('path');
let app = electron.app;
let store = new Store();

// Module to create native browser window.
let BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

    let { width, height } = store.getBounds();

    // Create the browser window.
    mainWindow = new BrowserWindow(
        {
            width: width, height: height,
            contentSecurityPolicy: `
            script-src 'self';
            unsafe-eval 'disable';`,
            icon: path.join(__dirname, 'assets/icons/png/64x64.png')
        });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/render/index.html');

    // Open the devtools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.on('resize', () => {
        let { width, height } = mainWindow.getBounds();

        store.saveBounds({ width, height });
    });

});