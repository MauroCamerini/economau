import * as React from 'react'
import { transactionTableConfig } from '../../config'

export default function TableRow({trx}) {

    const { columns } = transactionTableConfig

    return (
        <>
            <tr>
                {columns.map((col) => <td key={col.field}>{col.format ? col.format(trx) : trx[col.field]}</td>)}
            </tr>
        </>
    )
}