// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require("electron");
import { apifunctions } from "./config/api.config";

contextBridge.exposeInMainWorld(
    'api',
    apifunctions.reduce((prev, funcName) => {
        prev[funcName] = (...args) => ipcRenderer.invoke(funcName, ...args)
        return prev
    }, {})
)