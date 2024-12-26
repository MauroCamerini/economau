import * as React from 'react'
import { FilteredDataContext } from '../../Context/FilteredDataContext'
import CategoryPicker from './CategoryPicker'
import CategoryEditor from './CategoryEditor'
import DBResponse from '../DBResponse'
import { Stack } from 'react-bootstrap'
import PickerContainer from '../PickerContainer'


export default function CategoryManager() {
    
    const { reload, data } = React.useContext(FilteredDataContext)
    const [ dbResponse, setDBResponse] = React.useState(null)
    const [ pickedCategoryItem, setPickedCategoryItem ] = React.useState(null)

    React.useEffect(() => {
        if(dbResponse && dbResponse.success) {
            setPickedCategoryItem(null) // Causes category editor to not render
            reload()
        }
    }, [dbResponse])

    return(<>{ data &&
        <Stack gap={3} >
            <h3>Crear</h3>
            <CategoryEditor onDBResponse={(response) => setDBResponse(response)}/>

            <h3>Modificar</h3>
            <PickerContainer>
                <CategoryPicker 
                    onCategoryPick={(newPickedCategory) => setPickedCategoryItem(newPickedCategory)} 
                    categoryItems={data} 
                    allowRootValue={false} 
                    />
            </PickerContainer>
            { pickedCategoryItem && pickedCategoryItem.id && 
                <CategoryEditor 
                    categoryItem={pickedCategoryItem} 
                    onDBResponse={(response) => setDBResponse(response)}
                /> 
            }
            <DBResponse dbResponse={dbResponse} successMsg={`Operación realizada con éxito ${(dbResponse?.info?.lastInsertRowid) || " "}`} />
        </Stack>
        }
    </>)
}