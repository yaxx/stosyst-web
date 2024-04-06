import { useMutation, useReactiveVar } from "@apollo/client";
import { ReactElement, useState } from "react";
import { Fragment } from "react";
import { useGetLocals } from "../../hooks/useGetProducts";
import { ItemWraper } from "../../pages/expenses";
import { Counter } from "../../pages/invoices-page";
import { invCriteria, locals } from "../../store/data";
import { MoreIcon } from "../icons";
import { Photo, PhotoMask } from "../stockImages";
import { P1, P2 } from "../typography";
import { InvoiceDetails } from "./stockDetails";
import { ElasticContainer } from '../containers'
import { can } from "../../utils/permisions";
import { DateSeparator, TotalSeparator } from "../seperators";
import { ImageItem } from "../images";
import { Mask } from "../images/styles";
import { DeleteInvoice } from "../../graphql/mutations/checkout";
import { Row as InvoiceList, ExpandableList, Paid, Item, ListItems, MoreActions } from ".";
import { sortByPaid, format_date, getNetInvoiceToatal, isAdmin, getCartTotal, formatMoney } from "../../utils";
import { Divider } from "../headers/styles";
import { roundAmount } from "../charts/header";

export const InvoiceListItems = ({ openMenu, stock, invoice, opened, pendings, index, netCount, theme }: any,) => {
    // console.log(invoice)
    return (
        <ListItems>
            <Item width={53}>
                <P1 style={{ color: '#000000e7' }} >{stock.item.name}</P1>
                <P2 id="subInfo">{stock.item.description}</P2>
            </Item>
            <Item width={25}>
                <P1 style={{ color: '#000000e7'}}>{invoice.customer.firstName|| ' '}</P1>
                <P1 id="subInfo">{invoice.customer.phone || invoice.customer.address || ' '}</P1>
            </Item>
            <Item width={17}><P1>{}</P1></Item>
            <Item width={17}><P1 style={{ color: '#000000e7' }}>{stock.quantity}</P1></Item>
            <Item width={8} ai='flex-end' className='options'>
                <p><MoreIcon openMenuCallback={openMenu} /></p>
                <Paid style={{ color: !invoice.completed ? '#f304048f' : '#000000e7'}} i={index} opened={opened} pendings={pendings} >
                    {formatMoney(stock.item.sellingPrice * stock.quantity)}
                    <span>+</span>
                </Paid>
                <P1 id="subInfo">{invoice.paymentMethod||'---'}</P1>
            </Item>
            <Divider />
        </ListItems>
    )
}

