import { ReactElement, useState } from "react";
import { CancelIcon } from "../../icons";
import { IconCont } from "../../icons/styles";


import { Label, Input, InputIconCont, DropIconCont, FormGroup } from "./styles";

export function TextInput(props: any): ReactElement {
    const { name, changeCallback, cancelCallback, value, r, last, focused, focusCallback, type, label, required, togglePasswordCallback } = props;
    const [inputSelected, resetSelection] = useState(false)
    const [hovered, setHovered] = useState(false)
    const selectInput = () => {
        resetSelection(true)
        focusCallback(name)
    }
    const deSelectInput = () => {
        resetSelection(false)
    }
    return (
        <FormGroup onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} focused={focused} hasInput={value} selected={inputSelected} {...props} >
            <Label>
                {label}
                {required && <span style={{ color: "#ff000072" }}>*</span>}
            </Label>
            <Input
                {...props}
                onFocus={() => selectInput()}
                onBlur={() => deSelectInput()}
                onChange={(e: Event) => { changeCallback(e) }}
            />
            {
                (value && hovered) &&
                <InputIconCont >
                    <IconCont onClick={() => cancelCallback(name)} className='icon' size={12}>
                        <CancelIcon />
                    </IconCont>
                </InputIconCont>
            }
        </FormGroup>
    )
}