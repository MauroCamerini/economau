import * as React from 'react'
import TableSelect from "./TableSelect";
import { DatabaseContext } from '../../Context/DatabaseContext';

export default function LinkedSelect({table, register}) {

    const {dbfunctions} = React.useContext(DatabaseContext)
    const [data, setData] = React.useState(null)

    React.useEffect(()=>{

        async function loadData() {
            setData(await dbfunctions.getListItems(table.name))
        }

        if(!data) loadData()
    },[data])

    if(!data) return (<>...</>)

    return  (<TableSelect table={table} data={data} register={register}/>)
}