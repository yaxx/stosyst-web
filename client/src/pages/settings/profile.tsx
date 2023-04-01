import { ReactElement, useEffect, useState } from 'react'

import client from '../../apollo-client'
import { defClient, locals, tempClient } from '../../store/data'
import { GET_ACCOUNT } from '../../graphql/queries/account'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { SideNav } from '../../components/sideNavigation/SideNav'
import { FlatList as HeaderItems, FlatRow as Header, Item } from '../../components/listItems'
import { UPLOAD_FILE } from '../../graphql/mutations'
import { useGetLocals } from '../../hooks/useGetProducts'
import { H4 } from '../../components/typography'
import { ImageItem } from '../../components/images'
import { Divider } from '../../components/headers/stylesx'
import { ModalContainer } from './styles'
import ClientProfileForm from '../../components/forms/profile'
interface Props {
    
}

 function Dp({ uri }:{uri: string}) {

    const [dp, setdp] = useState(uri)
    return (
        <ImageItem source='a35f9e5f-771c-4afd-b4b7-0869842c8dc9' h={120} w={120} r={60}/>
    )
}

export default function Profile({}: Props): ReactElement {

    useEffect(() => {
        return () => {
            locals({
                ...locals(),
                notification: {
                    ...locals().notification,
                    visible: true,
                    opened: false
                }
            })
        }
    }, [])

    const initClient = useReactiveVar(tempClient)

    const { localData: { localState }, issues } = useGetLocals();

    const { loading, data, refetch, error } = useQuery(GET_ACCOUNT,{
        fetchPolicy: "network-only"
    })


    const updateCache = (uri: string) => {
        let { account } = client.readQuery({
            query: GET_ACCOUNT,
        })
        account = {
            ...account,
            dp: uri
        }
        client.writeQuery({
            query: GET_ACCOUNT,
            data: {
                account
            }
        })
    }
    
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ uploadFile }) => {
            updateCache(uploadFile.uri)
        },
        onError: (error: any) => {
            console.log({ error })
        }
    })

    const hangleFileChange = (e: any) => {
        e.stopPropagation();
        const file = e.target.files[0];

        if (!file) return

        uploadFile({
            variables: {
                file
            }
        })
    }

    return (
        <>
            <SideNav/>
            <Header>
                {/* <HeaderItems>
                    <Divider bottom='100' />
                    <Item>
                        <H4>Profile Picture</H4>
                        <p>Change identifying details for your account</p>
                    </Item>
                    <Divider />
                </HeaderItems> */}
            </Header>
            {/* <SettingsItem>
                <SettingGroup>
                    <LabelGroup height = {100}>
                        <ProfilePicture height='100' width='100'>
                            <img src={data?.account.dp} alt="" />
                        </ProfilePicture>
                    </LabelGroup>
                    <ActionGroup>
                        <GroupItems>
                            <ChangePicBtn>
                                Update Profile Picture
                                <FileInput onChange={(e: any) => hangleFileChange(e)} type='file' />
                            </ChangePicBtn>
                            <p>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
            </SettingsItem> */}
            <Header>
                <HeaderItems>
                    <Divider bottom='100' />
                    <Item>
                        <H4>Profile Setting</H4>
                        <p>Change identifying details for your account</p>
                    </Item>
                    <Divider />
                </HeaderItems>
            </Header>
            {/* <SettingsItem height = '120'>
                <SettingGroup>
                    <LabelGroup>
                        <p>Username</p>
                    </LabelGroup>
                    <ActionGroup>
                        <GroupItems w ='250px' bottom = '10'>
                            <NameInput
                                value = { data?.account?.username|| '' }
                                name = 'id'
                                label = 'Username' 
                                placeholder ='Your username'
                            />
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
            </SettingsItem> */}
            {/* <SettingsItem height = '150'>
                <SettingGroup> 
                    <LabelGroup>
                        <p>Display Name</p>
                    </LabelGroup>
                    <ActionGroup>
                        <GroupItems w ='250px' bottom = '10'>
                            <NameInput
                                value = { data?.account?.name||'' }
                                name = 'name'
                                label = 'Display name' 
                                placeholder ='Senate Plaza Jalingo'
                            />
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
                <SaveBtn>Save</SaveBtn>
                <Divider top ='100'/>
            </SettingsItem> */}
            {
                initClient._id && <ModalContainer onClick={() => tempClient(defClient)} >
                    <ClientProfileForm />
                </ModalContainer>
            }
        </>

    )
}
