import styled from "styled-components";

export const BarChartCont = styled.div<any>`
    height: 170px;
    width: 100%;
    bottom:0px;
    padding: 0px 20px 20px 20px;
    position: absolute;
`
export const TransCard = styled.div`
    align-items: flex-start;
    justify-content: flex-end;
`
export const TotalCont = styled.div`
    width: 100%;
    height: 65px;
    top: 70px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h6 {
        color: grey;
    }
`
export const TotalSalesCont = styled.div`
    width: 50%;
    height: 100%;
    padding: 0px 10px 0px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    h6 {
        font-size: 14px;
        font-weight: normal;
    }
`
export const TotalExpCont = styled(TotalSalesCont)`
    align-items: flex-start;

`