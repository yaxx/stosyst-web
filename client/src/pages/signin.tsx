import React, { ReactElement } from 'react'
import { SignInForm } from '../components/forms/signin'
import { LogoIcon } from '../components/icons'
import PromoSection from './styles'
import { AccountContainer, FormContainer } from './singup'
import { LogoItem } from './promo'

interface Props {
    
}
export default function SignIn({}: Props): ReactElement {
    return (
        <div className="start">
          <LogoItem />
          <div className="row no-gutters">
           <PromoSection />
            <div className="col-lg-4 col-md-6 col-sm-6">
              <AccountContainer>
                <FormContainer>
                  <SignInForm/>
                </FormContainer>
              </AccountContainer>
            </div>
          </div>
      </div>
    )
}
