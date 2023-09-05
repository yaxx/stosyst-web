import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { headerMenu, hiddenModal } from "../../store/data";
import { SearchForm } from "../forms";
import { GroupIcon, FilterIcon, ArrowDown, Logo } from "../icons";
import { ImageItem } from "../images";
import HeaderMenu from "./headerMenu";
import PageListOpts from "./ListOpts";
import MobileHeader from "./mobile";
import { TopHeader, GroupContainer, GroupLabel, ProfileOptions, LogoSection, SearchSection, CartSection, MainHeaderCont } from "./styles";

export const HeaderNav = (props: any) => {
    const [menu, setMenu] = useState(false)
    const [tableMenu, setTableMenu] = useState(false)
    const [groupMenu, setGroupMenu] = useState(false);
    const [curGroup, setCurGroup] = useState('D');
    const [curView, setcurView] = useState('All Transactions');

    // let history = useHistory();
    const navigate = useNavigate();
    const { pathname } = useLocation()

    const toggleMenu = () => setMenu(!menu)
    const toggleGroupMenu = () => setGroupMenu(!groupMenu)

    const switchGroup = (group: string) => {
        setCurGroup(group)
    }

    const showHeaderMenu = ()=>{
        setTableMenu(!tableMenu);
    }

    let client: any = localStorage.getItem('client') as any
    client = JSON.parse(client)

    const modal: any = useReactiveVar(hiddenModal)

    const showAppMenu = () => {
        hiddenModal(true)
        // setMenu(true)
    }
    return (
        <MainHeaderCont>
            <TopHeader id="top--header">
                <LogoSection id="logo--section" w={200}>
                    <Logo />
                    <h6 className="app">Stosyst</h6>
                </LogoSection>
                <SearchSection >
                {
                    (pathname === '/' || pathname === '/expenses' || pathname === '/invoices' || '/explore') &&
                    <SearchForm {...props} />
                }
                </SearchSection>
                <CartSection id='menu--section' w={200}>
                    <GroupContainer className="groupCont">
                        <GroupLabel onClick={() => showHeaderMenu()} title='Table actions'>
                            <FilterIcon />
                            <ArrowDown />
                        </GroupLabel>
                        {
                            tableMenu && <PageListOpts tableMenuCallback={showHeaderMenu} />
                        }
                    </GroupContainer>
                    <ProfileOptions onClick={showAppMenu}>
                        <ImageItem source={client?.dp||''} h={'30px'} w={'30px'} r={'50%'} />
                        <ArrowDown /> {
                            modal ? <HeaderMenu /> : <></>
                        }
                    </ProfileOptions> 
                   
                </CartSection>
            </TopHeader>
            <MobileHeader />
        </MainHeaderCont>
    )
}