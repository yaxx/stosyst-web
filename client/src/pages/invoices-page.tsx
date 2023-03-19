import { Fragment, ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { HeaderNav, InvoiceHeader } from '../components/headers'
import { OuterList } from '../components/listItems/invoice'
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client'
import { GET_INVOICES, SearchInvoices} from '../graphql/queries/invoice'
import { ErrorState, EmptyState, EmptyFilter, EmptyInvoiceMessage } from '../components/issues'
import { PageLoading } from '../components/loaders'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SideNav } from '../components/sideNavigation/SideNav'
import { useReactToPrint } from 'react-to-print'
// import { INVOICE_SUBS } from '../graphql/subscriptions'
import { initProduct, invCriteria, locals } from '../store/data'
import { IssueContainer, Issue } from '../components/issues/styles'
import { isLeafType } from 'graphql'
import { editCallback } from '../utils'


export const Counter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 15px;
    width: 15px;
 `

export const Page = (props: any): ReactElement => {

    const location = useLocation();
    const componentRef = useRef(null);
    //  useEffect(() => {
    //     subscribeToNewInvoice()
    // }, [])
    const { query, group, filter } = useReactiveVar(invCriteria)
    // useEffect(() => {
    //     return () => {
    //         locals({ 
    //             ...locals(), 
    //             notification: {
    //                 ...locals().notification,
    //                 visible: true,
    //                 opened: false
    //             }
    //         })
    //     }
    // }, [])

    const { search } = useLocation()

    const qs = queryString.parse(search)
    let offset = 0;


    const { data, loading, error, refetch, fetchMore, subscribeToMore } = useQuery(
        GET_INVOICES, {
            variables: {
                filter,
                query: query || ' ',
                offset,
                group
            },
            fetchPolicy: "network-only"
        }
    )
    
    let curInvoices: any[]=[];
    if (data) {
        curInvoices = data?.invoices
        offset = offset + 20 ;
    }
    if(error) {
        console.log(JSON.stringify(error, null, 2))
    }
    // const subscribeToNewInvoice = () =>
    //     subscribeToMore({
    //       document: INVOICE_SUBS,
    //       variables: { 
    //           org: localStorage.getItem('org'), 
    //           usr: localStorage.getItem('usr') 
    //       },
    //       updateQuery: (prev, { subscriptionData }) => {

    //         if (!subscriptionData.data) return prev;

    //         const newFeedItem = subscriptionData.data.invoice;

    //         let { invoices } = prev
            
    //         return Object.assign({}, prev, {
    //             // invoices: updateInvoiceCache(newFeedItem)
    //         });
    //       }
    //     })

    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                filter,
                query: query || ' ',
                group,
                offset: data?.invoices?.length + 20,
            }
        })
    }

    return (
        <Fragment>
            {/* <ComponentToPrint ref={componentRef} /> */}
            <SideNav/>
            <HeaderNav page="invoice"/>
                <div className='container main-container'> 
                    <div id='ic' className="container">
                        <InvoiceHeader/>
                    </div> {
                       loading ?
                       <IssueContainer>
                           <Issue>
                                <PageLoading/>
                           </Issue>
                       </IssueContainer>
                       :
                       error ? 
                       <IssueContainer>
                           <Issue>
                                <ErrorState w='150px' retryCallback={refetch }/>
                           </Issue>
                       </IssueContainer>
                       :
                       !curInvoices?.length ?
                                <IssueContainer>
                                    <Issue>{
                                        filter || query ?
                                            <EmptyInvoiceMessage />
                                            :
                                            <EmptyState
                                                {...props}
                                                w='150px'
                                                btnLabel='Add Stock'
                                                message='No Transactions So Far'
                                                suggestion='Transaction appears as the occures'
                                            />
                                    }
                                    </Issue>
                                </IssueContainer>
                       :
                        <div className ='list-wrap'> {
                            <InfiniteScroll
                                dataLength={data?.invoices?.length + 20 }
                                next={ fetchMoreData }
                                hasMore={ true } 
                                loader={ <></> }
                                style={{ overflow: 'visible' }}
                            >
                            {
                                curInvoices.map((listGroup: any, i: number) => (
                                    <OuterList  {...props} nextRecords={curInvoices[i + 1]?.records || []} list={listGroup} key={listGroup.records[0]._id} />
                                ))
                            }
                            </InfiniteScroll>
                        }
                        </div>
                    }
                </div>
        </Fragment>
        )
    }
    
    export const InvoicePage = Page;

