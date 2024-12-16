import * as React from 'react';
import TransactionForm from '../Components/TransactionForm/TransactionForm'
import { Stack } from 'react-bootstrap';
import DBResponse from '../Components/DBResponse';


export default function NewTransaction () {

    const [dbResponse, setDBResponse] = React.useState(null)

    return(<>
        <Stack gap={3}>
            <TransactionForm onDBResponse={setDBResponse}/>
            <DBResponse dbResponse={dbResponse} successMsg={`Transacción agregada con éxito (ID ${dbResponse?.info?.lastInsertRowid})`} />
        </Stack>
    </>)
}
 