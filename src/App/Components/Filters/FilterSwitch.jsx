import * as React from "react";
import { Form, Stack } from "react-bootstrap";
import InFilter from "./InFilter";
import RangeFilter from "./RangeFilter";
import SignFilter from "./SignFilter";
import { labels } from "../../config";


/**
 * Wraps a filter component inside a switch so filter can be disabled.
 */
export default function FilterSwitch({field, filter}) {
    const [disabled, setDisabled] = React.useState(true)

    const handleSwitchChange = (e) => {
        setDisabled(!e.target.checked)
    }

    return(<>
        <Stack gap={3}>
                <Form.Switch onChange={handleSwitchChange} label={labels.transactions_view[field]}/>
                {filter === "in"        && <InFilter field={field} disabled={disabled} />}
                {filter === "range"     && <RangeFilter field={field} disabled={disabled} />}
                {filter === "sign"      && <SignFilter field={field} disabled={disabled} />}
        </Stack>
    </>)
}