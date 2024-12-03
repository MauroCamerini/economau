import * as React from 'react'
import { transactionTableConfig } from '../../config/ui.config'


export default function TableHeader() {

    const { columns } = transactionTableConfig

    return (
        <>
        <thead>
            <tr>
                {columns.map(col => <th key={col.field}>{col.title}</th>)}
            </tr>
        </thead>
        </>
    )
}