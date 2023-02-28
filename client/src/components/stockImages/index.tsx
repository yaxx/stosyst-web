import React, { ReactElement } from 'react'
import styled from 'styled-components';

export const Image = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 4px;
    background-color: rgb(228, 228, 228);
    position: relative;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: inherit;
        }
`;
interface Props {
    imgUri: string
}
export const Photo = styled.div`
    height: 42px;
    width: 42px;
    border-radius: 4px;
    background-size: cover;
    background-position: center;
    position: relative;
    margin-right: 10px;
    background: rgb(230 230 230);
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
    }
`;



export const PhotoMask = styled(Photo)`
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 11px;
    position: absolute;
    display: flex;
    border-radius: inherit;
    align-items: center;
    justify-content: center; 
    background-color: rgba(0,0,0,.36);
`
export default function StockPhoto(uri: string): ReactElement {
    return (
            <Image>
                <img src = { uri } alt=""/>
            </Image>
    )
}
