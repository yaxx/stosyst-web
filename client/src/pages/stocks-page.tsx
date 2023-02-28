import { ReactElement, Fragment, useState, useEffect } from 'react'
import { StocksHeader, HeaderNav } from '../components/headers'
import { StocksListGroup } from '../components/listItems/stock'
import { FloatBtnCont, FloatingBtn, ItemsCounter, UncheckBtn } from '../components/buttons'
import { useGetLocals} from '../hooks/useGetProducts'
import { useLazyQuery, useQuery, useReactiveVar  } from "@apollo/client";
import {ErrorState, EmptyState, EmptyFilter } from '../components/issues'
import { PageLoading } from '../components/loaders'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import InfiniteScroll from "react-infinite-scroll-component";
import { clearSelections, editCallback, openCart } from '../utils'
import { defState, groupingCriteria, initInvoice, initProduct, locals } from '../store/data'
import { GET_STOCKS } from '../graphql/queries'
import { SideNav } from '../components/sideNavigation/SideNav'
import { BagIcon, CheckIcon } from '../components/icons'
import { IssueContainer, Issue } from '../components/issues/styles'
 
export  const Stocks = (props: any): ReactElement => {
    const [hasMore, setHasMore] = useState(false);
    const [curGroup, setCurGroup] = useState('name');

    const { query, group, filter } = useReactiveVar(groupingCriteria)

    const { search } = useLocation()

    let offset = 0;

    const { localData: { localState } } = useGetLocals();

    const { data, loading, error, fetchMore, refetch } = useQuery(GET_STOCKS, {
      variables: {
        query,
        offset,
        group,
        filter,
      },
      fetchPolicy: "network-only",
    })


    const stocks = data?.products

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                query,
                offset: stocks.length,
                groupBy: group,
                filterBy: filter,
            }
        })
    }

//    const subscribeToNewStocks = () =>
//         subscribeToMore({
//           document: STOCKS_SUBS,
//           updateQuery: (prev, { subscriptionData:{data} }) => {

//             if (!data) return prev;

//             const newFeedItem = data.stock;
//             console.log(newFeedItem);
//             return Object.assign({}, prev, {
//                 products: [newFeedItem, ...prev.products]
//             });
//           }
//         })

    return (
        <Fragment>
            <SideNav/>
            <HeaderNav /> 
            <div className='container main-container'> 
                <div id='ic' className="container">
                    <StocksHeader {...props}/>
                </div> {
                loading ?
                    <IssueContainer>
                        <Issue>
                            <PageLoading/>
                        </Issue>
                    </IssueContainer>
                    :
                    error  ? 
                    <IssueContainer>
                        <Issue>
                            <ErrorState w ='150px' retryCallback = { refetch }/>
                        </Issue>
                    </IssueContainer>
                    :
                    !stocks?.length ?
                    <IssueContainer>
                        <Issue>{
                            filter || query ? 
                            <EmptyFilter />
                            :
                            <EmptyState
                                {...props}
                                addCallback={(e: any) => editCallback(e, 'stocks', 'products', initProduct, 'products')}
                                w='150px'
                                btnLabel='Add Stock'
                                message='No Stocks'
                                suggestion='Add stocks to your store to get started'
                            /> 
                        }
                        </Issue>
                    </IssueContainer>
                    :
                    <div className ='list-wrap'> 
                    {
                        <InfiniteScroll
                            dataLength={ stocks.length }
                            next={ fetchMoreData }
                            hasMore={ true } 
                            loader = { 
                                <></>
                                }
                            style = {{ overflow: 'visible' }}
                        >
                        {
                            stocks.map((items: any) => (
                                <StocksListGroup 
                                    {...props} 
                                    key={items._id} 
                                    groupId={items._id} 
                                    list={items.records} 
                                />
                            ))
                        }
                        </InfiniteScroll>
                    }
                    </div> 
                }
            </div>
            <FloatBtnCont rt={(localState.invoice.stocks.length) ? 7 : -20}>
                <FloatingBtn onClick={() => openCart()} >
                    <ItemsCounter>{locals().invoice.stocks.length}</ItemsCounter>
                    <BagIcon />
                    <p>OPEN CART</p>
                </FloatingBtn>
                <UncheckBtn onClick={() => locals(defState)} >
                    <CheckIcon />
                    <p>DESELECT ALL</p>
                </UncheckBtn>
            </FloatBtnCont>
        </Fragment>
    )
}
export const StocksPage = Stocks

