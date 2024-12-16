import * as React from 'react'
import { FilteredDataProvider } from '../Context/FilteredDataContext'
import CategoryManager from '../Components/CategoryManager/CategoryManager'


export default function EditCategories() {

    return(<>
        <FilteredDataProvider tableName='category_items'>
            <CategoryManager />
        </FilteredDataProvider>
    </>)
}