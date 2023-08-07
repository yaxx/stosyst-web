import { useReactiveVar } from "@apollo/client"
import { ReactElement, useState } from "react"
import { useLocation } from "react-router-dom"
import { editCallback, isAdmin } from "../../utils"
import { can } from "../../utils/permisions"
import { CircularBtn } from "../buttons"
import { TAGGLINE } from "../typography"
import { SortAngle, PlusIcon, Marker } from "../icons"
import { headerMenu, groupingCriteria, initProduct } from "../../store/data"
import { Header, StocksListHeader, Divider, HeaderItem, TableActions, TableOption } from "./styles"
import { IconCont } from "../inputs/styles"

export const StocksHeader = (props: any): ReactElement => {
    const [order, setOrder] = useState('name')
    const { search } = useLocation()
    // const q = queryString.parse(search)

    const { reGroupCallback, filterCallback } = props

    const reOrder = (orderBy: string) => {
        setOrder(orderBy)
        props.reOderCallback(orderBy)
    }
    const headMenu = useReactiveVar(headerMenu)
    const criteria = useReactiveVar(groupingCriteria)

    const reGroupStock = (group: string) => {
        groupingCriteria({ ...criteria, group })
    }

    const filterStocks = (filter: string) => {
        groupingCriteria({ ...criteria, filter })
    }

    return (
        <Header>
            <StocksListHeader>
                <Divider top='100' />
                <HeaderItem onClick={() => reOrder('name')} title='Sort by name' width={45}>
                    <TAGGLINE>
                        STOCK
                        {
                            order === 'name' &&
                            <span>
                                <SortAngle />
                            </span>
                        }
                    </TAGGLINE>
                </HeaderItem>
                <HeaderItem onClick={() => reOrder('category')} title='Sort by category' width={33}>
                    <TAGGLINE>CATEGORY
                        {
                            order === 'category' &&
                            <span>
                                <SortAngle />
                            </span>
                        }
                    </TAGGLINE>
                </HeaderItem>
                <HeaderItem onClick={() => reOrder('price')} title='Sort by price' width={10}>
                    <TAGGLINE>PRICE
                        {
                            order === 'price' &&
                            <span>
                                <SortAngle />
                            </span>
                        }
                    </TAGGLINE>
                </HeaderItem>
                <HeaderItem onClick={() => reOrder('instock')} title='Sort by quantity instock' ai='center' width={10}>
                    <TAGGLINE>INSTOCK
                        {
                            order === 'instock' &&
                            <span>
                                <SortAngle />
                            </span>
                        }
                    </TAGGLINE>
                </HeaderItem>
                <HeaderItem width={2} onClick={(e: Event) => editCallback(e, 'stocks', 'products', initProduct, 'products')}>
                    {
                        (isAdmin() || can('add', 'stocks')) &&
                        <IconCont siz={16} onClick={(e: Event) => editCallback(e, 'stocks', 'products', initProduct, 'products')}>
                            <PlusIcon />
                        </IconCont>
                    }
                </HeaderItem>{
                    headMenu === 'group' ?
                        <TableActions h={120} onMouseLeave={() => headerMenu('')}>
                            <TableOption selected={criteria.group === 'name'} onClick={() => reGroupStock('name')}>
                                {
                                    criteria.group === 'name' && <Marker />
                                }
                                <p>A-Z</p>
                            </TableOption>
                            <TableOption selected={criteria.group === 'category'} onClick={() => reGroupStock('category')}>
                                {
                                    criteria.group === 'category' && <Marker />
                                }
                                <p>Category</p>
                            </TableOption>
                            <TableOption selected={criteria.group === 'instock'} onClick={() => reGroupStock('instock')}>
                                {
                                    criteria.group === 'instock' && <Marker />
                                }
                                <p>Quantity</p>
                            </TableOption>
                            <TableOption selected={criteria.group === 'date'} onClick={() => reGroupStock('date')} style={{ borderBottom: '0px' }}>
                                {
                                    criteria.group === 'date' && <Marker />
                                }
                                <p>Date added</p>
                            </TableOption>
                        </TableActions>
                        :
                        headMenu === 'filter' ?
                            <TableActions r={80} onMouseLeave={() => headerMenu('')}>
                                <TableOption selected={criteria.filter === ''} bordered onClick={() => filterStocks('')}> {
                                    criteria.filter === '' && <Marker />
                                }
                                    <p>None</p>
                                </TableOption>
                                <TableOption selected={criteria.filter === 'expiring'} onClick={() => filterStocks('expiring')}> {
                                    criteria.filter === 'expiring' && <Marker />
                                }
                                    <p>Expiring</p>
                                </TableOption>
                                <TableOption selected={criteria.filter === 'expired'} onClick={() => filterStocks('expired')}> {
                                    criteria.filter === 'expired' && <Marker />
                                }
                                    <p>Expired</p>
                                </TableOption>
                                <TableOption selected={criteria.filter === 'low_stocks'} onClick={() => filterStocks('low_stocks')}>{
                                    criteria.filter === 'low_stocks' && <Marker />
                                }
                                    <p>Low stocks</p>
                                </TableOption>
                                <TableOption selected={criteria.filter === 'out_of_stock'} onClick={() => filterStocks('out_of_stock')} style={{ borderBottom: '0px' }}> {
                                    criteria.filter === 'out_of_stock' && <Marker />
                                }
                                    <p>Out of stock</p>
                                </TableOption>
                            </TableActions>
                            :
                            <></>
                }
            </StocksListHeader>
        </Header>
    )
}