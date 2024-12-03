import * as React from 'react';
import TransactionForm from '../Components/TransactionForm'
import TransactionTable from '../Components/TransactionTable/TransactionTable'
import { Stack } from 'react-bootstrap';


export default function NewTransaction () {

    const [transactions, setTransactions] = React.useState([])
    const [message, setMessage] = React.useState("")

    const afterSubmit = (data, res) => {
        if(res.success) {

            setMessage("")
            data.ID = res.info.lastInsertRowid
            setTransactions((prev) => [...prev, {...data}])
        } else {
            setMessage(`ERROR: ${res.error}`)
        }
        
    }

    return(<>
        <Stack gap={3}>
            <TransactionForm submitResult={afterSubmit}/>
            <div className='text-center fs-5 text-danger'>{message}</div>
            {transactions.length > 0 && <div>
                <div className='text-center fs-5'>Transacciones agregadas</div>
                <TransactionTable transactions={transactions} />
            </div>} 
        </Stack>
    </>)
}
