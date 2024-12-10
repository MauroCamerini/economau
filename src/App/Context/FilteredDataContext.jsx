
import * as React from "react"

/**
 * Exposes transactions data.
 */
export const FilteredDataContext = React.createContext()

/**
 * Load transacions according to filters
 */
export function FilteredDataProvider({ children, defaultFilter, tableName }) {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [filters, setFilters] = React.useState(defaultFilter || {});

    console.log(data, loading, filters, tableName)

    const loadData = React.useCallback(async () => {
        const res = await window.ipc.getData(tableName, filters)
        
        console.log(res)
        
        if(res.success){
            setData(res.data)
            setLoading(false)
        } 
    }, [filters])

    // First render load
    React.useEffect(()=> {

        if(!data) loadData()
    }, [data])

    // Reloads data after filters update
    React.useEffect(() => {
        setLoading(true)
        loadData()
    }, [filters])

    // Adds a filter 
    const addFilter = (field, filter, value) => {
        setFilters(prev => {
            const newFilters = {...prev}
            newFilters[field] = {
                [filter]: value                    
            }

            return newFilters
        })
    }

    const removeFilter = (field) => {
        setFilters(prev => {
        const newFilters = {...prev}

        if(Object.hasOwn(prev, field)){
            delete newFilters[field]
        }

        return newFilters
    })
    }

    return (
        <FilteredDataContext.Provider value={{data, loading, filters, addFilter, removeFilter, tableName, setFilters }}>
            {children}
        </FilteredDataContext.Provider>
    )
}