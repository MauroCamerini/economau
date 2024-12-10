import * as React from 'react'

import { Stack } from 'react-bootstrap'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import Filters from '../Components/Filters/Filters'
import ViewLoader from '../Components/ViewLoader'

export default function ViewTransactions() {

    return (<>
        <FilteredDataProvider tableName='transactions_view'>
        <Stack gap="3"> 
            <Filters />
            <ViewLoader />
        </Stack>
        </FilteredDataProvider>
    </>)
}