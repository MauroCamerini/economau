import * as React from 'react'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader';
import TableRow from './TableRow';


export default function TransactionTable({trxList}) {

    if (!trxList?.length) {
        console.log("E")
        return null;
    }

    return (
        <Table striped bordered hover>
            <TableHeader />
            <tbody>
                {trxList.map(e => <TableRow key={e.ID} trx={e} />)}
            </tbody>
        </Table>
    )
}