import { Divider } from "../headers/stylesx"
import { InvoiceInfoCont, CustomerInfo, TransInfo, InvoiceMainCont } from "./styles"

export const RecieptInfo = (props: any) => {
    const {invoice} =  props
    return(
        <InvoiceMainCont>
            <h6>INVOICE</h6>
            <InvoiceInfoCont >
                <CustomerInfo>
                    <h6>TO:</h6>
                    <h6>{invoice.customer.firstName || '---'}</h6>
                    <p>{invoice.customer.phone || '---'}</p>
                    <p>{invoice.customer.address || '---'}</p>
                </CustomerInfo>
                <TransInfo>
                    <h6 style={{ visibility: 'hidden' }}><p>' '</p></h6>
                    <p>{invoice.paymentMethod||'--'}</p>
                    <p>AX12787B40</p>
                    <p>MAY 07, 07:45am</p>
                </TransInfo>
                <Divider />
            </InvoiceInfoCont>
        </InvoiceMainCont>
       
    )
}