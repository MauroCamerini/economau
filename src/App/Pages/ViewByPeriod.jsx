import * as React from 'react'
import { useParams } from 'react-router-dom'
import ViewLoader from '../Components/ViewLoader'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import PeriodFilter from '../Components/PeriodFilter'
import { Stack } from 'react-bootstrap'
import { formatters } from '../config'

export default function ViewByPeriod() {
    
    const { table } = useParams()

    const currentPeriod = formatters.yy_month(new Date())

    return (
        <FilteredDataProvider tableName={table} defaultFilter={{period: currentPeriod}}>
            <Stack gap={3}>
                <PeriodFilter />
                <ViewLoader tableName={table} />
            </Stack>
        </FilteredDataProvider>
    
    )

}