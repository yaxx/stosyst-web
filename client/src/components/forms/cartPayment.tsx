import { useState } from 'react'
import { formatMoney, getCartTotal } from '../../utils'
import { FlatBtn } from '../buttons'
import { CloseIcon } from '../icons'

import {PaymentReviewer } from './styles'


export default function PaymentReviewForm(props: any) {
    const [recieved, setRecieved] = useState(props.invoice.recieved || +getCartTotal(props.invoice.stocks).toFixed(0))

    const handleAmountChange = (e: any) => {
        setRecieved(+e.target.value)
    }
    return (
            <PaymentReviewer>
                {/* <CloseIcon { ...props} iconHeight={"28"} iconWidth={"26"} size={16} top={"2%"} right={"2%"} />
                <PendingAmount >
                    <p>total</p>
                <p  className="amountVal">{formatMoney(getCartTotal(props.invoice.stocks))}</p>
                </PendingAmount>
                <div style={{ backgroundColor: 'whitesmoke', width: '100%' }}>
                    <PaidAmountInput
                        width={100}
                        name='paid'
                        value={recieved}
                        label='Recieved'
                        placeholder='Paid'
                        clearCallback={()=>setRecieved(0)}
                        changeCallback={handleAmountChange}
                    />
                </div>
                <PendingAmount >
                    <p>Balance</p>
                    <p className="amountVal">{formatMoney(+getCartTotal(props.invoice.stocks).toFixed(0) - recieved)}</p>
                </PendingAmount>
            <FlatBtn style={{ fontSize: "14px", outline: "none", boxShadow: 'none' }} onClick={() => props.updateRecievedCallback(recieved)}>save</FlatBtn> */}
            </PaymentReviewer>
    )
}