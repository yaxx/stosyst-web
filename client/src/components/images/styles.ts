import styled from "styled-components";

export const ImageWrap = styled.div<any>`
    border: solid;
    /* margin-right: 10px; */
    background: rgb(230 230 230);
    height: ${props => props.h || '42px'};
    width: ${props => props.w || '42px'};
    border-radius: ${props => props.r || '4px'};
    border-color: ${props => props.bc||'#ffffff00'};
    border-width: ${props => props.bw||0};
    position: relative;
    background-size: cover;
    background-position: center;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
    }
`;
export const ProdImageWrap = styled(ImageWrap)<any>`
    border: none;
    margin-right: 0px;
    padding: 10px 5px 0px 5px;
    background: rgb(244 244 244);
    cursor: pointer;
    img {
        /* height: 100%; */
        /* width: 100%; */
        mix-blend-mode: multiply;
        filter: contrast(1);
        object-fit: contain;
        border-radius: inherit;
    }
`;

export const Mask = styled.div`
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
    background-color: rgba(0,0,0,.3);
`
export const StockIndicator = styled.div<any>`
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: ${({expiryStatus}) => expiryStatus === 'weak' ? '#ffd108' : 'red'}; 
`
export const DateIndictor = styled(StockIndicator)`
    top: 73%;
    bottom: 0;
    left: 24%;
    width: 30px;
    height: 10px;
    border-radius: 5px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: rgba(0,0,0,.46);
    p {
        font-size: 9px;
        color: white;
        position: relative;
        margin-bottom: 0px;
        font-weight: 700;
    }
`
