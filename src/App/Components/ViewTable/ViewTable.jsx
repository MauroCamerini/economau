import * as React from 'react'
import { Table } from 'react-bootstrap'
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { rowKey } from '../../config';


/** 
 * Creates a <table> filled with the given data according to the config table
 * @param {{data: Array, tableName: string}} props Array of records data and table name
 * @see rowKey
 */
export default function ViewTable({data, tableName}) {

    return (
        <Table>
            <TableHeader tableName={tableName} />
            <tbody>
                {data.map((dataRow) => 
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