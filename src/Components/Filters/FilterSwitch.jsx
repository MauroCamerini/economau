import * as React from "react";
import { Form, Stack } from "react-bootstrap";
import InFilter from "./InFilter";
import RangeFilter from "./RangeFilter";

/**
 * Wraps a filter component inside a switch so filter can be disabled.
 */
export default function FilterSwitch({col}) {
    const [disabled, setDisabled] = React.useState(true)

    const handleSwitchChange = (e) => {
        setDisabled(!e.target.checked)
    }

    return(<>
        <Stack>

                <Form.Switch onChange={handleSwitchChange} label={col.title}/>
                {col.filter === "in" && <InFilter col={col} disabled={disabled} />}
                {col.filter === "range" && <RangeFilter col={col} disabled={disabled} />}
        </Stack>
    </>)
}