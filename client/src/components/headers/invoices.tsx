import { useReactiveVar } from "@apollo/client";
import {ReactElement } from "react";
import { headerMenu, invCriteria, invMenu } from "../../store/data";
import { Marker } from "../icons";
import { TAGGLINE } from "../typography";
import { Header, InvoiceListHeader, Divider, HeaderItem, TableOption, TableActions } from "./stylesx";

export const  InvoiceHeader = (): ReactElement => {
    const criteria = useReactiveVar(invCriteria)
    const menu = useReactiveVar(headerMenu)
    return (
        <Header>
            <InvoiceListHeader>
                <Divider top='100' />
                <HeaderItem width={47}>
                    <TAGGLINE>STOCK</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={20}>
                    <TAGGLINE>CUSTOMER</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={13}>
                    <TAGGLINE>{ }</TAGGLINE></HeaderItem>
                <HeaderItem width={10}>
                    <TAGGLINE>QUANITY</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={10}>
                    <TAGGLINE>PRICE</TAGGLINE>
                </HeaderItem> {
                    menu === 'group' ?
                    <TableActions onMouseLeave={() => headerMenu('')}>
                        <TableOption selected={criteria.group === 'date'} onClick={() => invCriteria({...criteria,group: 'date'})} style={{ borderBottom: '0px' }}>
                            {
                                criteria.group === 'date' && <Marker />
                            }
                            <p>Date Added</p>
                        </TableOption>
                        <Divider />
                        <TableOption selected={criteria.group === 'customer'} onClick={() => invCriteria({ ...criteria, group: 'customer' })}>
                            {
                                criteria.group === 'customer' && <Marker />
                            }
                            <p>Customer</p>
                        </TableOption>
                            <TableOption selected={criteria.group === 'paymentmethod'} onClick={() => invCriteria({ ...criteria, group: 'paymentmethod' })}>
                            {
                                criteria.group === 'paymentmethod' && <Marker />
                            }
                            <p>Payment Method</p>
                        </TableOption>
                    </TableActions>
                    :
                    menu === 'filter' ?
                    <TableActions onMouseLeave={() => headerMenu('')}>
                        <TableOption selected={criteria.filter === ''} bordered onClick={() => invCriteria({ ...criteria, filter: '' })}> 
                            { criteria.filter === '' && <Marker />}
                            <p>All</p>
                        </TableOption>
                        <Divider />
                        <TableOption selected={criteria.filter === 'pendings'} onClick={() => invCriteria({ ...criteria, filter: 'pendings' })}> 
                            {criteria.filter === 'pendings' && <Marker />}
                            <p>Pendings</p>
                        </TableOption>
                                <TableOption selected={criteria.filter === 'cash'} onClick={() => invCriteria({ ...criteria, filter: 'cash' })}> 
                            {criteria.filter === 'cash' && <Marker />}
                            <p>Cash</p>
                        </TableOption>
                        <TableOption selected={criteria.filter === 'pos'} onClick={() => invCriteria({ ...criteria, filter: 'pos' })}> 
                            {criteria.filter === 'pos' && <Marker />}
                            <p>POS</p>
                        </TableOption>
                        <TableOption selected={criteria.filter === 'transfer'} onClick={() => invCriteria({ ...criteria, filter: 'transfer' })}> 
                            {criteria.filter === 'transfer' && <Marker />}
                            <p>Transfer</p>
                        </TableOption>
                    </TableActions>
                    :
                    <></>
                }
            </InvoiceListHeader>
        </Header>
    )
}