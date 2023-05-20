import React, { ReactElement, Fragment, useState, useEffect, useRef } from 'react'
import  ChecktOutForm  from '../forms/checkout';
import { BackIcon, CloseIcon, FowardIcon } from '../icons';
import { CartItem, Invoice, print, review } from '../../types/model'
import { CartListItem, CartItemsWraper, CartTotal, RecieptListItem, RecieptItemsCont } from '../listItems/cartItem';
import { StocksForm } from '../forms/stocks';
import { ExpenseForm } from '../forms/expense';
import { globalInvoice, locals } from '../../store/data';
import { useGetLocals } from '../../hooks/useGetProducts';
import { closeModal, formatMoney } from '../../utils';
import { Back2, Foward } from '../buttons';
import { CardHeader, Divider, CardFooter, FeedBack } from '../headers/styles';
import { PaymentReview } from '../forms/styles';
import { useReactiveVar } from '@apollo/client';
import ReviewForm from '../forms/review';
import { CardBody, ReviewModal, ModalContainer, Card, ClosePrint, SlindingCont, SlindingCont2, SlidingCont3 } from './styles';
import { RecieptInfo } from './recieptInfo';
import InvoicePrintPreview from './printPreview';
import { InvoicePrintHeader } from './recieptHeader';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
// import { RecieptListItemsss } from '../listItems/recieptItem';

