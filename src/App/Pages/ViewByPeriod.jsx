import * as React from 'react'
import { useParams } from 'react-router-dom'
import ViewLoader from '../Components/ViewLoader'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import PeriodPicker from '../Components/PeriodPicker'
import { Stack } from 'react-bootstrap'

export default function ViewByPeriod() {
    
    const { table } = useParams()

    return (
        <FilteredDataProvider tableName={table}>
            <Stack gap={3}>
                <PeriodPicker />
                <ViewLoader tableName={table} />
            </Stack>
        </FilteredDataProvider>
    
)

}