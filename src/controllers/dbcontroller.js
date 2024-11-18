import db from "../db"
import { TransactionDataSchema } from "../utils/schema";

import { tables } from "../utils/tables"

// Inserta una transacción en la base de datos
async function insertTransaction(transaction) {
  try {
      // Validar la data
      await TransactionDataSchema.validate(transaction);

      const insert = db.prepare(`
          INSERT INTO Transactions (
              Date,
              Period,
              Amount,
              Category,
              Type,
              Account,
              Entity,
              ExtraData
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = insert.run(
          transaction.Date,
          transaction.Period,
          transaction.Amount,
          transaction.Category,
          transaction.Type,
          transaction.Account,
          transaction.Entity || null,
          transaction.ExtraData || null
      );

      console.log(`Registro insertado con ID: ${result.lastInsertRowid}`);
      return { success: true, id: result.lastInsertRowid };
  } catch (error) {
      console.error('Error al insertar la transacción:', error.message);
      return { success: false, error: error.message };
  }
}

const getAllTransactions = () => {
    
    
    try {
      const data = db.prepare('SELECT * FROM Transactions').all();
      return {
        success: true,
        data,
      }
    } catch(error) {
      console.error(`Error al las transacciones: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
    

}

const getAllLists = () => {
  
    try {
      tables.forEach((table) => {
        table.data = db.prepare(`SELECT * FROM ${table.name}`).all();
      });
    } catch (error) {
      console.error(`Error al obtener datos de las tablas: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  
    return {
      success: true,
      data: tables,
    };
  }
  
/* this list should match api.js list */
export default {
    insertTransaction,
    getAllTransactions,
    getAllLists
}

