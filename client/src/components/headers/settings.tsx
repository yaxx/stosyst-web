import { useReactiveVar } from "@apollo/client"
import { ReactElement } from "react"
import { useMatch, useLocation, Link } from "react-router-dom"
import { headerMenu, groupingCriteria } from "../../store/data"
import { Marker } from "../icons"
import { HeaderNav } from "./main"
import { SettingTitle, SettingsHeader, SettingsNavigation, HeaderItem, TableActions, TableOption } from "./stylesx"

export const SettingsNavHeader = (props: any): ReactElement => {

    const { url, path } = useMatch()

    const { pathname } = useLocation()

    const {reGroupCallback, filterCallback } = props


    const headMenu = useReactiveVar(headerMenu)
    const criteria = useReactiveVar(groupingCriteria)

    const reGroupStock = (group: string) => {
        groupingCriteria({ ...criteria, group })
        reGroupCallback()
    }

    return (
        <>
            <SettingTitle>Settings</SettingTitle>
            <HeaderNav />
            <SettingsHeader>
                <SettingsNavigation>
                    <HeaderItem match={pathname === '/settings' ? true : false}  >
                        <Link to={`/settings`} >Profile</Link>
                    </HeaderItem>
                    <HeaderItem match={pathname === '/settings/staffs' ? true : false}>
                        <Link to={`${url}/staffs`} >Staffs Management</Link>
                    </HeaderItem>
                    <HeaderItem match={pathname === '/settings/security' ? true : false}>
                        <Link to={`${url}/security`} >Security and Privacy</Link>
                    </HeaderItem>
                    <HeaderItem >
                        <Link to={`${url}/subscription`}>Subscriptions</Link>
                    </HeaderItem>
                </SettingsNavigation>
            </SettingsHeader>
        </>
    )
}