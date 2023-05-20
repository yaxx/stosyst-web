import { useQuery } from "@apollo/client";
import { ReactElement, Fragment, useEffect, useState } from "react";
import { NOTIFICATIONS } from "../../graphql/queries/notifications";
import { locals } from "../../store/data";
import { closeModal, formatMoney, formatTime, format_date, updateExpenses } from "../../utils";
import { CloseIcon } from "../icons";
import { EmptyState, ErrorState} from "../issues";
import { StockPhoto, CartItemsWraper, CartStock as Note, Description, DescWrap, Item, Order as Time, SubTotal as TimeNotified } from "../listItems/cartItem";
import { PageLoading } from "../loaders";
import { useGetLocals } from "../../hooks/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import { INVOICE_SUBS, EXPENSE_SUBS } from "../../graphql/subscriptions";
import { Divider, CardHeader, CardFooter } from "../headers/styles";
import { IssueContainer, Issue } from "../issues/styles";
import { Card, CardBody, ModalContainer } from "./styles";

interface Props {
    
}

export default function InvoiceItem({stock, date}:any): ReactElement {

    return (
        <Item>
            <Note>
                <StockPhoto className='photo'>
                    <img src={stock.item.stockImage} alt="" />
                </StockPhoto>
                <DescWrap>
                    <Description>
                        <p >{stock.item.name}</p>
                        <p>{formatMoney(stock.item.sellingPrice * stock.quantity)}</p>
                    </Description>
                    <Time>
                        <TimeNotified>
                            {formatTime(date)}
                        </TimeNotified>
                    </Time>
                </DescWrap>
                <Divider w ={70} l={'72px'} />
            </Note>
        </Item>
    )
}

const InvoiceList = (props: any) => {
    return (
        <div className="igroup">
            <Divider w={92} bottom={100}>
                <p className="date-separator">{format_date(props.list.records[0].createdAt)}</p>
            </Divider> {
                props.list.records.map((invoice: any) => {
                    return (
                        <Fragment> {
                            invoice.stocks.map((stock: any) => {
                                return <InvoiceItem date={invoice.createdAt} key={stock._id} stock={stock} />
                            })
                        }
                        </Fragment>
                    )
                })
            }
        </div>
    )
}
 const ExpenseItem = ({expense, date}:any)=> {

    return (
        <Item>
            <Note>
                <DescWrap w ={ 100 }>
                    <Description>
                        <p >{expense.name}</p>
                        <p>{formatMoney(expense.amount)}</p>
                    </Description>
                    <Time>
                        <TimeNotified>
                            {formatTime(date)}
                        </TimeNotified>
                    </Time>
                </DescWrap>
                <Divider w ={82} l = {'30px'}/>
            </Note>
        </Item>
    )
}


const ExpenseList = (props: any) => {
    return (
        <div className="igroup">
            <Divider w= {92} bottom={100}>
                <p className="date-separator">{format_date(props.list.records[0].createdAt)}</p>
            </Divider> {
                props.list.records.map((expense: any)=>{
                    return <ExpenseItem date={expense.createdAt} key={expense._id} expense={expense}/>
                })
            }
        </div>
    )
}

export const NoticationList =  (props: any) => {

    let [slideIn, setSlideIn] = useState(locals().notification.visible)

    useEffect(() => {
        subscribeToNewInvoice()
        subscribeToNewExpense()
    }, [])

    useEffect(() => {
        setSlideIn(true)
    }, [slideIn])

    const subscribeToNewInvoice = () =>
        subscribeToMore({
            document: INVOICE_SUBS,
            variables: {
                org: localStorage.getItem('org'),
                usr: localStorage.getItem('usr')
            },
            updateQuery: (prev, { subscriptionData }) => {

                if (!subscriptionData.data) return prev;

                const newFeedItem = subscriptionData.data.invoice;

                let { notifications: { invoices } } = prev
                let { notifications } = prev

                // invoices = updateInvoiceCache(newFeedItem)

                return Object.assign({}, prev, {
                    notifications: {
                        ...notifications,
                        // invoices
                    }
                });
            }
        })

    const subscribeToNewExpense = () =>
        subscribeToMore({
            document: EXPENSE_SUBS,
            variables: {
                org: localStorage.getItem('org'),
                usr: localStorage.getItem('usr')
            },
            updateQuery: (prev, { subscriptionData }) => {

                if (!subscriptionData.data) return prev;

                const newFeedItem = subscriptionData.data.expense;

                let { notifications, notifications: { expenses } } = prev

                return Object.assign({}, prev, {
                    notifications: {
                        ...notifications,
                        expenses: updateExpenses(expenses, newFeedItem)
                    }
                })
            }
        })
    
    

    let offset = 0;

    const { loading, fetchMore, refetch, data, error, subscribeToMore } = useQuery(NOTIFICATIONS, {
         variables: {
              page: '',
              offset
            } 
        })

    if(data) console.log(data)

    const notifications = locals().notification.type === '/invoices' ? data?.notifications.invoices : data?.notifications.expenses

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                offset: notifications.length
            }
        })
    }
    
    return (
        <Card slideIn={slideIn} onClick = {(e: React.SyntheticEvent)=>e.stopPropagation()}>
            <CardHeader>
                <h4>Notifications</h4>
            </CardHeader>
            <CardBody>
                <CartItemsWraper> {
                        loading ?
                        <IssueContainer>
                            <Issue>
                                <PageLoading />
                            </Issue>
                        </IssueContainer>
                        :
                        error ?
                        <IssueContainer>
                            <Issue>
                                <ErrorState retryCallback = { refetch } w='150px'/>
                            </Issue>
                        </IssueContainer>
                        :
                        !notifications?.length ?
                        <IssueContainer>
                            <Issue>
                                <EmptyState
                                    { ...props }
                                    w='150px'
                                    nobtn
                                    message='No Notifications'
                                    suggestion='All notifications appears here '
                                />
                            </Issue>
                        </IssueContainer>
                        :
                        <Fragment> {
                            <InfiniteScroll
                                dataLength={notifications.length}
                                next={ fetchMoreData }
                                hasMore={true}
                                loader={<></>}
                            > {
                                locals().notification.type === '/invoices' ?
                                notifications.map((invoiceList: any) => (
                                    <InvoiceList key={invoiceList.records[0]._id} list={ invoiceList } />
                                ))
                                :
                                notifications.map((expenseList: any) => (
                                    <ExpenseList key={ expenseList.records[0]._id } list={ expenseList } />
                                ))
                            }
                            </InfiniteScroll>
                        }
                        </Fragment>
                    }
                </CartItemsWraper>
            </CardBody>
            <CardFooter/>
        </Card>
    )
}



const Modal = (props: any): ReactElement => {
    const { localData: { localState }, issues } = useGetLocals();
    return localState.notification.opened && localState.notification.opened ?  (
        <ModalContainer onClick={ () => closeModal() } >
            <CloseIcon /> 
            <NoticationList/>
        </ModalContainer>
    )
    :
    <></>
}

export const NotificationsModal = Modal;