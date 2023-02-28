import styled from "styled-components";

export const TrendingList = styled.ol<any>`
    height: 100%;
    width: 50%;
    padding: 20px;
    font-size: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: decimal;
    li {
        width: 100%;
        height: 35px;
        display: flex
        flex-direction: column;
        align-items: start;
        justify-content: center;
        p {
            font-size: 12px;
            margin-bottom: 0px;
        }
        p:last-child {
            font-size: 11px;
            color: lightgrey;
        } 
    }
`