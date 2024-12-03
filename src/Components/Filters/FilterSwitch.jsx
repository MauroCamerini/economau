import * as React from "react";
import { Form, Stack } from "react-bootstrap";
import PickFilter from "./PickFilter";

export default function FilterSwitch({col, onFilterChange}) {
    const [disabled, setDisabled] = React.useState(true)

    const handleSwitchChange = (e) => {
        setDisabled(!e.target.checked)
    }

    return(<>
        <Stack>

                <Form.Switch onChange={handleSwitchChange} label={col.title}/>
                {col.filter === "in" && <PickFilter col={col} disabled={disabled} onValueChange={onFilterChange}/>}
        </Stack>
    </>)
}