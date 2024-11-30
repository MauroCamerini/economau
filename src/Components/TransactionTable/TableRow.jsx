import * as React from 'react'
import { transactionTableConfig } from '../../UI/ui.config'
import { DatabaseContext } from '../../Context/DatabaseContext'

const buildCaption = (trx, column, linkedFields) => {
    
    const linked = linkedFields.find((e) => e.TransactionField === column.field)

    if(linked){
        const item = linked.Items.find((i) => i.ID === trx[linked.TransactionField])
        if(item)
            return item[column.linkedName || "Name" ]
        else
            return "ERR#"
    }

    return column.format ? column.format(trx[column.field]) : trx[column.field]
}

export default function TableRow({trx}) {

    const { columns } = transactionTableConfig

    const { linkedFields } = React.useContext(DatabaseContext)
 
    return (
        <>
            <tr>
                {columns.map(col => <th key={col.field}>{buildCaption(trx, col, linkedFields)}</th>)}
            </tr>
        </>
    )
}