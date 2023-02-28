import React, { forwardRef } from "react";
import { OuterList } from "../components/listItems/invoice";

export const ComponentToPrint = forwardRef((props, ref:any) => {
    return (
        <div ref={ref}>
            <OuterList {...props}/>
        </div>
    );
});