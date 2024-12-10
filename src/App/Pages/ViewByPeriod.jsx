import * as React from 'react'
import { useParams } from 'react-router-dom'
import ViewLoader from '../Components/ViewLoader'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import PeriodPicker from '../Components/PeriodPicker'

export default function ViewByPeriod() {
    
    const { table } = useParams()

    return (
        <FilteredDataProvider tableName={table}>
            <PeriodPicker />
            <ViewLoader tableName={table} />
        </FilteredDataProvider>
    
)

}