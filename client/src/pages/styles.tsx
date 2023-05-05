import React from 'react'
import styled from 'styled-components'

 const PromoSection = () => {
  return (
      <div className="col col-lg-8 col-md-6  col-sm-6 promo-sec">
          <div className="promo">
              <div className='copy'>
                  <h6>Manage <br></br>your inventory<br></br>Like a pro</h6>
                  <p>Access and track your stocks and cashflow records 
                    ( such as sales, profits, expenses, pending payments etc) 
                    with few clicks anytime, anywhere
                  </p>
              </div>
              {/* <div className='copy'>
                  <h6>Get valuable insight</h6>
                  <p>Track your cashflow such as profits, expenses, pending payments etc seemlessly</p>
              </div>
              <div className='copy'>
                  <h6>Access everywhere</h6>
                  <p>Access your business records from your web, desktop or mobile</p>
              </div> */}
          </div>
          <div className="footer">© stosyst 2023</div>
      </div>
  )
}

export const DashboardContainer =  styled.div`
    background:#f0f0f0; 
    width: 100%; 
    height: 100%;
    padding-top: 40px;
    position:relative;
    overflow-x: hidden;
    overflow-y: hidden;
`
export const ChartCard =  styled.div<any>`
    height:${({ h }: any) => h || 320}px;
    border-radius: 0px;
    background: white;
    position: relative;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    width: ${({w}: any)=>w||50}%;
`
export const BarCard =  styled.div<any>`
    height: 320px;
    border-radius: 0px;
    background: white;
    position: relative;
    margin-bottom: 10px;
    width: 70%;
    padding-bottom: 50px;

`

export const StockCheckCard = styled(ChartCard)`
    h1 {
        /* font-size: 20px; */
    }
    h6 {
        font-size: 14px;
    }
`
export const CardColumn =  styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    border-top: 1px solid whitesmoke;
`
export const CardValue =  styled.div<any>`
    height: 100%;
    width: 50%;
    padding: 5px 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: flex-start;
    justify-content: center;
    border-right: ${({ l }: any) => l ? '1px solid whitesmoke': 'none'};
`
export const CardMarker = styled.div<any>`
    height: 35px;
    right: 15px;
    width: 35px;
    top: 25px;
    border-radius: 20px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({color}: any) => color}; 
`
export const TrendingBox = styled.div<any>`
    height: 100%;
    width: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`
export const PrintCont = styled.div<any>`
    height: 100%;
    width: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`
export const ProductsCont = styled.div<any>`
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`
export const PhotoDetailsCont = styled.div<any>`
    width: 450px;
    height: 500px;
    position: relative;
`
export const ProductDescCont = styled.div<any>`
    width: 500px;
    height: 500px;
    position: relative;
    padding: 5px 10px;
    .prod-desc {
        font-size: 16px;
    }
    .orders {
        margin: 10px 0px 5px 0px;
        font-size: 14px;
    }
    .price-cont {
        height: 70px;
        width: 100%;
        h4 {
            margin-bottom: 0px;
            font-size: 30px;
            font-weight:600;
            sup {
                font-size: 16px;
                margin-right: 2px;
            }
            span {
                color: grey;
                text-decoration: strikethrough;
                font-size: 14px;
                font-weight: normal;
                position: relative;
                /* bottom: 5px; */
            }
        }
        display: flex;
        align-items: center;
        margin-top: 20px;
        border-top:1px solid whitesmoke;
        border-bottom:1px solid whitesmoke;
    }
    .shippin-amount {
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 2px;
    }
    .shippin-route{
        color: grey;
        span {
            color: black;
        }
    }
`
export const ProdInfoCont = styled.div<any>`
    width: 100%;
    height: 80px;
    margin-top: ${props=>props.mt||8}px;
    position: relative;
    padding: 5px;
    display: flex;
    flex-direction: column;
    p {
        margin-bottom: 7px;
        span {
            color: grey;
        }
    }
    /* justify-content: center; */
`
export const ColorsCont = styled.div<any>`
    width: 100%;
    height: 50px;
    position: relative;
    display: flex;
`
export const ProdImageCont = styled.div<any>`
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    margin-right: 5px;
    border-radius: 6px;
`
export const SizesCont = styled.div<any>`
    width: 100%;
    height: 30px;
    position: relative;
    display: flex;
`
export const QtCont = styled.div<any>`
    width: 250px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    .qt-vailable {
        font-size: 12px;
        margin-bottom: 0px;
        margin-left: 5px;
        color: grey;
    }
`
export const QtBtn = styled.div<any>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
   background: #f2f2f2;
    p {
        font-size: 16px;
        margin-bottom: 0px;
    }
`
export const QtInput = styled(QtBtn)<any>`
    background: white;
`
export const SizeValue = styled.div<any>`
    min-width: 40px;
    padding: 2px 5px;
    height: 33px;
    position: relative;
     margin-right: 5px;
    display: flex;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 6px;
    p {
        margin-bottom: 0px;
        margin-right: 5px;
    }
`
export const PurchaseBtnsCont = styled.div`
    width: 480px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 93px;
    margin-top: 20px;
    div {
        height: 100%;
        width: 200px;
    }
    .likes {
      height: 40px;
      width: 60px;
      display: flex;
      border:1px solid lightgrey;
      border-radius: 6px;
      align-items: center;
      justify-content: center
    }
    .likes-cont {
        height: 27px;
        width: 27px;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .likes-count {
        margin-bottom: 0px;
    }
`

export default PromoSection