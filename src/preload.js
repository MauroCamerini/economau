// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require("electron");
import { ipcFunctionsNames } from "./ipc.config";

contextBridge.exposeInMainWorld(
    'ipc',
    ipcFunctionsNames.reduce((prev, funcName) => {
        prev[funcName] = (...args) => ipcRenderer.invoke(funcName, ...args)
        return prev
    }, {})
)