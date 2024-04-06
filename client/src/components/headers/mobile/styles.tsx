import styled from "styled-components";

export const MobileHeaderCont = styled.header`
  height: 100%;
  width: 100%;
  display: none;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 0px 5px;
  font-family: 'Open Sans', sans-serif;
  background-color: #777676;
  @media (max-width: 420px) {
    display: grid;
  }
`