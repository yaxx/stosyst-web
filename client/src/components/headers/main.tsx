import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { headerMenu } from "../../store/data";
import { SearchForm } from "../forms";
import { GroupIcon, FilterIcon, ArrowDown, Logo, RightAngleIcon } from "../icons";
import { ImageItem } from "../images";
import { IconCont } from "../inputs/styles";
import { P2 } from "../typography";
import HeaderMenu from "./headerMenu";
import { TopHeader, GroupContainer, GroupLabel, ProfileOptions, OptionList, Divider, LogoSection, SearchSection, CartSection, MainHeaderCont, LinkedAccItem, OptionItem, LinkedAccList, OptItemCont } from "./styles";

export const HeaderNav = (props: any) => {
    const [menu, setMenu] = useState(false)
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

    const logOut = () => {
        localStorage.clear();
        navigate("/signin");
    }

    const menu_state = useReactiveVar(headerMenu)

    const showHeaderMenu = (menuType: string) => headerMenu(menu_state === menuType ? '' : menuType)
    let client: any = localStorage.getItem('client') as any
    client = JSON.parse(client)
    return (
        <MainHeaderCont >
            <TopHeader>
                <LogoSection w={200}>
                    <Logo />
                    <h6>Stosyst</h6>
                </LogoSection>
                <SearchSection>{
                    (pathname === '/' || pathname === '/expenses' || pathname === '/invoices' || '/explore') &&
                    <SearchForm {...props} />
                }
                </SearchSection>
                <CartSection w={200}>
                    <GroupContainer >
                        <GroupLabel onClick={() => showHeaderMenu('group')} title='Group'>
                            <GroupIcon />
                            <ArrowDown />
                        </GroupLabel>
                        <GroupLabel onClick={() => showHeaderMenu('filter')} title='Filter'>
                            <FilterIcon />
                            <ArrowDown />
                        </GroupLabel>
                    </GroupContainer>
                    <ProfileOptions onClick={() => toggleMenu()}>
                        <ImageItem source={client.dp} h={'30px'} w={'30px'} r={'50%'} />
                        <ArrowDown /> {
                            menu && <HeaderMenu />
                        }
                    </ProfileOptions>
                </CartSection>
            </TopHeader>
        </MainHeaderCont>
    )
}