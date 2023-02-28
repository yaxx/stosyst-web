import React, { ReactElement, Fragment, useState, useEffect } from 'react'
import styled from 'styled-components';
import  ChecktOutForm  from '../forms/checkout';
import { BackIcon, CloseIcon, EllipsisIcon2, FowardIcon } from '../icons';
import { CartItem, Invoice, review } from '../../types/model'
import { CartListItem, CartItemsWraper, CartTotal } from '../listItems/cartItem';
import { StocksForm } from '../forms/stocks';
import { ExpenseForm } from '../forms/expense';
import { locals } from '../../store/data';
import { useGetLocals } from '../../hooks/useGetProducts';
import { closeModal, formatMoney } from '../../utils';
import { Back2, FooterBtn, Foward, ReviewButton } from '../buttons';
import { CardHeader, Divider, CardFooter, FeedBack, ReviewHeader, ReviewFooter, DoneBtnCont } from '../headers/stylesx';
import { PaymentReview } from '../forms/styles';
import { useReactiveVar } from '@apollo/client';
import ReviewForm from '../forms/review';
import { CardBody, ReviewModal, ModalContainer, Card } from './styles';




export function CheckOut(props: any): ReactElement {

  const { localData:{ localState }, issues } = useGetLocals();

  const reviewing = useReactiveVar(review)

  let [invoice, setInvoice] = useState(props.invoice)
  let [itemInView, setItemInView] = useState({})

  let [slideIn, setSlideIn] = useState(false)

  const [checkingOut, setCheckOut] = useState(false)
  const [payment, setPayment] = useState(false)

  useEffect(() => {
    setSlideIn(true)
  }, [])

  useEffect(() => {
    return () => {
      setSlideIn(false)
    }
  }, [])
  
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
  }

  const updateInvoice = (i: Invoice) => {
    setInvoice({
      ...invoice,
      recieved: i.recieved,
      completed: i.completed,
    })
  }

  return (
        <Card slideIn = {slideIn} onClick = { (e: React.SyntheticEvent) => handleClick(e) }>
          <CardHeader>{
             checkingOut ?
             <Fragment>
               <Back2 onClick = { toggleCheckOut }>
                 <BackIcon/>
               </Back2>
               <h4>Customer Details</h4>
             </Fragment>
             :
             <h4>{ invoice.stocks.length } Cart Item{invoice.stocks.length > 1 ? 's' : '' }</h4>
          }                  
          </CardHeader>
          <CardBody> {
            !checkingOut ?
            <CartItemsWraper>{
              invoice.stocks.map((cartItem: CartItem) =>
                <CartListItem
                  key={cartItem._id}
                  removeItemCallback={removeItem}
                  adjustCallback={adjustQuantity}
                  selectCallback={slectItemToReview}
                  updateAmountPaidCallback={updateAmountPaid}
                  qtyChangeCallback={(e: any) => handleQtyChange(e, cartItem)}
                  priceChangeCallback={(e: any) => handlePriceChange(e, cartItem)}
                  stock={cartItem}
                  itemSelected={itemInView}
                  isLastItem={invoice.stocks[invoice.stocks.length - 1]._id === cartItem._id}
                />
              )
            }
            <CartTotal>
                <p>TOTAL:</p>
                <p>{formatMoney(getCartTotal(invoice.stocks))}</p>
                <Divider w={88} />
              </CartTotal>
            </CartItemsWraper>
            :
            <ChecktOutForm
              invoice = {invoice}  
              checkingOut = {checkingOut}
              updateCacheCallback={props.updateCacheCallback} 
              total = { getCartTotal(invoice.stocks).toString().split('.') } 
            />
            }
            </CardBody>
            <>
            {
              !checkingOut && 
              <CardFooter>
                <>
                  <p onClick={() => toggleCheckOut()}>Payment</p>
                  <Foward onClick={toggleCheckOut}>
                    <FowardIcon />
                  </Foward>
                </>
              </CardFooter> 
            } 
            {
              <PaymentReview slideUp={reviewing}>
                <ReviewForm updateInvoiceCallback={updateInvoice} invoice={invoice} />
              </PaymentReview>
            }
            </> 
            {
              reviewing && <ReviewModal onClick={()=>review(false)} />
            }
           <FeedBack state = { locals().feedback.success } msg={ locals().feedback.msg }><p>{locals().feedback.msg}</p></FeedBack>
        </Card>
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
