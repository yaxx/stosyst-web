import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import cache from '../../../apollo-client'
import { SHARE_PRODUCT } from '../../../graphql/mutations'
import { GET_ACCOUNT, GET_MATCHED_PRODS, GET_STOCKS, READ_STOCK } from '../../../graphql/queries'
import { formatMoney } from '../../../utils'
import { PriBtn } from '../../buttons'
import { readLocalStorage } from '../../headers/headerMenu'
import { Divider } from '../../headers/styles'
import { RightAngleIcon } from '../../icons'
import { IconCont } from '../../icons/styles'
import { ImageItem } from '../../images'
import { TextInput } from '../../inputs'
import QInput from '../../inputs/quantity'
import { SearchInput } from '../../inputs/search'
import { FormGroupCont } from '../../inputs/search/styles'
import Skeleton from '../../loaders/skeletons'
import Search from './search'
import SelectedItem from './selectedItem'

import { BtnCont, DropIconCont, Form, FormContainer, HeaderCont, InfoSection, ItemInfo, ListItemCont, OptItemInfo, SearchOptCont } from './styles'

const ShareForm = (props: any) => {
    // const { stock } = props


    const [stock, setStock] = useState(props.stock)
    const [focus, setFocus] = useState('')
    const [opened, setOpened] = useState(false)

    const selectOpt = (opt: any, input: string) => {
        setFocus('')
    }
   
    const openSearchList = (e: any) => {
        e.stopPropagation()
        setOpened(!opened)
    }

    const client = readLocalStorage()

    const handleOnChange = (e: any) => {
        e.persist();
        const { target: { name, value } } = e;

        // setStock({
        //     ...stock,
        //     [name]: stock.instock - (+value)
        // })
            
        let data = cache.readQuery({
            query: GET_MATCHED_PRODS,
            variables: {
                query:'',
                storeId: ''
            }
        });

        // const pro = client.readFragment({
        //     id: 'Product:64c68581d66efdaa8a51f803', // The value of the to-do item's cache ID
        //     fragment: gql`
        //         fragment Pro on Product {
        //             _id
        //             name
        //             description
        //         }
        //     `,
        // });

        console.log(data)
    }

    const [share, { error, loading, data: d }] = useMutation(SHARE_PRODUCT, {
        update: (cache, { data: { shareProduct } }) => {
            const existingProds: any = cache.readQuery({
                query: GET_STOCKS,
            });
            cache.writeQuery({
                query: GET_STOCKS,
                data: {
                   
                },
            });
            // showFeedBack();
        },
    });

    const handleShare = ()=>{}
    
    return (
        <FormContainer>
            <HeaderCont>
                <h6>Share</h6>
            </HeaderCont>
            <Form>
                <InfoSection>
                    <Divider bottom={100} />
                    <h6>FROM:</h6>
                    <h6 className='store--id'>@{client.username}</h6>
                    <ListItemCont>
                        <ImageItem
                            h={'35px'} w={'35px'} r={'4px'} b={'inherit'}
                            source={stock.stockImage}
                        />
                        <ItemInfo>
                            <p>{stock.name}</p>
                            <p>{stock.description}</p>
                        </ItemInfo>
                        <OptItemInfo>
                            <p>{stock.instock}</p>
                            <p>{formatMoney(stock.sellingPrice)}</p>
                        </OptItemInfo>
                    </ListItemCont>
                </InfoSection>
                <InfoSection onClick={(e: any) => openSearchList(e)}>
                    <Divider bottom={100} />
                    <h6>TO:</h6>
                    <h6 className='store--id'>@{client.linkedTo[0].username}</h6>
                    <SelectedItem {...props} opened={opened} />
                    {
                     !opened &&
                        <QInput
                            name="instock"
                            placeholder="Quantity"
                            changeCallback={handleOnChange}
                            cancelCallback={()=>{}}
                        />
                    }
                    <DropIconCont>
                        <IconCont
                            rot={opened ? 270 : 90}
                            className='icon'
                            size={8}>
                            <RightAngleIcon />
                        </IconCont>
                    </DropIconCont>
                </InfoSection>
                <Search opened={opened} />
                {
                    !opened &&
                    <BtnCont>
                        <PriBtn mt={20} h={42}>Share</PriBtn>
                    </BtnCont>
                }
            </Form>
        </FormContainer>
    )
}

export default ShareForm