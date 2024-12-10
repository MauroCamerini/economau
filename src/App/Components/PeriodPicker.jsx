import * as React from 'react'
import useAsyncData from '../Hooks/useAsyncData'
import { Form } from 'react-bootstrap'
import { formatters } from '../config'
import { FilteredDataContext } from '../Context/FilteredDataContext'

export default function PeriodPicker() {

    const { setFilters } = React.useContext(FilteredDataContext)

    const {loading, data, error} = useAsyncData('period_items')

    console.log(data)

    const handleSelectChange = (event) => {
        const value = event.target.value

        setFilters({period: value})
    }

    if(loading) return <div>Cargando...</div>

    if(error) return <div>Error: {error}</div>


    return (
        <Form.Group>
        <Form.Label>Seleccionar perído</Form.Label>
        <Form.Select
            as="select" 
            onChange={handleSelectChange}
            defaultValue={data[0].period}
            >
            {data.map(({period}) => (
                <option key={period} value={period}>
                {formatters.yy_month(period)} 
                </option>
            ))}
        </Form.Select>
        </Form.Group>
    )

}