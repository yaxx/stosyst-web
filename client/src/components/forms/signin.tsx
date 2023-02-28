import { Heading, SmallText } from '../../pages/singup';
import { NameInput,Info, Tagline, FormGroupCont } from '../inputs'
import Error from '../errorline'
import { PriBtn } from '../buttons';
import { Loader } from '../loaders';
import { useMutation }  from '@apollo/client';
import { Link } from 'react-router-dom';
import React, { ReactElement, useState } from 'react'
import { Client, PermittedActions } from '../../types/model';
import { SignIn } from '../../graphql/mutations/account';
import { locals } from '../../store/data';
import { AccForm } from './styles';
import { useNavigate } from 'react-router-dom';

export function SignInForm(props: any): ReactElement {


  const navigate = useNavigate();
  
  const initCreds: any = {
    isAdmin: false,
    phone: '',
    password: '',
    msgToken: locals().msgToken || ' '
  }

  const [creds, setcreds] = useState(initCreds);

  const [showPassword, setPassword] = useState(false);

  const storeUserInfo = ({token, dp, org, usr, perms, name, username}: any) => {
    localStorage.setItem('token', token );
    localStorage.setItem('dp', dp );
    localStorage.setItem('org', org );
    localStorage.setItem('usr', usr );
    localStorage.setItem('name', name );
    localStorage.setItem('username', username );
    localStorage.setItem('perms', JSON.stringify(perms));
    navigate("/");
  }

  const [signIn, {error, loading, data }] = useMutation(SignIn, {
    onCompleted({ signIn }: any) {
      if (signIn) storeUserInfo(signIn);
      const permisions: PermittedActions = JSON.parse(localStorage.getItem('perms') as any)
    }
  });
  
  if(error) 
    console.log({ error })
   
  const switchLogger = () => {
    setcreds({
      ...creds,
      isAdmin: !creds.isAdmin
    })
    
  }

  if(!loading && !error && data) {
    localStorage.setItem('token', data.signIn.token );
  }

  const togglePassword = () => setPassword(!showPassword)

  const handleClear = (e: any, name: string) => {
      setcreds({
          ...creds,
          [ name ]: ''
      })
  }
  const handleChange = (e: any) => {
    e.persist();
    setcreds({
        ...creds,
        [e.target.name]: e.target.value 
    })
  }
  const handleSubmit = (e: any) => {
      e.preventDefault();
      signIn({
        variables: { 
          creds: {
            ...creds,
            msgToken: locals().msgToken
          }
      }
    })
  }
  return (
      <AccForm onSubmit = { (e: React.SyntheticEvent) => handleSubmit(e) }> 
        <Heading fs = '1rem' cl = 'grey'>Sign in</Heading>
      <FormGroupCont>
        <NameInput
          top
          value={creds.phone}
          name = 'phone'
          label = 'Phone number' 
          changeCallback = {(e: any) => handleChange(e)}
          clearCallback = { (e: any) => handleClear(e, 'phone') } 
        />
        <NameInput 
          type = { showPassword ? 'text' : 'password' }
          value={creds.password}
          name = 'password'
          label = 'Password' 
          togglePasswordCallback = { togglePassword }
          changeCallback = {(e: any) => handleChange(e)}
          clearCallback = { (e: any) => handleClear(e, 'password') } 
        />
        </FormGroupCont>
        <Info>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
          <Tagline>
            Sign in as: 
            <span onClick = {()=>switchLogger()}> {creds.isAdmin ? 'Staff' : 'Admin'}</span>
          </Tagline>
          <Tagline> {"Forgot Password?" }</Tagline>
        </Info> 
      <PriBtn disabled={!creds.phone || !creds.password} name ='signin'> {
          loading ? <Loader/> : 'Sign In' 
        }
        </PriBtn>{
          error && <Error error = { error } />
        }
        <Tagline mt = '50'>
          Don't have an account? 
          <span>
            <Link to ="/signup">Create one</Link>
          </span>
        </Tagline>
    </AccForm>
  ) 
}