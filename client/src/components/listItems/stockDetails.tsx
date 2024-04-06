import { ReactElement } from 'react'
import { CartItem, Expense, Invoice, Product } from '../../types/model';
import { formatMoney, formatTime, format_date, getCartTotal, getExpStatus, simplifyExpDate } from '../../utils';
import { ImageItem } from '../images';
import { StockInfo, InfoContainer, InfoItems, InfoItem, VDivider, ExpenseInfoContainer } from './styles';


export default function StockDetails({ stock }: { stock: Product }): ReactElement {

    const status = getExpStatus(stock)

    let colorMark = ''
     
    if(status) {
        colorMark = status === 'weak' ? '#ffd108' : status === 'expired' ? 'red' : ''
    }

    return (
        <StockInfo >
            <ImageItem  h={'100%'} w={'200px'} r='10px' source={stock.stockImage} />
            <InfoContainer w>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>PRODUCT NAME</h6>
                        <p>{stock.name}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>DESCRIPTION</h6>
                        <p>{stock.description || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>CATEGORY</h6>
                        <p>{stock.category || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>COST PRICE</h6>
                        <p>{stock.costPrice || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>SELLING PRICE</h6>
                        <p>{stock.sellingPrice}</p>
                    </InfoItem>
                    <VDivider />
                </InfoItems>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>IN STOCK</h6>
                        <p>{stock.instock}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>STOCK LEVEL</h6>
                        <p>{stock.warningCount || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>EXPIRY</h6>
                        <p style={{ color: colorMark}}>{stock.expiry ? simplifyExpDate(stock.expiry) : '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>WARNING PIRIOD</h6>
                        <p>{stock.expiryWarning ? `${stock.expiryWarning} Month${stock.expiryWarning > 1 ?'s':''}` : '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>PRODUCT ID</h6>
                        <p>{stock._id?.toLocaleUpperCase()}</p>
                    </InfoItem>
                </InfoItems>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>ADDED</h6>
                        <p>{format_date(stock.createdAt)} {formatTime(stock.createdAt)} <span> - </span>{stock?.added?.firstName || '---'} {stock?.added?.lastName || ''}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>LAST MODIFIED</h6>
                        <p>{format_date(stock.updatedAt)} {formatTime(stock.updatedAt)}<span> - </span>{stock?.modified?.firstName || '---'} {stock?.modified?.lastName || ''}</p>
                    </InfoItem>
                </InfoItems>
            </InfoContainer>
        </StockInfo>
    )
}
export function InvoiceDetails({ invoice, stockId }: { invoice: Invoice, stockId: string }): ReactElement {
    const stock = invoice.stocks.find((p: CartItem) => p.item._id === stockId)

    const getBalaceAmount = () => {
        return +getCartTotal(invoice.stocks) - invoice.recieved
    }
    return (
        <StockInfo>
            <ImageItem h={'100%'} w={'200px'} r='10px' source={stock!.item?.stockImage} />
            <InfoContainer w>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>PRODUCT NAME</h6>
                        <p>{stock?.item.name}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>DESCRIPTION</h6>
                        <p>{stock?.item.description || '---'}</p>
                    </InfoItem>
                    <InfoItem >
                        <h6>QUANITY</h6>
                        <p>{stock?.quantity}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>PRICE</h6>
                        <p>{formatMoney(stock?.item.sellingPrice)}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>SUB TOTAL</h6>
                        <p>{formatMoney(stock!.item!.sellingPrice * stock!.quantity )}</p>
                    </InfoItem>
                    <VDivider />
                </InfoItems>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>TOTAL</h6>
                        <p>{formatMoney(getCartTotal(invoice.stocks).toFixed(0))}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>AMOUNT PAID</h6>
                        <p>{formatMoney(invoice.recieved)}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>BALANCE</h6>
                        <p style={{ color: getBalaceAmount() === 0 ? '#28a745' : '#f304048e' }}>{formatMoney(getBalaceAmount())}{getBalaceAmount()===0 ? '.00' : ''}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>ADDED</h6>
                        <p>{format_date(invoice.createdAt)} {formatTime(invoice.updatedAt)}<span> - </span>{invoice?.added?.firstName || '---'} {invoice?.added?.lastName || ''}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>LAST MODIFIED</h6>
                        <p>{format_date(invoice.updatedAt)} {formatTime(invoice.updatedAt)}<span> - </span>{invoice?.modified?.firstName || '---'} {invoice?.modified?.lastName || ''}</p>
                    </InfoItem>
                    <VDivider />
                </InfoItems>
                <InfoItems w={33.3}>
                    <InfoItem>
                        <h6>CUSTOMER</h6>
                        <p>{invoice!.customer.firstName || '---'} {invoice!.customer.lastName || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>PHONE</h6>
                        <p>{invoice!.customer.phone || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>EMAIL</h6>
                        <p>{invoice!.customer.email || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>ADDRESS</h6>
                        <p>{invoice!.customer.address || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>TRANSACTION ID</h6>
                        <p>{invoice!.tid}</p>
                    </InfoItem>
                </InfoItems>
            </InfoContainer>
        </StockInfo>
    )
}
export function ExpenseDetails({ expense }: { expense: Expense }): ReactElement {
    return (
        <StockInfo>
            <ExpenseInfoContainer>
                <InfoItems >
                    <InfoItem>
                        <h6>EXPNESE TITLE</h6>
                        <p>{expense.name}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>DESCRIPTION</h6>
                        <p>{expense.desc || '---'}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>AMOUNT</h6>
                        <p>{formatMoney(expense.amount)}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>EXPENDER</h6>
                        <p>{expense.spender || '---'}</p>
                    </InfoItem>
                    <VDivider />
                </InfoItems>

                <InfoItems >
                    <InfoItem>
                        <h6>EXPENSE ID</h6>
                        <p>{expense._id?.toLocaleUpperCase()}</p>
                    </InfoItem>

                    <InfoItem>
                        <h6>ADDED</h6>
                        <p>{format_date(expense.createdAt)} {formatTime(expense.createdAt)}<span> By: </span>{expense?.added?.firstName || '---'} {expense?.added?.lastName || ''}</p>
                    </InfoItem>
                    <InfoItem>
                        <h6>LAST MODIFIED</h6>
                        <p>{format_date(expense.updatedAt)} {formatTime(expense.updatedAt)}<span> By: </span>{expense?.modified?.firstName || '---'} {expense?.modified?.lastName || ''}</p>
                    </InfoItem>
                </InfoItems>
            </ExpenseInfoContainer>
        </StockInfo>
    )
}


