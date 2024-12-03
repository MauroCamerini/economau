import Database from 'better-sqlite3'
import createDBQuery from '../sql/createdb.sql'
import fs from 'node:fs'
import { dbConfig } from '../config/db.config'


/**
 * Checks if the data base file exists
 */
export const dbExixts = () => fs.existsSync(dbConfig.fileName)

/**
 * Creates de tables and inserts default data.
 */
export function createDB() {
    const queries = createDBQuery.split(';')
    const db = new Database(dbConfig.fileName, {verbose: console.log})
    db.exec(createDBQuery)
    db.close()
}