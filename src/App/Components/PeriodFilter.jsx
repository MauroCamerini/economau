import * as React from 'react'
import useAsyncData from '../Hooks/useAsyncData'
import { Form } from 'react-bootstrap'
import { formatters } from '../config'
import { FilteredDataContext } from '../Context/FilteredDataContext'
import LoadingData from './LoadingData'

/**
 * A select element that lists every period that has records. Updates the FilteredDataContext.
 * @see {FilteredDataContext}
 */
export default function PeriodFilter() {

    const { setFilters } = React.useContext(FilteredDataContext)

    const {loading, data, error} = useAsyncData('period_items')

    const handleSelectChange = (event) => {
        const value = event.target.value
        if(!value) return
        setFilters({period: value})
    }

    return (<>
        <LoadingData loading={loading} error={error} />
        {data &&
            <Form.Group>
            <Form.Label>Seleccionar período</Form.Label>
            <Form.Select
                as="select" 
                onChange={handleSelectChange}
                >
                <option value=''>Seleccionar...</option>
                {data.map(({period}) => (
                    <option key={period} value={period}>
                    {formatters.yy_month(period)} 
                    </option>
                ))}
            </Form.Select>
            </Form.Group>
        }
    </>)

}