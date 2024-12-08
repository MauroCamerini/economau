import { insertRecord, readRecords } from "./crud"

async function newTransaction(db, data) {

    try {
        const info = insertRecord(db, 'transactions', data)
        return {
            success: true,
            info
        }
    } catch (e) {
        return {
            success: false,
            error: e.message
        }
    }
}


async function getData(db, table, filters) {
    try {
        const data = readRecords(db, table, filters)
        return {
            success: true,
            data
        }
    } catch (e) {
        return {
            success: false,
            error: e.message
        }
    }
}


const ipcFunctions = {
    newTransaction,
    getData
}

export default ipcFunctions