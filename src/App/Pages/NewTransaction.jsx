import * as React from 'react';
import TransactionForm from '../Components/TransactionForm/TransactionForm'
import { Stack } from 'react-bootstrap';


export default function NewTransaction () {

    const [message, setMessage] = React.useState("")

    const onDBResponse = (res) => {
        if(res.success) {
            setMessage("")
        } else {
            setMessage(`ERROR: ${res.error}`)
        }
        
    }

    return(<>
        <Stack gap={3}>
            <TransactionForm onDBResponse={onDBResponse}/>
            <div className='text-center fs-5 text-danger'>{message}</div>
        </Stack>
    </>)
}
