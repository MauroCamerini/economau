import * as React from "react"
import { useForm } from "react-hook-form"
import { DatabaseContext } from "../../Context/DatabaseContext"
import FilterAdder from "./FilterAdder"



export default function FilterForm(params) {
    
    const { trxFields } = React.useContext(DatabaseContext)

    // We are so sure that transaction is never going to change
    const [ fieldStates, setFieldState] = React.useState((new Array(trxFields.length)).fill(false))

    const {
        register,
        handleSubmit,
        formState: { errors  }
    } = useForm()

    return(<>
        <FilterAdder fields={trxFields} fieldStates={fieldStates} />
    </>)
}