export function InvoiceItem(props: any): ReactElement {

    const [menu, setMenu] = useState(false);

    let { stock, invoice, opened, pendings, index, netCount } = props;

    const [deleteInvoice, { error, loading, data }] = useMutation(DeleteInvoice, {
        update: (cache, { data }) => {
            cache.modify({
                id: cache.identify(invoice),
                fields: {
                    stocks(existingStocktRefs, { readField }) {
                        return existingStocktRefs.filter(
                            (stockRef: any) => data.deleteInvoice._id !== readField('_id', stockRef)
                        );
                    },
                },
            });
        }
    })

    if (error)
        console.log({ error })

    const openMenu = () => {
        setMenu(true);
        if (!opened)
            props.collapseCallback(netCount)
    }
    const closeMenu = () => {
        setMenu(false);
    }

    const reverseTransaction = (e: any, stock: any) => {
        e.stopPropagation()
        setMenu(false)
        let { __typename, item, ...cleanStock } = stock
        item = {
            _id: item._id,
            name: item.name,
            category: item.category,
            costPrice: item.costPrice,
            description: item.description,
            stockImage: item.stockImage,
            sellingPrice: item.sellingPrice,
        }
        stock = { ...cleanStock, item }
        deleteInvoice({
            variables: {
                refund: {
                    invoiceId: invoice._id,
                    stock
                }
            }
        })
    }

    const openCart = (e: Event) => {
        e.stopPropagation()
        setMenu(false)
        locals({
            ...locals(),
            invoice,
            page: 'stocks',
            scope: 'cart',
            cartOpened: true
        })
    }

    const displayDetails = (e: Event) => {
        e.stopPropagation()
        setMenu(false)
        locals({
            ...locals(),
            invoiceId: invoice._id,
            selectedId: stock.item._id,
            isEditing: false,
            page: 'stocks',
            scope: 'invoices'
        })
    }
    return (
        <InvoiceList onClick={() => props.collapseCallback(netCount)}>
            <div style={{height: 42, width: 42, position: 'relative', borderRadius: 4}}>
                <ImageItem source={stock.item.stockImage}  /> {
                    (netCount !== 0 && index === 0) &&
                    <Mask>
                        <span>{(!opened) ? '+' : '-'}{netCount}</span>
                    </Mask>
                }
            </div>
            <InvoiceListItems theme={props.theme} openMenu={openMenu} {...props} />
            {
                menu &&
                <MoreActions
                    closeMenuCallback={closeMenu}
                    actions={
                        [
                            {
                                label: 'Edit',
                                callback: (e: Event) => openCart(e),
                                permitted: isAdmin() || can('edit', 'invoices'),
                            },
                            {
                                label: 'Invoice Info',
                                callback: (e: Event) => displayDetails(e),
                                permitted: true
                            },
                            {
                                label: 'Delete Invoice',
                                permitted: isAdmin() || can('delete', 'invoices'),
                                callback: (e: Event) => reverseTransaction(e, stock)
                            }
                        ]
                    }
                />
            }
        </InvoiceList>
    )
}


export const InnerList = (props: any): ReactElement => {

    const { localData: { localState }, issues } = useGetLocals();
    // const pendings = (invoices: any) => invoices.filter((i: any) => i.amountPaid !== i.item.sellingPrice * i.quantity).length
    const pendings = () => { }

    let sorted = sortByPaid(props.invoice.stocks)

    const clipedItems = () => props.invoice.stocks.length - 1
    return (
        <ExpandableList of={props.opened || !clipedItems()} initHeight={props.height} > {
            sorted.map((stockItem: any, i: number) =>
                <ItemWraper> {
                    (localState.selectedId === stockItem.item._id && localState.invoiceId === props.invoice._id) &&
                    <InvoiceDetails stockId={stockItem.item._id} invoice={props.invoice} />
                    }
                    <InvoiceItem
                        {...props}
                        index={i}
                        stock={stockItem}
                        key={stockItem._id}
                        cartItems={sorted}
                        opened={props.opened}
                        invoice={props.invoice}
                        netCount={clipedItems()}
                        pendings={pendings()}
                        addToCart={props.selectCallBack}
                    />
                </ItemWraper>
            )
        }
        </ExpandableList>
    )
}
export function OuterList(props: any): ReactElement {
    const { group } = useReactiveVar(invCriteria)
    const [printerIcon, showPrinterIcon] = useState(false)

    const {list} = props;

    return (
        <section onMouseLeave={() => showPrinterIcon(false)} onMouseEnter={() => showPrinterIcon(true)} className="stocksContainer"> {
            <Fragment>
                <DateSeparator>
                    {group === 'date' ? format_date(list.records[0].createdAt) : list._id||'Not Specified'}
                    <Divider />
                </DateSeparator>
                {
                    list.records.map((n: any, j: number) =>
                        <ElasticContainer contentHeight={55} initHeight={55}>
                            <InnerList {...props} invoice={n} key={n._id} />
                        </ElasticContainer>
                    )
                }
                <TotalSeparator opened={props.opened} onClick={() => props.colapseCallbak(list.records.length - 5)}>
                    <div className="seperatorMakers">
                        <p>{}</p>
                        {
                            <></>
                        }
                        <P1 style={{ fontSize: 15, color: '#000000e7' }}>{roundAmount(getNetInvoiceToatal(list.records))}</P1>
                    </div>
                </TotalSeparator>
            </Fragment>
        }
        </section>
    )
}