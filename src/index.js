import { app, BrowserWindow } from 'electron';

const add_application_menu = require('./appmenu.js');

//require('electron-reload')([__dirname, __dirname + '/../../gitdir-sample-only']);
require('electron-reload')([__dirname, '/Users/rudifarkas/Dev/js/electron/gitdir-sample-only']);
// it seems to watch the 2nd dirName, provided that it is absolute and resolved
console.log('__dirname=', __dirname);
//console.log('__dirname=', __dirname + '/../../gitdir-sample-only');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  console.log('=> createWindow');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode:'undocked'});

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  add_application_menu();

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load');
    // signal renderer to get directory from settings and use it
    mainWindow.webContents.send('dir-selected', null);
  });

  console.log('userData', app.getPath('userData'));

  console.log('<= createWindow');
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
