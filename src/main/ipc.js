import { deleteRecord, executeQuery, insertRecord, readRecords, updateRecord } from "./crud"
import { dynamicViews } from "./db.config"

async function deleteByID(db, table, id) {
    try {
        const info = deleteRecord(db, table, {id: {equals: id}})
        return {
            success: true,
            info
        }
    } catch (e) {

    }
}

async function updateByID(db, table, id, data) {
    try {
        const info = updateRecord(db, table, data, {id:{equals: id}})
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

async function insertData(db, table, data) {
    try {
        const info = insertRecord(db, table, data)
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
    getData,
    updateByID,
    deleteByID,
    insertData
}

export default ipcFunctions