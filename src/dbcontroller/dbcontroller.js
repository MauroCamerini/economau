import Database from 'better-sqlite3';
import TransactionsController from './transactionscontroller';

export class DBController {
    constructor() {
        this.db = new Database('createdb.db', { verbose: console.log})
        this.db.pragma('journal_mode = WAL');

        this.metadata = this.db.prepare("SELECT * FROM Metadata").all()

        this.cache = this.initializeCache()

        this.trx = new TransactionsController(this.db)

        this.api = {
            insertTransaction: this.insertTransaction.bind(this),
            getAllTransactions: this.getAllTransactions.bind(this),
            getTables: this.getTables.bind(this),
            getListItems: this.getListItems.bind(this)
        }
    }

    initializeCache() {
        const cache = new Map()

        this.metadata.forEach((table) => {
            if(table.ShouldCache) cache.set(
                table.TableName, 
                this.db.prepare(`SELECT * FROM ${table.TableName}`).all())
        })

        return cache
    }

    /*
        API
    */
    async getTables() {

        const tables = []
        this.metadata.forEach(e => {
            tables.push( {
                name: e.TableName,
                nullable: (e.IsRequired !== 0),
                title: e.Title,
                hierarchy: e.IsHierarchical,
                field: e.TransactionField,
            })
        })
        return tables
    }

    async insertTransaction(data) {
        return await this.trx.insertTransaction(data)
    }

    async getAllTransactions() {
        return await this.trx.getAllTransactions()
    }

    async getListItems(tableName) {
        return this.cache.get(tableName)
    }

}