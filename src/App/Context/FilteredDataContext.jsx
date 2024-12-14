
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

    const isFirstRender = React.useRef(true)


    const loadData = async () => {
        const res = await window.ipc.getData(tableName, filters)
        
        
        if(res.success){
            setData(res.data)
            setLoading(false)
        } 
    }

    // Reloads data after filters update
    React.useEffect(() => {
            setLoading(true)
            loadData()
    }, [filters])

    // Updates filtesr if defaultFilter changes
    React.useEffect(() => {
        setFilters(defaultFilter || {});
    }, [defaultFilter]);

    // Adds a filter 
    const addFilter = (field, filter, value) => {
        setFilters(prev => {

            // Avoids changing the state when no the filters are not really changing
            // This prevents reloading the data
            if(Object.hasOwn(prev, field) && Object.hasOwn(prev[field], filter) && prev[field][filter] === value) {
                return prev
            }

            // Adds or updates the given filter
            const newFilters = {...prev}
            newFilters[field] = {
                [filter]: value                    
            }

            return newFilters
        })
    }

    const removeFilter = (field) => {
        setFilters(prev => {
        
            if(Object.hasOwn(prev, field)){
                const newFilters = {...prev}
                delete newFilters[field]
                return newFilters
            } else {
                return prev
            }
        
    })
    }

    return (<>

        <FilteredDataContext.Provider value={{data, loading, filters, addFilter, removeFilter, tableName, setFilters }}>
            {children}
        </FilteredDataContext.Provider>
    </>)
}