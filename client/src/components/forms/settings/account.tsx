import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_ACCOUNT } from '../../../graphql/mutations/account'
import { GET_ACC_DETAILS } from '../../../graphql/queries'
import { defClient } from '../../../store/data'
import { Client } from '../../../types/model'
import { FlatButton, IconButton } from '../../buttons/flat'
import { readLocalStorage } from '../../headers/headerMenu'
import { CheckIcon, Marker, PointedArror } from '../../icons'
import { IconCont } from '../../icons/styles'
import { FormGroupCont } from '../../inputs'
import { TextInput } from '../../inputs/text'
import { SpinLoader } from '../../loaders'
import { Form, FormContainer } from './styles'

const AccountForm = (props: any) => {

  const {updateAccountCallback} = props

  const [client, setClient] = useState<Client>(defClient)
  const handleClear = (fieldname: string) => {
    setClient({
      ...client,
      [fieldname]: ''
    })
  }
  const [addAccount, { error, loading, data }] = useMutation(ADD_ACCOUNT, {
    update: (cache, { data: { addAccount: newAccount } }) => {
      const data: any = cache.readQuery({
        query: GET_ACC_DETAILS,
      });
      cache.writeQuery({
        query: GET_ACC_DETAILS,
        data: {
          accDetails: {
            ...data.accDetails,
            linkedTo: [
              newAccount,
              ...data.accDetails?.linkedTo
            ]
          }
        },
      });

      let client: any = readLocalStorage()
      localStorage.setItem('client', JSON.stringify({
         ...client,
         linkedTo: [newAccount, ...client.linkedTo]
        })
      );
    },

  });

  if(error) console.log({error});
  
  const handleChange = (e: any) => {
    e.persist();
    setClient({
      ...client,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!loading) {
      addAccount({
        variables: {
          input: {
            ...client,
            curClientId: localStorage.getItem('org')
          }
        }
      })
    } 
  }
  return (
    <FormContainer>
      <Form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
        <FormGroupCont borderless >
          <TextInput
            name="name"
            label="store name"
            placeholder="Store name"
            value={client.name}
            changeCallback={handleChange}
            cancelCallback={handleClear}
          />
        </FormGroupCont>
        <FormGroupCont borderless >
          <TextInput
            name="username"
            label="username"
            placeholder="@yourstore"
            value={client.username}
            changeCallback={handleChange}
            cancelCallback={handleClear}
          />
        </FormGroupCont>
        <FormGroupCont borderless >
          <TextInput
            label="address"
            name="address"
            value={client.address}
            placeholder="No. 01 Store street, City"
            changeCallback={handleChange}
            cancelCallback={handleClear}
          />
        </FormGroupCont>
        <IconButton hbg={'#3183ff25'} h={'40px'} w={'40px'} r={'50%'} a={'auto'}> {
            loading ? 
            <SpinLoader size={'25px'} />
            :
            <IconCont r={7}  rot={0} size={14}>
              <CheckIcon />
            </IconCont> 
          }
        </IconButton>
      </Form>
    </FormContainer>

  )
}

export default AccountForm