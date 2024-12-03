
import * as React from "react"
import { DatabaseContext } from './DatabaseContext'

/**
 * Exposes transactions data.
 */
export const TransactionsContext = React.createContext()

/**
 * Load transacions according to filters
 */
export function TransactionsProvider({ children }) {
    const { dbfunctions } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [filters, setFilters] = React.useState({});


    async function loadData() {
        
        const res = await dbfunctions.filterTrx(filters)
        console.log("load data", filters, res)
        if(res.success){
            setData(res.data)
            setLoading(false)
        }

    }

    // First render load
    React.useEffect(()=> {
        console.log("data useeffect")
        if(!data) loadData()
    }, [data])

    // Reloads data after filters update
    React.useEffect(() => {
        console.log("filters useeffect")
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