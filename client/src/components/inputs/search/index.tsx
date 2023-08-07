import { ReactElement, useState } from "react";
import { CancelIcon, SearchIcon } from "../../icons";
import { IconCont } from "../../icons/styles";


import {Input, InputIconCont, FormGroup } from "./styles";

export function SearchInput(props: any): ReactElement {
    const { name, changeCallback,  value, focused, focusCallback} = props;
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
            <Input
                {...props}
                onFocus={() => selectInput()}
                onBlur={() => deSelectInput()}
                onChange={(e: Event) => { changeCallback(e) }}
            />
            <InputIconCont >
                <IconCont className='icon' size={18}>
                    <SearchIcon />
                </IconCont>
            </InputIconCont>
        </FormGroup>
    )
}