import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'

export default function ShowAllTransactions() {
    const { dbfunctions } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=> {
        if(!data){
            dbfunctions.getAllTransactions().then((res)=>{
                const newData = []
                res.data.forEach(row => newData.push(`Fecha: ${row.Date} $ ${row.Amount} N° Categoría: ${row.Category}`))
                setData(newData)
            })
        }
    }, [data])

    if(!data) return (<>CARGANDO...</>)

    return (<>
    <ul>{data.map((e=> <p>{e}</p>))}</ul>
    
    </>)
}