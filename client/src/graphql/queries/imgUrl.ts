
import { gql } from '@apollo/client'

 export const GET_IMG_URL = gql`
    query imgUrl {
        imgUrl {
            url
        }
    }
`