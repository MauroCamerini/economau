import { deleteRecord, insertRecord, readRecords, updateRecord } from "./crud"
import { TransactionDataSchema } from '../utils/schema'

export async function insert(db, data) {
    await TransactionDataSchema.validate(data)
    return insertRecord(db, 'Transactions', data)
}

export async function updateById(db, id, data) {
    await TransactionDataSchema.validate(data)
    return updateRecord(db, "Transactions", data, {ID: {equals: id}})
}

export async function deleteById(db, id) {
    return deleteRecord(db, 'Transactions', {ID: {equals: id}})
}

export async function getAll(db) {
    return readRecords(db, 'Transactions')
}

export async function filter(db, filters) {
    return readRecords(db, "Transactions", filters)
}

export async function getFields(db) {

    const stmt = db.prepare("SELECT name FROM pragma_table_info('Transactions')")
    return stmt.run()
}