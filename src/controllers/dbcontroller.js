import db from "../db"

// Transaction fields
// (Date, Period, Amount, Category, Details, Type, Account, Entity, ExtraData)

/* Transaction object
{
    date,
    period,
    amount,
    category,
    details,
    type,
    account,
    entity,
    extradata
}
*/


/*
  Public methods
*/
const insertTrx = (data) => {

    const stm = db.prepare(
        'INSERT INTO Transactions \
        (Date, Period, Amount, Category, Details, Type, Account, Entity, ExtraData) \
        VALUES (@date, @period, @amount, @category, @details, @type, @account, @entity, @extradata)')

    stm.run(data)
}

const updateTrx = (id, data) => {

    const stm = db.prepare(
        'UPDATE Transactions SET \
        Date = @date, Period = @period, Amount = @amount, Category = @category, Details = @details, \
        Type = @type, Account = @account, Entity = @entity, ExtraData = @extradata \
        WHERE id = @id')

    stm.run({...data, id})
}

const deleteTrx = (id) => {
    const stm = db.prepare('DELETE FROM Transactions WHERE id = @id');

    stm.run(id)
}
const getAllTrx = () => {
    
    const stm = db.prepare('SELECT * FROM Transactions');

    return stm.all();
}

const getAllLists = () => {

    return {
        accounts: db.prepare('SELECT * from Accounts').all(),
        categories: db.prepare('SELECT * from Categories').all(),
        types: db.prepare('SELECT * from Types').all(),
        details: db.prepare('SELECT * from Details').all(),
        entities: db.prepare('SELECT * from Entities').all()
    }
    

}

export default {
    insertTrx,
    updateTrx,
    deleteTrx,
    getAllTrx,
    getAllLists
}

