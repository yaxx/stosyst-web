import { ReactElement, useState } from "react";
import { Divider } from "../../headers/styles";
import { SearchIcon } from "../../icons";
import { Input, InputIconCont, NumbInput } from "../search/styles";
import {FormGroup} from "./styles";

export function QInput(props: any): ReactElement {
    const { name, changeCallback, value, focused, focusCallback } = props;
    const [inputSelected, resetSelection] = useState(false)
    const [hovered, setHovered] = useState(false)
   
const handleOnClick = (e: Event) => {
    e.stopPropagation()
}
    return (
        <FormGroup h={35} onClick={handleOnClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} focused={focused} hasInput={value} selected={inputSelected} {...props} >
            <NumbInput
                {...props}
                onFocus={() => {}}
                onChange={(e: Event) => { changeCallback(e) }}
            />
        </FormGroup>
    )
}
export default QInput