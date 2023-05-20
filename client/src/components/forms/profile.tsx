import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { getImageUrl } from '../../apollo-client'
import staff from '../../pages/settings/staff'
import { tempClient } from '../../store/data'
import { MainBanerCont, ProfileBaner, ProfileImage, ProfilePicture, SubsBtn } from '../headers/styles'
import { FormGroupCont, NameInput } from '../inputs'
import { ProfileFormCont, StandardForm } from './styles'


const ClientProfileForm = ()=> {
    const account: any = useReactiveVar(tempClient)
  return (
    <>
    <div  className='container main-container'> 
              <div style={{  height: '100%' }} id='ic' className="container">
                  <div style={{ background: 'white', width: '60%', height: '100%', margin:'auto' }}>
            <MainBanerCont>
                <ProfileBaner height='100' width='100'>
                    <img src={getImageUrl(account?.banner) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                </ProfileBaner>
                <ProfileImage>
                    <ProfilePicture height='150' width='150'>
                        <img src={getImageUrl(account?.dp) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                    </ProfilePicture>
                </ProfileImage>
                <SubsBtn onClick={() => tempClient()}>Save</SubsBtn>
            </MainBanerCont>
            <ProfileFormCont>
                <StandardForm >
                    <FormGroupCont>
                        <NameInput
                            name='firstName'
                            label='Name'
                            autoFocus
                        />
                        </FormGroupCont>
                        <FormGroupCont>
                        <NameInput
                            top
                            name='phone'
                            label='Mobile'
                        />
                        <NameInput
                            name='address'
                            label='Address'
                        />
                        </FormGroupCont>
                        <FormGroupCont>
                        <NameInput
                            name='category'
                            label='Category'
                        /> 
                    </FormGroupCont>
                {/* <PriBtn> {
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
                    </PriBtn> */}
                </StandardForm>
            </ProfileFormCont>
                  </div>
        </div>
      </div>
      </>
  )
}

export default ClientProfileForm