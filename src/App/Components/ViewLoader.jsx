import * as React from 'react'
import { FilteredDataContext } from '../Context/FilteredDataContext'
import ViewTable from './ViewTable/ViewTable'

/**
 * Shows the data disposed by the FilteredDataContext
 * @see FilteredDataContext
 */
export default function ViewLoader() {
    const {data, tableName} = React.useContext(FilteredDataContext)

    return (<>{data && <ViewTable data={data} tableName={tableName} />}</>)
}