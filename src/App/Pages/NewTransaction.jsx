import * as React from 'react';
import TransactionForm from '../Components/TransactionForm/TransactionForm'
import { Stack } from 'react-bootstrap';
import Response from '../Components/Response';


export default function NewTransaction () {

    const [response, setResponse] = React.useState(null)

    const onDBResponse = (res) => {
        setResponse(res)
    }

    return(<>
        <Stack gap={3}>
            <TransactionForm onDBResponse={onDBResponse}/>
            <Response response={response} successMsg={`Transacción agregada con éxito (ID ${response?.info?.lastInsertRowid})`} />
        </Stack>
    </>)
}
 