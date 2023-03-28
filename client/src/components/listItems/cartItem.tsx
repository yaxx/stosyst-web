import { ReactElement, SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { locals } from "../../store/data";
import { CartItem } from "../../types/model";
import { formatMoney } from "../../utils";
import { QtyBtn } from "../buttons";
import { QtyFormGroup } from "../forms/styles";
import { Divider } from "../headers/stylesx";
import { EllipsisIcon2, Times } from "../icons";
import { ImageItem } from "../images";
import { PriceInput, QtyInput } from "../inputs";
import { Photo } from "../stockImages";

export const CartStock = styled.div.attrs({ className: 'ct' })`
  height: 100%;
  width: 100%;
  padding: 5px 16px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
    .photo {
        margin: 0px;
    }
    .icn {
        visibility: visible;
    }
  &:hover .icn {
        visibility: visible;
    }
    &:hover {
        .icon-ctn {
            display: flex;
        }
    }
  &:hover {
    border-bottom: none;
  }
  &:hover p input {
    border-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.tar : props.theme.light.colors.labels.tar
    };
}`

export const DescWrap = styled.div.attrs(() => ({
    className: 'ds'
})) <any>`
  height: 100%;
  width: ${props => props.w || 100}%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri
};
`
const Icon = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background:red;
    border: 1px solid white;
    font-size: 11px;
    color: white;
    position: absolute;
    top: -2px;
    left: -1px;
    display:none;
    z-index: 10;
`
export const SubTotal = styled.p<any>`
    width: auto;
    margin-bottom: 0px;
    text-align: right;
    position: absolute;
    font-size: ${props => props.fs || props.theme.typography.body1}px;
    color: ${props => props.cl || props.theme.light.colors.labels.sec};
    span {
        position: absolute;
        display: block;
        height: 15px;
        width: 15px;
        right: -16px;
        top:2px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        :hover {
            background:  rgba(211, 211, 226, 0.562);
        }
        svg {
            position: absolute;
        }
    }
`
export const Order = styled.div<any>`
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    position:relative;
    min-width:60px;
    /* right: 10px; */
    p {
        /* color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.sec : props.theme.light.colors.labels.sec
    }; */
        
        text-align: right;
        right: 5px;
        position: relative;
    }
`;
export const RecieptOrder = styled.div<any>`
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    position:relative;
    min-width:60px;
    p {
        text-align: right;
        position: relative;
        margin-bottom: 0px;
    }
`;

export const Item = styled.div`
    width: 100%;
    height: 60px;
    position: relative;
    font-size: ${props => props.theme.typography.body1};
`
export const RecieptItem = styled.div`
    width: 100%;
    height: 50px;
    position: relative;
    font-size: ${props => props.theme.typography.body1};
`
export const Description = styled.div`
  height: 85%;
  width:85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
   p {
     margin-bottom: 0px;
     padding: 0px;
     padding-left: 10px;
     position: relative;
     width:170px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
    };
    span {
        ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.sec : props.theme.light.colors.labels.sec};
    }
   }
   p:last-child {
     ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.tar : props.theme.light.colors.labels.sec}
   }
`;
export const RecieptDesc = styled.div`
  height: 85%;
  width:85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
   p {
     margin-bottom: 0px;
     padding: 0px;
     width:170px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
    };
   }
   p:last-child {
    font-size: 12px;
     color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.tar : props.theme.light.colors.labels.sec}
   }
`;
export const CartTotal = styled.div`
    height: 40px;
    width: 100%;
    padding: 5px 16px;
    margin: auto;
    position: relative;
    display: flex;
    align-items: center;
    overflow: visible;
    justify-content: space-between;
    span {
        position: absolute;
        right: 0px;
    }
     p {
       &:first-child {
         color: lightgrey;
         padding-left: 0px;
       }
       &:last-child {
           padding-left: 0px;
           font-size: 16px;
       }
       padding: 0px 0px;
       margin-bottom: 0px;
       font-size: 16px;
       font-weight: 500;
       text-align: right;
     }
  `
export const StockPhoto = styled(Photo)`
    height: 42px;
    width: 42px;
    right: auto;
    margin:0px 5px;
    img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: inherit;
        }
`;
export const CartItemsWraper = styled.div<any>`
    position: absolute;
    width:100%;
    max-height: 100%;
    transition: all .2s ease-in;
    left:0%;
`
export const RecieptItemsCont = styled.div<any>`
    width:100%;
    max-height: 100%;
    left:0%;
`
export const CheckOutFormWraper = styled(CartItemsWraper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .2s ease-in;
    background: inherit;
    margin: auto;
    width: 100%;
    padding:0px 37px;
    height: 100%;
    position: relative;
    left: 0%;
    overflow: visible;
    bottom: 120px;
`
export const ReviewFormWraper = styled.div`
    width: 100%;
    height: 100%;
    /* padding:0px 45px; */
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
export const SettingsFormWraper = styled(CheckOutFormWraper)`
    left: 0%;
    height: ${props => props.h || 'inherit'};
    width: ${props => props.h ? 'auto' : '220px'};
    padding: 0px ${props => props.h ? '45px' : '0px'};
    top: ${props => props.h ? '10px' : 'auto'};
    h4 {
        margin-bottom: 5px;
        align-self: start;
    }
`
export function CartListItem(props: any): ReactElement {
    const [stock, setStock] = useState(props.stock)
    const {
        stock: stockItem,
        isLastItem,
        qtyChangeCallback,
        removeItemCallback,
        priceChangeCallback,
        deSelectItemCallback,

    } = props;


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
                <div style={{ height: 42, width: 42, position: 'relative', right:'auto', borderRadius: 4 }}>
                    <Icon onClick={(e: any) => removeItemCallback(e, stock)} className='icon-ctn'><Times /></Icon>
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
export function RecieptListItem(props: any): ReactElement {
    const [stock, setStock] = useState(props.stock)
    const {
        stock: stockItem,
    } = props;

    return (
        <RecieptItem>
            <CartStock>
                <DescWrap>
                    <RecieptDesc>
                        <p title={stockItem.item.name + ' ' + stockItem.item.description}>
                            {stockItem.item.name} 
                        </p>
                        <p>
                            {stockItem.item.description}
                        </p>
                    </RecieptDesc>
                    <RecieptOrder>
                        <p>
                            {props.stock.quantity} 
                        </p>
                        <SubTotal> {
                            formatMoney(props.stock.item.sellingPrice * props.stock.quantity)
                        }
                        </SubTotal>
                    </RecieptOrder>
                </DescWrap>
                <Divider w={90} l={ 'auto'} />
            </CartStock>
        </RecieptItem>
    )
}