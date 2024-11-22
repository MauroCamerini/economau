import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'
import { expandTransactionFields } from '../utils/ui'

export default function ShowAllTransactions() {
    const { dbfunctions, linkedFields } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=> {

        async function loadData() {

            const res = await dbfunctions.getAllTransactions()
            if(res.success){
                const newData = []

                res.data.forEach(row => {
                    newData.push(expandTransactionFields(row, linkedFields))
                })
                setData(newData)
            }

        }
        if(!data) loadData()
    }, [data])

    if(!data) return (<>CARGANDO...</>)

    return (<>
    <ul>{data.map(((e, i)=> <p key={data[i].ID} >Fecha: {e.Date} Período: {e.Period} Monto: {e.Amount} Categoria: {e.Category.Name}</p>))}</ul>
    
    </>)
}