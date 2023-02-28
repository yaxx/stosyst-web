import { ReactElement, useState } from 'react'
import styled from "styled-components";
import { NavLink, useLocation } from 'react-router-dom';
import { GearIcon, InvoiceIcon, StocksIcon, ExpenseIcon, DashboardIcon } from '../icons';
import { withRouter } from './withrouter';
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

  // useEffect(() => {
  //   subscribeToNewInvoice()
  //   subscribeToNewExpense()
  //   setCurLoc(location.pathname)
  // }, [])



  // const { localData: { localState }, issues } = useGetLocals();

  // const { loading, data, error, subscribeToMore } = useQuery(NOTIFICATIONS, { variables: { page: '', offset: 0 } })

  // if (error)
  //   console.log({ error });

  // const subscribeToNewInvoice = () =>
  //   subscribeToMore({
  //     document: INVOICE_SUBS,
  //     variables: {
  //       org: localStorage.getItem('org'),
  //       usr: localStorage.getItem('usr')
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {

  //       if (!subscriptionData.data) return prev;

  //       const newFeedItem = subscriptionData.data.invoice;

  //       let { notifications: { invoices, unreadInvoices } } = prev
  //       let { notifications } = prev

  //       // invoices = updateInvoices(invoices, newFeedItem)

  //       return Object.assign({}, prev, {
  //         notifications: {
  //           ...notifications,
  //           unreadInvoices: ++unreadInvoices
  //         }
  //       });
  //     }
  //   })

  // const subscribeToNewExpense = () =>
  //   subscribeToMore({
  //     document: EXPENSE_SUBSCRIPTION,
  //     variables: {
  //       org: localStorage.getItem('org'),
  //       usr: localStorage.getItem('usr')
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {

  //       if (!subscriptionData.data) return prev;

  //       let {notifications, notifications: { expenses, unreadExpenses } } = prev

  //       return Object.assign({}, prev, {
  //         notifications: {
  //           ...notifications,
  //           unreadExpenses:  ++unreadExpenses
  //         }
  //       })
  //     }
  //   })

  // const [clearNotifications, { error: err, loading: clearing, data: note }] = useMutation(CLEAR_NOTIFICATIONS, {
  //   update: (cache, { data }) => {
  //     let existing: any = cache.readQuery({
  //       query: NOTIFICATIONS,
  //       variables: {
  //         offset: 0,
  //         page: ''
  //       }
  //     })

  //     if(curLoc ==='/invoices') {
  //       existing = {
  //         ...existing,
  //         notifications: {
  //           ...existing.notifications,
  //           unreadInvoices: 0
  //         }
  //       }
  //     }
  //     existing = {
  //       ...existing,
  //       notifications: {
  //         ...existing.notifications,
  //         unreadExpenses: 0
  //       }
  //     }
      
  //     cache.writeQuery({
  //       query: NOTIFICATIONS,
  //       variables: {
  //         offset: 0,
  //         page: '',
  //       },
  //       data: {
  //         notifications: existing.notifications
  //       }
  //     })
  //   }
  // });

  // if (error)
  //   console.log({ error })

  // if (err)
  //   console.log({ err })

  // const showNotification = () => {
  //     clearNotifications({ variables: { page: curLoc } })
  //     locals({
  //       ...locals(),
  //       notification: {
  //         ...locals().notification,
  //         type: location.pathname,
  //         opened: true
  //       }
  //     })
  // } 
  
  return (
    <SideBar>
      <div className='box'> </div>
      <LinkList>
        <LinkItem >
          <NavLink to='/' title='Stocks'>
            <StocksIcon pre_loc='/' cur_loc={location.pathname} />
          </NavLink>
        </LinkItem>
        <LinkItem >
          <NavLink to='/expenses' title='Expenses'>
            <ExpenseIcon pre_loc='/expenses' cur_loc={location.pathname} />
          </NavLink>
        </LinkItem>
        <LinkItem >
          <NavLink to='/invoices' title='Transactions'>
            <InvoiceIcon pre_loc='/invoices' cur_loc={location.pathname} />
          </NavLink> 
        </LinkItem>
        {/* <LinkItem >
          <NavLink to='/invoices' title='Notification'>
            <NotifIcon pre_loc='/invoices' cur_loc={location.pathname} />
          </NavLink> 
        </LinkItem> */}
        
        <LinkItem>
          <NavLink to='/summary' title='Dashboard'>
            <DashboardIcon pre_loc='/summary' cur_loc={location.pathname} />
          </NavLink> 
        </LinkItem>
      </LinkList>
      <NavLink to='/settings' title='Settings'>
        <GearIcon pre_loc='/settings' cur_loc={location.pathname} />
      </NavLink>
    </SideBar>
  )
}

export const SideNav = withRouter(Nav)

