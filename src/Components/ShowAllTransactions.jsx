import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'

export default function ShowAllTransactions() {
    const { dbfunctions } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=> {

        async function loadData() {

            const res = await dbfunctions.getAllTransactions()
            if(res.success){
                const newData = []
                console.log(res)
                res.data.forEach(row => newData.push(`Fecha: ${row.Date} $ ${row.Amount} N° Categoría: ${row.Category}`))
                setData(newData)
            }

        }
        if(!data) loadData()
    }, [data])

    if(!data) return (<>CARGANDO...</>)

    return (<>
    <ul>{data.map(((e, i)=> <p key={data[i].ID} >{e}</p>))}</ul>
    
    </>)
}