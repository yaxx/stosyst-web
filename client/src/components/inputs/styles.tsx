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