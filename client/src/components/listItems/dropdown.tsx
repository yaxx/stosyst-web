import React from 'react'
import styled from 'styled-components'
import { Divider } from '../headers/styles'


const DropDownList = styled.ul`
  display: flex;
  top: 104%;
  flex-direction: column;
  width: 100%;
  margin: auto;
  height: 120px;
  padding-left: 0px;
  border-radius: 6px;
  position: absolute;
  box-shadow: rgba(196, 195, 195, 0.216) 0px 5px 25px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(71, 75, 76, 0.055);
  li:first-child {
    border-radius: 6px 6px 0px 0px;
  }
  li:last-child {
    border-radius: 0px 0px 6px 6px;
  }
`
const DropDownItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  height: 40px;
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  :hover {
    background: whitesmoke;
  }
  p{
    width: 100%;
    margin-bottom: 0px;
    font-size: 12px;
    padding-left: 10px;
  }
`


const DropDownOptions = (props: any)=> {
    const { options, selectCallback } = props
  return (
      <DropDownList> {
        options.map((opt: string, i: number) =>(
            <DropDownItem onClick={()=>selectCallback(opt)}>
                <p>{opt}</p> {
                    options.length-1 !== i  && <Divider />
                }
            </DropDownItem>
        ))
        }
      </DropDownList>
  )
}

export default DropDownOptions