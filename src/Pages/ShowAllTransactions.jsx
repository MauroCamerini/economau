import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'
import TransactionTable from '../Components/TransactionTable/TransactionTable'

export default function ShowAllTransactions() {
    const { dbfunctions } = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=> {

        async function loadData() {

            const res = await dbfunctions.getAllTrx()
            if(res.success){
                setData(res.data)
            }

        }
        if(!data) loadData()
    }, [data])

    if(!data) return (<>CARGANDO...</>)

    return (<>
        <TransactionTable trxList={data} />
    </>)
}