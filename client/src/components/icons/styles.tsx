import styled from "styled-components";

export const IconCont = styled.div<any>`
  height: ${props => props.size || 25}px;
  width: ${props => props.size || 25}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${props => props.r || 0}px;
  :hover {
    background-color: ${props => props.bg || ''};
  }
  transition: all .15s ease-in;
  transform: rotate(${props => props.rot}deg);
`