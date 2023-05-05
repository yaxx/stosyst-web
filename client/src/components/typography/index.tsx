import styled from "styled-components";

export const P1 = styled.p`
    margin-bottom: 0px;
    font-size: 13px;
`
export const P2 = styled.p`
    margin-bottom: 0px;
    font-size: 12px;
`
export const Sum = styled.h4`
    font-size: 14px;
    margin-bottom: 0px;
    color: grey;
    font-weight: normal;
`
export const Total = styled.h4`
    font-size: 16px;
    margin-bottom: 0px;
    color: #000000;
    font-weight: 400;
`
export const TAGGLINE = styled(P1)`
    font-size: 10px;
`
export const H4 = styled.h4<any>`
    font-size: ${ props=>props.theme.typography.H4 };
    font-weight: 600;
    margin-bottom: 0px;
`
export const ProductPrice = styled.h4<any>`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 0px;
    padding: 2px 5px;
    sup {
        font-weight: normal;
        color: #232222;
        font-size: 13px;
        margin: 2px;
    }
`
export const Delta = styled.p<any>`
    font-size: 10px;
    font-weight: normal;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content:center;
    margin-left: 3px;
    font-size: 11px;
    height: 18px;
    color: ${props => props.down ? 'red' : '#125205'};
    border-radius: 5px;
    background: ${props => props.down ? '#fa040418' : 'rgba(60, 250, 60, 0.15)'} ;

`
export const H5 = styled.h4<any>`
    font-size: ${ props => props.theme.typography.body };
    font-weight: 500;
    margin-bottom: 0px;
`
export const H6 = styled.h4<any>`
    font-size: ${ props => props.theme.typography.tagline };
    font-weight: 500;
    margin-bottom: 0px;
`