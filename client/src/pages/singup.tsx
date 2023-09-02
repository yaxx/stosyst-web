import { printIntrospectionSchema } from 'graphql'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SignUpForm } from '../components/forms'
import { LogoIcon } from '../components/icons'
import { LogoItem } from './promo'
import PromoSection from './styles'

interface Props {
    
}
export const AccountContainer = styled.div`
  height: 100%;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`
export const FormContainer = styled.div`
  width: 100%;
  padding: 0px 85px;
  height: 400px;
  background-color: inherit;
`
export const SmallText =  styled.p<any>`
   font-size: ${props => props.theme.typography.caption};
    width: 100%;
    text-align: center;
    position: relative;
    color: ${props => props.cl};
    margin-top: ${props => props.mt}px;
    margin-bottom: ${props => props.mb}px;
`
export const Heading =  styled.h6<any>`
    font-size: 2rem;
    width: 100%;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    text-align: center;
`
export default function SignUp({}: Props): ReactElement {
    return (
        <div className="start">
          <LogoItem />
          <div className="row no-gutters">
            <div  className="col col-lg-8 col-md-6 col-sm-6 promo-sec">
              <PromoSection />
            </div>
          <div id='main--acc--cont' className="col-lg-4 col-md-6 col-sm-12">
            <AccountContainer className='main--account--container'>
              {
                [0, 0, 0, 0].map((i, j) => (
                  <div className={`styler-box${j}`}></div>
                ))
              }
              <FormContainer id="acc--form--wrapper"> 
                    <SignUpForm/>
                </FormContainer>
              </AccountContainer>
            </div>
          </div>
      </div>
    )
}
