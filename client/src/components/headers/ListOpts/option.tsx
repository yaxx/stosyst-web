import { group } from 'console'
import React from 'react'
import { Marker } from '../../icons'
import { IconCont } from '../../icons/styles'

import { TableOption } from '../styles'

const OptionItem = (props: any) => {
    const { label, selected, selectCallback} =  props
  return (
      <TableOption selected={selected} onClick={selectCallback}>
          {
              selected &&
              <IconCont size={12}>
                  <Marker />
              </IconCont>
          }
          <p>{label}</p>
      </TableOption>
  )
}

export default OptionItem