
import * as React from "react"

export const DatabaseContext = React.createContext()

export function DatabaseProvider({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [tables, setTables] = React.useState(null);
    const [error, setError] = React.useState(null);
  
    const dbfunctions = window.api
  
    React.useEffect(() => {

      async function loadTables() {
        try {
          const res = await dbfunctions.getTables()
          res.map((e) => 1+1)
          setTables(res);
          setLoading(false);
        } catch(err) {
          setError(`Error inesperado: ${err.message}`);
          setLoading(false);
        }

      }

      if (loading && !tables) loadTables()

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