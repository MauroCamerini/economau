import Database from 'better-sqlite3'
import createTables from './createTables.sql'
import fs from 'node:fs'
import { dbConfig } from '../db.config'


/**
 * Checks if the data base file exists
 */
export const dbExixts = () => fs.existsSync(dbConfig.fileName)

/**
 * Creates de tables and inserts default data.
 */
export function createDB() {
    const queries = createTables.split(';')
    const db = new Database(dbConfig.fileName, {verbose: console.log})
    db.exec(createTables)
    db.close()
}