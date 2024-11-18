import * as React from 'react'
import CategorySelect from "./CategorySelect";
import TableSelect from "./TableSelect";

export default function LinkedSelect({table, register}) {

    return  (<> {table.hierarchy ? 
        <CategorySelect table={table} register={register} /> 
        : <TableSelect table={table} data={table.data} register={register}/>
    }</>)
}