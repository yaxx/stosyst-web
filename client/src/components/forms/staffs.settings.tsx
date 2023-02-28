import { useMutation } from "@apollo/client";
import React, { ReactElement, useState, Fragment} from "react";
// import { User } from "../../types/model";
import { PriBtn } from "../buttons";
import { FormGroupCont, NameInput } from "../inputs";
import { Loader } from "../loaders";
import { SaveInfo } from "../../graphql/mutations/account";
import { GET_ALL_STAFFS } from "../../graphql/queries/account";
import { genPassword, showFeedback } from "../../utils";
import { initStaff, locals } from "../../store/data";
import { Staff } from "../../types/model";
import { StandardForm } from "./styles";


export default function SettingsForm(props: any): ReactElement {
  
  const [staff, setInfo] = useState(locals().staff._id ? locals().staff : { ...locals().staff, password: genPassword() });
  
  const handleClear = (e: any, name: string) => {
      setInfo({
          ...staff,
          [ name ]: ''
      })
  }

  const [saveInfo, {error, loading, data}] = useMutation(SaveInfo, {
    update: (cache, { data }) => {
      let prev = cache.readQuery({
            query: GET_ALL_STAFFS
      })

      let { staffs }:any = prev

      staffs = staff._id ? staffs.map((s: Staff) => s._id === data.saveInfo._id ? data.saveInfo : s) : [ data.saveInfo, ...staffs ]

      cache.writeQuery({
        query: GET_ALL_STAFFS,
        data: {
          staffs
        }
      })

      locals({
        ...locals(),
        staff: staff._id ? data.saveInfo : initStaff
      })

      showFeedback(true, 'Update successful')
    }
  })

  if(error) {
     showFeedback(false, 'Update faild')
     console.log({error})
  }
  
  const handleChange = (e: any) => {
    e.persist();
    setInfo({
        ...staff,
        [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const st = { ...staff, dp: locals().staff.dp, banner: locals().staff.banner }
    const { __typename, permisions, ...s }: any = st;
    const { __typename:pm, ...perms }: any = permisions;
    
    saveInfo({
      variables: {
        staff: !st._id ? st : { ...s, permisions: perms }
      }
    })
  }
  
  return (
      <StandardForm onSubmit = { (e: React.SyntheticEvent) => handleSubmit(e) }>
        <FormGroupCont>
          <NameInput
            name='firstName'
            label='Name'
            autoFocus
            value={staff.firstName}
            changeCallback={(e: any) => handleChange(e)}
            clearCallback={(e: any) => handleClear(e, 'firstName')}
          />
        </FormGroupCont>
        <FormGroupCont>
          <NameInput
            top
            name='phone'
            label='Mobile'
            value={staff.phone}
            changeCallback={(e: any) => handleChange(e)}
            clearCallback={(e: any) => handleClear(e, 'phone')}
          />
          <NameInput
            name='email'
            label='Email Address'
            value={staff.email}
            changeCallback={(e: any) => handleChange(e)}
            clearCallback={(e: any) => handleClear(e, 'email')}
          />
        </FormGroupCont>
        <FormGroupCont>
          <NameInput
            name='position'
            label='Role'
            value={staff.position}
            changeCallback={(e: any) => handleChange(e)}
            clearCallback={(e: any) => handleClear(e, 'position')}
          /> 
        </FormGroupCont>
          <PriBtn> {
              loading ?
              <Loader/> 
              :
              <Fragment> {
                  !staff._id &&
                  <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                      <title>ADD</title>
                      <rect y="7.64697" width="1.52941" height="13" transform="rotate(-90 0 7.64697)" fill="white"/>
                      <rect x="5.35254" width="1.52941" height="13" fill="white"/>
                  </svg>
                }
                <span>{staff._id ? 'Update Details':'Add Staff'}</span> 
              </Fragment>
              }
            </PriBtn>
      </StandardForm>
    )
}