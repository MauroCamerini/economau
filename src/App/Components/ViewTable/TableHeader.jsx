import * as React from 'react'
import { tables } from '../../config'

export default function TableHeader({tableName}) {


    return (
        <>
        <thead>
            <tr>
                {tables[tableName].fields.map(field => 
                    <th key={field}>{tables[tableName].labels[field]}</th>
                )}
            </tr>
        </thead>
        </>
    )
}