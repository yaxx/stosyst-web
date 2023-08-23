import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Divider, OptionItem } from '../headers/styles';

import { MoreOptions } from '../icons';
import { P1 } from '../typography';

export const Item = styled.li<any>`
    width: ${ props => props.width }%;
    align-items: ${ props => props.ai };
    font-size: ${ props => props.theme.typography.body1};
    /* p:last-child {
        color: ${ props => props.selected ? 'white' : props.theme.light.colors.labels.sec};
    } */
`

export const ListItems =  styled.ul<any>`
    width: 94%;
    overflow: visible;
    position: relative;
    padding-left: 0px;
    /* z-index: -1; */
    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        p {
            margin-bottom: 0px;
            color: #2d2d2de7;
        }
         /* z-index: -1; */
    }
    .options p:first-child {
        display: none;
    }
    li:first-child p:first-child {
        color: #2d2d2de7;
    }
    li:nth-child(2) p:first-child {
       color: #2d2d2de7;
    }
    
    li:first-child p, li:nth-child(2) p {
        max-width: 95%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export const SummaryItems = styled(ListItems)`
    li {
        p {
            margin-bottom: 3px;
            color: rgb(173,173,173);
        }
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    li:first-child p:first-child {
        color: rgb(173,173,173);
    }
    /* li p:nth-child(1) {
        font-size: ${ props => props.theme.typography.body3};
        color: auto;
    } */
    
`
export const FlatList = styled(ListItems)`
    width: 100%;
    margin-bottom: 0px; 
`

export const Row = styled.li<any>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 55px;
    border-radius: 6px;
    padding: 0px 10px;
    position: relative;
    /* z-index: -1; */
    background: ${props => props.selected ? props.theme.light.colors.brand : 'initial'
    };
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
    ul {
         padding-left: 0px;
         /* z-index: -1; */
        li p {
             color: ${ props => props.selected ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.sec };
        }
        li:first-child p:first-child {
            color: ${props => props.selected ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri };
        }
    }
    &:hover ul {
        li p {
             color: ${ props => props.selected ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.sec};
        }
        svg {
            circle {
                fill: ${props => props.selected ? 'white' : props.theme.light.colors.brand}
            }
        }
         padding-left: 0px;
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
export const FlatRow = styled(Row)`
    :hover {
        background-color: initial;
    }
    padding: 0px;
`
export const Desc = styled.ul`
  padding-left: 0px;
`;

 export const Paid = styled<any>(P1)`
    /* color: ${ props => props.paid ? 'red' : props.theme.light.colors.labels.sec  }; */
    span {
        position: relative;
        left: 2px;
        display:  ${ props => (props.pendings > 1 && props.i === 0 && !props.opened)  ? 'inline' : 'none'}
    }
`

export const ExpandableList = styled.ul<any>`
    overflow: ${ props=>props.of ? 'visible': 'hidden'};
    margin-bottom: 0px;
    width: 100%;
    display: block;
     padding-left: 0px;
    transition: all .15s ease-out;
    max-height: ${ props => props.initHeight }px; 
`

export const MoreActions = (props: any) => {
    let { actions, rt, closeMenuCallback, sharingCallback } = props
    const location = useLocation();
    let allowedActions:any = []
    
     actions.forEach((action: any)=>{
        if(action.permitted) 
        allowedActions.push(action)
    })

    return (
        <MoreOptions rt = {rt} onMouseLeave={() => closeMenuCallback()} onClick={() => closeMenuCallback()} {...props}>{
            allowedActions.map((action: any, i: number)=>(
                    <OptionItem onClick={(e: any) => action.callback(e)}>
                        <p>{action.label}</p>
                        {i < allowedActions.length  && <Divider />}
                    </OptionItem>
                ))
            }
            {
                location.pathname === '/' && 
                <OptionItem onClick={(e: any) => sharingCallback(e)}>
                    <p>Share</p>
                </OptionItem>
            }
           
        </MoreOptions>
    )
}
