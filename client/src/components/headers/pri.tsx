import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { headerMenu } from "../../store/data";
import { ProdSearchForm, SearchForm } from "../forms";
import { GroupIcon, FilterIcon, ArrowDown, Logo, CartIcon2 } from "../icons";
import { ImageItem } from "../images";
import { IconBox, IconCont } from "../inputs/styles";
import { MoreActions } from "../listItems";
import { P2 } from "../typography";
import { TopHeader, GroupContainer, GroupLabel, ProfileOptions, OptionList, Divider, LogoSection, CartSection, SearchSection, HeaderItemsCont, OptionItem } from "./styles";

export const PrimaryHeaderNav = (props: any) => {
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

    return (
        <TopHeader>
            <HeaderItemsCont className='header_items'>
                <LogoSection w={150}>
                    <Logo />
                    <h6>Stosyst</h6>
                </LogoSection>

                <SearchSection>
                    <ProdSearchForm {...props} />
                </SearchSection>

                <CartSection w={150}>
                    <IconCont size={25}  onClick={() => showHeaderMenu('group')} title='Your Cart'>
                        <CartIcon2 />
                    </IconCont>
                    <ProfileOptions onClick={() => toggleMenu()}>
                        <ImageItem source={localStorage.getItem('dp')} h={'30px'} w={'30px'} r={'50%'} />
                        <ArrowDown />
                    </ProfileOptions> {
                        menu &&
                        <OptionList onClick={() => toggleMenu()}>
                            <OptionItem>
                                <P2>{localStorage.getItem('name') || 'Admin'}</P2>
                                <P2 style={{ color: 'grey' }}>@{localStorage.getItem('username')}</P2>
                                <Divider />
                            </OptionItem>
                            <OptionItem>
                                <P2>Help</P2>
                            </OptionItem>
                            <OptionItem>
                                <P2>Settings</P2>
                                <Divider top='100' />
                            </OptionItem>
                            <OptionItem onClick={() => logOut()}>
                                <P2>Sign out</P2>
                            </OptionItem>
                        </OptionList>
                    }
                </CartSection>

            </HeaderItemsCont>
        </TopHeader>
    )
}