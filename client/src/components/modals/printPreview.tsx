import React, { useEffect, useRef, useState } from 'react'
import { CartItem } from '../../types/model'
import { formatMoney, getCartTotal } from '../../utils'
import { InvoiceHeader } from '../headers'
import { Divider, CardFooter } from '../headers/styles'
import { RecieptItemsCont, RecieptListItem, CartTotal } from '../listItems/cartItem'
import { RecieptInfo } from './recieptInfo'
import { ClosePrint, CardBody } from './styles'
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { useReactiveVar } from '@apollo/client'
import { globalInvoice } from '../../store/data'
import { print } from '../../types/model'
import { InvoicePrintHeader } from './recieptHeader'

const InvoicePrintPreview = (props: any) =>  {
    const printing = useReactiveVar(print)
    // const i = useReactiveVar(globalInvoice)
    const closePrintPreview = (e: any) => {
        print(false)
    }
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const {invoice} = props;
    // const [invoice, setInvoice] = useState({ ...globalInvoice()})
    // useEffect(() => {
    //     return () => {
    //         console.log({...i});
            
    //         setInvoice(i)
    //     }
    // }, [i])
  return (
      <>
          <ClosePrint onClick={(e: any) => closePrintPreview(e)} />
          <div ref={componentRef}>
              <InvoicePrintHeader />
              <CardBody> {
                  <RecieptItemsCont >
                      <RecieptInfo invoice={invoice}/>
                      {
                          invoice?.stocks.map((cartItem: CartItem) =>
                              <RecieptListItem
                                  key={cartItem._id}
                                  stock={cartItem}
                                  isLastItem={invoice?.stocks[invoice?.stocks.length - 1]._id === cartItem._id}
                              />
                          )
                      }
                      <CartTotal>
                          <p>TOTAL:</p>
                          <p>{formatMoney(getCartTotal(invoice?.stocks))}</p>
                          <Divider w={90} />
                      </CartTotal>
                  </RecieptItemsCont>
              }
              </CardBody>
          </div>
          <CardFooter>
              <ReactToPrint
                  content={() => componentRef.current}
              />
              <p onClick={handlePrint}>Print</p>
          </CardFooter>
      </>
  )
}

export default InvoicePrintPreview