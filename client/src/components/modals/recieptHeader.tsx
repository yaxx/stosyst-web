import { Divider } from "../headers/stylesx"
import { ImageItem } from "../images"

import { ClientInfo, RecieptHeader, RecieptHeaderCont } from "./styles"

export const InvoiceHeader = ()=> {
    return (
        <RecieptHeader>
            <RecieptHeaderCont>
              <div style={{ height: '100%', width: 50, position: 'relative', paddingTop: 14, paddingBottom: 14,  borderRadius: 8 }}>
                <ImageItem h={'100%'} w={'50px'} source={'5be24dc6-9e73-4b49-9840-cefd4ef77327.jpeg'} />
              </div>
              <ClientInfo>
                <h6>Maroons Electricals</h6>
                <p>08027867710</p>
                <p>No. 14, Market st, Jalingo</p>
              </ClientInfo>
            </RecieptHeaderCont>
            <Divider  />
        </RecieptHeader>
    )
}