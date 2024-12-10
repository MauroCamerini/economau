import * as React from 'react';
import TransactionForm from '../Components/TransactionForm/TransactionForm'
import { Stack } from 'react-bootstrap';


export default function NewTransaction () {

    const [response, setResponse] = React.useState(null)
    const [message, setMessage] = React.useState("")

    const onDBResponse = (res) => {
        setResponse(res)
    }

    return(<>
        <Stack gap={3}>
            <TransactionForm onDBResponse={onDBResponse}/>
            { response && 
            !response.success && 
            <div className='text-center fs-5 text-danger'>{response.error}</div> }

            { response && 
            response.success && 
                <div className='text-center fs-5 text-success'>Transacción agregada con éxito (ID {response.info.lastInsertRowid})</div>}
        </Stack>
    </>)
}
