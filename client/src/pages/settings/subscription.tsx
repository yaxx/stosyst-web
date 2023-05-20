import React, { Fragment, ReactElement, useEffect } from 'react'

import { ToggleBtn } from '../../components/buttons'
import { locals } from '../../store/data'
import { GET_ACCOUNT } from '../../graphql/queries/account'
import { useQuery } from '@apollo/client'
import { SideNav } from '../../components/sideNavigation/SideNav'
import { FlatList as HeaderItems, FlatRow as Header, Item } from '../../components/listItems'
import { H4 } from '../../components/typography'
import { ActionGroup, Divider, GroupItems, LabelGroup, SettingGroup, SettingsItem } from '../../components/headers/styles'
interface Props {

}
export default function Subscription({ }: Props): ReactElement {
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
                        <H4>Subscriptions</H4>
                        <p>Manage your subscriptions</p>
                    </Item>
                    <Divider />
                </HeaderItems>
            </Header>
            <SettingsItem height='170'>
                <SettingGroup>
                    <LabelGroup>
                        <p>Suscription Status</p>
                    </LabelGroup>
                    <ActionGroup ml='50'>
                        <GroupItems w='250px'>
                            <h6>Trial</h6>
                            <p style={{ color: 'black' }}>Verified. <span style={{ color: '#a5a3a3' }}>Thank you for trying systo.</span></p>
                            <p><span>Your status will be update on activation</span></p>
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
                <Divider top='100' />
            </SettingsItem>
        </Fragment>
    )
}
