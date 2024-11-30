
import * as React from "react"

/**
 * Exposes database api and general data.
 */
export const DatabaseContext = React.createContext()

/**
 * Exposes a dbfunctions obejct that cotains de DB API functions
 */
export function DatabaseProvider({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const [linkedFields, setLinkedFields] = React.useState(null)
    const [trxFields, setTrxFields] = React.useState(null)
  
    const dbfunctions = window.api

    /**
     * Loads the linked fields. Call it after a insert, update or delete
     */
    const loadLinkedFields = React.useCallback(async () => {

      const res = await dbfunctions.getLinkedFields()

      if(res.success){
        setLinkedFields(res.data)
        setError(null)
      } else {
        setError(res.error)
      }
      setLoading(false)

    }, [])

    /**
     * Loads the linked fields and transactions fields in the first render
     */
    React.useEffect(()=> {


      if(!linkedFields) {
        loadLinkedFields()
      }

      if(!trxFields) {
        loadTrxFields()
      }

      if(linkedFields && trxFields) {
        setLoading(false)
      }

    }, [linkedFields, trxFields])

    /**
     * Loads the Transactions table column names
     */
    const loadTrxFields = React.useCallback(async () => {

      const res = await dbfunctions.getTrxFields()
      if(res.success){
        setTrxFields(res.data)
        setError(null)
      } else {
        setError(res.error)
      }

    }, [trxFields])

    if(loading) return (<>CARGANDO...</>)

    if(error) return (<>ERROR {error}</>)
    
    return (
      <DatabaseContext.Provider value={{ dbfunctions, linkedFields, loadLinkedFields }}>
        {children}
      </DatabaseContext.Provider>
    );
  }