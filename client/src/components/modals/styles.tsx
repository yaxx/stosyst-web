import styled from "styled-components";

export const ModalContainer = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 115;
    top:0;
    background-color: rgb(0 0 0 / 46%);
`;
export const ReviewModal = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 116;
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
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.backgrounds.base.pri
    };
  transition: all .2s linear;
  right: ${props => props.slideIn ? 250 : -350}px;
`;
export const CardBody = styled(Card)`
  height: 84%;
  right: 0px;
  padding-top: 0px;
  width: 100%;
  position: relative;
  overflow: visible;
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