import { useQuery, useReactiveVar } from '@apollo/client';
import { group } from 'console';
import React, { Fragment, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Btn, PriBtn } from '../components/buttons';
import { HeaderNav } from '../components/headers';
import { StockList, StokcItems, StockWrapper } from '../components/headers/styles';
import { ProductImage } from '../components/images/stockimage';
import { ErrorState, EmptyState } from '../components/issues';
import { IssueContainer, Issue } from '../components/issues/styles';
import { PageLoading } from '../components/loaders';
import { SideNav } from '../components/sideNavigation/SideNav';
import { ProductPrice } from '../components/typography';
import { GET_STOCKS } from '../graphql/queries';
import { useGetLocals } from '../hooks/useGetProducts';
import { groupingCriteria, initStaff } from '../store/data';
import { editCallback } from '../utils';
import { ColorsCont, PhotoDetailsCont, ProdImageCont, ProdInfoCont, ProductDescCont, ProductsCont, PurchaseBtnsCont, QtBtn, QtCont, QtInput, SizesCont, SizeValue } from './styles';

const ProductDetails = (props: any)=> {
    const { localData: { localState } } = useGetLocals();

    const [hasMore, setHasMore] = useState(false);
    const [curGroup, setCurGroup] = useState('name');

    const { query, group, filter } = useReactiveVar(groupingCriteria)

    const { search } = useLocation()

    let offset = 0;

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
    if (data) {
        // stocks = items
    }

    if (error) console.log(error)
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
                                  <ProductsCont> 
                                      <PhotoDetailsCont >
                                          <ProductImage bc={'whitesmoke'} h={'500px'} w={'100%'} r={'4px'} source={"https://m.media-amazon.com/images/I/41QyBvpc4iL._AC_UF480,480_SR480,480_.jpg"}/>
                                      </PhotoDetailsCont>
                                      <ProductDescCont >
                                          <p className='prod-desc'>
                                            Soperwillton Women's Fashion Handbags Tote Bags Shoulder Bag Top Handle Satchel Purse Set 4pcs
                                          </p>
                                          <p className='orders'>
                                            27 Orders
                                          </p>
                                          <div className='price-cont'>
                                              <h4><sup>N</sup>2,700 <span>3200</span></h4>
                                          </div>
                                          <ProdInfoCont>
                                              <p>Colors: <span>Blue, Grey</span></p>
                                              <ColorsCont>
                                                  <ProdImageCont>
                                                      <ProductImage bc={'whitesmoke'} h={'50px'} w={'50px'} r={'4px'} source={"https://m.media-amazon.com/images/I/41QyBvpc4iL._AC_UF480,480_SR480,480_.jpg"} />
                                                  </ProdImageCont>
                                                  <ProdImageCont>
                                                      <ProductImage bc={'whitesmoke'} h={'50px'} w={'50px'} r={'4px'} source={"https://ae01.alicdn.com/kf/Hbbcc20b37b1748f988a423f2191ee898p/Women-Bags-Fashion-Vintage-Designer-Messenger-PU-Leather-Handbag-High-quality-Casual-Shoulder-Top-Handle-Korean.jpg_640x640.jpg"} />
                                                  </ProdImageCont>
                                                  <ProdImageCont>
                                                      <ProductImage bc={'whitesmoke'} h={'50px'} w={'50px'} r={'4px'} source={"https://m.media-amazon.com/images/I/4173xhNJIjL._AC_UF480,480_SR480,480_.jpg"} />
                                                  </ProdImageCont>
                                                </ColorsCont>
                                          </ProdInfoCont>
                                          <ProdInfoCont>
                                              <p>Sizes: <span>24mm</span></p>
                                              <SizesCont>
                                                  <SizeValue>
                                                      <p>10mm 14mm</p>
                                                 </SizeValue>
                                                  <SizeValue>
                                                      <p>8mm 22mm 18mm</p>
                                                 </SizeValue>
                                                  <SizeValue>
                                                      <p>24mm</p>
                                                 </SizeValue>
                                              </SizesCont>
                                          </ProdInfoCont>
                                          <ProdInfoCont>
                                              <p>Quantity:</p>
                                              <QtCont>
                                                  <QtBtn>
                                                      <p>-</p>
                                                  </QtBtn>
                                                  <QtInput>
                                                      <p>2</p>
                                                  </QtInput>
                                                  <QtBtn>
                                                      <p>+</p>
                                                  </QtBtn>
                                                  <p className='qt-vailable'>107 Pieces available</p>
                                              </QtCont>
                                          </ProdInfoCont>
                                          <p>Ships to Nigeria</p>
                                          <h6 className='shippin-amount'>Shipping: 2,700</h6>
                                          <p className='shippin-route'>From <span>China</span> to <span>Nigeria</span> via AliExpress Standard Shipping </p>
                                          <p className='shippin-route'>Estimated delivery on <span>Jul 05</span> </p>
                                          <PurchaseBtnsCont>
                                            <div>
                                                <PriBtn  name='signin'>Buy Now</PriBtn>
                                            </div>
                                            <div>
                                                <PriBtn  name='signin'>Add to Cart</PriBtn>
                                            </div>
                                            <div className='likes'>
                                                  <div className="likes-cont">
                                                      <svg viewBox="0 0 512 512">
                                                          <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
                                                      </svg>
                                                  </div>
                                                  <p className='likes-count'>2K+</p>
                                              </div>
                                          </PurchaseBtnsCont>
                                      </ProductDescCont>
                                  </ProductsCont>
                  }
                  </StokcItems>
              </StockList>
          </div>

      </Fragment>
  )
}

export default ProductDetails