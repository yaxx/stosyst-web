import React from 'react'
import { Divider } from '../headers/styles'
import { DropDownItem, DropDownList } from '../inputs/styles'

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