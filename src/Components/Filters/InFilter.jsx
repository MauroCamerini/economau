import * as React from 'react'
import { DatabaseContext } from '../../Context/DatabaseContext'
import { Form } from 'react-bootstrap'
import { TransactionsContext } from '../../Context/TransactionsContext'

const ALL_VALUE = "*ALL"
const NONE_VALUE = "*NONE"

/**
 * Allows the user to pick elements and adds it to the current filters context.
 * Props are a column for the table configuration in from ui.config and disabled boolean.
 */
export default function InFilter({col, disabled}) {

    const [picked, setPicked] = React.useState([])
    const { linkedFields } = React.useContext(DatabaseContext)

    const { addFilter, removeFilter } = React.useContext(TransactionsContext)

    /**
     * Returns the items of corresponding linkedField according to col.field
     */
    const getItems = () => {
        return linkedFields.find(element => element.TransactionField === col.field).Items
    }

    const handleSelectChange = (event) => {
        
        event.preventDefault()

        // Picked option
        const value = event.target.value

        const items = getItems()
        const itemsID = items.map(item => item.ID) // Only ID are inserted in filters.

        switch (value) {
            case ALL_VALUE: // Select all options
                setPicked(Array.from(itemsID))
                break;
            case NONE_VALUE: // Select no options
                setPicked([])
                break;
        
            default: // When the users pick an options, updates it on the picked array.

                const parsedValue = col.parse(value)
                const index = picked.indexOf(parsedValue)

                if(index < 0) { // If not in picked, adds it
                    setPicked(prev => {
                        const newPicked = Array.from(prev)
                        newPicked.push(parsedValue)
                        return newPicked
                    })
                }else{ // If it is in picked, removes it
                    setPicked(prev => {
                        const newPicked = Array.from(prev)
                        newPicked.splice(index, 1)
                        return newPicked
                    })
                }
                break;
        }


    }

    // When picked items change it updates filter in the context
    React.useEffect(() => {
        
        if(picked.length < 1) {
            removeFilter(col.field)
            return
        }

        addFilter(col.field, col.filter, picked)

    }, [picked])

    // When disabled remove filters, when enabled select ALL
    React.useEffect(()=> {
        if(disabled) {
            setPicked([])
        } else {
            setPicked(Array.from(getItems().map(item => item.ID)))
        }
    }, [disabled])

    return (<>
        <Form.Select size="sm" disabled={disabled} onChange={handleSelectChange}>
        <option value={ALL_VALUE}>* Marcar todas</option>
        <option value={NONE_VALUE}>* Desmarcar todas</option>
        {
            linkedFields.find(value => value.TransactionField === col.field).Items.map(item => 
                ( !item.Internal &&
                <option key={item.ID} value={item.ID}>
                    {item.Name + (picked.indexOf(item.ID)<0 ? ""  : " ✓")}
                </option>
                )
            )
        }
        </Form.Select>
    </>)
}