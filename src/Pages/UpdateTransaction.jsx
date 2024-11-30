import * as React from 'react';
import TransactionForm from '../Components/TransactionForm';
import { useParams } from 'react-router-dom';


export default function UpdateTransaction () {

    const { id } = useParams()

    const [message, setMessage] = React.useState("")

    const afterSubmit = (data, res) => {
        if(res.success) {
            setMessage("Movimiento actualizado")
        } else {
            setMessage(`ERROR: ${res.error}`)
        }
        
    }

    return(<>
        <TransactionForm submitResult={afterSubmit} transactionID={id}/>
        <p>{message}</p>
    </>)
}
