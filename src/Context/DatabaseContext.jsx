
import * as React from "react"

export const DatabaseContext = React.createContext()

export function DatabaseProvider ({children}) {

    const [loading, setLoading] = React.useState(true) 
    const [lists, setLists] = React.useState()

    React.useEffect(()=> {
        if(loading && !lists) {

            window.dbcontroller.getAllLists().then((res) => {
                console.log(res)
                setLoading(false)
                setLists(res)
            })
            
        }
    }, [lists, loading])

    return(
        <DatabaseContext.Provider value={{lists}}>
            {
                loading ? <h1>Cargando...</h1> : children
            }
        </DatabaseContext.Provider>
    )
}