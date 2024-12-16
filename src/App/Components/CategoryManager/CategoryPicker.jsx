import * as React from 'react'
import { Form } from 'react-bootstrap'

/**
 * Category picker for the category manager
 */
export default function CategoryPicker({onCategoryPick, categoryItems, allowRootValue, currentItem}) {

    const [pickedID, setPickedID ] = React.useState(currentItem?.parent_id || '')

    const handleSelectChange = (event) => {

        const { value } = event.target

        setPickedID(value)

        if(!onCategoryPick) return // What function are we going to call back?

        if(!value && !allowRootValue) return
        
        onCategoryPick(value ?
            categoryItems.find(e => e.id === parseInt(value))
            : {id: null} // root
        )
    }

    React.useEffect(() => {
        setPickedID(currentItem?.parent_id || '')
    }, [currentItem])

    return (<>
        <Form.Select
            as="select" 
            onChange={handleSelectChange}
            value={pickedID}
            >
            <option value=''>{allowRootValue ? "** raíz **" : "Seleccionar..."}</option>
            {categoryItems.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                    {`${(currentItem && currentItem?.parent_id === categoryItem.id) ? "ACTUAL: " : ""}${categoryItem.path}`}
                </option>
            ))}
        </Form.Select>
    </>)

}