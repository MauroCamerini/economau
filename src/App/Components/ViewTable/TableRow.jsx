import * as React from 'react'
import { applyFormat, tables } from '../../config'

export default function TableRow({dataRow, tableName}) {

    return (
        <>
            <tr>
                {tables[tableName].fields.map((field) => 
                    <td key={field}>{applyFormat(dataRow[field], field, tableName)}</td>
                )}
            </tr>
        </>
    )
}