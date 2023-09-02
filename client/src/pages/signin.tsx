import React, { ReactElement } from 'react'
import { SignInForm } from '../components/forms/signin'
import { LogoIcon } from '../components/icons'
import PromoSection, { CheckBox, LoginAccInfo, LoginAccIntem, LoginAccList } from './styles'
import { AccountContainer, FormContainer } from './singup'
import { LogoItem } from './promo'
import { Divider } from '../components/headers/styles'
import { Btn, PriBtn } from '../components/buttons'

interface Props {

}
export default function SignIn({ }: Props): ReactElement {
  return (
    <div className="start">
      <LogoItem />
      <div className="row no-gutters">
        <PromoSection />
        <div id='main--acc--cont' className="col-lg-4 col-md-6 col-sm-12" >
          <AccountContainer className='main--account--container'>
            {
              [0, 0, 0, 0].map((i, j) => (
                <div className={`styler-box${j}`}></div>
              ))
            }
            <FormContainer id="acc--form--wrapper" >
              <SignInForm />
            </FormContainer>
          </AccountContainer>
        </div>
      </div>
    </div>
  )
}
