import * as React from 'react'
import { useParams } from 'react-router-dom'
import ViewTable from '../Components/ViewTable/ViewTable'
import useAsyncData from '../Hooks/useAsyncData'

export default function View() {
    
    const { table } = useParams()

    const { loading, data, error } = useAsyncData(table)

    if(loading) return <div>Cargando...</div>

    if(error) return <div>Error: {error}</div>

    return (<ViewTable data={data} tableName={table} />)

}