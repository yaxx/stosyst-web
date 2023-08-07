import React from 'react'
import { SkelItemCont, SkelImageCont, SkelItemInfo, SkelOpItemInfo, Flash, SkelInfo } from './styles'

const Skeleton = (props: any) => {
    return (
        <SkelItemCont {...props}>
            <SkelImageCont h={'35px'} w={'35px'} r={'4px'}>
                <Flash />
            </SkelImageCont>
            <SkelItemInfo >
                <SkelInfo mb={4}>
                     <Flash />
                </SkelInfo>
                <SkelInfo w={70}>
                    <Flash /> 
                </SkelInfo>
            </SkelItemInfo>
            <SkelOpItemInfo>
                <SkelInfo mb={4} w={70}>
                    <Flash />
                </SkelInfo>
                <SkelInfo w={40}>
                    <Flash />
                </SkelInfo>
            </SkelOpItemInfo>
        </SkelItemCont>
    )
}

export default Skeleton