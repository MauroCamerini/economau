// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    'dbcontroller',
    {
        insertTrx: (data) => ipcRenderer.invoke('insertTrx', data),
        updateTrx: (id, data) => ipcRenderer.invoke('updateTrx', id, data),
        deleteTrx: (id) => ipcRenderer.invoke('deleteTrx', id),
        getAllTrx: () => ipcRenderer.invoke('getAllTrx'),
        getAllLists: () => ipcRenderer.invoke('getAllLists')
    }
)