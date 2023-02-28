import styled from "styled-components";


export const TrendsCont = styled.div<any>`
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0px 10px 10px 10px;
    justify-content: space-between;
`
export const TrendingBox = styled.div<any>`
    height: 100%;
    width: 55%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 0px 0px;
    top: 20px;
`
export const TrendingList = styled.ol<any>`
    top: 30px;
    height: 70%;
    width: 37%;
    font-size: 14px;
    margin-bottom:0px;
    padding: 0px;
    position: relative;
    display: flex;
    align-self: center ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: decimal;
    li {
        width: 100%;
        height: 35px;
        display: flex
        margin-bottom: 5px;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        p {
            font-size: 12px;
            margin-bottom: 0px;
            width: 170px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        p:last-child {
            font-size: 11px;
            color: #aba9a9;
            padding-left: 16px;
            margin-bottom:5px ;
        } 
    }
`
export const ListItem = styled.li<any>`
    p:first-child {
        &::before {
            display: inline-block;
            content: " ";
            height: 12px;
            width: 12px;
            top: 1px;
            margin-right: 4px;
            position: relative;
            background-color: ${props=>props.color};
        }
    }
`
export const NextListIcon = styled.div<any>`
   position: absolute;
   top: 86%;
   left: 58%;
   height: 20px;
   width: 20px;
   border-radius: 50% ;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   :hover {
        background-color:#00a5fe30;
   }
`
export const BtnBox = styled.div<any>`
   width: 
`

