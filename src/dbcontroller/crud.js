export async function getAllRecords(db, tableName) {
    return db.prepare(`SELECT * FROM ${tableName}`).all()
}


export async function insertRecord(db, tableName, data) {

    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(key => `@${key}`).join(', ');
    
    const stmt = db.prepare(`
        INSERT INTO ${tableName} (${keys}) 
        VALUES (${placeholders})
    `);

    return  stmt.run(data);
}

/*
export async function updateRecordById(tableName, id, data) {
    try {
        const setClause = Object.keys(data).map(key => `${key} = @${key}`).join(', ');
        
        const stmt = db.prepare(`
            UPDATE ${tableName}
            SET ${setClause}
            WHERE ID = @ID
        `);

        const result = stmt.run({...data, ID: id});

        if(metadata[tableName].ShouldCache) loadTableToCache(tableName)

        return { success: true, changes: result.changes };
    } catch (error) {
        console.error(`Error updating ${tableName}:`, error.message);
        return { success: false, error: error.message };
    }
}
*/
