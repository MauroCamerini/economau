
/**
 * Generates an SQL WHERE clause based on the provided filters.
 *
 * @function
 * @param {Object} filters - Filters to apply, structured as key-value pairs:
 * - For equality: `fieldName: { equals: value } `
 * - For multiple values: `fieldname: { in: [value1, value2, ...] }`
 * - For date ranges: `fieldname: { range: { from: Date, to: Date } }`
 * - For income or expenses: `fieldname: { sign: 'positive' || 'negative' }`
 * @param {string} prefix - Prefix added to params to avoid overwrite previous params 
 * 
 * @returns {Object} An object containing:
 * - `clause` (string): The SQL WHERE clause.
 * - `params` (Object): Key-value pairs to use as parameters in the SQL statement.
 *
 * @example
 * const filters = {
 *   ID: { equals: 255 },
 *   Category: { in: ['A', 'B'] },
 *   Date: { from: '2023-01-01', to: '2023-12-31' }
 * };
 */
function generateWhereClause(filters, prefix = "filter_") {
    const clauses = []
    const params = {}


    for (const[field, condition] of Object.entries(filters)) {
        
        if (condition.equals) {
            
            clauses.push(`${field} = @${prefix}${field}`);
            params[`${prefix}${field}`] = condition.equals;
        
        } else if (condition.in && Array.isArray(condition.in)) {
            const placeholders = condition.in.map((_, i) => `@${prefix}${field}_${i}`);
            clauses.push(`${field} IN (${placeholders.join(", ")})`);
            condition.in.forEach((value, i) => {
                params[`${prefix}${field}_${i}`] = value;
            });
        
        } else if (condition.range && condition.range.from && condition.range.to) {
            
            clauses.push(`(${field} >= @${prefix}${field}_from AND ${field} <= @${prefix}${field}_to)`);
            params[`${prefix}${field}_from`] = condition.range.from;
            params[`${prefix}${field}_to`] = condition.range.to;
        } else if (condition.sign) {
            clauses.push(condition.sign === 'positive' ? `(${field} >= 0)` : `(${field} <= 0)`)
        }
    }

    return {
        clause: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
        params,
    };

}

/**
 * Inserts a new record in the DB
 * 
 * @param {Database} db - better-sqlite3 Database object
 * @param {string} tableName - The name of the table to insert.
 * @param {Object} data - Key-value pairs representing the fields to insert and their new values.
 * @returns {Object} Result of the insert operation:
 * An info object describing any changes made. The info object has two properties:
 * - info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function insertRecord(db, tableName, data) {

    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(key => `@${key}`).join(', ');

    const stmt = db.prepare(`
        INSERT INTO ${tableName} (${columns}) 
        VALUES (${placeholders})
    `);

    return stmt.run(data);

}

/**
 * Updates records in the specified table based on provided data and filters.
 *
 * @param {Database} db - better-sqlite3 Database object
 * @param {string} tableName - The name of the table to update.
 * @param {Object} data - Key-value pairs representing the fields to update and their new values.
 * @param {Object} filters - Filters to apply to the update operation.
 * @returns {Object} Result of the insert operation:
 * An info object describing any changes made. The info object has two properties:
 * - info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function updateRecord(db, tableName, data, filters) {

    const setClause = Object.keys(data).map(key => `${key} = @${key}`).join(', ');
    
    const whereClause = generateWhereClause(filters)

    const stmt = db.prepare(`
        UPDATE ${tableName}
        SET ${setClause}
        ${whereClause.clause}
    `);

    return stmt.run({...data, ...whereClause.params});

}
/**
 * Deletes records from the specified table based on provided filters.
 *
 * @param {Database} db - better-sqlite3 Database object
 * @param {string} tableName - The name of the table to delete records from.
 * @param {Object} filters - Filters to apply to the delete operation
 * @returns {Object} Result of the insert operation:
 * An info object describing any changes made. The info object has two properties:
 * - info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function deleteRecord(db, tableName, filters) {

    const whereClause = generateWhereClause(filters);

    if (!whereClause.clause) {
        throw new Error("Delete operation requires at least one filter condition.");
    }

    const stmt = db.prepare(`
        DELETE FROM ${tableName}
        ${whereClause.clause}
    `);

    const info = stmt.run(whereClause.params);

    return { success: true, info };
}

export function executeQuery(db, query, params) {

    const stmt = db.prepare(query);

    return stmt.all(params)
}

/**
 * Reads records from the specified table based on provided filters.
 *
 * @param {Database} db - An better-sqlite3 Database
 * @param {string} tableName - The name of the table to read records from.
 * @param {Object} filters - Filters to apply, structured as key-value pairs.
 * 
 * @returns {Object} Result of the insert operation:
 * An info object describing any changes made. The info object has two properties:
 * - info.changes: the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * info.lastInsertRowid: the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */
export function readRecords(db, tableName, filters = {}) {

    const whereClause = generateWhereClause(filters);

    const stmt = db.prepare(`
        SELECT * FROM ${tableName}
        ${whereClause.clause}
    `);

    return stmt.all(whereClause.params)

}

