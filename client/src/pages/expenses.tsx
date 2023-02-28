import { Fragment, ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import  { ExpenseHeader, HeaderNav } from '../components/headers'
import  { ExpenseListGroup } from '../components/listItems/expense'
import { GET_EXPENSES, SearchExpenses, useRetryGetExpenses } from '../graphql/queries'
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client'
import {EmptyFilter, EmptyState, ErrorState } from '../components/issues'
import { PageLoading } from '../components/loaders'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import InfiniteScroll from 'react-infinite-scroll-component';
import { expenseCriteria, groupingCriteria, initExpense, locals } from '../store/data'
import { editCallback, updateExpenses } from '../utils'
import { EXPENSE_SUBS } from '../graphql/subscriptions'
import { SideNav } from '../components/sideNavigation/SideNav'
import { IssueContainer, Issue } from '../components/issues/styles'
import { group } from 'console'

export const ItemWraper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const  Page = (props: any): ReactElement => {
    const location = useLocation();

    const { group, query} = useReactiveVar(expenseCriteria)
    const { search } = useLocation()
    const qs = queryString.parse(search)

    let offset = 0
    
    const { loading, data, error, refetch, fetchMore, subscribeToMore } =  useQuery(GET_EXPENSES, {
        variables: {
            query,
            group,
            offset,
        }
    })

    if(error) 
    console.log({ error })

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                query,
                offset: data?.expenses.length,
                group,
            }
        })
    }

    
    let expenses = [];
    if (data) {
        expenses = data?.expenses
    }
    
    return (
        <Fragment>
            <SideNav />
            <HeaderNav page='expenses' />
                <div className='container main-container'>
                <ExpenseHeader { ...props }/> {
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
                            <ErrorState w='150px' retryCallback={refetch } />
                            </Issue>
                        </IssueContainer>
                        :
                        !expenses?.length ?
                        <IssueContainer>
                            <Issue> {
                                query || group ? 
                                <EmptyFilter />
                                :
                                <EmptyState
                                    {...props}
                                    addCallback={(e: any) => editCallback(e, 'stocks', '', initExpense, 'expenses')}
                                    w='150px'
                                    btnLabel='Add Expense'
                                    message='No Expenses'
                                    suggestion='All expenses would be tracked here as soon as added '     
                                />
                            }
                            </Issue>
                        </IssueContainer>
                        :
                        <Fragment> {
                            <InfiniteScroll
                                dataLength={expenses.length }
                                next={ fetchMoreData }
                                hasMore={ true } 
                                loader={ <></> } 
                                style={{ overflow: 'visible' }}
                            > {
                                expenses.map((items: any) => (
                                    <ExpenseListGroup 
                                        key ={ items._id } 
                                        groupId={items._id }  
                                        list = { items.records }
                                        { ...props }
                                    />
                                ))
                            }
                            </InfiniteScroll>
                        }
                        </Fragment>
                }
                </div>
        </Fragment>
    )
}

export const ExpensePage = Page;
