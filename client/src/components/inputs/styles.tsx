import styled from "styled-components";
export const DropDownList = styled.ul<any>`
  margin: 5px 0px;
  width: ${props => props.w || 100}%;
  border-radius: 8px;
  border: 1px solid #e6e1e1;
  height: auto;
  max-height: 370px;
  position: absolute;
  background: white;
  list-style: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index:100 ;
  /* overflow-y: scroll; */
`
export const DropDownItem = styled.li<any>`
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
   background: white;
  p {
    margin-bottom: 0px;
    font-size: 13px;
    padding: 0px 10px;
  }
  :hover {
    background: #eeeeee;
  }
`
export const DropDownVal = styled.div`
    height: 74%;
    bottom: 1%;
    position: absolute;
    font-size: 13px;
    padding: 0.575rem 0.7rem 0.575rem 0rem;
    left: 11px;
`;
export const ClearIconBox = styled.div`
  cursor:pointer;
  display: flex;
  align-items:center;
  justify-content: center;
  position:absolute; 
  right:2%; 
  top: 7; 
  height: 20px;
  width:20px;
`;
export const IconBox = styled(ClearIconBox)<any>`
  cursor:pointer;
  display: flex;
  align-items:center;
  justify-content: center;
  position:relative; 
  height: 100%;
  width:20px;
  align-self: flex-end;
`;
export const IconCont = styled.div<any>`
  cursor:pointer;
  display: flex;
  align-items:center;
  justify-content: center;
  position:relative; 
  height: ${props=>props.size||25}px;
  width:${props=>props.size||25}px;


  align-self: flex-end;
`;
export const SearchFilterCont = styled.div`
  cursor:pointer;
  display: flex;
  align-items:center;
  height: 100%;
  min-width:50px;
  background: #e2e1e1;
  padding: 2px 10px;
  p {
    margin-bottom: 0px;
    font-size: 13px;
    color: #363535;
    margin-right: 5px;
  }
  border-radius:8px 0px 0px 8px;
`;
export const SearchInputCont = styled.div`
  display: flex;
  align-items:center;
  height: 100%;
  width: 100%;
`;
export const SearchIconCont = styled.div`
  cursor:pointer;
  display: flex;
  align-items:center;
  justify-content: center;
  height: 100%;
  width:40px;
  position: absolute;
  right: 0px;
  background: #e2e1e1;
  border-radius: 0px 8px 8px 0px;
`;
export const StockSearchIconCont = styled(SearchIconCont)`
  background: none;
  right: 0px;
  left: 0px;
  position: relative;
`;
export const SearchSuggestions = styled.div<any>`
    width: 100%;
    min-height: 30px;
    max-height: 500px;
    overflow-y: scroll;
    overflow:hidden;
    position: absolute;
    z-index: 10000;
    right: 0px;
    top: 114%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0 5px 25px #c4c3c337;
    border-radius: 8px;
`
export const SearchOption = styled.div<any>`
    width: 100%;
    height: 30px;
    padding: 0px 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${props => props.bordered ? '1px' : '0px'} solid rgba(0,0,0,0.05);
    cursor: pointer;
    p {
        position: relative;
        margin-bottom:0px;
        color: #393939;
        text-align: left;
        font-weight: 500;
        font-size: 13px;
        width: 70%;
    }
    .date {
      text-align: right;
      font-size: 12px;
      color: #bebcbc;
    }
    .close {
      display: none
    }
    svg {
      stroke: #00a3fe;
    }
    :hover {
      background: #eeeeee;
      p {
          color: #2a2929;
      }
      .date {
        display: none;
      }
      .close {
        display: flex;
        position: absolute;
        right: 5px;
      }
      svg {
          stroke: white;
      }
    }
`