import * as React from 'react'
import { Form } from 'react-bootstrap'
import { FilteredDataContext } from '../../Context/FilteredDataContext'
import useAsyncData from '../../Hooks/useAsyncData'

const ALL_VALUE = "*ALL"
const NONE_VALUE = "*NONE"

/**
 * Allows the user to pick elements and adds it to the current filters context.
 * Props are a column for the table configuration in from ui.config and disabled boolean.
 */
export default function InFilter({field, disabled}) {

    const [picked, setPicked] = React.useState(null)
    const { loading, data: items, error } = useAsyncData(`${field}_items`)

    const { addFilter, removeFilter } = React.useContext(FilteredDataContext)


    const handleSelectChange = React.useCallback((event) => {
        
        event.preventDefault()

        // Picked option
        const value = event.target.value

        const itemsID = items.map(item => item.id) // Only ID are inserted in filters.

        switch (value) {
            case ALL_VALUE: // Select all options
                setPicked(Array.from(itemsID))
                break;
            case NONE_VALUE: // Select no options
                setPicked([])
                break;
        
            default: // When the users pick an options, updates it on the picked array.

                const index = picked ? picked.indexOf(value) : -1

                if(index < 0) { // If not in picked, adds it
                    setPicked(prev => {
                        const newPicked = Array.from(prev ? prev : [] )
                        newPicked.push(value)
                        return newPicked
                    })
                }else{ // If it is in picked, removes it
                    setPicked(prev => {
                        const newPicked = Array.from(prev ? prev : [])
                        newPicked.splice(index, 1)
                        return newPicked
                    })
                }
                break;
        }
    }, [items])

    // When picked items change it updates filter in the context
    React.useEffect(() => {
        
        if(!picked || disabled) {
            removeFilter(field)
            return
        }

        addFilter(field, 'in', picked)

    }, [picked])

    // When disabled remove filters, when enabled select ALL
    React.useEffect(()=> {
        if(disabled) {
            setPicked(null)
        } else {
            setPicked(Array.from(items.map(item => item.id)))
        }
    }, [disabled, items])

    if(loading) return (<div>Cargando...</div>)

    if(error) return (<div>Error: {error}</div>)

    return (<>
        <Form.Select size="sm" disabled={disabled} onChange={handleSelectChange}>
        <option value={ALL_VALUE}>* Marcar todas</option>
        <option value={NONE_VALUE}>* Desmarcar todas</option>
        {
            picked && items.map(item => 
                <option key={item.id} value={item.id}>
                    {item.name + (picked.indexOf(item.id)<0 ? ""  : " ✓")}
                </option>
            )
        }
        </Form.Select>
    </>)
}