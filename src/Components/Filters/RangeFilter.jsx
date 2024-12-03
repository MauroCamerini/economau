import * as React from 'react'
import { Form, Stack } from 'react-bootstrap'
import { TransactionsContext } from '../../Context/TransactionsContext'

export default function RangeFilter({col, disabled}) {
    
    const {addFilter, removeFilter } = React.useContext(TransactionsContext)

    const [fromValue, setFromValue] = React.useState('')
    const [toValue, setToValue] = React.useState('')


    const handleChange = (event) => {
        const {id, value} = event.target;

        if(id=='from') setFromValue(value + (col.field === 'Period' ? "-01" : ""))
        if(id=='to') setToValue(value + (col.field === 'Period' ? "-01" : ""))
    }

    React.useEffect(()=>{
        if(disabled) {
            setFromValue("")
            setToValue("")
        }
    }, [disabled])

    React.useEffect(() => {
        if(fromValue != "" && toValue != "") {
            addFilter(col.field, col.filter, {from: fromValue, to: toValue})
        } else {
            removeFilter(col.field)
        }
    }, [fromValue, toValue])

    return (
        <Stack>
            <div>
                <Form.Label>Desde:</Form.Label>
                <Form.Control 
                    size='sm'
                    id='from' 
                    type={col.field === 'Period' ? 'month' : 'date'}
                    onChange={handleChange} 
                    disabled={disabled}
                    />
            </div>
            <div>
                <Form.Label>Hasta:</Form.Label>
                <Form.Control 
                    size='sm'
                    id='to' 
                    type={col.field === 'Period' ? 'month' : 'date'} 
                    onChange={handleChange}
                    disabled={disabled} 
                    />
            </div>
        </Stack>
    )
}