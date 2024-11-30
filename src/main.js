const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

import Database from 'better-sqlite3';
import { createDB, dbExixts } from './db/createdb';
const { apifunctions } = require('./apifunctions');
const { DBController } = require('./dbcontroller/dbcontroller');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

/**
 * Checks if the database file exists.
 * If not, asks the users if they want to create it.
 */
const isDatabaseReady = () => {

  try {
    if(!dbExixts()){
      const res = dialog.showMessageBoxSync({
        title: "Archivo de DB no encontrado",
        message: "No se encuentra el archivo de base de datos ¿Desea crearlo o salir de la aplicación?",
        buttons: ["Crear", "Salir"],
        defaultId: 0, cancelId: 1,
        type: "question"
      })

      if(!res) {
        createDB()
      }
      
    } 
  } catch (e) {
    dialog.showErrorBox(
      "Error al generar el archivo de Base de Datos",
      "No se pudo abrir o crear la DB." + e.message)
      return false
    
  }

  return true

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  if(!isDatabaseReady()) app.quit()
  const dbcontroller = new DBController()

  apifunctions.forEach((funcName) => {
    ipcMain.handle(funcName, async (event, ...args) => {
      try {
        return await dbcontroller.api[funcName](...args)
      } catch(err) {
        console.error(`Error in ${funcName}:`, err);
        throw err; // Propaga el error al renderer si es necesario
      }
    })
  })
  
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
