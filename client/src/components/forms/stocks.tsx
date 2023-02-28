import React, { SyntheticEvent, ReactElement, useState } from "react";

import { Btn } from "../buttons";
import { initProduct } from "../../store/data";
import { Loader, SpinLoader } from "../loaders";
import { simplifyExpDate, updateProdCache } from "../../utils";
import { ImageItem } from "../images";
import { Mask } from "../images/styles";
import {UPLOAD_FILE} from "../../graphql/mutations";
import { SAVE_STOCK} from "../../graphql/mutations";
import { useMutation }  from '@apollo/client';
import { DoubleFormGroup, FileInput, FormGroupCont, NameInput } from "../inputs";
import {  GET_STOCKS } from "../../graphql/queries";
import { SuccessMarkIcon } from "../icons";
import { LoadingCont, TableForm } from "./styles";
import { InfoContainer, InfoItems, VDivider } from "../listItems/styles";


export function StocksForm(props: any): ReactElement {
    let { stock: s } = props

    s = {
        ...s,
        expiry: s?.expiry && s?.expiry.length > 5 ? simplifyExpDate(s?.expiry) : s?.expiry
    }

    const [stock, setStocks] = useState(s._id ? s : initProduct);
    const [selectedFile, setSelectedFile] = useState('')

    const [inFocus, setInFocus] = useState('name')
    const [mark, setMark] = useState(false)
    const [defaultImage, setImage] = useState('avatar.png');

    const showFeedBack = ()=>{
        setMark(true)
        setTimeout(() => {
            setMark(false)
        }, 2000);
    }
    
    const [saveStock, { error, loading, data: d }] = useMutation(SAVE_STOCK, {
        update: (cache, { data: { saveProduct: newProduct } }) => {
            const data: any = cache.readQuery({
                query: GET_STOCKS,
            });
            cache.writeQuery({
                query: GET_STOCKS,
                data: {
                    products: updateProdCache(data.products, newProduct),
                },
            });
            showFeedBack()
        },
    });

    const [uploadFile, { loading: uploading, error: uploadError, data: uploadResult }] = useMutation(UPLOAD_FILE, {
        onCompleted: (data: any) => {
            setImage(data.uploadFile.uri)
            setStocks({
                ...stock,
                stockImage: data.uploadFile.uri
            })
        },
        onError: (error: any) => {
            console.log({error})
        }
    })
    if (uploadError) {
        console.log(uploadError);
    }
    const hangleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if(!file) {
            return
        } else {
            setSelectedFile(file)
            uploadFile({
                variables: {
                    file,
                }
            })
        }
    }

    const handClick = (e: SyntheticEvent) => {
        e.stopPropagation();
    }

    const handleChange = (e: any) => {
        e.persist();
        const { target:{ name, value } } = e 
        const re = /^[0-9\b]+$/;

        if (((name === 'instock' || name === 'costPrice' || name === 'sellingPrice' || name === 'warningCount' || name === 'expiryWarning' ) && re.test(value)) || value==="") {
            setStocks({
                ...stock,
                [name]: value
            })
        }
        else if (name === 'name' || name === 'description' || name === 'category') {
            setStocks({
                ...stock,
                [name]:  value
            })
        } else if (name === 'expiry') {
            if (((re.test(value)) || value.includes('/') || value === "") && +value.length <= 5) {
                setStocks({
                    ...stock,
                    [name]: value
                })
            } 
        }
    }

    const handleClear = (name: string) => {
        setStocks({
            ...stock,
            [ name ]: ''
        })
    }

    const adjustQuantity = ( e: any, name: string, action: string) => {
        e.persist();
        setStocks({
            ...stock,
            [name]: action === 'inc' ? +stock.instock + 1 : (+stock.instock === 0 ? +stock.instock : +stock.instock - 1)
        })
    }

    const convertStringToDate = (date: string) => {
        let d = date.split('/')
        return new Date(`20${d[1]}-${d[0]}-01`)
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let striped:any = {};
        if(stock._id) {
            const {__typename, added, modified, ...rest} = stock
            const {__typename: add, ...adder} = added;
            const { __typename: mod, ...restMod } = modified;
            striped = { ...rest, added: adder, modified: restMod };
        } else {
            const {_id, ...rest} = stock
            striped = rest;
        }
        const { name, description,category, costPrice, sellingPrice, instock, warningCount, expiry, expiryWarning} =  striped

        saveStock({
            variables: { 
                product: {
                    ...striped,
                    name: name.trim(),
                    instock: +instock,
                    costPrice: +costPrice,
                    sellingPrice: +sellingPrice,
                    warningCount: +warningCount,
                    expiryWarning: +expiryWarning,
                    category: category.trim(),
                    description: description.trim(),
                    expiry: expiry ? convertStringToDate(expiry) : expiry
                }
            }
        });
    }
    return (
        <TableForm 
                id = { stock._id }
                onClick = {
                    (e: React.SyntheticEvent) => handClick(e)
                } 
                onSubmit = {
                    (e: React.SyntheticEvent) => handleSubmit(e)
                } 
                noValidate={ true }>
                    <>
                        <div style={{
                            height: '100%',
                            width: 200,
                            marginRight: '10px',
                            position: 'relative',
                            borderRadius: 10
                        }}>
                            <ImageItem
                                countWarning={stock.instock === stock.warningCount}
                                h={'100%'}
                                w={'200px'}
                                r='10px'
                                source={stock.stockImage} alt="" />
                            <FileInput onChange={hangleFileChange} type='file' />{
                                uploading ?
                                    <SpinLoader c='#aedaf8' lf={25} b={27} size='20px' />
                                    :
                                    <Mask>Edit</Mask>
                            }
                        </div>
                        <InfoContainer w>
                            <InfoItems w={95}>
                                <FormGroupCont w={98}>
                                    <NameInput
                                        top
                                        required
                                        name='name'
                                        label='Name'
                                        value={stock.name}
                                        focusCallback={setInFocus}
                                        clearCallback={handleClear}
                                        changeCallback={
                                            (e: any) => handleChange(e)
                                        }
                                    />
                                    <NameInput
                                        name='description'
                                        label='Description'
                                        value={stock.description}
                                        clearCallback={handleClear}
                                        focusCallback={setInFocus}
                                        changeCallback={
                                            (e: any) => handleChange(e)
                                        }
                                    />
                                </FormGroupCont>
                                <FormGroupCont w={98}>
                                    <NameInput
                                        top
                                        name='category'
                                        label='Category'
                                        value={stock.category || ''}
                                        clearCallback={handleClear}
                                        changeCallback={
                                            (e: any) => handleChange(e)
                                        }
                                    />
                                    <DoubleFormGroup>
                                        <NameInput
                                            w={50}
                                            name='costPrice'
                                            label='Cost price'
                                            value={stock.costPrice || ''}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                        <NameInput
                                            w={50}
                                            right
                                            required
                                            name='sellingPrice'
                                            label='Selling price'
                                            clearCallback={handleClear}
                                            value={stock.sellingPrice || ''}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                    </DoubleFormGroup>
                                </FormGroupCont>
                                <VDivider />
                            </InfoItems>
                            <InfoItems>
                                <FormGroupCont >
                                    <DoubleFormGroup>
                                        <NameInput
                                            top
                                            typography
                                            name='instock'
                                            label='Quantity'
                                            value={stock.instock || ''}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                        <NameInput
                                            top
                                            right
                                            name='warningCount'
                                            label='Stock level'
                                            value={stock.warningCount || ''}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                    </DoubleFormGroup>
                                    <DoubleFormGroup>
                                        <NameInput
                                            w={50}
                                            name='expiry'
                                            label='Expiration (MM/YY)'
                                            value={stock.expiry || ''}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                        <NameInput
                                            w={50}
                                            right
                                            name='expiryWarning'
                                            label='Warning piriod (MM)'
                                            value={stock.expiryWarning || ''}

                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                    </DoubleFormGroup>
                                </FormGroupCont>
                            </InfoItems>
                        </InfoContainer>
                        {
                            error ?
                                console.log({ error }) :
                                loading || mark ?
                                    <LoadingCont> {
                                        mark ?
                                            <SuccessMarkIcon />
                                            :
                                            <Loader size={'27px'} />
                                    }
                                    </LoadingCont>
                                    :
                                    !mark && !loading ?
                                        <Btn disabled={!stock.name || !stock.sellingPrice}>
                                            <p>GO</p>
                                        </Btn>
                                        :
                                        <></>
                        } 
                    </>
           
        </TableForm>
    )
}

                