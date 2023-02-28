import styled from "styled-components";
import { Photo } from "../stockImages";

export const Row = styled.li<any>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 55px;
    border-radius: 6px;
    font-size: 14px;
    padding: 0px 10px;
    position: relative;
    background: ${props => props.selected ? props.theme.light.colors.brand : 'initial'};
        .counter {
            position: absolute;
            left: -2px;
            font-size: 10px;
            bottom: 8px;
            z-index: 2;
            span: {
                position: relative;
                display: block;
                height: 100%;
                width:100%;
                cursor: pointer;
            }
        }
    /* li {
        color: ${props => props.selected ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri}
    } */
    &:hover ul {
        /* color: ${props => props.selected ? 'white' : '#a5a3a3'}; */
        li:nth-child(2) p {
            color: ${props => props.selected ? props.theme.dark.colors.labels.sec : props.theme.light.colors.labels.sec}
        }
        svg {
            circle {
                fill: ${props => props.selected ? 'white' : props.theme.light.colors.brand}
            }
        }
    }
    &:hover {
        background: ${props => props.selected ? props.theme.light.colors.brand : '#f0f0f0'};
    }
    &:hover .options p:first-child {
        display: flex;
    }
    &:hover .options p:last-child {
        display: none;
    }
`;

export const ExpenseList = styled(Row)`
    padding: 0px 14px;
    overflow: visible;
    ul {
        left: 0px;
        width: 100%;
    }
`

export const ListLabel = styled.div<any>`
    display: flex;
    min-width: 30px;
    font-size: 11px;
    border-radius: 5px;
    position: relative;
    align-items: 'flex-start';
    flex-direction:${props => props.fd ? 'column' : 'row'};
    justify-content: ${props => props.fd ? 'center' : 'flex-start'};
`
export const DiffMaker = styled.div<any>`
    display: flex;
    min-width: 30px;
    font-size: 11px;
    top: -2px;
    svg {
        position: relative;
        margin-right: 1px;
        fill: ${props => props.diff ? 'green' : 'red'};
        transform: rotate(${props => props.diff ? '180deg' : '0deg'});
    }
    #pcent {
        font-size: 11px;
        align-self: flex-end;
        bottom: -4px;
        position: relative;
        margin-bottom: 0px;
        color: ${props => props.diff ? 'green' : 'red'};
    }
    position: relative;
    bottom: 3px;
    margin-left:5px;
    align-items: flex-end;
`
export const MultiLabel = styled.div`
    p {
        color: lightgrey;
        font-size: 12px;
        margin-bottom: 0px;
    }
    p:last-child {
        font-size: '10px'
    }
`

export const StockInfo = styled.div<any>`
    width: 100%;
    height: 220px;
    z-index: 200;
    top: -75px;
    transform-origin: center;
    transform: scaleY(${props => props.scale});
    transition: all .5s ease-in-out;
    padding: 10px;
    display: flex;
    position: absolute;
    border-radius: 18px;
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.elavations.pri : props.theme.light.colors.backgrounds.base.pri
    };
`
export const DetailsPhoto = styled(Photo)`
    height: 100%;
    width: 200px;
    border-radius: 10px;
`;
export const InfoContainer = styled.div<any>`
    width: ${props => props.w ? 80 : 100}%;
    height: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    position: relative;
    align-items: center;
    justify-content: space-around;
`
export const ExpenseInfoContainer = styled(InfoContainer)`
    width: 100%;
    justify-content: space-between;
`
export const InfoItems = styled.ul<any>`
    width: ${props => props.w || 100}%;
    height: 100%;
    margin-right: 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items:flex-start;
    margin-bottom: 0px;
    /* padding: 0px ${props => props.p || 0}px 0px 0px; */
    justify-content:${props => props.isInput ? 'space-between' : 'flex-start'};
`
export const InfoItem = styled.li`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content:center;
    h6 {
        font-size: 9px;
        margin-bottom: 0px;
        color: #8080807a;
    }
    p {
        font-size:13px;
        max-width: 95%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0px;
        span {
            color: grey;
        }
    }
`
export const InputItemsCont = styled(InfoItem)<any>`
  margin: 4px 0px;
  width: 97%;
  border-radius: 6px;
  border: 1px solid #e6e1e1;
  height: auto;
  display: flex;
`
export const InputItem = styled(InfoItem) <any>`
  border: 0px solid;
  width: ${props => props.w || 100}%;
  border-radius: 0px;
  border: none;
  border-bottom: ${props => props.top ? '1px' : '0px'} solid;
  border-bottom-color: ${props => props.top ? "#d3d3d35c" : 'white'};
  padding-left: 5px;
  /* :hover {
    border-color: ${({ isFocused }) => isFocused ? '#00a3fe' : '#cecece8a'};
    border-width: ${({ isFocused }) => isFocused ? 1.5 : 1}px;
  }
  border-width: ${({ isFocused }) => isFocused ? 1.5 : 0}px;
  border-color: ${({ isFocused }) => isFocused ? '#00a3fe' : 'white'};
  cursor: text; */
`
export const VDivider = styled.div<any>`
    height: 84%;
    top: 9%;
    border-right: 1px solid ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri};
    position: absolute;
    left: ${props => props.lf || 100}%;
`;