import * as React from 'react'
import { useParams } from 'react-router-dom'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import ViewLoader from '../Components/ViewLoader'

export default function View() {
    
    const { table } = useParams()


    return (
        <FilteredDataProvider tableName={table}>
            <ViewLoader />
        </FilteredDataProvider>
    )

}