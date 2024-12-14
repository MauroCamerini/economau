import * as React from 'react'
import { Form } from 'react-bootstrap'
import { FilteredDataContext } from '../../Context/FilteredDataContext'
import useAsyncData from '../../Hooks/useAsyncData'
import { toInFilterValue } from '../../config'

const ALL_VALUE = "*ALL"
const NONE_VALUE = "*NONE"
const WILDCARD = '*WILDCARD'

/**
 * Allows the user to pick elements and adds it to the current filters context.
 * Props are a column for the table configuration in from ui.config and disabled boolean.
 */
export default function InFilter({field, disabled}) {

    const [wildcardValue, setWildcardValue] = React.useState(WILDCARD)
    const [ picked, setPicked] = React.useState(null)
    const { loading, data: items, error } = useAsyncData(`${field}_items`)

    const { addFilter, removeFilter } = React.useContext(FilteredDataContext)

    function areArraysEqual(arr1, arr2) {

        if(!arr1 || !arr2) return false

        if (arr1.length !== arr2.length) return false;
    
        const sorted1 = arr1.slice().sort();
        const sorted2 = arr2.slice().sort();
    
        return sorted1.every((value, index) => value == sorted2[index]);
    }
    

    const handleSelectChange = (event) => {
        
        event.preventDefault()

        // Picked option
        const value = event.target.value

        if(value === WILDCARD) return;

        switch (value) {
            case ALL_VALUE: // Select all options
                setPicked(Array.from(items.map(item => item.id)))
                break;
            case NONE_VALUE: // Select no options
                setPicked([])
                break;
        
            default: // When the users pick an options, updates it on the picked array.

                const filterValue = toInFilterValue(field, value)
                const index = picked ? picked.indexOf(filterValue) : -1

                if(index < 0) { // If not in picked, adds it
                    setPicked(prev => {
                        const newPicked = prev?.slice() || []
                        newPicked.push(filterValue)
                        return newPicked
                    })
                }else{ // If it is in picked, removes it
                    setPicked(prev => {
                        const newPicked = Array.from(prev)
                        newPicked.splice(index,1)
                        return newPicked
                    })
                }
                break;
        }

        
    }

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
            const newArray = Array.from(items.map(item => item.id))
            if(!areArraysEqual(picked, newArray)) {
                setPicked(newArray)
            }
        }
    }, [disabled, items])

    if(loading) return (<div>Cargando...</div>)

    if(error) return (<div>Error: {error}</div>)

    return (<>
        <Form.Select size="sm" disabled={disabled} onChange={handleSelectChange} value={WILDCARD}>
        <option value={WILDCARD}>Seleccionar ...</option>
        <option value={ALL_VALUE}>* Marcar todas</option>
        <option value={NONE_VALUE}>* Desmarcar todas</option>
        {
            picked && items.map(item => 
                <option key={item.id} value={item.id}>
                    {`${(Object.hasOwn(item, 'depth') && "> ".repeat(item.depth))}${item.name}${(picked.indexOf(item.id)<0 ? ""  : " ✓")}`}
                </option>
            )
        }
        </Form.Select>
    </>)
}