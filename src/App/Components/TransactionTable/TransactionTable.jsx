import * as React from 'react'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader';
import TableRow from './TableRow';



export default function TransactionTable({transactions, order}) {

    return (
        <Table striped bordered hover>
            <TableHeader order={order}/>
            <tbody>
                {transactions.map(trx => <TableRow key={trx.id} trx={trx} />)}
            </tbody>
        </Table>
    )
}