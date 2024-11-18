
import * as React from "react"

export const DatabaseContext = React.createContext()

export function DatabaseProvider({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [tables, setTables] = React.useState(null);
    const [error, setError] = React.useState(null);
  
    const dbfunctions = Object.keys(window.dbcontroller).reduce((prev, funcName) => {
      prev[funcName] = window.dbcontroller[funcName]
      return prev
    }, {})
  
    React.useEffect(() => {
      if (loading && !tables) {
        dbfunctions.getAllLists().then((res) => {
          if (res.success) {
            setTables(res.data);
            setLoading(false);
          } else {
            setError(res.error);
            setLoading(false);
          }
        }).catch((err) => {
          setError(`Error inesperado: ${err.message}`);
          setLoading(false);
        });
      }
    }, [tables, loading]);
  
    if (loading) {
      return <h1>Cargando...</h1>;
    }
  
    if (error) {
      return <h1>Error: {error}</h1>;
    }
  
    return (
      <DatabaseContext.Provider value={{ tables, dbfunctions }}>
        {children}
      </DatabaseContext.Provider>
    );
  }