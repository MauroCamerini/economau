import * as React from 'react';
import TransactionForm from '../Components/TransactionForm'
import TransactionTable from '../Components/TransactionTable/TransactionTable'


export default function NewTransaction () {

    const [trxList, setTrxList] = React.useState([])
    const [message, setMessage] = React.useState("")

    const afterSubmit = (data, res) => {
        if(res.success) {
            console.log(data, res)
            setMessage("Transacción agregada con éxito")
            setTrxList((prev) => [...prev, {...data, ID: res.lastInsertRowid}])
        } else {
            setMessage(`ERROR: ${res.error}`)
        }
        
    }

    return(<>
        <TransactionForm submitResult={afterSubmit}/>
        <p>{message}</p>
        <div>
            <TransactionTable trxList={trxList} />
        </div>
    </>)
}
