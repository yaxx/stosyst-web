import styled from "styled-components";

export const FormContainer = styled.div`
  height: 312px;
  width: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border: 1px solid whitesmoke;
  background: white;
  left: 80%;
  padding: 0px 10px;
  top: 32px;
  z-index: 7;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(196, 195, 195, 0.216) 0px 5px 25px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(71, 75, 76, 0.055);
`;
export const Form = styled.form`
  width: 100%;
  padding: 10px 0px;
`;
export const FormGroupCont = styled.div<any>`
  margin: 4px 0px;
  width: ${(props) => props.w || 100}%;
  border-radius: ${(props) => props.r || 8}px;
  border: 1px solid #e6e1e1;
  position: relative;
  /* display: flex; */
  /* flex-direction: ${(props) => (props.vertical ? "column" : "row")}; */
`;

export const FormGroup = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  padding: 0px 6px;
  height: ${(props) => props.h || 45}px;
  width: ${(props) => props.w || 100}%;
  background: ${(props) => (props.focused ? "whitesmoke" : "initial")};
  border-bottom-left-radius: ${(props) => (props.top ? "0px" : "6px")};
  border-bottom-right-radius: ${(props) => (props.top ? "0px" : "6px")};
  border-bottom: ${(props) => (props.top ? "1px" : "0px")} solid #e6e1e1;
  border-right: ${(props) => (props.left ? "1px" : "0px")} solid #d3d3d35c;
  border-bottom-color: ${(props) => (props.top ? "#e6e1e1" : "white")};
`;

export const HeaderCont = styled.div`
  height: 35px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0px;
  top: 0%;
  h6 {
    font-size: 14px;
    margin-bottom: 0px;
    padding: 7px 7px;
    font-weight: bold;
  }
`;

export const ListItemCont = styled.div`
  display: grid;
  grid-template-columns: 35px 2fr 1fr;
  gap: 0px 5px;
  width: 100%;
  height: 60px;
  border: none;
  padding: 10px 0px;
  cursor: pointer;
  align-items: center;
  justify-content: start;
`;
export const ListFeedbackMsgCont = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border: none;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 0px;
    font-size: 12px;
    color: grey;
  }
`;
export const SearchListItemCont = styled(ListItemCont)<any>`
  height: 50px;
  padding: 5px 0px;
  :hover {
    background: whitesmoke;
  }
   border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri};
`;

export const ItemInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  p {
    font-size: 12px;
    margin-bottom: 0px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0px;
  }
  p:last-child {
    font-size: 11px;
    color: grey;
  }
`;
export const StoreInfo = styled(ItemInfo)`
  p {
    max-width: 140px;
  }

`;

export const OptItemInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: end;
  p {
    font-size: 13px;
    margin-bottom: 0px;
    text-align: right;
    font-weight: 500;
  }
  p:last-child {
    font-size: 12px;
    color: grey;
     font-weight: normal;
  }
`;
export const InfoSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  h6 {
    font-size: 10px;
    margin-bottom: 0px;
    font-weight: 500;
    position: absolute;
    background-color: white;
    top: -7px;
    font-weight: 700;
  }
  .store--id {
    right: 0px;
    color: #4ab0f9;
    font-size: 12px;
    font-weight: normal;
  }

`;
export const DropIconCont = styled.div<any>`
    display: flex;
    position: absolute;
    cursor: pointer;
    align-items: flex-end;
    justify-content: center;
    border-radius: 50%;
    bottom: -4.5%;
    left: 50%;
    .icon {
        top: 1px;
        left: 1px;
    }
`;
export const SearchOptCont = styled.div<any>`
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    transition: all .15s ease-in;
    padding: ${props => props.opened ? 10 : 0}px 0px;
    height: ${props => props.opened ? 150 : 0}px;
    border-top: 1px solid ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri};
    `
export const BtnCont = styled.div<any>`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    bottom: 10px;
    right: 0px;
   
    `