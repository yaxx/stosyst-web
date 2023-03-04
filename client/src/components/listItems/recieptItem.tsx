import { ReactElement, useState, SyntheticEvent } from "react";
import { Item } from ".";
import { locals } from "../../store/data";
import { CartItem } from "../../types/model";
import { formatMoney } from "../../utils";
import { QtyBtn } from "../buttons";
import { QtyFormGroup } from "../forms/styles";
import { Divider } from "../headers/stylesx";
import { Times } from "../icons";
import { ImageItem } from "../images";
import { PriceInput, QtyInput } from "../inputs";
import { CartStock, DescWrap, Description, Order, SubTotal } from "./cartItem";

export function RecieptListItemsss(props: any): ReactElement {
    const [stock, setStock] = useState(props.stock)
    const {
        stock: stockItem,
        isLastItem,
        itemSelected,
        selectCallback,
        qtyChangeCallback,
        removeItemCallback,
        priceChangeCallback,
        deSelectItemCallback,

    } = props;

    const handleAmountChange = (e: any) => {
        e.persist();
        setStock({
            ...stock,
            // amountPaid: +e.target.value
        })
    }

    const handlePriceAdjustment = (e: any) => {
        e.persist();
        setStock({
            ...stock,
            // amountPaid: +e.target.value * stock.quantity
        })
        priceChangeCallback(e)
    }

    const adjustQty = (evt: any, action: string) => {
        props.adjustCallback(evt, action, stockItem._id)
        const stock = locals().invoice.stocks.find((i: CartItem) => i._id === stockItem._id)
        setStock({ ...stock })
    }

    return (
        <Item>
            <CartStock>
                <div style={{ height: 42, width: 42, position: 'relative', right: 'auto', borderRadius: 4 }}>
                    {/* <Icon onClick={(e: any) => removeItemCallback(e, stock)} className='icon-ctn'><Times /></Icon> */}
                    <ImageItem source={stockItem.item.stockImage} />
                </div>
                <DescWrap>
                    <Description>
                        <p title={stockItem.item.name + ' ' + stockItem.item.description}>
                            {stockItem.item.name}
                            <span>{stockItem.item.description}</span>
                        </p>
                        <p>
                            <PriceInput
                                name='sellingPrice'
                                value={stockItem.item.sellingPrice}
                                onFocus={deSelectItemCallback}
                                onChange={(e: SyntheticEvent) => handlePriceAdjustment(e)}
                            />
                        </p>
                    </Description>
                    <Order>
                        <QtyFormGroup>
                            <QtyBtn onClick={(e: any) => adjustQty(e, '-')}><span>-</span></QtyBtn>
                            <QtyInput name='quantity' onChange={qtyChangeCallback} value={props.stock.quantity} />
                            <QtyBtn onClick={(e: SyntheticEvent) => adjustQty(e, '+')}><span>+</span></QtyBtn>
                        </QtyFormGroup>
                        <SubTotal > {
                            formatMoney(props.stock.item.sellingPrice * props.stock.quantity)
                        }
                        </SubTotal>
                    </Order>
                </DescWrap>
                <Divider w={isLastItem ? 88 : 73} l={isLastItem ? 'auto' : '67px'} />
            </CartStock>
        </Item>
    )
}