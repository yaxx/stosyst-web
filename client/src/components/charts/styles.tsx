import styled from "styled-components";

export const HeaderCont = styled.div<any>`
    height: 50px;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ghostwhite;
    h5 {
        margin-bottom: 0px;
        font-size: 16px;
    }
    overflow: visible;
`
export const LoadingCont = styled.div<any>`
   height: 100%;
   width: 100%;
   display: flex;
   position: absolute;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   align-self: center ;
`
export const ButtonsCont = styled.div<any>`
   height: 100%;
   bottom: 0px;
   font-size: 12px;
   position:relative;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`

export const SwitchBtn = styled.div<any>`
   height: 100%;
   display: flex;
   width: 105px;
   font-weight: 500;
   padding: 0px ${props => props.p || 5}px;
   cursor: pointer;
   position: relative;
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
   :hover {
    color: inherit;
    background-color: whitesmoke;
   }
   p {
      margin-bottom: 0px;
   }
`
export const MenuList = styled.ul<any>`
    top: 0%;
    z-index: 2;
    height: ${props=>props.h || 105}px;
    width: 100px;
    font-size: 12px;
    padding: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #fffffffa;
    box-shadow: 0 5px 25px #c4c3c337;
    li {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        margin-bottom: 0px ;
        position: relative;
        justify-content: flex-start;
        cursor: pointer;
        p {
            font-size: 12px;
            margin-bottom: 0px;
        }
        svg {
         stroke: #00a3fe;
        }
        :hover {
            background-color: #00a3fe;
            p {
                color: white;
            }
            svg {
                stroke: white;
            }
         }
    }
`
export const CheckCont = styled.div<any>`
   height: 100%;
   width: 30px;
   position:relative;
   display: flex;
   align-items: center;
   justify-content: center;
`
export const ButtonsBox = styled.div<any>`
   height: 100%;
   width: 200px;
   display: flex;
   align-items: center;
   justify-content: center;
`
export const MessageCont = styled.div<any>`
   height: 50px;
   width: 100%;
   top: 40%;
   position: absolute;
   display: flex;
   align-self: center;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   h6 {
      margin-bottom: 3px;
   }
   p{
      font-size: 12px;
      color: grey;
      margin-bottom: 0px;
   }
`