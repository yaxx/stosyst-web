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
          <div className="footer">© stosyst 2022</div>
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


export default PromoSection