import { useMutation } from '@apollo/client';
import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SignUp } from '../../graphql/mutations/account';
import { Heading, SmallText } from '../../pages/singup';
import { PriBtn } from '../buttons';
import SearchInput, { FormGroupCont, NameInput } from '../inputs';
import { Loader } from '../loaders';
import Error from '../errorline'
import { initAccount, locals } from '../../store/data';
import { Client } from '../../types/model';
import { AccForm, MainSearchForm } from './styles';


export * from './search'


interface Props {

}

export function SignUpForm({}: Props): ReactElement {

  const navigate = useNavigate();
  

  const creds: any = {
    name: '',
    phone: '',
    password: '',
    msgToken: locals().msgToken || ' '
  }

  const [client, setClient] = useState(creds);

  const [showPassword, setPassword] = useState(false);

 const storeUserInfo = ({token, org, usr, dp}: any) => {
   localStorage.setItem('token', token);
   localStorage.setItem('dp', dp);
   localStorage.setItem('org', org);
   localStorage.setItem('usr', usr);
   navigate("/");
  }

  const [signUp,  { loading, error }] = useMutation(SignUp, {
    onCompleted({ signUp }: any) {
      if (signUp) storeUserInfo(signUp);
    }
  });

  if(error) console.log({ error })

  const togglePassword = ()=>  setPassword(!showPassword)

  const handleChange = (e: any) => {
    e.persist();
    setClient({
        ...client,
        [e.target.name]: e.target.value 
    })
  }

  const handleClear = (e: any, name: string) => {
      setClient({
          ...client,
          [ name ]: ''
      })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signUp({
        variables: {
        info: {
          ...client,
        }
      } 
    })
  }

  return (
      <AccForm onSubmit = { (e: React.SyntheticEvent) => handleSubmit(e) }>
        <Heading fs = '1.0rem' cl = 'grey'>{`Let's get you started`}</Heading>
      <FormGroupCont>
        <NameInput
          top
          name = 'name'
          label = 'Business name' 
          autoFocus ='autoFocus'
          value = { client.name }
          clearCallback = { (e: any) => handleClear(e, 'name') } 
          changeCallback = {(e: any) => handleChange(e)}
        />
        <NameInput 
          type ='phone'
          name = 'phone'
          label = 'Phone number' 
          value = { client.phone }
          clearCallback = { (e: any) => handleClear(e, 'phone') } 
          changeCallback = {(e: any) => handleChange(e)}
        />
      </FormGroupCont>
      <FormGroupCont>
        <NameInput 
          type = { showPassword ? 'text' : 'password'} 
          name = 'password'
          label = 'Password' 
          value = { client.password }
          togglePasswordCallback = { togglePassword }
          changeCallback = {(e: any) => handleChange(e)}
        />
      </FormGroupCont>
      <PriBtn disabled={!client.phone || !client.name || !client.password} >
            { loading ? <Loader/> : 'Create Account' }
        </PriBtn> {
           error && <Error error  = { error } />
        }
      <SmallText cl="grey" fs = '.66rem' mt = '30'>Have an account?
          <span>
            <Link to="/signin"> Sign In</Link>
          </span>
        </SmallText>

      <SmallText cl="grey" fs='.66rem' mt='200'>Creating Account means you have read and acknowleged our
          <span>
            <Link to="#"> Terms of service</Link>
          </span>
      </SmallText>
      </AccForm>
    ) 
}




