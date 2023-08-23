import styled from "styled-components";

export const ModalContainer = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 1024;
    top:0;
    background-color: rgb(0 0 0 / 27%);
`;
export const HidenModal = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 1023;
    top:0;
    display: ${props=>props.open ? 'block': 'none'};
    background-color: transparent;
`;
export const ShareModal = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 1023;
    top:0;
    display: ${props=>props.open ? 'block': 'none'};
    background-color: transparent;
`;
export const SearchModalContainer = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 200;
    top:56px;
    background-color: rgb(0 0 0 / 1%);
`;
export const ReviewModal = styled.div<any>`
    position: absolute;
    height: 100%;
    width:100%;
    z-index: 100;
    top:0;
    background-color: rgb(0 0 0 / 20%);
`;

export const ContainerSlider = styled.div<any>`
  right: 125px;
  position: relative;
  height: 100%;
  width: 300px;

  transition: all 4s ease-in-out;
  right: ${props => props.slideIn ? -115 : -10}px;
`
export const Card = styled.div<any>`
  position: absolute;
  height:100%;
  width: 330px;
  overflow: hidden;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.backgrounds.base.pri
    };
  transition: all .2s linear;
  right: ${props => props.slideIn ? 250 : -350}px;
`;
export const SlidingCont3 = styled.div<any>`
  position: absolute;
  height:100%;
  width: 330px;
  z-index: 200;
  transition: all .2s linear;
  bottom: ${props => props.up ? 0 : -8400}px;
  
`;
export const CardBody = styled(Card)`
  height:100%;
  right: 0px;
  padding-top: 0px;
  width: 100%;
  /* overflow: visible; */
 `;
export const InvoiceMainCont = styled.div`
  width: 100%;
  height: 150px;
  padding: 0px 16px;
  display: flex;
  background: #eae9e9;
  flex-direction: column;
  justify-content: center;
  h6:first-child{
    top: 12px;
    font-size: 14px;
    font-weight: bold;
     position: relative;
  }
 `;
export const InvoiceInfoCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #eae9e9;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
 `;
export const CustomerInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: start;
  h6{
    margin-bottom: 0px;
  }
  h6:first-child {
    font-size: 11px;
    font-weight: bold;
    color: grey;
    top: auto;
     margin-bottom: 5px;
  }
  p {
    margin-bottom: 0px;
    color: grey;
    font-size: 12px;
  }
 `;
export const TransInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-end;
  h6{
    margin-bottom: 0px;
    text-align: right
  }
  h6:first-child {
    font-size: 11px;
    font-weight: bold;
    color: grey;
  }
  p {
    margin-bottom: 0px;
    color: grey;
    font-size: 12px;
     text-align: right
  }
 `;

export const RecieptHeader = styled.header`
  height: 80px;
  width:100%;
  background: #f4f4f4;
  top: 0px;
  position:relative;
  display: flex;
  align-items: center;
  z-index: 1000;
`;
export const RecieptHeaderCont = styled.div`
  height: 100%;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position:relative;
   padding: 0px 16px;
`;
export const ClientInfo = styled.header`
  height: 100%;
  width:100%;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
   h6{
    margin-bottom: 0px;
  }
   p {
    margin-bottom: 0px;
    color: grey;
    font-size: 12px;
  }
`;

export const ClosePrint = styled.div.attrs(({ title: 'Close' }))<any>`
    height:20px;
    width: 20px;
    position: absolute;
    top:10px;
    right: 10px;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index:100000;
    font-size: 40px;
    background-color:${props => props.bg || "#0000005b"};
    &:hover {
        background-color:${props => props.bgHover || "#0000007f"} ;
    }
`;
export const SlindingCont = styled.div<any>`
    height:100%;
    width: 100%;
    position: absolute;
    transition: all .15s ease-in-out;
    left: ${props => !props.in ? 0 : 100}%;
    background-color: #d1cdcd;
`;
export const SlindingCont2 = styled.div<any>`
    height:100%;
    width: 100%;
    position: absolute;
    transition: all .15s ease-in-out;
    left: ${props => !props.in ? -100 : 0}%;
`;