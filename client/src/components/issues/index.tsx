import styled from 'styled-components'
import React, { Fragment } from 'react'
import { PriBtn } from '../buttons'
import { useReactiveVar } from '@apollo/client'
import { groupingCriteria, invCriteria } from '../../store/data'
import { NetworkIcon,EmptySearchIcon, EmptyFilterIcon } from '../icons'



export const Empty = (props: any) => {
  return (
    <Fragment>
      <div>
        <p>{props.message}</p>
        <p>{props.suggestion}</p>
      </div> {
        !props.nobtn && <PriBtn w={props.w} onClick={(e:Event) => props.addCallback(e)}><span>+</span>{props.btnLabel}</PriBtn>
      }
    </Fragment>
  )
}
export const Error = (props: any) => {
  return (
    <Fragment>
      <NetworkIcon/>
      <div>
        <p>No Network Connection</p>
        <p>No internet connection. Connect to internet and try again</p>
      </div>
      <PriBtn w = {props.w} onClick = {() => props.retryCallback()  }>Try again</PriBtn>
    </Fragment>
  )
}
export const EmptyFilter = () => {
  const {filter, query} = useReactiveVar(groupingCriteria)
  const label = filter === 'expired' ? 'Expired' : filter === 'low_stocks' ? 'Low stocks' : filter === 'out_of_stock' ? 'Out of stocks' : 'Expiring'
  return (
    <Fragment>
      {
      query ? 
        <EmptySearchIcon />
        :
        <EmptyFilterIcon />
      }
      <div style={{marginTop: 10}}> {
        query ? 
        <>
            <p>{`No record found for`}<span style={{ fontWeight: 'bold' }}>{` "${query}" `}</span></p>
            <p>Please check the spelling and try again</p>     
        </>
        :
        <>
            <p>No record found</p>
            <p>{`No record found within`}<span style={{ fontWeight: 'bold' }}>{` "${label}" `}</span>filter</p>
        </>
      }
           
      </div>
    </Fragment>
  )
}
export const EmptyInvoiceMessage = () => {
  const {filter, query} = useReactiveVar(invCriteria)
  const label = filter === 'pendings' ? 'Pendings' : ''
  return (
    <Fragment>
      {
      query ? 
        <EmptySearchIcon />
        :
        <EmptyFilterIcon />
      }
      <div style={{marginTop: 10}}> {
        query ? 
        <>
            <p>{`No record found for`}<span style={{ fontWeight: 'bold' }}>{` "${query}" `}</span></p>
            <p>Please check the spelling and try again</p>     
        </>
        :
        <>
            <p>No record found</p>
            <p>{`No record found within`}<span style={{ fontWeight: 'bold' }}>{` "${label}" `}</span>filter</p>
        </>
      }
           
      </div>
    </Fragment>
  )
}

export const EmptyState = Empty;

export const ErrorState = Error;