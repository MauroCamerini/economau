import { insertRecord, getAllRecords } from "./crud"
import { TransactionDataSchema} from '../utils/schema'

export default class TransactionsController {
    constructor(db) {
        this.db = db
    }

    async insertTransaction(data) {
        await TransactionDataSchema.validate(data)
        return await insertRecord(this.db, 'Transactions', data)
    }

    async getAllTransactions() {
        return await getAllRecords(this.db, 'Transactions')
    }
}