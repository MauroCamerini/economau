import { executeQuery, insertRecord, readRecords } from "./crud"
import { dynamicViews } from "./db.config"

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
        const data = dynamicViews[table] 
            ? executeQuery(db, dynamicViews[table].query, filters) 
            : readRecords(db, table, filters)

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