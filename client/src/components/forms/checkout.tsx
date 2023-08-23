import { useMutation } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import { review } from "../../types/model";
import { formatMoney, genTransId, getCartTotal, showFeedback, stripTypename } from "../../utils";
import { PriBtn, ReviewButton } from "../buttons";
import { DropDown, FormGroupCont, NameInput } from "../inputs";
import { CheckOutFormWraper } from "../listItems/cartItem";
import { Loader } from "../loaders";
import { CheckOut } from "../../graphql/mutations/checkout";
import { GET_STOCKS } from "../../graphql/queries";
import { CompleteMark, ReviewTotal, StandardForm } from "./styles";
import { CheckIcon, QuestionIcon, SuccessMarkIcon } from "../icons";
import DropDownOptions from "../listItems/dropdown";

export default function ChecktOutForm(props: any): ReactElement {

  const { invoice: modifiedInvoice, updatePrintIvoice } = props
  
  const [customer, setCustomer] = useState(modifiedInvoice.customer);
  const [invoice, setInvoice] = useState(modifiedInvoice)
  const [dropedInput, setDroppedInput] = useState('')
  const [done, setDone] = useState(false)
  const [inFocus, setInfocus] = useState('')

  useEffect(() => {
    setInvoice(modifiedInvoice)
  }, [modifiedInvoice])

  let newInvoice: any = {}

  const showFeedBack = () => {
    setDone(true);
    setTimeout(() => {
      setDone(false);
    }, 3000);
  };

  const [checkOut, {error, loading, data}] = useMutation(CheckOut, {
    update:(cache, { data:{ checkOut } }) => {
      if (!props.invoice._id) { 
        let result:any = cache.readQuery({
          query: GET_STOCKS,
        })
        checkOut.stocks.forEach(((stock: any)=>{
          result = {
            ...result,
            products: result.products.map((p: any) => ({
              ...p,
              records: p.records.map((r: any)=>(r._id === stock.item._id) ? 
                ({...r, instock: r.instock - stock.quantity}) : r )
            }))
          }
        }))
        cache.writeQuery({
          query: GET_STOCKS,
          data: {
            products: result.products
          }
        });
      }
      // updatePrintIvoice(newInvoice)
      // showFeedBack()
    }
  });

  
  if(data) {
    showFeedback(true, invoice._id ? 'Update successful' : 'Transaction successful')
    //  showFeedBack()
  }
   
  // if(error) {
  //    showFeedback(false, invoice._id ? 'Update successful' : 'Update failed')
  // }
  
  const handleChange = (e: any) => {
    e.persist();
    setCustomer({
        ...customer,
        [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = (e: any) => { 
    e.preventDefault();
    e.stopPropagation();
    if(loading) {
      return
    }
    
    if(e.target.name === 'review') {
    } else {
      let { stocks } = invoice
      stocks = stocks.map((stock: any) => {
        const { item, item: { added, modified }, _id, ...rest } = stock
        return {
          ...stripTypename(rest),
          item: {
            ...stripTypename(item),
            added: stripTypename(added),
            modified: stripTypename(modified)
          }
        }
      })

      const { seenBy, ...restIvoice } = invoice

       newInvoice = {
        ...restIvoice,
        stocks,
        customer,
        tid: genTransId(),
      }

      if (invoice._id) {
        const { added, modified, ...restInvoice } = invoice
        newInvoice = {
          ...stripTypename(restInvoice),
          stocks: stocks,
          added: stripTypename(added),
          modified: stripTypename(modified),
          customer: stripTypename(customer),
        }
      }
      
      checkOut({
        variables: {
          invoice: {
            ...newInvoice,
            recieved: invoice.recieved > 0 ? invoice.recieved : +getCartTotal(invoice.stocks).toFixed(0)
          }
        },
      })
    }
  }

  const clearInput = ( name: string) => {
    setCustomer({
        ...customer,
        [name]: ''
    })
  }

  const handleOptSelection = (opt: string)=>{
    setInvoice({
      ...invoice,
      paymentMethod: opt
    })
    setDroppedInput('')
  }

  const getRecievedAmount = () => invoice.recieved > 0 ? invoice.recieved.toString().split('.') : getCartTotal(invoice.stocks).toString().split('.')

  const openReview = (e: Event) => {
    e.preventDefault()
    review(true)
  }
  
  return (
      <CheckOutFormWraper {...props}>
          <StandardForm onSubmit = {
                (e: React.SyntheticEvent) => handleSubmit(e)
              }>
              <ReviewTotal>
                <p>PAID AMOUNT</p>
                <h6>
                  {formatMoney(invoice.recieved||getCartTotal(invoice.stocks))}
                  {/* <span style={{position: 'absolute', bottom: 1, marginLeft: -2, display: 'inline-block'}}>
                    <CompleteMark size={15} completed={invoice.completed}>
                      {
                        invoice.completed ? <CheckIcon /> : <QuestionIcon />
                      }
                    </CompleteMark> 
                  </span> */}
                </h6>
              </ReviewTotal>
              <FormGroupCont>
                <NameInput
                  autoFocus = 'autoFocus'
                  name = 'firstName' 
                  label = 'Full name' 
                  clearCallback ={clearInput}
                  value = {customer.firstName}
                  changeCallback = {(e: any) => handleChange(e)}
                />
              </FormGroupCont>
              <FormGroupCont>
                <NameInput
                  top={true}
                  name ='phone' 
                  label = 'Email or Mobile'
                  value = {customer.phone}
                  clearCallback ={clearInput}
                  changeCallback ={(e: any) => handleChange(e)}
                />
                <NameInput
                  name='address'
                  label='Customer Address'
                  value={customer.address}
                  clearCallback={clearInput}
                  changeCallback={(e: any) => handleChange(e)}
                /> 
            </FormGroupCont>
            <FormGroupCont>
              <DropDown
                  name='paymentmethod'
                  label='Payment Mehtod'
                  value={invoice.paymentMethod || 'POS'}
                  openCallback={()=>setDroppedInput('paymentmethod')}
                />
                {
                    dropedInput === 'paymentmethod' && <DropDownOptions selectCallback={handleOptSelection}  options={['POS', 'Cash', 'Transfer']} />
                }
            </FormGroupCont>
              <PriBtn w={'99.5%'} active={true} style={{fontSize: 10, fontWeight: 600}} disabled={loading}>
         
              {
                 loading ? 
                <Loader lf={45} /> 
                : 
                done ? <SuccessMarkIcon color={'white'}/> 
                :
                 props.invoice._id ? 'UPDATE INVOICE' : 'Comfirm payment' 
              }
              </PriBtn>
              {/* <ReviewButton name="review" onClick={(e:Event)=>openReview(e)}>REVIEW PAYMENT</ReviewButton> */}
          </StandardForm>
      </CheckOutFormWraper>
    )
}