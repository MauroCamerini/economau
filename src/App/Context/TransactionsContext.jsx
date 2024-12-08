
import * as React from "react"

/**
 * Exposes transactions data.
 */
export const TransactionsContext = React.createContext()

/**
 * Load transacions according to filters
 */
export function TransactionsProvider({ children }) {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [filters, setFilters] = React.useState({});

    const loadData = React.useCallback(async () => {
        const res = await window.ipc.getData('transactions_view', filters)
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

    const reload = () => {
        setLoading(true)
        loadData()
    }

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
        <TransactionsContext.Provider value={{transactions: data, loading, filters, addFilter, removeFilter, reload }}>
            {children}
        </TransactionsContext.Provider>
    )
}