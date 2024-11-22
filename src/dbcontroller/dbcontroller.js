import Database from 'better-sqlite3';
import * as Transactions from './transactions';
import { readRecords } from './crud';

/**
 * Initializes de DB and exposes an API meant to be reached by render process
 */
export class DBController {
    constructor() {
        this.db = new Database('createdb.db', { verbose: console.log })
        this.db.pragma('journal_mode = WAL');

        this.api = {
            insertTransaction: this.insertTransaction.bind(this),
            getAllTransactions: this.getAllTransactions.bind(this),
            getLinkedFields: this.getLinkedFields.bind(this),
        }
    }


    /*
        API
    */

    async getLinkedFields() {

        try {
            const linkedFields = readRecords(this.db, "Metadata")
            linkedFields.forEach(linkedField => linkedField.Items = readRecords(this.db, linkedField.TableName))
            return { success: true, data: linkedFields }
        } catch (error) {
            return { success: false, error: error.message }
        }

    }

    async insertTransaction(data) {
        try {
            const info = await Transactions.insert(this.db, data)
            return { success: true, info }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    async getAllTransactions() {
        try {
            const data = await Transactions.getAll(this.db)
            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

}