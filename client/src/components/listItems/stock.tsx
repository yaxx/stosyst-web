import { ReactElement, Fragment, useState } from "react";
import { Row as StockList, Item, ListItems, MoreActions } from ".";
import { ItemWraper } from "../../pages/expenses";
import { CartItem, Product } from "../../types/model";
import { StocksForm } from "../forms/stocks";
import { ArrowDown, MoreIcon } from "../icons";
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useGetLocals } from "../../hooks/useGetProducts";
import { defState, groupingCriteria, locals } from "../../store/data";
import { getExpStatus, editCallback, format_date, isAdmin, formatMoney, roundFigureWithAlphabet } from "../../utils";
import { GET_STOCKS, GET_STOCK_SET } from "../../graphql/queries/stocks";
import { DateSeparator, TotalSeparator } from "../seperators";
import StockDetails from "./stockDetails";
import { can } from "../../utils/permisions";
import { DELETE_STOCK } from "../../graphql/mutations";
import { ImageItem } from "../images";
import { Divider, GroupLabel } from "../headers/stylesx";
import { Counter } from "../../pages/invoices-page";
import { P1 } from "../typography";
import cache from "../../apollo-client";
import { LoadingMore } from "../loaders";


export const StockListItems = (props: any) => {
    const { stock, togleMenu } = props
    return (
        <ListItems {...props}>
            <Item {...props} width={42.5}>
                <p>{stock.name}</p>
                <p id="subInfo">{stock.description}</p>
            </Item>
            <Item {...props} width={34.5}>
                <p>{stock.category}</p>
                <p id="subInfo">{stock.subCategory||'--'}</p>
            </Item>
            <Item {...props} width={11}>
                <p style={{ color: '#2d2d2de7' }}>{formatMoney(stock.sellingPrice) }</p>
            </Item>
            <Item {...props} width={12} ai='flex-end' className='options'>
                <p><MoreIcon openMenuCallback={togleMenu} /></p>
                <p style={{ color: `${stock.instock <= 0 ? '#f94701d2' : stock.instock <= stock.warningCount ? '#f9bc01' : '#2d2d2de7'}`}}>{stock.instock}</p>
            </Item>
            <Divider />
        </ListItems>
    )
}

export const StocksList = (props: any): ReactElement => {

    return (
        <Fragment>
            <ul className='stockList'> {
                props?.products.map((stock: Product, i: number) =>
                    <ItemWraper> {
                        (locals().selectedId === stock._id) && <StocksForm stock={stock}  {...props} />
                    }
                        <Stock i={i} {...props} cart={locals().invoice} selectCallback={props.selectCallBack} stock={stock} key={stock._id} />
                    </ItemWraper>
                )
            }
            </ul>
        </Fragment>
    )
}
export default function Stock(props: any): ReactElement {

    const [menuOpened, resetMenu] = useState(false);

    let { stock } = props;
    
    let { localData: { localState }, issues } = useGetLocals();

    const [deleteProduct, { error, loading }] = useMutation(DELETE_STOCK, {

        update: (cache, { data: { deleteProduct } }) => {
            const existingProducts: any = cache.readQuery({
                query: GET_STOCKS,
                variables: {
                    orderBy: '',
                    offset: 0
                }
            })

            let newProducts = existingProducts.products.map((prodGroup: any) => {
                return (prodGroup.records.some((prodItem: any) => prodItem._id === deleteProduct._id)) ?
                    ({
                        ...prodGroup,
                        records: prodGroup.records.filter((prod: any) => prod._id !== deleteProduct._id)
                    })
                    :
                    prodGroup
            })
            cache.writeQuery({
                query: GET_STOCKS,
                variables: {
                    offset: 0
                },
                data: {
                    products: newProducts.filter((prod: any) => prod.records.length)
                }
            });
        }
    });

    if (error) console.log({ error })

    const deleteItem = (id: string, e: any) => {
        e.stopPropagation();
        closeMenu();
        deleteProduct({
            variables: {
                id
            },
        })
    }

    const togleMenu = () => {
        resetMenu(!menuOpened)
    }

    const closeMenu = () => {
        resetMenu(false)
    }

    const editItem = (e: Event, stock: any) => {
        closeMenu();
        editCallback(e, 'stocks', 'products', stock, 'edit')
    }
    const displayDetails = (e: Event, stock: any) => {
        closeMenu();
        locals(defState)
        editCallback(e, 'stocks', 'products', stock, 'edit', false)
    }

    const addRemoveItem = (stock: Product) => {
        const { __typename, ...stripedStock } = stock;
        let { invoice: { stocks } } = localState
        const i = stocks.find((item: CartItem) => item._id === stripedStock._id)

        stocks = (!i) ?
            [
                ...stocks, {
                    _id: stripedStock._id,
                    item: stripedStock,
                    quantity: 1,
                    booked: false,
                    delivered: 0,
                }
            ]
            :
            stocks.filter((s: any) => s._id !== i._id)
        locals({
            ...localState,
            invoice: {
                ...localState.invoice,
                stocks
            }
        })
    }

    return (
        <StockList onClick={() => addRemoveItem(stock)}
            onMouseLeave={() => closeMenu()}
            selected={
                locals().invoice.stocks.some((cartItem: CartItem) => cartItem.item._id === stock._id)
            }>
            <ImageItem 
                expiry={stock.expiry}
                source={stock.stockImage}
                expiryStatus = {getExpStatus(stock)}
                />
            <StockListItems {...props} stock={stock} togleMenu={togleMenu} /> {
                menuOpened &&
                <MoreActions
                    closeMenuCallback={closeMenu}
                    actions={
                        [
                            {
                                label: 'Edit',
                                callback: (e: any) => editItem(e, stock),
                                permitted: isAdmin() || can('edit', 'stocks')

                            },
                            {
                                label: 'Stock Info',
                                callback: (e: any) => displayDetails(e, stock),
                                permitted: true
                            },
                            {
                                label: 'Delete Stock',
                                callback: (e: any) => deleteItem(stock._id, e),
                                permitted: isAdmin() || can('delete', 'stocks')
                            },
                        ]
                    }
                />
        }
        </StockList>
    )
}


