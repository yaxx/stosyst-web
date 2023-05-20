import React, { Fragment, ReactElement, useEffect } from 'react'

import { ToggleBtn } from '../../components/buttons'
import { locals } from '../../store/data'
import { GET_ACCOUNT } from '../../graphql/queries/account'
import { useQuery } from '@apollo/client'
import { SideNav } from '../../components/sideNavigation/SideNav'
import { FlatList as HeaderItems, FlatRow as Header, Item } from '../../components/listItems'
import { H4 } from '../../components/typography'
import { ActionGroup, AuthBtn, Divider, GroupItems, LabelGroup, SettingGroup, SettingsItem } from '../../components/headers/styles'
interface Props {
    
}
export default function Security({}: Props): ReactElement {
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
    const { loading, data, refetch, error } = useQuery(GET_ACCOUNT)
    return (
        <Fragment>
            <SideNav />
            <Header>
                <HeaderItems>
                    <Divider bottom='100' />
                    <Item>
                        <H4>Contact</H4>
                        <p>Where we send important messages about your account</p>
                    </Item>
                    <Divider />
                </HeaderItems>
            </Header>
            <SettingsItem height = '170'>
                <SettingGroup>
                    <LabelGroup>
                        <p>Email</p>
                    </LabelGroup>
                    <ActionGroup ml ='50'>
                        <GroupItems w ='250px'>
                            <H4>{data?.account.email}</H4>
                            <p style={{ color: 'black' }}>Verified. <span style={{ color:'#a5a3a3'}}>Thank you for verifying your email.</span></p>
                            <p><span>This email is linked to your account.</span></p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
            </SettingsItem>
            <SettingsItem height = '100'>
            <Divider top ='0'/>
                <SettingGroup>
                    <LabelGroup>
                        <p>Enable additional</p>
                        <p>account creation</p>
                    </LabelGroup>
                    <ActionGroup ml ='50'>
                        <GroupItems w ='440px' bottom = ''>
                            <ToggleBtn><div></div></ToggleBtn>
                            <p><span>Additional Stoman accounts can be created using this verified email address.</span></p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
                <Divider top ='100'/>
            </SettingsItem>
            <Header>
                <HeaderItems>
                    <Divider bottom='100' />
                    <Item>
                        <H4>Security</H4>
                        <p>Keep your account safe and sound</p>
                    </Item>
                    <Divider />
                </HeaderItems>
            </Header>
            <SettingsItem height = '120'>
                <SettingGroup>
                    <LabelGroup>
                        <p>Password</p>
                    </LabelGroup> 
                    <ActionGroup ml ='50'>
                        <GroupItems w ='400px'>
                            <p><a href='#'>Change Password.</a> <span>Improve your security with a strong password.</span></p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
            </SettingsItem>
            <SettingsItem height = '130'>
                <Divider top ='0'/>
                <SettingGroup>
                    <LabelGroup>
                        <p>Two-Factor</p>
                        <p>Authentication</p>
                    </LabelGroup>
                    <ActionGroup ml ='50'>
                        <GroupItems w ='580px' bottom = '10'>
                        <AuthBtn>Set up Two-Factor Authentication</AuthBtn>
                            <p><span>Add an extra layer of security to your Twitch account by using your password and a code on your mobile phone to log in.</span></p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
                <Divider top ='100'/>
            </SettingsItem>
        </Fragment>
    )
}
