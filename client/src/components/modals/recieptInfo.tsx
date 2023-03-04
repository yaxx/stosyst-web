import { Divider } from "../headers/stylesx"
import { InvoiceInfoCont, CustomerInfo, TransInfo, InvoiceMainCont } from "./styles"

export const RecieptInfo = () => {
    return(
        <InvoiceMainCont>
            <h6>INVOICE</h6>
            <InvoiceInfoCont >
                <CustomerInfo>
                    <h6>TO:</h6>
                    <h6>Johnson Chide</h6>
                    <p>08027867710</p>
                    <p>No. 11, John st, Lagos</p>
                </CustomerInfo>
                <TransInfo>
                    <h6 style={{ visibility: 'hidden' }}><p>' '</p></h6>
                    <p>POS</p>
                    <p>AX12787B40</p>
                    <p>MAY 07, 07:45am</p>
                </TransInfo>
                <Divider />
            </InvoiceInfoCont>
        </InvoiceMainCont>
       
    )
}