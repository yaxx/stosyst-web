import React from 'react'
import { LogoIcon } from '../components/icons'

const PromoSection = () => {
    return (
        <div className="col col-lg-8 col-md-6  col-sm-6 promo-sec">
            <div className="promo">
                <div className='copy'>
                    <h6>Stay connected with your business</h6>
                    <p>Stay in the picture with your business anytime, anywhere</p>
                </div>
                <div className='copy'>
                    <h6>Get valuable insight</h6>
                    <p>Track your cashflow such as profits, expenses, pending payments etc seemlessly</p>
                </div>
                <div className='copy'>
                    <h6>Access everywhere</h6>
                    <p>Access your store from your web, desktop or mobile</p>
                </div>
            </div>
            <div className="footer">© stosyst 2022</div>
        </div>
    )
}

export default PromoSection


const LogoItem = () => {
    return (
        <div style={{ zIndex: 1000, position: 'absolute', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', alignItems: 'center', height: 30, width: 100, top: 10, left: 10 }}>
            <LogoIcon />
            <p style={{ fontSize: 18, top: 8, position: 'relative', fontWeight: 'bold' }}>stosyst</p>
        </div>
    )
}

export { LogoItem } 