export function StocksListGroup(props: any): ReactElement {
    const { list: items, count, total, groupId } = props;
    const { query, group, filter } = useReactiveVar(groupingCriteria)
    const [getStockSet, { loading, client, updateQuery, error, data }] = useLazyQuery(GET_STOCK_SET);

    // let r: any = list;
    if(data) {
        // r = data.setStocks;
       let {products} = cache?.readQuery({ query: GET_STOCKS });
       products = products.map((prod: any) => {
           return prod._id === groupId ? 
           {
            ...prod,
            records: [...prod.records, ...data.stockSet]
           } 
           : 
           prod
        });

        // updateQuery({query: GET_STOCKS }) => ({
        //     products: products.map((prod: any) => {
        //         return prod._id === groupId ?
        //             {
        //                 ...prod,
        //                 records: [...prod.records, ...data.stockSet]
        //             }
        //             :
        //             prod
        //     })
        // }));

        // updateQuery((i: any) => {
        //     console.log(i);
        // });


        // console.log(data)
        // console.log(products)

        // cache.writeQuery({
        //     query: GET_STOCKS,
        //     data: {
        //         products,
        //     }
        // });
    }

    if(error) {
        console.log(error);       
    }

    const loadMoreStockSet = (groupLabel: string)=> {
        getStockSet({
            variables:{
                query,
                filter,
                offset: 0,
                group,
                groupLabel,
            },
            fetchPolicy: 'network-only'
        })
    }
    return (
        <section className="stocksContainer">
            <DateSeparator>
                {group === 'date' ? format_date(groupId) : groupId}
                <Divider />
            </DateSeparator> {
                data?.stockSet ? 
                    <ul style={{ paddingLeft: 0 }} className='stockList'> {
                        data?.stockSet.map((stockItem: any) =>
                            <ItemWraper> {
                                (locals().selectedId === stockItem._id) &&
                                <Fragment> {
                                    locals().isEditing ?
                                        <StocksForm stock={stockItem} {...props} />
                                        :
                                        <StockDetails stock={stockItem} />
                                }
                                </Fragment>
                            }
                                <Stock {...props} cart={locals().invoice} selectCallback={props.selectCallBack} stock={stockItem} key={stockItem._id} />
                            </ItemWraper>
                        )
                    }
                    </ul>
                    :
                    <ul style={{ paddingLeft: 0 }} className='stockList'> {
                        items.map((stockItem: any) =>
                            <ItemWraper> {
                                (locals().selectedId === stockItem._id) &&
                                <Fragment> {
                                    locals().isEditing ?
                                        <StocksForm stock={stockItem} {...props} />
                                        :
                                        <StockDetails stock={stockItem} />
                                }
                                </Fragment>
                            }
                                <Stock {...props} cart={locals().invoice} selectCallback={props.selectCallBack} stock={stockItem} key={stockItem._id} />
                            </ItemWraper>
                        )
                    }
                    </ul>
            }
          
            <TotalSeparator onClick={()=>loadMoreStockSet(groupId)} leftPad={67}>
                <p>+{count - 5 <= 0 ? 0 : count - 5}</p>
                {
                    count > 5 ? 
                    <> {loading ? <LoadingMore /> : <ArrowDown /> } </> : <></>
                }
                <P1>{roundFigureWithAlphabet(total)}</P1>
                <Divider bottom={2}/>
            </TotalSeparator>
        </section>
    )
}