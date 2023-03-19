import { Back2 } from "../buttons"
import { Divider } from "../headers/stylesx"
import { BackIcon } from "../icons"
import { ImageItem } from "../images"

import { ClientInfo, RecieptHeader, RecieptHeaderCont } from "./styles"

export const InvoicePrintHeader = ()=> {
    return (
        <RecieptHeader>
            <RecieptHeaderCont>
               {/* <Back2>
                    <BackIcon />
              </Back2> */}
              <div style={{ height: '100%', width: 50, position: 'relative', paddingTop: 14, paddingBottom: 14,  borderRadius: 8 }}>
                <ImageItem h={'100%'} w={'50px'} source={'5be24dc6-9e73-4b49-9840-cefd4ef77327.jpeg'} />
              </div>
              <ClientInfo>
            <h6>{localStorage.getItem('name')}</h6>
                <p>08027867710</p>
                <p>No. 14, Market st, Jalingo</p>
              </ClientInfo>
            </RecieptHeaderCont>
            <Divider  />
        </RecieptHeader>
    )
}