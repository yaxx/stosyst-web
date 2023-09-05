import { getImageUrl } from "../../../apollo-client"
import { simplifyExpDate } from "../../../utils"
import { DateIndictor, StockIndicator } from "../../images/styles"
import { ImageCont } from "./styles"

const ImageItem = (props: any) => {
    const { source, expiry, expiryStatus } = props
    const exp = expiry ? simplifyExpDate(expiry) : null

    return (
        <ImageCont>
            {
                (expiryStatus && expiryStatus === 'weak' || expiryStatus === 'expired') ? <StockIndicator {...props} /> : <></>
            }
            {source && <img src={getImageUrl(source)} alt="" />}
            {
                exp && <DateIndictor ><p>{exp}</p></DateIndictor>
            }
        </ImageCont>
    )
}
export { ImageItem }