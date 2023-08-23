import { gql, InMemoryCache, useQuery, useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'
import cache from '../../../apollo-client'
import { GET_MATCHED_PRODS, MATCHED_PRODS } from '../../../graphql/queries'
import { Product, matchedProds } from '../../../types/model'
import { formatMoney } from '../../../utils'
import { readLocalStorage } from '../../headers/headerMenu'
import { Divider } from '../../headers/styles'
import { ImageItem } from '../../images'
import { SearchInput } from '../../inputs/search'
import { FormGroupCont } from '../../inputs/search/styles'
import Skeleton from '../../loaders/skeletons'
import { ItemInfo, OptItemInfo, SearchListCont, SearchListItemCont, SearchOptCont } from './styles'

const Search = (props: any) => {

    // const client = cache.cache as InMemoryCache;
    
    const { linkedTo } = readLocalStorage()

    let matches: any = useReactiveVar(matchedProds)

    const reOderMatchedProducts = (product: Product, i: number) => {

       const d = cache.readFragment({
            id: `Product:${matches[0]._id}`,
            fragment: gql`
                    fragment Stock on Product {
                         _id
                         name
                         description
                         costPrice
                         sellingPrice
                         instock
                    }
                `,
            // data: {
            //     ...product
            // }
        });
    //     cache.writeFragment({
    //         id: `Product:${product._id}`,
    //         fragment: gql`
    //                 fragment Stock on Product {
    //                      _id
    //                      name
    //                      description
    //                      costPrice
    //                      sellingPrice
    //                      instock
    //                 }
    //             `,
    //         data: {
    //             ...matches[i]
    //         }
    //     });

       
        

        const s = cache.readQuery({
            query: MATCHED_PRODS,
            variables: {
                query: '',
                _id: ''
            }
          }
        )
        console.log(s);
        console.log(d)
    }

    

    return (
        <SearchOptCont {...props}>
            {/* <FormGroupCont r={6}>
                <SearchInput
                    h={30}
                    name="search"
                    value={query}
                    focused={focus === 'slot'}
                    placeholder="Search products"
                    focusCallback={setFocus}
                    changeCallback={(e: any) => setQuery(e.target.value)}
                />
            </ FormGroupCont> */}
                <p className='sp'>SIMILAR PRODUCTS</p>
                <SearchListCont>
                {
                    !matches?.slice(1, 3).length ? 
                    <p className='fb'>No similar products found</p>
                    :
                    <>
                    {
                        matches?.slice(1, 3).map((prod: Product, i:number) => (
                        <SearchListItemCont onClick={()=>reOderMatchedProducts(prod, i)}>
                            <ImageItem
                                h={'35px'} w={'35px'} r={'4px'} b={'inherit'}
                                source={prod.stockImage}
                            />
                            <ItemInfo>
                                <p>{prod.name}</p>
                                <p>{prod.description}</p>
                            </ItemInfo>
                            <OptItemInfo>
                                <p>{prod.instock}</p>
                                <p>{formatMoney(prod.sellingPrice)}</p>
                            </OptItemInfo>
                                <Divider />
                        </SearchListItemCont >
                        ))
                    }
                     </>
                }
                </SearchListCont>
            
        </SearchOptCont>
    )
}

export default Search