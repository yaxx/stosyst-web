import { gql, useMutation, useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'
import { SHARE_PRODUCT } from '../../../graphql/mutations'
import { GET_STOCKS } from '../../../graphql/queries'
import { groupingCriteria, sharedModal } from '../../../store/data'
import { matchedProds } from '../../../types/model'
import { formatMoney, updateProdCache } from '../../../utils'
import { PriBtn } from '../../buttons'
import { readLocalStorage } from '../../headers/headerMenu'
import { Divider } from '../../headers/styles'
import { CancelIcon, RightAngleIcon, SuccessMarkIcon } from '../../icons'
import { IconCont } from '../../icons/styles'
import { ImageItem } from '../../images'
import QInput from '../../inputs/quantity'
import { Loader } from '../../loaders'
import Search from './search'
import SelectedItem from './selectedItem'

import { BtnCont, DropIconCont, Form, FormContainer, HeaderCont, InfoSection, InputCont, InputGroupCont, ItemInfo, ListItemCont, OptItemInfo } from './styles'

const ShareForm = (props: any) => {
    const { closeCallback } = props


    const [stock, setStock] = useState(props.stock)
    const [focus, setFocus] = useState('')
    const [opened, setOpened] = useState(false)
    const [count, setCount] = useState(0)
    const [done, setDone] = useState(false)

    const selectOpt = (opt: any, input: string) => {
        setFocus('')
    }

    const { group } = useReactiveVar(groupingCriteria)


    const openSearchList = (e: any) => {
        e.stopPropagation()
        // setOpened(!opened)
    }

    const client = readLocalStorage()

    const handleOnChange = (e: any) => {
        e.persist();
        const { target: { value } } = e;
        setCount(+value)
    }



    const showFeedBack = () => {
        setDone(true);
        setTimeout(() => {
            setDone(false);
            setCount(0)
        }, 3000);
    };

    const [shareProduct, { error, loading, data: d }] = useMutation(SHARE_PRODUCT, {
        update: (cache, { data: { shareProduct } }) => {
            const data: any = cache.readQuery({
                query: GET_STOCKS,
            });
            cache.writeQuery({
                query: GET_STOCKS,
                data: {
                    products: updateProdCache(data.products, shareProduct[1], group),
                },
            });

            matchedProds(shareProduct[0])

            setStock(shareProduct[1])

            cache.writeFragment({
                id: `Product:${shareProduct[0]._id}`,
                fragment: gql`
                    fragment Stock on Product {
                         _id
                    }
                `,
                data: {
                    ...shareProduct[0]
                }
            });
            showFeedBack();
        },
    });

    if (error) console.log(error);

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if(count>0) {
            shareProduct({
                variables: {
                    q: count,
                    addId: matchedProds()[0]._id,
                    subId: stock._id
                },
            });
        }
        
    }

    const adjustCount = (e: Event, val: number) => {
        e.stopPropagation()
        setCount(val >= 0 ? val: count);
    }

    return (
        <FormContainer onClick = {(e:any)=>e.stopPropagation()}>
            <HeaderCont>
                <h6>Share</h6>
                <IconCont onClick={()=>sharedModal('')} bg="whitesmoke" size={10}>
                    <CancelIcon />
                </IconCont>
            </HeaderCont>
            <Form onSubmit={(e: any) => handleSubmit(e)}>
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
                        <InputCont>
                            <Divider bottom={100} />
                            <p>Quatity:</p>
                            <InputGroupCont>
                                <IconCont onClick={(e: Event) => adjustCount(e, count + 1)}  className='icon' size={9}>
                                    <p>+</p>
                                </IconCont>
                                <QInput
                                    name="instock"
                                    placeholder="0"
                                    cancelCallback={() => { }}
                                    value={count}
                                    changeCallback={handleOnChange}
                                />
                                <IconCont onClick={(e: Event) => adjustCount(e, count - 1)} className='icon' size={9}>
                                    <p>-</p>
                                </IconCont>
                            </InputGroupCont>
                        </InputCont>
                    }
                </InfoSection>
                <Search opened={opened} />
                {
                    !opened &&
                    <BtnCont>
                        <PriBtn active = {count > 0 ? true: false} mt={20} h={40}>
                            {
                                done ? <SuccessMarkIcon color='white' /> 
                                : loading ? 
                                <Loader size={"27px"} /> 
                                : <>Share</>
                            }
                        </PriBtn>
                    </BtnCont>
                }
            </Form>
        </FormContainer>
    )
}

export default ShareForm