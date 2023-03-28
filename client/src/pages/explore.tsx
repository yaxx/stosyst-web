import { useReactiveVar, useQuery } from '@apollo/client'
import React, { Fragment, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import { HeaderNav, StocksHeader } from '../components/headers'
import { Staff, StaffItems, StaffList, StaffWrapper, StockItem, StockList, StockWrapper, StokcItems } from '../components/headers/stylesx'
import StocksImage from '../components/images/stockimage'
import { ErrorState, EmptyFilter, EmptyState } from '../components/issues'
import { IssueContainer, Issue } from '../components/issues/styles'
import { StocksListGroup } from '../components/listItems/stock'
import { PageLoading } from '../components/loaders'
import { SideNav } from '../components/sideNavigation/SideNav'
import { H4 } from '../components/typography'
import { stocks } from '../data'
import { GET_STOCKS } from '../graphql/queries'
import { useGetLocals } from '../hooks/useGetProducts'
import { groupingCriteria, initProduct, initStaff } from '../store/data'
import { Staff as StaffModel } from '../types/model'
import { editCallback } from '../utils'
import error from './error'


type Props = {}

const ExplorePage = (props: any)=> {
    const [hasMore, setHasMore] = useState(false);
    const [curGroup, setCurGroup] = useState('name');

    const { query, group, filter } = useReactiveVar(groupingCriteria)

    const { search } = useLocation()

    let offset = 0;

    const items = [
        {
            _id: "6331c6b445dccef72e836063",
            name: "Amoxiline",
            description: 'Syringe',
            sellingPrice: "1,940",
            instock: 66,
            stockImage: "https://mkprintingads.com/wp-content/uploads/2021/01/2-600x600.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "100IU Insulin Syringe",
            description: 'Syringe',
            sellingPrice: "5,700",
            instock: 66,
            stockImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcltcMrrxy3Uj-7vnSzW_BGMciSOWmytIaPPT0RhhnmqH7rYkXKPXlz70YdJHFajHXZc0&usqp=CAU",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Komix",
            description: 'Bandager for surgery',
            sellingPrice: '1,2000',
            instock: 66,
            stockImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH7xdubKakcRDs2JRl7xWfStbwaniYacYxDbfZLThssA6C7v0SIgmkiT2TZNwmxaafMcw&usqp=CAU",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Fortflux-400 Sparfloxacin",
            description: 'Bandager for surgery',
            sellingPrice: "47,000",
            instock: 66,
            stockImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIqC1AcGgxkAmnXd7TbvObsedkQ8RTkJyYg&usqp=CAU",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Paracetamol",
            description: 'Bandager for surgery',
            sellingPrice: "2,400",
            instock: 66,
            stockImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-h27X_mtsMzeuL-JuXIS9e9He0kRZ-KOStg&usqp=CAU",
        }
    ]

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
    let stocks = []
    if(data) {
        stocks = items
    }

    if (error) console.log(error)


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
  return (
      <Fragment>
          <SideNav />
          <HeaderNav />
          <div className='container main-container'>
              <div id='ic' className="container">
              </div> 
              <StockList height='170'>
                  <StokcItems> {
                      loading ?
                          <IssueContainer w='100vw'>
                              <Issue>
                                  <PageLoading />
                              </Issue>
                          </IssueContainer>
                          :
                          error ?
                              <IssueContainer w='100vw'>
                                  <Issue>
                                      <ErrorState w='150px' retryCallback={refetch} />
                                  </Issue>
                              </IssueContainer>
                              :
                              !data?.products?.length ?
                                  <IssueContainer w='100vw'>
                                      <Issue>
                                          <EmptyState
                                              addCallback={(e: any) => editCallback(e, 'settings', 'new', initStaff, '')}
                                              {...props}
                                              w='150px'
                                              btnLabel='Add Staff'
                                              message='No Staffs'
                                              suggestion='All staffs added appears here'
                                          />
                                      </Issue>
                                  </IssueContainer>
                                  :

                                 items.map((item: any) =>
                                      <StockWrapper>
                                          <StockItem>
                                             <StocksImage bc={'whitesmoke'} h={'100%'} w={'100%'} r={'4px'} source={item.stockImage} />
                                              <H4>{item.name}</H4>
                                              <p>
                                                  {item.description}
                                              </p>
                                             <H4>{item.sellingPrice}</H4>
                                         </StockItem>
                                     </StockWrapper>
                                  )
                  }
                  </StokcItems>
              </StockList>
          </div>

      </Fragment>
  )
}

export default ExplorePage