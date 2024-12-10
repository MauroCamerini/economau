import * as React from 'react'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { rowKey, tables } from '../../config';



export default function ViewTable({data, tableName}) {

    return (
        <Table>
            <TableHeader tableName={tableName} />
            <tbody>
                {data.map((dataRow, index) => 
                <TableRow 
                    key={rowKey(dataRow, tableName)} 
                    dataRow={dataRow} 
                    tableName={tableName}
                    />
                )}
            </tbody>
        </Table>
    )
}