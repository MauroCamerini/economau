import * as React from 'react'
import { DatabaseContext } from '../Context/DatabaseContext'
import TransactionTable from '../Components/TransactionTable/TransactionTable'
import { Row, Stack } from 'react-bootstrap'
import Filters from '../Components/Filters/Filters'

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
        <Stack gap="3"> 
            <Filters />
            <TransactionTable trxList={data} />
        </Stack>
        
    </>)
}