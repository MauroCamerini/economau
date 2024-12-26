import * as React from 'react'
import { FilteredDataContext } from '../Context/FilteredDataContext'
import ViewTable from './ViewTable/ViewTable'
import LoadingData from './LoadingData'

/**
 * Shows the data disposed by the FilteredDataContext
 * @see FilteredDataContext
 */
export default function ViewLoader() {
    const {loading, data, error, tableName} = React.useContext(FilteredDataContext)


    return (<>
        <LoadingData loading={loading} error={error} />
        {data && <ViewTable data={data} tableName={tableName} />}
    </>)
}