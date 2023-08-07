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
        <div className="col-lg-4 col-md-6 col-sm-6">
          <AccountContainer>
            <FormContainer>
              {/* <LoginAccList>
                <LoginAccIntem>
                  <Divider bottom={100} />
                  <CheckBox selected/>
                  <LoginAccInfo>
                    <h6>Moonshot Enterprice</h6>
                    <p>@moonshot</p>
                  </LoginAccInfo>
                  <Divider />
                </LoginAccIntem>
                <LoginAccIntem>
                  <CheckBox />
                  <LoginAccInfo>
                    <h6>Moonshot Enterprice</h6>
                    <p>@moonshot</p>
                  </LoginAccInfo>
                  <Divider />
                </LoginAccIntem>
                <PriBtn >Continue</PriBtn>
              </LoginAccList> */}
              <SignInForm/>
            </FormContainer>
          </AccountContainer>
        </div>
      </div>
    </div>
  )
}
