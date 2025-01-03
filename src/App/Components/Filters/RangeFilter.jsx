import * as React from 'react'
import { Form, Stack } from 'react-bootstrap'
import { FilteredDataContext } from '../../Context/FilteredDataContext'

export default function RangeFilter({field, filter , disabled}) {
    
    const {addFilter, removeFilter } = React.useContext(FilteredDataContext)

    const [fromValue, setFromValue] = React.useState('')
    const [toValue, setToValue] = React.useState('')

    const handleChange = (event) => {
        const {id, value} = event.target;

        if(id=='from') setFromValue(value)
        if(id=='to') setToValue(value)
    }

    React.useEffect(()=>{
        if(disabled) {
            setFromValue("")
            setToValue("")
        }
    }, [disabled])

    React.useEffect(() => {
        if(fromValue != "" && toValue != "") {
            addFilter(field, 'range', {from: fromValue, to: toValue})
        } else {
            removeFilter(field)
        }
    }, [fromValue, toValue])

    return (
        <Stack>
            <div>
                <Form.Label>Desde:</Form.Label>
                <Form.Control 
                    size='sm'
                    id='from' 
                    type={field === 'period' ? 'month' : 'date'}
                    value={fromValue}
                    max={toValue}
                    onChange={handleChange} 
                    disabled={disabled}
                    />
            </div>
            <div>
                <Form.Label>Hasta:</Form.Label>
                <Form.Control 
                    size='sm'
                    id='to' 
                    min={fromValue}
                    type={field === 'period' ? 'month' : 'date'}
                    value={toValue}
                    onChange={handleChange}
                    disabled={disabled} 
                    />
            </div>
        </Stack>
    )
}