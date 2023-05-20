import { useState } from 'react'
import { ButtonsCont, CheckCont, HeaderCont, MenuList, SwitchBtn } from '../../styles'
import { ArrowDown, Marker } from '../../../icons'
import { Divider } from '../../../headers/styles'

const ChartCardHeader = (props: any) => {
    const [duration, setDuration] = useState('Weekly')
    const [menu, setMenu] = useState('')
    const { getNewDataCallback, title } = props

    const selectDuration = (range: string) => {
        getNewDataCallback(range)
        setDuration(range)
        setMenu('')
    }
  return (
      <HeaderCont>
          <h5>{title}</h5>
          <ButtonsCont>
              <SwitchBtn p={20} onClick={() => setMenu('duration')}>
                  <p>{duration}</p>
                  <ArrowDown />
              </SwitchBtn> {
                  menu === 'duration' &&
                  <MenuList onMouseLeave={() => setMenu('')}>
                      <li onClick={() => selectDuration('Weekly')}>
                          <CheckCont> {
                              duration === 'Weekly' &&
                              <Marker />
                          }
                          </CheckCont>
                          <p>Weekly</p>
                          <Divider />
                      </li>
                      <li onClick={() => selectDuration('Monthly')}>
                          <CheckCont>{
                              duration === 'Monthly' &&
                              <Marker />
                          }
                          </CheckCont>
                          <p>Monthly</p>
                          <Divider />
                      </li>
                      <li onClick={() => selectDuration('Yearly')}>
                          <CheckCont>{
                              duration === 'Yearly' &&
                              <Marker />
                          }
                          </CheckCont>
                          <p>Yearly</p>
                      </li>
                  </MenuList>
              }
          </ButtonsCont>
      </HeaderCont> 
  )
}

export default ChartCardHeader