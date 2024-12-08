import * as React from 'react'
import { TransactionsContext } from '../../Context/TransactionsContext'
import TransactionTable from '../TransactionTable/TransactionTable'

/**
 * Shows an TransactionsTable but gets the data from a TransactionContext
 */
export default function TransactionLoader() {
    const {transactions} = React.useContext(TransactionsContext)

    if(!transactions) return null

    return (<TransactionTable transactions={transactions} order/>)
}