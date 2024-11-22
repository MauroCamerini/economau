
import * as React from "react"

export const DatabaseContext = React.createContext()

/**
 * Exposes a dbfunctions obejct that cotains de DB API functions
 */
export function DatabaseProvider({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
  
    const dbfunctions = window.api
    
    return (
      <DatabaseContext.Provider value={{ dbfunctions }}>
        {children}
      </DatabaseContext.Provider>
    );
  }