import styled from "styled-components";
import { ChartCard } from "../../../styles";

export const TransChartCont = styled.div<any>`
    height: 80%;
    width: 100%;
    padding: 5px 20px 0px 10px;
    align-self: flex-end;
    /* border-top: 1px solid whitesmoke; */
`
export const TransCard = styled(ChartCard)`
    align-items: flex-start;
    justify-content: flex-end;
`