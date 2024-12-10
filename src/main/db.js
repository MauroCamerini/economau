import fs from 'node:fs'
import Database from 'better-sqlite3'
import createDatabaseQuery from './sql/database.sql'
import { dbConfig } from './db.config'


/**
 * Checks if the data base file exists
 */
export const dbExixts = () => fs.existsSync(dbConfig.fileName)

/**
 * Creates the database file and intializes default data.
 */
export function createDB() {
    const db = new Database(dbConfig.fileName)
    db.exec(createDatabaseQuery)
    db.close()
}

/**
 * Opens the DB and returns it's instance. File must extists
 * @returns {Database} 
 */
export function openDB() {
    const db = new Database(dbConfig.fileName, { fileMustExist: true })

    return db
}