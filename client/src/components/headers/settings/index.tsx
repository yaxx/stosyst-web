import { useQuery, useReactiveVar } from "@apollo/client"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { getPreEmitDiagnostics } from "typescript"
import { getImageUrl } from "../../../apollo-client"
import { GET_ACCOUNT } from "../../../graphql/queries"
import { LoaderCont } from "../../../pages/settings/styles"
// import { useMatch, useLocation, Link } from "react-router-dom"
import { headerMenu, groupingCriteria, tempClient } from "../../../store/data"
import ProfileForm from "../../forms/settings/profile"
import { Marker } from "../../icons"
import { PageLoading } from "../../loaders"
import { HeaderNav } from "../main"
import { SettingTitle, SettingsHeader, SettingsNavigation, HeaderItem, TableActions, TableOption, MainBanerCont, ProfileImage, ProfileInfo, ProfilePicture, ProfileBaner, SubsBtn, Divider } from "../styles"
import Profile from "./profile"

export const SettingsNavHeader = (props: any): ReactElement => {


    const { loading, data, refetch, error } = useQuery(GET_ACCOUNT, {
        fetchPolicy: "network-only"
    })
    if (error) console.log(error);


    // const { url, path } = useMatch()
    const { pathname } = useLocation()

    const { reGroupCallback } = props

    const criteria = useReactiveVar(groupingCriteria)
    

    if (error) console.log(error);
    if (data) console.log(data);

    // const reGroupStock = (group: string) => {
    //     groupingCriteria({ ...criteria, group })
    //     reGroupCallback()
    // }

    return (
        <>
        {
            loading ?
                    <LoaderCont>
                        <PageLoading />
                    </LoaderCont>
            :
            data ?
            <Profile loading={loading} account={data.account} />
            // <ProfileForm account={data?.account||{}} />
            :
            <></>
        }
        
            {/* <Profile loading={loading}   account={data.account} /> */}
            
            <SettingsHeader>
                <SettingsNavigation>
                    <HeaderItem match={pathname === '/settings' ? true : false}  >
                        <Link to='/settings' >ACCOUNT</Link>
                    </HeaderItem>

                    <HeaderItem match={pathname === '/staffs' ? true : false}>
                        <Link to='/staffs' >STAFF</Link>
                    </HeaderItem>
                    <HeaderItem match={pathname === '/security' ? true : false}>
                        <Link to={`security`} >SECURITY</Link>
                    </HeaderItem>
                    <HeaderItem match={pathname === '' ? true : false}  >
                        <Link to='#' >NOTIFICATIONS</Link>
                    </HeaderItem>
                </SettingsNavigation>
                <Divider />
            </SettingsHeader>
        </>
    )
}