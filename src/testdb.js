import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./dbfile/db.db')

export const initdb = async () => {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS testtable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            test CHAR
        )
        `)
}

export const  testinsert = async () => {
    await db.run('INSERT INTO testtable (test) VALUES (?)', ['a'])
    const data = await db.run('SELECT * FROM testtable')
    console.log(data)
}