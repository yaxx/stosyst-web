import { useReactiveVar, useQuery } from '@apollo/client'
import React, { Fragment, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import { HeaderNav, StocksHeader } from '../components/headers'
import { PrimaryHeaderNav } from '../components/headers/pri'
import { Staff, StaffItems, StaffList, StaffWrapper, StockItem, StockList, StockWrapper, StokcItems } from '../components/headers/stylesx'
import StocksImage, { ProductImage } from '../components/images/stockimage'
import { ErrorState, EmptyFilter, EmptyState } from '../components/issues'
import { IssueContainer, Issue } from '../components/issues/styles'
import { StocksListGroup } from '../components/listItems/stock'
import { PageLoading } from '../components/loaders'
import { SideNav } from '../components/sideNavigation/SideNav'
import { H4, ProductPrice } from '../components/typography'
import { stocks } from '../data'
import { GET_STOCKS } from '../graphql/queries'
import { useGetLocals } from '../hooks/useGetProducts'
import { groupingCriteria, initProduct, initStaff } from '../store/data'
import { Staff as StaffModel } from '../types/model'
import { editCallback } from '../utils'
import error from './error'
import { ProductsCont } from './styles'


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
            description: 'Skechers Womens Go Joy Walking Shoe Sneaker',
            sellingPrice: "140",
            instock: 66,
            views: 1,
            stockImage: "https://m.media-amazon.com/images/I/41QyBvpc4iL._AC_UF480,480_SR480,480_.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "100IU Insulin Syringe",
            description: ' Veggies Vitamins Bundle, Raw Whole Food Multivitamin',
            sellingPrice: "44",
            instock: 66,
            views: 72,
            stockImage: "https://ae01.alicdn.com/kf/Hbbcc20b37b1748f988a423f2191ee898p/Women-Bags-Fashion-Vintage-Designer-Messenger-PU-Leather-Handbag-High-quality-Casual-Shoulder-Top-Handle-Korean.jpg_640x640.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Komix",
            description: 'Bandager for surgery',
            sellingPrice: '2000',
            instock: 66,
            views: 2,
            stockImage: "https://m.media-amazon.com/images/I/81ZaXgJjDYL._AC_UY695_.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Fortflux-400 Sparfloxacin",
            description: 'Bandager for surgery',
            sellingPrice: "22",
            instock: 4,
            views: 68,
            stockImage: "https://m.media-amazon.com/images/I/71FwE+NiO2L._AC_UL640_QL65_.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Fortflux-400 Sparfloxacin",
            description: 'Bandager for surgery',
            sellingPrice: "22",
            instock: 4,
            views: 31,
            stockImage: "https://m.media-amazon.com/images/I/81S3oUMRGUL._AC_SR405,405_.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Paracetamol",
            description: 'Bandager for surgery',
            sellingPrice: "100",
            instock: 66,
            views: 100,
            stockImage: "https://m.media-amazon.com/images/I/81TJE3sdgWL._AC_UY695_.jpg",
        },
        {
            _id: "6331c6b445dccef72e836063",
            name: "Paracetamol",
            description: 'Bandager for surgery',
            sellingPrice: "100",
            instock: 66,
            views: 4,
            stockImage: "https://m.media-amazon.com/images/I/4173xhNJIjL._AC_UF480,480_SR480,480_.jpg",
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
          <PrimaryHeaderNav />
          <div className='container main-container'>
              <div id='ic' className="container"></div> 
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
                                <ProductsCont> {
                                      items.map((item: any) =>
                                          <StockWrapper>
                                            <div className='likes'>
                                                <div className="likes-cont">
                                                 <svg viewBox="0 0 512 512">
                                                    <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
                                                  </svg>
                                                </div>
                                                  <p className='likes-count'>{item.views}K</p>
                                            </div>
                                              <ProductImage bc={'whitesmoke'} h={'250px'} w={'100%'} r={'4px'} source={item.stockImage} />
                                              <a>{item.description}</a>
                                              <p className='views'>{item.views}K views in the past months</p>
                                              <ProductPrice>
                                                  <sup>N</sup>{item.sellingPrice}<sup>99</sup>
                                              </ProductPrice>
                                              <p>Dilivery <span>Mon, March 12</span> </p>
                                          </StockWrapper>
                                      )
                                    }
                                </ProductsCont>
                  }
                  </StokcItems>
              </StockList>
          </div>

      </Fragment>
  )
}

export default ExplorePage