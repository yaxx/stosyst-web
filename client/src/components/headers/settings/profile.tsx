import { useQuery } from '@apollo/client'
import React from 'react'
import { getImageUrl } from '../../../apollo-client'
import { GET_ACCOUNT } from '../../../graphql/queries'
import { tempClient } from '../../../store/data'
import { data } from '../../charts'
import { MainBanerCont, ProfileBaner, ProfileImage, ProfileInfo, ProfilePicture, SubsBtn } from '../styles'

const Profile = (props: any) => {
    
    const { account: { dp, banner, name, username, phone, address } } = props
    // const { 
    //     loading, 
    //     data:{account:{dp, name, username, phone, address}}, 
    //     refetch, 
    //     error } = useQuery(GET_ACCOUNT, {
    //     fetchPolicy: "network-only"
    // })
    
    // if (error) console.log(error);

    return (
        <>
            <MainBanerCont>
                <ProfileBaner height='100' width='100'>
                    <img src={getImageUrl(banner) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                </ProfileBaner>
                <ProfileImage>
                    <ProfilePicture height='150' width='150'>
                        <img src={getImageUrl(dp) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                    </ProfilePicture>
                </ProfileImage>
                <SubsBtn >Edit</SubsBtn>
            </MainBanerCont>
            <ProfileInfo>
                <h4>{name || ''}</h4>
                <p className="username">{username || ''}
                </p>
                <p className="addr">{address}</p>
                <p>{phone}</p>
                {/* <div className="stats">
                    <p>128K<span> Views</span> </p>
                    <p>17K<span> Likes</span> </p>
                    <p>2K <span>Subscribers</span> </p>
                </div> */}
            </ProfileInfo>
        </>
   
    )
}

export default Profile