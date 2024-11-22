import { insertRecord, readRecords } from "./crud"
import { TransactionDataSchema } from '../utils/schema'

export async function insert(db, data) {
    await TransactionDataSchema.validate(data)
    return insertRecord(db, 'Transactions', data)
}

export async function getAll(db) {
    return readRecords(db, 'Transactions')
}
