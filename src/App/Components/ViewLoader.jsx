import * as React from 'react'
import { FilteredDataContext } from '../Context/FilteredDataContext'
import ViewTable from './ViewTable/ViewTable'

/**
 * Shows an TransactionsTable but gets the data from a TransactionContext
 */
export default function ViewLoader() {
    const {data, tableName} = React.useContext(FilteredDataContext)

    console.log(data, tableName)

    if(!data) return null

    return (<ViewTable data={data} tableName={tableName} />)
}