import styled from "styled-components";

export const PageListOptCont = styled.ul`
  min-height: 124px;
  width: 180px;
  position: absolute;
  display: block;
  left: -30px;
  padding-top: 10px;
  padding-left: 0px;
  top: 42px;
  border-radius: 10px;
  box-shadow: 0 5px 25px #c4c3c337;
  background-color: white;
  border: 1px solid rgba(71, 75, 76, 0.055);
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    height: 11px;
    width: 11px;
    transform: rotate(45deg);
    background: inherit;
    z-index: -1;
    border-bottom: 0px;
    border-right: 0px;
    border: 1px solid rgba(71, 75, 76, 0.055);
  }
`