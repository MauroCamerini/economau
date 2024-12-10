import * as React from 'react'
import useAsyncData from '../Hooks/useAsyncData'
import ViewTable from '../Components/ViewTable/ViewTable'

const TABLE_NAME = 'income_statement'

export default function IncomeStatement() {
    
    const { loading, data, error } = useAsyncData(TABLE_NAME)

    if(loading) return <div>Cargando...</div>

    if(error) return <div>Error: {error}</div>

    return (<ViewTable data={data} tableName={TABLE_NAME} />)
}