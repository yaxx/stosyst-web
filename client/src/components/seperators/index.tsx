import styled from "styled-components"
import { P1 } from "../typography"

export const DateSeparator = styled.div`
  font-size: .8rem;
  padding: 4px 0px;
  margin: 5px 0px;
  color: dodgerblue;
  width: 98%;
  margin: auto;
  display: flex;
  height: 28px;
  align-items: center;
  position: relative;
  justify-content: space-between;
`
export const TotalSeparator = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35px;
  font-weight: 500;
  border-bottom: none;
  text-align: right;
  cursor: pointer;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0px 14px 2px ${props => props.leftPad || 53}px;
  .seperatorMakers {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    p  {
            margin-bottom: 0px;
            font-size: 14px;
        }
     p:first-child {
      font-size: 12px;
      color:${
  props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.sec : props.theme.light.colors.labels.sec
      };
    }
  }
    
    svg {
            transform: rotate(${props => !props.opened ? 0 : 180}deg)
        }
   
  color:${
    props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri :props.theme.light.colors.labels.pri 
  };
`