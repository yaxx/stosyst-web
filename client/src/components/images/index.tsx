import { getImageUrl } from '../../apollo-client'
import { simplifyExpDate } from '../../utils'
import { DateIndictor, ImageWrap, StockIndicator } from './styles'


const ImageItem = (props: any)=> {
    const { source, expiry, expiryStatus} = props
    const exp = expiry ? simplifyExpDate(expiry) : null
    
    return (
        <ImageWrap {...props}> 
        {
                (expiryStatus && expiryStatus === 'weak' || expiryStatus === 'expired') ? <StockIndicator {...props}/> : <></>
        }
            <img src={getImageUrl(source)} alt="" /> {
                exp && <DateIndictor ><p>{exp}</p></DateIndictor>
            }
        </ImageWrap>
    )
}
export  { ImageItem }

