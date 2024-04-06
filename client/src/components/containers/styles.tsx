import styled from "styled-components";

export const ExpandableList = styled.ul<any>`
    overflow: ${props => props.of ? 'visible' : 'hidden'};
    margin-bottom: 0px;
    width: 100%;
    display: block;
     padding-left: 0px;
    transition: all .15s ease-out;
    max-height: ${props => props.initHeight}px; 
`