export function CheckOut(props: any): ReactElement {

  const icon = <svg width={"24"} height={"23"} viewBox="0 0 24 23" fill="none" >
    <rect width="1.35905" height="8.15428" transform="matrix(0.707074 -0.70714 0.707072 0.707141 8.9668 9.60986)" fill="white" />
    <rect width="1.35905" height="8.15428" transform="matrix(0.707073 0.70714 -0.707073 0.70714 14.4014 8.64844)" fill="white" />
  </svg>

  const { localData:{ localState }, issues } = useGetLocals();

  const reviewing = useReactiveVar(review)


  let [invoice, setInvoice] = useState(props.invoice)
  let [itemInView, setItemInView] = useState({})

  let [slideIn, setSlideIn] = useState(false)
  let [slideUp, setSlideUp] = useState(false)
  // const i = useReactiveVar(globalInvoice)
  const [checkingOut, setCheckOut] = useState(false)

  useEffect(() => {
    setSlideIn(true)
  }, [])

  useEffect(() => {
    return () => {
      setSlideIn(false)
      // setInvoice(i)
    }
  }, [])

  const closePrintPreview = (e: any) => {
    console.log(`closed`)
    // setSlideUp(false)
  }
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  const updateStocks = (stock: CartItem) => {
     let newStocks = invoice.stocks.map((i: CartItem) => (i._id === stock._id) ? stock : i)
     invoice = {
        ...invoice,
        stocks: newStocks
     }
     setInvoice(invoice)
     locals({
       ...localState,
       invoice
     })
  }

  const handleQtyChange = (e: any, cartItem: CartItem) => {
    e.persist();
    e.stopPropagation();
    const stockToAdjust = invoice.stocks.find((i: CartItem) => i._id === cartItem._id)
    const stock = {
      ...stockToAdjust,
      [e.target.name]: +e.target.value,
    }
    updateStocks(stock);
  }

  const removeItem = (e: any, stock: CartItem) => {
    invoice = {
      ...invoice,
      stocks: invoice.stocks.filter((i: CartItem) => i._id !== stock._id)
    }
    setInvoice(invoice)
    locals({
       ...localState,
       invoice
     })
  }
  const updateAmountPaid = (stock: any) => {
    updateStocks(stock);
    setItemInView({});
  }

  const slectItemToReview = (item: CartItem) => {
    const stock = invoice.stocks.find((i: CartItem) => i._id === item._id)
    const inview: any = itemInView
    if (stock._id === inview._id) {
      setItemInView({})
    } else {
      setItemInView({ ...stock })
    }
  }

  const adjustQuantity = ( e: any, action: string, id: string) => {
    e.persist();
    let cartItem = invoice.stocks.find((i: CartItem) => i._id === id)
    let { quantity } = cartItem;
    if (action === '+') {
       quantity += 1;
    } else {
      if (quantity === 1) {
      } else {
        quantity -= 1
      }
    }
    const newCartItem = {
      ...cartItem,
      quantity,
    }
    updateStocks(newCartItem);
  }
  const handlePriceChange = (e: any, cartItem: CartItem) => {
    e.persist();
    let m = invoice.stocks.find((i: CartItem) => i._id === cartItem._id)
    const stock = {
      ...m,
      item: {
        ...m.item,
        [e.target.name]: +e.target.value
      },
    }
    setItemInView(stock)
    updateStocks(stock)
  }
  const getCartTotal = (items: CartItem[]) => {
    return items.reduce((total: number, i: CartItem) =>
      total + i.item.sellingPrice * i.quantity
    ,0)
  }

  const toggleCheckOut = () => {
    setCheckOut(!checkingOut)
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    // e.preventDefault()
  }

  const updateInvoice = (i: Invoice) => {
    setInvoice({
      ...invoice,
      recieved: i.recieved,
      completed: i.completed,
    })
  }
  const updatePrintInvoice = (i: Invoice) => {
    setInvoice({
      ...i,
    })
    setSlideUp(true)
  }
 
  const handlePrint2 = ()=>window.print();

  return (
    <>
      <Card slideIn = {slideIn} onClick = { (e: React.SyntheticEvent) => handleClick(e) }>
        <SlindingCont in={checkingOut}>
          <CardHeader>
            <h4>{invoice.stocks.length}Cart Item{invoice.stocks.length > 1 ? 's' : ''}</h4>
          </CardHeader>
          <CardBody> {
              <CartItemsWraper > 
                  {
                    invoice.stocks.map((cartItem: CartItem) =>
                      <CartListItem
                        key={cartItem._id}
                        stock={cartItem}
                        itemSelected={itemInView}
                        removeItemCallback={removeItem}
                        adjustCallback={adjustQuantity}
                        selectCallback={slectItemToReview}
                        updateAmountPaidCallback={updateAmountPaid}
                        qtyChangeCallback={(e: any) => handleQtyChange(e, cartItem)}
                        priceChangeCallback={(e: any) => handlePriceChange(e, cartItem)}
                        isLastItem={invoice.stocks[invoice.stocks.length - 1]._id === cartItem._id}
                      />
                    )
                  }
                  <CartTotal>
                      <p>TOTAL:</p>
                      <p>{formatMoney(getCartTotal(invoice.stocks))}</p>
                      <Divider w={90} />
                  </CartTotal>
              </CartItemsWraper>
          }
          </CardBody>
          <CardFooter>
              <p onClick={() => toggleCheckOut()}>Payment</p> 
              <Foward onClick={toggleCheckOut}>
                <FowardIcon />
              </Foward>
          </CardFooter> 
        </SlindingCont>
        <SlindingCont2 in={checkingOut} >
          <CardHeader>
              <Back2 onClick={toggleCheckOut}>
                <BackIcon />
              </Back2>
              <h4>Customer Info</h4>
          </CardHeader>
          <CardBody> 
            <ChecktOutForm
              invoice={invoice}
              checkingOut={checkingOut}
              updatePrintIvoice={updatePrintInvoice}
              updateCacheCallback={props.updateCacheCallback}
              total={getCartTotal(invoice.stocks).toString().split('.')}
            />
          </CardBody>
          <CardFooter />
          {/* <PaymentReview slideUp={reviewing}>
            <ReviewForm updateInvoiceCallback={updateInvoice} invoice={invoice} />
          </PaymentReview>
          {
            reviewing && <ReviewModal onClick={() => review(false)} />
          } */}
        </SlindingCont2>
        <SlidingCont3 up={slideUp} >
          <ClosePrint onClick={(e: any) => closePrintPreview(e)} >
            {icon}
          </ClosePrint>
          <div ref={componentRef}>
            <InvoicePrintHeader />
            <CardBody> {
              <RecieptItemsCont >
                <RecieptInfo invoice={invoice} />
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
            <p onClick={handlePrint2}>Print</p>
            </CardFooter>
          </SlidingCont3> 
          <FeedBack state={locals().feedback.success} msg={locals().feedback.msg}>
            <p>{locals().feedback.msg}</p>
          </FeedBack>
      </Card>
    </>
    )
}
const Modal = (props: any): ReactElement => {

   const { localData:{ localState }, issues } = useGetLocals();
   
   const updateCart = (i: Invoice) => {
    // invoice = i;
   }
  const close = ()=>{
    closeModal()
    review(false)
  }

  return  locals().page === 'stocks' ? 
    <ModalContainer onClick={() => close() } >
        <CloseIcon/> {
          locals().cartOpened ? 
          <CheckOut { ...props} updateCallback = { updateCart } invoice = { locals().invoice }/> 
          : 
          (!locals().selectedId) ? 
            <div id= 'table-container' className ='container'> {
              locals().scope === 'products' ? 
              <StocksForm edit = { true } { ...props }/> 
              : 
              <ExpenseForm edit = { true } { ...props }/>
          } </div> 
          : 
          <></>
        }
    </ModalContainer> 
    : 
    <></>
 }

export const TableModal = Modal;
