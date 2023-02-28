import React, { ReactElement, useState } from "react";
import { review } from "../../types/model";
import { formatMoney, getCartTotal } from "../../utils";
import { FooterBtn, ReviewButton } from "../buttons";
import { ReviewFooter, DoneBtnCont, ReviewHeader } from "../headers/stylesx";
import { CheckIcon, QuestionIcon } from "../icons";
import { BalanceCont, MultiFormGroupContainer, MultiInput } from "../inputs";
import { ReviewFormWraper } from "../listItems/cartItem";
import { CompleteMark, ReviewFormCont, ReviewTotal} from "./styles";

export default function ReviewForm(props: any): ReactElement {

    let { invoice, updateInvoiceCallback } = props;

    const [completed, setCompleted] = useState(invoice.completed)

    const [recieved, setRecieved] = useState(invoice.recieved || +getCartTotal(invoice.stocks).toFixed(0))

    const handleAmountChange = (e: any) => {
        setRecieved(+e.target.value)
    }
    const updateInvoice = () => {
        invoice = {
            ...invoice,
            recieved,
            completed
        }
        review(false)
        updateInvoiceCallback(invoice)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }

    return (
        <ReviewFormWraper {...props}>
            <ReviewHeader>
                <h4>Payment review</h4>
            </ReviewHeader>
            <ReviewFormCont onSubmit={
                (e: React.SyntheticEvent) => handleSubmit(e)
            }>  <ReviewTotal>
                    <p>TOTAL</p>
                    <h6>{formatMoney(getCartTotal(invoice.stocks))}</h6>
                </ReviewTotal>
                <MultiFormGroupContainer>
                    <MultiInput
                        name='paid'
                        label='Paid amount'
                        autoFocus='autoFocus'
                        value={recieved}
                        clearCallback={() => setRecieved(0)}
                        changeCallback={handleAmountChange}
                    />
                    <BalanceCont>
                        <label>Balance</label>
                        <p>{formatMoney(+getCartTotal(invoice.stocks) - recieved)}</p>
                    </BalanceCont>
                </MultiFormGroupContainer>
                <ReviewButton checkbox onClick={()=>setCompleted(!completed)}>
                    <CompleteMark completed={completed}> {
                        completed ? <CheckIcon /> : <QuestionIcon />
                    }
                    </CompleteMark> 
                    {completed ? 'COMPLETED' : 'PENDING'}
                </ReviewButton>
            </ReviewFormCont>
            <ReviewFooter >
                <DoneBtnCont >
                    <FooterBtn onClick={() => updateInvoice()} right>DONE</FooterBtn>
                </DoneBtnCont>
            </ReviewFooter>
        </ReviewFormWraper>
    )
}