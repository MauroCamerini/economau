import Database from 'better-sqlite3';
import * as Transactions from './transactions';
import { readRecords } from './crud';
import { dbConfig } from '../db.config';


/**
 * Initializes de DB and exposes an API meant to be reached by render process
 */
export class DBController {
    constructor() {
        this.db = new Database(dbConfig.fileName, { fileMustExist: true })
        this.db.pragma('journal_mode = WAL');

        this.api = {
            insertTrx: this.insertTrx.bind(this),
            getAllTrx: this.getAllTrx.bind(this),
            getLinkedFields: this.getLinkedFields.bind(this),
            updateTrxByID: this.updateTrxByID.bind(this),
            deleteTrxByID: this.deleteTrxByID(this),
            filterTrx: this.filterTrx.bind(this),
            getTrxFields: this.getTrxFields.bind(this)
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

    async insertTrx(data) {
        try {
            const info = await Transactions.insert(this.db, data)
            return { success: true, info }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    async getAllTrx() {
        try {
            const data = await Transactions.getAll(this.db)
            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    async updateTrxByID(id, data) {
        try {
            const info = await Transactions.updateById(this.db, id, data)
            return { success: true, info}
        } catch (error) {
            return { success: false, error: error.message}
        }
    }

    async deleteTrxByID(id) {
        try {
            const info = await Transactions.deleteById(this.db, id)
            return { success: true, info}
        } catch (error) {
            return { success: false, error: error.message}
        }
    }

    async filterTrx(filters) {
        try {
            const data = await Transactions.filter(this.db, filters)
            return { success: true, data}
        } catch (error) {
            return { success: false, error: error.message}
        }
    }

    async getTrxFields () {
        try {
            const data = await Transactions.getFields(this.db)
            return { success: true, data}
        } catch (error) {
            return { success: false, error: error.message}
        }
    }
}