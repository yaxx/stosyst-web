
import React from 'react'
import { roundAmount } from '../../charts/header'
import { Divider } from '../../headers/styles'
import { RightAngleIcon } from '../../icons'
import { IconCont } from '../../icons/styles'
import { ImageItem } from './image'
import { Card, Desc, DescCol, DescCont, Footer, Header, Instock, PriceCont, StockCont, StockPrice, Title, TitleCont } from './styles'

type Props = {}

function StocksCard(props: any) {
    const { list: items, count, total, groupId } = props;
    return (
        <Card>

            <Header>
               {groupId}
                <Divider />
            </Header> {
                items.map((item: any, index: number) => (
                    <StockCont key={groupId}>
                        <ImageItem source={item.stockImage} />
                        <DescCol>
                            <DescCont>
                                <TitleCont>
                                    <Title>{item.name}</Title>
                                    <IconCont rot={90} size={6}>
                                        <RightAngleIcon />
                                    </IconCont>
                                </TitleCont>
                                <Desc>{item.description}</Desc>
                            </DescCont>
                            <PriceCont>
                                <Instock>{item.instock}</Instock>
                                <StockPrice>{item.sellingPrice}</StockPrice>
                            </PriceCont>
                            {
                                index+1 !== items.length && <Divider />
                            }
                        </DescCol>
                        
                    </StockCont>
                ))
            }
            <Footer>
                <Divider bottom={100} />
                <p>+{count}</p>
                <IconCont rot={90} size={6}>
                    <RightAngleIcon />
                </IconCont>
                <h6>{roundAmount(total)}</h6>
            </Footer>
        </Card>
    )
}

export default StocksCard