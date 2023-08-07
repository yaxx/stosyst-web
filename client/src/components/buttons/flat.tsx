import styled from "styled-components";

export const FlatButton = styled.button.attrs(props => ({
    name: props.name,
    value: props.value
    })) <any>`
    width: ${props => props.w || '100%'};
    height:${props => props.h || '100%'};
    border:none;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content:center;
    color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.dark.colors.labels.pri
    };
    background-color: white;
    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.btn_hovered : props.theme.light.colors.btn_hovered}
        svg {
            fill: white !important;
        }
    }
    &:focus {
        border: 0px;
        outline: none;
    }
`