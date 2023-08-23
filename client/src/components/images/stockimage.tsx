import { simplifyExpDate } from "../../utils"
import { ImageWrap, ProdImageWrap, StockIndicator } from "./styles"

const StcokImage = (props: any) => {
    const { source, expiry, expiryStatus } = props
    const exp = expiry ? simplifyExpDate(expiry) : null

    return (
        <ImageWrap {...props}>
            {
                (expiryStatus && expiryStatus === 'weak' || expiryStatus === 'expired') ? <StockIndicator {...props} /> : <></>
            }
            {source && <img src={source} alt="" />}
            {
                // exp && <DateIndictor ><p>{exp}</p></DateIndictor>
            }
        </ImageWrap>
    )
}
export const ProductImage = (props: any) => {
    const { source, expiry, expiryStatus } = props
    const exp = expiry ? simplifyExpDate(expiry) : null

    return (
        <ProdImageWrap {...props}>
            {
                (expiryStatus && expiryStatus === 'weak' || expiryStatus === 'expired') ? <StockIndicator {...props} /> : <></>
            }
            <img src={source} alt="" /> {
                // exp && <DateIndictor ><p>{exp}</p></DateIndictor>
            }
        </ProdImageWrap>
    )
}
export default StcokImage
