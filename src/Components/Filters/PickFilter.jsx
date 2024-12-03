import * as React from 'react'
import { DatabaseContext } from '../../Context/DatabaseContext'
import { Form } from 'react-bootstrap'

const ALL_VALUE = "*ALL"
const NONE_VALUE = "*NONE"

export default function PickFilter({col, onValueChange, disabled}) {

    const [picked, setPicked] = React.useState([])
    const { linkedFields } = React.useContext(DatabaseContext)

    const getItems = () => {
        return linkedFields.find(element => element.TransactionField === col.field).Items
    }

    const handleSelectChange = (event) => {
        
        // Picked option
        const value = event.target.value

        const items = getItems()
        const itemsID = items.map(item => item.ID)

        switch (value) {
            case ALL_VALUE:
                setPicked(Array.from(itemsID))
                break;
            case NONE_VALUE:
                setPicked([])
                break;
        
            default:

                const parsedValue = col.parse(value)
                const index = picked.indexOf(parsedValue)

                if(index < 0) {
                    setPicked(prev => {
                        const newPicked = Array.from(prev)
                        newPicked.push(parsedValue)
                        return newPicked
                    })
                }else{
                    setPicked(prev => {
                        const newPicked = Array.from(prev)
                        newPicked.splice(index, 1)
                        return newPicked
                    })
                }
                break;
        }


    }

    React.useEffect(() => {

        if(!onValueChange) return
        
        if(picked.length < 1) {
            onValueChange(col.field, null, null)
            return
        }

        onValueChange(col.field, col.filter, picked)

    }, [picked])


    React.useEffect(()=> {
        if(disabled) {
            setPicked([])
        } else {
            setPicked(Array.from(getItems().map(item => item.ID)))
        }
    }, [disabled])

    return (<>
        <Form.Select size="sm" disabled={disabled} onChange={handleSelectChange}>
        <option value={ALL_VALUE}>* Todas</option>
        <option value={NONE_VALUE}>* Ninguna</option>
        {
            linkedFields.find(value => value.TransactionField === col.field).Items.map(item => 
                <option key={item.ID} value={item.ID}>
                    {item.Name + (picked.indexOf(item.ID)<0 ? ""  : " ✓")}
                </option>
            )
        }
        </Form.Select>
    </>)
}