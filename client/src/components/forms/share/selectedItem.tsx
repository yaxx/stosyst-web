import { useQuery, useReactiveVar } from '@apollo/client'
import React from 'react'
import { GET_MATCHED_PRODS } from '../../../graphql/queries'
import { initProduct } from '../../../store/data'
import { Product, matchedProds } from '../../../types/model'
import { formatMoney } from '../../../utils'
import { readLocalStorage } from '../../headers/headerMenu'
import { ImageItem } from '../../images'
import Skeleton from '../../loaders/skeletons'
import { ListItemCont, ItemInfo, OptItemInfo, ListFeedbackMsgCont } from './styles'


const SelectedItem = (props: any) => {

    const { stock } = props

    
    const { linkedTo } = readLocalStorage()

    let matches: any = useReactiveVar(matchedProds)

    const { data, loading, error } = useQuery(GET_MATCHED_PRODS, {
        variables: {
            query: stock.name,
            storeId: linkedTo[0]._id
        },
        fetchPolicy: "cache-first",
    })

    if (error) console.log(error)

    let product: Product = initProduct;

    if (data) {
        const {matchedProducts} =  data
        product = matchedProducts[0]
        matchedProds(matchedProducts)
    }
    return (
        <>
            {
                loading ?
                    <Skeleton h={60} pt={10} />
                    :
                    error || !product ?
                    <ListFeedbackMsgCont>
                        <p>
                            {
                                error ? 'Connection Error' : 'No matching product found'
                            }
                        </p>
                    </ListFeedbackMsgCont>
                    :
                    <ListItemCont>
                        <ImageItem
                            h={'35px'} 
                            w={'35px'} 
                            r={'4px'} 
                            b={'inherit'}
                            source={product.stockImage}
                        />
                        <ItemInfo>
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                        </ItemInfo>
                        <OptItemInfo>
                                <p>{product.instock}</p>
                            <p>{formatMoney(product.sellingPrice)}</p>
                        </OptItemInfo>
                    </ListItemCont>
            }
        </>

    )
}

export default SelectedItem