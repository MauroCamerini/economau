import * as React from 'react'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader';
import TableRow from './TableRow';



export default function TransactionTable({transactions}) {

    return (
        <Table striped bordered hover>
            <TableHeader />
            <tbody>
                {transactions.map(trx => <TableRow key={trx.ID} trx={trx} />)}
            </tbody>
        </Table>
    )
}