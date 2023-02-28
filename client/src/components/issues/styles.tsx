import styled from "styled-components"

export const IssueContainer = styled.div<any>`
  height:100vh;
  position: relative;
  left: 0px;
  width: ${props => props.w || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  button span {
    font-size: 14px;
    margin-right: 2px;
  }
`
export const Issue = styled(IssueContainer)`
  height: auto;
  width: auto;
  bottom: 50px;
  position: relative;
  flex-direction: column;
  left: auto;
  border: none;
  padding: 0px 10px;
  p {
      margin-bottom: 0px;
      text-align: center;
      width: auto;
      position: relative;
      font-size: 16px;
      font-weight: bold;
      margin: auto;
      color: grey;
      &:nth-child(2) {
          font-weight: normal;
          color: grey;
          font-size: 14px;
      }
  }
`