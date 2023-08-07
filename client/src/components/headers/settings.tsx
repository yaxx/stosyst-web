import { useQuery, useReactiveVar } from "@apollo/client"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { getPreEmitDiagnostics } from "typescript"
import { getImageUrl } from "../../apollo-client"
import { GET_ACCOUNT } from "../../graphql/queries"
// import { useMatch, useLocation, Link } from "react-router-dom"
import { headerMenu, groupingCriteria, tempClient } from "../../store/data"
import { Marker } from "../icons"
import { HeaderNav } from "./main"
import { SettingTitle, SettingsHeader, SettingsNavigation, HeaderItem, TableActions, TableOption, MainBanerCont, ProfileImage, ProfileInfo, ProfilePicture, ProfileBaner, SubsBtn, Divider } from "./styles"

export const SettingsNavHeader = (props: any): ReactElement => {


    const { loading, data, refetch, error } = useQuery(GET_ACCOUNT, {
        fetchPolicy: "network-only"
    })
     if (error) console.log(error);
    

    // const { url, path } = useMatch()
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
            <MainBanerCont>
                <ProfileBaner height='100' width='100'>
                    <img src={getImageUrl(data?.account.banner) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                </ProfileBaner>
                <ProfileImage>
                    <ProfilePicture height='150' width='150'>
                        <img src={getImageUrl(data?.account.dp) || 'https://nextoma-bucket.s3.us-east-2.amazonaws.com/a35f9e5f-771c-4afd-b4b7-0869842c8dc9'} alt="" />
                    </ProfilePicture>
                </ProfileImage>
                <SubsBtn onClick={()=>tempClient(data.account)}>Subscribe</SubsBtn>
            </MainBanerCont>
            <ProfileInfo>
                <h4>{data?.account?.name || ''}</h4>
                <p className="username">{data?.account?.username || ''}
                </p>
                <p className="addr">Donga St. Jalingo, Taraba State  </p>
                <p>{data?.account.phone}</p>
                <div className="stats">
                    <p>128K<span> Views</span> </p>
                    <p>17K<span> Likes</span> </p>
                    <p>2K <span>Subscribers</span> </p>
                </div>
            </ProfileInfo>
            <SettingsHeader>
                <SettingsNavigation>
                    <HeaderItem match={pathname === '/settings' ? true : false}  >
                        <Link to='/settings' >Account</Link>
                    </HeaderItem>
                        <HeaderItem match={pathname === '/staffs' ? true : false}>
                        <Link to='/staffs' >Staffs Management</Link>
                    </HeaderItem>
                    <HeaderItem match={pathname === '/security' ? true : false}>
                        <Link to={`security`} >Security and Privacy</Link>
                    </HeaderItem>
                    <HeaderItem >
                        <Link to={`subscription`}>Notifications</Link>
                    </HeaderItem>
                </SettingsNavigation>
                <Divider />
            </SettingsHeader>
        </>
    )
}