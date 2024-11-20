import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'

export default function ShowAllTransactions() {
    const { dbfunctions } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=> {

        async function loadData() {
            const newData = []
            const res = await dbfunctions.getAllTransactions()
            console.log(res)
            res.forEach(row => newData.push(`Fecha: ${row.Date} $ ${row.Amount} N° Categoría: ${row.Category}`))
            setData(newData)
        }
        if(!data) loadData()
    }, [data])

    if(!data) return (<>CARGANDO...</>)

    return (<>
    <ul>{data.map((e=> <p>{e}</p>))}</ul>
    
    </>)
}