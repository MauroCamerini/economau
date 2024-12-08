import * as React from 'react'
import useAsyncData from '../Hooks/useAsyncData'
import { Table } from 'react-bootstrap'

export default function IncomeStatement() {
    
    const { loading, data, error } = useAsyncData('income_statement')

    if(loading) return <div>Cargando...</div>

    if(error) return <div>Error: {error}</div>

    return (<>
        {JSON.stringify(data)}
    </>)
}