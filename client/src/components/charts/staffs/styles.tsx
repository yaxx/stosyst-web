import styled from "styled-components";

export const StaffsCont = styled.div<any>`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding: 0px 10px 10px 10px;
    justify-content: center;
`
export const StaffChartBox = styled.div<any>`
    height: 100%;
    width: 80%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 0px 0px;
`
export const StaffChartList = styled.ol<any>`
    bottom: 0px;
    height: 50px;
    width: 80%;
    left: 0px;
    font-size: 10px;
    margin-bottom:0px;
    padding: 0px 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: decimal;
    overflow: hidden;
    li {
        width: 50%;
        margin-right: 15px;
        p {
            margin-bottom: 0px;
            width: 95%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`
export const Names = styled.li<any>`
    p {
        &::before {
            display: inline-block;
            content: "";
            height: 8px;
            width: 8px;
            top: 1px;
            margin-right: 2px;
            position: relative;
            background-color: ${props => props.color};
        }
        /* width: 90px; */
    }
    /* width:200px; */
    /* margin: 0px 10px; */
    position: relative ;
`
export const ListFooter = styled.div<any>`
   bottom: 0px;
    height: 50px;
    width: 100%;
    margin-bottom:0px;
    padding: 0px 10px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const ShiftCont = styled.div<any>`
    width: 7%;
    height: 20px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`