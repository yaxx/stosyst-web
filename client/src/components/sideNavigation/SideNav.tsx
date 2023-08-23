import { ReactElement, useState } from 'react'
import styled from "styled-components";
import { NavLink, useLocation } from 'react-router-dom';
import { GearIcon, InvoiceIcon, StocksIcon, ExpenseIcon, DashboardIcon, ExploreIcon } from '../icons';
import { withRouter } from './withrouter';
import { IconCont } from '../icons/styles';
// import { NOTIFICATIONS } from '../../graphql/queries';


const SideBar = styled.div`
  height: 100vh;
  width: 55px;
  left:0px;
  top:0px;
  position: fixed;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri};
`
const LinkList = styled.li`
  padding-left:0px;
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  height: 300px;
`
const LinkItem = styled.li`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  width:100%;
  height: 40px;
  position: relative;
`
interface Props {

}


const Nav = (props: any): ReactElement => {

  const location = useLocation();
  const [notification, setnotification] = useState('')
  const [curLoc, setCurLoc] = useState('')


  return (
    <SideBar>
      <div className='box'> </div>
      <LinkList>
        <LinkItem >
          <NavLink to='/' title='Stocks'>
            <IconCont size={17}>
              <StocksIcon selected={location.pathname==='/'} />
            </IconCont>
          </NavLink>
        </LinkItem>
        <LinkItem >
          <NavLink to='/expenses' title='Expenses'>
            <IconCont size={14}>
              <ExpenseIcon selected={location.pathname === '/expenses'} />
            </IconCont>
          </NavLink>
        </LinkItem>
        <LinkItem >
          <NavLink to='/invoices' title='Transactions'>
            <IconCont size={20}>
              <InvoiceIcon selected={location.pathname === '/invoices'} />
            </IconCont>
          </NavLink> 
        </LinkItem>
        {
          localStorage.getItem('admin')==='yes' &&
          <LinkItem>
            <NavLink to='/summary' title='Stats'>
                <IconCont size={18}>
                  <DashboardIcon selected={location.pathname === '/summary'} />
                </IconCont >
            </NavLink>
          </LinkItem>
        }
        
      </LinkList>
      <NavLink to='/settings' title='Settings'>
        <IconCont style={{marginBottom: 40}} size={18}>
          <GearIcon selected={location.pathname === '/settings'} />
        </IconCont>
      </NavLink>
    </SideBar>
  )
}

export const SideNav = withRouter(Nav)

