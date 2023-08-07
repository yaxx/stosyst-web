import styled from "styled-components";

export const FormGroup = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  border: none;
  background: white;
  border-radius: inherit;
  height: ${props => props.h}px;
  width: ${props => props.w || 100}%;
`
export const FormGroupCont = styled.div<any>`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.h}px;
  width: ${(props) => props.w || 100}%;
  border-radius: ${(props) => props.r || 8}px;
  border: none;
  position: relative;
`;